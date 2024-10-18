import { FieldOptions, ReturnTypeFunc, ReturnTypeFuncValue } from '@nestjs/graphql';
import { Class, MetaValue } from '@ptc-org/nestjs-query-core';
import { FilterableFieldOptions } from './filterable-field.decorator';
type NoFilterIDFieldOptions = {
    disableFilter: true;
} & FieldOptions;
export type IDFieldOptions = FilterableFieldOptions | NoFilterIDFieldOptions;
export interface IDFieldDescriptor {
    propertyName: string;
    returnTypeFunc: ReturnTypeFunc<ReturnTypeFuncValue>;
}
/**
 * Decorator for Fields that should be filterable through a [[FilterType]]
 *
 * @example
 *
 * In the following DTO `id`, `title` and `completed` are filterable.
 *
 * ```ts
 * import { IDField } from '@ptc-org/nestjs-query-graphql';
 * import { ObjectType, ID } from '@nestjs/graphql';
 *
 * @ObjectType('TodoItem')
 * export class TodoItemDTO {
 *   @IDField(() => ID)
 *   id!: string;
 * }
 * ```
 */
export declare function IDField(returnTypeFunc: ReturnTypeFunc, options?: IDFieldOptions): PropertyDecorator & MethodDecorator;
export declare function getIDField<DTO>(DTOClass: Class<DTO>): MetaValue<IDFieldDescriptor>;
export {};
