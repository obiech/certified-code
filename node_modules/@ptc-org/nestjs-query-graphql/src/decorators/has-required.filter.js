"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HasRequiredFilter = void 0;
const class_validator_1 = require("class-validator");
/**
 * @internal
 * Wraps Args to allow skipping decorating
 * @param check - checker to run.
 * @param decorators - The decorators to apply
 */
function HasRequiredFilter() {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'hasRequiredFilter',
            target: object.constructor,
            propertyName: propertyName,
            // constraints: [property],
            options: {
                message: 'There was no filter provided for "$property"!'
            },
            validator: {
                validate(value) {
                    return Object.keys(value).length > 0;
                }
            }
        });
    };
}
exports.HasRequiredFilter = HasRequiredFilter;
//# sourceMappingURL=has-required.filter.js.map