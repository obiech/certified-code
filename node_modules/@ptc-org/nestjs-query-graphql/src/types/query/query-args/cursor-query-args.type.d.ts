import { Class } from '@ptc-org/nestjs-query-core';
import { PagingStrategies } from '../paging';
import { CursorQueryArgsTypeOpts, QueryType, StaticQueryType } from './interfaces';
export type CursorQueryArgsType<DTO> = QueryType<DTO, PagingStrategies.CURSOR>;
export declare function createCursorQueryArgsType<DTO>(DTOClass: Class<DTO>, opts?: CursorQueryArgsTypeOpts<DTO>): StaticQueryType<DTO, PagingStrategies.CURSOR>;
