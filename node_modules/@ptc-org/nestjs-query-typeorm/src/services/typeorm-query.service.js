"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmQueryService = void 0;
const common_1 = require("@nestjs/common");
const query_1 = require("../query");
const relation_query_service_1 = require("./relation-query.service");
/**
 * Base class for all query services that use a `typeorm` Repository.
 *
 * @example
 *
 * ```ts
 * @QueryService(TodoItemEntity)
 * export class TodoItemService extends TypeOrmQueryService<TodoItemEntity> {
 *   constructor(
 *      @InjectRepository(TodoItemEntity) repo: Repository<TodoItemEntity>,
 *   ) {
 *     super(repo);
 *   }
 * }
 * ```
 */
class TypeOrmQueryService extends relation_query_service_1.RelationQueryService {
    constructor(repo, opts) {
        super();
        this.repo = repo;
        this.filterQueryBuilder = opts?.filterQueryBuilder ?? new query_1.FilterQueryBuilder(this.repo);
        this.useSoftDelete = opts?.useSoftDelete ?? false;
    }
    // eslint-disable-next-line @typescript-eslint/naming-convention
    get EntityClass() {
        return this.repo.target;
    }
    /**
     * Query for multiple entities, using a Query from `@ptc-org/nestjs-query-core`.
     *
     * @example
     * ```ts
     * const todoItems = await this.service.query({
     *   filter: { title: { eq: 'Foo' } },
     *   paging: { limit: 10 },
     *   sorting: [{ field: "create", direction: SortDirection.DESC }],
     * });
     * ```
     * @param query - The Query used to filter, page, and sort rows.
     */
    async query(query, opts) {
        const qb = this.filterQueryBuilder.select(query);
        if (opts?.withDeleted) {
            qb.withDeleted();
        }
        return qb.getMany();
    }
    async aggregate(filter, aggregate, opts) {
        const qb = this.filterQueryBuilder.aggregate({ filter }, aggregate);
        if (opts?.withDeleted) {
            qb.withDeleted();
        }
        const resultPromise = qb.getRawMany();
        return query_1.AggregateBuilder.asyncConvertToAggregateResponse(resultPromise);
    }
    async count(filter, opts) {
        const qb = this.filterQueryBuilder.select({ filter });
        if (opts?.withDeleted) {
            qb.withDeleted();
        }
        return qb.getCount();
    }
    /**
     * Find an entity by it's `id`.
     *
     * @example
     * ```ts
     * const todoItem = await this.service.findById(1);
     * ```
     * @param id - The id of the record to find.
     * @param opts
     */
    async findById(id, opts) {
        const qb = this.filterQueryBuilder.selectById(id, opts ?? {});
        if (opts?.withDeleted) {
            qb.withDeleted();
        }
        const result = await qb.getOne();
        return result === null ? undefined : result;
    }
    /**
     * Gets an entity by it's `id`. If the entity is not found a rejected promise is returned.
     *
     * @example
     * ```ts
     * try {
     *   const todoItem = await this.service.getById(1);
     * } catch(e) {
     *   console.error('Unable to find entity with id = 1');
     * }
     * ```
     * @param id - The id of the record to find.
     * @param opts
     */
    async getById(id, opts) {
        const entity = await this.findById(id, opts);
        if (!entity) {
            throw new common_1.NotFoundException(`Unable to find ${this.EntityClass.name} with id: ${id}`);
        }
        return entity;
    }
    /**
     * Creates a single entity.
     *
     * @example
     * ```ts
     * const todoItem = await this.service.createOne({title: 'Todo Item', completed: false });
     * ```
     * @param record - The entity to create.
     */
    async createOne(record) {
        const entity = await this.ensureIsEntityAndDoesNotExist(record);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return this.repo.save(entity);
    }
    /**
     * Create multiple entities.
     *
     * @example
     * ```ts
     * const todoItem = await this.service.createMany([
     *   {title: 'Todo Item 1', completed: false },
     *   {title: 'Todo Item 2', completed: true },
     * ]);
     * ```
     * @param records - The entities to create.
     */
    async createMany(records) {
        const entities = await Promise.all(records.map((r) => this.ensureIsEntityAndDoesNotExist(r)));
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return this.repo.save(entities);
    }
    /**
     * Update an entity.
     *
     * @example
     * ```ts
     * const updatedEntity = await this.service.updateOne(1, { completed: true });
     * ```
     * @param id - The `id` of the record.
     * @param update - A `Partial` of the entity with fields to update.
     * @param opts - Additional options.
     */
    async updateOne(id, update, opts) {
        this.ensureIdIsNotPresent(update);
        const entity = await this.getById(id, opts);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return this.repo.save(this.repo.merge(entity, update));
    }
    /**
     * Update multiple entities with a `@ptc-org/nestjs-query-core` Filter.
     *
     * @example
     * ```ts
     * const { updatedCount } = await this.service.updateMany(
     *   { completed: true }, // the update to apply
     *   { title: { eq: 'Foo Title' } } // Filter to find records to update
     * );
     * ```
     * @param update - A `Partial` of entity with the fields to update
     * @param filter - A Filter used to find the records to update
     */
    async updateMany(update, filter) {
        this.ensureIdIsNotPresent(update);
        let updateResult;
        // If the update has relations then fetch all the id's and then do an update on the ids returned
        if (this.filterQueryBuilder.filterHasRelations(filter)) {
            const builder = this.filterQueryBuilder.select({ filter }).distinct(true);
            const distinctRecords = await builder.addSelect(`${builder.alias}.id`).getRawMany();
            const ids = distinctRecords.map(({ id }) => id);
            const idsFilter = { id: { in: ids } };
            updateResult = await this.filterQueryBuilder
                .update({ filter: idsFilter })
                .set({ ...update })
                .execute();
        }
        else {
            updateResult = await this.filterQueryBuilder
                .update({ filter })
                .set({ ...update })
                .execute();
        }
        return { updatedCount: updateResult.affected || 0 };
    }
    /**
     * Delete an entity by `id`.
     *
     * @example
     *
     * ```ts
     * const deletedTodo = await this.service.deleteOne(1);
     * ```
     *
     * @param id - The `id` of the entity to delete.
     * @param filter Additional filter to use when finding the entity to delete.
     * @param opts - Additional options.
     */
    async deleteOne(id, opts) {
        const entity = await this.getById(id, opts);
        if (this.useSoftDelete || opts?.useSoftDelete) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            return this.repo.softRemove(entity);
        }
        return this.repo.remove(entity);
    }
    /**
     * Delete multiple records with a `@ptc-org/nestjs-query-core` `Filter`.
     *
     * @example
     *
     * ```ts
     * const { deletedCount } = this.service.deleteMany({
     *   created: { lte: new Date('2020-1-1') }
     * });
     * ```
     *
     * @param filter - A `Filter` to find records to delete.
     * @param opts - Additional delete many options
     */
    async deleteMany(filter, opts) {
        let deleteResult = {};
        if (this.filterQueryBuilder.filterHasRelations(filter)) {
            const builder = this.filterQueryBuilder.select({ filter }).distinct(true);
            const distinctRecords = await builder.addSelect(`${builder.alias}.id`).getRawMany();
            const ids = distinctRecords.map(({ id }) => id);
            const idsFilter = { id: { in: ids } };
            if (ids.length > 0) {
                if (this.useSoftDelete || opts?.useSoftDelete) {
                    deleteResult = await this.filterQueryBuilder.softDelete({ filter: idsFilter }).execute();
                }
                else {
                    deleteResult = await this.filterQueryBuilder.delete({ filter: idsFilter }).execute();
                }
            }
        }
        else {
            if (this.useSoftDelete || opts?.useSoftDelete) {
                deleteResult = await this.filterQueryBuilder.softDelete({ filter }).execute();
            }
            else {
                deleteResult = await this.filterQueryBuilder.delete({ filter }).execute();
            }
        }
        return { deletedCount: deleteResult?.affected || 0 };
    }
    /**
     * Restore an entity by `id`.
     *
     * @example
     *
     * ```ts
     * const restoredTodo = await this.service.restoreOne(1);
     * ```
     *
     * @param id - The `id` of the entity to restore.
     * @param opts Additional filter to use when finding the entity to restore.
     */
    async restoreOne(id, opts) {
        this.ensureSoftDeleteEnabled();
        await this.repo.restore(id);
        return this.getById(id, opts);
    }
    /**
     * Restores multiple records with a `@ptc-org/nestjs-query-core` `Filter`.
     *
     * @example
     *
     * ```ts
     * const { updatedCount } = this.service.restoreMany({
     *   created: { lte: new Date('2020-1-1') }
     * });
     * ```
     *
     * @param filter - A `Filter` to find records to delete.
     */
    async restoreMany(filter) {
        this.ensureSoftDeleteEnabled();
        const result = await this.filterQueryBuilder.softDelete({ filter }).restore().execute();
        return { updatedCount: result.affected || 0 };
    }
    async ensureIsEntityAndDoesNotExist(entity) {
        if (!(entity instanceof this.EntityClass)) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            return this.ensureEntityDoesNotExist(this.repo.create(entity));
        }
        return this.ensureEntityDoesNotExist(entity);
    }
    async ensureEntityDoesNotExist(e) {
        if (this.repo.hasId(e)) {
            const where = this.repo.metadata.getEntityIdMap(e);
            const found = await this.repo.findOne({ where });
            if (found) {
                throw new Error('Entity already exists');
            }
        }
        return e;
    }
    ensureIdIsNotPresent(e) {
        if (this.repo.hasId(e)) {
            throw new Error('Id cannot be specified when updating');
        }
    }
    ensureSoftDeleteEnabled() {
        if (!this.useSoftDelete) {
            throw new common_1.MethodNotAllowedException(`Restore not allowed for non soft deleted entity ${this.EntityClass.name}.`);
        }
    }
}
exports.TypeOrmQueryService = TypeOrmQueryService;
//# sourceMappingURL=typeorm-query.service.js.map