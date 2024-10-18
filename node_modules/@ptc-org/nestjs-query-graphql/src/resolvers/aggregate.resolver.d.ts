import { AggregateQuery, AggregateResponse, Class, Filter, QueryService } from '@ptc-org/nestjs-query-core';
import { ResolverMethodOpts } from '../decorators';
import { AggregateArgsType } from '../types';
import { NamedEndpoint, ResolverClass, ServiceResolver } from './resolver.interface';
export interface AggregateResolverOpts<DTO> extends ResolverMethodOpts, NamedEndpoint {
    AggregateDTOClass?: Class<DTO>;
    enabled?: boolean;
}
export interface AggregateResolver<DTO, QS extends QueryService<DTO, unknown, unknown>> extends ServiceResolver<DTO, QS> {
    aggregate(filter: AggregateArgsType<DTO>, aggregateQuery: AggregateQuery<DTO>, authFilter?: Filter<DTO>): Promise<AggregateResponse<DTO>[]>;
}
/**
 * @internal
 * Mixin to add `aggregate` graphql endpoints.
 */
export declare const Aggregateable: <DTO, QS extends QueryService<DTO, unknown, unknown>>(DTOClass: Class<DTO>, opts?: AggregateResolverOpts<DTO>) => <B extends Class<ServiceResolver<DTO, QS>>>(BaseClass: B) => Class<AggregateResolver<DTO, QS>> & B;
export declare const AggregateResolver: <DTO, QS extends QueryService<DTO, unknown, unknown> = QueryService<DTO, unknown, unknown>>(DTOClass: Class<DTO>, opts?: AggregateResolverOpts<DTO>) => ResolverClass<DTO, QS, AggregateResolver<DTO, QS>>;
