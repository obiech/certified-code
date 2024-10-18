"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invertSort = exports.applyQuery = exports.applyPaging = exports.applySort = exports.mergeQuery = exports.transformQuery = exports.transformSort = void 0;
const tslib_1 = require("tslib");
const lodash_merge_1 = tslib_1.__importDefault(require("lodash.merge"));
const interfaces_1 = require("../interfaces");
const filter_helpers_1 = require("./filter.helpers");
const page_builder_1 = require("./page.builder");
const sort_builder_1 = require("./sort.builder");
const transformSort = (sorting, fieldMap) => {
    if (!sorting) {
        return undefined;
    }
    return sorting.map((sf) => {
        const field = fieldMap[sf.field];
        if (!field) {
            throw new Error(`No corresponding field found for '${sf.field}' when transforming SortField`);
        }
        return { ...sf, field };
    });
};
exports.transformSort = transformSort;
const transformQuery = (query, fieldMap) => ({
    filter: (0, filter_helpers_1.transformFilter)(query.filter, fieldMap),
    paging: query.paging,
    sorting: (0, exports.transformSort)(query.sorting, fieldMap)
});
exports.transformQuery = transformQuery;
const mergeQuery = (base, source) => {
    const { filter: baseFilter = {}, ...restBase } = base;
    const { filter: sourceFilter = {}, ...restSource } = source;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    return (0, lodash_merge_1.default)(restBase, restSource, { filter: (0, filter_helpers_1.mergeFilter)(baseFilter, sourceFilter) });
};
exports.mergeQuery = mergeQuery;
const applySort = (dtos, sortFields) => sort_builder_1.SortBuilder.build(sortFields)(dtos);
exports.applySort = applySort;
const applyPaging = (dtos, paging) => page_builder_1.PageBuilder.build(paging)(dtos);
exports.applyPaging = applyPaging;
const applyQuery = (dtos, query) => {
    const filtered = (0, filter_helpers_1.applyFilter)(dtos, query.filter ?? {});
    const sorted = (0, exports.applySort)(filtered, query.sorting ?? []);
    return (0, exports.applyPaging)(sorted, query.paging ?? {});
};
exports.applyQuery = applyQuery;
function invertSort(sortFields) {
    return sortFields.map((sf) => {
        const direction = sf.direction === interfaces_1.SortDirection.ASC ? interfaces_1.SortDirection.DESC : interfaces_1.SortDirection.ASC;
        let nulls;
        if (sf.nulls === interfaces_1.SortNulls.NULLS_LAST) {
            nulls = interfaces_1.SortNulls.NULLS_FIRST;
        }
        else if (sf.nulls === interfaces_1.SortNulls.NULLS_FIRST) {
            nulls = interfaces_1.SortNulls.NULLS_LAST;
        }
        return { ...sf, direction, nulls };
    });
}
exports.invertSort = invertSort;
//# sourceMappingURL=query.helpers.js.map