import { Class } from '@ptc-org/nestjs-query-core';
import { Hook } from './hooks';
export declare const createDefaultHook: <T>(func: (instance: T, context: any) => T | Promise<T>) => Class<Hook<T, any>>;
