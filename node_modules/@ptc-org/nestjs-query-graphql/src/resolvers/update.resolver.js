"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateResolver = exports.Updateable = void 0;
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
const defaultUpdateInput = (dtoNames, DTOClass) => {
    let UpdateType = 
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    class UpdateType extends (0, graphql_1.PartialType)(DTOClass, graphql_1.InputType) {
    };
    UpdateType = tslib_1.__decorate([
        (0, graphql_1.InputType)(`Update${dtoNames.baseName}`)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
    ], UpdateType);
    return UpdateType;
};
/** @internal */
const defaultUpdateOneInput = (dtoNames, DTOClass, UpdateDTO) => {
    const { baseName } = dtoNames;
    let UM = class UM extends (0, types_1.UpdateOneInputType)(DTOClass, UpdateDTO) {
    };
    UM = tslib_1.__decorate([
        (0, graphql_1.InputType)(`UpdateOne${baseName}Input`)
    ], UM);
    return UM;
};
/** @internal */
const defaultUpdateManyInput = (dtoNames, DTOClass, UpdateDTO) => {
    const { pluralBaseName } = dtoNames;
    let UM = class UM extends (0, types_1.UpdateManyInputType)(DTOClass, UpdateDTO) {
    };
    UM = tslib_1.__decorate([
        (0, graphql_1.InputType)(`UpdateMany${pluralBaseName}Input`)
    ], UM);
    return UM;
};
/**
 * @internal
 * Mixin to add `update` graphql endpoints.
 */
const Updateable = (DTOClass, opts) => (BaseClass) => {
    const dtoNames = (0, common_1.getDTONames)(DTOClass, opts);
    const { baseName, pluralBaseName } = dtoNames;
    const UMR = (0, types_1.UpdateManyResponseType)();
    const enableSubscriptions = opts.enableSubscriptions === true;
    const enableOneSubscriptions = opts.one?.enableSubscriptions ?? enableSubscriptions;
    const enableManySubscriptions = opts.many?.enableSubscriptions ?? enableSubscriptions;
    const updateOneEvent = (0, subscription_1.getDTOEventName)(subscription_1.EventType.UPDATED_ONE, DTOClass);
    const updateManyEvent = (0, subscription_1.getDTOEventName)(subscription_1.EventType.UPDATED_MANY, DTOClass);
    const { UpdateDTOClass = defaultUpdateInput(dtoNames, DTOClass), UpdateOneInput = defaultUpdateOneInput(dtoNames, DTOClass, UpdateDTOClass), UpdateManyInput = defaultUpdateManyInput(dtoNames, DTOClass, UpdateDTOClass) } = opts;
    const updateOneMutationName = opts.one?.name ?? `updateOne${baseName}`;
    const updateManyMutationName = opts.many?.name ?? `updateMany${pluralBaseName}`;
    const commonResolverOpts = (0, lodash_omit_1.default)(opts, 'dtoName', 'one', 'many', 'UpdateDTOClass', 'UpdateOneInput', 'UpdateManyInput');
    let UO = class UO extends (0, types_1.MutationArgsType)(UpdateOneInput) {
    };
    UO = tslib_1.__decorate([
        (0, graphql_1.ArgsType)()
    ], UO);
    let UM = class UM extends (0, types_1.MutationArgsType)(UpdateManyInput) {
    };
    UM = tslib_1.__decorate([
        (0, graphql_1.ArgsType)()
    ], UM);
    let SI = class SI extends (0, types_1.SubscriptionFilterInputType)(DTOClass) {
    };
    SI = tslib_1.__decorate([
        (0, graphql_1.InputType)(`UpdateOne${baseName}SubscriptionFilterInput`)
    ], SI);
    let UOSA = class UOSA extends (0, types_1.SubscriptionArgsType)(SI) {
    };
    UOSA = tslib_1.__decorate([
        (0, graphql_1.ArgsType)()
    ], UOSA);
    const updateOneSubscriptionFilter = (0, helpers_1.createSubscriptionFilter)(SI, updateOneEvent);
    let UpdateResolverBase = class UpdateResolverBase extends BaseClass {
        async updateOne(input, authorizeFilter) {
            const { id, update } = input.input;
            const updateResult = await this.service.updateOne(id, update, { filter: authorizeFilter ?? {} });
            if (enableOneSubscriptions) {
                await this.publishUpdatedOneEvent(updateResult, authorizeFilter);
            }
            return updateResult;
        }
        async updateMany(input, authorizeFilter) {
            const { update, filter } = input.input;
            const updateManyResponse = await this.service.updateMany(update, (0, nestjs_query_core_1.mergeFilter)(filter, authorizeFilter ?? {}));
            if (enableManySubscriptions) {
                await this.publishUpdatedManyEvent(updateManyResponse, authorizeFilter);
            }
            return updateManyResponse;
        }
        async publishUpdatedOneEvent(dto, authorizeFilter) {
            if (this.pubSub) {
                const eventName = (0, helpers_1.getSubscriptionEventName)(updateOneEvent, authorizeFilter);
                await this.pubSub.publish(eventName, { [updateOneEvent]: dto });
            }
        }
        async publishUpdatedManyEvent(umr, authorizeFilter) {
            if (this.pubSub) {
                const eventName = (0, helpers_1.getSubscriptionEventName)(updateManyEvent, authorizeFilter);
                await this.pubSub.publish(eventName, { [updateManyEvent]: umr });
            }
        }
        // input required so graphql subscription filtering will work.
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        updatedOneSubscription(input, authorizeFilter) {
            if (!enableOneSubscriptions || !this.pubSub) {
                throw new Error(`Unable to subscribe to ${updateOneEvent}`);
            }
            const eventName = (0, helpers_1.getSubscriptionEventName)(updateOneEvent, authorizeFilter);
            return this.pubSub.asyncIterator(eventName);
        }
        updatedManySubscription(authorizeFilter) {
            if (!enableManySubscriptions || !this.pubSub) {
                throw new Error(`Unable to subscribe to ${updateManyEvent}`);
            }
            const eventName = (0, helpers_1.getSubscriptionEventName)(updateManyEvent, authorizeFilter);
            return this.pubSub.asyncIterator(eventName);
        }
    };
    tslib_1.__decorate([
        (0, decorators_1.ResolverMutation)(() => DTOClass, { name: updateOneMutationName, description: opts?.one?.description, complexity: opts?.one?.complexity }, {
            interceptors: [(0, interceptors_1.HookInterceptor)(hooks_1.HookTypes.BEFORE_UPDATE_ONE, UpdateDTOClass, DTOClass), (0, interceptors_1.AuthorizerInterceptor)(DTOClass)]
        }, commonResolverOpts, opts.one ?? {}),
        tslib_1.__param(0, (0, decorators_1.MutationHookArgs)()),
        tslib_1.__param(1, (0, decorators_1.AuthorizerFilter)({
            operationGroup: auth_1.OperationGroup.UPDATE,
            many: false
        })),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [UO, Object]),
        tslib_1.__metadata("design:returntype", Promise)
    ], UpdateResolverBase.prototype, "updateOne", null);
    tslib_1.__decorate([
        (0, decorators_1.ResolverMutation)(() => UMR, { name: updateManyMutationName, description: opts?.many?.description, complexity: opts?.many?.complexity }, {
            interceptors: [(0, interceptors_1.HookInterceptor)(hooks_1.HookTypes.BEFORE_UPDATE_MANY, UpdateDTOClass, DTOClass), (0, interceptors_1.AuthorizerInterceptor)(DTOClass)]
        }, commonResolverOpts, opts.many ?? {}),
        tslib_1.__param(0, (0, decorators_1.MutationHookArgs)()),
        tslib_1.__param(1, (0, decorators_1.AuthorizerFilter)({
            operationGroup: auth_1.OperationGroup.UPDATE,
            many: true
        })),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [UM, Object]),
        tslib_1.__metadata("design:returntype", Promise)
    ], UpdateResolverBase.prototype, "updateMany", null);
    tslib_1.__decorate([
        (0, decorators_1.ResolverSubscription)(() => DTOClass, { name: updateOneEvent, filter: updateOneSubscriptionFilter }, commonResolverOpts, {
            enableSubscriptions: enableOneSubscriptions,
            interceptors: [(0, interceptors_1.AuthorizerInterceptor)(DTOClass)]
        })
        // input required so graphql subscription filtering will work.
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ,
        tslib_1.__param(0, (0, graphql_1.Args)()),
        tslib_1.__param(1, (0, decorators_1.AuthorizerFilter)({ operationGroup: auth_1.OperationGroup.UPDATE, many: false })),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [UOSA, Object]),
        tslib_1.__metadata("design:returntype", Object)
    ], UpdateResolverBase.prototype, "updatedOneSubscription", null);
    tslib_1.__decorate([
        (0, decorators_1.ResolverSubscription)(() => UMR, { name: updateManyEvent }, commonResolverOpts, {
            enableSubscriptions: enableManySubscriptions,
            interceptors: [(0, interceptors_1.AuthorizerInterceptor)(DTOClass)]
        }),
        tslib_1.__param(0, (0, decorators_1.AuthorizerFilter)({ operationGroup: auth_1.OperationGroup.UPDATE, many: true })),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", Object)
    ], UpdateResolverBase.prototype, "updatedManySubscription", null);
    UpdateResolverBase = tslib_1.__decorate([
        (0, graphql_1.Resolver)(() => DTOClass, { isAbstract: true })
    ], UpdateResolverBase);
    return UpdateResolverBase;
};
exports.Updateable = Updateable;
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentional
const UpdateResolver = (DTOClass, opts = {}) => (0, exports.Updateable)(DTOClass, opts)(resolver_interface_1.BaseServiceResolver);
exports.UpdateResolver = UpdateResolver;
//# sourceMappingURL=update.resolver.js.map