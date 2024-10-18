import { Class } from '@ptc-org/nestjs-query-core';
export interface MutationArgsType<Input> {
    input: Input;
}
export declare function MutationArgsType<Input>(InputClass: Class<Input>): Class<MutationArgsType<Input>>;
