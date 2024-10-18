"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelationQueryBuilder = void 0;
const tslib_1 = require("tslib");
const lodash_filter_1 = tslib_1.__importDefault(require("lodash.filter"));
const typeorm_1 = require("typeorm");
const DriverUtils_1 = require("typeorm/driver/DriverUtils");
const aggregate_builder_1 = require("./aggregate.builder");
const filter_query_builder_1 = require("./filter-query.builder");
/**
 * @internal
 *
 * Class that will convert a Query into a `typeorm` Query Builder.
 */
class RelationQueryBuilder {
    constructor(repo, relation) {
        this.repo = repo;
        this.relation = relation;
        this.relationRepo = this.repo.manager.getRepository(this.relationMeta.from);
        this.filterQueryBuilder = new filter_query_builder_1.FilterQueryBuilder(this.relationRepo);
        this.paramCount = 0;
    }
    select(entity, query) {
        const hasRelations = this.filterQueryBuilder.filterHasRelations(query.filter);
        let relationBuilder = this.createRelationQueryBuilder(entity);
        relationBuilder = hasRelations
            ? this.filterQueryBuilder.applyRelationJoinsRecursive(relationBuilder, this.filterQueryBuilder.getReferencedRelationsWithAliasRecursive(this.relationRepo.metadata, query.filter))
            : relationBuilder;
        relationBuilder = this.filterQueryBuilder.applyFilter(relationBuilder, query.filter, relationBuilder.alias);
        relationBuilder = this.filterQueryBuilder.applyPaging(relationBuilder, query.paging);
        return this.filterQueryBuilder.applySorting(relationBuilder, query.sorting, relationBuilder.alias);
    }
    batchSelect(entities, query, withDeleted) {
        let qb = this.relationRepo.createQueryBuilder(this.relationMeta.fromAlias);
        qb.withDeleted();
        qb = this.filterQueryBuilder.applyRelationJoinsRecursive(qb, this.filterQueryBuilder.getReferencedRelationsWithAliasRecursive(this.relationRepo.metadata, query.filter, query.relations), query.relations);
        qb = this.filterQueryBuilder.applyFilter(qb, query.filter, qb.alias);
        qb = this.filterQueryBuilder.applySorting(qb, query.sorting, qb.alias);
        qb = this.filterQueryBuilder.applyPaging(qb, query.paging);
        if (this.relationRepo.metadata.deleteDateColumn?.propertyName && !withDeleted) {
            qb = qb.andWhere(`${qb.alias}.${this.relationRepo.metadata.deleteDateColumn.propertyName} IS NULL`);
        }
        return this.relationMeta.batchSelect(qb, entities);
    }
    batchAggregate(entities, query, aggregateQuery) {
        const selects = [...aggregate_builder_1.AggregateBuilder.getAggregateSelects(aggregateQuery), this.entityIndexColName].map((c) => this.escapeName(c));
        const unionFragment = this.createUnionAggregateSubQuery(entities, query, aggregateQuery);
        return this.relationRepo.manager.connection
            .createQueryBuilder()
            .select(selects)
            .from(`(${unionFragment.sql})`, this.unionAlias)
            .setParameters(unionFragment.params);
    }
    aggregate(entity, query, aggregateQuery) {
        let relationBuilder = this.createRelationQueryBuilder(entity);
        relationBuilder = this.filterQueryBuilder.applyAggregate(relationBuilder, aggregateQuery, relationBuilder.alias);
        relationBuilder = this.filterQueryBuilder.applyFilter(relationBuilder, query.filter, relationBuilder.alias);
        relationBuilder = this.filterQueryBuilder.applyAggregateSorting(relationBuilder, aggregateQuery.groupBy, relationBuilder.alias);
        relationBuilder = this.filterQueryBuilder.applyAggregateGroupBy(relationBuilder, aggregateQuery.groupBy, relationBuilder.alias);
        return relationBuilder;
    }
    get relationMeta() {
        if (this.relationMetadata) {
            return this.relationMetadata;
        }
        const relation = this.repo.metadata.relations.find((r) => r.propertyName === this.relation);
        if (!relation) {
            throw new Error(`Unable to find entity for relation '${this.relation}'`);
        }
        else if (relation.isManyToOne || relation.isOneToOneOwner) {
            this.relationMetadata = this.getManyToOneOrOneToOneOwnerMeta(relation);
        }
        else if (relation.isOneToMany || relation.isOneToOneNotOwner) {
            this.relationMetadata = this.getOneToManyOrOneToOneNotOwnerMeta(relation);
        }
        else if (relation.isManyToManyOwner) {
            this.relationMetadata = this.getManyToManyOwnerMeta(relation);
        }
        else {
            // many-to-many non owner
            this.relationMetadata = this.getManyToManyNotOwnerMetadata(relation);
        }
        return this.relationMetadata;
    }
    createUnionAggregateSubQuery(entities, query, aggregateQuery) {
        const { fromAlias } = this.relationMeta;
        const subQueries = entities.map((e, index) => {
            const subQuery = this.aggregate(e, query, aggregateQuery);
            return subQuery.addSelect(`${index}`, this.entityIndexColName);
        });
        const unionSqls = subQueries.reduce(({ unions, parameters }, sq) => ({
            unions: [...unions, sq.getQuery()],
            parameters: { ...parameters, ...sq.getParameters() }
        }), { unions: [], parameters: {} });
        const unionSql = unionSqls.unions
            .map((u) => `SELECT *
                FROM (${u}) AS ${this.escapeName(fromAlias)}`)
            .join(' UNION ALL ');
        return { sql: unionSql, params: unionSqls.parameters };
    }
    createRelationQueryBuilder(entity) {
        const queryBuilder = this.relationRepo.createQueryBuilder(this.relationMeta.fromAlias);
        const joinedBuilder = this.relationMeta.joins.reduce((qb, join) => {
            const conditions = join.conditions.map(({ leftHand, rightHand }) => `${leftHand} = ${rightHand}`);
            return qb.innerJoin(join.target, join.alias, conditions.join(' AND '));
        }, queryBuilder);
        return joinedBuilder.where(new typeorm_1.Brackets((bqb) => {
            const where = this.relationMeta.whereCondition(entity);
            bqb.andWhere(where.sql, where.params);
        }));
    }
    getManyToOneOrOneToOneOwnerMeta(relation) {
        const aliasName = relation.entityMetadata.tableName;
        const joins = [
            {
                target: relation.entityMetadata.target,
                alias: aliasName,
                conditions: relation.joinColumns.map((joinColumn) => ({
                    leftHand: `${aliasName}.${joinColumn.propertyName}`,
                    rightHand: `${relation.propertyName}.${joinColumn.referencedColumn.propertyName}`
                }))
            }
        ];
        const fromPrimaryKeys = relation.inverseEntityMetadata.primaryColumns.map((pk) => ({
            selectPath: `${relation.propertyName}.${pk.propertyName}`,
            databasePath: pk.databasePath,
            propertyName: pk.propertyName
        }));
        return {
            relation,
            from: relation.type,
            fromAlias: relation.propertyName,
            fromPrimaryKeys,
            joins,
            mapRelations: (entity, relations, rawRelations) => {
                // Set the alias to use for the join
                const joinAlias = this.existingAlias?.name || aliasName;
                const rawFilter = relation.entityMetadata.primaryColumns.reduce((columns, column) => ({
                    ...columns,
                    [this.buildAlias(joinAlias, column.propertyName)]: column.getEntityValue(entity)
                }), {});
                // First filter the raw relations with the PK of the entity, then filter the relations
                // with the PK of the raw relation
                return (0, lodash_filter_1.default)(rawRelations, rawFilter).reduce((entityRelations, rawRelation) => {
                    const filter = this.getRelationPrimaryKeysPropertyNameAndColumnsName().reduce((columns, column) => ({
                        ...columns,
                        [column.propertyName]: rawRelation[column.columnName]
                    }), {});
                    return entityRelations.concat((0, lodash_filter_1.default)(relations, filter));
                }, []);
            },
            batchSelect: (queryBuilder, entities) => {
                this.existingAlias = queryBuilder.expressionMap.aliases.find((alias) => {
                    return alias.type === 'join' && alias.target === relation.entityMetadata.target;
                });
                // Set the alias to use for the join
                const joinAlias = this.existingAlias?.name || aliasName;
                const whereParams = {};
                const whereCondition = relation.entityMetadata.primaryColumns
                    .map((column) => {
                    const paramName = this.getParamName(joinAlias);
                    whereParams[paramName] = entities.map((entity) => column.getEntityValue(entity));
                    // Also select the columns, so we can use them to map later
                    queryBuilder.addSelect(`${joinAlias}.${column.propertyPath}`, this.buildAlias(joinAlias, column.propertyName));
                    return `${joinAlias}.${column.propertyPath} IN (:...${paramName})`;
                })
                    .join(' AND ');
                // Only add the joins if there was not an existing one yet for this relation
                if (!this.existingAlias) {
                    queryBuilder = joins.reduce((qb, join) => {
                        const conditions = join.conditions.map(({ leftHand, rightHand }) => `${leftHand} = ${rightHand}`);
                        return qb.innerJoin(join.target, join.alias, conditions.join(' AND '));
                    }, queryBuilder);
                }
                return queryBuilder.andWhere(whereCondition, whereParams);
            },
            whereCondition: (entity) => {
                const params = {};
                const sql = relation.entityMetadata.primaryColumns
                    .map((column) => {
                    const paramName = this.getParamName(aliasName);
                    params[paramName] = column.getEntityValue(entity);
                    return `${aliasName}.${column.propertyPath} = :${paramName}`;
                })
                    .join(' AND ');
                return { sql, params };
            }
        };
    }
    getOneToManyOrOneToOneNotOwnerMeta(relation) {
        const aliasName = relation.propertyName;
        const columns = relation.inverseRelation.joinColumns;
        const fromPrimaryKeys = relation.inverseEntityMetadata.primaryColumns.map((pk) => ({
            selectPath: `${aliasName}.${pk.propertyName}`,
            databasePath: pk.databasePath,
            propertyName: pk.propertyName
        }));
        return {
            relation,
            from: relation.inverseRelation.entityMetadata.target,
            fromAlias: aliasName,
            fromPrimaryKeys,
            joins: [],
            mapRelations: (entity, relations, rawRelations) => {
                // create a filter for the raw relation array to filter only for the objects that are related to this entity
                // do this by building an alias based on the column database name for filtering
                // e.g. if the entity is a customer, look for a customer id in the raw relation entity object.
                const rawFilter = columns.reduce((columnsFilter, column) => ({
                    ...columnsFilter,
                    [this.buildAlias(column.databaseName)]: column.referencedColumn.getEntityValue(entity)
                }), {});
                // First filter the raw relations with the PK of the entity, then filter the relations
                // with the PK of the raw relation
                return (0, lodash_filter_1.default)(rawRelations, rawFilter).reduce((entityRelations, rawRelation) => {
                    const filter = this.getRelationPrimaryKeysPropertyNameAndColumnsName().reduce((columnsFilter, column) => ({
                        ...columnsFilter,
                        [column.propertyName]: rawRelation[column.columnName]
                    }), {});
                    return entityRelations.concat((0, lodash_filter_1.default)(relations, filter));
                }, []);
            },
            batchSelect: (qb, entities) => {
                const params = {};
                const where = columns
                    .map((column) => {
                    const paramName = this.getParamName(aliasName);
                    params[paramName] = entities.map((entity) => column.referencedColumn.getEntityValue(entity));
                    return `${aliasName}.${column.propertyPath} IN (:...${paramName})`;
                })
                    .join(' AND ');
                // Distinct the query so the joins cannot cause duplicate data
                return qb.distinct(true).andWhere(where, params);
            },
            whereCondition: (entity) => {
                const params = {};
                const sql = columns
                    .map((col) => {
                    const paramName = this.getParamName(aliasName);
                    params[paramName] = col.referencedColumn.getEntityValue(entity);
                    return `${aliasName}.${col.propertyPath} = :${paramName}`;
                })
                    .join(' AND ');
                return { sql, params };
            }
        };
    }
    getManyToManyOwnerMeta(relation) {
        const mainAlias = relation.propertyName;
        const joinAlias = relation.junctionEntityMetadata.tableName;
        const joins = [
            {
                target: joinAlias,
                alias: joinAlias,
                conditions: relation.inverseJoinColumns.map((inverseJoinColumn) => ({
                    leftHand: `${joinAlias}.${inverseJoinColumn.propertyName}`,
                    rightHand: `${mainAlias}.${inverseJoinColumn.referencedColumn.propertyName}`
                }))
            }
        ];
        const fromPrimaryKeys = relation.inverseEntityMetadata.primaryColumns.map((pk) => ({
            selectPath: `${mainAlias}.${pk.propertyName}`,
            databasePath: pk.databasePath,
            propertyName: pk.propertyName
        }));
        return {
            relation,
            from: relation.type,
            fromAlias: mainAlias,
            fromPrimaryKeys,
            joins,
            mapRelations: (entity, relations, rawRelations) => {
                return this.batchMapRelationsManyToMany(joinAlias, relation.joinColumns, entity, relations, rawRelations);
            },
            batchSelect: (qb, entities) => {
                return this.batchSelectManyToMany(qb, entities, joinAlias, relation.joinColumns);
            },
            whereCondition: (entity) => {
                const params = {};
                const sql = relation.joinColumns
                    .map((joinColumn) => {
                    const paramName = this.getParamName(joinColumn.propertyName);
                    params[paramName] = joinColumn.referencedColumn.getEntityValue(entity);
                    return `${joinAlias}.${joinColumn.propertyName} = :${paramName}`;
                })
                    .join(' AND ');
                return { sql, params };
            }
        };
    }
    getManyToManyNotOwnerMetadata(relation) {
        const mainAlias = relation.propertyName;
        const joinAlias = relation.junctionEntityMetadata.tableName;
        const joins = [
            {
                target: joinAlias,
                alias: joinAlias,
                conditions: relation.inverseRelation.joinColumns.map((joinColumn) => ({
                    leftHand: `${joinAlias}.${joinColumn.propertyName}`,
                    rightHand: `${mainAlias}.${joinColumn.referencedColumn.propertyName}`
                }))
            }
        ];
        const fromPrimaryKeys = relation.inverseEntityMetadata.primaryColumns.map((pk) => ({
            selectPath: `${mainAlias}.${pk.propertyName}`,
            databasePath: pk.databasePath,
            propertyName: pk.propertyName
        }));
        return {
            relation,
            from: relation.type,
            fromAlias: mainAlias,
            fromPrimaryKeys,
            joins,
            mapRelations: (entity, relations, rawRelations) => {
                return this.batchMapRelationsManyToMany(joinAlias, relation.inverseRelation.inverseJoinColumns, entity, relations, rawRelations);
            },
            batchSelect: (qb, entities) => {
                return this.batchSelectManyToMany(qb, entities, joinAlias, relation.inverseRelation.inverseJoinColumns);
            },
            whereCondition: (entity) => {
                const params = {};
                const sql = relation.inverseRelation.inverseJoinColumns
                    .map((inverseJoinColumn) => {
                    const paramName = this.getParamName(inverseJoinColumn.propertyName);
                    params[paramName] = inverseJoinColumn.referencedColumn.getEntityValue(entity);
                    return `${joinAlias}.${inverseJoinColumn.propertyName} = :${paramName}`;
                })
                    .join(' AND ');
                return { sql, params };
            }
        };
    }
    batchSelectManyToMany(queryBuilder, entities, joinAlias, columns) {
        const params = {};
        const sql = columns
            .map((column) => {
            const paramName = this.getParamName(column.propertyName);
            params[paramName] = entities.map((entity) => column.referencedColumn.getEntityValue(entity));
            // We also want to select the field, so we can map them back in the mapper
            queryBuilder.addSelect(`${joinAlias}.${column.propertyName}`, this.buildAlias(joinAlias, column.propertyName));
            return `${joinAlias}.${column.propertyName} IN (:...${paramName})`;
        })
            .join(' AND ');
        // Add the needed joins
        return this.relationMeta.joins
            .reduce((qb, join) => {
            const conditions = join.conditions.map(({ leftHand, rightHand }) => `${leftHand} = ${rightHand}`);
            return qb.innerJoin(join.target, join.alias, conditions.join(' AND '));
        }, queryBuilder)
            .andWhere(sql, params);
    }
    batchMapRelationsManyToMany(joinAlias, columns, entity, relations, rawRelations) {
        const rawFilter = columns.reduce((columnsFilter, column) => ({
            ...columnsFilter,
            [this.buildAlias(joinAlias, column.propertyName)]: column.referencedColumn.getEntityValue(entity)
        }), {});
        // First filter the raw relations with the PK of the entity, then filter the relations
        // with the PK of the raw relation
        return (0, lodash_filter_1.default)(rawRelations, rawFilter).reduce((entityRelations, rawRelation) => {
            const filter = this.getRelationPrimaryKeysPropertyNameAndColumnsName().reduce((columnsFilter, column) => ({
                ...columnsFilter,
                [column.propertyName]: rawRelation[column.columnName]
            }), {});
            return entityRelations.concat((0, lodash_filter_1.default)(relations, filter));
        }, []);
    }
    getParamName(prefix) {
        this.paramCount += 1;
        return `${prefix}_${this.paramCount}`;
    }
    get entityIndexColName() {
        return '__nestjsQuery__entityIndex__';
    }
    get escapedEntityIndexColName() {
        return this.escapeName(this.entityIndexColName);
    }
    get unionAlias() {
        return 'unioned';
    }
    escapeName(str) {
        return this.relationRepo.manager.connection.driver.escape(str);
    }
    getRelationPrimaryKeysPropertyNameAndColumnsName() {
        return this.relationMeta.fromPrimaryKeys.map((pk) => ({
            propertyName: pk.propertyName,
            columnName: this.buildAlias(pk.databasePath)
        }));
    }
    buildAlias(...alias) {
        alias.unshift(this.relationMeta.fromAlias);
        const buildOptions = {
            shorten: false,
            joiner: '_'
        };
        return DriverUtils_1.DriverUtils.buildAlias(this.relationRepo.manager.connection.driver, buildOptions, ...alias);
    }
}
exports.RelationQueryBuilder = RelationQueryBuilder;
//# sourceMappingURL=relation-query.builder.js.map