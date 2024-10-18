import { Class, Filter } from '@ptc-org/nestjs-query-core';
import { AuthorizationContext, Authorizer, CustomAuthorizer } from './authorizer';
export interface AuthorizerOptions<DTO> {
    authorize: (context: any, authorizationContext: AuthorizationContext) => Filter<DTO> | Promise<Filter<DTO>>;
}
export declare function createDefaultAuthorizer<DTO>(DTOClass: Class<DTO>, opts?: CustomAuthorizer<DTO> | AuthorizerOptions<DTO>): Class<Authorizer<DTO>>;
