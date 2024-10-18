import { Class } from '@ptc-org/nestjs-query-core';
import { Pager } from '../../interfaces';
import { CursorPagerResult } from './interfaces';
export type PagerOpts = {
    disableKeySetPagination?: boolean;
};
export declare const createPager: <DTO>(DTOClass: Class<DTO>, opts: PagerOpts) => Pager<DTO, CursorPagerResult<DTO>>;
