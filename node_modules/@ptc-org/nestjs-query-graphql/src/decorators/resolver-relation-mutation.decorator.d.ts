import { MutationOptions, ReturnTypeFunc } from '@nestjs/graphql';
import { ResolverRelationMethodOpts } from './resolver-method.decorator';
/**
 * @internal
 * Decorator for a graphql `mutation` endpoint.
 * @param typeFunc - A function that returns the return type for the mutation.
 * @param options - `@nestjs/graphql` options to apply to the mutation.
 * @param opts -  [[ResolverRelationMethodOpts]] to apply to the mutation
 */
export declare function ResolverRelationMutation(typeFunc: ReturnTypeFunc, options?: MutationOptions, ...opts: ResolverRelationMethodOpts[]): MethodDecorator;
