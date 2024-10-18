"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FederationResolver = void 0;
const decorators_1 = require("../../decorators");
const relations_1 = require("../relations");
const FederationResolver = (DTOClass, opts = {}) => (0, relations_1.ReadRelationsResolver)(DTOClass, (0, decorators_1.getRelations)(DTOClass, opts));
exports.FederationResolver = FederationResolver;
//# sourceMappingURL=federation.resolver.js.map