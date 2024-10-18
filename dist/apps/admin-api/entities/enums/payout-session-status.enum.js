"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayoutSessionStatus = void 0;
var graphql_1 = require("@nestjs/graphql");
var PayoutSessionStatus;
(function (PayoutSessionStatus) {
    PayoutSessionStatus["PENDING"] = "pending";
    PayoutSessionStatus["PAID"] = "paid";
    PayoutSessionStatus["FAILED"] = "failed";
    PayoutSessionStatus["CANCELLED"] = "cancelled";
})(PayoutSessionStatus || (exports.PayoutSessionStatus = PayoutSessionStatus = {}));
(0, graphql_1.registerEnumType)(PayoutSessionStatus, {
    name: 'PayoutSessionStatus',
    description: undefined,
});
