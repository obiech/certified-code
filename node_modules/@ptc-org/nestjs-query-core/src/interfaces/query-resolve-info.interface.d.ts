import { Query } from './query.inteface';
export type QueryResolveFields<DTO> = {
    [key in keyof DTO]: QueryResolveTree<DTO[key] extends ArrayLike<unknown> ? DTO[key][number] : DTO[key]>;
};
export interface QueryResolveTree<DTO> {
    name: string;
    alias: string;
    args?: Query<DTO>;
    fields: QueryResolveFields<DTO>;
}
