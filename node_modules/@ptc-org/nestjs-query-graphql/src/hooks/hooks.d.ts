import { Class, Query } from '@ptc-org/nestjs-query-core';
import { CreateManyInputType, CreateOneInputType, DeleteManyInputType, DeleteOneInputType, FindOneArgsType, UpdateManyInputType, UpdateOneInputType } from '../types';
export interface Hook<T, Context = any> {
    run(instance: T, context: Context): T | Promise<T>;
}
export declare function isHookClass<T, Context>(hook: unknown): hook is Class<Hook<T, Context>>;
export type BeforeCreateOneHook<DTO, Context = any> = Hook<CreateOneInputType<DTO>, Context>;
export type BeforeCreateManyHook<DTO, Context = any> = Hook<CreateManyInputType<DTO>, Context>;
export type BeforeUpdateOneHook<DTO, Context = any> = Hook<UpdateOneInputType<DTO>, Context>;
export type BeforeUpdateManyHook<DTO, U, Context = any> = Hook<UpdateManyInputType<DTO, U>, Context>;
export type BeforeDeleteOneHook<Context = any> = Hook<DeleteOneInputType, Context>;
export type BeforeDeleteManyHook<DTO, Context = any> = Hook<DeleteManyInputType<DTO>, Context>;
export type BeforeQueryManyHook<DTO, Context = any> = Hook<Query<DTO>, Context>;
export type BeforeFindOneHook<Context = any> = Hook<FindOneArgsType, Context>;
