"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggregateFilterType = exports.SubscriptionFilterType = exports.UpdateFilterType = exports.DeleteFilterType = exports.FilterType = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const nestjs_query_core_1 = require("@ptc-org/nestjs-query-core");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const upper_case_first_1 = require("upper-case-first");
const common_1 = require("../../common");
const decorators_1 = require("../../decorators");
const has_required_filter_1 = require("../../decorators/has-required.filter");
const field_comparison_1 = require("./field-comparison");
const helpers_1 = require("./helpers");
const reflector = new nestjs_query_core_1.MapReflector('nestjs-query:filter-type');
// internal cache is used to exit early if the same filter is requested multiple times
// e.g. if there is a circular reference in the relations
//      `User -> Post -> User-> Post -> ...`
const internalCache = new Map();
function getObjectTypeName(DTOClass) {
    return (0, common_1.getGraphqlObjectName)(DTOClass, 'No fields found to create FilterType.');
}
function getFilterableRelations(relations) {
    const filterableRelations = {};
    Object.keys(relations).forEach((r) => {
        const opts = relations[r];
        if (opts && opts.allowFiltering) {
            filterableRelations[r] = opts.DTO;
        }
    });
    return filterableRelations;
}
function getOrCreateFilterType(TClass, prefix, suffix, depth) {
    const $prefix = prefix ?? '';
    const $suffix = suffix ?? '';
    const name = `${$prefix}${getObjectTypeName(TClass)}${$suffix}`;
    const filterType = Number.isFinite(depth) ? '' : 'Deep';
    const typeName = `${name}${filterType}Filter`;
    return reflector.memoize(TClass, typeName, () => {
        const { one = {}, many = {} } = (0, decorators_1.getRelations)(TClass);
        const filterableRelations = { ...getFilterableRelations(one), ...getFilterableRelations(many) };
        const { allowedBooleanExpressions } = (0, decorators_1.getQueryOptions)(TClass) ?? {};
        const fields = (0, decorators_1.getFilterableFields)(TClass);
        if (!fields.length) {
            throw new Error(`No fields found to create GraphQLFilter for ${TClass.name}`);
        }
        const hasRequiredFilters = fields.some((f) => f.advancedOptions?.filterRequired === true);
        const isNotAllowedComparison = (val) => !(0, helpers_1.isInAllowedList)(allowedBooleanExpressions, val);
        let GraphQLFilter = class GraphQLFilter {
        };
        GraphQLFilter.hasRequiredFilters = hasRequiredFilters;
        tslib_1.__decorate([
            (0, class_validator_1.ValidateNested)(),
            (0, decorators_1.SkipIf)(() => isNotAllowedComparison('and'), (0, graphql_1.Field)(() => [GraphQLFilter], { nullable: true })),
            (0, class_transformer_1.Type)(() => GraphQLFilter),
            tslib_1.__metadata("design:type", Array)
        ], GraphQLFilter.prototype, "and", void 0);
        tslib_1.__decorate([
            (0, class_validator_1.ValidateNested)(),
            (0, decorators_1.SkipIf)(() => isNotAllowedComparison('or'), (0, graphql_1.Field)(() => [GraphQLFilter], { nullable: true })),
            (0, class_transformer_1.Type)(() => GraphQLFilter),
            tslib_1.__metadata("design:type", Array)
        ], GraphQLFilter.prototype, "or", void 0);
        GraphQLFilter = tslib_1.__decorate([
            (0, graphql_1.InputType)(typeName)
        ], GraphQLFilter);
        // if the filter is already in the cache, exist early and return it
        // otherwise add it to the cache early so we don't get into an infinite loop
        let TClassCache = internalCache.get(TClass);
        if (TClassCache && TClassCache.has(typeName)) {
            return TClassCache.get(typeName);
        }
        else {
            TClassCache = TClassCache ?? new Map();
            TClassCache.set(typeName, GraphQLFilter);
            internalCache.set(TClass, TClassCache);
        }
        const { baseName } = (0, common_1.getDTONames)(TClass);
        fields.forEach(({ schemaName, target, advancedOptions, returnTypeFunc }) => {
            const objectTypeMetadata = graphql_1.TypeMetadataStorage.getObjectTypeMetadataByTarget(target);
            const FC = objectTypeMetadata
                ? getOrCreateFilterType(target, typeName, suffix, depth)
                : (0, field_comparison_1.createFilterComparisonType)({
                    FieldType: target,
                    fieldName: `${baseName}${(0, upper_case_first_1.upperCaseFirst)(schemaName)}`,
                    allowedComparisons: advancedOptions?.allowedComparisons,
                    returnTypeFunc,
                    decorators: advancedOptions?.filterDecorators,
                    overrideTypeNamePrefix: advancedOptions?.overrideFilterTypeNamePrefix
                });
            const nullable = advancedOptions?.filterRequired !== true;
            (0, class_validator_1.ValidateNested)()(GraphQLFilter.prototype, schemaName);
            if (advancedOptions?.filterRequired) {
                (0, has_required_filter_1.HasRequiredFilter)()(GraphQLFilter.prototype, schemaName);
            }
            (0, graphql_1.Field)(() => FC, { name: schemaName, nullable })(GraphQLFilter.prototype, schemaName);
            (0, class_transformer_1.Type)(() => FC)(GraphQLFilter.prototype, schemaName);
        });
        if (depth > 0) {
            Object.keys(filterableRelations).forEach((field) => {
                const FieldType = filterableRelations[field];
                // if filterDepth is infinite, we don't want to
                // pass the previous name down and just use the base name
                //
                // e.g. `User -> Post -> Category` would result in
                //      `UserFilter -> UserFilterPostFilter -> UserFilterPostFilterCategoryFilter`
                //      this would lead to an infinite loop, so we just use the base name
                //      `UserFilter -> PostFilter -> CategoryFilter`
                const newPrefix = Number.isFinite(depth) ? typeName : '';
                if (FieldType) {
                    const FC = getOrCreateFilterType(FieldType, newPrefix, suffix, depth - 1);
                    (0, class_validator_1.ValidateNested)()(GraphQLFilter.prototype, field);
                    (0, graphql_1.Field)(() => FC, { nullable: true })(GraphQLFilter.prototype, field);
                    (0, class_transformer_1.Type)(() => FC)(GraphQLFilter.prototype, field);
                }
            });
        }
        return GraphQLFilter;
    });
}
function FilterType(TClass) {
    const { filterDepth = 1 } = (0, decorators_1.getQueryOptions)(TClass) ?? {};
    return getOrCreateFilterType(TClass, null, null, filterDepth);
}
exports.FilterType = FilterType;
function DeleteFilterType(TClass) {
    return getOrCreateFilterType(TClass, null, 'Delete', 0);
}
exports.DeleteFilterType = DeleteFilterType;
function UpdateFilterType(TClass) {
    return getOrCreateFilterType(TClass, null, 'Update', 0);
}
exports.UpdateFilterType = UpdateFilterType;
function SubscriptionFilterType(TClass) {
    return getOrCreateFilterType(TClass, null, 'Subscription', 0);
}
exports.SubscriptionFilterType = SubscriptionFilterType;
function AggregateFilterType(TClass) {
    const { filterDepth = 1 } = (0, decorators_1.getQueryOptions)(TClass) ?? {};
    return getOrCreateFilterType(TClass, null, 'Aggregate', filterDepth);
}
exports.AggregateFilterType = AggregateFilterType;
//# sourceMappingURL=filter.type.js.map