import { Class, MetaValue } from '@ptc-org/nestjs-query-core';
import { QueryArgsTypeOpts } from '../types';
export type QueryOptionsDecoratorOpts<DTO> = QueryArgsTypeOpts<DTO>;
export declare function QueryOptions(opts: QueryOptionsDecoratorOpts<any>): (target: Class<unknown>) => void;
export declare const getQueryOptions: <DTO>(DTOClass: Class<DTO>) => QueryArgsTypeOpts<DTO>;
