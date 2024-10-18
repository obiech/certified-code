"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResolvers = exports.isServiceCRUDAutoResolverOpts = exports.isAssemblerCRUDAutoResolverOpts = exports.isFederatedResolverOpts = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const nestjs_query_core_1 = require("@ptc-org/nestjs-query-core");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const decorators_1 = require("../decorators");
const resolvers_1 = require("../resolvers");
const isFederatedResolverOpts = (opts) => 'type' in opts && opts.type === 'federated';
exports.isFederatedResolverOpts = isFederatedResolverOpts;
const isAssemblerCRUDAutoResolverOpts = (opts) => 'DTOClass' in opts && 'AssemblerClass' in opts;
exports.isAssemblerCRUDAutoResolverOpts = isAssemblerCRUDAutoResolverOpts;
const isServiceCRUDAutoResolverOpts = (opts) => 'DTOClass' in opts && 'ServiceClass' in opts;
exports.isServiceCRUDAutoResolverOpts = isServiceCRUDAutoResolverOpts;
const getResolverToken = (DTOClass) => `${DTOClass.name}AutoResolver`;
const getFederatedResolverToken = (DTOClass) => `${DTOClass.name}FederatedAutoResolver`;
function createFederatedResolver(resolverOpts) {
    const { DTOClass } = resolverOpts;
    let AutoResolver = class AutoResolver extends (0, resolvers_1.FederationResolver)(DTOClass) {
        constructor(service, pubSub) {
            super(service);
            this.service = service;
            this.pubSub = pubSub;
        }
    };
    AutoResolver = tslib_1.__decorate([
        (0, graphql_1.Resolver)(() => DTOClass),
        tslib_1.__param(0, (0, common_1.Inject)(resolverOpts.Service)),
        tslib_1.__param(1, (0, decorators_1.InjectPubSub)()),
        tslib_1.__metadata("design:paramtypes", [Object, graphql_subscriptions_1.PubSub])
    ], AutoResolver);
    // need to set class name so DI works properly
    Object.defineProperty(AutoResolver, 'name', { value: getFederatedResolverToken(DTOClass), writable: false });
    return AutoResolver;
}
function createEntityAutoResolver(resolverOpts) {
    const { DTOClass, EntityClass } = resolverOpts;
    class Service extends nestjs_query_core_1.AssemblerQueryService {
        constructor(service) {
            const assembler = nestjs_query_core_1.AssemblerFactory.getAssembler(DTOClass, EntityClass);
            super(assembler, service);
        }
    }
    let AutoResolver = class AutoResolver extends (0, resolvers_1.CRUDResolver)(DTOClass, resolverOpts) {
        constructor(service, pubSub) {
            super(new Service(service));
            this.pubSub = pubSub;
        }
    };
    AutoResolver = tslib_1.__decorate([
        (0, graphql_1.Resolver)(() => DTOClass),
        tslib_1.__param(0, (0, nestjs_query_core_1.InjectQueryService)(EntityClass)),
        tslib_1.__param(1, (0, decorators_1.InjectPubSub)()),
        tslib_1.__metadata("design:paramtypes", [Object, graphql_subscriptions_1.PubSub])
    ], AutoResolver);
    // need to set class name so DI works properly
    Object.defineProperty(AutoResolver, 'name', { value: getResolverToken(DTOClass), writable: false });
    return AutoResolver;
}
function createAssemblerAutoResolver(resolverOpts) {
    const { DTOClass, AssemblerClass } = resolverOpts;
    let AutoResolver = class AutoResolver extends (0, resolvers_1.CRUDResolver)(DTOClass, resolverOpts) {
        constructor(service, pubSub) {
            super(service);
            this.pubSub = pubSub;
        }
    };
    AutoResolver = tslib_1.__decorate([
        (0, graphql_1.Resolver)(() => DTOClass),
        tslib_1.__param(0, (0, nestjs_query_core_1.InjectAssemblerQueryService)(AssemblerClass)),
        tslib_1.__param(1, (0, decorators_1.InjectPubSub)()),
        tslib_1.__metadata("design:paramtypes", [Object, graphql_subscriptions_1.PubSub])
    ], AutoResolver);
    // need to set class name so DI works properly
    Object.defineProperty(AutoResolver, 'name', { value: getResolverToken(DTOClass), writable: false });
    return AutoResolver;
}
function createServiceAutoResolver(resolverOpts) {
    const { DTOClass, ServiceClass } = resolverOpts;
    let AutoResolver = class AutoResolver extends (0, resolvers_1.CRUDResolver)(DTOClass, resolverOpts) {
        constructor(service, pubSub) {
            super(service);
            this.pubSub = pubSub;
        }
    };
    AutoResolver = tslib_1.__decorate([
        (0, graphql_1.Resolver)(() => DTOClass),
        tslib_1.__param(0, (0, common_1.Inject)(ServiceClass)),
        tslib_1.__param(1, (0, decorators_1.InjectPubSub)()),
        tslib_1.__metadata("design:paramtypes", [Object, graphql_subscriptions_1.PubSub])
    ], AutoResolver);
    // need to set class name so DI works properly
    Object.defineProperty(AutoResolver, 'name', { value: getResolverToken(DTOClass), writable: false });
    return AutoResolver;
}
function createResolver(resolverOpts) {
    if ((0, exports.isFederatedResolverOpts)(resolverOpts)) {
        return createFederatedResolver(resolverOpts);
    }
    if ((0, exports.isAssemblerCRUDAutoResolverOpts)(resolverOpts)) {
        return createAssemblerAutoResolver(resolverOpts);
    }
    if ((0, exports.isServiceCRUDAutoResolverOpts)(resolverOpts)) {
        return createServiceAutoResolver(resolverOpts);
    }
    return createEntityAutoResolver(resolverOpts);
}
const createResolvers = (opts) => opts.map((opt) => createResolver(opt));
exports.createResolvers = createResolvers;
//# sourceMappingURL=resolver.provider.js.map