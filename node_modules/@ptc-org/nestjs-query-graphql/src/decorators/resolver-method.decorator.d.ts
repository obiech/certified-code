import { CanActivate, ExceptionFilter, NestInterceptor, PipeTransform } from '@nestjs/common';
import { Complexity } from '@nestjs/graphql';
import { Class } from '@ptc-org/nestjs-query-core';
export interface BaseResolverOptions {
    /** An array of `nestjs` guards to apply to a graphql endpoint */
    guards?: (Class<CanActivate> | CanActivate)[];
    /** An array of `nestjs` interceptors to apply to a graphql endpoint */
    interceptors?: Class<NestInterceptor<any, any>>[];
    /** An array of `nestjs` pipes to apply to a graphql endpoint */
    pipes?: Class<PipeTransform<any, any>>[];
    /** An array of `nestjs` error filters to apply to a graphql endpoint */
    filters?: Class<ExceptionFilter<any>>[];
    /** An array of additional decorators to apply to the graphql endpont * */
    decorators?: (PropertyDecorator | MethodDecorator)[];
}
/**
 * Options for resolver methods.
 */
export interface ResolverMethodOpts extends BaseResolverOptions {
    /** Set to true to disable the endpoint */
    disabled?: boolean;
    complexity?: Complexity;
}
/**
 * Options for relation resolver methods.
 */
export interface ResolverRelationMethodOpts extends BaseResolverOptions {
    /** Set to true to enable the endpoint */
    enabled?: boolean;
    complexity?: Complexity;
}
/**
 * @internal
 * Returns true if any of the [[ResolverMethodOpts]] are disabled.
 * @param opts - The array of [[ResolverMethodOpts]] to check.
 */
export declare function isDisabled(opts: ResolverMethodOpts[]): boolean;
/**
 * @internal
 * Returns true if any of the [[ResolverRelationMethodOpts]] are disabled.
 * @param opts - The array of [[ResolverRelationMethodOpts]] to check.
 */
export declare function isEnabled(opts: ResolverRelationMethodOpts[]): boolean;
/**
 * @internal
 * Decorator for all ResolverMethods
 *
 * @param opts - the [[ResolverMethodOpts]] to apply.
 */
export declare function ResolverMethod(...opts: ResolverMethodOpts[]): MethodDecorator;
