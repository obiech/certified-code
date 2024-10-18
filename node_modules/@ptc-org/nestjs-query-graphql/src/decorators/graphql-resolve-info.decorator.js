"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphQLResultInfo = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const graphql_resolve_info_utils_1 = require("./graphql-resolve-info.utils");
const relation_decorator_1 = require("./relation.decorator");
/**
 * @internal this implementation is not final and subjected to change! Use at own risk!
 */
const GraphQLResultInfo = (DTOClass) => {
    // Get all relations that have look ahead enabled
    const relations = (0, relation_decorator_1.getRelationsDescriptors)(DTOClass).filter((relation) => relation.relationOpts.enableLookAhead && !relation.isMany);
    return (0, common_1.createParamDecorator)((data, ctx) => {
        const info = graphql_1.GqlExecutionContext.create(ctx).getInfo();
        const simplifiedInfo = (0, graphql_resolve_info_utils_1.simplifyResolveInfo)(info);
        return {
            info: simplifiedInfo,
            relations: relations.length === 0 ? [] : (0, graphql_resolve_info_utils_1.createLookAheadInfo)(relations, simplifiedInfo)
        };
    })();
};
exports.GraphQLResultInfo = GraphQLResultInfo;
//# sourceMappingURL=graphql-resolve-info.decorator.js.map