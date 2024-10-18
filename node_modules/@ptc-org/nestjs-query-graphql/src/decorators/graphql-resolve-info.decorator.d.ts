import type { Class, QueryResolveTree, SelectRelation } from '@ptc-org/nestjs-query-core';
export interface GraphQLResolveInfoResult<InfoDTO, RelationsDTO = InfoDTO> {
    /**
     * @internal this implementation is not final and subjected to change! Use at own risk!
     */
    info?: QueryResolveTree<InfoDTO>;
    /**
     * @internal this implementation is not final and subjected to change! Use at own risk!
     */
    relations?: SelectRelation<RelationsDTO>[];
}
/**
 * @internal this implementation is not final and subjected to change! Use at own risk!
 */
export declare const GraphQLResultInfo: <DTO>(DTOClass: Class<DTO>) => ParameterDecorator;
