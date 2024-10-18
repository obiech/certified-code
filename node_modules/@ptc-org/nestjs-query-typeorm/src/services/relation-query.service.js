"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelationQueryService = void 0;
const tslib_1 = require("tslib");
const nestjs_query_core_1 = require("@ptc-org/nestjs-query-core");
const lodash_omit_1 = tslib_1.__importDefault(require("lodash.omit"));
const query_1 = require("../query");
/**
 * Base class to house relations loading.
 * @internal
 */
class RelationQueryService {
    async queryRelations(RelationClass, relationName, dto, query) {
        if (Array.isArray(dto)) {
            return this.batchQueryRelations(RelationClass, relationName, dto, query);
        }
        const assembler = nestjs_query_core_1.AssemblerFactory.getAssembler(RelationClass, this.getRelationEntity(relationName));
        const relationQueryBuilder = this.getRelationQueryBuilder(relationName);
        return assembler.convertAsyncToDTOs(relationQueryBuilder.select(dto, assembler.convertQuery(query)).getMany());
    }
    async aggregateRelations(RelationClass, relationName, dto, filter, aggregate) {
        if (Array.isArray(dto)) {
            return this.batchAggregateRelations(RelationClass, relationName, dto, filter, aggregate);
        }
        const assembler = nestjs_query_core_1.AssemblerFactory.getAssembler(RelationClass, this.getRelationEntity(relationName));
        const relationQueryBuilder = this.getRelationQueryBuilder(relationName);
        const aggResponse = await query_1.AggregateBuilder.asyncConvertToAggregateResponse(relationQueryBuilder
            .aggregate(dto, assembler.convertQuery({ filter }), assembler.convertAggregateQuery(aggregate))
            .getRawMany());
        return aggResponse.map((agg) => assembler.convertAggregateResponse(agg));
    }
    async countRelations(RelationClass, relationName, dto, filter) {
        if (Array.isArray(dto)) {
            return this.batchCountRelations(RelationClass, relationName, dto, filter);
        }
        const assembler = nestjs_query_core_1.AssemblerFactory.getAssembler(RelationClass, this.getRelationEntity(relationName));
        const relationQueryBuilder = this.getRelationQueryBuilder(relationName);
        return relationQueryBuilder.select(dto, assembler.convertQuery({ filter })).getCount();
    }
    async findRelation(RelationClass, relationName, dto, opts) {
        if (Array.isArray(dto)) {
            return this.batchFindRelations(RelationClass, relationName, dto, opts);
        }
        const assembler = nestjs_query_core_1.AssemblerFactory.getAssembler(RelationClass, this.getRelationEntity(relationName));
        let relationEntity = opts?.lookedAhead ? dto[relationName] : undefined;
        if (!relationEntity) {
            const relationQueryBuilder = this.getRelationQueryBuilder(relationName).select(dto, {
                filter: opts?.filter,
                paging: { limit: 1 }
            });
            if (opts?.withDeleted) {
                relationQueryBuilder.withDeleted();
            }
            relationEntity = await relationQueryBuilder.getOne();
        }
        return relationEntity ? assembler.convertToDTO(relationEntity) : undefined;
    }
    /**
     * Add a single relation.
     * @param id - The id of the entity to add the relation to.
     * @param relationName - The name of the relation to query for.
     * @param relationIds - The ids of relations to add.
     * @param opts - Addition options
     */
    async addRelations(relationName, id, relationIds, opts) {
        const entity = await this.getById(id, opts);
        const relations = await this.getRelations(relationName, relationIds, opts?.relationFilter);
        if (!this.foundAllRelations(relationIds, relations)) {
            throw new Error(`Unable to find all ${relationName} to add to ${this.EntityClass.name}`);
        }
        await this.createTypeormRelationQueryBuilder(entity, relationName).add(relationIds);
        return entity;
    }
    /**
     * Set the relations on the entity.
     *
     * @param id - The id of the entity to set the relation on.
     * @param relationName - The name of the relation to query for.
     * @param relationIds - The ids of the relation to set on the entity. If the relationIds is empty all relations
     * will be removed.
     * @param opts - Additional options
     */
    async setRelations(relationName, id, relationIds, opts) {
        const entity = await this.getById(id, opts);
        const relations = await this.getRelations(relationName, relationIds, opts?.relationFilter);
        if (relationIds.length) {
            if (!this.foundAllRelations(relationIds, relations)) {
                throw new Error(`Unable to find all ${relationName} to set on ${this.EntityClass.name}`);
            }
        }
        const relationQueryBuilder = this.getRelationQueryBuilder(relationName);
        const existingRelations = await relationQueryBuilder.select(entity, { filter: opts?.relationFilter }).getMany();
        await this.createTypeormRelationQueryBuilder(entity, relationName).addAndRemove(relations, existingRelations);
        return entity;
    }
    /**
     * Set the relation on the entity.
     *
     * @param id - The id of the entity to set the relation on.
     * @param relationName - The name of the relation to query for.
     * @param relationId - The id of the relation to set on the entity.
     * @param opts - Additional options
     */
    async setRelation(relationName, id, relationId, opts) {
        const entity = await this.getById(id, opts);
        const relation = (await this.getRelations(relationName, [relationId], opts?.relationFilter))[0];
        if (!relation) {
            throw new Error(`Unable to find ${relationName} to set on ${this.EntityClass.name}`);
        }
        await this.createTypeormRelationQueryBuilder(entity, relationName).set(relationId);
        return entity;
    }
    /**
     * Removes multiple relations.
     * @param id - The id of the entity to add the relation to.
     * @param relationName - The name of the relation to query for.
     * @param relationIds - The ids of the relations to add.
     * @param opts - Additional options
     */
    async removeRelations(relationName, id, relationIds, opts) {
        const entity = await this.getById(id, opts);
        const relations = await this.getRelations(relationName, relationIds, opts?.relationFilter);
        if (!this.foundAllRelations(relationIds, relations)) {
            throw new Error(`Unable to find all ${relationName} to remove from ${this.EntityClass.name}`);
        }
        await this.createTypeormRelationQueryBuilder(entity, relationName).remove(relationIds);
        return entity;
    }
    /**
     * Remove the relation on the entity.
     *
     * @param id - The id of the entity to set the relation on.
     * @param relationName - The name of the relation to query for.
     * @param relationId - The id of the relation to set on the entity.
     */
    async removeRelation(relationName, id, relationId, opts) {
        const entity = await this.getById(id, opts);
        const relation = (await this.getRelations(relationName, [relationId], opts?.relationFilter))[0];
        if (!relation) {
            throw new Error(`Unable to find ${relationName} to remove from ${this.EntityClass.name}`);
        }
        const meta = this.getRelationMeta(relationName);
        if (meta.isOneToOne || meta.isManyToOne) {
            await this.createTypeormRelationQueryBuilder(entity, relationName).set(null);
        }
        else {
            await this.createTypeormRelationQueryBuilder(entity, relationName).remove(relationId);
        }
        return entity;
    }
    getRelationQueryBuilder(name) {
        return new query_1.RelationQueryBuilder(this.repo, name);
    }
    /**
     * Query for an array of relations for multiple dtos.
     * @param RelationClass - The class to serialize the relations into.
     * @param entities - The entities to query relations for.
     * @param relationName - The name of relation to query for.
     * @param query - A query to filter, page or sort relations.
     * @param withDeleted - Also query the soft deleted records
     */
    async batchQueryRelations(RelationClass, relationName, entities, query, withDeleted) {
        const assembler = nestjs_query_core_1.AssemblerFactory.getAssembler(RelationClass, this.getRelationEntity(relationName));
        const convertedQuery = assembler.convertQuery(query);
        const relationQueryBuilder = this.getRelationQueryBuilder(relationName);
        const entityRelations = await relationQueryBuilder.batchSelect(entities, convertedQuery, withDeleted).getRawAndEntities();
        return entities.reduce((results, entity) => {
            const relations = relationQueryBuilder.relationMeta.mapRelations(entity, entityRelations.entities, entityRelations.raw);
            return results.set(entity, assembler.convertToDTOs(relations));
        }, new Map());
    }
    /**
     * Query for an array of relations for multiple dtos.
     * @param RelationClass - The class to serialize the relations into.
     * @param entities - The entities to query relations for.
     * @param relationName - The name of relation to query for.
     * @param filter - Filter.
     * @param query - A query to filter, page or sort relations.
     */
    async batchAggregateRelations(RelationClass, relationName, entities, filter, query) {
        const assembler = nestjs_query_core_1.AssemblerFactory.getAssembler(RelationClass, this.getRelationEntity(relationName));
        const relationQueryBuilder = this.getRelationQueryBuilder(relationName);
        const convertedQuery = assembler.convertQuery({ filter });
        const rawAggregates = await relationQueryBuilder
            .batchAggregate(entities, convertedQuery, query)
            .getRawMany();
        return rawAggregates.reduce((results, relationAgg) => {
            // eslint-disable-next-line no-underscore-dangle
            const index = relationAgg.__nestjsQuery__entityIndex__;
            const e = entities[index];
            const resultingAgg = results.get(e) ?? [];
            results.set(e, [
                ...resultingAgg,
                ...query_1.AggregateBuilder.convertToAggregateResponse([(0, lodash_omit_1.default)(relationAgg, relationQueryBuilder.entityIndexColName)])
            ]);
            return results;
        }, new Map());
    }
    /**
     * Count the number of relations for multiple dtos.
     * @param RelationClass - The class to serialize the relations into.
     * @param entities - The entities to query relations for.
     * @param relationName - The name of relation to query for.
     * @param filter - The filter to apply to the relation query.
     */
    async batchCountRelations(RelationClass, relationName, entities, filter) {
        const assembler = nestjs_query_core_1.AssemblerFactory.getAssembler(RelationClass, this.getRelationEntity(relationName));
        const relationQueryBuilder = this.getRelationQueryBuilder(relationName);
        const convertedQuery = assembler.convertQuery({ filter });
        const entityRelations = await Promise.all(entities.map((e) => relationQueryBuilder.select(e, convertedQuery).getCount()));
        return entityRelations.reduce((results, relationCount, index) => {
            const e = entities[index];
            results.set(e, relationCount);
            return results;
        }, new Map());
    }
    /**
     * Query for a relation for multiple dtos.
     * @param RelationClass - The class to serialize the relations into.
     * @param dtos - The dto to query relations for.
     * @param relationName - The name of relation to query for.
     * @param opts - A query to filter, page or sort relations.
     */
    async batchFindRelations(RelationClass, relationName, dtos, opts) {
        // If the relation is looked ahead and all the entities have it
        if (opts?.lookedAhead) {
            const isNullable = this.getRelationMeta(relationName).isNullable;
            // Make sure the data is there
            if ((isNullable && dtos.some((entity) => entity[relationName])) ||
                (!isNullable && dtos.some((entity) => entity[relationName]))) {
                const assembler = nestjs_query_core_1.AssemblerFactory.getAssembler(RelationClass, this.getRelationEntity(relationName));
                return dtos.reduce((results, entity) => {
                    return results.set(entity, entity[relationName] ? assembler.convertToDTO(entity[relationName]) : undefined);
                }, new Map());
            }
        }
        const batchResults = await this.batchQueryRelations(RelationClass, relationName, dtos, {
            paging: { limit: dtos.length },
            filter: opts?.filter
        }, opts?.withDeleted);
        const results = new Map();
        batchResults.forEach((relation, dto) => {
            // get just the first one.
            results.set(dto, relation[0]);
        });
        return results;
    }
    createTypeormRelationQueryBuilder(entity, relationName) {
        return this.repo.createQueryBuilder().relation(relationName).of(entity);
    }
    getRelationMeta(relationName) {
        const relationMeta = this.repo.metadata.relations.find((r) => r.propertyName === relationName);
        if (!relationMeta) {
            throw new Error(`Unable to find relation ${relationName} on ${this.EntityClass.name}`);
        }
        return relationMeta;
    }
    getRelationEntity(relationName) {
        const relationMeta = this.getRelationMeta(relationName);
        if (typeof relationMeta.type === 'string') {
            const relationMetaData = this.repo.manager.connection.entityMetadatas.find((em) => em.targetName == relationMeta.type);
            if (relationMetaData) {
                return relationMetaData.target;
            }
        }
        return relationMeta.type;
    }
    getRelations(relationName, ids, filter) {
        const relationQueryBuilder = this.getRelationQueryBuilder(relationName).filterQueryBuilder;
        return relationQueryBuilder.selectById(ids, { filter }).getMany();
    }
    foundAllRelations(relationIds, relations) {
        return new Set([...relationIds]).size === relations.length;
    }
}
exports.RelationQueryService = RelationQueryService;
//# sourceMappingURL=relation-query.service.js.map