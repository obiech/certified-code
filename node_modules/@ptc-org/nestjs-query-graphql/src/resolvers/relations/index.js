"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRelationsResolver = exports.RemoveRelationsResolver = exports.Relatable = exports.ReferencesRelationsResolver = exports.ReadRelationsResolver = exports.AggregateRelationsResolver = void 0;
var aggregate_relations_resolver_1 = require("./aggregate-relations.resolver");
Object.defineProperty(exports, "AggregateRelationsResolver", { enumerable: true, get: function () { return aggregate_relations_resolver_1.AggregateRelationsResolver; } });
var read_relations_resolver_1 = require("./read-relations.resolver");
Object.defineProperty(exports, "ReadRelationsResolver", { enumerable: true, get: function () { return read_relations_resolver_1.ReadRelationsResolver; } });
var references_relation_resolver_1 = require("./references-relation.resolver");
Object.defineProperty(exports, "ReferencesRelationsResolver", { enumerable: true, get: function () { return references_relation_resolver_1.ReferencesRelationsResolver; } });
var relations_resolver_1 = require("./relations.resolver");
Object.defineProperty(exports, "Relatable", { enumerable: true, get: function () { return relations_resolver_1.Relatable; } });
var remove_relations_resolver_1 = require("./remove-relations.resolver");
Object.defineProperty(exports, "RemoveRelationsResolver", { enumerable: true, get: function () { return remove_relations_resolver_1.RemoveRelationsResolver; } });
var update_relations_resolver_1 = require("./update-relations.resolver");
Object.defineProperty(exports, "UpdateRelationsResolver", { enumerable: true, get: function () { return update_relations_resolver_1.UpdateRelationsResolver; } });
//# sourceMappingURL=index.js.map