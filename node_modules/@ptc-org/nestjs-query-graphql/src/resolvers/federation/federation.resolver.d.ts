import { Class, QueryService } from '@ptc-org/nestjs-query-core';
import { BaseResolverOptions } from '../../decorators/resolver-method.decorator';
import { ServiceResolver } from '../resolver.interface';
export declare const FederationResolver: <DTO, QS extends QueryService<DTO, unknown, unknown> = QueryService<DTO, unknown, unknown>>(DTOClass: Class<DTO>, opts?: BaseResolverOptions) => Class<ServiceResolver<DTO, QS>>;
