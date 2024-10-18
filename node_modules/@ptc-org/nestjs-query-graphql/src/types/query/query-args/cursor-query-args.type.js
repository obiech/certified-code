"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCursorQueryArgsType = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const decorators_1 = require("../../../decorators");
const connection_1 = require("../../connection");
const property_max_validator_1 = require("../../validators/property-max.validator");
const filter_type_1 = require("../filter.type");
const paging_1 = require("../paging");
const sorting_type_1 = require("../sorting.type");
const constants_1 = require("./constants");
function createCursorQueryArgsType(DTOClass, opts = { ...constants_1.DEFAULT_QUERY_OPTS, pagingStrategy: paging_1.PagingStrategies.CURSOR }) {
    const F = (0, filter_type_1.FilterType)(DTOClass);
    const S = (0, sorting_type_1.getOrCreateSortType)(DTOClass);
    const P = (0, paging_1.getOrCreateCursorPagingType)();
    const C = (0, connection_1.getOrCreateCursorConnectionType)(DTOClass, opts);
    let QueryArgs = class QueryArgs {
        constructor() {
            this.filter = opts.disableFilter ? opts.defaultFilter : undefined;
            this.sorting = opts.disableSort ? opts.defaultSort : undefined;
        }
    };
    QueryArgs.SortType = S;
    QueryArgs.FilterType = F;
    QueryArgs.PageType = P;
    QueryArgs.ConnectionType = C;
    tslib_1.__decorate([
        (0, graphql_1.Field)(() => P, {
            defaultValue: { first: opts.defaultResultSize ?? constants_1.DEFAULT_QUERY_OPTS.defaultResultSize },
            description: 'Limit or page results.'
        }),
        (0, class_validator_1.ValidateNested)(),
        (0, class_validator_1.Validate)(property_max_validator_1.PropertyMax, ['first', opts.maxResultsSize ?? constants_1.DEFAULT_QUERY_OPTS.maxResultsSize]),
        (0, class_validator_1.Validate)(property_max_validator_1.PropertyMax, ['last', opts.maxResultsSize ?? constants_1.DEFAULT_QUERY_OPTS.maxResultsSize]),
        (0, class_transformer_1.Type)(() => P),
        tslib_1.__metadata("design:type", Object)
    ], QueryArgs.prototype, "paging", void 0);
    tslib_1.__decorate([
        (0, decorators_1.SkipIf)(() => opts.disableFilter, (0, graphql_1.Field)(() => F, {
            defaultValue: !F.hasRequiredFilters ? opts.defaultFilter ?? constants_1.DEFAULT_QUERY_OPTS.defaultFilter : undefined,
            description: 'Specify to filter the records returned.',
            nullable: false
        }), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(() => F)),
        tslib_1.__metadata("design:type", Object)
    ], QueryArgs.prototype, "filter", void 0);
    tslib_1.__decorate([
        (0, decorators_1.SkipIf)(() => opts.disableSort, (0, graphql_1.Field)(() => [S], {
            defaultValue: opts.defaultSort ?? constants_1.DEFAULT_QUERY_OPTS.defaultSort,
            description: 'Specify to sort results.'
        }), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(() => S)),
        tslib_1.__metadata("design:type", Array)
    ], QueryArgs.prototype, "sorting", void 0);
    QueryArgs = tslib_1.__decorate([
        (0, graphql_1.ArgsType)()
    ], QueryArgs);
    return QueryArgs;
}
exports.createCursorQueryArgsType = createCursorQueryArgsType;
//# sourceMappingURL=cursor-query-args.type.js.map