"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupByAggregateMixin = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const nestjs_query_core_1 = require("@ptc-org/nestjs-query-core");
const common_1 = require("../../common");
const decorators_1 = require("../../decorators");
const reflector = new nestjs_query_core_1.MapReflector('nestjs-query:aggregate-response-type');
(0, graphql_1.registerEnumType)(nestjs_query_core_1.GroupBy, {
    name: 'GroupBy', // this one is mandatory
    description: 'Group by' // this one is optional
});
const GroupByAggregateMixin = (DTOClass, AR) => (Base) => {
    const objName = (0, common_1.getGraphqlObjectName)(DTOClass, 'Unable to make AggregationResponseType.');
    const aggName = `${objName}AggregateGroupBy`;
    return reflector.memoize(DTOClass, aggName, () => {
        const fields = (0, decorators_1.getFilterableFields)(DTOClass).filter((field) => field.target === Date);
        // If there are no date fields return base
        if (!fields.length) {
            return Base;
        }
        return fields.reduce((RB, field) => {
            var _a;
            let ReadOneMixin = class ReadOneMixin extends RB {
                [_a = field.schemaName](dto, // eslint-disable-next-line @typescript-eslint/no-unused-vars
                by) {
                    return dto[field.propertyName];
                }
            };
            tslib_1.__decorate([
                (0, decorators_1.ResolverField)(field.schemaName, () => field.target, { nullable: true }),
                tslib_1.__param(0, (0, graphql_1.Parent)()),
                tslib_1.__param(1, (0, graphql_1.Args)('by', {
                    type: () => nestjs_query_core_1.GroupBy,
                    defaultValue: nestjs_query_core_1.GroupBy.DAY
                })),
                tslib_1.__metadata("design:type", Function),
                tslib_1.__metadata("design:paramtypes", [Object, String]),
                tslib_1.__metadata("design:returntype", Object)
            ], ReadOneMixin.prototype, _a, null);
            ReadOneMixin = tslib_1.__decorate([
                (0, graphql_1.Resolver)(() => AR, { isAbstract: true })
            ], ReadOneMixin);
            return ReadOneMixin;
        }, Base);
    });
};
exports.GroupByAggregateMixin = GroupByAggregateMixin;
//# sourceMappingURL=group-by-aggregate.resolver.js.map