"use strict";
var NestjsQueryGraphQLCoreModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestjsQueryGraphQLModule = exports.NestjsQueryGraphQLCoreModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const nestjs_query_core_1 = require("@ptc-org/nestjs-query-core");
const inject_data_loader_config_pipe_1 = require("./pipes/inject-data-loader-config.pipe");
const providers_1 = require("./providers");
const subscription_1 = require("./subscription");
let NestjsQueryGraphQLCoreModule = NestjsQueryGraphQLCoreModule_1 = class NestjsQueryGraphQLCoreModule {
    static forRoot(opts) {
        const providers = [{ provide: inject_data_loader_config_pipe_1.dataLoaderOptionsToken, useValue: opts.dataLoader ?? {} }];
        return {
            module: NestjsQueryGraphQLCoreModule_1,
            providers,
            exports: providers
        };
    }
};
exports.NestjsQueryGraphQLCoreModule = NestjsQueryGraphQLCoreModule;
exports.NestjsQueryGraphQLCoreModule = NestjsQueryGraphQLCoreModule = NestjsQueryGraphQLCoreModule_1 = tslib_1.__decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({})
], NestjsQueryGraphQLCoreModule);
class NestjsQueryGraphQLModule {
    static forRoot(opts) {
        return {
            module: NestjsQueryGraphQLModule,
            imports: [NestjsQueryGraphQLCoreModule.forRoot(opts)]
        };
    }
    static forFeature(opts) {
        const coreModule = this.getCoreModule(opts);
        const providers = this.getProviders(opts);
        const imports = opts.imports ?? [];
        return {
            module: NestjsQueryGraphQLModule,
            imports: [...imports, coreModule],
            providers: [...providers],
            exports: [...providers, ...imports, coreModule]
        };
    }
    static defaultPubSubProvider() {
        return { provide: (0, subscription_1.pubSubToken)(), useValue: (0, subscription_1.defaultPubSub)() };
    }
    static getCoreModule(opts) {
        return nestjs_query_core_1.NestjsQueryCoreModule.forFeature({
            assemblers: opts.assemblers,
            imports: opts.imports ?? []
        });
    }
    static getProviders(opts) {
        return [
            ...this.getServicesProviders(opts),
            ...this.getPubSubProviders(opts),
            ...this.getAuthorizerProviders(opts),
            ...this.getHookProviders(opts),
            ...this.getResolverProviders(opts)
        ];
    }
    static getPubSubProviders(opts) {
        return [opts.pubSub ?? this.defaultPubSubProvider()];
    }
    static getServicesProviders(opts) {
        return opts.services ?? [];
    }
    static getResolverProviders(opts) {
        return (0, providers_1.createResolvers)(opts.resolvers ?? []);
    }
    static getAuthorizerProviders(opts) {
        const resolverDTOs = opts.resolvers?.map((r) => r.DTOClass) ?? [];
        const dtos = opts.dtos?.map((o) => o.DTOClass) ?? [];
        return (0, providers_1.createAuthorizerProviders)([...resolverDTOs, ...dtos]);
    }
    static getHookProviders(opts) {
        return (0, providers_1.createHookProviders)([...(opts.resolvers ?? []), ...(opts.dtos ?? [])]);
    }
}
exports.NestjsQueryGraphQLModule = NestjsQueryGraphQLModule;
//# sourceMappingURL=module.js.map