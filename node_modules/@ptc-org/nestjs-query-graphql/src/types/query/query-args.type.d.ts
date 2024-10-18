import { Class } from '@ptc-org/nestjs-query-core';
import { PagingStrategies } from './paging';
import { CursorQueryArgsTypeOpts, NonePagingQueryArgsTypeOpts, OffsetQueryArgsTypeOpts, QueryArgsTypeOpts, StaticQueryType } from './query-args';
export declare const isStaticQueryArgsType: <DTO>(obj: any) => obj is StaticQueryType<DTO, PagingStrategies>;
export declare function QueryArgsType<DTO>(DTOClass: Class<DTO>, opts: OffsetQueryArgsTypeOpts<DTO>): StaticQueryType<DTO, PagingStrategies.OFFSET>;
export declare function QueryArgsType<DTO>(DTOClass: Class<DTO>, opts: NonePagingQueryArgsTypeOpts<DTO>): StaticQueryType<DTO, PagingStrategies.NONE>;
export declare function QueryArgsType<DTO>(DTOClass: Class<DTO>, opts: CursorQueryArgsTypeOpts<DTO>): StaticQueryType<DTO, PagingStrategies.CURSOR>;
export declare function QueryArgsType<DTO>(DTOClass: Class<DTO>, opts?: QueryArgsTypeOpts<DTO>): StaticQueryType<DTO, PagingStrategies>;
