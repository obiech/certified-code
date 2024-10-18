"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveRelationsResolver = exports.RemoveRelationsMixin = void 0;
const tslib_1 = require("tslib");
// eslint-disable-next-line max-classes-per-file
const graphql_1 = require("@nestjs/graphql");
const auth_1 = require("../../auth");
const common_1 = require("../../common");
const decorators_1 = require("../../decorators");
const resolver_relation_mutation_decorator_1 = require("../../decorators/resolver-relation-mutation.decorator");
const interceptors_1 = require("../../interceptors");
const types_1 = require("../../types");
const helpers_1 = require("../helpers");
const resolver_interface_1 = require("../resolver.interface");
const helpers_2 = require("./helpers");
const RemoveOneRelationMixin = (DTOClass, relation) => (Base) => {
    var _a;
    if (!relation.remove?.enabled) {
        return Base;
    }
    const commonResolverOpts = (0, helpers_2.removeRelationOpts)(relation);
    const relationDTO = relation.DTO;
    const dtoNames = (0, common_1.getDTONames)(DTOClass);
    const { baseNameLower, baseName } = (0, common_1.getDTONames)(relationDTO, { dtoName: relation.dtoName });
    const relationName = relation.relationName ?? baseNameLower;
    let RIT = class RIT extends (0, types_1.RelationInputType)(DTOClass, relationDTO) {
    };
    RIT = tslib_1.__decorate([
        (0, graphql_1.InputType)(`Remove${baseName}From${dtoNames.baseName}Input`)
    ], RIT);
    let SetArgs = class SetArgs extends (0, types_1.MutationArgsType)(RIT) {
    };
    SetArgs = tslib_1.__decorate([
        (0, graphql_1.ArgsType)()
    ], SetArgs);
    let RemoveOneMixin = class RemoveOneMixin extends Base {
        async [_a = `remove${baseName}From${dtoNames.baseName}`](setArgs, modifyRelationsFilter) {
            const { input } = await (0, helpers_1.transformAndValidate)(SetArgs, setArgs);
            return this.service.removeRelation(relationName, input.id, input.relationId, modifyRelationsFilter);
        }
    };
    tslib_1.__decorate([
        (0, resolver_relation_mutation_decorator_1.ResolverRelationMutation)(() => DTOClass, {
            description: relation.remove?.description,
            complexity: relation.remove?.complexity
        }, (0, common_1.mergeBaseResolverOpts)(relation.remove, commonResolverOpts), {
            interceptors: [(0, interceptors_1.AuthorizerInterceptor)(DTOClass)]
        }),
        tslib_1.__param(0, (0, graphql_1.Args)()),
        tslib_1.__param(1, (0, decorators_1.ModifyRelationAuthorizerFilter)(baseNameLower, {
            operationGroup: auth_1.OperationGroup.UPDATE,
            many: false
        })),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [SetArgs, Object]),
        tslib_1.__metadata("design:returntype", Promise)
    ], RemoveOneMixin.prototype, _a, null);
    RemoveOneMixin = tslib_1.__decorate([
        (0, graphql_1.Resolver)(() => DTOClass, { isAbstract: true })
    ], RemoveOneMixin);
    return RemoveOneMixin;
};
const RemoveManyRelationsMixin = (DTOClass, relation) => (Base) => {
    var _a;
    if (!relation.remove?.enabled) {
        return Base;
    }
    const commonResolverOpts = (0, helpers_2.removeRelationOpts)(relation);
    const relationDTO = relation.DTO;
    const dtoNames = (0, common_1.getDTONames)(DTOClass);
    const { pluralBaseNameLower, pluralBaseName } = (0, common_1.getDTONames)(relationDTO, { dtoName: relation.dtoName });
    const relationName = relation.relationName ?? pluralBaseNameLower;
    let RIT = class RIT extends (0, types_1.RelationsInputType)(DTOClass, relationDTO) {
    };
    RIT = tslib_1.__decorate([
        (0, graphql_1.InputType)(`Remove${pluralBaseName}From${dtoNames.baseName}Input`)
    ], RIT);
    let AddArgs = class AddArgs extends (0, types_1.MutationArgsType)(RIT) {
    };
    AddArgs = tslib_1.__decorate([
        (0, graphql_1.ArgsType)()
    ], AddArgs);
    let Mixin = class Mixin extends Base {
        async [_a = `remove${pluralBaseName}From${dtoNames.baseName}`](addArgs, modifyRelationsFilter) {
            const { input } = await (0, helpers_1.transformAndValidate)(AddArgs, addArgs);
            return this.service.removeRelations(relationName, input.id, input.relationIds, modifyRelationsFilter);
        }
    };
    tslib_1.__decorate([
        (0, resolver_relation_mutation_decorator_1.ResolverRelationMutation)(() => DTOClass, {
            description: relation.remove?.description,
            complexity: relation.remove?.complexity
        }, (0, common_1.mergeBaseResolverOpts)(relation.remove, commonResolverOpts), {
            interceptors: [(0, interceptors_1.AuthorizerInterceptor)(DTOClass)]
        }),
        tslib_1.__param(0, (0, graphql_1.Args)()),
        tslib_1.__param(1, (0, decorators_1.ModifyRelationAuthorizerFilter)(pluralBaseNameLower, {
            operationGroup: auth_1.OperationGroup.UPDATE,
            many: true
        })),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [AddArgs, Object]),
        tslib_1.__metadata("design:returntype", Promise)
    ], Mixin.prototype, _a, null);
    Mixin = tslib_1.__decorate([
        (0, graphql_1.Resolver)(() => DTOClass, { isAbstract: true })
    ], Mixin);
    return Mixin;
};
const RemoveRelationsMixin = (DTOClass, relations) => (Base) => {
    const manyRelations = (0, helpers_2.flattenRelations)(relations.many ?? {});
    const oneRelations = (0, helpers_2.flattenRelations)(relations.one ?? {});
    const WithMany = manyRelations.reduce((RB, a) => RemoveManyRelationsMixin(DTOClass, a)(RB), Base);
    return oneRelations.reduce((RB, a) => RemoveOneRelationMixin(DTOClass, a)(RB), WithMany);
};
exports.RemoveRelationsMixin = RemoveRelationsMixin;
const RemoveRelationsResolver = (DTOClass, relations) => (0, exports.RemoveRelationsMixin)(DTOClass, relations)(resolver_interface_1.BaseServiceResolver);
exports.RemoveRelationsResolver = RemoveRelationsResolver;
//# sourceMappingURL=remove-relations.resolver.js.map