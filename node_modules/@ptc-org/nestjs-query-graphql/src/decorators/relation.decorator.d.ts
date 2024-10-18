import { ArrayReflector, Class } from '@ptc-org/nestjs-query-core';
import { RelationsOpts, ResolverRelation } from '../resolvers/relations';
import { ResolverManyRelation, ResolverOneRelation } from '../resolvers/relations/relations.interface';
import { BaseResolverOptions } from './resolver-method.decorator';
export declare const reflector: ArrayReflector;
export type RelationOneDecoratorOpts<Relation> = Omit<ResolverOneRelation<Relation>, 'DTO' | 'allowFiltering' | 'filterDepth'>;
export type RelationManyDecoratorOpts<Relation> = Omit<ResolverManyRelation<Relation>, 'DTO' | 'allowFiltering' | 'filterDepth'>;
export type RelationTypeFunc<Relation> = () => Class<Relation>;
export type RelationClassDecorator<DTO> = <Cls extends Class<DTO>>(DTOClass: Cls) => Cls | void;
export interface RelationDescriptor<Relation> {
    name: string;
    relationTypeFunc: RelationTypeFunc<Relation>;
    isMany: boolean;
    relationOpts?: Omit<ResolverRelation<Relation>, 'DTO'>;
}
export declare function getRelationsDescriptors<DTO>(DTOClass: Class<DTO>): RelationDescriptor<unknown>[];
export declare function getRelations<DTO>(DTOClass: Class<DTO>, opts?: BaseResolverOptions): RelationsOpts;
export declare const Relation: <DTO, Relation>(name: string, relationTypeFunc: RelationTypeFunc<Relation>, options?: RelationOneDecoratorOpts<Relation>) => RelationClassDecorator<DTO>;
export declare const FilterableRelation: <DTO, Relation>(name: string, relationTypeFunc: RelationTypeFunc<Relation>, options?: RelationOneDecoratorOpts<Relation>) => RelationClassDecorator<DTO>;
export declare const UnPagedRelation: <DTO, Relation>(name: string, relationTypeFunc: RelationTypeFunc<Relation>, options?: RelationManyDecoratorOpts<Relation>) => RelationClassDecorator<DTO>;
export declare const FilterableUnPagedRelation: <DTO, Relation>(name: string, relationTypeFunc: RelationTypeFunc<Relation>, options?: RelationManyDecoratorOpts<Relation>) => RelationClassDecorator<DTO>;
export declare const OffsetConnection: <DTO, Relation>(name: string, relationTypeFunc: RelationTypeFunc<Relation>, options?: RelationManyDecoratorOpts<Relation>) => RelationClassDecorator<DTO>;
export declare const FilterableOffsetConnection: <DTO, Relation>(name: string, relationTypeFunc: RelationTypeFunc<Relation>, options?: RelationManyDecoratorOpts<Relation>) => RelationClassDecorator<DTO>;
export declare const CursorConnection: <DTO, Relation>(name: string, relationTypeFunc: RelationTypeFunc<Relation>, options?: RelationManyDecoratorOpts<Relation>) => RelationClassDecorator<DTO>;
export declare const FilterableCursorConnection: <DTO, Relation>(name: string, relationTypeFunc: RelationTypeFunc<Relation>, options?: RelationManyDecoratorOpts<Relation>) => RelationClassDecorator<DTO>;
