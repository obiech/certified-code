import { ExecutionContext } from '@nestjs/common';
import Dataloader from 'dataloader';
import { DataLoaderOptions } from '../pipes/inject-data-loader-config.pipe';
export interface NestjsQueryExecutionContext extends ExecutionContext {
    nestjsQueryLoaders?: Record<string, Dataloader<unknown, unknown>>;
}
export declare class DataLoaderFactory {
    private static initializeContext;
    static getOrCreateLoader<K, V>(context: NestjsQueryExecutionContext, name: string, createHandler: () => Dataloader.BatchLoadFn<K, V>, options?: DataLoaderOptions): Dataloader<K, V>;
}
