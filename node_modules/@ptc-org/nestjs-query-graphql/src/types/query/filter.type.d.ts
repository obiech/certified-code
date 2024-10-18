import { Class, Filter } from '@ptc-org/nestjs-query-core';
export type FilterTypeOptions = {
    allowedBooleanExpressions?: ('and' | 'or')[];
    filterDepth?: number;
};
export type FilterableRelations = Record<string, Class<unknown>>;
export interface FilterConstructor<T> {
    hasRequiredFilters: boolean;
    new (): Filter<T>;
}
export declare function FilterType<T>(TClass: Class<T>): FilterConstructor<T>;
export declare function DeleteFilterType<T>(TClass: Class<T>): FilterConstructor<T>;
export declare function UpdateFilterType<T>(TClass: Class<T>): FilterConstructor<T>;
export declare function SubscriptionFilterType<T>(TClass: Class<T>): FilterConstructor<T>;
export declare function AggregateFilterType<T>(TClass: Class<T>): FilterConstructor<T>;
