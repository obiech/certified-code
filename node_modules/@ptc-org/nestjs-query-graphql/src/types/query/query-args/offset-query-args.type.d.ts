import { Class } from '@ptc-org/nestjs-query-core';
import { PagingStrategies } from '../paging';
import { OffsetQueryArgsTypeOpts, QueryType, StaticQueryType } from './interfaces';
export type OffsetQueryArgsType<DTO> = QueryType<DTO, PagingStrategies.OFFSET>;
export declare function createOffsetQueryArgs<DTO>(DTOClass: Class<DTO>, opts?: OffsetQueryArgsTypeOpts<DTO>): StaticQueryType<DTO, PagingStrategies.OFFSET>;
