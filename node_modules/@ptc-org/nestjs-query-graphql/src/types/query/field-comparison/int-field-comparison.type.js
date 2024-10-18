"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrCreateIntFieldComparison = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const validators_1 = require("../../validators");
/** @internal */
let intFieldComparison;
/** @internal */
function getOrCreateIntFieldComparison() {
    if (intFieldComparison) {
        return intFieldComparison;
    }
    let IntFieldComparisonBetween = class IntFieldComparisonBetween {
    };
    tslib_1.__decorate([
        (0, graphql_1.Field)(() => graphql_1.Int, { nullable: false }),
        (0, class_validator_1.IsInt)(),
        tslib_1.__metadata("design:type", Number)
    ], IntFieldComparisonBetween.prototype, "lower", void 0);
    tslib_1.__decorate([
        (0, graphql_1.Field)(() => graphql_1.Int, { nullable: false }),
        (0, class_validator_1.IsInt)(),
        tslib_1.__metadata("design:type", Number)
    ], IntFieldComparisonBetween.prototype, "upper", void 0);
    IntFieldComparisonBetween = tslib_1.__decorate([
        (0, graphql_1.InputType)()
    ], IntFieldComparisonBetween);
    let IntFieldComparison = class IntFieldComparison {
    };
    tslib_1.__decorate([
        (0, graphql_1.Field)(() => Boolean, { nullable: true }),
        (0, class_validator_1.IsBoolean)(),
        (0, class_validator_1.IsOptional)(),
        tslib_1.__metadata("design:type", Boolean)
    ], IntFieldComparison.prototype, "is", void 0);
    tslib_1.__decorate([
        (0, graphql_1.Field)(() => Boolean, { nullable: true }),
        (0, class_validator_1.IsBoolean)(),
        (0, class_validator_1.IsOptional)(),
        tslib_1.__metadata("design:type", Boolean)
    ], IntFieldComparison.prototype, "isNot", void 0);
    tslib_1.__decorate([
        (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
        (0, class_validator_1.IsInt)(),
        (0, validators_1.IsUndefined)(),
        tslib_1.__metadata("design:type", Number)
    ], IntFieldComparison.prototype, "eq", void 0);
    tslib_1.__decorate([
        (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
        (0, class_validator_1.IsInt)(),
        (0, validators_1.IsUndefined)(),
        tslib_1.__metadata("design:type", Number)
    ], IntFieldComparison.prototype, "neq", void 0);
    tslib_1.__decorate([
        (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
        (0, class_validator_1.IsInt)(),
        (0, validators_1.IsUndefined)(),
        tslib_1.__metadata("design:type", Number)
    ], IntFieldComparison.prototype, "gt", void 0);
    tslib_1.__decorate([
        (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
        (0, class_validator_1.IsInt)(),
        (0, validators_1.IsUndefined)(),
        tslib_1.__metadata("design:type", Number)
    ], IntFieldComparison.prototype, "gte", void 0);
    tslib_1.__decorate([
        (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
        (0, class_validator_1.IsInt)(),
        (0, validators_1.IsUndefined)(),
        tslib_1.__metadata("design:type", Number)
    ], IntFieldComparison.prototype, "lt", void 0);
    tslib_1.__decorate([
        (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
        (0, class_validator_1.IsInt)(),
        (0, validators_1.IsUndefined)(),
        tslib_1.__metadata("design:type", Number)
    ], IntFieldComparison.prototype, "lte", void 0);
    tslib_1.__decorate([
        (0, graphql_1.Field)(() => [graphql_1.Int], { nullable: true }),
        (0, class_validator_1.IsInt)({ each: true }),
        (0, validators_1.IsUndefined)(),
        tslib_1.__metadata("design:type", Array)
    ], IntFieldComparison.prototype, "in", void 0);
    tslib_1.__decorate([
        (0, graphql_1.Field)(() => [graphql_1.Int], { nullable: true }),
        (0, class_validator_1.IsInt)({ each: true }),
        (0, validators_1.IsUndefined)(),
        tslib_1.__metadata("design:type", Array)
    ], IntFieldComparison.prototype, "notIn", void 0);
    tslib_1.__decorate([
        (0, graphql_1.Field)(() => IntFieldComparisonBetween, { nullable: true }),
        (0, class_validator_1.ValidateNested)(),
        (0, class_transformer_1.Type)(() => IntFieldComparisonBetween),
        tslib_1.__metadata("design:type", IntFieldComparisonBetween)
    ], IntFieldComparison.prototype, "between", void 0);
    tslib_1.__decorate([
        (0, graphql_1.Field)(() => IntFieldComparisonBetween, { nullable: true }),
        (0, class_validator_1.ValidateNested)(),
        (0, class_transformer_1.Type)(() => IntFieldComparisonBetween),
        tslib_1.__metadata("design:type", IntFieldComparisonBetween)
    ], IntFieldComparison.prototype, "notBetween", void 0);
    IntFieldComparison = tslib_1.__decorate([
        (0, graphql_1.InputType)()
    ], IntFieldComparison);
    intFieldComparison = IntFieldComparison;
    return intFieldComparison;
}
exports.getOrCreateIntFieldComparison = getOrCreateIntFieldComparison;
//# sourceMappingURL=int-field-comparison.type.js.map