"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggregateQueryParam = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const graphql_resolve_info_utils_1 = require("./graphql-resolve-info.utils");
const QUERY_OPERATORS = ['groupBy', 'count', 'avg', 'sum', 'min', 'max'];
exports.AggregateQueryParam = (0, common_1.createParamDecorator)((data, ctx) => {
    const info = graphql_1.GqlExecutionContext.create(ctx).getInfo();
    const simpleResolverInfo = (0, graphql_resolve_info_utils_1.removePagingFromSimplifiedInfo)((0, graphql_resolve_info_utils_1.simplifyResolveInfo)(info));
    return QUERY_OPERATORS.reduce((query, operator) => {
        if (simpleResolverInfo.fields[operator]) {
            const simpleOperator = simpleResolverInfo.fields[operator];
            const operatorFields = Object.keys(simpleOperator.fields || {});
            if (operatorFields && operatorFields.length > 0) {
                return {
                    ...query,
                    [operator]: operatorFields.map((operatorField) => ({
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                        field: simpleOperator.fields[operatorField].name,
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                        args: simpleOperator.fields[operatorField].args
                    }))
                };
            }
        }
        return query;
    }, {});
});
//# sourceMappingURL=aggregate-query-param.decorator.js.map