"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrCreateCursorConnectionType = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const nestjs_query_core_1 = require("@ptc-org/nestjs-query-core");
const common_2 = require("../../../common");
const decorators_1 = require("../../../decorators");
const query_1 = require("../../query");
const edge_type_1 = require("./edge.type");
const page_info_type_1 = require("./page-info.type");
const pager_1 = require("./pager");
const DEFAULT_COUNT = () => Promise.reject(new common_1.NotImplementedException('totalCount not implemented'));
const reflector = new nestjs_query_core_1.MapReflector('nestjs-query:cursor-connection-type');
function getOrCreateConnectionName(DTOClass, opts) {
    const { connectionName } = opts;
    if (connectionName) {
        return connectionName;
    }
    const objName = (0, common_2.getGraphqlObjectName)(DTOClass, 'Unable to make ConnectionType.');
    return `${objName}Connection`;
}
function getOrCreateCursorConnectionType(TItemClass, maybeOpts) {
    const opts = maybeOpts ?? { pagingStrategy: query_1.PagingStrategies.CURSOR };
    const connectionName = getOrCreateConnectionName(TItemClass, opts);
    return reflector.memoize(TItemClass, connectionName, () => {
        var AbstractConnection_1;
        const pager = (0, pager_1.createPager)(TItemClass, opts);
        const E = (0, edge_type_1.getOrCreateEdgeType)(TItemClass);
        const PIT = (0, page_info_type_1.getOrCreatePageInfoType)();
        let AbstractConnection = AbstractConnection_1 = class AbstractConnection {
            static get resolveType() {
                return this;
            }
            static async createFromPromise(queryMany, query, count) {
                const { pageInfo, edges, totalCount } = await pager.page(queryMany, query, count ?? DEFAULT_COUNT);
                return new AbstractConnection_1(
                // create the appropriate graphql instance
                new PIT(pageInfo.hasNextPage, pageInfo.hasPreviousPage, pageInfo.startCursor, pageInfo.endCursor), edges.map(({ node, cursor }) => new E(node, cursor)), totalCount);
            }
            constructor(pageInfo, edges, totalCountFn) {
                this.pageInfo = pageInfo ?? { hasNextPage: false, hasPreviousPage: false };
                this.edges = edges ?? [];
                this.totalCountFn = totalCountFn ?? DEFAULT_COUNT;
            }
            get totalCount() {
                return this.totalCountFn();
            }
        };
        tslib_1.__decorate([
            (0, graphql_1.Field)(() => PIT, { description: 'Paging information' }),
            tslib_1.__metadata("design:type", Object)
        ], AbstractConnection.prototype, "pageInfo", void 0);
        tslib_1.__decorate([
            (0, graphql_1.Field)(() => [E], { description: 'Array of edges.' }),
            tslib_1.__metadata("design:type", Array)
        ], AbstractConnection.prototype, "edges", void 0);
        tslib_1.__decorate([
            (0, decorators_1.SkipIf)(() => !opts.enableTotalCount, (0, graphql_1.Field)(() => graphql_1.Int, { description: 'Fetch total count of records' })),
            tslib_1.__metadata("design:type", Promise),
            tslib_1.__metadata("design:paramtypes", [])
        ], AbstractConnection.prototype, "totalCount", null);
        AbstractConnection = AbstractConnection_1 = tslib_1.__decorate([
            (0, graphql_1.ObjectType)(connectionName),
            tslib_1.__metadata("design:paramtypes", [Object, Array, Function])
        ], AbstractConnection);
        return AbstractConnection;
    });
}
exports.getOrCreateCursorConnectionType = getOrCreateCursorConnectionType;
//# sourceMappingURL=cursor-connection.type.js.map