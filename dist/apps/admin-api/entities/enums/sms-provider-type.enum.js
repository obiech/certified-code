"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SMSProviderType = void 0;
var graphql_1 = require("@nestjs/graphql");
var SMSProviderType;
(function (SMSProviderType) {
    SMSProviderType["Firebase"] = "Firebase";
    SMSProviderType["Twilio"] = "Twilio";
    SMSProviderType["Plivo"] = "Plivo";
    SMSProviderType["Pahappa"] = "Pahappa";
    SMSProviderType["BroadNet"] = "BroadNet";
    SMSProviderType["Vonage"] = "Vonage";
    SMSProviderType["ClickSend"] = "ClickSend";
    SMSProviderType["Infobip"] = "Infobip";
    SMSProviderType["MessageBird"] = "MessageBird";
})(SMSProviderType || (exports.SMSProviderType = SMSProviderType = {}));
(0, graphql_1.registerEnumType)(SMSProviderType, {
    name: 'SMSProviderType',
    description: 'The type of the SMS provider',
});
