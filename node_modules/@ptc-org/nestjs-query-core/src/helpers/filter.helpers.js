"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyFilter = exports.getFilterOmitting = exports.transformFilterComparisons = exports.getFilterComparisons = exports.getFilterFields = exports.mergeFilters = exports.mergeFilter = exports.transformFilter = exports.getFilterFieldComparison = exports.isComparison = exports.isBooleanComparisonOperators = exports.isRangeComparisonOperators = exports.isBetweenComparisonOperators = exports.isInComparisonOperators = exports.isLikeComparisonOperator = void 0;
const filter_builder_1 = require("./filter.builder");
const isLikeComparisonOperator = (op) => op === 'like' || op === 'notLike' || op === 'iLike' || op === 'notILike';
exports.isLikeComparisonOperator = isLikeComparisonOperator;
const isInComparisonOperators = (op) => op === 'in' || op === 'notIn';
exports.isInComparisonOperators = isInComparisonOperators;
const isBetweenComparisonOperators = (op) => op === 'between' || op === 'notBetween';
exports.isBetweenComparisonOperators = isBetweenComparisonOperators;
const isRangeComparisonOperators = (op) => op === 'gt' || op === 'gte' || op === 'lt' || op === 'lte';
exports.isRangeComparisonOperators = isRangeComparisonOperators;
const isBooleanComparisonOperators = (op) => op === 'eq' || op === 'neq' || op === 'is' || op === 'isNot';
exports.isBooleanComparisonOperators = isBooleanComparisonOperators;
const isComparison = (maybeComparison) => {
    if (!maybeComparison) {
        return false;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return Object.keys(maybeComparison).every((op) => (0, exports.isLikeComparisonOperator)(op) ||
        (0, exports.isInComparisonOperators)(op) ||
        (0, exports.isBetweenComparisonOperators)(op) ||
        (0, exports.isRangeComparisonOperators)(op) ||
        (0, exports.isBooleanComparisonOperators)(op));
};
exports.isComparison = isComparison;
// TODO: test
const getFilterFieldComparison = (obj, field) => obj[field];
exports.getFilterFieldComparison = getFilterFieldComparison;
const transformFilter = (filter, fieldMap) => {
    if (!filter) {
        return undefined;
    }
    return Object.keys(filter).reduce((newFilter, filterField) => {
        if (filterField === 'and' || filterField === 'or') {
            return { ...newFilter, [filterField]: filter[filterField]?.map((f) => (0, exports.transformFilter)(f, fieldMap)) };
        }
        const fromField = filterField;
        const otherKey = fieldMap[fromField];
        if (!otherKey) {
            throw new Error(`No corresponding field found for '${filterField}' when transforming Filter`);
        }
        return { ...newFilter, [otherKey]: filter[fromField] };
    }, {});
};
exports.transformFilter = transformFilter;
const mergeFilter = (base, source) => {
    if (!Object.keys(base).length) {
        return source;
    }
    if (!Object.keys(source).length) {
        return base;
    }
    return { and: [source, base] };
};
exports.mergeFilter = mergeFilter;
const mergeFilters = (...filters) => {
    const newFilter = { and: [] };
    for (const filter of filters) {
        if (Object.keys(filter).length) {
            newFilter.and.push(filter);
        }
    }
    return newFilter;
};
exports.mergeFilters = mergeFilters;
const getFilterFields = (filter) => {
    const fieldSet = Object.keys(filter).reduce((fields, filterField) => {
        if (filterField === 'and' || filterField === 'or') {
            const andOrFilters = filter[filterField];
            if (andOrFilters !== undefined) {
                return andOrFilters.reduce((andOrFields, andOrFilter) => new Set([...andOrFields, ...(0, exports.getFilterFields)(andOrFilter)]), fields);
            }
        }
        else {
            fields.add(filterField);
        }
        return fields;
    }, new Set());
    return [...fieldSet];
};
exports.getFilterFields = getFilterFields;
const getFilterComparisons = (filter, key) => {
    const results = [];
    if (filter.and || filter.or) {
        const filters = [...(filter.and ?? []), ...(filter.or ?? [])];
        filters.forEach((f) => (0, exports.getFilterComparisons)(f, key).forEach((comparison) => results.push(comparison)));
    }
    const comparison = (0, exports.getFilterFieldComparison)(filter, key);
    if ((0, exports.isComparison)(comparison)) {
        results.push(comparison);
    }
    return [...results];
};
exports.getFilterComparisons = getFilterComparisons;
const transformFilterComparisons = (filterComparisons, key) => {
    return {
        [key]: filterComparisons.reduce((flatFilter, filter) => ({
            ...flatFilter,
            ...filter
        }), {})
    };
};
exports.transformFilterComparisons = transformFilterComparisons;
/*
getFilterComparisons only returns the first layer, this one will return everything, it only returns the same
item multiple times, that needs to be fixed first
 */
// export const getDeepFilterComparisons = <DTO, K extends keyof FilterComparisons<DTO>>(
//   filter: Filter<DTO>,
//   key: K
// ): FilterFieldComparison<DTO[K]>[] => {
//   let results: FilterFieldComparison<DTO[K]>[] = [];
//
//   const comparison = getFilterFieldComparison(filter as FilterComparisons<DTO>, key);
//   if (isComparison(comparison)) {
//     results.push(comparison);
//
//   } else if (Array.isArray(filter)) {
//     filter.forEach((f: Filter<DTO>) => {
//       results = results.concat(getFilterComparisons(f, key));
//     });
//   }
//
//   if (typeof filter === 'object') {
//     Object.keys(filter).forEach((subFilterKey) => {
//       const subFilter = filter[subFilterKey] as FilterFieldComparison<DTO[K]>;
//
//       if (subFilterKey === key) {
//         results.push(subFilter);
//       } else {
//         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//         // @ts-ignore
//         results = results.concat(getFilterComparisons(subFilter, key));
//       }
//     });
//   }
//
//   return [...results];
// };
const getFilterOmitting = (filter, ...keys) => Object.keys(filter).reduce((f, next) => {
    const omitted = { ...f };
    const k = next;
    if (k === 'and' && filter.and) {
        omitted.and = filter.and.map((part) => (0, exports.getFilterOmitting)(part, ...keys));
        if (omitted.and.every((part) => Object.keys(part).length === 0)) {
            delete omitted.and;
        }
    }
    else if (k === 'or' && filter.or) {
        omitted.or = filter.or.map((part) => (0, exports.getFilterOmitting)(part, ...keys));
        if (omitted.or.every((part) => Object.keys(part).length === 0)) {
            delete omitted.or;
        }
    }
    else if (!keys.includes(k)) {
        omitted[k] = filter[k];
    }
    return omitted;
}, {});
exports.getFilterOmitting = getFilterOmitting;
function applyFilter(dtoOrArray, filter) {
    const filterFunc = filter_builder_1.FilterBuilder.build(filter);
    if (Array.isArray(dtoOrArray)) {
        return dtoOrArray.filter((dto) => filterFunc(dto));
    }
    return filterFunc(dtoOrArray);
}
exports.applyFilter = applyFilter;
//# sourceMappingURL=filter.helpers.js.map