"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterableCursorConnection = exports.CursorConnection = exports.FilterableOffsetConnection = exports.OffsetConnection = exports.FilterableUnPagedRelation = exports.UnPagedRelation = exports.FilterableRelation = exports.Relation = exports.getRelations = exports.getRelationsDescriptors = exports.reflector = void 0;
const nestjs_query_core_1 = require("@ptc-org/nestjs-query-core");
const common_1 = require("../common");
const paging_1 = require("../types/query/paging");
const constants_1 = require("./constants");
exports.reflector = new nestjs_query_core_1.ArrayReflector(constants_1.RELATION_KEY);
function getRelationsDescriptors(DTOClass) {
    return (0, nestjs_query_core_1.getPrototypeChain)(DTOClass).reduce((relations, cls) => {
        const relationNames = relations.map((t) => t.name);
        const metaRelations = exports.reflector.get(cls) ?? [];
        const inheritedRelations = metaRelations.filter((t) => !relationNames.includes(t.name));
        return [...inheritedRelations, ...relations];
    }, []);
}
exports.getRelationsDescriptors = getRelationsDescriptors;
function convertRelationsToOpts(relations, baseOpts) {
    const relationOpts = {};
    relations.forEach((relation) => {
        const DTO = relation.relationTypeFunc();
        const opts = (0, common_1.mergeBaseResolverOpts)({ ...relation.relationOpts, DTO }, baseOpts ?? {});
        if (relation.isMany) {
            relationOpts.many = { ...relationOpts.many, [relation.name]: opts };
        }
        else {
            relationOpts.one = { ...relationOpts.one, [relation.name]: opts };
        }
    });
    return relationOpts;
}
function getRelations(DTOClass, opts) {
    const relationDescriptors = getRelationsDescriptors(DTOClass);
    return convertRelationsToOpts(relationDescriptors, opts);
}
exports.getRelations = getRelations;
const relationDecorator = (isMany, allowFiltering, pagingStrategy) => {
    return (name, relationTypeFunc, options) => (DTOClass) => {
        exports.reflector.append(DTOClass, {
            name,
            isMany,
            relationOpts: { pagingStrategy, allowFiltering, ...options },
            relationTypeFunc
        });
        return DTOClass;
    };
};
exports.Relation = relationDecorator(false, false);
exports.FilterableRelation = relationDecorator(false, true);
exports.UnPagedRelation = relationDecorator(true, false, paging_1.PagingStrategies.NONE);
exports.FilterableUnPagedRelation = relationDecorator(true, true, paging_1.PagingStrategies.NONE);
exports.OffsetConnection = relationDecorator(true, false, paging_1.PagingStrategies.OFFSET);
exports.FilterableOffsetConnection = relationDecorator(true, true, paging_1.PagingStrategies.OFFSET);
exports.CursorConnection = relationDecorator(true, false, paging_1.PagingStrategies.CURSOR);
exports.FilterableCursorConnection = relationDecorator(true, true, paging_1.PagingStrategies.CURSOR);
//# sourceMappingURL=relation.decorator.js.map