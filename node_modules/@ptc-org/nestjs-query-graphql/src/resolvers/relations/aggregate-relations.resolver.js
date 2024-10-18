"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggregateRelationsResolver = exports.AggregateRelationsMixin = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const nestjs_query_core_1 = require("@ptc-org/nestjs-query-core");
const auth_1 = require("../../auth");
const common_1 = require("../../common");
const decorators_1 = require("../../decorators");
const inject_dataloader_config_decorator_1 = require("../../decorators/inject-dataloader-config.decorator");
const interceptors_1 = require("../../interceptors");
const loader_1 = require("../../loader");
const types_1 = require("../../types");
const helpers_1 = require("../helpers");
const resolver_interface_1 = require("../resolver.interface");
const helpers_2 = require("./helpers");
const AggregateRelationMixin = (DTOClass, relation) => (Base) => {
    var _a;
    if (!relation.enableAggregate && !relation.aggregate?.enabled) {
        return Base;
    }
    const commonResolverOpts = relation.aggregate || (0, helpers_2.removeRelationOpts)(relation);
    const relationDTO = relation.DTO;
    const dtoName = (0, common_1.getDTONames)(DTOClass).baseName;
    const { baseNameLower, pluralBaseNameLower, pluralBaseName } = (0, common_1.getDTONames)(relationDTO, {
        dtoName: relation.dtoName
    });
    const relationName = relation.relationName ?? pluralBaseNameLower;
    const aggregateRelationLoaderName = `aggregate${pluralBaseName}For${dtoName}`;
    const aggregateLoader = new loader_1.AggregateRelationsLoader(relationDTO, relationName);
    let RelationQA = class RelationQA extends (0, types_1.AggregateArgsType)(relationDTO) {
    };
    RelationQA = tslib_1.__decorate([
        (0, graphql_1.ArgsType)()
    ], RelationQA);
    const [AR] = (0, types_1.AggregateResponseType)(relationDTO, { prefix: `${dtoName}${pluralBaseName}` });
    let AggregateMixin = class AggregateMixin extends Base {
        async [_a = `aggregate${pluralBaseName}`](dto, q, aggregateQuery, context, relationFilter, dataLoaderConfig) {
            const qa = await (0, helpers_1.transformAndValidate)(RelationQA, q);
            const loader = loader_1.DataLoaderFactory.getOrCreateLoader(context, aggregateRelationLoaderName, () => aggregateLoader.createLoader(this.service), dataLoaderConfig);
            return loader.load({
                dto,
                filter: (0, nestjs_query_core_1.mergeFilter)(qa.filter ?? {}, relationFilter ?? {}),
                aggregate: aggregateQuery
            });
        }
    };
    tslib_1.__decorate([
        (0, decorators_1.ResolverField)(`${pluralBaseNameLower}Aggregate`, () => [AR], {
            description: relation.aggregate?.description
        }, commonResolverOpts, {
            interceptors: [(0, interceptors_1.AuthorizerInterceptor)(DTOClass)]
        }),
        tslib_1.__param(0, (0, graphql_1.Parent)()),
        tslib_1.__param(1, (0, graphql_1.Args)()),
        tslib_1.__param(2, (0, decorators_1.AggregateQueryParam)()),
        tslib_1.__param(3, (0, graphql_1.Context)()),
        tslib_1.__param(4, (0, decorators_1.RelationAuthorizerFilter)(baseNameLower, {
            operationGroup: auth_1.OperationGroup.AGGREGATE,
            many: true
        })),
        tslib_1.__param(5, (0, inject_dataloader_config_decorator_1.InjectDataLoaderConfig)()),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, RelationQA, Object, Object, Object, Object]),
        tslib_1.__metadata("design:returntype", Promise)
    ], AggregateMixin.prototype, _a, null);
    AggregateMixin = tslib_1.__decorate([
        (0, graphql_1.Resolver)(() => DTOClass, { isAbstract: true })
    ], AggregateMixin);
    // TODO:: Add also support for the "by" in dates
    return AggregateMixin;
};
const AggregateRelationsMixin = (DTOClass, relations) => (Base) => {
    const { many, enableAggregate } = relations;
    const manyRelations = (0, helpers_2.flattenRelations)(many ?? {});
    return manyRelations.reduce((RB, a) => AggregateRelationMixin(DTOClass, { enableAggregate, ...a })(RB), Base);
};
exports.AggregateRelationsMixin = AggregateRelationsMixin;
const AggregateRelationsResolver = (DTOClass, relations) => (0, exports.AggregateRelationsMixin)(DTOClass, relations)(resolver_interface_1.BaseServiceResolver);
exports.AggregateRelationsResolver = AggregateRelationsResolver;
//# sourceMappingURL=aggregate-relations.resolver.js.map