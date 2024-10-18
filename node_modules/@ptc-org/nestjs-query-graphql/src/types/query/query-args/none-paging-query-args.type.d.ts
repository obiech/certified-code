import { Class } from '@ptc-org/nestjs-query-core';
import { PagingStrategies } from '../paging';
import { NonePagingQueryArgsTypeOpts, QueryType, StaticQueryType } from './interfaces';
export type NonePagingQueryArgsType<DTO> = QueryType<DTO, PagingStrategies.NONE>;
export declare function createNonePagingQueryArgsType<DTO>(DTOClass: Class<DTO>, opts?: NonePagingQueryArgsTypeOpts<DTO>): StaticQueryType<DTO, PagingStrategies.NONE>;
