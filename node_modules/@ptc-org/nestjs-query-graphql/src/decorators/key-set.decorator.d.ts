import { Class, MetaValue } from '@ptc-org/nestjs-query-core';
export declare function KeySet<DTO>(keys: (keyof DTO)[]): (DTOClass: Class<DTO>) => void;
export declare const getKeySet: <DTO>(DTOClass: Class<DTO>) => (keyof DTO)[];
