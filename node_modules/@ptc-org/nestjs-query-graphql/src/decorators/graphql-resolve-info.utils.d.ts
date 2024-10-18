import type { RelationDescriptor } from './relation.decorator';
import type { QueryResolveTree, SelectRelation } from '@ptc-org/nestjs-query-core';
import type { GraphQLResolveInfo as ResolveInfo } from 'graphql';
export declare function simplifyResolveInfo<DTO>(resolveInfo: ResolveInfo): QueryResolveTree<DTO>;
export declare function removePagingFromSimplifiedInfo<DTO>(simpleInfo: QueryResolveTree<DTO>): QueryResolveTree<DTO>;
export declare function createLookAheadInfo<DTO>(relations: RelationDescriptor<unknown>[], simpleResolveInfo: QueryResolveTree<DTO>): SelectRelation<DTO>[];
