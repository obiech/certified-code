import { PipeTransform } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Options } from 'dataloader';
export declare const dataLoaderOptionsToken: "DATALOADER_OPTIONS";
export type DataLoaderOptions = Options<any, any, any>;
export declare class InjectDataLoaderConfigPipe implements PipeTransform {
    private moduleRef;
    private readonly options;
    constructor(moduleRef: ModuleRef);
    transform(): DataLoaderOptions;
}
