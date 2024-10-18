"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterQueryBuilder = void 0;
const tslib_1 = require("tslib");
const nestjs_query_core_1 = require("@ptc-org/nestjs-query-core");
const lodash_merge_1 = tslib_1.__importDefault(require("lodash.merge"));
const aggregate_builder_1 = require("./aggregate.builder");
const sql_comparison_builder_1 = require("./sql-comparison.builder");
const where_builder_1 = require("./where.builder");
/**
 * @internal
 *
 * Class that will convert a Query into a `typeorm` Query Builder.
 */
class FilterQueryBuilder {
    constructor(repo, whereBuilder = new where_builder_1.WhereBuilder(new sql_comparison_builder_1.SQLComparisonBuilder(sql_comparison_builder_1.SQLComparisonBuilder.DEFAULT_COMPARISON_MAP, repo)), aggregateBuilder = new aggregate_builder_1.AggregateBuilder(repo)) {
        this.repo = repo;
        this.whereBuilder = whereBuilder;
        this.aggregateBuilder = aggregateBuilder;
        this.virtualColumns = [];
        this.virtualColumns = repo.metadata.columns
            .filter(({ isVirtualProperty }) => isVirtualProperty)
            .map(({ propertyName }) => propertyName);
    }
    /**
     * Create a `typeorm` SelectQueryBuilder with `WHERE`, `ORDER BY` and `LIMIT/OFFSET` clauses.
     *
     * @param query - the query to apply.
     */
    select(query) {
        let qb = this.createQueryBuilder();
        qb = this.applyRelationJoinsRecursive(qb, this.getReferencedRelationsWithAliasRecursive(this.repo.metadata, query.filter, query.relations), query.relations);
        qb = this.applyFilter(qb, query.filter, qb.alias);
        qb = this.applySorting(qb, query.sorting, qb.alias);
        qb = this.applyPaging(qb, query.paging, this.shouldUseSkipTake(query.filter));
        return qb;
    }
    selectById(id, query) {
        return this.select(query).andWhereInIds(id);
    }
    aggregate(query, aggregate) {
        const hasFilterRelations = this.filterHasRelations(query.filter);
        let qb = this.createQueryBuilder();
        qb = hasFilterRelations
            ? this.applyRelationJoinsRecursive(qb, this.getReferencedRelationsWithAliasRecursive(this.repo.metadata, query.filter))
            : qb;
        qb = this.applyAggregate(qb, aggregate, qb.alias);
        qb = this.applyFilter(qb, query.filter, qb.alias);
        qb = this.applyAggregateSorting(qb, aggregate.groupBy, qb.alias);
        qb = this.applyAggregateGroupBy(qb, aggregate.groupBy, qb.alias);
        return qb;
    }
    /**
     * Create a `typeorm` DeleteQueryBuilder with a WHERE clause.
     *
     * @param query - the query to apply.
     */
    delete(query) {
        return this.applyFilter(this.repo.createQueryBuilder().delete(), query.filter);
    }
    /**
     * Create a `typeorm` DeleteQueryBuilder with a WHERE clause.
     *
     * @param query - the query to apply.
     */
    softDelete(query) {
        return this.applyFilter(this.repo.createQueryBuilder().softDelete(), query.filter);
    }
    /**
     * Create a `typeorm` UpdateQueryBuilder with `WHERE` and `ORDER BY` clauses
     *
     * @param query - the query to apply.
     */
    update(query) {
        const qb = this.applyFilter(this.repo.createQueryBuilder().update(), query.filter);
        return this.applySorting(qb, query.sorting);
    }
    /**
     * Applies paging to a Pageable `typeorm` query builder
     * @param qb - the `typeorm` QueryBuilder
     * @param paging - the Paging options.
     * @param useSkipTake - if skip/take should be used instead of limit/offset.
     */
    applyPaging(qb, paging, useSkipTake) {
        if (!paging) {
            return qb;
        }
        if (useSkipTake) {
            return qb.take(paging.limit).skip(paging.offset);
        }
        return qb.limit(paging.limit).offset(paging.offset);
    }
    /**
     * Applies the filter from a Query to a `typeorm` QueryBuilder.
     *
     * @param qb - the `typeorm` QueryBuilder.
     * @param aggregate - the aggregates to select.
     * @param alias - optional alias to use to qualify an identifier
     */
    applyAggregate(qb, aggregate, alias) {
        return this.aggregateBuilder.build(qb, aggregate, alias);
    }
    /**
     * Applies the filter from a Query to a `typeorm` QueryBuilder.
     *
     * @param qb - the `typeorm` QueryBuilder.
     * @param filter - the filter.
     * @param alias - optional alias to use to qualify an identifier
     */
    applyFilter(qb, filter, alias) {
        if (!filter) {
            return qb;
        }
        return this.whereBuilder.build(qb, filter, this.getReferencedRelationsWithAliasRecursive(this.repo.metadata, filter), alias);
    }
    /**
     * Applies the ORDER BY clause to a `typeorm` QueryBuilder.
     * @param qb - the `typeorm` QueryBuilder.
     * @param sorts - an array of SortFields to create the ORDER BY clause.
     * @param alias - optional alias to use to qualify an identifier
     */
    applySorting(qb, sorts, alias) {
        if (!sorts) {
            return qb;
        }
        return sorts.reduce((prevQb, { field, direction, nulls }) => {
            let col = alias ? `${alias}.${field}` : `${field}`;
            if (this.virtualColumns.includes(field)) {
                col = prevQb.escape(alias ? `${alias}_${field}` : `${field}`);
            }
            return prevQb.addOrderBy(col, direction, nulls);
        }, qb);
    }
    applyAggregateGroupBy(qb, aggregatedGroupBy, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    alias) {
        if (!aggregatedGroupBy) {
            return qb;
        }
        return aggregatedGroupBy.reduce((prevQb, aggregatedField) => {
            return prevQb.addGroupBy(prevQb.escape(aggregate_builder_1.AggregateBuilder.getGroupByAlias(aggregatedField.field)));
        }, qb);
    }
    applyAggregateSorting(qb, aggregatedGroupBy, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    alias) {
        if (!aggregatedGroupBy) {
            return qb;
        }
        return aggregatedGroupBy.reduce((prevQb, aggregatedField) => {
            return prevQb.addOrderBy(prevQb.escape(aggregate_builder_1.AggregateBuilder.getGroupByAlias(aggregatedField.field)), 'ASC');
        }, qb);
    }
    /**
     * Create a `typeorm` SelectQueryBuilder which can be used as an entry point to create update, delete or insert
     * QueryBuilders.
     */
    createQueryBuilder() {
        return this.repo.createQueryBuilder();
    }
    /**
     * Gets relations referenced in the filter and adds joins for them to the query builder
     * @param qb - the `typeorm` QueryBuilder.
     * @param relationsMap - the relations map.
     * @param selectRelations - additional relations to select
     * @param alias - alias to use
     *
     * @returns the query builder for chaining
     */
    applyRelationJoinsRecursive(qb, relationsMap, selectRelations, alias) {
        if (!relationsMap) {
            return qb;
        }
        const referencedRelations = Object.entries(relationsMap);
        // TODO:: If relation is not nullable use inner join?
        return referencedRelations.reduce((rqb, [relationKey, relation]) => {
            const relationAlias = relation.alias;
            const relationChildren = relation.relations;
            const selectRelation = selectRelations && selectRelations.find(({ name }) => name === relationKey);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            if (selectRelation) {
                rqb = rqb.leftJoinAndSelect(`${alias ?? rqb.alias}.${relationKey}`, relationAlias);
                // Apply filter for the current relation
                rqb = this.applyFilter(rqb, selectRelation.query.filter, relationAlias);
                return this.applyRelationJoinsRecursive(rqb, relationChildren, selectRelation.query.relations, relationAlias);
            }
            return this.applyRelationJoinsRecursive(rqb.leftJoin(`${alias ?? rqb.alias}.${relationKey}`, relationAlias), relationChildren, [], relationAlias);
        }, qb);
    }
    /**
     * Checks if a filter references any relations.
     *
     * @returns true if there are any referenced relations
     */
    filterHasRelations(filter) {
        if (!filter) {
            return false;
        }
        const { relationNames } = this;
        return (0, nestjs_query_core_1.getFilterFields)(filter).filter((f) => relationNames.includes(f)).length > 0;
    }
    /**
     * Checks if the query should use skip/take instead of limit/offset
     */
    shouldUseSkipTake(filter) {
        if (!filter) {
            return false;
        }
        return ((0, nestjs_query_core_1.getFilterFields)(filter).filter((field) => {
            const relation = this.repo.metadata.relations.find(({ propertyName }) => propertyName === field);
            if (!relation) {
                return false;
            }
            if (!relation || relation.isOneToOne || relation.isManyToOne) {
                return false;
                // } else if (relation.isOneToMany) {
                //   TODO
                // return false
            }
            else {
                return true;
            }
        }).length > 0);
    }
    getReferencedRelationsWithAliasRecursive(metadata, filter = {}, selectRelations = []) {
        const referencedRelations = this.getReferencedRelationsRecursive(metadata, filter, selectRelations);
        return this.injectRelationsAliasRecursive(referencedRelations);
    }
    injectRelationsAliasRecursive(relations, counter = new Map()) {
        return Object.entries(relations).reduce((prev, [name, children]) => {
            const count = (counter.get(name) ?? -1) + 1;
            const alias = count === 0 ? name : `${name}_${count}`;
            counter.set(name, count);
            return {
                ...prev,
                [name]: {
                    alias,
                    relations: this.injectRelationsAliasRecursive(children, counter)
                }
            };
        }, {});
    }
    getReferencedRelationsRecursive(metadata, filter, selectRelations = []) {
        const referencedFields = Array.from(new Set(Object.keys(filter)));
        const referencedRelations = selectRelations.reduce((relations, selectRelation) => {
            const referencedRelation = metadata.relations.find((r) => r.propertyName === selectRelation.name);
            if (!referencedRelation) {
                return relations;
            }
            relations[selectRelation.name] = {};
            if (selectRelation.query.relations) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                relations[selectRelation.name] = this.getReferencedRelationsRecursive(referencedRelation.inverseEntityMetadata, {}, selectRelation.query.relations);
            }
            return relations;
        }, {});
        return referencedFields.reduce((prev, curr) => {
            const currFilterValue = filter[curr];
            if ((curr === 'and' || curr === 'or') && currFilterValue) {
                for (const subFilter of currFilterValue) {
                    prev = (0, lodash_merge_1.default)(prev, this.getReferencedRelationsRecursive(metadata, subFilter, []));
                }
            }
            const referencedRelation = metadata.relations.find((r) => r.propertyName === curr);
            if (!referencedRelation) {
                return prev;
            }
            return {
                ...prev,
                [curr]: (0, lodash_merge_1.default)(prev[curr], this.getReferencedRelationsRecursive(referencedRelation.inverseEntityMetadata, currFilterValue, []))
            };
        }, referencedRelations);
    }
    get relationNames() {
        return this.repo.metadata.relations.map((r) => r.propertyName);
    }
}
exports.FilterQueryBuilder = FilterQueryBuilder;
//# sourceMappingURL=filter-query.builder.js.map