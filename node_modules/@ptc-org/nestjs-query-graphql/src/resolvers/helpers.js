"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubscriptionEventName = exports.createSubscriptionFilter = exports.transformAndValidate = void 0;
const common_1 = require("@nestjs/common");
const nestjs_query_core_1 = require("@ptc-org/nestjs-query-core");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
/** @internal */
const transformAndValidate = async (TClass, partial) => {
    if (partial instanceof TClass) {
        return partial;
    }
    const transformed = (0, class_transformer_1.plainToInstance)(TClass, partial);
    const validationErrors = await (0, class_validator_1.validate)(transformed);
    if (validationErrors.length) {
        throw new common_1.BadRequestException(validationErrors);
    }
    return transformed;
};
exports.transformAndValidate = transformAndValidate;
const createSubscriptionFilter = (InputClass, payloadKey
// eslint-disable-next-line @typescript-eslint/no-explicit-any
) => 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async (payload, variables) => {
    const { input } = variables;
    if (input) {
        const args = await (0, exports.transformAndValidate)(InputClass, input);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const dto = payload[payloadKey];
        return (0, nestjs_query_core_1.applyFilter)(dto, args.filter || {});
    }
    return true;
};
exports.createSubscriptionFilter = createSubscriptionFilter;
function getSubscriptionEventName(eventName, authorizeFilter) {
    return authorizeFilter ? `${eventName}-${JSON.stringify(authorizeFilter)}` : eventName;
}
exports.getSubscriptionEventName = getSubscriptionEventName;
//# sourceMappingURL=helpers.js.map