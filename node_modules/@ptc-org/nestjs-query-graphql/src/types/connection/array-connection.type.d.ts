import { Class } from '@ptc-org/nestjs-query-core';
import { PagingStrategies } from '../query';
import { StaticConnectionType } from './interfaces';
export declare function getOrCreateArrayConnectionType<DTO>(TItemClass: Class<DTO>): StaticConnectionType<DTO, PagingStrategies.NONE>;
