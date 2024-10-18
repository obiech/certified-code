"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeysetPagerStrategy = void 0;
const common_1 = require("@nestjs/common");
const nestjs_query_core_1 = require("@ptc-org/nestjs-query-core");
const class_transformer_1 = require("class-transformer");
const helpers_1 = require("./helpers");
class KeysetPagerStrategy {
    constructor(DTOClass, pageFields) {
        this.DTOClass = DTOClass;
        this.pageFields = pageFields;
    }
    fromCursorArgs(cursor) {
        const { defaultSort } = this;
        const isForward = (0, helpers_1.isForwardPaging)(cursor);
        const isBackward = (0, helpers_1.isBackwardPaging)(cursor);
        const hasBefore = (0, helpers_1.hasBeforeCursor)(cursor);
        let payload;
        let limit = 0;
        if ((0, helpers_1.isForwardPaging)(cursor)) {
            payload = cursor.after ? this.decodeCursor(cursor.after) : undefined;
            limit = cursor.first ?? 0;
        }
        if ((0, helpers_1.isBackwardPaging)(cursor)) {
            payload = cursor.before ? this.decodeCursor(cursor.before) : undefined;
            limit = cursor.last ?? 0;
        }
        return { payload, defaultSort, limit, isBackward, isForward, hasBefore };
    }
    toCursor(dto, index, opts, query) {
        const cursorFields = [...(query.sorting ?? []).map((f) => f.field), ...this.pageFields];
        return this.encodeCursor(this.createKeySetPayload(dto, cursorFields));
    }
    isEmptyCursor(opts) {
        return !opts.payload || !opts.payload.fields.length;
    }
    createQuery(query, opts, includeExtraNode) {
        const paging = { limit: opts.limit };
        if (includeExtraNode) {
            // Add 1 to the limit so we will fetch an additional node
            paging.limit += 1;
        }
        const { payload } = opts;
        // Add 1 to the limit so we will fetch an additional node with the current node
        const sorting = this.getSortFields(query, opts);
        const filter = (0, nestjs_query_core_1.mergeFilter)(query.filter ?? {}, this.createFieldsFilter(sorting, payload));
        return { ...query, filter, paging, sorting };
    }
    checkForExtraNode(nodes, opts) {
        const hasExtraNode = nodes.length > opts.limit;
        const returnNodes = [...nodes];
        if (hasExtraNode) {
            returnNodes.pop();
        }
        if (opts.isBackward) {
            returnNodes.reverse();
        }
        return returnNodes;
    }
    get defaultSort() {
        return this.pageFields.map((field) => ({ field, direction: nestjs_query_core_1.SortDirection.ASC }));
    }
    encodeCursor(fields) {
        return (0, helpers_1.encodeBase64)(JSON.stringify(fields));
    }
    decodeCursor(cursor) {
        try {
            const payload = JSON.parse((0, helpers_1.decodeBase64)(cursor));
            if (payload.type !== 'keyset') {
                throw new common_1.BadRequestException('Invalid cursor');
            }
            const partial = payload.fields.reduce((dtoPartial, { field, value }) => ({ ...dtoPartial, [field]: value }), {});
            const transformed = (0, class_transformer_1.plainToClass)(this.DTOClass, partial);
            const typesafeFields = payload.fields.map(({ field }) => ({ field, value: transformed[field] }));
            return { ...payload, fields: typesafeFields };
        }
        catch (e) {
            throw new common_1.BadRequestException('Invalid cursor');
        }
    }
    createFieldsFilter(sortFields, payload) {
        if (!payload) {
            return {};
        }
        const { fields } = payload;
        const equalities = [];
        const oredFilter = sortFields.reduce((dtoFilters, sortField, index) => {
            const keySetField = fields[index];
            if (keySetField.field !== sortField.field) {
                throw new Error(`Cursor Payload does not match query sort expected ${keySetField.field} found ${sortField.field}`);
            }
            const isAsc = sortField.direction === nestjs_query_core_1.SortDirection.ASC;
            const subFilter = {
                and: [...equalities, { [keySetField.field]: { [isAsc ? 'gt' : 'lt']: keySetField.value } }]
            };
            equalities.push({ [keySetField.field]: { eq: keySetField.value } });
            return [...dtoFilters, subFilter];
        }, []);
        return { or: oredFilter };
    }
    getSortFields(query, opts) {
        const { sorting = [] } = query;
        const defaultSort = opts.defaultSort.filter((dsf) => !sorting.some((sf) => dsf.field === sf.field));
        const sortFields = [...sorting, ...defaultSort];
        return opts.isForward ? sortFields : (0, nestjs_query_core_1.invertSort)(sortFields);
    }
    createKeySetPayload(dto, fields) {
        const fieldSet = new Set();
        return fields.reduce((payload, field) => {
            if (fieldSet.has(field)) {
                return payload;
            }
            fieldSet.add(field);
            payload.fields.push({ field, value: dto[field] });
            return payload;
        }, { type: 'keyset', fields: [] });
    }
}
exports.KeysetPagerStrategy = KeysetPagerStrategy;
//# sourceMappingURL=keyset.pager-strategy.js.map