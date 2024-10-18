"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDefaultAuthorizer = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const decorators_1 = require("../decorators");
const tokens_1 = require("./tokens");
const createRelationAuthorizer = (opts) => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async authorize(context, authorizationContext) {
        return opts.authorize(context, authorizationContext) ?? {};
    },
    authorizeRelation() {
        return Promise.reject(new Error('Not implemented'));
    }
});
function createDefaultAuthorizer(DTOClass, opts // instance of class or authorizer options
) {
    let DefaultAuthorizer = class DefaultAuthorizer {
        constructor(moduleRef, customAuthorizer) {
            this.moduleRef = moduleRef;
            this.customAuthorizer = customAuthorizer;
            this.authOptions = opts;
            this.relationsAuthorizers = new Map();
            this.relations = this.getRelations();
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async authorize(context, authorizationContext) {
            return (this.customAuthorizer?.authorize(context, authorizationContext) ??
                this.authOptions?.authorize(context, authorizationContext) ??
                {});
        }
        async authorizeRelation(relationName, 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        context, authorizationContext) {
            if (this.customAuthorizer && typeof this.customAuthorizer.authorizeRelation === 'function') {
                const filterFromCustomAuthorizer = await this.customAuthorizer.authorizeRelation(relationName, context, authorizationContext);
                if (filterFromCustomAuthorizer)
                    return filterFromCustomAuthorizer;
            }
            this.addRelationAuthorizerIfNotExist(relationName);
            return this.relationsAuthorizers.get(relationName)?.authorize(context, authorizationContext) ?? {};
        }
        addRelationAuthorizerIfNotExist(relationName) {
            if (!this.relationsAuthorizers.has(relationName)) {
                const relation = this.relations.get(relationName);
                if (!relation)
                    return;
                if (relation.auth) {
                    this.relationsAuthorizers.set(relationName, createRelationAuthorizer(relation.auth));
                }
                else if ((0, decorators_1.getAuthorizer)(relation.DTO)) {
                    this.relationsAuthorizers.set(relationName, this.moduleRef.get((0, tokens_1.getAuthorizerToken)(relation.DTO), { strict: false }));
                }
            }
        }
        getRelations() {
            const { many = {}, one = {} } = (0, decorators_1.getRelations)(DTOClass);
            const relationsMap = new Map();
            Object.keys(many).forEach((relation) => relationsMap.set(relation, many[relation]));
            Object.keys(one).forEach((relation) => relationsMap.set(relation, one[relation]));
            return relationsMap;
        }
    };
    DefaultAuthorizer = tslib_1.__decorate([
        (0, common_1.Injectable)(),
        tslib_1.__param(1, (0, common_1.Optional)()),
        tslib_1.__param(1, (0, common_1.Inject)((0, tokens_1.getCustomAuthorizerToken)(DTOClass))),
        tslib_1.__metadata("design:paramtypes", [core_1.ModuleRef, Object])
    ], DefaultAuthorizer);
    return DefaultAuthorizer;
}
exports.createDefaultAuthorizer = createDefaultAuthorizer;
//# sourceMappingURL=default-crud.authorizer.js.map