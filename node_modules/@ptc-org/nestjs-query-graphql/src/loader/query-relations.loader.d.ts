import { Class, Query, QueryService } from '@ptc-org/nestjs-query-core';
import { NestjsQueryDataloader } from './relations.loader';
type QueryRelationsArgs<DTO, Relation> = {
    dto: DTO;
    query: Query<Relation>;
};
export declare class QueryRelationsLoader<DTO, Relation> implements NestjsQueryDataloader<DTO, QueryRelationsArgs<DTO, Relation>, Relation[] | Error> {
    readonly RelationDTO: Class<Relation>;
    readonly relationName: string;
    constructor(RelationDTO: Class<Relation>, relationName: string);
    createLoader(service: QueryService<DTO, unknown, unknown>): (queryArgs: ReadonlyArray<QueryRelationsArgs<DTO, Relation>>) => Promise<(Relation[] | Error)[]>;
    private loadResults;
    private groupQueries;
}
export {};
