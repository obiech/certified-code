"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLookAheadInfo = exports.removePagingFromSimplifiedInfo = exports.simplifyResolveInfo = void 0;
const graphql_1 = require("graphql");
/**
 * Parts based of https://github.com/graphile/graphile-engine/blob/master/packages/graphql-parse-resolve-info/src/index.ts
 */
function getFieldFromAST(fieldNode, parentType) {
    if (fieldNode.kind === graphql_1.Kind.FIELD) {
        if (!(parentType instanceof graphql_1.GraphQLUnionType)) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return parentType.getFields()[fieldNode.name.value];
        }
        else {
            // XXX: TODO: Handle GraphQLUnionType
        }
    }
    return undefined;
}
function getDirectiveValue(directive, info) {
    const arg = directive.arguments[0]; // only arg on an include or skip directive is "if"
    if (arg.value.kind !== graphql_1.Kind.VARIABLE) {
        // eslint-disable-next-line
        return !!arg.value['value'];
    }
    return info.variableValues[arg.value.name.value];
}
function getDirectiveResults(fieldNode, info) {
    const directiveResult = {
        shouldInclude: true,
        shouldSkip: false
    };
    return fieldNode.directives.reduce((result, directive) => {
        switch (directive.name.value) {
            case 'include':
                return { ...result, shouldInclude: getDirectiveValue(directive, info) };
            case 'skip':
                return { ...result, shouldSkip: getDirectiveValue(directive, info) };
            default:
                return result;
        }
    }, directiveResult);
}
function parseFieldNodes(inASTs, resolveInfo, initTree, parentType) {
    const asts = Array.isArray(inASTs) ? inASTs : [inASTs];
    return asts.reduce((tree, fieldNode) => {
        let name;
        let alias;
        if (fieldNode.kind === graphql_1.Kind.INLINE_FRAGMENT) {
            name = fieldNode?.typeCondition?.name.value;
        }
        else {
            name = fieldNode.name.value;
        }
        if (fieldNode.kind === graphql_1.Kind.FIELD) {
            alias = fieldNode?.alias?.value ?? name;
        }
        const field = getFieldFromAST(fieldNode, parentType);
        if (field == null) {
            return tree;
        }
        const fieldGqlTypeOrUndefined = (0, graphql_1.getNamedType)(field.type);
        if (!fieldGqlTypeOrUndefined) {
            return tree;
        }
        if (fieldNode.directives && fieldNode.directives.length) {
            const { shouldInclude, shouldSkip } = getDirectiveResults(fieldNode, resolveInfo);
            // field/fragment is not included if either the @skip condition is true or the @include condition is false
            // https://facebook.github.io/graphql/draft/#sec--include
            if (shouldSkip || !shouldInclude) {
                return tree;
            }
        }
        const parsedField = {
            name,
            alias,
            args: fieldNode.kind === graphql_1.Kind.FIELD ? (0, graphql_1.getArgumentValues)(field, fieldNode, resolveInfo.variableValues) : {},
            fields: fieldNode.kind !== graphql_1.Kind.FRAGMENT_SPREAD && fieldNode.selectionSet && (0, graphql_1.isCompositeType)(fieldGqlTypeOrUndefined)
                ? parseFieldNodes(fieldNode.selectionSet.selections, resolveInfo, {}, fieldGqlTypeOrUndefined)
                : {}
        };
        if (tree === null) {
            return parsedField;
        }
        else {
            tree[alias] = parsedField;
        }
        return tree;
    }, initTree);
}
function isOffsetPaging(info) {
    return typeof info.fields.nodes !== 'undefined';
}
function isCursorPaging(info) {
    return typeof info.fields.edges !== 'undefined';
}
function simplifyResolveInfo(resolveInfo) {
    return parseFieldNodes(resolveInfo.fieldNodes, resolveInfo, null, resolveInfo.parentType);
}
exports.simplifyResolveInfo = simplifyResolveInfo;
function removePagingFromSimplifiedInfo(simpleInfo) {
    if (isOffsetPaging(simpleInfo)) {
        return simpleInfo.fields.nodes;
    }
    else if (isCursorPaging(simpleInfo)) {
        return simpleInfo.fields.edges.fields.node;
    }
    return simpleInfo;
}
exports.removePagingFromSimplifiedInfo = removePagingFromSimplifiedInfo;
function createLookAheadInfo(relations, simpleResolveInfo) {
    const simplifiedInfoWithoutPaging = removePagingFromSimplifiedInfo(simpleResolveInfo);
    return relations
        .map((relation) => {
        if (relation.name in simplifiedInfoWithoutPaging.fields) {
            return {
                name: relation.name,
                query: simplifiedInfoWithoutPaging.fields[relation.name].args || {}
            };
        }
        return false;
    })
        .filter(Boolean);
}
exports.createLookAheadInfo = createLookAheadInfo;
//# sourceMappingURL=graphql-resolve-info.utils.js.map