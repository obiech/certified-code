import { AggregateResponse, Class, TypeAggregate } from '@ptc-org/nestjs-query-core';
export type AggregateResponseOpts = {
    prefix: string;
};
export declare function AggregateResponseType<DTO>(DTOClass: Class<DTO>, opts?: AggregateResponseOpts): [Class<AggregateResponse<DTO>>, Class<TypeAggregate<DTO>>];
