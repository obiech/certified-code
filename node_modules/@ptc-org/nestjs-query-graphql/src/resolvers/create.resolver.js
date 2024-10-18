"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateResolver = exports.Creatable = void 0;
const tslib_1 = require("tslib");
/**
 * This is the doc comment for file1.ts
 * @packageDocumentation
 */
// eslint-disable-next-line max-classes-per-file
const graphql_1 = require("@nestjs/graphql");
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
const defaultCreateDTO = (dtoNames, DTOClass) => {
    let CreateInput = 
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    class CreateInput extends (0, graphql_1.OmitType)(DTOClass, [], graphql_1.InputType) {
    };
    CreateInput = tslib_1.__decorate([
        (0, graphql_1.InputType)(`Create${dtoNames.baseName}`)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
    ], CreateInput);
    return CreateInput;
};
/** @internal */
const defaultCreateOneInput = (dtoNames, InputDTO) => {
    const { baseName, baseNameLower } = dtoNames;
    let CO = class CO extends (0, types_1.CreateOneInputType)(baseNameLower, InputDTO) {
    };
    CO = tslib_1.__decorate([
        (0, graphql_1.InputType)(`CreateOne${baseName}Input`)
    ], CO);
    return CO;
};
/** @internal */
const defaultCreateManyInput = (dtoNames, InputDTO) => {
    const { pluralBaseName, pluralBaseNameLower } = dtoNames;
    let CM = class CM extends (0, types_1.CreateManyInputType)(pluralBaseNameLower, InputDTO) {
    };
    CM = tslib_1.__decorate([
        (0, graphql_1.InputType)(`CreateMany${pluralBaseName}Input`)
    ], CM);
    return CM;
};
/**
 * @internal
 * Mixin to add `create` graphql endpoints.
 */
const Creatable = (DTOClass, opts) => (BaseClass) => {
    const dtoNames = (0, common_1.getDTONames)(DTOClass, opts);
    const { baseName, pluralBaseName } = dtoNames;
    const enableSubscriptions = opts.enableSubscriptions === true;
    const enableOneSubscriptions = opts.one?.enableSubscriptions ?? enableSubscriptions;
    const enableManySubscriptions = opts.many?.enableSubscriptions ?? enableSubscriptions;
    const createdEvent = (0, subscription_1.getDTOEventName)(subscription_1.EventType.CREATED, DTOClass);
    const { CreateDTOClass = defaultCreateDTO(dtoNames, DTOClass), CreateOneInput = defaultCreateOneInput(dtoNames, CreateDTOClass), CreateManyInput = defaultCreateManyInput(dtoNames, CreateDTOClass) } = opts;
    const createOneMutationName = opts.one?.name ?? `createOne${baseName}`;
    const createManyMutationName = opts.many?.name ?? `createMany${pluralBaseName}`;
    const commonResolverOpts = (0, lodash_omit_1.default)(opts, 'dtoName', 'one', 'many', 'CreateDTOClass', 'CreateOneInput', 'CreateManyInput');
    let CO = class CO extends (0, types_1.MutationArgsType)(CreateOneInput) {
    };
    CO = tslib_1.__decorate([
        (0, graphql_1.ArgsType)()
    ], CO);
    let CM = class CM extends (0, types_1.MutationArgsType)(CreateManyInput) {
    };
    CM = tslib_1.__decorate([
        (0, graphql_1.ArgsType)()
    ], CM);
    let SI = class SI extends (0, types_1.SubscriptionFilterInputType)(DTOClass) {
    };
    SI = tslib_1.__decorate([
        (0, graphql_1.InputType)(`Create${baseName}SubscriptionFilterInput`)
    ], SI);
    let SA = class SA extends (0, types_1.SubscriptionArgsType)(SI) {
    };
    SA = tslib_1.__decorate([
        (0, graphql_1.ArgsType)()
    ], SA);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const subscriptionFilter = (0, helpers_1.createSubscriptionFilter)(SI, createdEvent);
    let CreateResolverBase = class CreateResolverBase extends BaseClass {
        async createOne(input, // eslint-disable-next-line @typescript-eslint/no-unused-vars
        authorizeFilter) {
            // Ignore `authorizeFilter` for now but give users the ability to throw an UnauthorizedException
            const created = await this.service.createOne(input.input.input);
            if (enableOneSubscriptions) {
                await this.publishCreatedEvent(created, authorizeFilter);
            }
            return created;
        }
        async createMany(input, // eslint-disable-next-line @typescript-eslint/no-unused-vars
        authorizeFilter) {
            // Ignore `authorizeFilter` for now but give users the ability to throw an UnauthorizedException
            const created = await this.service.createMany(input.input.input);
            if (enableManySubscriptions) {
                await Promise.all(created.map((c) => this.publishCreatedEvent(c, authorizeFilter)));
            }
            return created;
        }
        async publishCreatedEvent(dto, authorizeFilter) {
            if (this.pubSub) {
                const eventName = (0, helpers_1.getSubscriptionEventName)(createdEvent, authorizeFilter);
                await this.pubSub.publish(eventName, { [createdEvent]: dto });
            }
        }
        createdSubscription(input, authorizeFilter) {
            if (!this.pubSub || !(enableManySubscriptions || enableOneSubscriptions)) {
                throw new Error(`Unable to subscribe to ${createdEvent}`);
            }
            const eventName = (0, helpers_1.getSubscriptionEventName)(createdEvent, authorizeFilter);
            return this.pubSub.asyncIterator(eventName);
        }
    };
    tslib_1.__decorate([
        (0, decorators_1.ResolverMutation)(() => DTOClass, { name: createOneMutationName, description: opts?.one?.description, complexity: opts?.one?.complexity }, commonResolverOpts, {
            interceptors: [(0, interceptors_1.HookInterceptor)(hooks_1.HookTypes.BEFORE_CREATE_ONE, CreateDTOClass, DTOClass), (0, interceptors_1.AuthorizerInterceptor)(DTOClass)]
        }, opts.one ?? {}),
        tslib_1.__param(0, (0, decorators_1.MutationHookArgs)()),
        tslib_1.__param(1, (0, decorators_1.AuthorizerFilter)({
            operationGroup: auth_1.OperationGroup.CREATE,
            many: false
        })),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [CO, Object]),
        tslib_1.__metadata("design:returntype", Promise)
    ], CreateResolverBase.prototype, "createOne", null);
    tslib_1.__decorate([
        (0, decorators_1.ResolverMutation)(() => [DTOClass], { name: createManyMutationName, description: opts?.many?.description, complexity: opts?.many?.complexity }, { ...commonResolverOpts }, {
            interceptors: [(0, interceptors_1.HookInterceptor)(hooks_1.HookTypes.BEFORE_CREATE_MANY, CreateDTOClass, DTOClass), (0, interceptors_1.AuthorizerInterceptor)(DTOClass)]
        }, opts.many ?? {}),
        tslib_1.__param(0, (0, decorators_1.MutationHookArgs)()),
        tslib_1.__param(1, (0, decorators_1.AuthorizerFilter)({
            operationGroup: auth_1.OperationGroup.CREATE,
            many: true
        })),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [CM, Object]),
        tslib_1.__metadata("design:returntype", Promise)
    ], CreateResolverBase.prototype, "createMany", null);
    tslib_1.__decorate([
        (0, decorators_1.ResolverSubscription)(() => DTOClass, { name: createdEvent, filter: subscriptionFilter }, commonResolverOpts, {
            enableSubscriptions: enableOneSubscriptions || enableManySubscriptions,
            interceptors: [(0, interceptors_1.AuthorizerInterceptor)(DTOClass)]
        }),
        tslib_1.__param(0, (0, graphql_1.Args)()),
        tslib_1.__param(1, (0, decorators_1.AuthorizerFilter)({ operationGroup: auth_1.OperationGroup.CREATE, many: false })),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [SA, Object]),
        tslib_1.__metadata("design:returntype", Object)
    ], CreateResolverBase.prototype, "createdSubscription", null);
    CreateResolverBase = tslib_1.__decorate([
        (0, graphql_1.Resolver)(() => DTOClass, { isAbstract: true })
    ], CreateResolverBase);
    return CreateResolverBase;
};
exports.Creatable = Creatable;
/**
 * Factory to create a new abstract class that can be extended to add `create` endpoints.
 *
 * Assume we have `TodoItemDTO`, you can create a resolver with `createOneTodoItem` and `createManyTodoItems` graphql
 * query endpoints using the following code.
 *
 * ```ts
 * @Resolver()
 * export class TodoItemResolver extends CreateResolver(TodoItemDTO) {
 *   constructor(readonly service: TodoItemService) {
 *    super(service);
 *   }
 * }
 * ```
 *
 * @param DTOClass - The DTO class that should be returned from the `createOne` and `createMany` endpoint.
 * @param opts - Options to customize endpoints.
 * @typeparam DTO - The type of DTO that should be created.
 * @typeparam C - The create DTO type.
 */
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentional
const CreateResolver = (DTOClass, opts = {}) => (0, exports.Creatable)(DTOClass, opts)(resolver_interface_1.BaseServiceResolver);
exports.CreateResolver = CreateResolver;
//# sourceMappingURL=create.resolver.js.map