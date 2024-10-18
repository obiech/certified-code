"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayoutMethodType = void 0;
var graphql_1 = require("@nestjs/graphql");
var PayoutMethodType;
(function (PayoutMethodType) {
    PayoutMethodType["Stripe"] = "stripe";
    PayoutMethodType["BankTransfer"] = "bank_transfer";
})(PayoutMethodType || (exports.PayoutMethodType = PayoutMethodType = {}));
(0, graphql_1.registerEnumType)(PayoutMethodType, {
    name: 'PayoutMethodType',
    description: 'The type of payout method',
});
