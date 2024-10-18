import { Class } from '@ptc-org/nestjs-query-core';
export interface SubscriptionArgsType<Input> {
    input?: Input;
}
export declare function SubscriptionArgsType<Input>(InputClass: Class<Input>): Class<SubscriptionArgsType<Input>>;
