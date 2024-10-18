"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteResolver = exports.Deletable = void 0;
const tslib_1 = require("tslib");
// eslint-disable-next-line max-classes-per-file
const graphql_1 = require("@nestjs/graphql");
const nestjs_query_core_1 = require("@ptc-org/nestjs-query-core");
const lodash_omit_1 = tslib_1.__importDefault(require("lodash.omit"));
const auth_1 = require("../auth");
const common_1 = require("../common");
const decorators_1 = require("../decorators");
const hooks_1 = require("../hooks");
const interceptors_1 = require("../interceptors");
const subscription_1 = require("../subscription");
const types_1 = require("../types");
const helpers_1 = require("./helpers");
const resolver_interface_1 = require("./resolver.interface");
/** @internal */
const defaultDeleteManyInput = (dtoNames, DTOClass) => {
    const { pluralBaseName } = dtoNames;
    let DM = class DM extends (0, types_1.DeleteManyInputType)(DTOClass) {
    };
    DM = tslib_1.__decorate([
        (0, graphql_1.InputType)(`DeleteMany${pluralBaseName}Input`)
    ], DM);
    return DM;
};
/** @internal */
const defaultDeleteOneInput = (dtoNames, DTOClass) => {
    const { baseName } = dtoNames;
    let DM = class DM extends (0, types_1.DeleteOneInputType)(DTOClass) {
    };
    DM = tslib_1.__decorate([
        (0, graphql_1.InputType)(`DeleteOne${baseName}Input`)
    ], DM);
    return DM;
};
/**
 * @internal
 * Mixin to add `delete` graphql endpoints.
 */
const Deletable = (DTOClass, opts) => (BaseClass) => {
    const dtoNames = (0, common_1.getDTONames)(DTOClass, opts);
    const { baseName, pluralBaseName } = dtoNames;
    const enableSubscriptions = opts.enableSubscriptions === true;
    const enableOneSubscriptions = opts.one?.enableSubscriptions ?? enableSubscriptions;
    const enableManySubscriptions = opts.many?.enableSubscriptions ?? enableSubscriptions;
    const deletedOneEvent = (0, subscription_1.getDTOEventName)(subscription_1.EventType.DELETED_ONE, DTOClass);
    const deletedManyEvent = (0, subscription_1.getDTOEventName)(subscription_1.EventType.DELETED_MANY, DTOClass);
    const { DeleteOneInput = defaultDeleteOneInput(dtoNames, DTOClass), DeleteManyInput = defaultDeleteManyInput(dtoNames, DTOClass) } = opts;
    const deleteOneMutationName = opts.one?.name ?? `deleteOne${baseName}`;
    const deleteManyMutationName = opts.many?.name ?? `deleteMany${pluralBaseName}`;
    const DMR = (0, types_1.DeleteManyResponseType)();
    const commonResolverOpts = (0, lodash_omit_1.default)(opts, 'dtoName', 'one', 'many', 'DeleteOneInput', 'DeleteManyInput', 'useSoftDelete');
    let DeleteOneResponse = 
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    class DeleteOneResponse extends (0, graphql_1.PartialType)(DTOClass, graphql_1.ObjectType) {
    };
    DeleteOneResponse = tslib_1.__decorate([
        (0, graphql_1.ObjectType)(`${baseName}DeleteResponse`)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
    ], DeleteOneResponse);
    let DO = class DO extends (0, types_1.MutationArgsType)(DeleteOneInput) {
    };
    DO = tslib_1.__decorate([
        (0, graphql_1.ArgsType)()
    ], DO);
    let DM = class DM extends (0, types_1.MutationArgsType)(DeleteManyInput) {
    };
    DM = tslib_1.__decorate([
        (0, graphql_1.ArgsType)()
    ], DM);
    let SI = class SI extends (0, types_1.SubscriptionFilterInputType)(DTOClass) {
    };
    SI = tslib_1.__decorate([
        (0, graphql_1.InputType)(`DeleteOne${baseName}SubscriptionFilterInput`)
    ], SI);
    let DOSA = class DOSA extends (0, types_1.SubscriptionArgsType)(SI) {
    };
    DOSA = tslib_1.__decorate([
        (0, graphql_1.ArgsType)()
    ], DOSA);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const deleteOneSubscriptionFilter = (0, helpers_1.createSubscriptionFilter)(SI, deletedOneEvent);
    let DeleteResolverBase = class DeleteResolverBase extends BaseClass {
        async deleteOne(input, authorizeFilter) {
            const deletedResponse = await this.service.deleteOne(input.input.id, {
                filter: authorizeFilter ?? {},
                useSoftDelete: opts?.useSoftDelete ?? false
            });
            if (enableOneSubscriptions) {
                await this.publishDeletedOneEvent(deletedResponse, authorizeFilter);
            }
            return deletedResponse;
        }
        async deleteMany(input, authorizeFilter) {
            const deleteManyResponse = await this.service.deleteMany((0, nestjs_query_core_1.mergeFilter)(input.input.filter, authorizeFilter ?? {}), {
                useSoftDelete: opts?.useSoftDelete ?? false
            });
            if (enableManySubscriptions) {
                await this.publishDeletedManyEvent(deleteManyResponse, authorizeFilter);
            }
            return deleteManyResponse;
        }
        async publishDeletedOneEvent(dto, authorizeFilter) {
            if (this.pubSub) {
                const eventName = (0, helpers_1.getSubscriptionEventName)(deletedOneEvent, authorizeFilter);
                await this.pubSub.publish(eventName, { [deletedOneEvent]: dto });
            }
        }
        async publishDeletedManyEvent(dmr, authorizeFilter) {
            if (this.pubSub) {
                const eventName = (0, helpers_1.getSubscriptionEventName)(deletedManyEvent, authorizeFilter);
                await this.pubSub.publish(eventName, { [deletedManyEvent]: dmr });
            }
        }
        // input required so graphql subscription filtering will work.
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        deletedOneSubscription(input, authorizeFilter) {
            if (!enableOneSubscriptions || !this.pubSub) {
                throw new Error(`Unable to subscribe to ${deletedOneEvent}`);
            }
            const eventName = (0, helpers_1.getSubscriptionEventName)(deletedOneEvent, authorizeFilter);
            return this.pubSub.asyncIterator(eventName);
        }
        deletedManySubscription(authorizeFilter) {
            if (!enableManySubscriptions || !this.pubSub) {
                throw new Error(`Unable to subscribe to ${deletedManyEvent}`);
            }
            const eventName = (0, helpers_1.getSubscriptionEventName)(deletedManyEvent, authorizeFilter);
            return this.pubSub.asyncIterator(eventName);
        }
    };
    tslib_1.__decorate([
        (0, decorators_1.ResolverMutation)(() => DeleteOneResponse, { name: deleteOneMutationName, description: opts?.one?.description, complexity: opts?.one?.complexity }, commonResolverOpts, { interceptors: [(0, interceptors_1.HookInterceptor)(hooks_1.HookTypes.BEFORE_DELETE_ONE, DTOClass), (0, interceptors_1.AuthorizerInterceptor)(DTOClass)] }, opts.one ?? {}),
        tslib_1.__param(0, (0, decorators_1.MutationHookArgs)()),
        tslib_1.__param(1, (0, decorators_1.AuthorizerFilter)({
            operationGroup: auth_1.OperationGroup.DELETE,
            many: false
        })),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [DO, Object]),
        tslib_1.__metadata("design:returntype", Promise)
    ], DeleteResolverBase.prototype, "deleteOne", null);
    tslib_1.__decorate([
        (0, decorators_1.ResolverMutation)(() => DMR, { name: deleteManyMutationName, description: opts?.many?.description, complexity: opts?.many?.complexity }, commonResolverOpts, { interceptors: [(0, interceptors_1.HookInterceptor)(hooks_1.HookTypes.BEFORE_DELETE_MANY, DTOClass), (0, interceptors_1.AuthorizerInterceptor)(DTOClass)] }, opts.many ?? {}),
        tslib_1.__param(0, (0, decorators_1.MutationHookArgs)()),
        tslib_1.__param(1, (0, decorators_1.AuthorizerFilter)({
            operationGroup: auth_1.OperationGroup.DELETE,
            many: true
        })),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [DM, Object]),
        tslib_1.__metadata("design:returntype", Promise)
    ], DeleteResolverBase.prototype, "deleteMany", null);
    tslib_1.__decorate([
        (0, decorators_1.ResolverSubscription)(() => DeleteOneResponse, { name: deletedOneEvent, filter: deleteOneSubscriptionFilter }, commonResolverOpts, {
            enableSubscriptions: enableOneSubscriptions,
            interceptors: [(0, interceptors_1.AuthorizerInterceptor)(DTOClass)]
        })
        // input required so graphql subscription filtering will work.
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ,
        tslib_1.__param(0, (0, graphql_1.Args)()),
        tslib_1.__param(1, (0, decorators_1.AuthorizerFilter)({ operationGroup: auth_1.OperationGroup.DELETE, many: false })),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [DOSA, Object]),
        tslib_1.__metadata("design:returntype", Object)
    ], DeleteResolverBase.prototype, "deletedOneSubscription", null);
    tslib_1.__decorate([
        (0, decorators_1.ResolverSubscription)(() => DMR, { name: deletedManyEvent }, commonResolverOpts, {
            enableSubscriptions: enableManySubscriptions,
            interceptors: [(0, interceptors_1.AuthorizerInterceptor)(DTOClass)]
        }),
        tslib_1.__param(0, (0, decorators_1.AuthorizerFilter)({ operationGroup: auth_1.OperationGroup.DELETE, many: true })),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", Object)
    ], DeleteResolverBase.prototype, "deletedManySubscription", null);
    DeleteResolverBase = tslib_1.__decorate([
        (0, graphql_1.Resolver)(() => DTOClass, { isAbstract: true })
    ], DeleteResolverBase);
    return DeleteResolverBase;
};
exports.Deletable = Deletable;
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentional
const DeleteResolver = (DTOClass, opts = {}) => (0, exports.Deletable)(DTOClass, opts)(resolver_interface_1.BaseServiceResolver);
exports.DeleteResolver = DeleteResolver;
//# sourceMappingURL=delete.resolver.js.map