"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggregateBuilder = void 0;
const common_1 = require("@nestjs/common");
const nestjs_query_core_1 = require("@ptc-org/nestjs-query-core");
const camel_case_1 = require("camel-case");
const DriverUtils_1 = require("typeorm/driver/DriverUtils");
var AggregateFuncs;
(function (AggregateFuncs) {
    AggregateFuncs["AVG"] = "AVG";
    AggregateFuncs["SUM"] = "SUM";
    AggregateFuncs["COUNT"] = "COUNT";
    AggregateFuncs["MAX"] = "MAX";
    AggregateFuncs["MIN"] = "MIN";
})(AggregateFuncs || (AggregateFuncs = {}));
const AGG_REGEXP = /(AVG|SUM|COUNT|MAX|MIN|GROUP_BY)_(.*)/;
/**
 * @internal
 * Builds a WHERE clause from a Filter.
 */
class AggregateBuilder {
    constructor(repo) {
        this.repo = repo;
        this.isPostgres = DriverUtils_1.DriverUtils.isPostgresFamily(repo.manager.connection.driver);
    }
    // eslint-disable-next-line @typescript-eslint/no-shadow
    static async asyncConvertToAggregateResponse(responsePromise) {
        const aggResponse = await responsePromise;
        return this.convertToAggregateResponse(aggResponse);
    }
    // eslint-disable-next-line @typescript-eslint/no-shadow
    static getAggregateSelects(query) {
        return [...this.getAggregateGroupBySelects(query), ...this.getAggregateFuncSelects(query)];
    }
    // eslint-disable-next-line @typescript-eslint/no-shadow
    static getAggregateGroupBySelects(query) {
        return (query.groupBy ?? []).map(({ field }) => this.getGroupByAlias(field));
    }
    // eslint-disable-next-line @typescript-eslint/no-shadow
    static getAggregateFuncSelects(query) {
        const aggs = [
            [AggregateFuncs.COUNT, query.count],
            [AggregateFuncs.SUM, query.sum],
            [AggregateFuncs.AVG, query.avg],
            [AggregateFuncs.MAX, query.max],
            [AggregateFuncs.MIN, query.min]
        ];
        return aggs.reduce((cols, [func, fields]) => {
            const aliases = (fields ?? []).map(({ field }) => this.getAggregateAlias(func, field));
            return [...cols, ...aliases];
        }, []);
    }
    // eslint-disable-next-line @typescript-eslint/no-shadow
    static getAggregateAlias(func, field) {
        return `${func}_${field}`;
    }
    // eslint-disable-next-line @typescript-eslint/no-shadow
    static getGroupByAlias(field) {
        return `GROUP_BY_${field}`;
    }
    // eslint-disable-next-line @typescript-eslint/no-shadow
    static convertToAggregateResponse(rawAggregates) {
        return rawAggregates.map((response) => {
            return Object.keys(response).reduce((agg, resultField) => {
                const matchResult = AGG_REGEXP.exec(resultField);
                if (!matchResult) {
                    throw new Error('Unknown aggregate column encountered.');
                }
                const [matchedFunc, matchedFieldName] = matchResult.slice(1);
                const aggFunc = (0, camel_case_1.camelCase)(matchedFunc.toLowerCase());
                const fieldName = matchedFieldName;
                const aggResult = agg[aggFunc] || {};
                return {
                    ...agg,
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    [aggFunc]: { ...aggResult, [fieldName]: response[resultField] }
                };
            }, {});
        });
    }
    /**
     * Builds a aggregate SELECT clause from a aggregate.
     * @param qb - the `typeorm` SelectQueryBuilder
     * @param aggregate - the aggregates to select.
     * @param alias - optional alias to use to qualify an identifier
     */
    build(qb, aggregate, alias) {
        const selects = [
            ...this.createGroupBySelect(aggregate.groupBy, alias),
            ...this.createAggSelect(AggregateFuncs.COUNT, aggregate.count, alias),
            ...this.createAggSelect(AggregateFuncs.SUM, aggregate.sum, alias),
            ...this.createAggSelect(AggregateFuncs.AVG, aggregate.avg, alias),
            ...this.createAggSelect(AggregateFuncs.MAX, aggregate.max, alias),
            ...this.createAggSelect(AggregateFuncs.MIN, aggregate.min, alias)
        ];
        if (!selects.length) {
            throw new common_1.BadRequestException('No aggregate fields found.');
        }
        const [head, ...tail] = selects;
        return tail.reduce((acc, [select, selectAlias]) => acc.addSelect(select, selectAlias), qb.select(head[0], head[1]));
    }
    createAggSelect(func, fields, alias) {
        if (!fields) {
            return [];
        }
        return fields.map(({ field }) => {
            const col = alias ? `${alias}.${field}` : field;
            return [`${func}(${col})`, AggregateBuilder.getAggregateAlias(func, field)];
        });
    }
    createGroupBySelect(aggregatedFields, alias) {
        if (!aggregatedFields) {
            return [];
        }
        return aggregatedFields.map((aggregatedField) => {
            const col = alias ? `${alias}.${aggregatedField.field}` : aggregatedField.field;
            const groupByAlias = AggregateBuilder.getGroupByAlias(aggregatedField.field);
            if (this.isAggregateQueryGroupByField(aggregatedField)) {
                let query = `DATE(${col})`;
                if (this.isPostgres) {
                    if (aggregatedField.args.by === nestjs_query_core_1.GroupBy.YEAR) {
                        query = `DATE(TO_CHAR(${col}, 'YYYY-01-01'))`;
                    }
                    else if (aggregatedField.args.by === nestjs_query_core_1.GroupBy.MONTH) {
                        query = `DATE(TO_CHAR(${col}, 'YYYY-mm-01'))`;
                    }
                    else if (aggregatedField.args.by === nestjs_query_core_1.GroupBy.WEEK) {
                        query = `TO_DATE(TO_CHAR(${col}, 'YYYY-WW-01'), 'YYYY-WW-01')`;
                    }
                }
                else {
                    if (aggregatedField.args.by === nestjs_query_core_1.GroupBy.YEAR) {
                        query = `DATE(DATE_FORMAT(${col}, '%Y-01-01'))`;
                    }
                    else if (aggregatedField.args.by === nestjs_query_core_1.GroupBy.MONTH) {
                        query = `DATE(DATE_FORMAT(${col}, '%Y-%m-01'))`;
                    }
                    else if (aggregatedField.args.by === nestjs_query_core_1.GroupBy.WEEK) {
                        query = `STR_TO_DATE(DATE_FORMAT(${col}, '%X-%V-01'), '%X-%V-%w')`;
                    }
                }
                return [query, groupByAlias];
            }
            return [`${col}`, groupByAlias];
        });
    }
    isAggregateQueryGroupByField(field) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return Boolean(field && field.args && field.args?.by);
    }
}
exports.AggregateBuilder = AggregateBuilder;
//# sourceMappingURL=aggregate.builder.js.map