import { AggregateResponse, Class, QueryService } from '@ptc-org/nestjs-query-core';
import { ServiceResolver } from '../resolver.interface';
export declare const GroupByAggregateMixin: <DTO>(DTOClass: Class<DTO>, AR: Class<AggregateResponse<DTO>>) => <B extends Class<ServiceResolver<DTO, QueryService<DTO, unknown, unknown>>>>(Base: B) => B;
