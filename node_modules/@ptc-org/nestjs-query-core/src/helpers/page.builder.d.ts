import { Paging } from '../interfaces';
type Pager<DTO> = (dtos: DTO[]) => DTO[];
export declare class PageBuilder {
    static build<DTO>(paging: Paging): Pager<DTO>;
}
export {};
