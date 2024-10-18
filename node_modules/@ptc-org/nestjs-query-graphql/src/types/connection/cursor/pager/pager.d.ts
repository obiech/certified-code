import { CursorQueryArgsType } from '../../../query';
import { Count, Pager, QueryMany } from '../../interfaces';
import { CursorPagerResult } from './interfaces';
import { PagerStrategy } from './strategies';
export declare class CursorPager<DTO> implements Pager<DTO, CursorPagerResult<DTO>> {
    readonly strategy: PagerStrategy<DTO>;
    constructor(strategy: PagerStrategy<DTO>);
    page<Q extends CursorQueryArgsType<DTO>>(queryMany: QueryMany<DTO, Q>, query: Q, count: Count<DTO>): Promise<CursorPagerResult<DTO>>;
    private isValidPaging;
    private runQuery;
    private getPageMeta;
    private createPagingResult;
    private hasPreviousPage;
    private isEmptyPage;
}
