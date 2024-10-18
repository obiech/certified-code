import { ReturnTypeFuncValue } from '@nestjs/graphql';
import { Class } from '@ptc-org/nestjs-query-core';
export interface DTONamesOpts {
    dtoName?: string;
}
/** @internal */
export interface DTONames {
    baseName: string;
    baseNameLower: string;
    pluralBaseName: string;
    pluralBaseNameLower: string;
}
/** @internal */
export declare const getDTONames: <DTO>(DTOClass: Class<DTO>, opts?: DTONamesOpts) => DTONames;
export declare const getDTOIdTypeOrDefault: (DTOS: Class<unknown>[], defaultType?: ReturnTypeFuncValue) => ReturnTypeFuncValue;
