import { AggregateQuery, Class, Query } from '@ptc-org/nestjs-query-core';
import { ObjectLiteral, Repository, SelectQueryBuilder } from 'typeorm';
import { RelationMetadata } from 'typeorm/metadata/RelationMetadata';
import { FilterQueryBuilder } from './filter-query.builder';
interface JoinCondition {
    leftHand: string;
    rightHand: string;
}
interface JoinColumn {
    target: Class<unknown> | string;
    alias: string;
    conditions: JoinCondition[];
}
type SQLFragment = {
    sql: string;
    params: ObjectLiteral;
};
type PrimaryKey = {
    databasePath: string;
    selectPath: string;
    propertyName: string;
};
interface RelationQuery<Relation, Entity> {
    relation: RelationMetadata;
    from: Class<Relation>;
    fromAlias: string;
    fromPrimaryKeys: PrimaryKey[];
    joins: JoinColumn[];
    mapRelations<RawRelation>(entity: Entity, relations: Relation[], rawRelations: RawRelation[]): Relation[];
    batchSelect(qb: SelectQueryBuilder<Relation>, entities: Entity[]): SelectQueryBuilder<Relation>;
    whereCondition(entity: Entity): SQLFragment;
}
export type EntityIndexRelation<Relation> = Relation & {
    __nestjsQuery__entityIndex__: number;
};
/**
 * @internal
 *
 * Class that will convert a Query into a `typeorm` Query Builder.
 */
export declare class RelationQueryBuilder<Entity, Relation> {
    readonly repo: Repository<Entity>;
    readonly relation: string;
    readonly filterQueryBuilder: FilterQueryBuilder<Relation>;
    readonly relationRepo: Repository<Relation>;
    private relationMetadata;
    private paramCount;
    /**
     * Will be filled if the query builder already contains the join
     *
     * TODO:: Do this different? Maybe cleanup the batchSelect / whereCondition as its almost the same
     */
    private existingAlias;
    constructor(repo: Repository<Entity>, relation: string);
    select(entity: Entity, query: Query<Relation>): SelectQueryBuilder<Relation>;
    batchSelect(entities: Entity[], query: Query<Relation>, withDeleted?: boolean): SelectQueryBuilder<Relation>;
    batchAggregate(entities: Entity[], query: Query<Relation>, aggregateQuery: AggregateQuery<Relation>): SelectQueryBuilder<EntityIndexRelation<Record<string, unknown>>>;
    aggregate(entity: Entity, query: Query<Relation>, aggregateQuery: AggregateQuery<Relation>): SelectQueryBuilder<Relation>;
    get relationMeta(): RelationQuery<Relation, Entity>;
    private createUnionAggregateSubQuery;
    private createRelationQueryBuilder;
    private getManyToOneOrOneToOneOwnerMeta;
    private getOneToManyOrOneToOneNotOwnerMeta;
    private getManyToManyOwnerMeta;
    private getManyToManyNotOwnerMetadata;
    private batchSelectManyToMany;
    private batchMapRelationsManyToMany;
    private getParamName;
    get entityIndexColName(): string;
    private get escapedEntityIndexColName();
    private get unionAlias();
    private escapeName;
    private getRelationPrimaryKeysPropertyNameAndColumnsName;
    private buildAlias;
}
export {};
