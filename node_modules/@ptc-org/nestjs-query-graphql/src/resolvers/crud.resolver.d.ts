import { Class, DeepPartial, QueryService } from '@ptc-org/nestjs-query-core';
import { BaseResolverOptions } from '../decorators/resolver-method.decorator';
import { ConnectionOptions, PagingStrategies } from '../types';
import { AggregateResolver, AggregateResolverOpts } from './aggregate.resolver';
import { CreateResolver, CreateResolverOpts } from './create.resolver';
import { DeleteResolver, DeleteResolverOpts } from './delete.resolver';
import { ReadResolverFromOpts, ReadResolverOpts } from './read.resolver';
import { ReferenceResolverOpts } from './reference.resolver';
import { MergePagingStrategyOpts, ResolverClass } from './resolver.interface';
import { UpdateResolver, UpdateResolverOpts } from './update.resolver';
export interface CRUDResolverOpts<DTO, C = DeepPartial<DTO>, U = DeepPartial<DTO>, R extends ReadResolverOpts<DTO> = ReadResolverOpts<DTO>, PS extends PagingStrategies = PagingStrategies.CURSOR> extends BaseResolverOptions, Pick<ConnectionOptions, 'enableTotalCount'> {
    /**
     * The DTO that should be used as input for create endpoints.
     */
    CreateDTOClass?: Class<C>;
    /**
     * The DTO that should be used as input for update endpoints.
     */
    UpdateDTOClass?: Class<U>;
    /**
     * The DTO that should be used for filter of the aggregate endpoint.
     */
    AggregateDTOClass?: Class<DTO>;
    enableSubscriptions?: boolean;
    pagingStrategy?: PS;
    enableAggregate?: boolean;
    create?: CreateResolverOpts<DTO, C>;
    read?: R;
    update?: UpdateResolverOpts<DTO, U>;
    delete?: DeleteResolverOpts<DTO>;
    referenceBy?: ReferenceResolverOpts;
    aggregate?: AggregateResolverOpts<DTO>;
}
export interface CRUDResolver<DTO, C, U, R extends ReadResolverOpts<DTO>, QS extends QueryService<DTO, C, U> = QueryService<DTO, C, U>> extends CreateResolver<DTO, C, QS>, ReadResolverFromOpts<DTO, R, QS>, UpdateResolver<DTO, U, QS>, DeleteResolver<DTO, QS>, AggregateResolver<DTO, QS> {
}
/**
 * Factory to create a resolver that includes all CRUD methods from [[CreateResolver]], [[ReadResolver]],
 * [[UpdateResolver]], and [[DeleteResolver]].
 *
 * ```ts
 * import { CRUDResolver } from '@ptc-org/nestjs-query-graphql';
 * import { Resolver } from '@nestjs/graphql';
 * import { TodoItemDTO } from './dto/todo-item.dto';
 * import { TodoItemService } from './todo-item.service';
 *
 * @Resolver()
 * export class TodoItemResolver extends CRUDResolver(TodoItemDTO) {
 *   constructor(readonly service: TodoItemService) {
 *     super(service);
 *   }
 * }
 * ```
 * @param DTOClass - The DTO Class that the resolver is for. All methods will use types derived from this class.
 * @param opts - Options to customize the resolver.
 */
export declare const CRUDResolver: <DTO, C = DeepPartial<DTO>, U = DeepPartial<DTO>, R extends ReadResolverOpts<DTO> = ReadResolverOpts<DTO>, PS extends PagingStrategies = PagingStrategies.CURSOR>(DTOClass: Class<DTO>, opts?: CRUDResolverOpts<DTO, C, U, R, PS>) => ResolverClass<DTO, QueryService<DTO, C, U>, CRUDResolver<DTO, C, U, MergePagingStrategyOpts<DTO, R, PS>, QueryService<DTO, C, U>>>;
