import { Filter, FilterComparisons, FilterFieldComparison } from '../interfaces';
import { QueryFieldMap } from './query.helpers';
export type LikeComparisonOperators = 'like' | 'notLike' | 'iLike' | 'notILike';
export type InComparisonOperators = 'in' | 'notIn';
export type BetweenComparisonOperators = 'between' | 'notBetween';
export type RangeComparisonOperators = 'gt' | 'gte' | 'lt' | 'lte';
export type BooleanComparisonOperators = 'eq' | 'neq' | 'is' | 'isNot';
export declare const isLikeComparisonOperator: (op: unknown) => op is LikeComparisonOperators;
export declare const isInComparisonOperators: (op: unknown) => op is InComparisonOperators;
export declare const isBetweenComparisonOperators: (op: unknown) => op is BetweenComparisonOperators;
export declare const isRangeComparisonOperators: (op: unknown) => op is RangeComparisonOperators;
export declare const isBooleanComparisonOperators: (op: unknown) => op is BooleanComparisonOperators;
export declare const isComparison: <DTO, K extends keyof DTO>(maybeComparison?: FilterFieldComparison<DTO[K]> | Filter<DTO[K]>) => maybeComparison is FilterFieldComparison<DTO[K]>;
export declare const getFilterFieldComparison: <DTO, K extends keyof DTO>(obj: FilterComparisons<DTO>, field: K) => FilterFieldComparison<DTO[K]> & {
    and?: Filter<DTO[K]>[];
    or?: Filter<DTO[K]>[];
} & FilterComparisons<DTO[K]>;
export declare const transformFilter: <From, To>(filter: Filter<From>, fieldMap: QueryFieldMap<From, To, keyof To>) => Filter<To>;
export declare const mergeFilter: <T>(base: Filter<T>, source: Filter<T>) => Filter<T>;
export declare const mergeFilters: <T>(...filters: Filter<T>[]) => Filter<T>;
export declare const getFilterFields: <DTO>(filter: Filter<DTO>) => string[];
export declare const getFilterComparisons: <DTO, K extends keyof DTO>(filter: Filter<DTO>, key: K) => FilterFieldComparison<DTO[K]>[];
export declare const transformFilterComparisons: <DTO, K extends keyof DTO>(filterComparisons: FilterFieldComparison<DTO[K]>[], key: K) => Filter<DTO>;
export declare const getFilterOmitting: <DTO>(filter: Filter<DTO>, ...keys: (keyof DTO | keyof {
    and?: Filter<DTO>[];
    or?: Filter<DTO>[];
})[]) => Filter<DTO>;
export declare function applyFilter<DTO>(dto: DTO[], filter: Filter<DTO>): DTO[];
export declare function applyFilter<DTO>(dto: DTO, filter: Filter<DTO>): boolean;
