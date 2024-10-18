import { Provider } from '@nestjs/common';
import { PagingStrategies } from '../types';
import { CRUDAutoResolverOpts } from './resolver.provider';
export type HookProviderOptions<DTO, C, U> = Pick<CRUDAutoResolverOpts<DTO, C, U, unknown, PagingStrategies>, 'DTOClass' | 'CreateDTOClass' | 'UpdateDTOClass'>;
export declare const createHookProviders: (opts: HookProviderOptions<unknown, unknown, unknown>[]) => Provider[];
