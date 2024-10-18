import { Class } from '@ptc-org/nestjs-query-core';
import { HookTypes } from './types';
export declare const getHookToken: <DTO>(hookType: HookTypes, DTOClass: Class<DTO>) => string;
