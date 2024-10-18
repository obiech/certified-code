import { Class, MetaValue } from '@ptc-org/nestjs-query-core';
import { Authorizer, AuthorizerOptions, CustomAuthorizer } from '../auth';
export declare function Authorize<DTO>(optsOrAuthorizerOrClass: Class<CustomAuthorizer<DTO>> | CustomAuthorizer<DTO> | AuthorizerOptions<DTO>): (DTOClass: Class<DTO>) => void;
export declare const getAuthorizer: <DTO>(DTOClass: Class<DTO>) => Class<Authorizer<DTO>>;
export declare const getCustomAuthorizer: <DTO>(DTOClass: Class<DTO>) => Class<CustomAuthorizer<DTO>>;
