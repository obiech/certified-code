"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SavedPaymentMethodType = void 0;
var graphql_1 = require("@nestjs/graphql");
var SavedPaymentMethodType;
(function (SavedPaymentMethodType) {
    SavedPaymentMethodType["CARD"] = "CARD";
    SavedPaymentMethodType["BANK_ACCOUNT"] = "BANK_ACCOUNT";
})(SavedPaymentMethodType || (exports.SavedPaymentMethodType = SavedPaymentMethodType = {}));
(0, graphql_1.registerEnumType)(SavedPaymentMethodType, {
    name: 'SavedPaymentMethodType',
    description: 'Saved payment method type',
});
