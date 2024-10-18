import { Class, FindRelationOptions, QueryService, SelectRelations } from '@ptc-org/nestjs-query-core';
import { NestjsQueryDataloader } from './relations.loader';
export type FindRelationsArgs<DTO, Relation> = {
    dto: DTO;
} & FindRelationOptions<Relation> & SelectRelations<Relation>;
type FindRelationsOpts<Relation> = Omit<FindRelationOptions<Relation>, 'filter'>;
export declare class FindRelationsLoader<DTO, Relation> implements NestjsQueryDataloader<DTO, FindRelationsArgs<DTO, Relation>, Relation | undefined | Error> {
    readonly RelationDTO: Class<Relation>;
    readonly relationName: string;
    constructor(RelationDTO: Class<Relation>, relationName: string);
    createLoader(service: QueryService<DTO, unknown, unknown>, opts?: FindRelationsOpts<Relation>): (args: ReadonlyArray<FindRelationsArgs<DTO, Relation>>) => Promise<(Relation | undefined | Error)[]>;
    private loadResults;
    private groupFinds;
}
export {};
