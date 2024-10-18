import { NestInterceptor } from '@nestjs/common';
import { Class } from '@ptc-org/nestjs-query-core';
import { Authorizer } from '../auth';
export type AuthorizerContext<DTO> = {
    authorizer: Authorizer<DTO>;
};
export declare function AuthorizerInterceptor<DTO>(DTOClass: Class<DTO>): Class<NestInterceptor>;
