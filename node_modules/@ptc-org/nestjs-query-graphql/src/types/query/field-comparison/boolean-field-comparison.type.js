"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrCreateBooleanFieldComparison = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
/** @internal */
let booleanFieldComparison;
/** @internal */
function getOrCreateBooleanFieldComparison() {
    if (booleanFieldComparison) {
        return booleanFieldComparison;
    }
    let BooleanFieldComparison = class BooleanFieldComparison {
    };
    tslib_1.__decorate([
        (0, graphql_1.Field)(() => Boolean, { nullable: true }),
        (0, class_validator_1.IsBoolean)(),
        (0, class_validator_1.IsOptional)(),
        tslib_1.__metadata("design:type", Boolean)
    ], BooleanFieldComparison.prototype, "is", void 0);
    tslib_1.__decorate([
        (0, graphql_1.Field)(() => Boolean, { nullable: true }),
        (0, class_validator_1.IsBoolean)(),
        (0, class_validator_1.IsOptional)(),
        tslib_1.__metadata("design:type", Boolean)
    ], BooleanFieldComparison.prototype, "isNot", void 0);
    BooleanFieldComparison = tslib_1.__decorate([
        (0, graphql_1.InputType)()
    ], BooleanFieldComparison);
    booleanFieldComparison = BooleanFieldComparison;
    return BooleanFieldComparison;
}
exports.getOrCreateBooleanFieldComparison = getOrCreateBooleanFieldComparison;
//# sourceMappingURL=boolean-field-comparison.type.js.map