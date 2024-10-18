import { DynamicModule, ForwardReference, Provider } from '@nestjs/common';
import { Assembler, Class } from '@ptc-org/nestjs-query-core';
import { DataLoaderOptions } from './pipes/inject-data-loader-config.pipe';
import { AutoResolverOpts } from './providers';
import { ReadResolverOpts } from './resolvers';
import { GraphQLPubSub } from './subscription';
import { PagingStrategies } from './types/query/paging';
interface DTOModuleOpts<DTO> {
    DTOClass: Class<DTO>;
    CreateDTOClass?: Class<DTO>;
    UpdateDTOClass?: Class<DTO>;
}
export interface NestjsQueryGraphqlModuleRootOpts {
    dataLoader?: DataLoaderOptions;
}
export interface NestjsQueryGraphqlModuleFeatureOpts {
    imports?: Array<Class<any> | DynamicModule | Promise<DynamicModule> | ForwardReference>;
    services?: Provider[];
    assemblers?: Class<Assembler<any, any, any, any, any, any>>[];
    resolvers?: AutoResolverOpts<any, any, unknown, unknown, ReadResolverOpts<any>, PagingStrategies>[];
    dtos?: DTOModuleOpts<unknown>[];
    pubSub?: Provider<GraphQLPubSub>;
}
export declare class NestjsQueryGraphQLCoreModule {
    static forRoot(opts: NestjsQueryGraphqlModuleRootOpts): DynamicModule;
}
export declare class NestjsQueryGraphQLModule {
    static forRoot(opts: NestjsQueryGraphqlModuleRootOpts): DynamicModule;
    static forFeature(opts: NestjsQueryGraphqlModuleFeatureOpts): DynamicModule;
    static defaultPubSubProvider(): Provider<GraphQLPubSub>;
    private static getCoreModule;
    private static getProviders;
    private static getPubSubProviders;
    private static getServicesProviders;
    private static getResolverProviders;
    private static getAuthorizerProviders;
    private static getHookProviders;
}
export {};
