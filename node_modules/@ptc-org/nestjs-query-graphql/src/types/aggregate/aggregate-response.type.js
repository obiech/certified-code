"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggregateResponseType = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const nestjs_query_core_1 = require("@ptc-org/nestjs-query-core");
const common_1 = require("../../common");
const decorators_1 = require("../../decorators");
const reflector = new nestjs_query_core_1.MapReflector('nestjs-query:aggregate-response-type');
function NumberAggregatedType(name, fields, NumberType) {
    let Aggregated = class Aggregated {
    };
    Aggregated = tslib_1.__decorate([
        (0, graphql_1.ObjectType)(name)
    ], Aggregated);
    fields.forEach(({ propertyName, schemaName }) => {
        (0, graphql_1.Field)(() => NumberType, { name: schemaName, nullable: true })(Aggregated.prototype, propertyName);
    });
    return Aggregated;
}
function AggregateGroupByType(name, fields) {
    let Aggregated = class Aggregated {
    };
    Aggregated = tslib_1.__decorate([
        (0, graphql_1.ObjectType)(name)
    ], Aggregated);
    fields.forEach(({ propertyName, schemaName, target, returnTypeFunc }) => {
        const rt = returnTypeFunc ? returnTypeFunc() : target;
        (0, graphql_1.Field)(() => rt, { name: schemaName, nullable: true })(Aggregated.prototype, propertyName);
    });
    return Aggregated;
}
function AggregatedType(name, fields) {
    let Aggregated = class Aggregated {
    };
    Aggregated = tslib_1.__decorate([
        (0, graphql_1.ObjectType)(name)
    ], Aggregated);
    fields.forEach(({ propertyName, schemaName, target, returnTypeFunc }) => {
        const rt = returnTypeFunc ? returnTypeFunc() : target;
        (0, graphql_1.Field)(() => rt, { name: schemaName, nullable: true })(Aggregated.prototype, propertyName);
    });
    return Aggregated;
}
function AggregateResponseType(DTOClass, opts) {
    const objName = (0, common_1.getGraphqlObjectName)(DTOClass, 'Unable to make AggregationResponseType.');
    const prefix = opts?.prefix ?? objName;
    const aggName = `${prefix}AggregateResponse`;
    return reflector.memoize(DTOClass, aggName, () => {
        const fields = (0, decorators_1.getFilterableFields)(DTOClass);
        if (!fields.length) {
            throw new Error(`No fields found to create AggregationResponseType for ${DTOClass.name}. Ensure fields are annotated with @FilterableField`);
        }
        const numberFields = fields.filter(({ target }) => target === Number);
        const minMaxFields = fields.filter(({ target }) => target !== Boolean);
        const GroupType = AggregateGroupByType(`${prefix}AggregateGroupBy`, fields);
        const CountType = NumberAggregatedType(`${prefix}CountAggregate`, fields, graphql_1.Int);
        const SumType = NumberAggregatedType(`${prefix}SumAggregate`, numberFields, graphql_1.Float);
        const AvgType = NumberAggregatedType(`${prefix}AvgAggregate`, numberFields, graphql_1.Float);
        const MinType = AggregatedType(`${prefix}MinAggregate`, minMaxFields);
        const MaxType = AggregatedType(`${prefix}MaxAggregate`, minMaxFields);
        let AggResponse = class AggResponse {
        };
        tslib_1.__decorate([
            (0, graphql_1.Field)(() => GroupType, { nullable: true }),
            tslib_1.__metadata("design:type", Object)
        ], AggResponse.prototype, "groupBy", void 0);
        tslib_1.__decorate([
            (0, graphql_1.Field)(() => CountType, { nullable: true }),
            tslib_1.__metadata("design:type", Object)
        ], AggResponse.prototype, "count", void 0);
        tslib_1.__decorate([
            (0, decorators_1.SkipIf)(() => numberFields.length === 0, (0, graphql_1.Field)(() => SumType, { nullable: true })),
            tslib_1.__metadata("design:type", Object)
        ], AggResponse.prototype, "sum", void 0);
        tslib_1.__decorate([
            (0, decorators_1.SkipIf)(() => numberFields.length === 0, (0, graphql_1.Field)(() => AvgType, { nullable: true })),
            tslib_1.__metadata("design:type", Object)
        ], AggResponse.prototype, "avg", void 0);
        tslib_1.__decorate([
            (0, decorators_1.SkipIf)(() => minMaxFields.length === 0, (0, graphql_1.Field)(() => MinType, { nullable: true })),
            tslib_1.__metadata("design:type", Object)
        ], AggResponse.prototype, "min", void 0);
        tslib_1.__decorate([
            (0, decorators_1.SkipIf)(() => minMaxFields.length === 0, (0, graphql_1.Field)(() => MaxType, { nullable: true })),
            tslib_1.__metadata("design:type", Object)
        ], AggResponse.prototype, "max", void 0);
        AggResponse = tslib_1.__decorate([
            (0, graphql_1.ObjectType)(aggName)
        ], AggResponse);
        return [AggResponse, GroupType];
    });
}
exports.AggregateResponseType = AggregateResponseType;
//# sourceMappingURL=aggregate-response.type.js.map