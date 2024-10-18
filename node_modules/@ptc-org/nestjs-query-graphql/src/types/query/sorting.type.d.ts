import { Class, SortField } from '@ptc-org/nestjs-query-core';
export declare function getOrCreateSortType<T>(TClass: Class<T>): Class<SortField<T>>;
