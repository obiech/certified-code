import { WithDeleted } from './with-deleted.interface';
import { WithResolveInfo } from './with-resolve-info.interface';
export interface QueryOptions<DTO> extends WithDeleted, WithResolveInfo<DTO> {
}
