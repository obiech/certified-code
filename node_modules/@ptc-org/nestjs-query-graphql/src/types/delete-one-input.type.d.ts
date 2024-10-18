import { Class } from '@ptc-org/nestjs-query-core';
export interface DeleteOneInputType {
    id: string | number;
}
/**
 * The input type for delete one endpoints.
 */
export declare function DeleteOneInputType(DTOClass: Class<unknown>): Class<DeleteOneInputType>;
