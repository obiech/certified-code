import { DynamicModule } from '@nestjs/common';
import { Class } from '@ptc-org/nestjs-query-core';
import type { DataSource } from 'typeorm';
export declare class NestjsQueryTypeOrmModule {
    static forFeature(entities: Class<unknown>[], connection?: DataSource | string): DynamicModule;
}
