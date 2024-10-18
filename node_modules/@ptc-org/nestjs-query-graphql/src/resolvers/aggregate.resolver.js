"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggregateResolver = exports.Aggregateable = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const nestjs_query_core_1 = require("@ptc-org/nestjs-query-core");
const lodash_omit_1 = tslib_1.__importDefault(require("lodash.omit"));
const auth_1 = require("../auth");
const common_1 = require("../common");
const decorators_1 = require("../decorators");
const interceptors_1 = require("../interceptors");
const types_1 = require("../types");
const group_by_aggregate_resolver_1 = require("./aggregate/group-by-aggregate.resolver");
const helpers_1 = require("./helpers");
const resolver_interface_1 = require("./resolver.interface");
/**
 * @internal
 * Mixin to add `aggregate` graphql endpoints.
 */
const Aggregateable = (DTOClass, opts) => (BaseClass) => {
    if (!opts || !opts.enabled) {
        return BaseClass;
    }
    const { baseNameLower } = (0, common_1.getDTONames)(DTOClass);
    const commonResolverOpts = (0, lodash_omit_1.default)(opts, 'dtoName', 'one', 'many', 'QueryArgs', 'Connection', 'name', 'description', 'AggregateDTOClass');
    const queryName = opts.name || `${baseNameLower}Aggregate`;
    const [AR, GroupByType] = (0, types_1.AggregateResponseType)(DTOClass);
    let AA = class AA extends (0, types_1.AggregateArgsType)(opts.AggregateDTOClass || DTOClass) {
    };
    AA = tslib_1.__decorate([
        (0, graphql_1.ArgsType)()
    ], AA);
    let AggregateResolverBase = class AggregateResolverBase extends BaseClass {
        async aggregate(args, query, authFilter) {
            const qa = await (0, helpers_1.transformAndValidate)(AA, args);
            return this.service.aggregate((0, nestjs_query_core_1.mergeFilter)(qa.filter || {}, authFilter ?? {}), query);
        }
    };
    tslib_1.__decorate([
        (0, decorators_1.ResolverQuery)(() => [AR], { name: queryName, description: opts?.description, complexity: opts?.complexity }, commonResolverOpts, { interceptors: [(0, interceptors_1.AuthorizerInterceptor)(DTOClass)] }, opts ?? {}),
        tslib_1.__param(0, (0, graphql_1.Args)()),
        tslib_1.__param(1, (0, decorators_1.AggregateQueryParam)()),
        tslib_1.__param(2, (0, decorators_1.AuthorizerFilter)({
            operationGroup: auth_1.OperationGroup.AGGREGATE,
            many: true
        })),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [AA, Object, Object]),
        tslib_1.__metadata("design:returntype", Promise)
    ], AggregateResolverBase.prototype, "aggregate", null);
    AggregateResolverBase = tslib_1.__decorate([
        (0, graphql_1.Resolver)(() => AR, { isAbstract: true })
    ], AggregateResolverBase);
    return (0, group_by_aggregate_resolver_1.GroupByAggregateMixin)(DTOClass, GroupByType)(AggregateResolverBase);
};
exports.Aggregateable = Aggregateable;
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentional
const AggregateResolver = (DTOClass, opts) => (0, exports.Aggregateable)(DTOClass, opts)(resolver_interface_1.BaseServiceResolver);
exports.AggregateResolver = AggregateResolver;
//# sourceMappingURL=aggregate.resolver.js.map