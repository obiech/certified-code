"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilterableFields = exports.FilterableField = void 0;
const graphql_1 = require("@nestjs/graphql");
const nestjs_query_core_1 = require("@ptc-org/nestjs-query-core");
const constants_1 = require("./constants");
const reflector = new nestjs_query_core_1.ArrayReflector(constants_1.FILTERABLE_FIELD_KEY);
function FilterableField(returnTypeFuncOrOptions, maybeOptions) {
    let returnTypeFunc;
    let advancedOptions;
    if (typeof returnTypeFuncOrOptions === 'function') {
        returnTypeFunc = returnTypeFuncOrOptions;
        advancedOptions = maybeOptions;
    }
    else if (typeof returnTypeFuncOrOptions === 'object') {
        advancedOptions = returnTypeFuncOrOptions;
    }
    else if (typeof maybeOptions === 'object') {
        advancedOptions = maybeOptions;
    }
    return (
    // eslint-disable-next-line @typescript-eslint/ban-types
    target, propertyName, descriptor) => {
        const Ctx = Reflect.getMetadata('design:type', target, propertyName);
        reflector.append(target.constructor, {
            propertyName: propertyName.toString(),
            schemaName: advancedOptions?.name || propertyName.toString(),
            target: Ctx,
            returnTypeFunc,
            advancedOptions
        });
        if (advancedOptions?.filterOnly) {
            return undefined;
        }
        if (returnTypeFunc) {
            return (0, graphql_1.Field)(returnTypeFunc, advancedOptions)(target, propertyName, descriptor);
        }
        if (advancedOptions) {
            return (0, graphql_1.Field)(advancedOptions)(target, propertyName, descriptor);
        }
        return (0, graphql_1.Field)()(target, propertyName, descriptor);
    };
}
exports.FilterableField = FilterableField;
function getFilterableFields(DTOClass) {
    return (0, nestjs_query_core_1.getPrototypeChain)(DTOClass).reduce((fields, Cls) => {
        const existingFieldNames = fields.map((t) => t.propertyName);
        const typeFields = reflector.get(Cls) ?? [];
        const newFields = typeFields.filter((t) => !existingFieldNames.includes(t.propertyName));
        return [...newFields, ...fields];
    }, []);
}
exports.getFilterableFields = getFilterableFields;
//# sourceMappingURL=filterable-field.decorator.js.map