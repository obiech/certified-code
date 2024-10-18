import { NestInterceptor } from '@nestjs/common';
import { Class } from '@ptc-org/nestjs-query-core';
import { Hook, HookTypes } from '../hooks';
export type HookContext<H extends Hook<unknown>> = {
    hooks?: H[];
};
export declare function HookInterceptor(type: HookTypes, ...DTOClasses: Class<unknown>[]): Class<NestInterceptor>;
