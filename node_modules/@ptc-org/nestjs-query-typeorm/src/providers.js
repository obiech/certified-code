"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTypeOrmQueryServiceProviders = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_query_core_1 = require("@ptc-org/nestjs-query-core");
const services_1 = require("./services");
function createTypeOrmQueryServiceProvider(EntityClass, connection) {
    return {
        provide: (0, nestjs_query_core_1.getQueryServiceToken)(EntityClass),
        useFactory(repo) {
            return new services_1.TypeOrmQueryService(repo);
        },
        inject: [(0, typeorm_1.getRepositoryToken)(EntityClass, connection)]
    };
}
const createTypeOrmQueryServiceProviders = (entities, connection) => entities.map((entity) => createTypeOrmQueryServiceProvider(entity, connection));
exports.createTypeOrmQueryServiceProviders = createTypeOrmQueryServiceProviders;
//# sourceMappingURL=providers.js.map