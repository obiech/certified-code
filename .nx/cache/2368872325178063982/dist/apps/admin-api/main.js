/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var AdminAPIModule_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdminAPIModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const axios_1 = __webpack_require__(5);
const graphql_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(7);
const database_1 = __webpack_require__(8);
const path_1 = __webpack_require__(108);
const axios_2 = tslib_1.__importDefault(__webpack_require__(109));
const accounting_module_1 = __webpack_require__(110);
const address_module_1 = __webpack_require__(129);
const admin_api_controller_1 = __webpack_require__(131);
const announcement_module_1 = __webpack_require__(141);
const car_module_1 = __webpack_require__(145);
const coupon_module_1 = __webpack_require__(151);
const driver_module_1 = __webpack_require__(163);
const feedback_module_1 = __webpack_require__(202);
const fleet_module_1 = __webpack_require__(204);
const operator_module_1 = __webpack_require__(213);
const order_module_1 = __webpack_require__(219);
const payment_gateway_module_1 = __webpack_require__(248);
const region_module_1 = __webpack_require__(250);
const rider_module_1 = __webpack_require__(252);
const service_module_1 = __webpack_require__(256);
const auth_module_1 = __webpack_require__(266);
const upload_module_1 = __webpack_require__(274);
const complaint_module_1 = __webpack_require__(275);
const fs_1 = __webpack_require__(136);
const configuration_module_1 = __webpack_require__(277);
const upload_service_1 = __webpack_require__(135);
const nestjs_redis_1 = __webpack_require__(167);
const jwt_strategy_1 = __webpack_require__(271);
const apollo_1 = __webpack_require__(116);
const sos_module_1 = __webpack_require__(283);
const reward_module_1 = __webpack_require__(289);
const payout_module_1 = __webpack_require__(295);
const gift_card_module_1 = __webpack_require__(306);
const sms_provider_module_1 = __webpack_require__(314);
let AdminAPIModule = AdminAPIModule_1 = class AdminAPIModule {
    static async register() {
        const configAddress = `${process.cwd()}/config/config.${process.env.NODE_ENV ?? 'production'}.json`;
        common_1.Logger.log(`Config address: ${configAddress}`);
        if ((0, fs_1.existsSync)(configAddress)) {
            const file = await fs_1.promises.readFile(configAddress, { encoding: 'utf-8' });
            const config = JSON.parse(file);
            const firebaseKeyFileAddress = `${process.cwd()}/config/${config.firebaseProjectPrivateKey}`;
            if (config.firebaseProjectPrivateKey != null &&
                (0, fs_1.existsSync)(firebaseKeyFileAddress)) {
                const verResult = await axios_2.default.get(`http://31.220.15.49:9000/verify?purchaseCode=${config.purchaseCode}&port=${process.env.ADMIN_API_PORT || 3000}`);
                common_1.Logger.log(verResult.data, 'Verification');
                if (verResult.data.status == 'FAILED') {
                    common_1.Logger.error(verResult.data.message, 'Verification');
                    return {
                        module: AdminAPIModule_1,
                        imports: [
                            axios_1.HttpModule,
                            graphql_1.GraphQLModule.forRoot({
                                driver: apollo_1.ApolloDriver,
                                autoSchemaFile: true,
                                // cors: false,
                                //uploads: false,
                            }),
                            configuration_module_1.ConfigurationModule,
                        ],
                    };
                }
                global.saltKey = verResult.data.token;
                return {
                    module: AdminAPIModule_1,
                    imports: [
                        database_1.DatabaseModule,
                        graphql_1.GraphQLModule.forRoot({
                            driver: apollo_1.ApolloDriver,
                            context: ({ req, res, extra }) => {
                                return extra && extra.user
                                    ? {
                                        req: req,
                                        res: res,
                                        user: extra.user,
                                    }
                                    : { req: req, res: res };
                            },
                            subscriptions: {
                                'graphql-ws': {
                                    //keepAlive: 5000,
                                    onConnect: async (context) => {
                                        const { connectionParams, extra } = context;
                                        if (connectionParams.authToken) {
                                            common_1.Logger.log(`connection established with token ${connectionParams.authToken}`, 'GraphQL');
                                            const userObject = await (0, jwt_strategy_1.validateToken)(connectionParams.authToken);
                                            common_1.Logger.log(`userObject: ${JSON.stringify(userObject)}`, 'GraphQL');
                                            extra['user'] = userObject;
                                            return;
                                        }
                                        throw new Error('Missing auth token!');
                                    },
                                    onDisconnect: () => {
                                        common_1.Logger.log('connection disconnected', 'GraphQL');
                                    },
                                    onSubscribe: () => {
                                        common_1.Logger.log(`subscription started`, 'GraphQL');
                                    },
                                },
                            },
                            autoSchemaFile: (0, path_1.join)(process.cwd(), 'admin.schema.gql'),
                            // cors: false,
                        }),
                        typeorm_1.TypeOrmModule.forFeature(database_1.entities),
                        service_module_1.ServiceModule,
                        operator_module_1.OperatorModule,
                        rider_module_1.RiderModule,
                        driver_module_1.DriverModule,
                        fleet_module_1.FleetModule,
                        order_module_1.OrderModule,
                        announcement_module_1.AnnouncementModule,
                        coupon_module_1.CouponModule,
                        gift_card_module_1.GiftCardModule,
                        accounting_module_1.AccountingModule,
                        region_module_1.RegionModule,
                        payment_gateway_module_1.PaymentGatewayModule,
                        car_module_1.CarModule,
                        feedback_module_1.FeedbackModule,
                        address_module_1.AddressModule,
                        auth_module_1.AuthModule,
                        payout_module_1.PayoutModule,
                        upload_module_1.UploadModule,
                        sos_module_1.SOSModule,
                        reward_module_1.RewardModule,
                        complaint_module_1.ComplaintModule,
                        configuration_module_1.ConfigurationModule,
                        axios_1.HttpModule,
                        sms_provider_module_1.SMSProviderModule,
                        nestjs_redis_1.RedisModule.forRoot({
                            closeClient: true,
                            commonOptions: { db: 2 },
                            config: {
                                host: process.env.REDIS_HOST ?? 'localhost',
                            },
                        }),
                    ],
                    providers: [upload_service_1.UploadService],
                    controllers: [admin_api_controller_1.AppController],
                };
            }
        }
        return {
            module: AdminAPIModule_1,
            imports: [
                axios_1.HttpModule,
                graphql_1.GraphQLModule.forRoot({
                    driver: apollo_1.ApolloDriver,
                    autoSchemaFile: true,
                    // cors: false,
                    //uploads: false,
                }),
                configuration_module_1.ConfigurationModule,
            ],
        };
    }
};
exports.AdminAPIModule = AdminAPIModule;
exports.AdminAPIModule = AdminAPIModule = AdminAPIModule_1 = tslib_1.__decorate([
    (0, common_1.Module)({})
], AdminAPIModule);


/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("@nestjs/axios");

/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = require("@nestjs/graphql");

/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(9), exports);
tslib_1.__exportStar(__webpack_require__(72), exports);
tslib_1.__exportStar(__webpack_require__(100), exports);
tslib_1.__exportStar(__webpack_require__(101), exports);
tslib_1.__exportStar(__webpack_require__(102), exports);
tslib_1.__exportStar(__webpack_require__(106), exports);


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.entities = exports.DatabaseModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(7);
const typeorm_2 = __webpack_require__(10);
const car_color_entity_1 = __webpack_require__(11);
const car_model_entity_1 = __webpack_require__(13);
const complaint_activity_entity_1 = __webpack_require__(20);
const complaint_entity_1 = __webpack_require__(21);
const coupon_entity_1 = __webpack_require__(25);
const driver_transaction_entity_1 = __webpack_require__(14);
const driver_wallet_entity_1 = __webpack_require__(94);
const driver_entity_1 = __webpack_require__(12);
const feedback_parameter_entity_1 = __webpack_require__(79);
const feedback_entity_1 = __webpack_require__(78);
const fleet_transaction_entity_1 = __webpack_require__(67);
const fleet_wallet_entity_1 = __webpack_require__(68);
const fleet_entity_1 = __webpack_require__(64);
const media_entity_1 = __webpack_require__(30);
const operator_role_entity_1 = __webpack_require__(92);
const operator_entity_1 = __webpack_require__(19);
const request_message_entity_1 = __webpack_require__(80);
const request_entity_1 = __webpack_require__(23);
const payment_gateway_entity_1 = __webpack_require__(33);
const provider_transaction_entity_1 = __webpack_require__(40);
const provider_wallet_entity_1 = __webpack_require__(96);
const region_entity_1 = __webpack_require__(57);
const rider_address_entity_1 = __webpack_require__(71);
const rider_entity_1 = __webpack_require__(26);
const rider_transaction_entity_1 = __webpack_require__(34);
const rider_wallet_entity_1 = __webpack_require__(75);
const service_category_entity_1 = __webpack_require__(59);
const service_entity_1 = __webpack_require__(52);
const payment_entity_1 = __webpack_require__(97);
const service_option_entity_1 = __webpack_require__(60);
const gift_code_entity_1 = __webpack_require__(37);
const gift_batch_entity_1 = __webpack_require__(38);
const sos_entity_1 = __webpack_require__(84);
const sos_activity_entity_1 = __webpack_require__(86);
const announcement_entity_1 = __webpack_require__(31);
const zone_price_entity_1 = __webpack_require__(63);
const gateway_to_user_entity_1 = __webpack_require__(43);
const fleet_device_entity_1 = __webpack_require__(65);
const order_cancel_reason_entity_1 = __webpack_require__(88);
const saved_payment_method_entity_1 = __webpack_require__(44);
const rider_review_entity_1 = __webpack_require__(76);
const payout_account_entity_1 = __webpack_require__(47);
const payout_method_entity_1 = __webpack_require__(48);
const payout_session_entity_1 = __webpack_require__(50);
// MYSQL_HOST=us-cluster-east-01.k8s.cleardb.net
// MYSQL_USER=b50f282dae8a4a
// MYSQL_PASS=1c0cfbc2
// MYSQL_DB=heroku_5a5bdd156230275
let DatabaseModule = class DatabaseModule {
    async onModuleInit() {
        common_1.Logger.log('Module init started');
        const conn = await (0, typeorm_2.createConnection)({
            name: 'mg',
            type: 'mysql',
            host: process.env.MYSQL_HOST || 'localhost',
            port: 3306,
            username: process.env.MYSQL_USER || 'root',
            password: process.env.MYSQL_PASS || 'defaultpassword',
            database: process.env.MYSQL_DB || 'ridy',
            migrations: [`${__dirname}/migration/*.js`],
            migrationsRun: true,
            logging: false,
        });
        const migrationsOutput = await conn.runMigrations();
        common_1.Logger.log('Module init finished.');
        common_1.Logger.log(`${migrationsOutput.length} Migrations done!`);
    }
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: async () => {
                    common_1.Logger.log('TypeORM import started');
                    const dbName = 'heroku_5a5bdd156230275' || 0;
                    const baseConn = {
                        type: 'mysql',
                        host: 'us-cluster-east-01.k8s.cleardb.net' || 0,
                        port: 3306,
                        username: 'b50f282dae8a4a' || 0,
                        password: '1c0cfbc2' || 0,
                    };
                    const conn = await (0, typeorm_2.createConnection)({ ...baseConn, name: 'ts' });
                    const databases = await conn.query(`SHOW DATABASES LIKE '${dbName}';`);
                    let shouldSync = databases.length < 1 ||
                        process.env.FORCE_SYNC_DB != null;
                    if (shouldSync) {
                        await conn.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`);
                    }
                    //conn.query(`USE ${dbName}`);
                    const tables = await conn.query(`SHOW TABLES FROM ${dbName};`);
                    shouldSync =
                        tables.length < 5 || process.env.FORCE_SYNC_DB != null;
                    common_1.Logger.log('type orm import finished');
                    return {
                        ...baseConn,
                        database: dbName,
                        autoLoadEntities: true,
                        legacySpatialSupport: false,
                        migrations: [`${__dirname}/migration/*.js`],
                        synchronize: shouldSync,
                        migrationsRun: false,
                        logging: false,
                    };
                },
            }),
        ],
        controllers: [],
        providers: [],
        exports: [],
    })
], DatabaseModule);
exports.entities = [
    media_entity_1.MediaEntity,
    operator_entity_1.OperatorEntity,
    operator_role_entity_1.OperatorRoleEntity,
    driver_entity_1.DriverEntity,
    provider_transaction_entity_1.ProviderTransactionEntity,
    provider_wallet_entity_1.ProviderWalletEntity,
    complaint_activity_entity_1.ComplaintActivityEntity,
    complaint_entity_1.ComplaintEntity,
    car_model_entity_1.CarModelEntity,
    car_color_entity_1.CarColorEntity,
    driver_transaction_entity_1.DriverTransactionEntity,
    driver_wallet_entity_1.DriverWalletEntity,
    feedback_parameter_entity_1.FeedbackParameterEntity,
    feedback_entity_1.FeedbackEntity,
    fleet_entity_1.FleetEntity,
    fleet_wallet_entity_1.FleetWalletEntity,
    fleet_transaction_entity_1.FleetTransactionEntity,
    fleet_device_entity_1.FleetDeviceEntity,
    request_entity_1.RequestEntity,
    request_message_entity_1.OrderMessageEntity,
    order_cancel_reason_entity_1.OrderCancelReasonEntity,
    payment_gateway_entity_1.PaymentGatewayEntity,
    payment_entity_1.PaymentEntity,
    service_entity_1.ServiceEntity,
    service_category_entity_1.ServiceCategoryEntity,
    coupon_entity_1.CouponEntity,
    region_entity_1.RegionEntity,
    rider_entity_1.RiderEntity,
    rider_wallet_entity_1.RiderWalletEntity,
    rider_transaction_entity_1.RiderTransactionEntity,
    rider_address_entity_1.RiderAddressEntity,
    service_option_entity_1.ServiceOptionEntity,
    gift_batch_entity_1.GiftBatchEntity,
    gift_code_entity_1.GiftCodeEntity,
    sos_entity_1.SOSEntity,
    sos_activity_entity_1.SOSActivityEntity,
    announcement_entity_1.AnnouncementEntity,
    zone_price_entity_1.ZonePriceEntity,
    gateway_to_user_entity_1.GatewayToUserEntity,
    saved_payment_method_entity_1.SavedPaymentMethodEntity,
    rider_review_entity_1.RiderReviewEntity,
    payout_method_entity_1.PayoutMethodEntity,
    payout_account_entity_1.PayoutAccountEntity,
    payout_session_entity_1.PayoutSessionEntity,
];


/***/ }),
/* 10 */
/***/ ((module) => {

module.exports = require("typeorm");

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CarColorEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(10);
const driver_entity_1 = __webpack_require__(12);
let CarColorEntity = class CarColorEntity {
};
exports.CarColorEntity = CarColorEntity;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], CarColorEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], CarColorEntity.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => driver_entity_1.DriverEntity, driver => driver.carColor),
    tslib_1.__metadata("design:type", Array)
], CarColorEntity.prototype, "drivers", void 0);
exports.CarColorEntity = CarColorEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)('car_color')
], CarColorEntity);


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DriverEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(10);
const car_color_entity_1 = __webpack_require__(11);
const car_model_entity_1 = __webpack_require__(13);
const driver_transaction_entity_1 = __webpack_require__(14);
const driver_wallet_entity_1 = __webpack_require__(94);
const driver_status_enum_1 = __webpack_require__(95);
const gender_enum_1 = __webpack_require__(27);
const feedback_entity_1 = __webpack_require__(78);
const fleet_transaction_entity_1 = __webpack_require__(67);
const fleet_entity_1 = __webpack_require__(64);
const media_entity_1 = __webpack_require__(30);
const request_entity_1 = __webpack_require__(23);
const service_entity_1 = __webpack_require__(52);
const saved_payment_method_entity_1 = __webpack_require__(44);
const rider_review_entity_1 = __webpack_require__(76);
const rider_entity_1 = __webpack_require__(26);
const payout_account_entity_1 = __webpack_require__(47);
let DriverEntity = class DriverEntity {
};
exports.DriverEntity = DriverEntity;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], DriverEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    tslib_1.__metadata("design:type", String)
], DriverEntity.prototype, "firstName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    tslib_1.__metadata("design:type", String)
], DriverEntity.prototype, "lastName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar', length: 5 }),
    tslib_1.__metadata("design:type", String)
], DriverEntity.prototype, "countryIso", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('bigint', {
        unique: true,
    }),
    tslib_1.__metadata("design:type", String)
], DriverEntity.prototype, "mobileNumber", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    tslib_1.__metadata("design:type", String)
], DriverEntity.prototype, "certificateNumber", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    tslib_1.__metadata("design:type", String)
], DriverEntity.prototype, "email", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    tslib_1.__metadata("design:type", String)
], DriverEntity.prototype, "password", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => car_model_entity_1.CarModelEntity, (car) => car.drivers, {
        onDelete: 'SET NULL',
    }),
    tslib_1.__metadata("design:type", car_model_entity_1.CarModelEntity)
], DriverEntity.prototype, "car", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Number)
], DriverEntity.prototype, "carId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('varchar', {
        nullable: true,
        name: 'carColor',
    }),
    tslib_1.__metadata("design:type", String)
], DriverEntity.prototype, "carColorLegacy", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => car_color_entity_1.CarColorEntity, (carColor) => carColor.drivers),
    tslib_1.__metadata("design:type", car_color_entity_1.CarColorEntity)
], DriverEntity.prototype, "carColor", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Number)
], DriverEntity.prototype, "carColorId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('int', {
        nullable: true,
    }),
    tslib_1.__metadata("design:type", Number)
], DriverEntity.prototype, "carProductionYear", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    tslib_1.__metadata("design:type", String)
], DriverEntity.prototype, "carPlate", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('int', { nullable: true }),
    tslib_1.__metadata("design:type", Number)
], DriverEntity.prototype, "searchDistance", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('enum', {
        default: driver_status_enum_1.DriverStatus.WaitingDocuments,
        enum: driver_status_enum_1.DriverStatus,
    }),
    tslib_1.__metadata("design:type", String)
], DriverEntity.prototype, "status", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('enum', {
        nullable: true,
        enum: gender_enum_1.Gender,
    }),
    tslib_1.__metadata("design:type", String)
], DriverEntity.prototype, "gender", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], DriverEntity.prototype, "registrationTimestamp", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('tinyint', { nullable: true }),
    tslib_1.__metadata("design:type", Number)
], DriverEntity.prototype, "rating", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('smallint', { default: 0 }),
    tslib_1.__metadata("design:type", Number)
], DriverEntity.prototype, "reviewCount", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    tslib_1.__metadata("design:type", Date)
], DriverEntity.prototype, "lastSeenTimestamp", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToMany)(() => rider_entity_1.RiderEntity, (rider) => rider.favoriteDrivers),
    tslib_1.__metadata("design:type", Array)
], DriverEntity.prototype, "ridersFavorited", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToMany)(() => rider_entity_1.RiderEntity, (rider) => rider.blockedDrivers),
    tslib_1.__metadata("design:type", Array)
], DriverEntity.prototype, "ridersBlocked", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => media_entity_1.MediaEntity, (media) => media.uploadedByDriver),
    tslib_1.__metadata("design:type", Array)
], DriverEntity.prototype, "uploads", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToMany)(() => service_entity_1.ServiceEntity, (service) => service.drivers),
    (0, typeorm_1.JoinTable)({ name: 'driver_services_service' }),
    tslib_1.__metadata("design:type", Array)
], DriverEntity.prototype, "enabledServices", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => media_entity_1.MediaEntity, (media) => media.driverDocument),
    tslib_1.__metadata("design:type", Array)
], DriverEntity.prototype, "documents", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    tslib_1.__metadata("design:type", String)
], DriverEntity.prototype, "accountNumber", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    tslib_1.__metadata("design:type", String)
], DriverEntity.prototype, "bankName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    tslib_1.__metadata("design:type", String)
], DriverEntity.prototype, "bankRoutingNumber", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], DriverEntity.prototype, "bankSwift", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], DriverEntity.prototype, "address", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], DriverEntity.prototype, "notificationPlayerId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true, name: 'documentsNote' }),
    tslib_1.__metadata("design:type", String)
], DriverEntity.prototype, "softRejectionNote", void 0);
tslib_1.__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], DriverEntity.prototype, "deletedAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToOne)(() => media_entity_1.MediaEntity, (media) => media.driver),
    (0, typeorm_1.JoinColumn)(),
    tslib_1.__metadata("design:type", media_entity_1.MediaEntity)
], DriverEntity.prototype, "media", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Number)
], DriverEntity.prototype, "mediaId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('int', {
        nullable: true,
    }),
    tslib_1.__metadata("design:type", Number)
], DriverEntity.prototype, "presetAvatarNumber", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => payout_account_entity_1.PayoutAccountEntity, (payoutAccount) => payoutAccount.driver),
    tslib_1.__metadata("design:type", Array)
], DriverEntity.prototype, "payoutAccounts", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => feedback_entity_1.FeedbackEntity, (feedback) => feedback.driver),
    tslib_1.__metadata("design:type", Array)
], DriverEntity.prototype, "feedbacks", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => fleet_entity_1.FleetEntity, (fleet) => fleet.drivers),
    tslib_1.__metadata("design:type", fleet_entity_1.FleetEntity)
], DriverEntity.prototype, "fleet", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Number)
], DriverEntity.prototype, "fleetId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => driver_wallet_entity_1.DriverWalletEntity, (wallet) => wallet.driver),
    tslib_1.__metadata("design:type", Array)
], DriverEntity.prototype, "wallet", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => driver_transaction_entity_1.DriverTransactionEntity, (driverTransaction) => driverTransaction.driver, { onDelete: 'CASCADE', onUpdate: 'RESTRICT' }),
    tslib_1.__metadata("design:type", Array)
], DriverEntity.prototype, "transactions", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => request_entity_1.RequestEntity, (order) => order.driver, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    }),
    tslib_1.__metadata("design:type", Array)
], DriverEntity.prototype, "orders", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => fleet_transaction_entity_1.FleetTransactionEntity, (fleetTransaction) => fleetTransaction.driver),
    tslib_1.__metadata("design:type", Array)
], DriverEntity.prototype, "fleetTransactions", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => saved_payment_method_entity_1.SavedPaymentMethodEntity, (savedPaymentMethod) => savedPaymentMethod.driver),
    tslib_1.__metadata("design:type", Array)
], DriverEntity.prototype, "savedPaymentMethods", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => rider_review_entity_1.RiderReviewEntity, (review) => review.driver),
    tslib_1.__metadata("design:type", Array)
], DriverEntity.prototype, "reviewsByDriver", void 0);
exports.DriverEntity = DriverEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)('driver')
], DriverEntity);


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CarModelEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(10);
const driver_entity_1 = __webpack_require__(12);
let CarModelEntity = class CarModelEntity {
};
exports.CarModelEntity = CarModelEntity;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], CarModelEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'title' }),
    tslib_1.__metadata("design:type", String)
], CarModelEntity.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => driver_entity_1.DriverEntity, driver => driver.car),
    tslib_1.__metadata("design:type", Array)
], CarModelEntity.prototype, "drivers", void 0);
exports.CarModelEntity = CarModelEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)('car')
], CarModelEntity);


/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DriverTransactionEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(10);
const driver_entity_1 = __webpack_require__(12);
const driver_deduct_transaction_type_enum_1 = __webpack_require__(15);
const driver_recharge_transaction_type_enum_1 = __webpack_require__(16);
const transaction_action_enum_1 = __webpack_require__(17);
const transaction_status_enum_1 = __webpack_require__(18);
const operator_entity_1 = __webpack_require__(19);
const request_entity_1 = __webpack_require__(23);
const payment_gateway_entity_1 = __webpack_require__(33);
const gift_code_entity_1 = __webpack_require__(37);
const payout_session_entity_1 = __webpack_require__(50);
const payout_account_entity_1 = __webpack_require__(47);
const payout_method_entity_1 = __webpack_require__(48);
let DriverTransactionEntity = class DriverTransactionEntity {
};
exports.DriverTransactionEntity = DriverTransactionEntity;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], DriverTransactionEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'transactionTime' }),
    tslib_1.__metadata("design:type", Date)
], DriverTransactionEntity.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('enum', {
        enum: transaction_status_enum_1.TransactionStatus,
        default: transaction_status_enum_1.TransactionStatus.Processing,
    }),
    tslib_1.__metadata("design:type", String)
], DriverTransactionEntity.prototype, "status", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('enum', { enum: transaction_action_enum_1.TransactionAction }),
    tslib_1.__metadata("design:type", String)
], DriverTransactionEntity.prototype, "action", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('enum', {
        enum: driver_deduct_transaction_type_enum_1.DriverDeductTransactionType,
        nullable: true,
    }),
    tslib_1.__metadata("design:type", String)
], DriverTransactionEntity.prototype, "deductType", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('enum', {
        enum: driver_recharge_transaction_type_enum_1.DriverRechargeTransactionType,
        nullable: true,
    }),
    tslib_1.__metadata("design:type", String)
], DriverTransactionEntity.prototype, "rechargeType", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('float', {
        default: '0.00',
        precision: 10,
        scale: 2,
    }),
    tslib_1.__metadata("design:type", Number)
], DriverTransactionEntity.prototype, "amount", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('char', { length: '3' }),
    tslib_1.__metadata("design:type", String)
], DriverTransactionEntity.prototype, "currency", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true, name: 'documentNumber' }),
    tslib_1.__metadata("design:type", String)
], DriverTransactionEntity.prototype, "refrenceNumber", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true, name: 'details' }),
    tslib_1.__metadata("design:type", String)
], DriverTransactionEntity.prototype, "description", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => driver_entity_1.DriverEntity, (driver) => driver.transactions),
    tslib_1.__metadata("design:type", driver_entity_1.DriverEntity)
], DriverTransactionEntity.prototype, "driver", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], DriverTransactionEntity.prototype, "driverId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => payment_gateway_entity_1.PaymentGatewayEntity, (gateway) => gateway.riderTransactions),
    tslib_1.__metadata("design:type", payment_gateway_entity_1.PaymentGatewayEntity)
], DriverTransactionEntity.prototype, "paymentGateway", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Number)
], DriverTransactionEntity.prototype, "paymentGatewayId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => operator_entity_1.OperatorEntity, (operator) => operator.driverTransactions),
    tslib_1.__metadata("design:type", operator_entity_1.OperatorEntity)
], DriverTransactionEntity.prototype, "operator", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Number)
], DriverTransactionEntity.prototype, "operatorId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => request_entity_1.RequestEntity, (order) => order.driverTransactions),
    tslib_1.__metadata("design:type", request_entity_1.RequestEntity)
], DriverTransactionEntity.prototype, "request", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Number)
], DriverTransactionEntity.prototype, "requestId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToOne)(() => gift_code_entity_1.GiftCodeEntity, (giftCard) => giftCard.riderTransaction),
    (0, typeorm_1.JoinColumn)(),
    tslib_1.__metadata("design:type", gift_code_entity_1.GiftCodeEntity)
], DriverTransactionEntity.prototype, "giftCard", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Number)
], DriverTransactionEntity.prototype, "giftCardId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => payout_session_entity_1.PayoutSessionEntity, (session) => session.driverTransactions),
    tslib_1.__metadata("design:type", payout_session_entity_1.PayoutSessionEntity)
], DriverTransactionEntity.prototype, "payoutSession", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Number)
], DriverTransactionEntity.prototype, "payoutSessionId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => payout_account_entity_1.PayoutAccountEntity, (payoutAccount) => payoutAccount.driverTransactions),
    tslib_1.__metadata("design:type", payout_account_entity_1.PayoutAccountEntity)
], DriverTransactionEntity.prototype, "payoutAccount", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Number)
], DriverTransactionEntity.prototype, "payoutAccountId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => payout_method_entity_1.PayoutMethodEntity, (payoutMethod) => payoutMethod.driverTransactions),
    tslib_1.__metadata("design:type", payout_method_entity_1.PayoutMethodEntity)
], DriverTransactionEntity.prototype, "payoutMethod", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Number)
], DriverTransactionEntity.prototype, "payoutMethodId", void 0);
exports.DriverTransactionEntity = DriverTransactionEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)('driver_transaction')
], DriverTransactionEntity);


/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DriverDeductTransactionType = void 0;
const graphql_1 = __webpack_require__(6);
var DriverDeductTransactionType;
(function (DriverDeductTransactionType) {
    DriverDeductTransactionType["Withdraw"] = "Withdraw";
    DriverDeductTransactionType["Commission"] = "Commission";
    DriverDeductTransactionType["Correction"] = "Correction";
})(DriverDeductTransactionType || (exports.DriverDeductTransactionType = DriverDeductTransactionType = {}));
(0, graphql_1.registerEnumType)(DriverDeductTransactionType, { name: 'DriverDeductTransactionType' });


/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DriverRechargeTransactionType = void 0;
const graphql_1 = __webpack_require__(6);
var DriverRechargeTransactionType;
(function (DriverRechargeTransactionType) {
    DriverRechargeTransactionType["OrderFee"] = "OrderFee";
    DriverRechargeTransactionType["BankTransfer"] = "BankTransfer";
    DriverRechargeTransactionType["InAppPayment"] = "InAppPayment";
    DriverRechargeTransactionType["Gift"] = "Gift";
})(DriverRechargeTransactionType || (exports.DriverRechargeTransactionType = DriverRechargeTransactionType = {}));
(0, graphql_1.registerEnumType)(DriverRechargeTransactionType, { name: 'DriverRechargeTransactionType' });


/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransactionAction = void 0;
const graphql_1 = __webpack_require__(6);
var TransactionAction;
(function (TransactionAction) {
    TransactionAction["Recharge"] = "Recharge";
    TransactionAction["Deduct"] = "Deduct";
})(TransactionAction || (exports.TransactionAction = TransactionAction = {}));
(0, graphql_1.registerEnumType)(TransactionAction, { name: 'TransactionAction' });


/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransactionStatus = void 0;
const graphql_1 = __webpack_require__(6);
var TransactionStatus;
(function (TransactionStatus) {
    TransactionStatus["Processing"] = "Processing";
    TransactionStatus["Done"] = "Done";
    TransactionStatus["Canceled"] = "Canceled";
    TransactionStatus["Rejected"] = "Rejected";
})(TransactionStatus || (exports.TransactionStatus = TransactionStatus = {}));
(0, graphql_1.registerEnumType)(TransactionStatus, { name: 'TransactionStatus' });


/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OperatorEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(10);
const complaint_activity_entity_1 = __webpack_require__(20);
const driver_transaction_entity_1 = __webpack_require__(14);
const enabled_notification_enum_1 = __webpack_require__(91);
const fleet_transaction_entity_1 = __webpack_require__(67);
const fleet_entity_1 = __webpack_require__(64);
const media_entity_1 = __webpack_require__(30);
const operator_role_entity_1 = __webpack_require__(92);
const provider_transaction_entity_1 = __webpack_require__(40);
const request_entity_1 = __webpack_require__(23);
const rider_transaction_entity_1 = __webpack_require__(34);
const sos_activity_entity_1 = __webpack_require__(86);
const payout_session_entity_1 = __webpack_require__(50);
const gift_batch_entity_1 = __webpack_require__(38);
let OperatorEntity = class OperatorEntity {
};
exports.OperatorEntity = OperatorEntity;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], OperatorEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], OperatorEntity.prototype, "firstName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], OperatorEntity.prototype, "lastName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    tslib_1.__metadata("design:type", String)
], OperatorEntity.prototype, "userName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ default: 'admin' }),
    tslib_1.__metadata("design:type", String)
], OperatorEntity.prototype, "password", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('bigint', {
        nullable: true,
        unique: true,
    }),
    tslib_1.__metadata("design:type", String)
], OperatorEntity.prototype, "mobileNumber", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('set', {
        enum: enabled_notification_enum_1.EnabledNotification,
        default: [
            enabled_notification_enum_1.EnabledNotification.Complaint,
            enabled_notification_enum_1.EnabledNotification.SOS,
            enabled_notification_enum_1.EnabledNotification.DriverSubmittedDocs,
        ],
    }),
    tslib_1.__metadata("design:type", Array)
], OperatorEntity.prototype, "enabledNotifications", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], OperatorEntity.prototype, "email", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], OperatorEntity.prototype, "address", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToOne)(() => media_entity_1.MediaEntity, (media) => media.operator),
    (0, typeorm_1.JoinColumn)(),
    tslib_1.__metadata("design:type", media_entity_1.MediaEntity)
], OperatorEntity.prototype, "media", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Number)
], OperatorEntity.prototype, "mediaId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => operator_role_entity_1.OperatorRoleEntity, (role) => role.operators),
    tslib_1.__metadata("design:type", operator_role_entity_1.OperatorRoleEntity)
], OperatorEntity.prototype, "role", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Number)
], OperatorEntity.prototype, "roleId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => fleet_entity_1.FleetEntity, (fleet) => fleet.operators),
    tslib_1.__metadata("design:type", fleet_entity_1.FleetEntity)
], OperatorEntity.prototype, "fleet", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => request_entity_1.RequestEntity, (request) => request.operator, {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
    }),
    tslib_1.__metadata("design:type", Array)
], OperatorEntity.prototype, "requests", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => complaint_activity_entity_1.ComplaintActivityEntity, (activity) => activity.actor),
    tslib_1.__metadata("design:type", Array)
], OperatorEntity.prototype, "complaintActivities", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => rider_transaction_entity_1.RiderTransactionEntity, (riderTransaction) => riderTransaction.operator),
    tslib_1.__metadata("design:type", Array)
], OperatorEntity.prototype, "riderTransactions", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => driver_transaction_entity_1.DriverTransactionEntity, (driverTransaction) => driverTransaction.operator),
    tslib_1.__metadata("design:type", Array)
], OperatorEntity.prototype, "driverTransactions", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => fleet_transaction_entity_1.FleetTransactionEntity, (fleetTransaction) => fleetTransaction.operator),
    tslib_1.__metadata("design:type", Array)
], OperatorEntity.prototype, "fleetTransactions", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => provider_transaction_entity_1.ProviderTransactionEntity, (providerTransaction) => providerTransaction.operator),
    tslib_1.__metadata("design:type", Array)
], OperatorEntity.prototype, "providerTransactions", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => sos_activity_entity_1.SOSActivityEntity, (sosActivity) => sosActivity.operator),
    tslib_1.__metadata("design:type", Array)
], OperatorEntity.prototype, "sosActivities", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => payout_session_entity_1.PayoutSessionEntity, (payoutSession) => payoutSession.createdByOperator),
    tslib_1.__metadata("design:type", Array)
], OperatorEntity.prototype, "payoutSessionsCreated", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => gift_batch_entity_1.GiftBatchEntity, (gift) => gift.createdByOperator),
    tslib_1.__metadata("design:type", Array)
], OperatorEntity.prototype, "giftBatchesCreated", void 0);
exports.OperatorEntity = OperatorEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)('operator')
], OperatorEntity);


/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ComplaintActivityEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(10);
const complaint_entity_1 = __webpack_require__(21);
const complaint_activity_type_enum_1 = __webpack_require__(90);
const operator_entity_1 = __webpack_require__(19);
let ComplaintActivityEntity = class ComplaintActivityEntity {
};
exports.ComplaintActivityEntity = ComplaintActivityEntity;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], ComplaintActivityEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('enum', {
        enum: complaint_activity_type_enum_1.ComplaintActivityType
    }),
    tslib_1.__metadata("design:type", String)
], ComplaintActivityEntity.prototype, "type", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => operator_entity_1.OperatorEntity, operator => operator.complaintActivities),
    tslib_1.__metadata("design:type", operator_entity_1.OperatorEntity)
], ComplaintActivityEntity.prototype, "actor", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => operator_entity_1.OperatorEntity),
    tslib_1.__metadata("design:type", operator_entity_1.OperatorEntity)
], ComplaintActivityEntity.prototype, "assignedTo", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Number)
], ComplaintActivityEntity.prototype, "assignedToId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], ComplaintActivityEntity.prototype, "comment", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => complaint_entity_1.ComplaintEntity, complaint => complaint.activities),
    tslib_1.__metadata("design:type", complaint_entity_1.ComplaintEntity)
], ComplaintActivityEntity.prototype, "complaint", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], ComplaintActivityEntity.prototype, "complaintId", void 0);
exports.ComplaintActivityEntity = ComplaintActivityEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)('complaint_activity')
], ComplaintActivityEntity);


/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ComplaintEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(10);
const complaint_activity_entity_1 = __webpack_require__(20);
const complaint_status_enum_1 = __webpack_require__(22);
const request_entity_1 = __webpack_require__(23);
let ComplaintEntity = class ComplaintEntity {
};
exports.ComplaintEntity = ComplaintEntity;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], ComplaintEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], ComplaintEntity.prototype, "inscriptionTimestamp", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => request_entity_1.RequestEntity, order => order.complaints),
    tslib_1.__metadata("design:type", request_entity_1.RequestEntity)
], ComplaintEntity.prototype, "request", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], ComplaintEntity.prototype, "requestId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Boolean)
], ComplaintEntity.prototype, "requestedByDriver", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], ComplaintEntity.prototype, "subject", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], ComplaintEntity.prototype, "content", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('enum', {
        enum: complaint_status_enum_1.ComplaintStatus,
        default: complaint_status_enum_1.ComplaintStatus.Submitted
    }),
    tslib_1.__metadata("design:type", String)
], ComplaintEntity.prototype, "status", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => complaint_activity_entity_1.ComplaintActivityEntity, activity => activity.complaint),
    tslib_1.__metadata("design:type", Array)
], ComplaintEntity.prototype, "activities", void 0);
exports.ComplaintEntity = ComplaintEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)('complaint')
], ComplaintEntity);


/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ComplaintStatus = void 0;
const graphql_1 = __webpack_require__(6);
var ComplaintStatus;
(function (ComplaintStatus) {
    ComplaintStatus["Submitted"] = "Submitted";
    ComplaintStatus["UnderInvestigation"] = "UnderInvestigation";
    ComplaintStatus["Resolved"] = "Resolved";
})(ComplaintStatus || (exports.ComplaintStatus = ComplaintStatus = {}));
(0, graphql_1.registerEnumType)(ComplaintStatus, { name: 'ComplaintStatus' });


/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RequestEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(10);
const multipoint_transformer_1 = __webpack_require__(24);
const complaint_entity_1 = __webpack_require__(21);
const coupon_entity_1 = __webpack_require__(25);
const driver_transaction_entity_1 = __webpack_require__(14);
const driver_entity_1 = __webpack_require__(12);
const order_status_enum_1 = __webpack_require__(77);
const feedback_entity_1 = __webpack_require__(78);
const fleet_transaction_entity_1 = __webpack_require__(67);
const request_message_entity_1 = __webpack_require__(80);
const payment_gateway_entity_1 = __webpack_require__(33);
const provider_transaction_entity_1 = __webpack_require__(40);
const rider_entity_1 = __webpack_require__(26);
const rider_transaction_entity_1 = __webpack_require__(34);
const service_entity_1 = __webpack_require__(52);
const operator_entity_1 = __webpack_require__(19);
const request_activity_entity_1 = __webpack_require__(82);
const service_option_entity_1 = __webpack_require__(60);
const sos_entity_1 = __webpack_require__(84);
const fleet_entity_1 = __webpack_require__(64);
const order_cancel_reason_entity_1 = __webpack_require__(88);
const payment_mode_enum_1 = __webpack_require__(89);
const saved_payment_method_entity_1 = __webpack_require__(44);
const rider_review_entity_1 = __webpack_require__(76);
let RequestEntity = class RequestEntity {
};
exports.RequestEntity = RequestEntity;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], RequestEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'requestTimestamp' }),
    tslib_1.__metadata("design:type", Date)
], RequestEntity.prototype, "createdOn", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Date)
], RequestEntity.prototype, "startTimestamp", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Date)
], RequestEntity.prototype, "finishTimestamp", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('enum', {
        enum: order_status_enum_1.OrderStatus,
        default: order_status_enum_1.OrderStatus.Requested,
    }),
    tslib_1.__metadata("design:type", String)
], RequestEntity.prototype, "status", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('int', { default: 0 }),
    tslib_1.__metadata("design:type", Number)
], RequestEntity.prototype, "distanceBest", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('int', { default: 0 }),
    tslib_1.__metadata("design:type", Number)
], RequestEntity.prototype, "durationBest", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('int', { default: 0 }),
    tslib_1.__metadata("design:type", Number)
], RequestEntity.prototype, "waitMinutes", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('float', {
        precision: 10,
        scale: 2,
        default: 0,
    }),
    tslib_1.__metadata("design:type", Number)
], RequestEntity.prototype, "waitCost", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('float', {
        precision: 10,
        scale: 2,
        default: 0,
    }),
    tslib_1.__metadata("design:type", Number)
], RequestEntity.prototype, "rideOptionsCost", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('float', {
        precision: 10,
        scale: 2,
        default: 0,
    }),
    tslib_1.__metadata("design:type", Number)
], RequestEntity.prototype, "taxCost", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('float', {
        precision: 10,
        scale: 2,
        default: 0,
    }),
    tslib_1.__metadata("design:type", Number)
], RequestEntity.prototype, "serviceCost", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Date)
], RequestEntity.prototype, "expectedTimestamp", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Date)
], RequestEntity.prototype, "etaPickup", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('float', {
        precision: 10,
        scale: 2,
    }),
    tslib_1.__metadata("design:type", Number)
], RequestEntity.prototype, "costBest", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('float', {
        precision: 10,
        scale: 2,
        default: '0.00',
    }),
    tslib_1.__metadata("design:type", Number)
], RequestEntity.prototype, "costAfterCoupon", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('float', {
        precision: 10,
        scale: 2,
        default: '0.00',
    }),
    tslib_1.__metadata("design:type", Number)
], RequestEntity.prototype, "tipAmount", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('float', {
        default: 0,
        precision: 10,
        scale: 2,
    }),
    tslib_1.__metadata("design:type", Number)
], RequestEntity.prototype, "paidAmount", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('float', {
        precision: 10,
        default: 0,
        scale: 2,
    }),
    tslib_1.__metadata("design:type", Number)
], RequestEntity.prototype, "providerShare", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('tinyint', {
        default: -1,
    }),
    tslib_1.__metadata("design:type", Number)
], RequestEntity.prototype, "destinationArrivedTo", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => request_activity_entity_1.RequestActivityEntity, (activity) => activity.request),
    tslib_1.__metadata("design:type", Array)
], RequestEntity.prototype, "activities", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        transformer: {
            to(value) {
                return value.join('|');
            },
            from(value) {
                if (value == null)
                    return [];
                return value.split('|');
            },
        },
    }),
    tslib_1.__metadata("design:type", Array)
], RequestEntity.prototype, "addresses", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('multipoint', {
        transformer: new multipoint_transformer_1.MultipointTransformer(),
    }),
    tslib_1.__metadata("design:type", Array)
], RequestEntity.prototype, "points", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('multipoint', {
        transformer: new multipoint_transformer_1.MultipointTransformer(),
        nullable: true,
    }),
    tslib_1.__metadata("design:type", Array)
], RequestEntity.prototype, "directions", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('multipoint', {
        transformer: new multipoint_transformer_1.MultipointTransformer(),
        nullable: true,
    }),
    tslib_1.__metadata("design:type", Array)
], RequestEntity.prototype, "driverDirections", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        default: () => 'CURRENT_TIMESTAMP',
    }),
    tslib_1.__metadata("design:type", Date)
], RequestEntity.prototype, "driverLastSeenMessagesAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        default: () => 'CURRENT_TIMESTAMP',
    }),
    tslib_1.__metadata("design:type", Date)
], RequestEntity.prototype, "riderLastSeenMessagesAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => driver_entity_1.DriverEntity, (driver) => driver.orders),
    tslib_1.__metadata("design:type", driver_entity_1.DriverEntity)
], RequestEntity.prototype, "driver", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Number)
], RequestEntity.prototype, "driverId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => rider_entity_1.RiderEntity, (rider) => rider.orders),
    tslib_1.__metadata("design:type", rider_entity_1.RiderEntity)
], RequestEntity.prototype, "rider", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], RequestEntity.prototype, "riderId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => coupon_entity_1.CouponEntity, (coupon) => coupon.orders),
    tslib_1.__metadata("design:type", coupon_entity_1.CouponEntity)
], RequestEntity.prototype, "coupon", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Number)
], RequestEntity.prototype, "couponId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('char', { length: 3 }),
    tslib_1.__metadata("design:type", String)
], RequestEntity.prototype, "currency", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => request_message_entity_1.OrderMessageEntity, (message) => message.request),
    tslib_1.__metadata("design:type", Array)
], RequestEntity.prototype, "conversation", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('enum', {
        enum: payment_mode_enum_1.PaymentMode,
        nullable: true,
    }),
    tslib_1.__metadata("design:type", String)
], RequestEntity.prototype, "paymentMode", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => payment_gateway_entity_1.PaymentGatewayEntity, (gateway) => gateway.orders),
    tslib_1.__metadata("design:type", payment_gateway_entity_1.PaymentGatewayEntity)
], RequestEntity.prototype, "paymentGateway", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Number)
], RequestEntity.prototype, "paymentGatewayId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => saved_payment_method_entity_1.SavedPaymentMethodEntity, (method) => method.orders),
    tslib_1.__metadata("design:type", saved_payment_method_entity_1.SavedPaymentMethodEntity)
], RequestEntity.prototype, "savedPaymentMethod", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Number)
], RequestEntity.prototype, "savedPaymentMethodId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => complaint_entity_1.ComplaintEntity, (complaint) => complaint.request),
    tslib_1.__metadata("design:type", Array)
], RequestEntity.prototype, "complaints", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => service_entity_1.ServiceEntity, (service) => service.requests),
    tslib_1.__metadata("design:type", service_entity_1.ServiceEntity)
], RequestEntity.prototype, "service", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], RequestEntity.prototype, "serviceId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => operator_entity_1.OperatorEntity, (operator) => operator.requests, {
        onDelete: 'CASCADE',
    }),
    tslib_1.__metadata("design:type", operator_entity_1.OperatorEntity)
], RequestEntity.prototype, "operator", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Number)
], RequestEntity.prototype, "operatorId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => fleet_entity_1.FleetEntity, (fleet) => fleet.requests, {
        onDelete: 'SET NULL',
    }),
    tslib_1.__metadata("design:type", fleet_entity_1.FleetEntity)
], RequestEntity.prototype, "fleet", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Number)
], RequestEntity.prototype, "fleetId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => rider_transaction_entity_1.RiderTransactionEntity, (riderTransaction) => riderTransaction.request),
    tslib_1.__metadata("design:type", Array)
], RequestEntity.prototype, "riderTransactions", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => fleet_transaction_entity_1.FleetTransactionEntity, (fleetTransaction) => fleetTransaction.request),
    tslib_1.__metadata("design:type", Array)
], RequestEntity.prototype, "fleetTransactions", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToOne)(() => feedback_entity_1.FeedbackEntity, (feedback) => feedback.request),
    tslib_1.__metadata("design:type", feedback_entity_1.FeedbackEntity)
], RequestEntity.prototype, "review", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => driver_transaction_entity_1.DriverTransactionEntity, (transaction) => transaction.request),
    tslib_1.__metadata("design:type", Array)
], RequestEntity.prototype, "driverTransactions", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => provider_transaction_entity_1.ProviderTransactionEntity, (transaction) => transaction.request),
    tslib_1.__metadata("design:type", Array)
], RequestEntity.prototype, "providerTransactions", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToMany)(() => service_option_entity_1.ServiceOptionEntity, (option) => option.requests, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinTable)(),
    tslib_1.__metadata("design:type", Array)
], RequestEntity.prototype, "options", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => sos_entity_1.SOSEntity, (sos) => sos.request),
    tslib_1.__metadata("design:type", Array)
], RequestEntity.prototype, "sosCalls", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => order_cancel_reason_entity_1.OrderCancelReasonEntity, (order) => order.orders),
    tslib_1.__metadata("design:type", order_cancel_reason_entity_1.OrderCancelReasonEntity)
], RequestEntity.prototype, "cancelReason", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    tslib_1.__metadata("design:type", Number)
], RequestEntity.prototype, "cancelReasonId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    tslib_1.__metadata("design:type", String)
], RequestEntity.prototype, "cancelReasonNote", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToOne)(() => rider_review_entity_1.RiderReviewEntity, (review) => review.request),
    tslib_1.__metadata("design:type", rider_review_entity_1.RiderReviewEntity)
], RequestEntity.prototype, "driverReviewForRider", void 0);
exports.RequestEntity = RequestEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)('request')
], RequestEntity);


/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MultipointTransformer = void 0;
class MultipointTransformer {
    to(value) {
        if (value == null || value.length < 1)
            return null;
        return `MULTIPOINT(${value.map((x) => `${x.lng} ${x.lat}`).join(',')})`;
    }
    from(value) {
        if (value == null)
            return [];
        const i = value.substring(11, value.length - 1).split(',').map(x => {
            const s = x.substring(1, x.length - 1).split(' ');
            return {
                lng: parseFloat(s[0]),
                lat: parseFloat(s[1])
            };
        });
        return i;
    }
}
exports.MultipointTransformer = MultipointTransformer;


/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CouponEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(10);
const request_entity_1 = __webpack_require__(23);
const rider_entity_1 = __webpack_require__(26);
const service_entity_1 = __webpack_require__(52);
let CouponEntity = class CouponEntity {
};
exports.CouponEntity = CouponEntity;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], CouponEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    tslib_1.__metadata("design:type", String)
], CouponEntity.prototype, "code", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], CouponEntity.prototype, "title", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], CouponEntity.prototype, "description", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        default: 0
    }),
    tslib_1.__metadata("design:type", Number)
], CouponEntity.prototype, "manyUsersCanUse", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        default: 1
    }),
    tslib_1.__metadata("design:type", Number)
], CouponEntity.prototype, "manyTimesUserCanUse", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("float", {
        default: '0.00',
        precision: 10,
        scale: 2
    }),
    tslib_1.__metadata("design:type", Number)
], CouponEntity.prototype, "minimumCost", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("float", {
        default: '0.00',
        precision: 10,
        scale: 2
    }),
    tslib_1.__metadata("design:type", Number)
], CouponEntity.prototype, "maximumCost", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'startTimestamp' }),
    tslib_1.__metadata("design:type", Date)
], CouponEntity.prototype, "startAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'expirationTimestamp', nullable: true }),
    tslib_1.__metadata("design:type", Date)
], CouponEntity.prototype, "expireAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("tinyint", {
        default: 0
    }),
    tslib_1.__metadata("design:type", Number)
], CouponEntity.prototype, "discountPercent", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("float", {
        default: 0,
        precision: 10,
        scale: 2
    }),
    tslib_1.__metadata("design:type", Number)
], CouponEntity.prototype, "discountFlat", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("float", {
        default: 0,
        precision: 10,
        scale: 2
    }),
    tslib_1.__metadata("design:type", Number)
], CouponEntity.prototype, "creditGift", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        default: true
    }),
    tslib_1.__metadata("design:type", Boolean)
], CouponEntity.prototype, "isEnabled", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        default: false
    }),
    tslib_1.__metadata("design:type", Boolean)
], CouponEntity.prototype, "isFirstTravelOnly", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToMany)(() => service_entity_1.ServiceEntity, service => service.allowedCoupons),
    (0, typeorm_1.JoinTable)({ name: 'coupon_services_service' }),
    tslib_1.__metadata("design:type", Array)
], CouponEntity.prototype, "allowedServices", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToMany)(() => rider_entity_1.RiderEntity, rider => rider.coupons),
    tslib_1.__metadata("design:type", Array)
], CouponEntity.prototype, "riders", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => request_entity_1.RequestEntity, order => order.coupon, { onDelete: 'CASCADE', onUpdate: 'NO ACTION' }),
    tslib_1.__metadata("design:type", Array)
], CouponEntity.prototype, "orders", void 0);
exports.CouponEntity = CouponEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)('coupon')
], CouponEntity);


/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RiderEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(10);
const coupon_entity_1 = __webpack_require__(25);
const gender_enum_1 = __webpack_require__(27);
const rider_document_type_1 = __webpack_require__(28);
const rider_status_enum_1 = __webpack_require__(29);
const media_entity_1 = __webpack_require__(30);
const request_entity_1 = __webpack_require__(23);
const rider_address_entity_1 = __webpack_require__(71);
const rider_transaction_entity_1 = __webpack_require__(34);
const rider_wallet_entity_1 = __webpack_require__(75);
const saved_payment_method_entity_1 = __webpack_require__(44);
const rider_review_entity_1 = __webpack_require__(76);
const driver_entity_1 = __webpack_require__(12);
let RiderEntity = class RiderEntity {
};
exports.RiderEntity = RiderEntity;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], RiderEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('enum', {
        enum: rider_status_enum_1.RiderStatus,
        default: rider_status_enum_1.RiderStatus.Enabled,
    }),
    tslib_1.__metadata("design:type", String)
], RiderEntity.prototype, "status", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], RiderEntity.prototype, "firstName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], RiderEntity.prototype, "lastName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar', length: 5 }),
    tslib_1.__metadata("design:type", String)
], RiderEntity.prototype, "countryIso", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('bigint', {
        unique: true,
    }),
    tslib_1.__metadata("design:type", String)
], RiderEntity.prototype, "mobileNumber", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], RiderEntity.prototype, "registrationTimestamp", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], RiderEntity.prototype, "email", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('enum', {
        enum: gender_enum_1.Gender,
        nullable: true,
    }),
    tslib_1.__metadata("design:type", String)
], RiderEntity.prototype, "gender", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('varchar', {
        nullable: true,
    }),
    tslib_1.__metadata("design:type", String)
], RiderEntity.prototype, "address", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    tslib_1.__metadata("design:type", Boolean)
], RiderEntity.prototype, "isResident", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    tslib_1.__metadata("design:type", String)
], RiderEntity.prototype, "idNumber", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    tslib_1.__metadata("design:type", String)
], RiderEntity.prototype, "password", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        //enum: RiderDocumentType
    }),
    tslib_1.__metadata("design:type", String)
], RiderEntity.prototype, "documentType", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], RiderEntity.prototype, "notificationPlayerId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], RiderEntity.prototype, "deletedAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => rider_address_entity_1.RiderAddressEntity, (address) => address.rider),
    tslib_1.__metadata("design:type", Array)
], RiderEntity.prototype, "addresses", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToOne)(() => media_entity_1.MediaEntity, (media) => media.rider),
    (0, typeorm_1.JoinColumn)(),
    tslib_1.__metadata("design:type", media_entity_1.MediaEntity)
], RiderEntity.prototype, "media", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Number)
], RiderEntity.prototype, "mediaId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('int', {
        nullable: true,
    }),
    tslib_1.__metadata("design:type", Number)
], RiderEntity.prototype, "presetAvatarNumber", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => request_entity_1.RequestEntity, (order) => order.rider),
    tslib_1.__metadata("design:type", Array)
], RiderEntity.prototype, "orders", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => rider_wallet_entity_1.RiderWalletEntity, (wallet) => wallet.rider),
    tslib_1.__metadata("design:type", Array)
], RiderEntity.prototype, "wallets", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToMany)(() => driver_entity_1.DriverEntity, (driver) => driver.ridersFavorited),
    (0, typeorm_1.JoinTable)(),
    tslib_1.__metadata("design:type", Array)
], RiderEntity.prototype, "favoriteDrivers", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToMany)(() => driver_entity_1.DriverEntity, (driver) => driver.ridersBlocked),
    (0, typeorm_1.JoinTable)(),
    tslib_1.__metadata("design:type", Array)
], RiderEntity.prototype, "blockedDrivers", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => rider_transaction_entity_1.RiderTransactionEntity, (riderTransaction) => riderTransaction.rider, { onDelete: 'CASCADE', onUpdate: 'RESTRICT' }),
    tslib_1.__metadata("design:type", Array)
], RiderEntity.prototype, "transactions", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToMany)(() => coupon_entity_1.CouponEntity, (coupon) => coupon.riders),
    (0, typeorm_1.JoinTable)(),
    tslib_1.__metadata("design:type", Array)
], RiderEntity.prototype, "coupons", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => saved_payment_method_entity_1.SavedPaymentMethodEntity, (savedPaymentMethod) => savedPaymentMethod.rider),
    tslib_1.__metadata("design:type", Array)
], RiderEntity.prototype, "savedPaymentMethods", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => rider_review_entity_1.RiderReviewEntity, (review) => review.rider),
    tslib_1.__metadata("design:type", Array)
], RiderEntity.prototype, "reviewsForRider", void 0);
exports.RiderEntity = RiderEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)('rider')
], RiderEntity);


/***/ }),
/* 27 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Gender = void 0;
const graphql_1 = __webpack_require__(6);
var Gender;
(function (Gender) {
    Gender["Male"] = "male";
    Gender["Female"] = "female";
    Gender["Unknown"] = "unknown";
})(Gender || (exports.Gender = Gender = {}));
(0, graphql_1.registerEnumType)(Gender, { name: 'Gender' });


/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RiderDocumentType = void 0;
const graphql_1 = __webpack_require__(6);
var RiderDocumentType;
(function (RiderDocumentType) {
    RiderDocumentType["ID"] = "ID";
    RiderDocumentType["Passport"] = "Passport";
    RiderDocumentType["DriverLicense"] = "DriverLicense";
    RiderDocumentType["ResidentPermitID"] = "ResidentPermitID";
})(RiderDocumentType || (exports.RiderDocumentType = RiderDocumentType = {}));
(0, graphql_1.registerEnumType)(RiderDocumentType, { name: 'RiderDocumentType' });


/***/ }),
/* 29 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RiderStatus = void 0;
const graphql_1 = __webpack_require__(6);
var RiderStatus;
(function (RiderStatus) {
    RiderStatus["Enabled"] = "enabled";
    RiderStatus["Disabled"] = "blocked";
})(RiderStatus || (exports.RiderStatus = RiderStatus = {}));
(0, graphql_1.registerEnumType)(RiderStatus, { name: 'RiderStatus' });


/***/ }),
/* 30 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MediaEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(10);
const announcement_entity_1 = __webpack_require__(31);
const driver_entity_1 = __webpack_require__(12);
const operator_entity_1 = __webpack_require__(19);
const payment_gateway_entity_1 = __webpack_require__(33);
const rider_entity_1 = __webpack_require__(26);
const service_entity_1 = __webpack_require__(52);
const payout_method_entity_1 = __webpack_require__(48);
let MediaEntity = class MediaEntity {
};
exports.MediaEntity = MediaEntity;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], MediaEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('varchar'),
    tslib_1.__metadata("design:type", String)
], MediaEntity.prototype, "address", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('longtext', {
        nullable: true,
    }),
    tslib_1.__metadata("design:type", String)
], MediaEntity.prototype, "base64", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToOne)(() => driver_entity_1.DriverEntity, (driver) => driver.media, {
        onDelete: 'SET NULL',
    }),
    tslib_1.__metadata("design:type", driver_entity_1.DriverEntity)
], MediaEntity.prototype, "driver", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => driver_entity_1.DriverEntity, (driver) => driver.documents, {
        onDelete: 'SET NULL',
    }),
    tslib_1.__metadata("design:type", driver_entity_1.DriverEntity)
], MediaEntity.prototype, "driverDocument", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Number)
], MediaEntity.prototype, "driverDocumentId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToOne)(() => operator_entity_1.OperatorEntity, (operator) => operator.media, {
        onDelete: 'SET NULL',
    }),
    tslib_1.__metadata("design:type", operator_entity_1.OperatorEntity)
], MediaEntity.prototype, "operator", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToOne)(() => announcement_entity_1.AnnouncementEntity, (announcement) => announcement.media, {
        onDelete: 'SET NULL',
    }),
    tslib_1.__metadata("design:type", announcement_entity_1.AnnouncementEntity)
], MediaEntity.prototype, "announcement", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToOne)(() => rider_entity_1.RiderEntity, (rider) => rider.media, { onDelete: 'SET NULL' }),
    tslib_1.__metadata("design:type", Array)
], MediaEntity.prototype, "rider", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToOne)(() => service_entity_1.ServiceEntity, (service) => service.media, {
        onDelete: 'SET NULL',
    }),
    tslib_1.__metadata("design:type", Array)
], MediaEntity.prototype, "service", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToOne)(() => payment_gateway_entity_1.PaymentGatewayEntity, (gateway) => gateway.media, {
        onDelete: 'SET NULL',
    }),
    tslib_1.__metadata("design:type", payment_gateway_entity_1.PaymentGatewayEntity)
], MediaEntity.prototype, "paymentGateway", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToOne)(() => payout_method_entity_1.PayoutMethodEntity, (payoutMethod) => payoutMethod.media, {
        onDelete: 'SET NULL',
    }),
    tslib_1.__metadata("design:type", payout_method_entity_1.PayoutMethodEntity)
], MediaEntity.prototype, "payoutMethod", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => driver_entity_1.DriverEntity, (driver) => driver.uploads, {
        onDelete: 'SET NULL',
    }),
    tslib_1.__metadata("design:type", driver_entity_1.DriverEntity)
], MediaEntity.prototype, "uploadedByDriver", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Number)
], MediaEntity.prototype, "uploadedByDriverId", void 0);
exports.MediaEntity = MediaEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)('media')
], MediaEntity);


/***/ }),
/* 31 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AnnouncementEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(10);
const anouncement_user_type_enum_1 = __webpack_require__(32);
const media_entity_1 = __webpack_require__(30);
let AnnouncementEntity = class AnnouncementEntity {
};
exports.AnnouncementEntity = AnnouncementEntity;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], AnnouncementEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('set', {
        enum: anouncement_user_type_enum_1.AnnouncementUserType,
        default: [anouncement_user_type_enum_1.AnnouncementUserType.Rider],
    }),
    tslib_1.__metadata("design:type", Array)
], AnnouncementEntity.prototype, "userType", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'startTimestamp',
    }),
    tslib_1.__metadata("design:type", Date)
], AnnouncementEntity.prototype, "startAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        name: 'expirationTimestamp',
    }),
    tslib_1.__metadata("design:type", Date)
], AnnouncementEntity.prototype, "expireAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], AnnouncementEntity.prototype, "title", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    tslib_1.__metadata("design:type", String)
], AnnouncementEntity.prototype, "url", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], AnnouncementEntity.prototype, "description", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToOne)(() => media_entity_1.MediaEntity, (media) => media.announcement),
    (0, typeorm_1.JoinColumn)(),
    tslib_1.__metadata("design:type", media_entity_1.MediaEntity)
], AnnouncementEntity.prototype, "media", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Number)
], AnnouncementEntity.prototype, "mediaId", void 0);
exports.AnnouncementEntity = AnnouncementEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)('promotion')
], AnnouncementEntity);


/***/ }),
/* 32 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AnnouncementUserType = void 0;
const graphql_1 = __webpack_require__(6);
var AnnouncementUserType;
(function (AnnouncementUserType) {
    AnnouncementUserType["Driver"] = "Driver";
    AnnouncementUserType["Rider"] = "Rider";
    AnnouncementUserType["Operator"] = "Operator";
})(AnnouncementUserType || (exports.AnnouncementUserType = AnnouncementUserType = {}));
(0, graphql_1.registerEnumType)(AnnouncementUserType, { name: 'AnnouncementUserType' });


/***/ }),
/* 33 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PaymentGatewayEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(10);
const request_entity_1 = __webpack_require__(23);
const rider_transaction_entity_1 = __webpack_require__(34);
const payment_gateway_type_enum_1 = __webpack_require__(39);
const provider_transaction_entity_1 = __webpack_require__(40);
const media_entity_1 = __webpack_require__(30);
const gateway_to_user_entity_1 = __webpack_require__(43);
const saved_payment_method_entity_1 = __webpack_require__(44);
const payout_account_entity_1 = __webpack_require__(47);
let PaymentGatewayEntity = class PaymentGatewayEntity {
};
exports.PaymentGatewayEntity = PaymentGatewayEntity;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], PaymentGatewayEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        default: true,
    }),
    tslib_1.__metadata("design:type", Boolean)
], PaymentGatewayEntity.prototype, "enabled", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], PaymentGatewayEntity.prototype, "title", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('enum', {
        enum: payment_gateway_type_enum_1.PaymentGatewayType,
    }),
    tslib_1.__metadata("design:type", String)
], PaymentGatewayEntity.prototype, "type", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        type: 'text',
    }),
    tslib_1.__metadata("design:type", String)
], PaymentGatewayEntity.prototype, "publicKey", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
    }),
    tslib_1.__metadata("design:type", String)
], PaymentGatewayEntity.prototype, "privateKey", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'text' }),
    tslib_1.__metadata("design:type", String)
], PaymentGatewayEntity.prototype, "saltKey", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        type: 'text',
    }),
    tslib_1.__metadata("design:type", String)
], PaymentGatewayEntity.prototype, "merchantId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], PaymentGatewayEntity.prototype, "deletedAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToOne)(() => media_entity_1.MediaEntity, (media) => media.paymentGateway, {
        nullable: true,
    }),
    (0, typeorm_1.JoinColumn)(),
    tslib_1.__metadata("design:type", media_entity_1.MediaEntity)
], PaymentGatewayEntity.prototype, "media", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Number)
], PaymentGatewayEntity.prototype, "mediaId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => request_entity_1.RequestEntity, (order) => order.paymentGateway),
    tslib_1.__metadata("design:type", Array)
], PaymentGatewayEntity.prototype, "orders", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => rider_transaction_entity_1.RiderTransactionEntity, (userTransaction) => userTransaction.paymentGateway),
    tslib_1.__metadata("design:type", Array)
], PaymentGatewayEntity.prototype, "riderTransactions", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => provider_transaction_entity_1.ProviderTransactionEntity, (adminTransaction) => adminTransaction.paymentGateway),
    tslib_1.__metadata("design:type", Array)
], PaymentGatewayEntity.prototype, "adminTransactions", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => gateway_to_user_entity_1.GatewayToUserEntity, (gatewayToUser) => gatewayToUser.gateway),
    tslib_1.__metadata("design:type", Array)
], PaymentGatewayEntity.prototype, "userIds", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => saved_payment_method_entity_1.SavedPaymentMethodEntity, (savedPaymentMethod) => savedPaymentMethod.paymentGateway),
    tslib_1.__metadata("design:type", Array)
], PaymentGatewayEntity.prototype, "savedPaymentMethods", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => payout_account_entity_1.PayoutAccountEntity, (payout) => payout.paymentGateway),
    tslib_1.__metadata("design:type", Array)
], PaymentGatewayEntity.prototype, "payoutAccounts", void 0);
exports.PaymentGatewayEntity = PaymentGatewayEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)('payment_gateway')
], PaymentGatewayEntity);


/***/ }),
/* 34 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RiderTransactionEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(10);
const rider_deduct_transaction_type_enum_1 = __webpack_require__(35);
const rider_recharge_transaction_type_enum_1 = __webpack_require__(36);
const transaction_action_enum_1 = __webpack_require__(17);
const transaction_status_enum_1 = __webpack_require__(18);
const operator_entity_1 = __webpack_require__(19);
const request_entity_1 = __webpack_require__(23);
const payment_gateway_entity_1 = __webpack_require__(33);
const rider_entity_1 = __webpack_require__(26);
const gift_code_entity_1 = __webpack_require__(37);
let RiderTransactionEntity = class RiderTransactionEntity {
};
exports.RiderTransactionEntity = RiderTransactionEntity;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], RiderTransactionEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'transactionTime' }),
    tslib_1.__metadata("design:type", Date)
], RiderTransactionEntity.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('enum', {
        enum: transaction_status_enum_1.TransactionStatus,
        default: transaction_status_enum_1.TransactionStatus.Processing,
    }),
    tslib_1.__metadata("design:type", String)
], RiderTransactionEntity.prototype, "status", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('enum', { enum: transaction_action_enum_1.TransactionAction }),
    tslib_1.__metadata("design:type", String)
], RiderTransactionEntity.prototype, "action", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('enum', {
        enum: rider_deduct_transaction_type_enum_1.RiderDeductTransactionType,
        nullable: true,
    }),
    tslib_1.__metadata("design:type", String)
], RiderTransactionEntity.prototype, "deductType", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('enum', {
        enum: rider_recharge_transaction_type_enum_1.RiderRechargeTransactionType,
        nullable: true,
    }),
    tslib_1.__metadata("design:type", String)
], RiderTransactionEntity.prototype, "rechargeType", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('float', {
        default: '0.00',
        precision: 10,
        scale: 2,
    }),
    tslib_1.__metadata("design:type", Number)
], RiderTransactionEntity.prototype, "amount", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('char', { length: '3' }),
    tslib_1.__metadata("design:type", String)
], RiderTransactionEntity.prototype, "currency", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true, name: 'documentNumber' }),
    tslib_1.__metadata("design:type", String)
], RiderTransactionEntity.prototype, "refrenceNumber", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true, name: 'details' }),
    tslib_1.__metadata("design:type", String)
], RiderTransactionEntity.prototype, "description", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => rider_entity_1.RiderEntity, (rider) => rider.transactions),
    tslib_1.__metadata("design:type", rider_entity_1.RiderEntity)
], RiderTransactionEntity.prototype, "rider", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], RiderTransactionEntity.prototype, "riderId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => payment_gateway_entity_1.PaymentGatewayEntity, (gateway) => gateway.riderTransactions),
    tslib_1.__metadata("design:type", payment_gateway_entity_1.PaymentGatewayEntity)
], RiderTransactionEntity.prototype, "paymentGateway", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Number)
], RiderTransactionEntity.prototype, "paymentGatewayId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => operator_entity_1.OperatorEntity, (operator) => operator.riderTransactions),
    tslib_1.__metadata("design:type", operator_entity_1.OperatorEntity)
], RiderTransactionEntity.prototype, "operator", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true, name: 'operatorId' }),
    tslib_1.__metadata("design:type", Number)
], RiderTransactionEntity.prototype, "operatorId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToOne)(() => gift_code_entity_1.GiftCodeEntity, (giftCard) => giftCard.riderTransaction),
    (0, typeorm_1.JoinColumn)(),
    tslib_1.__metadata("design:type", gift_code_entity_1.GiftCodeEntity)
], RiderTransactionEntity.prototype, "giftCard", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Number)
], RiderTransactionEntity.prototype, "giftCardId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => request_entity_1.RequestEntity, (order) => order.riderTransactions),
    tslib_1.__metadata("design:type", request_entity_1.RequestEntity)
], RiderTransactionEntity.prototype, "request", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Number)
], RiderTransactionEntity.prototype, "requestId", void 0);
exports.RiderTransactionEntity = RiderTransactionEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)('rider_transaction')
], RiderTransactionEntity);


/***/ }),
/* 35 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RiderDeductTransactionType = void 0;
const graphql_1 = __webpack_require__(6);
var RiderDeductTransactionType;
(function (RiderDeductTransactionType) {
    RiderDeductTransactionType["OrderFee"] = "OrderFee";
    RiderDeductTransactionType["ParkingFee"] = "ParkingFee";
    RiderDeductTransactionType["CancellationFee"] = "CancellationFee";
    RiderDeductTransactionType["Withdraw"] = "Withdraw";
    RiderDeductTransactionType["Correction"] = "Correction";
})(RiderDeductTransactionType || (exports.RiderDeductTransactionType = RiderDeductTransactionType = {}));
(0, graphql_1.registerEnumType)(RiderDeductTransactionType, {
    name: 'RiderDeductTransactionType',
});


/***/ }),
/* 36 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RiderRechargeTransactionType = void 0;
const graphql_1 = __webpack_require__(6);
var RiderRechargeTransactionType;
(function (RiderRechargeTransactionType) {
    RiderRechargeTransactionType["BankTransfer"] = "BankTransfer";
    RiderRechargeTransactionType["Gift"] = "Gift";
    RiderRechargeTransactionType["Correction"] = "Correction";
    RiderRechargeTransactionType["InAppPayment"] = "InAppPayment";
})(RiderRechargeTransactionType || (exports.RiderRechargeTransactionType = RiderRechargeTransactionType = {}));
(0, graphql_1.registerEnumType)(RiderRechargeTransactionType, { name: 'RiderRechargeTransactionType' });


/***/ }),
/* 37 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GiftCodeEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(10);
const rider_transaction_entity_1 = __webpack_require__(34);
const driver_transaction_entity_1 = __webpack_require__(14);
const gift_batch_entity_1 = __webpack_require__(38);
let GiftCodeEntity = class GiftCodeEntity {
};
exports.GiftCodeEntity = GiftCodeEntity;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], GiftCodeEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], GiftCodeEntity.prototype, "code", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    tslib_1.__metadata("design:type", Date)
], GiftCodeEntity.prototype, "usedAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToOne)(() => driver_transaction_entity_1.DriverTransactionEntity, (driverTransaction) => driverTransaction.giftCard),
    tslib_1.__metadata("design:type", driver_transaction_entity_1.DriverTransactionEntity)
], GiftCodeEntity.prototype, "driverTransaction", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToOne)(() => rider_transaction_entity_1.RiderTransactionEntity, (riderTransaction) => riderTransaction.giftCard),
    tslib_1.__metadata("design:type", rider_transaction_entity_1.RiderTransactionEntity)
], GiftCodeEntity.prototype, "riderTransaction", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => gift_batch_entity_1.GiftBatchEntity, (gift) => gift.giftCodes),
    tslib_1.__metadata("design:type", gift_batch_entity_1.GiftBatchEntity)
], GiftCodeEntity.prototype, "gift", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], GiftCodeEntity.prototype, "giftId", void 0);
exports.GiftCodeEntity = GiftCodeEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)('gift_code')
], GiftCodeEntity);


/***/ }),
/* 38 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GiftBatchEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(10);
const gift_code_entity_1 = __webpack_require__(37);
const operator_entity_1 = __webpack_require__(19);
let GiftBatchEntity = class GiftBatchEntity {
};
exports.GiftBatchEntity = GiftBatchEntity;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], GiftBatchEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], GiftBatchEntity.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], GiftBatchEntity.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('varchar', {
        length: 3,
    }),
    tslib_1.__metadata("design:type", String)
], GiftBatchEntity.prototype, "currency", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('float', {
        precision: 10,
        scale: 2,
    }),
    tslib_1.__metadata("design:type", Number)
], GiftBatchEntity.prototype, "amount", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    tslib_1.__metadata("design:type", Date)
], GiftBatchEntity.prototype, "availableFrom", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    tslib_1.__metadata("design:type", Date)
], GiftBatchEntity.prototype, "expireAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => operator_entity_1.OperatorEntity, (operator) => operator.giftBatchesCreated),
    tslib_1.__metadata("design:type", operator_entity_1.OperatorEntity)
], GiftBatchEntity.prototype, "createdByOperator", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], GiftBatchEntity.prototype, "createdByOperatorId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => gift_code_entity_1.GiftCodeEntity, (giftCode) => giftCode.gift),
    tslib_1.__metadata("design:type", Array)
], GiftBatchEntity.prototype, "giftCodes", void 0);
exports.GiftBatchEntity = GiftBatchEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)('gift')
], GiftBatchEntity);


/***/ }),
/* 39 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PaymentGatewayType = void 0;
const graphql_1 = __webpack_require__(6);
var PaymentGatewayType;
(function (PaymentGatewayType) {
    PaymentGatewayType["Stripe"] = "stripe";
    PaymentGatewayType["BrainTree"] = "braintree";
    PaymentGatewayType["PayPal"] = "paypal";
    PaymentGatewayType["Paytm"] = "paytm";
    PaymentGatewayType["Razorpay"] = "razorpay";
    PaymentGatewayType["Paystack"] = "paystack";
    PaymentGatewayType["PayU"] = "payu";
    PaymentGatewayType["Instamojo"] = "instamojo";
    PaymentGatewayType["Flutterwave"] = "flutterwave";
    PaymentGatewayType["PayGate"] = "paygate";
    PaymentGatewayType["MIPS"] = "mips";
    PaymentGatewayType["MercadoPago"] = "mercadopago";
    PaymentGatewayType["AmazonPaymentServices"] = "amazon";
    PaymentGatewayType["MyTMoney"] = "mytmoney";
    PaymentGatewayType["WayForPay"] = "wayforpay";
    PaymentGatewayType["MyFatoorah"] = "MyFatoorah";
    PaymentGatewayType["SberBank"] = "SberBank";
    PaymentGatewayType["BinancePay"] = "BinancePay";
    PaymentGatewayType["OpenPix"] = "OpenPix";
    PaymentGatewayType["PayTR"] = "PayTR";
    PaymentGatewayType["CustomLink"] = "link";
})(PaymentGatewayType || (exports.PaymentGatewayType = PaymentGatewayType = {}));
(0, graphql_1.registerEnumType)(PaymentGatewayType, { name: 'PaymentGatewayType' });


/***/ }),
/* 40 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProviderTransactionEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(10);
const provider_deduct_transaction_type_enum_1 = __webpack_require__(41);
const provider_recharge_transaction_type_enum_1 = __webpack_require__(42);
const transaction_action_enum_1 = __webpack_require__(17);
const operator_entity_1 = __webpack_require__(19);
const payment_gateway_entity_1 = __webpack_require__(33);
const request_entity_1 = __webpack_require__(23);
let ProviderTransactionEntity = class ProviderTransactionEntity {
};
exports.ProviderTransactionEntity = ProviderTransactionEntity;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], ProviderTransactionEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'transactionTime' }),
    tslib_1.__metadata("design:type", Date)
], ProviderTransactionEntity.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('enum', { enum: transaction_action_enum_1.TransactionAction }),
    tslib_1.__metadata("design:type", String)
], ProviderTransactionEntity.prototype, "action", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('enum', {
        enum: provider_deduct_transaction_type_enum_1.ProviderDeductTransactionType,
        nullable: true
    }),
    tslib_1.__metadata("design:type", String)
], ProviderTransactionEntity.prototype, "deductType", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('enum', {
        enum: provider_recharge_transaction_type_enum_1.ProviderRechargeTransactionType,
        nullable: true
    }),
    tslib_1.__metadata("design:type", String)
], ProviderTransactionEntity.prototype, "rechargeType", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('float', {
        default: '0.00',
        precision: 10,
        scale: 2
    }),
    tslib_1.__metadata("design:type", Number)
], ProviderTransactionEntity.prototype, "amount", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('char', { length: 3 }),
    tslib_1.__metadata("design:type", String)
], ProviderTransactionEntity.prototype, "currency", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true, name: 'documentNumber' }),
    tslib_1.__metadata("design:type", String)
], ProviderTransactionEntity.prototype, "refrenceNumber", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true, name: 'details' }),
    tslib_1.__metadata("design:type", String)
], ProviderTransactionEntity.prototype, "description", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => operator_entity_1.OperatorEntity, operator => operator.providerTransactions),
    tslib_1.__metadata("design:type", operator_entity_1.OperatorEntity)
], ProviderTransactionEntity.prototype, "operator", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Number)
], ProviderTransactionEntity.prototype, "operatorId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => request_entity_1.RequestEntity, order => order.providerTransactions, { onDelete: 'CASCADE' }),
    tslib_1.__metadata("design:type", request_entity_1.RequestEntity)
], ProviderTransactionEntity.prototype, "request", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Number)
], ProviderTransactionEntity.prototype, "requestId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => payment_gateway_entity_1.PaymentGatewayEntity, gateway => gateway.adminTransactions, { onDelete: 'CASCADE' }),
    tslib_1.__metadata("design:type", payment_gateway_entity_1.PaymentGatewayEntity)
], ProviderTransactionEntity.prototype, "paymentGateway", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Number)
], ProviderTransactionEntity.prototype, "paymentGatewayId", void 0);
exports.ProviderTransactionEntity = ProviderTransactionEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)('admin_transaction')
], ProviderTransactionEntity);


/***/ }),
/* 41 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProviderDeductTransactionType = void 0;
const graphql_1 = __webpack_require__(6);
var ProviderDeductTransactionType;
(function (ProviderDeductTransactionType) {
    ProviderDeductTransactionType["Withdraw"] = "Withdraw";
})(ProviderDeductTransactionType || (exports.ProviderDeductTransactionType = ProviderDeductTransactionType = {}));
(0, graphql_1.registerEnumType)(ProviderDeductTransactionType, { name: 'ProviderDeductTransactionType' });


/***/ }),
/* 42 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProviderRechargeTransactionType = void 0;
const graphql_1 = __webpack_require__(6);
var ProviderRechargeTransactionType;
(function (ProviderRechargeTransactionType) {
    ProviderRechargeTransactionType["Commission"] = "Commission";
})(ProviderRechargeTransactionType || (exports.ProviderRechargeTransactionType = ProviderRechargeTransactionType = {}));
(0, graphql_1.registerEnumType)(ProviderRechargeTransactionType, { name: 'ProviderRechargeTransactionType' });


/***/ }),
/* 43 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GatewayToUserEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(10);
const payment_gateway_entity_1 = __webpack_require__(33);
let GatewayToUserEntity = class GatewayToUserEntity {
};
exports.GatewayToUserEntity = GatewayToUserEntity;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], GatewayToUserEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => payment_gateway_entity_1.PaymentGatewayEntity, (gateway) => gateway.userIds),
    tslib_1.__metadata("design:type", payment_gateway_entity_1.PaymentGatewayEntity)
], GatewayToUserEntity.prototype, "gateway", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], GatewayToUserEntity.prototype, "gatewayId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], GatewayToUserEntity.prototype, "internalUserId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], GatewayToUserEntity.prototype, "externalReferenceNumber", void 0);
exports.GatewayToUserEntity = GatewayToUserEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)('gateway_to_user')
], GatewayToUserEntity);


/***/ }),
/* 44 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SavedPaymentMethodEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(10);
const saved_payment_method_type_1 = __webpack_require__(45);
const rider_entity_1 = __webpack_require__(26);
const driver_entity_1 = __webpack_require__(12);
const payment_gateway_entity_1 = __webpack_require__(33);
const card_type_enum_1 = __webpack_require__(46);
const request_entity_1 = __webpack_require__(23);
let SavedPaymentMethodEntity = class SavedPaymentMethodEntity {
};
exports.SavedPaymentMethodEntity = SavedPaymentMethodEntity;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], SavedPaymentMethodEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], SavedPaymentMethodEntity.prototype, "title", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    tslib_1.__metadata("design:type", String)
], SavedPaymentMethodEntity.prototype, "lastFour", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        default: true,
    }),
    tslib_1.__metadata("design:type", Boolean)
], SavedPaymentMethodEntity.prototype, "isEnabled", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        default: false,
    }),
    tslib_1.__metadata("design:type", Boolean)
], SavedPaymentMethodEntity.prototype, "isDefault", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('enum', {
        enum: saved_payment_method_type_1.SavedPaymentMethodType,
    }),
    tslib_1.__metadata("design:type", String)
], SavedPaymentMethodEntity.prototype, "type", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('enum', {
        enum: card_type_enum_1.ProviderBrand,
        nullable: true,
    }),
    tslib_1.__metadata("design:type", String)
], SavedPaymentMethodEntity.prototype, "providerBrand", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    tslib_1.__metadata("design:type", Date)
], SavedPaymentMethodEntity.prototype, "expiryDate", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    tslib_1.__metadata("design:type", String)
], SavedPaymentMethodEntity.prototype, "holderName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => rider_entity_1.RiderEntity, (rider) => rider.savedPaymentMethods),
    tslib_1.__metadata("design:type", rider_entity_1.RiderEntity)
], SavedPaymentMethodEntity.prototype, "rider", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    tslib_1.__metadata("design:type", Number)
], SavedPaymentMethodEntity.prototype, "riderId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => driver_entity_1.DriverEntity, (driver) => driver.savedPaymentMethods),
    tslib_1.__metadata("design:type", driver_entity_1.DriverEntity)
], SavedPaymentMethodEntity.prototype, "driver", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    tslib_1.__metadata("design:type", Number)
], SavedPaymentMethodEntity.prototype, "driverId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], SavedPaymentMethodEntity.prototype, "token", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => payment_gateway_entity_1.PaymentGatewayEntity, (gateway) => gateway.savedPaymentMethods),
    tslib_1.__metadata("design:type", payment_gateway_entity_1.PaymentGatewayEntity)
], SavedPaymentMethodEntity.prototype, "paymentGateway", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], SavedPaymentMethodEntity.prototype, "paymentGatewayId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => request_entity_1.RequestEntity, (order) => order.savedPaymentMethod),
    tslib_1.__metadata("design:type", Array)
], SavedPaymentMethodEntity.prototype, "orders", void 0);
exports.SavedPaymentMethodEntity = SavedPaymentMethodEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)('saved_payment_method')
], SavedPaymentMethodEntity);


/***/ }),
/* 45 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SavedPaymentMethodType = void 0;
const graphql_1 = __webpack_require__(6);
var SavedPaymentMethodType;
(function (SavedPaymentMethodType) {
    SavedPaymentMethodType["CARD"] = "CARD";
    SavedPaymentMethodType["BANK_ACCOUNT"] = "BANK_ACCOUNT";
})(SavedPaymentMethodType || (exports.SavedPaymentMethodType = SavedPaymentMethodType = {}));
(0, graphql_1.registerEnumType)(SavedPaymentMethodType, {
    name: 'SavedPaymentMethodType',
    description: 'Saved payment method type',
});


/***/ }),
/* 46 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProviderBrand = void 0;
const graphql_1 = __webpack_require__(6);
var ProviderBrand;
(function (ProviderBrand) {
    ProviderBrand["Visa"] = "visa";
    ProviderBrand["Mastercard"] = "mastercard";
    ProviderBrand["Amex"] = "amex";
    ProviderBrand["Discover"] = "discover";
    ProviderBrand["Diners"] = "diners";
    ProviderBrand["EftPosAu"] = "eftpos_au";
    ProviderBrand["JCB"] = "jcb";
    ProviderBrand["UnionPay"] = "unionpay";
    ProviderBrand["Unknown"] = "unknown";
})(ProviderBrand || (exports.ProviderBrand = ProviderBrand = {}));
(0, graphql_1.registerEnumType)(ProviderBrand, {
    name: 'ProviderBrand',
    description: 'Brand of the provider wether bank name or card provider',
});


/***/ }),
/* 47 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PayoutAccountEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(10);
const driver_entity_1 = __webpack_require__(12);
const payment_gateway_entity_1 = __webpack_require__(33);
const payout_method_entity_1 = __webpack_require__(48);
const saved_payment_method_type_1 = __webpack_require__(45);
const driver_transaction_entity_1 = __webpack_require__(14);
let PayoutAccountEntity = class PayoutAccountEntity {
};
exports.PayoutAccountEntity = PayoutAccountEntity;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], PayoutAccountEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], PayoutAccountEntity.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => driver_entity_1.DriverEntity, (driver) => driver.payoutAccounts),
    tslib_1.__metadata("design:type", driver_entity_1.DriverEntity)
], PayoutAccountEntity.prototype, "driver", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], PayoutAccountEntity.prototype, "driverId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => payment_gateway_entity_1.PaymentGatewayEntity, (gateway) => gateway.payoutAccounts),
    tslib_1.__metadata("design:type", payment_gateway_entity_1.PaymentGatewayEntity)
], PayoutAccountEntity.prototype, "paymentGateway", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    tslib_1.__metadata("design:type", Number)
], PayoutAccountEntity.prototype, "paymentGatewayId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('enum', {
        enum: saved_payment_method_type_1.SavedPaymentMethodType,
    }),
    tslib_1.__metadata("design:type", String)
], PayoutAccountEntity.prototype, "type", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], PayoutAccountEntity.prototype, "last4", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], PayoutAccountEntity.prototype, "currency", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => payout_method_entity_1.PayoutMethodEntity, (payoutMethod) => payoutMethod.payoutAccounts),
    tslib_1.__metadata("design:type", payout_method_entity_1.PayoutMethodEntity)
], PayoutAccountEntity.prototype, "payoutMethod", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], PayoutAccountEntity.prototype, "payoutMethodId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    tslib_1.__metadata("design:type", String)
], PayoutAccountEntity.prototype, "token", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    tslib_1.__metadata("design:type", String)
], PayoutAccountEntity.prototype, "accountNumber", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    tslib_1.__metadata("design:type", String)
], PayoutAccountEntity.prototype, "routingNumber", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    tslib_1.__metadata("design:type", String)
], PayoutAccountEntity.prototype, "accountHolderName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    tslib_1.__metadata("design:type", String)
], PayoutAccountEntity.prototype, "bankName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    tslib_1.__metadata("design:type", String)
], PayoutAccountEntity.prototype, "branchName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    tslib_1.__metadata("design:type", String)
], PayoutAccountEntity.prototype, "accountHolderAddress", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    tslib_1.__metadata("design:type", String)
], PayoutAccountEntity.prototype, "accountHolderCity", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    tslib_1.__metadata("design:type", String)
], PayoutAccountEntity.prototype, "accountHolderState", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    tslib_1.__metadata("design:type", String)
], PayoutAccountEntity.prototype, "accountHolderZip", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    tslib_1.__metadata("design:type", String)
], PayoutAccountEntity.prototype, "accountHolderCountry", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    tslib_1.__metadata("design:type", String)
], PayoutAccountEntity.prototype, "accountHolderPhone", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    tslib_1.__metadata("design:type", Date)
], PayoutAccountEntity.prototype, "accountHolderDateOfBirth", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        default: false,
    }),
    tslib_1.__metadata("design:type", Boolean)
], PayoutAccountEntity.prototype, "isVerified", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        default: false,
    }),
    tslib_1.__metadata("design:type", Boolean)
], PayoutAccountEntity.prototype, "isDefault", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], PayoutAccountEntity.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], PayoutAccountEntity.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], PayoutAccountEntity.prototype, "deletedAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => driver_transaction_entity_1.DriverTransactionEntity, (driverTransaction) => driverTransaction.payoutAccount),
    tslib_1.__metadata("design:type", Array)
], PayoutAccountEntity.prototype, "driverTransactions", void 0);
exports.PayoutAccountEntity = PayoutAccountEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)('payout_account')
], PayoutAccountEntity);


/***/ }),
/* 48 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PayoutMethodEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(10);
const media_entity_1 = __webpack_require__(30);
const payout_method_type_enum_1 = __webpack_require__(49);
const payout_account_entity_1 = __webpack_require__(47);
const payout_session_entity_1 = __webpack_require__(50);
const driver_transaction_entity_1 = __webpack_require__(14);
let PayoutMethodEntity = class PayoutMethodEntity {
};
exports.PayoutMethodEntity = PayoutMethodEntity;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], PayoutMethodEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        default: true,
    }),
    tslib_1.__metadata("design:type", Boolean)
], PayoutMethodEntity.prototype, "enabled", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], PayoutMethodEntity.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], PayoutMethodEntity.prototype, "currency", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    tslib_1.__metadata("design:type", String)
], PayoutMethodEntity.prototype, "description", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('enum', {
        enum: payout_method_type_enum_1.PayoutMethodType,
    }),
    tslib_1.__metadata("design:type", String)
], PayoutMethodEntity.prototype, "type", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        type: 'text',
    }),
    tslib_1.__metadata("design:type", String)
], PayoutMethodEntity.prototype, "publicKey", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        type: 'text',
    }),
    tslib_1.__metadata("design:type", String)
], PayoutMethodEntity.prototype, "privateKey", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'text' }),
    tslib_1.__metadata("design:type", String)
], PayoutMethodEntity.prototype, "saltKey", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        type: 'text',
    }),
    tslib_1.__metadata("design:type", String)
], PayoutMethodEntity.prototype, "merchantId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], PayoutMethodEntity.prototype, "deletedAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToOne)(() => media_entity_1.MediaEntity, (media) => media.payoutMethod, {
        nullable: true,
    }),
    (0, typeorm_1.JoinColumn)(),
    tslib_1.__metadata("design:type", media_entity_1.MediaEntity)
], PayoutMethodEntity.prototype, "media", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Number)
], PayoutMethodEntity.prototype, "mediaId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => payout_account_entity_1.PayoutAccountEntity, (payoutAccount) => payoutAccount.payoutMethod),
    tslib_1.__metadata("design:type", Array)
], PayoutMethodEntity.prototype, "payoutAccounts", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToMany)(() => payout_session_entity_1.PayoutSessionEntity, (payoutSession) => payoutSession.payoutMethods),
    tslib_1.__metadata("design:type", Array)
], PayoutMethodEntity.prototype, "payoutSessions", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => driver_transaction_entity_1.DriverTransactionEntity, (driverTransaction) => driverTransaction.payoutMethod),
    tslib_1.__metadata("design:type", Array)
], PayoutMethodEntity.prototype, "driverTransactions", void 0);
exports.PayoutMethodEntity = PayoutMethodEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)('payout_method')
], PayoutMethodEntity);


/***/ }),
/* 49 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PayoutMethodType = void 0;
const graphql_1 = __webpack_require__(6);
var PayoutMethodType;
(function (PayoutMethodType) {
    PayoutMethodType["Stripe"] = "stripe";
    PayoutMethodType["BankTransfer"] = "bank_transfer";
})(PayoutMethodType || (exports.PayoutMethodType = PayoutMethodType = {}));
(0, graphql_1.registerEnumType)(PayoutMethodType, {
    name: 'PayoutMethodType',
    description: 'The type of payout method',
});


/***/ }),
/* 50 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PayoutSessionEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(10);
const driver_transaction_entity_1 = __webpack_require__(14);
const payout_session_status_enum_1 = __webpack_require__(51);
const operator_entity_1 = __webpack_require__(19);
const payout_method_entity_1 = __webpack_require__(48);
let PayoutSessionEntity = class PayoutSessionEntity {
};
exports.PayoutSessionEntity = PayoutSessionEntity;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], PayoutSessionEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], PayoutSessionEntity.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    tslib_1.__metadata("design:type", Date)
], PayoutSessionEntity.prototype, "processedAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    tslib_1.__metadata("design:type", String)
], PayoutSessionEntity.prototype, "description", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        default: payout_session_status_enum_1.PayoutSessionStatus.PENDING,
        type: 'enum',
        enum: payout_session_status_enum_1.PayoutSessionStatus,
    }),
    tslib_1.__metadata("design:type", String)
], PayoutSessionEntity.prototype, "status", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToMany)(() => payout_method_entity_1.PayoutMethodEntity, (payoutMethod) => payoutMethod.payoutSessions, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinTable)(),
    tslib_1.__metadata("design:type", Array)
], PayoutSessionEntity.prototype, "payoutMethods", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => driver_transaction_entity_1.DriverTransactionEntity, (driverTransaction) => driverTransaction.payoutSession),
    tslib_1.__metadata("design:type", Array)
], PayoutSessionEntity.prototype, "driverTransactions", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('float', {
        default: '0.00',
        precision: 10,
        scale: 2,
    }),
    tslib_1.__metadata("design:type", Number)
], PayoutSessionEntity.prototype, "totalAmount", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], PayoutSessionEntity.prototype, "currency", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => operator_entity_1.OperatorEntity, (operator) => operator.payoutSessionsCreated),
    tslib_1.__metadata("design:type", operator_entity_1.OperatorEntity)
], PayoutSessionEntity.prototype, "createdByOperator", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], PayoutSessionEntity.prototype, "createdByOperatorId", void 0);
exports.PayoutSessionEntity = PayoutSessionEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)('payout_session')
], PayoutSessionEntity);


/***/ }),
/* 51 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PayoutSessionStatus = void 0;
const graphql_1 = __webpack_require__(6);
var PayoutSessionStatus;
(function (PayoutSessionStatus) {
    PayoutSessionStatus["PENDING"] = "pending";
    PayoutSessionStatus["PAID"] = "paid";
    PayoutSessionStatus["FAILED"] = "failed";
    PayoutSessionStatus["CANCELLED"] = "cancelled";
})(PayoutSessionStatus || (exports.PayoutSessionStatus = PayoutSessionStatus = {}));
(0, graphql_1.registerEnumType)(PayoutSessionStatus, {
    name: 'PayoutSessionStatus',
    description: undefined,
});


/***/ }),
/* 52 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(10);
const distance_multiplier_transformer_1 = __webpack_require__(53);
const time_multiplier_transformer_1 = __webpack_require__(54);
const coupon_entity_1 = __webpack_require__(25);
const driver_entity_1 = __webpack_require__(12);
const service_distance_fee_mode_enum_1 = __webpack_require__(55);
const service_payment_method_enum_1 = __webpack_require__(56);
const media_entity_1 = __webpack_require__(30);
const request_entity_1 = __webpack_require__(23);
const region_entity_1 = __webpack_require__(57);
const service_category_entity_1 = __webpack_require__(59);
const service_option_entity_1 = __webpack_require__(60);
const zone_price_entity_1 = __webpack_require__(63);
const weekday_multiplier_transformer_1 = __webpack_require__(69);
const date_range_multiplier_transformer_1 = __webpack_require__(70);
let ServiceEntity = class ServiceEntity {
};
exports.ServiceEntity = ServiceEntity;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], ServiceEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => service_category_entity_1.ServiceCategoryEntity, (category) => category.services, {
        onDelete: 'CASCADE',
    }),
    tslib_1.__metadata("design:type", service_category_entity_1.ServiceCategoryEntity)
], ServiceEntity.prototype, "category", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], ServiceEntity.prototype, "categoryId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'title' }),
    tslib_1.__metadata("design:type", String)
], ServiceEntity.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], ServiceEntity.prototype, "description", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('smallint', { nullable: true }),
    tslib_1.__metadata("design:type", Number)
], ServiceEntity.prototype, "personCapacity", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('float', {
        default: '0.00',
        precision: 12,
        scale: 2,
    }),
    tslib_1.__metadata("design:type", Number)
], ServiceEntity.prototype, "baseFare", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('float', {
        default: '0.00',
        precision: 12,
        scale: 2,
    }),
    tslib_1.__metadata("design:type", Number)
], ServiceEntity.prototype, "perHundredMeters", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('float', {
        default: '0.00',
        precision: 12,
        scale: 2,
    }),
    tslib_1.__metadata("design:type", Number)
], ServiceEntity.prototype, "perMinuteDrive", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('float', {
        default: '0.00',
        precision: 12,
        scale: 2,
    }),
    tslib_1.__metadata("design:type", Number)
], ServiceEntity.prototype, "perMinuteWait", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('float', {
        default: '0.00',
        precision: 10,
        scale: 2,
    }),
    tslib_1.__metadata("design:type", Number)
], ServiceEntity.prototype, "minimumFee", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('int', {
        default: 10000,
    }),
    tslib_1.__metadata("design:type", Number)
], ServiceEntity.prototype, "searchRadius", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: service_payment_method_enum_1.ServicePaymentMethod,
        default: service_payment_method_enum_1.ServicePaymentMethod.CashCredit,
    }),
    tslib_1.__metadata("design:type", String)
], ServiceEntity.prototype, "paymentMethod", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('enum', {
        enum: service_distance_fee_mode_enum_1.ServiceDistanceFeeMode,
        default: service_distance_fee_mode_enum_1.ServiceDistanceFeeMode.PickupToDestination,
    }),
    tslib_1.__metadata("design:type", String)
], ServiceEntity.prototype, "distanceFeeMode", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('time', {
        default: '00:00',
    }),
    tslib_1.__metadata("design:type", String)
], ServiceEntity.prototype, "availableTimeFrom", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('time', {
        default: '23:59',
    }),
    tslib_1.__metadata("design:type", String)
], ServiceEntity.prototype, "availableTimeTo", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('int', { default: 0, name: 'maxDestinationDistance' }),
    tslib_1.__metadata("design:type", Number)
], ServiceEntity.prototype, "maximumDestinationDistance", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('tinyint', { default: 0 }),
    tslib_1.__metadata("design:type", Number)
], ServiceEntity.prototype, "prepayPercent", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ default: false }),
    tslib_1.__metadata("design:type", Boolean)
], ServiceEntity.prototype, "twoWayAvailable", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('float', {
        default: '0.00',
        precision: 10,
        scale: 2,
    }),
    tslib_1.__metadata("design:type", Number)
], ServiceEntity.prototype, "cancellationTotalFee", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('float', {
        default: '0.00',
        precision: 10,
        scale: 2,
    }),
    tslib_1.__metadata("design:type", Number)
], ServiceEntity.prototype, "cancellationDriverShare", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('tinyint', { default: 0 }),
    tslib_1.__metadata("design:type", Number)
], ServiceEntity.prototype, "providerSharePercent", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('float', {
        default: '0.00',
        precision: 10,
        scale: 2,
    }),
    tslib_1.__metadata("design:type", Number)
], ServiceEntity.prototype, "providerShareFlat", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('float', {
        nullable: true,
        precision: 10,
        scale: 2,
    }),
    tslib_1.__metadata("design:type", Number)
], ServiceEntity.prototype, "roundingFactor", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToOne)(() => media_entity_1.MediaEntity, (media) => media.service),
    (0, typeorm_1.JoinColumn)(),
    tslib_1.__metadata("design:type", media_entity_1.MediaEntity)
], ServiceEntity.prototype, "media", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], ServiceEntity.prototype, "mediaId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('simple-array', {
        nullable: true,
        transformer: new time_multiplier_transformer_1.TimeMultiplierTransformer(),
    }),
    tslib_1.__metadata("design:type", Array)
], ServiceEntity.prototype, "timeMultipliers", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('simple-array', {
        nullable: true,
        transformer: new distance_multiplier_transformer_1.DistanceMultiplierTransformer(),
    }),
    tslib_1.__metadata("design:type", Array)
], ServiceEntity.prototype, "distanceMultipliers", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('simple-array', {
        nullable: true,
        transformer: new date_range_multiplier_transformer_1.DateRangeMultiplierTransformer(),
    }),
    tslib_1.__metadata("design:type", Array)
], ServiceEntity.prototype, "dateRangeMultipliers", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('simple-array', {
        nullable: true,
        transformer: new weekday_multiplier_transformer_1.WeekdayMultiplierTransformer(),
    }),
    tslib_1.__metadata("design:type", Array)
], ServiceEntity.prototype, "weekdayMultipliers", void 0);
tslib_1.__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], ServiceEntity.prototype, "deletedAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('float', { default: 1.0 }),
    tslib_1.__metadata("design:type", Number)
], ServiceEntity.prototype, "touristMultiplier", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToMany)(() => driver_entity_1.DriverEntity, (driver) => driver.enabledServices),
    tslib_1.__metadata("design:type", Array)
], ServiceEntity.prototype, "drivers", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToMany)(() => coupon_entity_1.CouponEntity, (coupon) => coupon.allowedServices),
    tslib_1.__metadata("design:type", Array)
], ServiceEntity.prototype, "allowedCoupons", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToMany)(() => region_entity_1.RegionEntity, (region) => region.services),
    (0, typeorm_1.JoinTable)(),
    tslib_1.__metadata("design:type", Array)
], ServiceEntity.prototype, "regions", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => request_entity_1.RequestEntity, (order) => order.service),
    tslib_1.__metadata("design:type", Array)
], ServiceEntity.prototype, "requests", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToMany)(() => service_option_entity_1.ServiceOptionEntity, (serviceOption) => serviceOption.services),
    (0, typeorm_1.JoinTable)(),
    tslib_1.__metadata("design:type", Array)
], ServiceEntity.prototype, "options", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToMany)(() => zone_price_entity_1.ZonePriceEntity, (zonePrice) => zonePrice.fleets),
    tslib_1.__metadata("design:type", zone_price_entity_1.ZonePriceEntity)
], ServiceEntity.prototype, "zonePrices", void 0);
exports.ServiceEntity = ServiceEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)('service')
], ServiceEntity);


/***/ }),
/* 53 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DistanceMultiplierTransformer = void 0;
class DistanceMultiplierTransformer {
    to(value) {
        if (value == null) {
            return [];
        }
        return value.map((row) => `${row.distanceFrom}-${row.distanceTo}|${row.multiply}`);
    }
    from(value) {
        if (value == null) {
            return [];
        }
        return value.map(str => {
            return {
                distanceFrom: parseInt(str.split('|')[0].split('-')[0]),
                distanceTo: parseInt(str.split('|')[0].split('-')[1]),
                multiply: parseFloat(str.split('|')[1])
            };
        });
    }
}
exports.DistanceMultiplierTransformer = DistanceMultiplierTransformer;


/***/ }),
/* 54 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TimeMultiplierTransformer = void 0;
class TimeMultiplierTransformer {
    to(value) {
        if (value == null) {
            return [];
        }
        return value.map((row) => `${row.startTime}-${row.endTime}|${row.multiply}`);
    }
    from(value) {
        if (value == null) {
            return [];
        }
        return value.map(str => {
            return {
                startTime: str.split('|')[0].split('-')[0],
                endTime: str.split('|')[0].split('-')[1],
                multiply: parseFloat(str.split('|')[1])
            };
        });
    }
}
exports.TimeMultiplierTransformer = TimeMultiplierTransformer;


/***/ }),
/* 55 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceDistanceFeeMode = void 0;
const graphql_1 = __webpack_require__(6);
var ServiceDistanceFeeMode;
(function (ServiceDistanceFeeMode) {
    ServiceDistanceFeeMode["None"] = "None";
    ServiceDistanceFeeMode["PickupToDestination"] = "PickupToDestination";
    ServiceDistanceFeeMode["Radial"] = "Radial";
})(ServiceDistanceFeeMode || (exports.ServiceDistanceFeeMode = ServiceDistanceFeeMode = {}));
(0, graphql_1.registerEnumType)(ServiceDistanceFeeMode, { name: 'ServiceDistanceFeeMode' });


/***/ }),
/* 56 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServicePaymentMethod = void 0;
const graphql_1 = __webpack_require__(6);
var ServicePaymentMethod;
(function (ServicePaymentMethod) {
    ServicePaymentMethod["CashCredit"] = "CashCredit";
    ServicePaymentMethod["OnlyCredit"] = "OnlyCredit";
    ServicePaymentMethod["OnlyCash"] = "OnlyCash";
})(ServicePaymentMethod || (exports.ServicePaymentMethod = ServicePaymentMethod = {}));
(0, graphql_1.registerEnumType)(ServicePaymentMethod, { name: 'ServicePaymentMethod' });


/***/ }),
/* 57 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RegionEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(10);
const polygon_transformer_1 = __webpack_require__(58);
const service_entity_1 = __webpack_require__(52);
let RegionEntity = class RegionEntity {
};
exports.RegionEntity = RegionEntity;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], RegionEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], RegionEntity.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('char', { length: 3 }),
    tslib_1.__metadata("design:type", String)
], RegionEntity.prototype, "currency", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        default: true
    }),
    tslib_1.__metadata("design:type", Boolean)
], RegionEntity.prototype, "enabled", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("polygon", {
        transformer: new polygon_transformer_1.PolygonTransformer()
    }),
    tslib_1.__metadata("design:type", Array)
], RegionEntity.prototype, "location", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToMany)(() => service_entity_1.ServiceEntity, service => service.regions),
    tslib_1.__metadata("design:type", Array)
], RegionEntity.prototype, "services", void 0);
exports.RegionEntity = RegionEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)('region')
], RegionEntity);


/***/ }),
/* 58 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PolygonTransformer = void 0;
class PolygonTransformer {
    to(value) {
        if (value == null)
            return null;
        const str = value.map((x) => {
            const ar = x.map((y) => `${y.lng} ${y.lat}`);
            return ar.join(',');
        }).join('),(');
        return `POLYGON((${str}))`;
    }
    from(value) {
        if (value == null || value == undefined) {
            return [];
        }
        return value.substring(8, value.length - 1).split('),(').map(x => {
            const res = x.substring(1, x.length - 1).split(',').map(y => {
                const s = y.split(' ');
                return {
                    lng: parseFloat(s[0]),
                    lat: parseFloat(s[1])
                };
            });
            return res;
        });
    }
}
exports.PolygonTransformer = PolygonTransformer;


/***/ }),
/* 59 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceCategoryEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(10);
const service_entity_1 = __webpack_require__(52);
let ServiceCategoryEntity = class ServiceCategoryEntity {
};
exports.ServiceCategoryEntity = ServiceCategoryEntity;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], ServiceCategoryEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'title' }),
    tslib_1.__metadata("design:type", String)
], ServiceCategoryEntity.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => service_entity_1.ServiceEntity, service => service.category),
    tslib_1.__metadata("design:type", Array)
], ServiceCategoryEntity.prototype, "services", void 0);
tslib_1.__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], ServiceCategoryEntity.prototype, "deletedAt", void 0);
exports.ServiceCategoryEntity = ServiceCategoryEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)('service_category')
], ServiceCategoryEntity);


/***/ }),
/* 60 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceOptionEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(10);
const service_option_icon_enum_1 = __webpack_require__(61);
const service_option_type_enum_1 = __webpack_require__(62);
const request_entity_1 = __webpack_require__(23);
const service_entity_1 = __webpack_require__(52);
let ServiceOptionEntity = class ServiceOptionEntity {
};
exports.ServiceOptionEntity = ServiceOptionEntity;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], ServiceOptionEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], ServiceOptionEntity.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    tslib_1.__metadata("design:type", String)
], ServiceOptionEntity.prototype, "description", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('enum', {
        enum: service_option_type_enum_1.ServiceOptionType,
    }),
    tslib_1.__metadata("design:type", String)
], ServiceOptionEntity.prototype, "type", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('float', {
        precision: 12,
        scale: 2,
        nullable: true,
    }),
    tslib_1.__metadata("design:type", Number)
], ServiceOptionEntity.prototype, "additionalFee", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('enum', {
        enum: service_option_icon_enum_1.ServiceOptionIcon,
    }),
    tslib_1.__metadata("design:type", String)
], ServiceOptionEntity.prototype, "icon", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToMany)(() => service_entity_1.ServiceEntity, (service) => service.options),
    tslib_1.__metadata("design:type", service_entity_1.ServiceEntity)
], ServiceOptionEntity.prototype, "services", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToMany)(() => request_entity_1.RequestEntity, (request) => request.options),
    tslib_1.__metadata("design:type", Array)
], ServiceOptionEntity.prototype, "requests", void 0);
exports.ServiceOptionEntity = ServiceOptionEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)('service_option')
], ServiceOptionEntity);


/***/ }),
/* 61 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceOptionIcon = void 0;
const graphql_1 = __webpack_require__(6);
var ServiceOptionIcon;
(function (ServiceOptionIcon) {
    ServiceOptionIcon["Pet"] = "Pet";
    ServiceOptionIcon["TwoWay"] = "TwoWay";
    ServiceOptionIcon["Luggage"] = "Luggage";
    ServiceOptionIcon["PackageDelivery"] = "PackageDelivery";
    ServiceOptionIcon["Shopping"] = "Shopping";
    ServiceOptionIcon["Custom1"] = "Custom1";
    ServiceOptionIcon["Custom2"] = "Custom2";
    ServiceOptionIcon["Custom3"] = "Custom3";
    ServiceOptionIcon["Custom4"] = "Custom4";
    ServiceOptionIcon["Custom5"] = "Custom5";
})(ServiceOptionIcon || (exports.ServiceOptionIcon = ServiceOptionIcon = {}));
(0, graphql_1.registerEnumType)(ServiceOptionIcon, { name: 'ServiceOptionIcon' });


/***/ }),
/* 62 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceOptionType = void 0;
const graphql_1 = __webpack_require__(6);
var ServiceOptionType;
(function (ServiceOptionType) {
    ServiceOptionType["Free"] = "Free";
    ServiceOptionType["Paid"] = "Paid";
    ServiceOptionType["TwoWay"] = "TwoWay";
})(ServiceOptionType || (exports.ServiceOptionType = ServiceOptionType = {}));
(0, graphql_1.registerEnumType)(ServiceOptionType, { name: 'ServiceOptionType' });


/***/ }),
/* 63 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ZonePriceEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(10);
const polygon_transformer_1 = __webpack_require__(58);
const time_multiplier_transformer_1 = __webpack_require__(54);
const fleet_entity_1 = __webpack_require__(64);
const service_entity_1 = __webpack_require__(52);
let ZonePriceEntity = class ZonePriceEntity {
};
exports.ZonePriceEntity = ZonePriceEntity;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], ZonePriceEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], ZonePriceEntity.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("polygon", {
        transformer: new polygon_transformer_1.PolygonTransformer()
    }),
    tslib_1.__metadata("design:type", Array)
], ZonePriceEntity.prototype, "from", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("polygon", {
        transformer: new polygon_transformer_1.PolygonTransformer()
    }),
    tslib_1.__metadata("design:type", Array)
], ZonePriceEntity.prototype, "to", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('float', {
        default: '0.00',
        precision: 10,
        scale: 2
    }),
    tslib_1.__metadata("design:type", Number)
], ZonePriceEntity.prototype, "cost", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('simple-array', {
        nullable: true,
        transformer: new time_multiplier_transformer_1.TimeMultiplierTransformer()
    }),
    tslib_1.__metadata("design:type", Array)
], ZonePriceEntity.prototype, "timeMultipliers", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToMany)(() => fleet_entity_1.FleetEntity, fleet => fleet.zonePrices),
    (0, typeorm_1.JoinTable)(),
    tslib_1.__metadata("design:type", Array)
], ZonePriceEntity.prototype, "fleets", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToMany)(() => service_entity_1.ServiceEntity, service => service.zonePrices),
    (0, typeorm_1.JoinTable)(),
    tslib_1.__metadata("design:type", Array)
], ZonePriceEntity.prototype, "services", void 0);
exports.ZonePriceEntity = ZonePriceEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)('zone_price')
], ZonePriceEntity);


/***/ }),
/* 64 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FleetEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(10);
const polygon_transformer_1 = __webpack_require__(58);
const driver_entity_1 = __webpack_require__(12);
const fleet_device_entity_1 = __webpack_require__(65);
const fleet_transaction_entity_1 = __webpack_require__(67);
const fleet_wallet_entity_1 = __webpack_require__(68);
const operator_entity_1 = __webpack_require__(19);
const request_entity_1 = __webpack_require__(23);
const zone_price_entity_1 = __webpack_require__(63);
let FleetEntity = class FleetEntity {
};
exports.FleetEntity = FleetEntity;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], FleetEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], FleetEntity.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('bigint'),
    tslib_1.__metadata("design:type", String)
], FleetEntity.prototype, "phoneNumber", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], FleetEntity.prototype, "accountNumber", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('bigint'),
    tslib_1.__metadata("design:type", String)
], FleetEntity.prototype, "mobileNumber", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('tinyint', { default: 0 }),
    tslib_1.__metadata("design:type", Number)
], FleetEntity.prototype, "commissionSharePercent", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('float', { default: 0 }),
    tslib_1.__metadata("design:type", Number)
], FleetEntity.prototype, "commissionShareFlat", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('varchar', { nullable: true }),
    tslib_1.__metadata("design:type", String)
], FleetEntity.prototype, "address", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    tslib_1.__metadata("design:type", String)
], FleetEntity.prototype, "userName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    tslib_1.__metadata("design:type", String)
], FleetEntity.prototype, "password", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('float', {
        precision: 10,
        scale: 2,
        nullable: true,
    }),
    tslib_1.__metadata("design:type", Number)
], FleetEntity.prototype, "feeMultiplier", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('polygon', {
        transformer: new polygon_transformer_1.PolygonTransformer(),
        nullable: true,
    }),
    tslib_1.__metadata("design:type", Array)
], FleetEntity.prototype, "exclusivityAreas", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => driver_entity_1.DriverEntity, (driver) => driver.fleet),
    tslib_1.__metadata("design:type", Array)
], FleetEntity.prototype, "drivers", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => fleet_wallet_entity_1.FleetWalletEntity, (wallet) => wallet.fleet),
    tslib_1.__metadata("design:type", Array)
], FleetEntity.prototype, "wallet", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => fleet_transaction_entity_1.FleetTransactionEntity, (fleetTransaction) => fleetTransaction.fleet, { onDelete: 'CASCADE', onUpdate: 'RESTRICT' }),
    tslib_1.__metadata("design:type", Array)
], FleetEntity.prototype, "transactions", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => operator_entity_1.OperatorEntity, (operator) => operator.fleet),
    tslib_1.__metadata("design:type", Array)
], FleetEntity.prototype, "operators", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToMany)(() => zone_price_entity_1.ZonePriceEntity, (zonePrice) => zonePrice.fleets),
    tslib_1.__metadata("design:type", zone_price_entity_1.ZonePriceEntity)
], FleetEntity.prototype, "zonePrices", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => fleet_device_entity_1.FleetDeviceEntity, (fleetDevice) => fleetDevice.fleet),
    tslib_1.__metadata("design:type", Array)
], FleetEntity.prototype, "devices", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => request_entity_1.RequestEntity, (request) => request.fleet),
    tslib_1.__metadata("design:type", Array)
], FleetEntity.prototype, "requests", void 0);
exports.FleetEntity = FleetEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)('fleet')
], FleetEntity);


/***/ }),
/* 65 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FleetDeviceEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(10);
const device_platform_enum_1 = __webpack_require__(66);
const fleet_entity_1 = __webpack_require__(64);
let FleetDeviceEntity = class FleetDeviceEntity {
};
exports.FleetDeviceEntity = FleetDeviceEntity;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], FleetDeviceEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('enum', {
        enum: device_platform_enum_1.DevicePlatform,
        nullable: true,
    }),
    tslib_1.__metadata("design:type", String)
], FleetDeviceEntity.prototype, "devicePlatform", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], FleetDeviceEntity.prototype, "deviceName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], FleetDeviceEntity.prototype, "ipAddress", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], FleetDeviceEntity.prototype, "jwt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ default: () => 'CURRENT_TIMESTAMP' }),
    tslib_1.__metadata("design:type", Date)
], FleetDeviceEntity.prototype, "lastSeenAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ default: false }),
    tslib_1.__metadata("design:type", Boolean)
], FleetDeviceEntity.prototype, "isTerminated", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => fleet_entity_1.FleetEntity, (fleet) => fleet.devices),
    tslib_1.__metadata("design:type", fleet_entity_1.FleetEntity)
], FleetDeviceEntity.prototype, "fleet", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], FleetDeviceEntity.prototype, "fleetId", void 0);
exports.FleetDeviceEntity = FleetDeviceEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)('fleet_device')
], FleetDeviceEntity);


/***/ }),
/* 66 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DevicePlatform = void 0;
const graphql_1 = __webpack_require__(6);
var DevicePlatform;
(function (DevicePlatform) {
    DevicePlatform["Android"] = "ANDROID";
    DevicePlatform["Ios"] = "IOS";
    DevicePlatform["Web"] = "WEB";
    DevicePlatform["MacOS"] = "MACOS";
    DevicePlatform["Windows"] = "WINDOWS";
    DevicePlatform["Linux"] = "LINUX";
})(DevicePlatform || (exports.DevicePlatform = DevicePlatform = {}));
(0, graphql_1.registerEnumType)(DevicePlatform, { name: 'DevicePlatform' });


/***/ }),
/* 67 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FleetTransactionEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(10);
const driver_entity_1 = __webpack_require__(12);
const provider_deduct_transaction_type_enum_1 = __webpack_require__(41);
const provider_recharge_transaction_type_enum_1 = __webpack_require__(42);
const transaction_action_enum_1 = __webpack_require__(17);
const fleet_entity_1 = __webpack_require__(64);
const operator_entity_1 = __webpack_require__(19);
const request_entity_1 = __webpack_require__(23);
let FleetTransactionEntity = class FleetTransactionEntity {
};
exports.FleetTransactionEntity = FleetTransactionEntity;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], FleetTransactionEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'transactionTime' }),
    tslib_1.__metadata("design:type", Date)
], FleetTransactionEntity.prototype, "transactionTimestamp", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('enum', { enum: transaction_action_enum_1.TransactionAction }),
    tslib_1.__metadata("design:type", String)
], FleetTransactionEntity.prototype, "action", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('enum', {
        enum: provider_deduct_transaction_type_enum_1.ProviderDeductTransactionType,
        nullable: true
    }),
    tslib_1.__metadata("design:type", String)
], FleetTransactionEntity.prototype, "deductType", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('enum', {
        enum: provider_recharge_transaction_type_enum_1.ProviderRechargeTransactionType,
        nullable: true
    }),
    tslib_1.__metadata("design:type", String)
], FleetTransactionEntity.prototype, "rechargeType", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('float', {
        default: '0.00',
        precision: 10,
        scale: 2
    }),
    tslib_1.__metadata("design:type", Number)
], FleetTransactionEntity.prototype, "amount", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('char', { length: '3' }),
    tslib_1.__metadata("design:type", String)
], FleetTransactionEntity.prototype, "currency", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true, name: 'documentNumber' }),
    tslib_1.__metadata("design:type", String)
], FleetTransactionEntity.prototype, "refrenceNumber", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true, name: 'details' }),
    tslib_1.__metadata("design:type", String)
], FleetTransactionEntity.prototype, "description", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => request_entity_1.RequestEntity, order => order.fleetTransactions),
    tslib_1.__metadata("design:type", request_entity_1.RequestEntity)
], FleetTransactionEntity.prototype, "request", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Number)
], FleetTransactionEntity.prototype, "requestId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => driver_entity_1.DriverEntity, driver => driver.fleetTransactions),
    tslib_1.__metadata("design:type", driver_entity_1.DriverEntity)
], FleetTransactionEntity.prototype, "driver", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Number)
], FleetTransactionEntity.prototype, "driverId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => fleet_entity_1.FleetEntity, fleet => fleet.transactions),
    tslib_1.__metadata("design:type", fleet_entity_1.FleetEntity)
], FleetTransactionEntity.prototype, "fleet", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], FleetTransactionEntity.prototype, "fleetId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => operator_entity_1.OperatorEntity, operator => operator.fleetTransactions),
    tslib_1.__metadata("design:type", operator_entity_1.OperatorEntity)
], FleetTransactionEntity.prototype, "operator", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true, name: 'operatorId' }),
    tslib_1.__metadata("design:type", Number)
], FleetTransactionEntity.prototype, "operatorId", void 0);
exports.FleetTransactionEntity = FleetTransactionEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)('fleet_transaction')
], FleetTransactionEntity);


/***/ }),
/* 68 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FleetWalletEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(10);
const fleet_entity_1 = __webpack_require__(64);
let FleetWalletEntity = class FleetWalletEntity {
};
exports.FleetWalletEntity = FleetWalletEntity;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], FleetWalletEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('float', {
        default: 0.0,
        name: 'amount'
    }),
    tslib_1.__metadata("design:type", Number)
], FleetWalletEntity.prototype, "balance", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], FleetWalletEntity.prototype, "currency", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => fleet_entity_1.FleetEntity, fleet => fleet.wallet),
    tslib_1.__metadata("design:type", fleet_entity_1.FleetEntity)
], FleetWalletEntity.prototype, "fleet", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], FleetWalletEntity.prototype, "fleetId", void 0);
exports.FleetWalletEntity = FleetWalletEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)('fleet_wallet')
], FleetWalletEntity);


/***/ }),
/* 69 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WeekdayMultiplierTransformer = void 0;
class WeekdayMultiplierTransformer {
    to(value) {
        if (value == null) {
            return [];
        }
        return value.map((row) => `${row.weekday}|${row.multiply}`);
    }
    from(value) {
        if (value == null) {
            return [];
        }
        return value.map((str) => {
            return {
                weekday: str.split('|')[0],
                multiply: parseFloat(str.split('|')[1]),
            };
        });
    }
}
exports.WeekdayMultiplierTransformer = WeekdayMultiplierTransformer;


/***/ }),
/* 70 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DateRangeMultiplierTransformer = void 0;
class DateRangeMultiplierTransformer {
    to(value) {
        if (value == null) {
            return [];
        }
        return value.map((row) => `${row.startDate}-${row.endDate}|${row.multiply}`);
    }
    from(value) {
        if (value == null) {
            return [];
        }
        return value.map((str) => {
            return {
                startDate: parseInt(str.split('|')[0].split('-')[0]),
                endDate: parseInt(str.split('|')[0].split('-')[1]),
                multiply: parseFloat(str.split('|')[1]),
            };
        });
    }
}
exports.DateRangeMultiplierTransformer = DateRangeMultiplierTransformer;


/***/ }),
/* 71 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RiderAddressEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(10);
const point_1 = __webpack_require__(72);
const point_transformer_1 = __webpack_require__(73);
const rider_address_type_enum_1 = __webpack_require__(74);
const rider_entity_1 = __webpack_require__(26);
let RiderAddressEntity = class RiderAddressEntity {
};
exports.RiderAddressEntity = RiderAddressEntity;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], RiderAddressEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('enum', {
        enum: rider_address_type_enum_1.RiderAddressType,
        default: rider_address_type_enum_1.RiderAddressType.Other
    }),
    tslib_1.__metadata("design:type", String)
], RiderAddressEntity.prototype, "type", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], RiderAddressEntity.prototype, "title", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true, name: 'address' }),
    tslib_1.__metadata("design:type", String)
], RiderAddressEntity.prototype, "details", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('point', {
        transformer: new point_transformer_1.PointTransformer()
    }),
    tslib_1.__metadata("design:type", point_1.Point)
], RiderAddressEntity.prototype, "location", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => rider_entity_1.RiderEntity, rider => rider.addresses),
    tslib_1.__metadata("design:type", rider_entity_1.RiderEntity)
], RiderAddressEntity.prototype, "rider", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], RiderAddressEntity.prototype, "riderId", void 0);
exports.RiderAddressEntity = RiderAddressEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)('rider_address')
], RiderAddressEntity);


/***/ }),
/* 72 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Point = void 0;
const tslib_1 = __webpack_require__(1);
const graphql_1 = __webpack_require__(6);
let Point = class Point {
};
exports.Point = Point;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    tslib_1.__metadata("design:type", Number)
], Point.prototype, "lat", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    tslib_1.__metadata("design:type", Number)
], Point.prototype, "lng", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    tslib_1.__metadata("design:type", Number)
], Point.prototype, "heading", void 0);
exports.Point = Point = tslib_1.__decorate([
    (0, graphql_1.ObjectType)(),
    (0, graphql_1.InputType)('PointInput')
], Point);


/***/ }),
/* 73 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PointTransformer = void 0;
class PointTransformer {
    to(value) {
        if (value == null)
            return null;
        return `POINT(${value.lng} ${value.lat})`;
    }
    from(value) {
        if (value == null || value == '') {
            return null;
        }
        const a = value.substring(6, value.length - 1).split(' ');
        return {
            lng: parseFloat(a[0]),
            lat: parseFloat(a[1]),
        };
    }
}
exports.PointTransformer = PointTransformer;


/***/ }),
/* 74 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RiderAddressType = void 0;
const graphql_1 = __webpack_require__(6);
var RiderAddressType;
(function (RiderAddressType) {
    RiderAddressType["Home"] = "Home";
    RiderAddressType["Work"] = "Work";
    RiderAddressType["Partner"] = "Partner";
    RiderAddressType["Gym"] = "Gym";
    RiderAddressType["Parent"] = "Parent";
    RiderAddressType["Cafe"] = "Cafe";
    RiderAddressType["Park"] = "Park";
    RiderAddressType["Other"] = "Other";
})(RiderAddressType || (exports.RiderAddressType = RiderAddressType = {}));
(0, graphql_1.registerEnumType)(RiderAddressType, { name: 'RiderAddressType' });


/***/ }),
/* 75 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RiderWalletEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(10);
const rider_entity_1 = __webpack_require__(26);
let RiderWalletEntity = class RiderWalletEntity {
};
exports.RiderWalletEntity = RiderWalletEntity;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], RiderWalletEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('float', {
        default: 0.0,
        name: 'amount'
    }),
    tslib_1.__metadata("design:type", Number)
], RiderWalletEntity.prototype, "balance", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('char', { length: 3 }),
    tslib_1.__metadata("design:type", String)
], RiderWalletEntity.prototype, "currency", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => rider_entity_1.RiderEntity, rider => rider.wallets),
    tslib_1.__metadata("design:type", rider_entity_1.RiderEntity)
], RiderWalletEntity.prototype, "rider", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], RiderWalletEntity.prototype, "riderId", void 0);
exports.RiderWalletEntity = RiderWalletEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)('rider_wallet')
], RiderWalletEntity);


/***/ }),
/* 76 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RiderReviewEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(10);
const rider_entity_1 = __webpack_require__(26);
const driver_entity_1 = __webpack_require__(12);
const request_entity_1 = __webpack_require__(23);
let RiderReviewEntity = class RiderReviewEntity {
};
exports.RiderReviewEntity = RiderReviewEntity;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], RiderReviewEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('tinyint'),
    tslib_1.__metadata("design:type", Number)
], RiderReviewEntity.prototype, "score", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'review', nullable: true }),
    tslib_1.__metadata("design:type", String)
], RiderReviewEntity.prototype, "description", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => rider_entity_1.RiderEntity, (rider) => rider.reviewsForRider),
    tslib_1.__metadata("design:type", rider_entity_1.RiderEntity)
], RiderReviewEntity.prototype, "rider", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], RiderReviewEntity.prototype, "riderId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => driver_entity_1.DriverEntity, (driver) => driver.reviewsByDriver),
    tslib_1.__metadata("design:type", driver_entity_1.DriverEntity)
], RiderReviewEntity.prototype, "driver", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], RiderReviewEntity.prototype, "driverId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], RiderReviewEntity.prototype, "reviewTimestamp", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToOne)(() => request_entity_1.RequestEntity, (order) => order.driverReviewForRider),
    (0, typeorm_1.JoinColumn)(),
    tslib_1.__metadata("design:type", request_entity_1.RequestEntity)
], RiderReviewEntity.prototype, "request", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], RiderReviewEntity.prototype, "orderId", void 0);
exports.RiderReviewEntity = RiderReviewEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)('rider_review')
], RiderReviewEntity);


/***/ }),
/* 77 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderStatus = void 0;
const graphql_1 = __webpack_require__(6);
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["Requested"] = "Requested";
    OrderStatus["NotFound"] = "NotFound";
    OrderStatus["NoCloseFound"] = "NoCloseFound";
    OrderStatus["Found"] = "Found";
    OrderStatus["DriverAccepted"] = "DriverAccepted";
    OrderStatus["Arrived"] = "Arrived";
    OrderStatus["WaitingForPrePay"] = "WaitingForPrePay";
    OrderStatus["DriverCanceled"] = "DriverCanceled";
    OrderStatus["RiderCanceled"] = "RiderCanceled";
    OrderStatus["Started"] = "Started";
    OrderStatus["WaitingForPostPay"] = "WaitingForPostPay";
    OrderStatus["WaitingForReview"] = "WaitingForReview";
    OrderStatus["Finished"] = "Finished";
    OrderStatus["Booked"] = "Booked";
    OrderStatus["Expired"] = "Expired";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
(0, graphql_1.registerEnumType)(OrderStatus, { name: 'OrderStatus' });


/***/ }),
/* 78 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FeedbackEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(10);
const driver_entity_1 = __webpack_require__(12);
const feedback_parameter_entity_1 = __webpack_require__(79);
const request_entity_1 = __webpack_require__(23);
let FeedbackEntity = class FeedbackEntity {
};
exports.FeedbackEntity = FeedbackEntity;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], FeedbackEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], FeedbackEntity.prototype, "reviewTimestamp", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('tinyint'),
    tslib_1.__metadata("design:type", Number)
], FeedbackEntity.prototype, "score", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ name: 'review', nullable: true }),
    tslib_1.__metadata("design:type", String)
], FeedbackEntity.prototype, "description", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => driver_entity_1.DriverEntity, (driver) => driver.feedbacks),
    tslib_1.__metadata("design:type", driver_entity_1.DriverEntity)
], FeedbackEntity.prototype, "driver", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], FeedbackEntity.prototype, "driverId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToOne)(() => request_entity_1.RequestEntity, (order) => order.review),
    (0, typeorm_1.JoinColumn)(),
    tslib_1.__metadata("design:type", request_entity_1.RequestEntity)
], FeedbackEntity.prototype, "request", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Number)
], FeedbackEntity.prototype, "requestId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToMany)(() => feedback_parameter_entity_1.FeedbackParameterEntity, (feedbackParameter) => feedbackParameter.feedbacks),
    tslib_1.__metadata("design:type", Array)
], FeedbackEntity.prototype, "parameters", void 0);
exports.FeedbackEntity = FeedbackEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)('request_review')
], FeedbackEntity);


/***/ }),
/* 79 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FeedbackParameterEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(10);
const feedback_entity_1 = __webpack_require__(78);
let FeedbackParameterEntity = class FeedbackParameterEntity {
};
exports.FeedbackParameterEntity = FeedbackParameterEntity;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], FeedbackParameterEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], FeedbackParameterEntity.prototype, "title", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Boolean)
], FeedbackParameterEntity.prototype, "isGood", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToMany)(() => feedback_entity_1.FeedbackEntity, feedback => feedback.parameters),
    (0, typeorm_1.JoinTable)(),
    tslib_1.__metadata("design:type", Array)
], FeedbackParameterEntity.prototype, "feedbacks", void 0);
exports.FeedbackParameterEntity = FeedbackParameterEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)('review_parameter')
], FeedbackParameterEntity);


/***/ }),
/* 80 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderMessageEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(10);
const message_status_enum_1 = __webpack_require__(81);
const request_entity_1 = __webpack_require__(23);
let OrderMessageEntity = class OrderMessageEntity {
};
exports.OrderMessageEntity = OrderMessageEntity;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], OrderMessageEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], OrderMessageEntity.prototype, "sentAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Boolean)
], OrderMessageEntity.prototype, "sentByDriver", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('enum', {
        name: 'state',
        enum: message_status_enum_1.MessageStatus,
        default: message_status_enum_1.MessageStatus.Sent
    }),
    tslib_1.__metadata("design:type", String)
], OrderMessageEntity.prototype, "status", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], OrderMessageEntity.prototype, "content", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => request_entity_1.RequestEntity, order => order.conversation),
    tslib_1.__metadata("design:type", request_entity_1.RequestEntity)
], OrderMessageEntity.prototype, "request", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], OrderMessageEntity.prototype, "requestId", void 0);
exports.OrderMessageEntity = OrderMessageEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)('request_chat')
], OrderMessageEntity);


/***/ }),
/* 81 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MessageStatus = void 0;
const graphql_1 = __webpack_require__(6);
var MessageStatus;
(function (MessageStatus) {
    MessageStatus["Sent"] = "sent";
    MessageStatus["Delivered"] = "delivered";
    MessageStatus["Seen"] = "seen";
})(MessageStatus || (exports.MessageStatus = MessageStatus = {}));
(0, graphql_1.registerEnumType)(MessageStatus, { name: 'MessageStatus' });


/***/ }),
/* 82 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RequestActivityEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(10);
const request_activity_type_enum_1 = __webpack_require__(83);
const request_entity_1 = __webpack_require__(23);
let RequestActivityEntity = class RequestActivityEntity {
};
exports.RequestActivityEntity = RequestActivityEntity;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], RequestActivityEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('enum', {
        enum: request_activity_type_enum_1.RequestActivityType
    }),
    tslib_1.__metadata("design:type", String)
], RequestActivityEntity.prototype, "type", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], RequestActivityEntity.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => request_entity_1.RequestEntity, (request) => request.activities),
    tslib_1.__metadata("design:type", request_entity_1.RequestEntity)
], RequestActivityEntity.prototype, "request", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], RequestActivityEntity.prototype, "requestId", void 0);
exports.RequestActivityEntity = RequestActivityEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)('request_activity')
], RequestActivityEntity);


/***/ }),
/* 83 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RequestActivityType = void 0;
const graphql_1 = __webpack_require__(6);
var RequestActivityType;
(function (RequestActivityType) {
    RequestActivityType["RequestedByOperator"] = "RequestedByOperator";
    RequestActivityType["BookedByOperator"] = "BookedByOperator";
    RequestActivityType["RequestedByRider"] = "RequestedByRider";
    RequestActivityType["BookedByRider"] = "BookedByRider";
    RequestActivityType["DriverAccepted"] = "DriverAccepted";
    RequestActivityType["ArrivedToPickupPoint"] = "ArrivedToPickupPoint";
    RequestActivityType["CanceledByDriver"] = "CanceledByDriver";
    RequestActivityType["CanceledByRider"] = "CanceledByRider";
    RequestActivityType["CanceledByOperator"] = "CanceledByOperator";
    RequestActivityType["Started"] = "Started";
    RequestActivityType["ArrivedToDestination"] = "ArrivedToDestination";
    RequestActivityType["Paid"] = "Paid";
    RequestActivityType["Reviewed"] = "Reviewed";
    RequestActivityType["Expired"] = "Expired";
})(RequestActivityType || (exports.RequestActivityType = RequestActivityType = {}));
(0, graphql_1.registerEnumType)(RequestActivityType, { name: 'RequestActivityType' });


/***/ }),
/* 84 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SOSEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(10);
const point_1 = __webpack_require__(72);
const point_transformer_1 = __webpack_require__(73);
const sos_status_enum_1 = __webpack_require__(85);
const request_entity_1 = __webpack_require__(23);
const sos_activity_entity_1 = __webpack_require__(86);
let SOSEntity = class SOSEntity {
};
exports.SOSEntity = SOSEntity;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], SOSEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], SOSEntity.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('enum', {
        enum: sos_status_enum_1.SOSStatus,
        default: sos_status_enum_1.SOSStatus.Submitted
    }),
    tslib_1.__metadata("design:type", String)
], SOSEntity.prototype, "status", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('point', {
        transformer: new point_transformer_1.PointTransformer(),
        nullable: true
    }),
    tslib_1.__metadata("design:type", point_1.Point)
], SOSEntity.prototype, "location", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => request_entity_1.RequestEntity, request => request.sosCalls),
    tslib_1.__metadata("design:type", request_entity_1.RequestEntity)
], SOSEntity.prototype, "request", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], SOSEntity.prototype, "requestId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Boolean)
], SOSEntity.prototype, "submittedByRider", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => sos_activity_entity_1.SOSActivityEntity, activity => activity.sos),
    tslib_1.__metadata("design:type", Array)
], SOSEntity.prototype, "activities", void 0);
exports.SOSEntity = SOSEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)('sos')
], SOSEntity);


/***/ }),
/* 85 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SOSStatus = void 0;
const graphql_1 = __webpack_require__(6);
var SOSStatus;
(function (SOSStatus) {
    SOSStatus["Submitted"] = "Submitted";
    SOSStatus["UnderReview"] = "UnderReview";
    SOSStatus["FalseAlarm"] = "FalseAlarm";
    SOSStatus["Resolved"] = "Resolved";
})(SOSStatus || (exports.SOSStatus = SOSStatus = {}));
(0, graphql_1.registerEnumType)(SOSStatus, { name: 'SOSStatus' });


/***/ }),
/* 86 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SOSActivityEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(10);
const sos_activity_action_enum_1 = __webpack_require__(87);
const operator_entity_1 = __webpack_require__(19);
const sos_entity_1 = __webpack_require__(84);
let SOSActivityEntity = class SOSActivityEntity {
};
exports.SOSActivityEntity = SOSActivityEntity;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], SOSActivityEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], SOSActivityEntity.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('enum', {
        enum: sos_activity_action_enum_1.SOSActivityAction,
    }),
    tslib_1.__metadata("design:type", String)
], SOSActivityEntity.prototype, "action", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        length: 2000
    }),
    tslib_1.__metadata("design:type", String)
], SOSActivityEntity.prototype, "note", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => operator_entity_1.OperatorEntity, operator => operator.sosActivities),
    tslib_1.__metadata("design:type", operator_entity_1.OperatorEntity)
], SOSActivityEntity.prototype, "operator", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Number)
], SOSActivityEntity.prototype, "operatorId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => sos_entity_1.SOSEntity, sos => sos.activities),
    tslib_1.__metadata("design:type", sos_entity_1.SOSEntity)
], SOSActivityEntity.prototype, "sos", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], SOSActivityEntity.prototype, "sosId", void 0);
exports.SOSActivityEntity = SOSActivityEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)('sos_activity')
], SOSActivityEntity);


/***/ }),
/* 87 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SOSActivityAction = void 0;
const graphql_1 = __webpack_require__(6);
var SOSActivityAction;
(function (SOSActivityAction) {
    SOSActivityAction["Submitted"] = "Submitted";
    SOSActivityAction["Seen"] = "Seen";
    SOSActivityAction["ContactDriver"] = "ContactDriver";
    SOSActivityAction["ContactAuthorities"] = "ContactAuthorities";
    SOSActivityAction["MarkedAsResolved"] = "MarkedAsResolved";
    SOSActivityAction["MarkedAsFalseAlarm"] = "MarkedAsFalseAlarm";
})(SOSActivityAction || (exports.SOSActivityAction = SOSActivityAction = {}));
(0, graphql_1.registerEnumType)(SOSActivityAction, { name: 'SOSActivityAction' });


/***/ }),
/* 88 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderCancelReasonEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(10);
const request_entity_1 = __webpack_require__(23);
const anouncement_user_type_enum_1 = __webpack_require__(32);
let OrderCancelReasonEntity = class OrderCancelReasonEntity {
};
exports.OrderCancelReasonEntity = OrderCancelReasonEntity;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], OrderCancelReasonEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], OrderCancelReasonEntity.prototype, "title", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => request_entity_1.RequestEntity, (request) => request.cancelReason),
    tslib_1.__metadata("design:type", Array)
], OrderCancelReasonEntity.prototype, "orders", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        default: true,
    }),
    tslib_1.__metadata("design:type", Boolean)
], OrderCancelReasonEntity.prototype, "isEnabled", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('enum', {
        enum: anouncement_user_type_enum_1.AnnouncementUserType,
        default: anouncement_user_type_enum_1.AnnouncementUserType.Rider,
        //nullable: true,
    }),
    tslib_1.__metadata("design:type", String)
], OrderCancelReasonEntity.prototype, "userType", void 0);
exports.OrderCancelReasonEntity = OrderCancelReasonEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)('order_cancel_reason')
], OrderCancelReasonEntity);


/***/ }),
/* 89 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PaymentMode = void 0;
const graphql_1 = __webpack_require__(6);
var PaymentMode;
(function (PaymentMode) {
    PaymentMode["Cash"] = "cash";
    PaymentMode["SavedPaymentMethod"] = "savedPaymentMethod";
    PaymentMode["PaymentGateway"] = "paymentGateway";
    PaymentMode["Wallet"] = "wallet";
})(PaymentMode || (exports.PaymentMode = PaymentMode = {}));
(0, graphql_1.registerEnumType)(PaymentMode, {
    name: 'PaymentMode',
    description: 'The means of payment for an order.',
});


/***/ }),
/* 90 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ComplaintActivityType = void 0;
const graphql_1 = __webpack_require__(6);
var ComplaintActivityType;
(function (ComplaintActivityType) {
    ComplaintActivityType["AssignToOperator"] = "AssignedToOperator";
    ComplaintActivityType["Update"] = "Update";
    ComplaintActivityType["Resolved"] = "Resolved";
})(ComplaintActivityType || (exports.ComplaintActivityType = ComplaintActivityType = {}));
(0, graphql_1.registerEnumType)(ComplaintActivityType, { name: 'ComplaintActivityType' });


/***/ }),
/* 91 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EnabledNotification = void 0;
var EnabledNotification;
(function (EnabledNotification) {
    EnabledNotification["SOS"] = "sos";
    EnabledNotification["Complaint"] = "complaint";
    EnabledNotification["Order"] = "order";
    EnabledNotification["DriverSubmittedDocs"] = "driverSubmittedDocs";
})(EnabledNotification || (exports.EnabledNotification = EnabledNotification = {}));


/***/ }),
/* 92 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OperatorRoleEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(10);
const operator_permission_enum_1 = __webpack_require__(93);
const operator_entity_1 = __webpack_require__(19);
let OperatorRoleEntity = class OperatorRoleEntity {
};
exports.OperatorRoleEntity = OperatorRoleEntity;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], OperatorRoleEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], OperatorRoleEntity.prototype, "title", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('set', {
        enum: operator_permission_enum_1.OperatorPermission,
    }),
    tslib_1.__metadata("design:type", Array)
], OperatorRoleEntity.prototype, "permissions", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => operator_entity_1.OperatorEntity, (operator) => operator.role),
    tslib_1.__metadata("design:type", Array)
], OperatorRoleEntity.prototype, "operators", void 0);
exports.OperatorRoleEntity = OperatorRoleEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)('operator_role')
], OperatorRoleEntity);


/***/ }),
/* 93 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OperatorPermission = void 0;
const graphql_1 = __webpack_require__(6);
var OperatorPermission;
(function (OperatorPermission) {
    OperatorPermission["Drivers_View"] = "Drivers_View";
    OperatorPermission["Drivers_Edit"] = "Drivers_Edit";
    OperatorPermission["Riders_View"] = "Riders_View";
    OperatorPermission["Riders_Edit"] = "Riders_Edit";
    OperatorPermission["Regions_View"] = "Regions_View";
    OperatorPermission["Regions_Edit"] = "Regions_Edit";
    OperatorPermission["Services_View"] = "Services_View";
    OperatorPermission["Services_Edit"] = "Services_Edit";
    OperatorPermission["Complaints_View"] = "Complaints_View";
    OperatorPermission["Complaints_Edit"] = "Complaints_Edit";
    OperatorPermission["Coupons_View"] = "Coupons_View";
    OperatorPermission["Coupons_Edit"] = "Coupons_Edit";
    OperatorPermission["Announcements_View"] = "Announcements_View";
    OperatorPermission["Announcements_Edit"] = "Announcements_Edit";
    OperatorPermission["Requests_View"] = "Requests_View";
    OperatorPermission["Fleets_View"] = "Fleets_View";
    OperatorPermission["Fleets_Edit"] = "Fleets_Edit";
    OperatorPermission["Gateways_View"] = "Gateways_View";
    OperatorPermission["Gateways_Edit"] = "Gateways_Edit";
    OperatorPermission["Users_View"] = "Users_View";
    OperatorPermission["Users_Edit"] = "Users_Edit";
    OperatorPermission["Cars_View"] = "Cars_View";
    OperatorPermission["Cars_Edit"] = "Cars_Edit";
    OperatorPermission["FleetWallet_View"] = "FleetWallet_View";
    OperatorPermission["FleetWallet_Edit"] = "FleetWallet_Edit";
    OperatorPermission["ProviderWallet_View"] = "ProviderWallet_View";
    OperatorPermission["ProviderWallet_Edit"] = "ProviderWallet_Edit";
    OperatorPermission["DriverWallet_View"] = "DriverWallet_View";
    OperatorPermission["DriverWallet_Edit"] = "DriverWallet_Edit";
    OperatorPermission["RiderWallet_View"] = "RiderWallet_View";
    OperatorPermission["RiderWallet_Edit"] = "RiderWallet_Edit";
    OperatorPermission["ReviewParameter_Edit"] = "ReviewParameter_Edit";
    OperatorPermission["Payouts_View"] = "Payouts_View";
    OperatorPermission["Payouts_Edit"] = "Payouts_Edit";
    OperatorPermission["GiftBatch_View"] = "GiftBatch_View";
    OperatorPermission["GiftBatch_Create"] = "GiftBatch_Create";
    OperatorPermission["GiftBatch_ViewCodes"] = "GiftBatch_ViewCodes";
    OperatorPermission["SMSProviders_View"] = "SMSProviders_View";
    OperatorPermission["SMSProviders_Edit"] = "SMSProviders_Edit";
})(OperatorPermission || (exports.OperatorPermission = OperatorPermission = {}));
(0, graphql_1.registerEnumType)(OperatorPermission, { name: 'OperatorPermission' });


/***/ }),
/* 94 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DriverWalletEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(10);
const driver_entity_1 = __webpack_require__(12);
let DriverWalletEntity = class DriverWalletEntity {
};
exports.DriverWalletEntity = DriverWalletEntity;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], DriverWalletEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('float', {
        default: 0.0,
        name: 'amount',
    }),
    tslib_1.__metadata("design:type", Number)
], DriverWalletEntity.prototype, "balance", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('char', { length: 3 }),
    tslib_1.__metadata("design:type", String)
], DriverWalletEntity.prototype, "currency", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => driver_entity_1.DriverEntity, (driver) => driver.wallet, {
        onDelete: 'CASCADE',
    }),
    tslib_1.__metadata("design:type", driver_entity_1.DriverEntity)
], DriverWalletEntity.prototype, "driver", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], DriverWalletEntity.prototype, "driverId", void 0);
exports.DriverWalletEntity = DriverWalletEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)('driver_wallet')
], DriverWalletEntity);


/***/ }),
/* 95 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DriverStatus = void 0;
const graphql_1 = __webpack_require__(6);
var DriverStatus;
(function (DriverStatus) {
    DriverStatus["Online"] = "online";
    DriverStatus["Offline"] = "offline";
    DriverStatus["Blocked"] = "blocked";
    DriverStatus["InService"] = "in service";
    DriverStatus["WaitingDocuments"] = "waiting documents";
    DriverStatus["PendingApproval"] = "pending approval";
    DriverStatus["SoftReject"] = "soft reject";
    DriverStatus["HardReject"] = "hard reject";
})(DriverStatus || (exports.DriverStatus = DriverStatus = {}));
(0, graphql_1.registerEnumType)(DriverStatus, { name: 'DriverStatus' });


/***/ }),
/* 96 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProviderWalletEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(10);
let ProviderWalletEntity = class ProviderWalletEntity {
};
exports.ProviderWalletEntity = ProviderWalletEntity;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], ProviderWalletEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('float', {
        default: 0.0,
        name: 'amount'
    }),
    tslib_1.__metadata("design:type", Number)
], ProviderWalletEntity.prototype, "balance", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], ProviderWalletEntity.prototype, "currency", void 0);
exports.ProviderWalletEntity = ProviderWalletEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)('admin_wallet')
], ProviderWalletEntity);


/***/ }),
/* 97 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PaymentEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(10);
const Entity_1 = __webpack_require__(98);
const payment_status_enum_1 = __webpack_require__(99);
let PaymentEntity = class PaymentEntity {
};
exports.PaymentEntity = PaymentEntity;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], PaymentEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('enum', {
        enum: payment_status_enum_1.PaymentStatus,
        default: payment_status_enum_1.PaymentStatus.Processing,
    }),
    tslib_1.__metadata("design:type", String)
], PaymentEntity.prototype, "status", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('float', {
        default: '0.00',
        precision: 10,
        scale: 2,
    }),
    tslib_1.__metadata("design:type", Number)
], PaymentEntity.prototype, "amount", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], PaymentEntity.prototype, "currency", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], PaymentEntity.prototype, "transactionNumber", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    tslib_1.__metadata("design:type", String)
], PaymentEntity.prototype, "externalReferenceNumber", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, typeorm_1.Index)('INDEX_ORDER_NUMBER'),
    tslib_1.__metadata("design:type", String)
], PaymentEntity.prototype, "orderNumber", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], PaymentEntity.prototype, "userType", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], PaymentEntity.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('int'),
    tslib_1.__metadata("design:type", Number)
], PaymentEntity.prototype, "gatewayId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], PaymentEntity.prototype, "returnUrl", void 0);
exports.PaymentEntity = PaymentEntity = tslib_1.__decorate([
    (0, Entity_1.Entity)('payment')
], PaymentEntity);


/***/ }),
/* 98 */
/***/ ((module) => {

module.exports = require("typeorm/decorator/entity/Entity");

/***/ }),
/* 99 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PaymentStatus = void 0;
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["Processing"] = "processing";
    PaymentStatus["Authorized"] = "authorized";
    PaymentStatus["Success"] = "success";
    PaymentStatus["Canceled"] = "canceled";
    PaymentStatus["Failed"] = "failed";
})(PaymentStatus || (exports.PaymentStatus = PaymentStatus = {}));


/***/ }),
/* 100 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DistanceMultiplier = void 0;
const tslib_1 = __webpack_require__(1);
const graphql_1 = __webpack_require__(6);
let DistanceMultiplier = class DistanceMultiplier {
    static _GRAPHQL_METADATA_FACTORY() {
        return { distanceFrom: { type: () => Number }, distanceTo: { type: () => Number }, multiply: { type: () => Number } };
    }
};
exports.DistanceMultiplier = DistanceMultiplier;
exports.DistanceMultiplier = DistanceMultiplier = tslib_1.__decorate([
    (0, graphql_1.InputType)('DistanceMultiplierInput'),
    (0, graphql_1.ObjectType)()
], DistanceMultiplier);


/***/ }),
/* 101 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TimeMultiplier = void 0;
const tslib_1 = __webpack_require__(1);
const graphql_1 = __webpack_require__(6);
let TimeMultiplier = class TimeMultiplier {
    static _GRAPHQL_METADATA_FACTORY() {
        return { startTime: { type: () => String }, endTime: { type: () => String }, multiply: { type: () => Number } };
    }
};
exports.TimeMultiplier = TimeMultiplier;
exports.TimeMultiplier = TimeMultiplier = tslib_1.__decorate([
    (0, graphql_1.InputType)('TimeMultiplierInput'),
    (0, graphql_1.ObjectType)()
], TimeMultiplier);


/***/ }),
/* 102 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RedisPubSubProvider = void 0;
const tslib_1 = __webpack_require__(1);
const nestjs_query_graphql_1 = __webpack_require__(103);
const graphql_redis_subscriptions_1 = __webpack_require__(104);
const ioredis_1 = tslib_1.__importDefault(__webpack_require__(105));
class RedisPubSubProvider {
    static provider() {
        return {
            provide: (0, nestjs_query_graphql_1.pubSubToken)(),
            useFactory: () => {
                const options = {
                    host: process.env.REDIS_HOST || 'localhost',
                    port: 6379
                };
                return new graphql_redis_subscriptions_1.RedisPubSub({
                    publisher: new ioredis_1.default(options),
                    subscriber: new ioredis_1.default(options),
                });
            },
        };
    }
}
exports.RedisPubSubProvider = RedisPubSubProvider;


/***/ }),
/* 103 */
/***/ ((module) => {

module.exports = require("@ptc-org/nestjs-query-graphql");

/***/ }),
/* 104 */
/***/ ((module) => {

module.exports = require("graphql-redis-subscriptions");

/***/ }),
/* 105 */
/***/ ((module) => {

module.exports = require("ioredis");

/***/ }),
/* 106 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CryptoService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const crypto_1 = __webpack_require__(107);
let CryptoService = class CryptoService {
    constructor() {
        this.ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; // Must be 256 bits (32 characters)
        this.IV_LENGTH = 16; // For AES, this is always 16
    }
    async encrypt(text) {
        const iv = (0, crypto_1.randomBytes)(this.IV_LENGTH);
        const cipher = (0, crypto_1.createCipheriv)('aes-256-cbc', Buffer.from(this.ENCRYPTION_KEY), iv);
        let encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return iv.toString('hex') + ':' + encrypted.toString('hex');
    }
    async decrypt(text) {
        const textParts = text.split(':');
        const iv = Buffer.from(textParts.shift(), 'hex');
        const encryptedText = Buffer.from(textParts.join(':'), 'hex');
        const decipher = (0, crypto_1.createDecipheriv)('aes-256-cbc', Buffer.from(this.ENCRYPTION_KEY), iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return JSON.parse(decrypted.toString());
    }
};
exports.CryptoService = CryptoService;
exports.CryptoService = CryptoService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], CryptoService);


/***/ }),
/* 107 */
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),
/* 108 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 109 */
/***/ ((module) => {

module.exports = require("axios");

/***/ }),
/* 110 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountingModule = void 0;
const tslib_1 = __webpack_require__(1);
const nestjs_query_graphql_1 = __webpack_require__(103);
const nestjs_query_typeorm_1 = __webpack_require__(111);
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(7);
const request_entity_1 = __webpack_require__(23);
const provider_transaction_entity_1 = __webpack_require__(40);
const provider_wallet_entity_1 = __webpack_require__(96);
const accounting_resolver_1 = __webpack_require__(112);
const accounting_service_1 = __webpack_require__(119);
const provider_transaction_dto_1 = __webpack_require__(126);
const provider_wallet_dto_1 = __webpack_require__(127);
const jwt_auth_guard_1 = __webpack_require__(115);
const driver_entity_1 = __webpack_require__(12);
const rider_entity_1 = __webpack_require__(26);
const provider_transaction_input_1 = __webpack_require__(128);
let AccountingModule = class AccountingModule {
};
exports.AccountingModule = AccountingModule;
exports.AccountingModule = AccountingModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                provider_transaction_entity_1.ProviderTransactionEntity,
                request_entity_1.RequestEntity,
                driver_entity_1.DriverEntity,
                rider_entity_1.RiderEntity,
            ]),
            nestjs_query_graphql_1.NestjsQueryGraphQLModule.forFeature({
                imports: [
                    nestjs_query_typeorm_1.NestjsQueryTypeOrmModule.forFeature([
                        provider_transaction_entity_1.ProviderTransactionEntity,
                        provider_wallet_entity_1.ProviderWalletEntity,
                    ]),
                ],
                resolvers: [
                    {
                        EntityClass: provider_transaction_entity_1.ProviderTransactionEntity,
                        DTOClass: provider_transaction_dto_1.ProviderTransactionDTO,
                        CreateDTOClass: provider_transaction_input_1.ProviderTransactionInput,
                        create: { many: { disabled: true } },
                        update: { disabled: true },
                        delete: { disabled: true },
                        pagingStrategy: nestjs_query_graphql_1.PagingStrategies.OFFSET,
                        enableTotalCount: true,
                        guards: [jwt_auth_guard_1.JwtAuthGuard],
                    },
                    {
                        EntityClass: provider_wallet_entity_1.ProviderWalletEntity,
                        DTOClass: provider_wallet_dto_1.ProviderWalletDTO,
                        create: { disabled: true },
                        update: { disabled: true },
                        delete: { disabled: true },
                        pagingStrategy: nestjs_query_graphql_1.PagingStrategies.NONE,
                        guards: [jwt_auth_guard_1.JwtAuthGuard],
                    },
                ],
            }),
        ],
        providers: [accounting_service_1.AccountingService, accounting_resolver_1.AccountingResolver],
    })
], AccountingModule);


/***/ }),
/* 111 */
/***/ ((module) => {

module.exports = require("@ptc-org/nestjs-query-typeorm");

/***/ }),
/* 112 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountingResolver = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const graphql_1 = __webpack_require__(6);
const promises_1 = __webpack_require__(113);
const json_2_csv_1 = __webpack_require__(114);
const path_1 = __webpack_require__(108);
const typeorm_1 = __webpack_require__(10);
const jwt_auth_guard_1 = __webpack_require__(115);
const accounting_service_1 = __webpack_require__(119);
const chart_timeframe_enum_1 = __webpack_require__(120);
const export_dto_1 = __webpack_require__(121);
const income_result_item_dto_1 = __webpack_require__(123);
const registration_result_item_dto_1 = __webpack_require__(124);
const request_result_item_dto_1 = __webpack_require__(125);
let AccountingResolver = class AccountingResolver {
    constructor(service, dataSource) {
        this.service = service;
        this.dataSource = dataSource;
    }
    async incomeChart(input) {
        const items = await this.service.incomeChart(input);
        return items;
    }
    async requestChart(input) {
        const items = await this.service.requestsChart(input);
        return items;
    }
    async driverRegistrations(input) {
        const items = await this.service.driverRegistrations(input);
        return items;
    }
    async riderRegistrations(input) {
        const items = await this.service.riderRegistrations(input);
        return items;
    }
    async export(input) {
        const options = {};
        if (input.filters) {
            for (const f of input.filters) {
                if (typeof f.value != 'string')
                    continue;
                if (f.value.includes('^')) {
                    const a = f.value.split('^');
                    f.value = (0, typeorm_1.Between)(a[0], a[1]);
                }
                else if (f.value.startsWith('%') && f.value.endsWith('%')) {
                    f.value = (0, typeorm_1.Like)(f.value);
                }
                else if (f.value.includes('|')) {
                    const s = f.value.split('|');
                    f.value = (0, typeorm_1.In)(s);
                }
            }
            options.where = input.filters.map((filter) => {
                let obj = {};
                obj[filter.field] = filter.value;
            });
        }
        if (input.sort) {
            const _sort = {};
            _sort[input.sort.property] = input.sort.direction;
            options.order = _sort;
        }
        if (input.relations != null) {
            options.relations = input.relations;
        }
        const result = (await this.dataSource
            .getRepository(`${input.table}Entity`)
            .find(options));
        if (input.table == 'DriverWallet' && process.env.DEMO_MODE != null) {
            result.forEach((x) => {
                const length = x.driver.mobileNumber.length;
                x.driver.mobileNumber = `${x.driver.mobileNumber
                    .toString()
                    .substring(0, length - 3)}xxxx`;
                x.driver.email = 'Confidential';
            });
        }
        if (input.table == 'RiderWallet' && process.env.DEMO_MODE != null) {
            result.forEach((x) => {
                const length = x.rider.mobileNumber.length;
                x.rider.mobileNumber = `${x.rider.mobileNumber
                    .toString()
                    .substring(0, length - 3)}xxxx`;
                x.rider.email = 'Confidential';
            });
        }
        if (input.type == 'csv') {
            const str = await (0, json_2_csv_1.json2csv)(result);
            const fileName = `${new Date().getTime().toString()}.csv`;
            await (0, promises_1.writeFile)((0, path_1.join)(process.cwd(), 'uploads', `${new Date().getTime().toString()}.csv`), str);
            return {
                url: `uploads/${fileName}`,
            };
        }
    }
};
exports.AccountingResolver = AccountingResolver;
tslib_1.__decorate([
    (0, graphql_1.Query)(() => [income_result_item_dto_1.IncomeResultItem]),
    tslib_1.__param(0, (0, graphql_1.Args)('timeframe', { type: () => chart_timeframe_enum_1.ChartTimeframe })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], AccountingResolver.prototype, "incomeChart", null);
tslib_1.__decorate([
    (0, graphql_1.Query)(() => [request_result_item_dto_1.RequestResultItem]),
    tslib_1.__param(0, (0, graphql_1.Args)('timeframe', { type: () => chart_timeframe_enum_1.ChartTimeframe })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], AccountingResolver.prototype, "requestChart", null);
tslib_1.__decorate([
    (0, graphql_1.Query)(() => [registration_result_item_dto_1.RegistrationResultItemDto]),
    tslib_1.__param(0, (0, graphql_1.Args)('timeframe', { type: () => chart_timeframe_enum_1.ChartTimeframe })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], AccountingResolver.prototype, "driverRegistrations", null);
tslib_1.__decorate([
    (0, graphql_1.Query)(() => [registration_result_item_dto_1.RegistrationResultItemDto]),
    tslib_1.__param(0, (0, graphql_1.Args)('timeframe', { type: () => chart_timeframe_enum_1.ChartTimeframe })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], AccountingResolver.prototype, "riderRegistrations", null);
tslib_1.__decorate([
    (0, graphql_1.Query)(() => export_dto_1.ExportResultDTO),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    tslib_1.__param(0, (0, graphql_1.Args)('input', { type: () => export_dto_1.ExportArgsDTO })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [export_dto_1.ExportArgsDTO]),
    tslib_1.__metadata("design:returntype", Promise)
], AccountingResolver.prototype, "export", null);
exports.AccountingResolver = AccountingResolver = tslib_1.__decorate([
    (0, graphql_1.Resolver)(),
    tslib_1.__metadata("design:paramtypes", [accounting_service_1.AccountingService,
        typeorm_1.DataSource])
], AccountingResolver);


/***/ }),
/* 113 */
/***/ ((module) => {

module.exports = require("fs/promises");

/***/ }),
/* 114 */
/***/ ((module) => {

module.exports = require("json-2-csv");

/***/ }),
/* 115 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const graphql_1 = __webpack_require__(6);
const apollo_1 = __webpack_require__(116);
const passport_1 = __webpack_require__(117);
const execution_context_host_1 = __webpack_require__(118);
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    canActivate(context) {
        const ctx = graphql_1.GqlExecutionContext.create(context);
        const { req } = ctx.getContext();
        return super.canActivate(new execution_context_host_1.ExecutionContextHost([req]));
    }
    handleRequest(err, user) {
        if (err || !user) {
            throw err || new apollo_1.AuthenticationError('GqlAuthGuard');
        }
        return user;
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = tslib_1.__decorate([
    (0, common_1.Injectable)()
], JwtAuthGuard);


/***/ }),
/* 116 */
/***/ ((module) => {

module.exports = require("@nestjs/apollo");

/***/ }),
/* 117 */
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),
/* 118 */
/***/ ((module) => {

module.exports = require("@nestjs/core/helpers/execution-context-host");

/***/ }),
/* 119 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountingService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(7);
const driver_entity_1 = __webpack_require__(12);
const provider_transaction_entity_1 = __webpack_require__(40);
const rider_entity_1 = __webpack_require__(26);
const typeorm_2 = __webpack_require__(10);
const chart_timeframe_enum_1 = __webpack_require__(120);
let AccountingService = class AccountingService {
    constructor(providerTransactionRepository, riderRepository, driverRepository) {
        this.providerTransactionRepository = providerTransactionRepository;
        this.riderRepository = riderRepository;
        this.driverRepository = driverRepository;
    }
    incomeChart(timeframe) {
        const vars = this.getQueryVars(timeframe, 'transactionTime');
        return this.providerTransactionRepository.query(`SELECT currency, SUM(amount) as sum, UNIX_TIMESTAMP(ANY_VALUE(transactionTime)) * 1000 AS time from admin_transaction WHERE ${vars.query} GROUP BY currency, ${vars.groupBy}`);
    }
    requestsChart(timeframe) {
        const vars = this.getQueryVars(timeframe, 'requestTimestamp');
        return this.providerTransactionRepository.query(`SELECT COUNT(status) as count, status, UNIX_TIMESTAMP(ANY_VALUE(requestTimestamp)) * 1000 AS time from \`request\` WHERE ${vars.query} GROUP BY ${vars.groupBy}, status`);
    }
    driverRegistrations(timeframe) {
        const vars = this.getQueryVars(timeframe, 'registrationTimestamp');
        return this.driverRepository.query(`SELECT COUNT(id) as count, UNIX_TIMESTAMP(ANY_VALUE(registrationTimestamp)) * 1000 AS time from driver WHERE ${vars.query} GROUP BY ${vars.groupBy}`);
    }
    riderRegistrations(timeframe) {
        const vars = this.getQueryVars(timeframe, 'registrationTimestamp');
        return this.riderRepository.query(`SELECT COUNT(id) as count, UNIX_TIMESTAMP(ANY_VALUE(registrationTimestamp)) * 1000 AS time from rider WHERE ${vars.query} GROUP BY ${vars.groupBy}`);
    }
    getQueryVars(query, timeField) {
        switch (query) {
            case chart_timeframe_enum_1.ChartTimeframe.Daily:
                return {
                    groupBy: `DATE(${timeField}),TIME(${timeField})`,
                    query: `DATE(${timeField}) = CURDATE()`,
                };
            case chart_timeframe_enum_1.ChartTimeframe.Monthly:
                return {
                    groupBy: `DAYOFYEAR(${timeField}),YEAR(${timeField})`,
                    query: `${timeField} > CURDATE() - INTERVAL 2 MONTH`,
                };
            case chart_timeframe_enum_1.ChartTimeframe.Weekly:
                return {
                    groupBy: `WEEKOFYEAR(${timeField}),YEAR(${timeField})`,
                    query: `${timeField} > CURDATE() - INTERVAL 6 MONTH`,
                };
            case chart_timeframe_enum_1.ChartTimeframe.Yearly:
                return {
                    groupBy: `MONTH(${timeField}),YEAR(${timeField})`,
                    query: `${timeField} > CURDATE() - INTERVAL 12 MONTH`,
                };
        }
    }
};
exports.AccountingService = AccountingService;
exports.AccountingService = AccountingService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(provider_transaction_entity_1.ProviderTransactionEntity)),
    tslib_1.__param(1, (0, typeorm_1.InjectRepository)(rider_entity_1.RiderEntity)),
    tslib_1.__param(2, (0, typeorm_1.InjectRepository)(driver_entity_1.DriverEntity)),
    tslib_1.__metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AccountingService);


/***/ }),
/* 120 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChartTimeframe = void 0;
const graphql_1 = __webpack_require__(6);
var ChartTimeframe;
(function (ChartTimeframe) {
    ChartTimeframe["Daily"] = "Daily";
    ChartTimeframe["Weekly"] = "Weekly";
    ChartTimeframe["Monthly"] = "Monthly";
    ChartTimeframe["Yearly"] = "Yearly";
})(ChartTimeframe || (exports.ChartTimeframe = ChartTimeframe = {}));
(0, graphql_1.registerEnumType)(ChartTimeframe, { name: 'ChartTimeframe' });


/***/ }),
/* 121 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExportSortArg = exports.ExportFilterArg = exports.ExportArgsDTO = exports.ExportResultDTO = void 0;
const tslib_1 = __webpack_require__(1);
const eager_import_0 = __webpack_require__(121);
const eager_import_1 = __webpack_require__(122);
const graphql_1 = __webpack_require__(6);
let ExportResultDTO = class ExportResultDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { url: { type: () => String } };
    }
};
exports.ExportResultDTO = ExportResultDTO;
exports.ExportResultDTO = ExportResultDTO = tslib_1.__decorate([
    (0, graphql_1.ObjectType)('ExportResult')
], ExportResultDTO);
var ExportTable;
(function (ExportTable) {
    ExportTable["ProviderWallet"] = "ProviderWallet";
    ExportTable["DriverWallet"] = "DriverWallet";
    ExportTable["RiderWallet"] = "RiderWallet";
    ExportTable["FleetWallet"] = "FleetWallet";
})(ExportTable || (ExportTable = {}));
(0, graphql_1.registerEnumType)(ExportTable, { name: 'ExportTable' });
var ExportType;
(function (ExportType) {
    ExportType["CSV"] = "csv";
})(ExportType || (ExportType = {}));
(0, graphql_1.registerEnumType)(ExportType, { name: 'ExportType' });
let ExportArgsDTO = class ExportArgsDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { table: { type: () => ExportTable }, filters: { nullable: true, type: () => [(__webpack_require__(121).ExportFilterArg)] }, sort: { nullable: true, type: () => (__webpack_require__(121).ExportSortArg) }, relations: { nullable: true, type: () => [String] } };
    }
};
exports.ExportArgsDTO = ExportArgsDTO;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => ExportType, {}),
    tslib_1.__metadata("design:type", String)
], ExportArgsDTO.prototype, "type", void 0);
exports.ExportArgsDTO = ExportArgsDTO = tslib_1.__decorate([
    (0, graphql_1.InputType)('ExportArgs')
], ExportArgsDTO);
let ExportFilterArg = class ExportFilterArg {
    static _GRAPHQL_METADATA_FACTORY() {
        return { field: { type: () => String }, value: { type: () => String } };
    }
};
exports.ExportFilterArg = ExportFilterArg;
exports.ExportFilterArg = ExportFilterArg = tslib_1.__decorate([
    (0, graphql_1.InputType)('ExportFilterArg')
], ExportFilterArg);
let ExportSortArg = class ExportSortArg {
    static _GRAPHQL_METADATA_FACTORY() {
        return { property: { type: () => String }, direction: { type: () => (__webpack_require__(122).SortDirection) } };
    }
};
exports.ExportSortArg = ExportSortArg;
exports.ExportSortArg = ExportSortArg = tslib_1.__decorate([
    (0, graphql_1.InputType)('ExportSortArg')
], ExportSortArg);


/***/ }),
/* 122 */
/***/ ((module) => {

module.exports = require("@ptc-org/nestjs-query-core/src/interfaces/sort-field.interface");

/***/ }),
/* 123 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IncomeResultItem = void 0;
const tslib_1 = __webpack_require__(1);
const graphql_1 = __webpack_require__(6);
let IncomeResultItem = class IncomeResultItem {
    static _GRAPHQL_METADATA_FACTORY() {
        return { time: { type: () => String }, sum: { type: () => Number }, currency: { type: () => String } };
    }
};
exports.IncomeResultItem = IncomeResultItem;
exports.IncomeResultItem = IncomeResultItem = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], IncomeResultItem);


/***/ }),
/* 124 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RegistrationResultItemDto = void 0;
const tslib_1 = __webpack_require__(1);
const graphql_1 = __webpack_require__(6);
let RegistrationResultItemDto = class RegistrationResultItemDto {
    static _GRAPHQL_METADATA_FACTORY() {
        return { time: { type: () => String } };
    }
};
exports.RegistrationResultItemDto = RegistrationResultItemDto;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, {}),
    tslib_1.__metadata("design:type", Number)
], RegistrationResultItemDto.prototype, "count", void 0);
exports.RegistrationResultItemDto = RegistrationResultItemDto = tslib_1.__decorate([
    (0, graphql_1.ObjectType)('RegistrationResultItem')
], RegistrationResultItemDto);


/***/ }),
/* 125 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RequestResultItem = void 0;
const tslib_1 = __webpack_require__(1);
const eager_import_0 = __webpack_require__(77);
const graphql_1 = __webpack_require__(6);
let RequestResultItem = class RequestResultItem {
    static _GRAPHQL_METADATA_FACTORY() {
        return { time: { type: () => String }, count: { type: () => Number }, status: { type: () => (__webpack_require__(77).OrderStatus) } };
    }
};
exports.RequestResultItem = RequestResultItem;
exports.RequestResultItem = RequestResultItem = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], RequestResultItem);


/***/ }),
/* 126 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProviderTransactionDTO = void 0;
const tslib_1 = __webpack_require__(1);
const nestjs_query_graphql_1 = __webpack_require__(103);
const graphql_1 = __webpack_require__(6);
const provider_deduct_transaction_type_enum_1 = __webpack_require__(41);
const provider_recharge_transaction_type_enum_1 = __webpack_require__(42);
const transaction_action_enum_1 = __webpack_require__(17);
let ProviderTransactionDTO = class ProviderTransactionDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, createdAt: { type: () => Date }, amount: { type: () => Number }, currency: { type: () => String }, refrenceNumber: { nullable: true, type: () => String }, description: { nullable: true, type: () => String }, operatorId: { nullable: true, type: () => Number }, requestId: { nullable: true, type: () => Number } };
    }
};
exports.ProviderTransactionDTO = ProviderTransactionDTO;
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.IDField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], ProviderTransactionDTO.prototype, "id", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => transaction_action_enum_1.TransactionAction, {}),
    tslib_1.__metadata("design:type", String)
], ProviderTransactionDTO.prototype, "action", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => provider_deduct_transaction_type_enum_1.ProviderDeductTransactionType, { nullable: true }),
    tslib_1.__metadata("design:type", String)
], ProviderTransactionDTO.prototype, "deductType", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => provider_recharge_transaction_type_enum_1.ProviderRechargeTransactionType, { nullable: true }),
    tslib_1.__metadata("design:type", String)
], ProviderTransactionDTO.prototype, "rechargeType", void 0);
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.FilterableField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], ProviderTransactionDTO.prototype, "operatorId", void 0);
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.FilterableField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], ProviderTransactionDTO.prototype, "requestId", void 0);
exports.ProviderTransactionDTO = ProviderTransactionDTO = tslib_1.__decorate([
    (0, graphql_1.ObjectType)('ProviderTransaction')
], ProviderTransactionDTO);


/***/ }),
/* 127 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProviderWalletDTO = void 0;
const tslib_1 = __webpack_require__(1);
const nestjs_query_graphql_1 = __webpack_require__(103);
const graphql_1 = __webpack_require__(6);
let ProviderWalletDTO = class ProviderWalletDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, balance: { type: () => Number }, currency: { type: () => String } };
    }
};
exports.ProviderWalletDTO = ProviderWalletDTO;
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.IDField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], ProviderWalletDTO.prototype, "id", void 0);
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.FilterableField)(() => graphql_1.Float),
    tslib_1.__metadata("design:type", Number)
], ProviderWalletDTO.prototype, "balance", void 0);
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.FilterableField)(() => String),
    tslib_1.__metadata("design:type", String)
], ProviderWalletDTO.prototype, "currency", void 0);
exports.ProviderWalletDTO = ProviderWalletDTO = tslib_1.__decorate([
    (0, graphql_1.ObjectType)('ProviderWallet')
], ProviderWalletDTO);


/***/ }),
/* 128 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProviderTransactionInput = void 0;
const tslib_1 = __webpack_require__(1);
const graphql_1 = __webpack_require__(6);
const nestjs_query_graphql_1 = __webpack_require__(103);
const provider_deduct_transaction_type_enum_1 = __webpack_require__(41);
const provider_recharge_transaction_type_enum_1 = __webpack_require__(42);
const transaction_action_enum_1 = __webpack_require__(17);
let ProviderTransactionInput = class ProviderTransactionInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { createdAt: { type: () => Date }, amount: { type: () => Number }, currency: { type: () => String }, refrenceNumber: { nullable: true, type: () => String }, description: { nullable: true, type: () => String }, operatorId: { nullable: true, type: () => Number }, requestId: { nullable: true, type: () => Number } };
    }
};
exports.ProviderTransactionInput = ProviderTransactionInput;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => transaction_action_enum_1.TransactionAction, {}),
    tslib_1.__metadata("design:type", String)
], ProviderTransactionInput.prototype, "action", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => provider_deduct_transaction_type_enum_1.ProviderDeductTransactionType, { nullable: true }),
    tslib_1.__metadata("design:type", String)
], ProviderTransactionInput.prototype, "deductType", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => provider_recharge_transaction_type_enum_1.ProviderRechargeTransactionType, { nullable: true }),
    tslib_1.__metadata("design:type", String)
], ProviderTransactionInput.prototype, "rechargeType", void 0);
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.FilterableField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], ProviderTransactionInput.prototype, "operatorId", void 0);
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.FilterableField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], ProviderTransactionInput.prototype, "requestId", void 0);
exports.ProviderTransactionInput = ProviderTransactionInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], ProviderTransactionInput);


/***/ }),
/* 129 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AddressModule = void 0;
const tslib_1 = __webpack_require__(1);
const nestjs_query_graphql_1 = __webpack_require__(103);
const nestjs_query_typeorm_1 = __webpack_require__(111);
const common_1 = __webpack_require__(2);
const rider_address_entity_1 = __webpack_require__(71);
const jwt_auth_guard_1 = __webpack_require__(115);
const address_dto_1 = __webpack_require__(130);
let AddressModule = class AddressModule {
};
exports.AddressModule = AddressModule;
exports.AddressModule = AddressModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_query_graphql_1.NestjsQueryGraphQLModule.forFeature({
                imports: [nestjs_query_typeorm_1.NestjsQueryTypeOrmModule.forFeature([rider_address_entity_1.RiderAddressEntity])],
                resolvers: [
                    {
                        EntityClass: rider_address_entity_1.RiderAddressEntity,
                        DTOClass: address_dto_1.AddressDTO,
                        create: { disabled: true },
                        update: { disabled: true },
                        delete: { disabled: true },
                        guards: [jwt_auth_guard_1.JwtAuthGuard],
                    },
                ],
            }),
        ],
    })
], AddressModule);


/***/ }),
/* 130 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AddressDTO = void 0;
const tslib_1 = __webpack_require__(1);
const eager_import_0 = __webpack_require__(72);
const nestjs_query_graphql_1 = __webpack_require__(103);
const graphql_1 = __webpack_require__(6);
let AddressDTO = class AddressDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, title: { type: () => String }, details: { nullable: true, type: () => String }, location: { type: () => (__webpack_require__(72).Point) } };
    }
};
exports.AddressDTO = AddressDTO;
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.IDField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], AddressDTO.prototype, "id", void 0);
exports.AddressDTO = AddressDTO = tslib_1.__decorate([
    (0, graphql_1.ObjectType)('Address')
], AddressDTO);


/***/ }),
/* 131 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const fastify = tslib_1.__importStar(__webpack_require__(132));
const promises_1 = __webpack_require__(113);
const firebase_admin_1 = __webpack_require__(133);
const rest_jwt_auth_guard_1 = __webpack_require__(134);
const upload_service_1 = __webpack_require__(135);
const package_json_1 = __webpack_require__(139);
const app_1 = __webpack_require__(140);
const fs_1 = __webpack_require__(136);
let AppController = class AppController {
    constructor(uploadService) {
        this.uploadService = uploadService;
    }
    async defaultPath(res) {
        res.send(`✅ Admin API microservice running.\nVersion: ${package_json_1.version}`);
    }
    async upload(req, res) {
        await this.uploadService.uploadMedia(req, res, 'uploads', new Date().getTime().toString());
    }
    async reconfig(req, res) {
        const configAddress = `${process.cwd()}/config/config.${process.env.NODE_ENV ?? 'production'}.json`;
        await (0, promises_1.rm)(configAddress);
        res.send('✅ Config file deleted. Restarting...');
        process.exit(1);
    }
    async apps(res) {
        const configAddress = `${process.cwd()}/config/config.${process.env.NODE_ENV ?? 'production'}.json`;
        if ((0, fs_1.existsSync)(configAddress)) {
            const file = await (0, promises_1.readFile)(configAddress, { encoding: 'utf-8' });
            const config = JSON.parse(file);
            (0, app_1.initializeApp)({
                credential: firebase_admin_1.credential.cert(`${process.cwd()}/config/${config.firebaseProjectPrivateKey}`),
            });
            let apps = await (0, firebase_admin_1.projectManagement)().listAppMetadata();
            let finalListOfApps = [];
            for (let app of apps) {
                if (app.platform === 'ANDROID') {
                    const config = JSON.parse(await (0, firebase_admin_1.projectManagement)().androidApp(app.appId).getConfig());
                    finalListOfApps.push({
                        packageName: config.client
                            .filter((c) => c.client_info.mobilesdk_app_id == app.appId)
                            .map((c) => c.client_info.android_client_info.package_name)[0],
                    });
                }
            }
            res.send(finalListOfApps);
            return finalListOfApps;
        }
    }
};
exports.AppController = AppController;
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AppController.prototype, "defaultPath", null);
tslib_1.__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseGuards)(rest_jwt_auth_guard_1.RestJwtAuthGuard),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AppController.prototype, "upload", null);
tslib_1.__decorate([
    (0, common_1.Get)('reconfig'),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AppController.prototype, "reconfig", null);
tslib_1.__decorate([
    (0, common_1.Get)('apps'),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AppController.prototype, "apps", null);
exports.AppController = AppController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [upload_service_1.UploadService])
], AppController);


/***/ }),
/* 132 */
/***/ ((module) => {

module.exports = require("fastify");

/***/ }),
/* 133 */
/***/ ((module) => {

module.exports = require("firebase-admin");

/***/ }),
/* 134 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RestJwtAuthGuard = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(117);
let RestJwtAuthGuard = class RestJwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    canActivate(context) {
        return super.canActivate(context);
    }
    handleRequest(err, user) {
        if (err || !user) {
            throw err || new common_1.UnauthorizedException('REST API Auth blocked reqeust.');
        }
        return user;
    }
};
exports.RestJwtAuthGuard = RestJwtAuthGuard;
exports.RestJwtAuthGuard = RestJwtAuthGuard = tslib_1.__decorate([
    (0, common_1.Injectable)()
], RestJwtAuthGuard);


/***/ }),
/* 135 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UploadService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const fs = tslib_1.__importStar(__webpack_require__(136));
const util = tslib_1.__importStar(__webpack_require__(137));
const path_1 = __webpack_require__(108);
const typeorm_1 = __webpack_require__(10);
const media_entity_1 = __webpack_require__(30);
const typeorm_2 = __webpack_require__(7);
const stream_1 = __webpack_require__(138);
const pump = util.promisify(stream_1.pipeline);
let UploadService = class UploadService {
    constructor(mediaRepository) {
        this.mediaRepository = mediaRepository;
    }
    async uploadMedia(req, res, dir, fileNamePrefix) {
        //Check request is multipart
        if (!req.isMultipart()) {
            res.send(new common_1.BadRequestException());
            return;
        }
        const data = await req.file();
        await fs.promises.mkdir(dir, { recursive: true });
        const _fileName = (0, path_1.join)(dir, fileNamePrefix != null ? `${fileNamePrefix}-${data.filename}` : data.filename);
        await pump(data.file, fs.createWriteStream(_fileName));
        const insert = await this.mediaRepository.insert({ address: _fileName });
        res.code(200).send({ id: insert.raw.insertId, address: _fileName });
    }
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_2.InjectRepository)(media_entity_1.MediaEntity)),
    tslib_1.__metadata("design:paramtypes", [typeorm_1.Repository])
], UploadService);


/***/ }),
/* 136 */
/***/ ((module) => {

module.exports = require("fs");

/***/ }),
/* 137 */
/***/ ((module) => {

module.exports = require("util");

/***/ }),
/* 138 */
/***/ ((module) => {

module.exports = require("stream");

/***/ }),
/* 139 */
/***/ ((module) => {

module.exports = JSON.parse('{"name":"ridy","version":"3.1.5","license":"MIT","scripts":{"ng":"nx","postinstall":"node ./decorate-angular-cli.js","nx":"nx","start":"ts-node src/index.ts","build":"ng build","test":"ng test","lint":"nx workspace-lint && ng lint","e2e":"ng e2e","affected:apps":"nx affected:apps","affected:libs":"nx affected:libs","affected:build":"nx affected:build","affected:e2e":"nx affected:e2e","affected:test":"nx affected:test","affected:lint":"nx affected:lint","affected:dep-graph":"nx affected:dep-graph","affected":"nx affected","format":"nx format:write","format:write":"nx format:write","format:check":"nx format:check","update":"nx migrate latest","workspace-generator":"nx workspace-generator","dep-graph":"nx dep-graph","help":"nx help","i18n:extract":"ngx-translate-extract --input ./apps/admin-panel/src --output ./apps/admin-panel/src/assets/i18n/{en,es,bn,de,hi,ko,id,ja,pt,ru,ur,zh,fr,ar,hy}.json --clean --format namespaced-json","typeorm":"node --require ts-node/register ./node_modules/typeorm/cli.js","semantic-release":"semantic-release"},"private":true,"dependencies":{"@angular/animations":"17.0.9","@angular/cdk":"17.0.6","@angular/common":"17.0.9","@angular/compiler":"17.0.9","@angular/core":"17.0.9","@angular/forms":"17.0.9","@angular/google-maps":"^16.2.1","@angular/platform-browser":"17.0.9","@angular/platform-browser-dynamic":"17.0.9","@angular/router":"17.0.9","@angular/service-worker":"17.0.9","@ant-design/icons-angular":"17.0.0","@antv/g2":"^4.2.10","@apollo/client":"^3.7.17","@apollo/server":"^4.3.2","@as-integrations/fastify":"^2.1.0","@fastify/cors":"^8.3.0","@fastify/multipart":"^7.7.3","@fastify/static":"^6.10.2","@googlemaps/google-maps-services-js":"^3.3.34","@ingameltd/payu":"^1.0.5","@nestjs/apollo":"12.0.11","@nestjs/axios":"^3.0.1","@nestjs/common":"10.3.1","@nestjs/config":"^3.1.1","@nestjs/core":"10.3.1","@nestjs/graphql":"^12.0.11","@nestjs/jwt":"^10.2.0","@nestjs/passport":"^10.0.0","@nestjs/platform-fastify":"^10.3.1","@nestjs/schedule":"^4.0.0","@nestjs/serve-static":"^4.0.0","@nestjs/typeorm":"10.0.1","@nestjs/websockets":"^10.3.1","@nx/angular":"17.2.8","@nx/web":"17.2.8","@paypal/checkout-server-sdk":"^1.0.3","@ptc-org/nestjs-query-core":"^4.2.0","@ptc-org/nestjs-query-graphql":"^4.2.0","@ptc-org/nestjs-query-typeorm":"^4.2.0","@songkeys/nestjs-redis":"^10.0.0","apollo-angular":"^6.0.0","autoprefixer":"^10.4.14","class-transformer":"0.5.1","class-validator":"0.14.0","core-js":"^3.37.0","dataloader":"^2.2.2","dotenv":"16.3.1","fastify":"^4.21.0","firebase-admin":"^11.10.1","graphql":"^16.7.1","graphql-redis-subscriptions":"^2.6.0","graphql-relay":"^0.10.0","graphql-subscriptions":"^2.0.0","graphql-tools":"^9.0.0","handlebars":"^4.7.7","instamojo-payment-nodejs":"^3.0.0","ioredis":"^5.3.2","json-2-csv":"^4.0.0","jwt-decode":"^3.1.2","mercadopago":"^1.5.17","mysql2":"^3.9.1","ng-zorro-antd":"^17.2.0","ngx-timeago":"^3.0.0","node-rsa":"^1.1.1","overshom-wayforpay":"^1.1.0","passport":"^0.6.0","passport-jwt":"^4.0.1","passport-local":"^1.0.0","paystack-node":"^0.3.0","paytm-pg-node-sdk":"^1.0.4","paytmchecksum":"^1.5.1","plivo":"^4.60.1","razorpay":"^2.9.1","reflect-metadata":"^0.1.13","rxjs":"^7.8.1","sberbank-acquiring":"^1.2.1","stripe":"^12.14.0","tslib":"^2.6.1","twilio":"^4.17.0","typeorm":"0.3.17","zone.js":"0.14.3"},"devDependencies":{"@angular-devkit/build-angular":"17.0.10","@angular-devkit/core":"17.0.10","@angular-devkit/schematics":"17.0.10","@angular-eslint/eslint-plugin":"17.0.1","@angular-eslint/eslint-plugin-template":"17.0.1","@angular-eslint/template-parser":"17.0.1","@angular/cli":"~17.0.0","@angular/compiler-cli":"17.0.9","@angular/language-service":"17.0.9","@bartholomej/ngx-translate-extract":"^8.0.2","@graphql-codegen/cli":"^5.0.0","@graphql-codegen/introspection":"^4.0.0","@graphql-codegen/typescript":"^4.0.1","@graphql-codegen/typescript-apollo-angular":"^4.0.0","@graphql-codegen/typescript-operations":"^4.0.1","@nestjs/schematics":"10.1.0","@nestjs/testing":"10.3.1","@ngx-translate/core":"^15.0.0","@ngx-translate/http-loader":"^8.0.0","@nx/eslint":"17.2.8","@nx/eslint-plugin":"17.2.8","@nx/jest":"17.2.8","@nx/js":"17.2.8","@nx/nest":"17.2.8","@nx/node":"17.2.8","@nx/workspace":"17.2.8","@nxrocks/common":"^3.1.0","@nxrocks/nx-flutter":"^8.1.0","@parcel/watcher":"^2.3.0","@schematics/angular":"17.0.10","@semantic-release/changelog":"^6.0.3","@semantic-release/commit-analyzer":"^10.0.1","@semantic-release/git":"^10.0.1","@semantic-release/gitlab":"^12.0.3","@semantic-release/npm":"^10.0.4","@semantic-release/release-notes-generator":"^11.0.4","@tailwindcss/forms":"^0.5.4","@tailwindcss/typography":"^0.5.9","@types/busboy":"^1.5.0","@types/cron":"^2.0.1","@types/estree":"1.0.1","@types/ioredis":"^5.0.0","@types/jest":"29.5.3","@types/node":"^20.11.10","@types/paypal__checkout-server-sdk":"^1.0.5","@typescript-eslint/eslint-plugin":"^6.21.0","@typescript-eslint/parser":"^6.21.0","conventional-changelog-conventionalcommits":"^6.1.0","eslint":"^8.56.0","eslint-config-prettier":"9.1.0","jest":"29.6.1","jest-environment-jsdom":"29.6.1","jest-preset-angular":"13.1.6","json-autotranslate":"^1.11.0","ng-packagr":"17.0.3","nx":"20.0.2","postcss":"^8.4.27","postcss-import":"15.1.0","postcss-preset-env":"9.1.0","postcss-url":"10.1.3","prettier":"3.0.0","semantic-release":"^24.1.0","semantic-release-npm-github-publish":"^1.5.4","semantic-release-plus":"^20.0.0","tailwindcss":"^3.3.3","ts-jest":"29.1.1","ts-node":"10.9.1","typescript":"^5.2.2"},"resolutions":{"nx":"20.0.0","semantic-release":"24.1.0","babel/core":"7.4.0","typescript":"^4.9.5"},"overrides":{"@googlemaps/url-signature":"1.0.32"},"repository":{"type":"git","url":"https://github.com/ridyio/ridy-monorepo.git"},"publishConfig":{"access":"restricted"}}');

/***/ }),
/* 140 */
/***/ ((module) => {

module.exports = require("firebase-admin/app");

/***/ }),
/* 141 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AnnouncementModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const nestjs_query_graphql_1 = __webpack_require__(103);
const nestjs_query_typeorm_1 = __webpack_require__(111);
const announcement_entity_1 = __webpack_require__(31);
const announcement_dto_1 = __webpack_require__(142);
const jwt_auth_guard_1 = __webpack_require__(115);
const announcement_input_1 = __webpack_require__(144);
let AnnouncementModule = class AnnouncementModule {
};
exports.AnnouncementModule = AnnouncementModule;
exports.AnnouncementModule = AnnouncementModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_query_graphql_1.NestjsQueryGraphQLModule.forFeature({
                imports: [nestjs_query_typeorm_1.NestjsQueryTypeOrmModule.forFeature([announcement_entity_1.AnnouncementEntity])],
                resolvers: [
                    {
                        EntityClass: announcement_entity_1.AnnouncementEntity,
                        DTOClass: announcement_dto_1.AnnouncementDTO,
                        CreateDTOClass: announcement_input_1.AnnouncementInput,
                        UpdateDTOClass: announcement_input_1.AnnouncementInput,
                        create: { many: { disabled: true } },
                        update: { many: { disabled: true } },
                        delete: { many: { disabled: true } },
                        pagingStrategy: nestjs_query_graphql_1.PagingStrategies.OFFSET,
                        enableTotalCount: true,
                        guards: [jwt_auth_guard_1.JwtAuthGuard],
                    },
                ],
            }),
        ],
    })
], AnnouncementModule);


/***/ }),
/* 142 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AnnouncementDTO = void 0;
const tslib_1 = __webpack_require__(1);
const eager_import_0 = __webpack_require__(32);
const nestjs_query_graphql_1 = __webpack_require__(103);
const graphql_1 = __webpack_require__(6);
const announcement_authorizer_1 = __webpack_require__(143);
let AnnouncementDTO = class AnnouncementDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, title: { type: () => String }, description: { type: () => String }, url: { nullable: true, type: () => String }, userType: { type: () => [(__webpack_require__(32).AnnouncementUserType)] }, startAt: { type: () => Date }, expireAt: { type: () => Date } };
    }
};
exports.AnnouncementDTO = AnnouncementDTO;
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.IDField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], AnnouncementDTO.prototype, "id", void 0);
exports.AnnouncementDTO = AnnouncementDTO = tslib_1.__decorate([
    (0, graphql_1.ObjectType)('Announcement'),
    (0, nestjs_query_graphql_1.Authorize)(announcement_authorizer_1.AnnouncementAuthorizer)
], AnnouncementDTO);


/***/ }),
/* 143 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AnnouncementAuthorizer = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const operator_permission_enum_1 = __webpack_require__(93);
const operator_entity_1 = __webpack_require__(19);
const typeorm_1 = __webpack_require__(10);
let AnnouncementAuthorizer = class AnnouncementAuthorizer {
    constructor(datasource) {
        this.datasource = datasource;
    }
    async authorize(context, authorizerContext) {
        const operator = await this.datasource
            .getRepository(operator_entity_1.OperatorEntity)
            .findOne({
            where: { id: context.req.user.id },
            relations: {
                role: true,
            },
        });
        if (authorizerContext.readonly &&
            !operator.role.permissions.includes(operator_permission_enum_1.OperatorPermission.Announcements_View)) {
            throw new common_1.UnauthorizedException();
        }
        if (!authorizerContext.readonly &&
            !operator.role.permissions.includes(operator_permission_enum_1.OperatorPermission.Announcements_Edit)) {
            throw new common_1.UnauthorizedException();
        }
        return undefined;
    }
};
exports.AnnouncementAuthorizer = AnnouncementAuthorizer;
exports.AnnouncementAuthorizer = AnnouncementAuthorizer = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeorm_1.DataSource])
], AnnouncementAuthorizer);


/***/ }),
/* 144 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AnnouncementInput = void 0;
const tslib_1 = __webpack_require__(1);
const eager_import_0 = __webpack_require__(32);
const graphql_1 = __webpack_require__(6);
let AnnouncementInput = class AnnouncementInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { title: { type: () => String }, description: { type: () => String }, url: { nullable: true, type: () => String }, userType: { type: () => [(__webpack_require__(32).AnnouncementUserType)] }, startAt: { type: () => Date }, expireAt: { type: () => Date } };
    }
};
exports.AnnouncementInput = AnnouncementInput;
exports.AnnouncementInput = AnnouncementInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], AnnouncementInput);


/***/ }),
/* 145 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CarModule = void 0;
const tslib_1 = __webpack_require__(1);
const nestjs_query_graphql_1 = __webpack_require__(103);
const nestjs_query_typeorm_1 = __webpack_require__(111);
const common_1 = __webpack_require__(2);
const car_color_entity_1 = __webpack_require__(11);
const car_model_entity_1 = __webpack_require__(13);
const jwt_auth_guard_1 = __webpack_require__(115);
const car_color_dto_1 = __webpack_require__(146);
const car_model_dto_1 = __webpack_require__(148);
const car_color_input_1 = __webpack_require__(149);
const car_model_input_1 = __webpack_require__(150);
let CarModule = class CarModule {
};
exports.CarModule = CarModule;
exports.CarModule = CarModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_query_graphql_1.NestjsQueryGraphQLModule.forFeature({
                imports: [
                    nestjs_query_typeorm_1.NestjsQueryTypeOrmModule.forFeature([car_color_entity_1.CarColorEntity, car_model_entity_1.CarModelEntity]),
                ],
                resolvers: [
                    {
                        EntityClass: car_model_entity_1.CarModelEntity,
                        DTOClass: car_model_dto_1.CarModelDTO,
                        CreateDTOClass: car_model_input_1.CarModelInput,
                        UpdateDTOClass: car_model_input_1.CarModelInput,
                        create: { many: { disabled: true } },
                        update: { many: { disabled: true } },
                        delete: { many: { disabled: true } },
                        pagingStrategy: nestjs_query_graphql_1.PagingStrategies.OFFSET,
                        enableTotalCount: true,
                        guards: [jwt_auth_guard_1.JwtAuthGuard],
                    },
                    {
                        EntityClass: car_color_entity_1.CarColorEntity,
                        DTOClass: car_color_dto_1.CarColorDTO,
                        CreateDTOClass: car_color_input_1.CarColorInput,
                        UpdateDTOClass: car_color_input_1.CarColorInput,
                        create: { many: { disabled: true } },
                        update: { many: { disabled: true } },
                        delete: { many: { disabled: true } },
                        pagingStrategy: nestjs_query_graphql_1.PagingStrategies.NONE,
                        enableTotalCount: true,
                        guards: [jwt_auth_guard_1.JwtAuthGuard],
                    },
                ],
            }),
        ],
    })
], CarModule);


/***/ }),
/* 146 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CarColorDTO = void 0;
const tslib_1 = __webpack_require__(1);
const nestjs_query_graphql_1 = __webpack_require__(103);
const graphql_1 = __webpack_require__(6);
const car_authorizer_1 = __webpack_require__(147);
let CarColorDTO = class CarColorDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, name: { type: () => String } };
    }
};
exports.CarColorDTO = CarColorDTO;
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.IDField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], CarColorDTO.prototype, "id", void 0);
exports.CarColorDTO = CarColorDTO = tslib_1.__decorate([
    (0, graphql_1.ObjectType)('CarColor'),
    (0, nestjs_query_graphql_1.Authorize)(car_authorizer_1.CarAuthorizer)
], CarColorDTO);


/***/ }),
/* 147 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CarAuthorizer = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const operator_permission_enum_1 = __webpack_require__(93);
const operator_entity_1 = __webpack_require__(19);
const typeorm_1 = __webpack_require__(10);
let CarAuthorizer = class CarAuthorizer {
    constructor(datasource) {
        this.datasource = datasource;
    }
    async authorize(context, authorizerContext) {
        const operator = await this.datasource
            .getRepository(operator_entity_1.OperatorEntity)
            .findOne({
            where: { id: context.req.user.id },
            relations: { role: true },
        });
        if (authorizerContext.readonly &&
            !operator.role.permissions.includes(operator_permission_enum_1.OperatorPermission.Cars_View)) {
            throw new common_1.UnauthorizedException();
        }
        if (!authorizerContext.readonly &&
            !operator.role.permissions.includes(operator_permission_enum_1.OperatorPermission.Cars_Edit)) {
            if (authorizerContext.operationGroup === 'create' ||
                authorizerContext.operationGroup === 'update' ||
                authorizerContext.operationGroup === 'delete') {
                throw new common_1.UnauthorizedException();
            }
        }
        return undefined;
    }
};
exports.CarAuthorizer = CarAuthorizer;
exports.CarAuthorizer = CarAuthorizer = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeorm_1.DataSource])
], CarAuthorizer);


/***/ }),
/* 148 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CarModelDTO = void 0;
const tslib_1 = __webpack_require__(1);
const nestjs_query_graphql_1 = __webpack_require__(103);
const graphql_1 = __webpack_require__(6);
const car_authorizer_1 = __webpack_require__(147);
let CarModelDTO = class CarModelDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, name: { type: () => String } };
    }
};
exports.CarModelDTO = CarModelDTO;
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.IDField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], CarModelDTO.prototype, "id", void 0);
exports.CarModelDTO = CarModelDTO = tslib_1.__decorate([
    (0, graphql_1.ObjectType)('CarModel'),
    (0, nestjs_query_graphql_1.Authorize)(car_authorizer_1.CarAuthorizer)
], CarModelDTO);


/***/ }),
/* 149 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CarColorInput = void 0;
const tslib_1 = __webpack_require__(1);
const graphql_1 = __webpack_require__(6);
let CarColorInput = class CarColorInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return {};
    }
};
exports.CarColorInput = CarColorInput;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => String, {}),
    tslib_1.__metadata("design:type", String)
], CarColorInput.prototype, "name", void 0);
exports.CarColorInput = CarColorInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], CarColorInput);


/***/ }),
/* 150 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CarModelInput = void 0;
const tslib_1 = __webpack_require__(1);
const graphql_1 = __webpack_require__(6);
let CarModelInput = class CarModelInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return {};
    }
};
exports.CarModelInput = CarModelInput;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => String, {}),
    tslib_1.__metadata("design:type", String)
], CarModelInput.prototype, "name", void 0);
exports.CarModelInput = CarModelInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], CarModelInput);


/***/ }),
/* 151 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CouponModule = void 0;
const tslib_1 = __webpack_require__(1);
const nestjs_query_graphql_1 = __webpack_require__(103);
const nestjs_query_typeorm_1 = __webpack_require__(111);
const common_1 = __webpack_require__(2);
const coupon_entity_1 = __webpack_require__(25);
const jwt_auth_guard_1 = __webpack_require__(115);
const coupon_dto_1 = __webpack_require__(152);
const coupon_input_1 = __webpack_require__(162);
let CouponModule = class CouponModule {
};
exports.CouponModule = CouponModule;
exports.CouponModule = CouponModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_query_graphql_1.NestjsQueryGraphQLModule.forFeature({
                imports: [nestjs_query_typeorm_1.NestjsQueryTypeOrmModule.forFeature([coupon_entity_1.CouponEntity])],
                resolvers: [
                    {
                        EntityClass: coupon_entity_1.CouponEntity,
                        DTOClass: coupon_dto_1.CouponDTO,
                        CreateDTOClass: coupon_input_1.CouponInput,
                        UpdateDTOClass: coupon_input_1.CouponInput,
                        create: { many: { disabled: true } },
                        update: { many: { disabled: true } },
                        delete: { many: { disabled: true } },
                        pagingStrategy: nestjs_query_graphql_1.PagingStrategies.OFFSET,
                        enableTotalCount: true,
                        guards: [jwt_auth_guard_1.JwtAuthGuard],
                    },
                ],
            }),
        ],
    })
], CouponModule);


/***/ }),
/* 152 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CouponDTO = void 0;
const tslib_1 = __webpack_require__(1);
const nestjs_query_graphql_1 = __webpack_require__(103);
const graphql_1 = __webpack_require__(6);
const service_dto_1 = __webpack_require__(153);
const coupon_authorizer_1 = __webpack_require__(161);
let CouponDTO = class CouponDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, code: { type: () => String }, title: { type: () => String }, description: { type: () => String }, minimumCost: { type: () => Number }, maximumCost: { type: () => Number }, startAt: { type: () => Date }, expireAt: { type: () => Date }, creditGift: { type: () => Number }, isEnabled: { type: () => Boolean }, isFirstTravelOnly: { type: () => Boolean } };
    }
};
exports.CouponDTO = CouponDTO;
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.IDField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], CouponDTO.prototype, "id", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, {}),
    tslib_1.__metadata("design:type", Number)
], CouponDTO.prototype, "manyUsersCanUse", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, {}),
    tslib_1.__metadata("design:type", Number)
], CouponDTO.prototype, "manyTimesUserCanUse", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, {}),
    tslib_1.__metadata("design:type", Number)
], CouponDTO.prototype, "discountPercent", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, {}),
    tslib_1.__metadata("design:type", Number)
], CouponDTO.prototype, "discountFlat", void 0);
exports.CouponDTO = CouponDTO = tslib_1.__decorate([
    (0, graphql_1.ObjectType)('Coupon'),
    (0, nestjs_query_graphql_1.UnPagedRelation)('allowedServices', () => service_dto_1.ServiceDTO),
    (0, nestjs_query_graphql_1.Authorize)(coupon_authorizer_1.CouponAuthorizer)
], CouponDTO);


/***/ }),
/* 153 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceDTO = void 0;
const tslib_1 = __webpack_require__(1);
const eager_import_0 = __webpack_require__(56);
const eager_import_1 = __webpack_require__(101);
const eager_import_2 = __webpack_require__(100);
const eager_import_3 = __webpack_require__(154);
const eager_import_4 = __webpack_require__(155);
const nestjs_query_graphql_1 = __webpack_require__(103);
const graphql_1 = __webpack_require__(6);
const region_dto_1 = __webpack_require__(156);
const media_dto_1 = __webpack_require__(158);
const service_option_dto_1 = __webpack_require__(159);
const service_authorizer_1 = __webpack_require__(160);
let ServiceDTO = class ServiceDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, name: { type: () => String }, description: { nullable: true, type: () => String }, categoryId: { type: () => Number }, baseFare: { type: () => Number }, roundingFactor: { nullable: true, type: () => Number }, perHundredMeters: { type: () => Number }, perMinuteDrive: { type: () => Number }, perMinuteWait: { type: () => Number }, prepayPercent: { type: () => Number }, minimumFee: { type: () => Number }, paymentMethod: { type: () => (__webpack_require__(56).ServicePaymentMethod) }, cancellationTotalFee: { type: () => Number }, cancellationDriverShare: { type: () => Number }, providerShareFlat: { type: () => Number }, twoWayAvailable: { type: () => Boolean }, timeMultipliers: { type: () => [(__webpack_require__(101).TimeMultiplier)] }, distanceMultipliers: { type: () => [(__webpack_require__(100).DistanceMultiplier)] }, weekdayMultipliers: { type: () => [(__webpack_require__(154).WeekdayMultiplier)] }, dateRangeMultipliers: { type: () => [(__webpack_require__(155).DateRangeMultiplier)] } };
    }
};
exports.ServiceDTO = ServiceDTO;
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.IDField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], ServiceDTO.prototype, "id", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    tslib_1.__metadata("design:type", Number)
], ServiceDTO.prototype, "personCapacity", void 0);
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.FilterableField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], ServiceDTO.prototype, "categoryId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, {}),
    tslib_1.__metadata("design:type", Number)
], ServiceDTO.prototype, "searchRadius", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, {}),
    tslib_1.__metadata("design:type", Number)
], ServiceDTO.prototype, "providerSharePercent", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, {}),
    tslib_1.__metadata("design:type", Number)
], ServiceDTO.prototype, "maximumDestinationDistance", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {}),
    tslib_1.__metadata("design:type", Number)
], ServiceDTO.prototype, "mediaId", void 0);
exports.ServiceDTO = ServiceDTO = tslib_1.__decorate([
    (0, graphql_1.ObjectType)('Service'),
    (0, nestjs_query_graphql_1.UnPagedRelation)('regions', () => region_dto_1.RegionDTO, {
        pagingStrategy: nestjs_query_graphql_1.PagingStrategies.NONE,
        update: { enabled: true },
    }),
    (0, nestjs_query_graphql_1.Relation)('media', () => media_dto_1.MediaDTO),
    (0, nestjs_query_graphql_1.UnPagedRelation)('options', () => service_option_dto_1.ServiceOptionDTO, {
        update: { enabled: true },
    }),
    (0, nestjs_query_graphql_1.Authorize)(service_authorizer_1.ServiceAuthorizer)
], ServiceDTO);


/***/ }),
/* 154 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Weekday = exports.WeekdayMultiplier = void 0;
const tslib_1 = __webpack_require__(1);
const eager_import_0 = __webpack_require__(154);
const graphql_1 = __webpack_require__(6);
let WeekdayMultiplier = class WeekdayMultiplier {
    static _GRAPHQL_METADATA_FACTORY() {
        return { weekday: { type: () => (__webpack_require__(154).Weekday) }, multiply: { type: () => Number } };
    }
};
exports.WeekdayMultiplier = WeekdayMultiplier;
exports.WeekdayMultiplier = WeekdayMultiplier = tslib_1.__decorate([
    (0, graphql_1.InputType)('WeekdayMultiplierInput'),
    (0, graphql_1.ObjectType)()
], WeekdayMultiplier);
var Weekday;
(function (Weekday) {
    Weekday["Sunday"] = "Sunday";
    Weekday["Monday"] = "Monday";
    Weekday["Tuesday"] = "Tuesday";
    Weekday["Wednesday"] = "Wednesday";
    Weekday["Thursday"] = "Thursday";
    Weekday["Friday"] = "Friday";
    Weekday["Saturday"] = "Saturday";
})(Weekday || (exports.Weekday = Weekday = {}));
(0, graphql_1.registerEnumType)(Weekday, {
    name: 'Weekday',
});


/***/ }),
/* 155 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DateRangeMultiplier = void 0;
const tslib_1 = __webpack_require__(1);
const graphql_1 = __webpack_require__(6);
let DateRangeMultiplier = class DateRangeMultiplier {
    static _GRAPHQL_METADATA_FACTORY() {
        return { startDate: { type: () => Number }, endDate: { type: () => Number }, multiply: { type: () => Number } };
    }
};
exports.DateRangeMultiplier = DateRangeMultiplier;
exports.DateRangeMultiplier = DateRangeMultiplier = tslib_1.__decorate([
    (0, graphql_1.InputType)('DateRangeMultiplierInput'),
    (0, graphql_1.ObjectType)()
], DateRangeMultiplier);


/***/ }),
/* 156 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RegionDTO = void 0;
const tslib_1 = __webpack_require__(1);
const eager_import_0 = __webpack_require__(72);
const nestjs_query_graphql_1 = __webpack_require__(103);
const graphql_1 = __webpack_require__(6);
const region_authorizer_1 = __webpack_require__(157);
let RegionDTO = class RegionDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, name: { type: () => String }, currency: { type: () => String }, enabled: { type: () => Boolean }, location: { type: () => [[(__webpack_require__(72).Point)]] } };
    }
};
exports.RegionDTO = RegionDTO;
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.IDField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], RegionDTO.prototype, "id", void 0);
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.FilterableField)(() => String),
    tslib_1.__metadata("design:type", String)
], RegionDTO.prototype, "currency", void 0);
exports.RegionDTO = RegionDTO = tslib_1.__decorate([
    (0, graphql_1.ObjectType)('Region'),
    (0, nestjs_query_graphql_1.Authorize)(region_authorizer_1.RegionAuthorizer)
], RegionDTO);


/***/ }),
/* 157 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RegionAuthorizer = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const operator_permission_enum_1 = __webpack_require__(93);
const operator_entity_1 = __webpack_require__(19);
const typeorm_1 = __webpack_require__(10);
let RegionAuthorizer = class RegionAuthorizer {
    constructor(datasource) {
        this.datasource = datasource;
    }
    async authorize(context, authorizerContext) {
        const operator = await this.datasource
            .getRepository(operator_entity_1.OperatorEntity)
            .findOne({
            where: { id: context.req.user.id },
            relations: { role: true },
        });
        if (authorizerContext.readonly &&
            !operator.role.permissions.includes(operator_permission_enum_1.OperatorPermission.Regions_View)) {
            throw new common_1.UnauthorizedException();
        }
        if (!authorizerContext.readonly &&
            !operator.role.permissions.includes(operator_permission_enum_1.OperatorPermission.Regions_Edit)) {
            throw new common_1.UnauthorizedException();
        }
        return undefined;
    }
};
exports.RegionAuthorizer = RegionAuthorizer;
exports.RegionAuthorizer = RegionAuthorizer = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeorm_1.DataSource])
], RegionAuthorizer);


/***/ }),
/* 158 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MediaDTO = void 0;
const tslib_1 = __webpack_require__(1);
const nestjs_query_graphql_1 = __webpack_require__(103);
const graphql_1 = __webpack_require__(6);
let MediaDTO = class MediaDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, address: { type: () => String }, base64: { nullable: true, type: () => String } };
    }
};
exports.MediaDTO = MediaDTO;
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.IDField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], MediaDTO.prototype, "id", void 0);
exports.MediaDTO = MediaDTO = tslib_1.__decorate([
    (0, graphql_1.ObjectType)('Media')
], MediaDTO);


/***/ }),
/* 159 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceOptionDTO = void 0;
const tslib_1 = __webpack_require__(1);
const eager_import_0 = __webpack_require__(62);
const eager_import_1 = __webpack_require__(61);
const nestjs_query_graphql_1 = __webpack_require__(103);
const graphql_1 = __webpack_require__(6);
const service_authorizer_1 = __webpack_require__(160);
let ServiceOptionDTO = class ServiceOptionDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, name: { type: () => String }, type: { type: () => (__webpack_require__(62).ServiceOptionType) }, additionalFee: { nullable: true, type: () => Number }, icon: { type: () => (__webpack_require__(61).ServiceOptionIcon) } };
    }
};
exports.ServiceOptionDTO = ServiceOptionDTO;
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.IDField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], ServiceOptionDTO.prototype, "id", void 0);
exports.ServiceOptionDTO = ServiceOptionDTO = tslib_1.__decorate([
    (0, graphql_1.ObjectType)('ServiceOption'),
    (0, nestjs_query_graphql_1.Authorize)(service_authorizer_1.ServiceAuthorizer)
], ServiceOptionDTO);


/***/ }),
/* 160 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceAuthorizer = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const operator_permission_enum_1 = __webpack_require__(93);
const operator_entity_1 = __webpack_require__(19);
const typeorm_1 = __webpack_require__(10);
let ServiceAuthorizer = class ServiceAuthorizer {
    constructor(datasource) {
        this.datasource = datasource;
    }
    async authorize(context, authorizerContext) {
        const operator = await this.datasource
            .getRepository(operator_entity_1.OperatorEntity)
            .findOne({
            where: { id: context.req.user.id },
            relations: {
                role: true,
            },
        });
        if (authorizerContext.readonly &&
            !operator.role.permissions.includes(operator_permission_enum_1.OperatorPermission.Services_View)) {
            throw new common_1.UnauthorizedException();
        }
        if (!authorizerContext.readonly &&
            !operator.role.permissions.includes(operator_permission_enum_1.OperatorPermission.Services_Edit)) {
            if (authorizerContext.operationGroup === 'create' ||
                authorizerContext.operationGroup === 'update' ||
                authorizerContext.operationGroup === 'delete') {
                throw new common_1.UnauthorizedException();
            }
        }
        return undefined;
    }
};
exports.ServiceAuthorizer = ServiceAuthorizer;
exports.ServiceAuthorizer = ServiceAuthorizer = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeorm_1.DataSource])
], ServiceAuthorizer);


/***/ }),
/* 161 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CouponAuthorizer = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const operator_permission_enum_1 = __webpack_require__(93);
const operator_entity_1 = __webpack_require__(19);
const typeorm_1 = __webpack_require__(10);
let CouponAuthorizer = class CouponAuthorizer {
    constructor(datasource) {
        this.datasource = datasource;
    }
    async authorize(context, authorizerContext) {
        const operator = await this.datasource
            .getRepository(operator_entity_1.OperatorEntity)
            .findOne({
            where: { id: context.req.user.id },
            relations: { role: true },
        });
        if (authorizerContext.readonly &&
            !operator.role.permissions.includes(operator_permission_enum_1.OperatorPermission.Coupons_View)) {
            throw new common_1.UnauthorizedException();
        }
        if (!authorizerContext.readonly &&
            !operator.role.permissions.includes(operator_permission_enum_1.OperatorPermission.Coupons_Edit)) {
            throw new common_1.UnauthorizedException();
        }
        return undefined;
    }
};
exports.CouponAuthorizer = CouponAuthorizer;
exports.CouponAuthorizer = CouponAuthorizer = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeorm_1.DataSource])
], CouponAuthorizer);


/***/ }),
/* 162 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CouponInput = void 0;
const tslib_1 = __webpack_require__(1);
const graphql_1 = __webpack_require__(6);
let CouponInput = class CouponInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { code: { type: () => String }, title: { type: () => String }, description: { type: () => String }, minimumCost: { type: () => Number }, maximumCost: { type: () => Number }, startAt: { type: () => Date }, expireAt: { type: () => Date }, creditGift: { type: () => Number }, isEnabled: { type: () => Boolean }, isFirstTravelOnly: { type: () => Boolean } };
    }
};
exports.CouponInput = CouponInput;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, {}),
    tslib_1.__metadata("design:type", Number)
], CouponInput.prototype, "manyUsersCanUse", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, {}),
    tslib_1.__metadata("design:type", Number)
], CouponInput.prototype, "manyTimesUserCanUse", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, {}),
    tslib_1.__metadata("design:type", Number)
], CouponInput.prototype, "discountPercent", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, {}),
    tslib_1.__metadata("design:type", Number)
], CouponInput.prototype, "discountFlat", void 0);
exports.CouponInput = CouponInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], CouponInput);


/***/ }),
/* 163 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DriverModule = void 0;
const tslib_1 = __webpack_require__(1);
const nestjs_query_graphql_1 = __webpack_require__(103);
const nestjs_query_typeorm_1 = __webpack_require__(111);
const common_1 = __webpack_require__(2);
const driver_transaction_entity_1 = __webpack_require__(14);
const driver_wallet_entity_1 = __webpack_require__(94);
const driver_entity_1 = __webpack_require__(12);
const shared_driver_service_1 = __webpack_require__(164);
const redis_helper_module_1 = __webpack_require__(165);
const jwt_auth_guard_1 = __webpack_require__(115);
const driver_resolver_1 = __webpack_require__(170);
const driver_service_1 = __webpack_require__(171);
const driver_transaction_dto_1 = __webpack_require__(186);
const driver_wallet_dto_1 = __webpack_require__(174);
const driver_dto_1 = __webpack_require__(175);
const driver_input_1 = __webpack_require__(201);
const operator_entity_1 = __webpack_require__(19);
const driver_transaction_input_1 = __webpack_require__(173);
let DriverModule = class DriverModule {
};
exports.DriverModule = DriverModule;
exports.DriverModule = DriverModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            redis_helper_module_1.RedisHelpersModule,
            nestjs_query_graphql_1.NestjsQueryGraphQLModule.forFeature({
                imports: [
                    nestjs_query_typeorm_1.NestjsQueryTypeOrmModule.forFeature([
                        driver_entity_1.DriverEntity,
                        driver_transaction_entity_1.DriverTransactionEntity,
                        driver_wallet_entity_1.DriverWalletEntity,
                        operator_entity_1.OperatorEntity,
                    ]),
                ],
                resolvers: [
                    {
                        EntityClass: driver_entity_1.DriverEntity,
                        DTOClass: driver_dto_1.DriverDTO,
                        UpdateDTOClass: driver_input_1.UpdateDriverInput,
                        CreateDTOClass: driver_input_1.UpdateDriverInput,
                        create: { many: { disabled: true } },
                        update: { many: { disabled: true } },
                        delete: { disabled: true },
                        pagingStrategy: nestjs_query_graphql_1.PagingStrategies.OFFSET,
                        enableTotalCount: true,
                        enableAggregate: true,
                        guards: [jwt_auth_guard_1.JwtAuthGuard],
                    },
                    {
                        EntityClass: driver_wallet_entity_1.DriverWalletEntity,
                        DTOClass: driver_wallet_dto_1.DriverWalletDTO,
                        create: { disabled: true },
                        update: { disabled: true },
                        delete: { disabled: true },
                        pagingStrategy: nestjs_query_graphql_1.PagingStrategies.OFFSET,
                        enableTotalCount: true,
                        guards: [jwt_auth_guard_1.JwtAuthGuard],
                    },
                    {
                        EntityClass: driver_transaction_entity_1.DriverTransactionEntity,
                        DTOClass: driver_transaction_dto_1.DriverTransactionDTO,
                        CreateDTOClass: driver_transaction_input_1.DriverTransactionInput,
                        create: { many: { disabled: true } },
                        update: { disabled: true },
                        delete: { disabled: true },
                        pagingStrategy: nestjs_query_graphql_1.PagingStrategies.OFFSET,
                        enableTotalCount: true,
                        enableAggregate: true,
                        guards: [jwt_auth_guard_1.JwtAuthGuard],
                    },
                ],
            }),
        ],
        providers: [driver_resolver_1.DriverResolver, driver_service_1.DriverService, shared_driver_service_1.SharedDriverService],
    })
], DriverModule);


/***/ }),
/* 164 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SharedDriverService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(7);
const typeorm_2 = __webpack_require__(10);
const driver_transaction_entity_1 = __webpack_require__(14);
const driver_wallet_entity_1 = __webpack_require__(94);
const driver_entity_1 = __webpack_require__(12);
const driver_status_enum_1 = __webpack_require__(95);
let SharedDriverService = class SharedDriverService {
    constructor(driverRepo, driverWalletRepo, driverTransactionRepo) {
        this.driverRepo = driverRepo;
        this.driverWalletRepo = driverWalletRepo;
        this.driverTransactionRepo = driverTransactionRepo;
    }
    async findById(id) {
        return this.driverRepo.findOneOrFail({
            where: { id },
            relations: {
                enabledServices: true, // We are using this relation in many places more specifically to find out if driver can do a service or not
            },
            withDeleted: true,
        });
    }
    async updateDriverStatus(driverId, status) {
        return this.driverRepo.update(driverId, { status });
    }
    async getMaxRadiusForDriverServices(driverId) {
        const driver = await this.driverRepo.findOneOrFail({
            where: { id: driverId },
            relations: { enabledServices: true },
        });
        const radiuses = driver.enabledServices.map((service) => service.searchRadius);
        const max = Math.max(...radiuses);
        return max > 0 ? max : 0;
    }
    async getOnlineDriversWithServiceId(driverIds, serviceId, fleetIds = []) {
        common_1.Logger.log(`Finding drivers with service ${serviceId}`, 'SharedDriverService');
        common_1.Logger.log(`DriverIds: ${driverIds}`, 'SharedDriverService');
        common_1.Logger.log(`FleetIds: ${fleetIds}`, 'SharedDriverService');
        let driversWithService;
        if (fleetIds.length > 0) {
            driversWithService = await this.driverRepo.find({
                where: {
                    id: (0, typeorm_2.In)(driverIds),
                    status: driver_status_enum_1.DriverStatus.Online,
                    fleetId: (0, typeorm_2.In)(fleetIds),
                },
                relations: ['enabledServices'],
            });
        }
        else {
            driversWithService = await this.driverRepo.find({
                where: {
                    id: (0, typeorm_2.In)(driverIds),
                    status: driver_status_enum_1.DriverStatus.Online,
                },
                relations: ['enabledServices'],
            });
        }
        return driversWithService.filter((x) => x.enabledServices.map((y) => y.id).includes(serviceId));
    }
    async canDriverDoServiceAndFleet(driverId, serviceId, fleetIds = []) {
        return ((await this.getOnlineDriversWithServiceId([driverId], serviceId, fleetIds)).length > 0);
    }
    async rechargeWallet(transaction) {
        let wallet = await this.driverWalletRepo.findOneBy({
            driverId: transaction.driverId,
            currency: transaction.currency,
        });
        transaction.amount = parseFloat(transaction.amount.toString());
        if (wallet == null) {
            wallet = await this.driverWalletRepo.save({
                balance: transaction.amount,
                currency: transaction.currency,
                driverId: transaction.driverId,
            });
        }
        else {
            await this.driverWalletRepo.update(wallet.id, {
                balance: parseFloat(transaction.amount.toString()) +
                    parseFloat(wallet.balance.toString()),
            });
            wallet.balance += transaction.amount;
        }
        if (transaction.amount != 0) {
            common_1.Logger.log(`Saving transaction ${JSON.stringify(transaction)}`);
            this.driverTransactionRepo.save(transaction);
        }
        return wallet;
    }
    async setRating(driverId, rating, totalRatingCount) {
        return this.driverRepo.update(driverId, {
            rating: rating,
            reviewCount: totalRatingCount,
        });
    }
    async deleteById(id) {
        const user = await this.findById(id);
        await this.driverRepo.softDelete(id);
        return user;
    }
};
exports.SharedDriverService = SharedDriverService;
exports.SharedDriverService = SharedDriverService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(driver_entity_1.DriverEntity)),
    tslib_1.__param(1, (0, typeorm_1.InjectRepository)(driver_wallet_entity_1.DriverWalletEntity)),
    tslib_1.__param(2, (0, typeorm_1.InjectRepository)(driver_transaction_entity_1.DriverTransactionEntity)),
    tslib_1.__metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], SharedDriverService);


/***/ }),
/* 165 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RedisHelpersModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(7);
const driver_transaction_entity_1 = __webpack_require__(14);
const driver_wallet_entity_1 = __webpack_require__(94);
const driver_entity_1 = __webpack_require__(12);
const shared_driver_service_1 = __webpack_require__(164);
const driver_redis_service_1 = __webpack_require__(166);
const order_redis_service_1 = __webpack_require__(168);
const auth_redis_service_1 = __webpack_require__(169);
let RedisHelpersModule = class RedisHelpersModule {
};
exports.RedisHelpersModule = RedisHelpersModule;
exports.RedisHelpersModule = RedisHelpersModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                driver_entity_1.DriverEntity,
                driver_wallet_entity_1.DriverWalletEntity,
                driver_transaction_entity_1.DriverTransactionEntity,
            ]),
        ],
        providers: [
            driver_redis_service_1.DriverRedisService,
            order_redis_service_1.OrderRedisService,
            shared_driver_service_1.SharedDriverService,
            auth_redis_service_1.AuthRedisService,
        ],
        exports: [driver_redis_service_1.DriverRedisService, order_redis_service_1.OrderRedisService, auth_redis_service_1.AuthRedisService],
    })
], RedisHelpersModule);


/***/ }),
/* 166 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DriverRedisService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const nestjs_redis_1 = __webpack_require__(167);
const ioredis_1 = __webpack_require__(105);
let DriverRedisService = class DriverRedisService {
    constructor(redisService) {
        this.redisService = redisService;
    }
    async setLocation(driverId, point) {
        await Promise.all([
            this.redisService.geoadd(RedisKeys.Driver, point.lng, point.lat, driverId.toString()),
            this.redisService.zadd(RedisKeys.DriverLocationTime, Date.now(), driverId),
        ]);
        if (point.heading) {
            this.redisService.hset(RedisKeys.DriverHeading, driverId.toString(), point.heading);
        }
    }
    async getDriverCoordinate(driverId) {
        const pos = await this.redisService.geopos(RedisKeys.Driver, driverId.toString());
        const heading = await this.redisService.hget(RedisKeys.DriverHeading, driverId.toString());
        return pos[0]
            ? {
                lat: parseFloat(pos[0][1]),
                lng: parseFloat(pos[0][0]),
                heading: heading ? parseInt(heading) : undefined,
            }
            : null;
    }
    async getClose(point, distance) {
        const bare = (await this.redisService.call('GEORADIUS', RedisKeys.Driver, point.lng, point.lat, distance, 'm', 'WITHCOORD'));
        const result = bare.map(async (item) => {
            const heading = await this.redisService.hget(RedisKeys.DriverHeading, item[0]);
            return {
                driverId: parseInt(item[0]),
                location: {
                    lat: parseFloat(item[1][1]),
                    lng: parseFloat(item[1][0]),
                    heading: heading ? parseInt(heading) : undefined,
                },
            };
        });
        return Promise.all(result);
    }
    async getCloseWithoutIds(point, distance) {
        const bare = (await this.redisService.call('GEORADIUS', RedisKeys.Driver, point.lng, point.lat, distance, 'm', 'WITHCOORD'));
        const result = bare.map(async (item) => {
            const heading = await this.redisService.hget(RedisKeys.DriverHeading, item[0]);
            return {
                lat: parseFloat(item[1][1]),
                lng: parseFloat(item[1][0]),
                heading: heading ? parseInt(heading) : undefined,
            };
        });
        return Promise.all(result);
    }
    async getAllOnline(center, count) {
        const bare = (await this.redisService.call('GEORADIUS', RedisKeys.Driver, center.lng.toString(), center.lat.toString(), '22000', 'km', 'WITHCOORD', `COUNT`, count.toString(), 'ASC'));
        const times = await this.redisService.zrangebyscore(RedisKeys.DriverLocationTime, 0, new Date().getTime(), 'WITHSCORES');
        const result = bare.map(async (x) => {
            const heading = await this.redisService.hget(RedisKeys.DriverHeading, x[0]);
            return {
                driverId: parseInt(x[0]),
                location: {
                    lat: parseFloat(x[1][1]),
                    lng: parseFloat(x[1][0]),
                    heading: heading ? parseInt(heading) : undefined,
                },
                lastUpdatedAt: parseInt(times[times.indexOf(x[0]) + 1]),
            };
        });
        return Promise.all(result);
    }
    async expire(userId) {
        await this.redisService.zrem(RedisKeys.Driver, userId);
        await this.redisService.zrem(RedisKeys.DriverLocationTime, userId);
    }
};
exports.DriverRedisService = DriverRedisService;
exports.DriverRedisService = DriverRedisService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, nestjs_redis_1.InjectRedis)()),
    tslib_1.__metadata("design:paramtypes", [ioredis_1.Redis])
], DriverRedisService);
var RedisKeys;
(function (RedisKeys) {
    RedisKeys["Driver"] = "driver";
    RedisKeys["DriverHeading"] = "driver-heading";
    RedisKeys["DriverLocationTime"] = "driver-location-time";
})(RedisKeys || (RedisKeys = {}));


/***/ }),
/* 167 */
/***/ ((module) => {

module.exports = require("@songkeys/nestjs-redis");

/***/ }),
/* 168 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderRedisService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const nestjs_redis_1 = __webpack_require__(167);
const ioredis_1 = __webpack_require__(105);
const shared_driver_service_1 = __webpack_require__(164);
let OrderRedisService = class OrderRedisService {
    constructor(redisService, sharedDriverService) {
        this.redisService = redisService;
        this.sharedDriverService = sharedDriverService;
    }
    async add(request, minutesfromNow) {
        const date = new Date();
        const pickupTime = date.setMinutes(date.getMinutes() + minutesfromNow);
        await this.redisService.geoadd(RedisKeys.Request, request.points[0].lng, request.points[0].lat, request.id.toString());
        await this.redisService.zadd(RedisKeys.RequestTime, pickupTime, request.id);
        // await this.redisService.set(`${RedisKeys.Request}:${request.id}`, JSON.stringify(request));
        return request;
    }
    async getForDriver(driverId, distance) {
        const driverLocation = await this.redisService.geopos(RedisKeys.Driver, driverId.toString());
        if (driverLocation[0] == null) {
            return [];
        }
        const searchArea = distance ??
            (await this.sharedDriverService.getMaxRadiusForDriverServices(driverId));
        const requestIds = await this.redisService.georadius(RedisKeys.Request, parseFloat(driverLocation[0][0]), parseFloat(driverLocation[0][1]), searchArea, 'm');
        // const requests = [];
        const ts = Math.round(new Date().getTime());
        const min = ts - 20 * 60000;
        const max = ts + 30 * 60000;
        const _requests = await this.redisService.zrangebyscore(RedisKeys.RequestTime, min, max);
        const intersection = requestIds.filter((x) => _requests.includes(x));
        return intersection.map((x) => x.toString());
        // for (const requestId of intersection) {
        //     const requestString = await this.redisService.get(`${RedisKeys.Request}:${requestId}`);
        //     const request: RequestRedisDTO = JSON.parse(requestString!);
        //     if (request) {
        //         const canDo = await this.sharedDriverService.canDriverDoServiceAndFleet(driverId, request.serviceId, request.fleetIds);
        //         if(canDo) {
        //             requests.push(request);
        //         }
        //     }
        // }
        // return requests;
    }
    async driverNotified(requestId, driverIds) {
        const ids = driverIds.map((driverId) => driverId.id);
        for (let id of ids) {
            await this.redisService.sadd(`${RedisKeys.RequestDrivers}:${requestId}`, id);
        }
    }
    async getDriversNotified(requestId) {
        const driverIds = await this.redisService.smembers(`${RedisKeys.RequestDrivers}:${requestId}`);
        return driverIds.map((x) => parseInt(x));
    }
    async expire(requestIds) {
        common_1.Logger.log('Expire', 'OrderRedisService');
        for (const requestId of requestIds) {
            const zremRequest = await this.redisService.zrem(RedisKeys.Request, requestId);
            const zremRequestTime = await this.redisService.zrem(RedisKeys.RequestTime, requestId);
            const driversNotified = await this.getDriversNotified(requestId);
            for (let driver of driversNotified) {
                await this.redisService.srem(`${RedisKeys.RequestDrivers}:${requestId}`, driver);
            }
            const delRequestObject = await this.redisService.del([
                `${RedisKeys.Request}:${requestId}`,
            ]);
            common_1.Logger.log(`zremRequest: ${zremRequest} zremRequestTime: ${zremRequestTime} delRequestObject: ${delRequestObject}`, 'OrderRedisService');
        }
        common_1.Logger.log('Expire done', 'OrderRedisService');
        // this.redisService.del(
        //   requestIds.map((id) => `${RedisKeys.Request}:${id}`).join(' '),
        // ); // # This doesn't works for some reason. expire works
    }
    async getAll() {
        return this.getRequestsInTimeRange(0, -1);
    }
    async getRequestIdsInTimeRage(min, max) {
        return await this.redisService.zrange(RedisKeys.RequestTime, min, max);
    }
    async getRequestsInTimeRange(min, max) {
        const _requestIds = await this.getRequestIdsInTimeRage(min, max);
        return _requestIds;
        // const result: RequestRedisDTO[] = []
        // for(const requestId of _requestIds) {
        //     const request = await this.getOne(requestId);
        //     if(request != null) {
        //         result.push(request);
        //     }
        // }
        // return result;
    }
};
exports.OrderRedisService = OrderRedisService;
exports.OrderRedisService = OrderRedisService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, nestjs_redis_1.InjectRedis)()),
    tslib_1.__metadata("design:paramtypes", [ioredis_1.Redis,
        shared_driver_service_1.SharedDriverService])
], OrderRedisService);
var RedisKeys;
(function (RedisKeys) {
    RedisKeys["Driver"] = "driver";
    RedisKeys["Request"] = "request";
    RedisKeys["RequestDrivers"] = "request-drivers";
    RedisKeys["RequestTime"] = "request-time";
})(RedisKeys || (RedisKeys = {}));


/***/ }),
/* 169 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VerifyHash = exports.AuthRedisService = void 0;
const tslib_1 = __webpack_require__(1);
const apollo_1 = __webpack_require__(116);
const common_1 = __webpack_require__(2);
const nestjs_redis_1 = __webpack_require__(167);
const ioredis_1 = tslib_1.__importDefault(__webpack_require__(105));
let AuthRedisService = class AuthRedisService {
    constructor(redisService) {
        this.redisService = redisService;
    }
    async createVerificationCode(input) {
        const hash = Math.random().toString(36).substring(7);
        const verifyHash = {
            mobileNumber: input.mobileNumber,
            countryIso: input.countryIso,
            code: input.code,
        };
        await this.redisService.hset(`verify:${hash}`, verifyHash);
        await this.redisService.expire(`verify:${hash}`, 60 * 3);
        return { hash };
    }
    async isVerificationCodeValid(hash, code) {
        const verifyHash = (await this.redisService.hgetall(`verify:${hash}`));
        common_1.Logger.log(verifyHash, 'verifyHash');
        if (!verifyHash)
            throw new apollo_1.ForbiddenError('EXPIRED');
        if (process.env.DEMO_MODE != null || verifyHash.code == code) {
            return verifyHash;
        }
        else {
            throw new apollo_1.ForbiddenError('INVALID');
        }
    }
    async deleteVerificationCode(hash) {
        await this.redisService.del(`verify:${hash}`);
    }
};
exports.AuthRedisService = AuthRedisService;
exports.AuthRedisService = AuthRedisService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, nestjs_redis_1.InjectRedis)()),
    tslib_1.__metadata("design:paramtypes", [ioredis_1.default])
], AuthRedisService);
class VerifyHash {
}
exports.VerifyHash = VerifyHash;


/***/ }),
/* 170 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DriverResolver = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const graphql_1 = __webpack_require__(6);
const database_1 = __webpack_require__(8);
const operator_permission_enum_1 = __webpack_require__(93);
const transaction_action_enum_1 = __webpack_require__(17);
const transaction_status_enum_1 = __webpack_require__(18);
const operator_entity_1 = __webpack_require__(19);
const shared_driver_service_1 = __webpack_require__(164);
const apollo_1 = __webpack_require__(116);
const typeorm_1 = __webpack_require__(10);
const jwt_auth_guard_1 = __webpack_require__(115);
const driver_service_1 = __webpack_require__(171);
const driver_location_dto_1 = __webpack_require__(172);
const driver_transaction_input_1 = __webpack_require__(173);
const driver_wallet_dto_1 = __webpack_require__(174);
const driver_dto_1 = __webpack_require__(175);
const feedback_parameter_aggregate_dto_1 = __webpack_require__(200);
const typeorm_2 = __webpack_require__(7);
let DriverResolver = class DriverResolver {
    constructor(driverService, sharedDriverService, operatorRepository, context) {
        this.driverService = driverService;
        this.sharedDriverService = sharedDriverService;
        this.operatorRepository = operatorRepository;
        this.context = context;
    }
    async getDriversLocation(center, count) {
        return this.driverService.getDriversLocation(center, count);
    }
    async getDriversLocationWithData(center, count) {
        return this.driverService.getDriversLocationWithData(center, count);
    }
    async createDriverTransaction(input) {
        input.amount =
            input.action == transaction_action_enum_1.TransactionAction.Recharge
                ? Math.abs(input.amount)
                : Math.abs(input.amount) * -1;
        return this.sharedDriverService.rechargeWallet({
            ...input,
            operatorId: this.context.req.user.id,
            status: transaction_status_enum_1.TransactionStatus.Done,
        });
    }
    async deleteOneDriver(id) {
        const operator = await this.operatorRepository.findOne({
            where: { id: this.context.req.user.id },
            relations: { role: true },
        });
        if (!operator.role.permissions.includes(operator_permission_enum_1.OperatorPermission.Drivers_Edit)) {
            throw new apollo_1.ForbiddenError('PERMISSION_NOT_GRANTED');
        }
        return this.sharedDriverService.deleteById(id);
    }
    async driverFeedbackParametersSummary(driverId) {
        return this.driverService.driverFeedbackParametersSummary(driverId);
    }
};
exports.DriverResolver = DriverResolver;
tslib_1.__decorate([
    (0, graphql_1.Query)(() => [driver_location_dto_1.OnlineDriver]),
    tslib_1.__param(0, (0, graphql_1.Args)('center', { type: () => database_1.Point })),
    tslib_1.__param(1, (0, graphql_1.Args)('count', { type: () => graphql_1.Int })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [database_1.Point, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], DriverResolver.prototype, "getDriversLocation", null);
tslib_1.__decorate([
    (0, graphql_1.Query)(() => [driver_location_dto_1.OnlineDriverWithData]),
    tslib_1.__param(0, (0, graphql_1.Args)('center', { type: () => database_1.Point })),
    tslib_1.__param(1, (0, graphql_1.Args)('count', { type: () => graphql_1.Int })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [database_1.Point, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], DriverResolver.prototype, "getDriversLocationWithData", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => driver_wallet_dto_1.DriverWalletDTO),
    tslib_1.__param(0, (0, graphql_1.Args)('input', { type: () => driver_transaction_input_1.DriverTransactionInput })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [driver_transaction_input_1.DriverTransactionInput]),
    tslib_1.__metadata("design:returntype", Promise)
], DriverResolver.prototype, "createDriverTransaction", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => driver_dto_1.DriverDTO),
    tslib_1.__param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], DriverResolver.prototype, "deleteOneDriver", null);
tslib_1.__decorate([
    (0, graphql_1.Query)(() => [feedback_parameter_aggregate_dto_1.FeedbackParameterAggregateDto]),
    tslib_1.__param(0, (0, graphql_1.Args)('driverId', { type: () => graphql_1.ID })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], DriverResolver.prototype, "driverFeedbackParametersSummary", null);
exports.DriverResolver = DriverResolver = tslib_1.__decorate([
    (0, graphql_1.Resolver)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    tslib_1.__param(2, (0, typeorm_2.InjectRepository)(operator_entity_1.OperatorEntity)),
    tslib_1.__param(3, (0, common_1.Inject)(graphql_1.CONTEXT)),
    tslib_1.__metadata("design:paramtypes", [driver_service_1.DriverService,
        shared_driver_service_1.SharedDriverService,
        typeorm_1.Repository, Object])
], DriverResolver);


/***/ }),
/* 171 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DriverService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(7);
const driver_entity_1 = __webpack_require__(12);
const driver_redis_service_1 = __webpack_require__(166);
const typeorm_2 = __webpack_require__(10);
let DriverService = class DriverService {
    constructor(driverRepository, driverRedisService) {
        this.driverRepository = driverRepository;
        this.driverRedisService = driverRedisService;
    }
    getDriversLocation(center, count) {
        return this.driverRedisService.getAllOnline(center, count);
    }
    async getDriversLocationWithData(center, count) {
        const drivers = await this.getDriversLocation(center, count);
        const driverData = await this.driverRepository.findByIds(drivers.map((driver) => driver.driverId));
        const result = driverData.map((_driver) => {
            const redisDriver = drivers.filter((driver) => driver.driverId == _driver.id)[0];
            const length = _driver.mobileNumber.toString().length;
            if (process.env.DEMO_MODE != null &&
                _driver.mobileNumber != null &&
                length > 4) {
                _driver.mobileNumber = `${_driver.mobileNumber
                    .toString()
                    .substring(0, length - 3)}xxxx`;
            }
            return {
                ..._driver,
                ...redisDriver,
            };
        });
        return result;
    }
    async driverFeedbackParametersSummary(driverId) {
        return this.driverRepository.query(`
        SELECT 
            review_parameter.title,
            ANY_VALUE(review_parameter.isGood) AS isGood,
            COUNT(review_parameter.id) AS count
        FROM
            review_parameter_feedbacks_request_review
        INNER JOIN review_parameter on review_parameter.id = review_parameter_feedbacks_request_review.reviewParameterId
        INNER JOIN request_review on request_review.id = review_parameter_feedbacks_request_review.requestReviewId
        WHERE
            request_review.driverId = ?
        GROUP BY
            review_parameter.title
        ORDER BY isGood DESC, count DESC`, [driverId]);
    }
};
exports.DriverService = DriverService;
exports.DriverService = DriverService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(driver_entity_1.DriverEntity)),
    tslib_1.__metadata("design:paramtypes", [typeorm_2.Repository,
        driver_redis_service_1.DriverRedisService])
], DriverService);


/***/ }),
/* 172 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OnlineDriverWithData = exports.OnlineDriver = void 0;
const tslib_1 = __webpack_require__(1);
const eager_import_0 = __webpack_require__(72);
const eager_import_1 = __webpack_require__(95);
const eager_import_2 = __webpack_require__(27);
const graphql_1 = __webpack_require__(6);
let OnlineDriver = class OnlineDriver {
    static _GRAPHQL_METADATA_FACTORY() {
        return { location: { type: () => (__webpack_require__(72).Point) }, driverId: { type: () => Number }, lastUpdatedAt: { type: () => Number } };
    }
};
exports.OnlineDriver = OnlineDriver;
exports.OnlineDriver = OnlineDriver = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], OnlineDriver);
let OnlineDriverWithData = class OnlineDriverWithData {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, location: { type: () => (__webpack_require__(72).Point) }, lastUpdatedAt: { type: () => Number }, firstName: { nullable: true, type: () => String }, lastName: { nullable: true, type: () => String }, mobileNumber: { type: () => String }, status: { type: () => (__webpack_require__(95).DriverStatus) }, gender: { nullable: true, type: () => (__webpack_require__(27).Gender) }, rating: { nullable: true, type: () => Number }, reviewCount: { type: () => Number } };
    }
};
exports.OnlineDriverWithData = OnlineDriverWithData;
exports.OnlineDriverWithData = OnlineDriverWithData = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], OnlineDriverWithData);


/***/ }),
/* 173 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DriverTransactionInput = void 0;
const tslib_1 = __webpack_require__(1);
const eager_import_0 = __webpack_require__(17);
const eager_import_1 = __webpack_require__(15);
const eager_import_2 = __webpack_require__(16);
const graphql_1 = __webpack_require__(6);
let DriverTransactionInput = class DriverTransactionInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { action: { type: () => (__webpack_require__(17).TransactionAction) }, deductType: { nullable: true, type: () => (__webpack_require__(15).DriverDeductTransactionType) }, rechargeType: { nullable: true, type: () => (__webpack_require__(16).DriverRechargeTransactionType) }, amount: { type: () => Number }, currency: { type: () => String }, refrenceNumber: { nullable: true, type: () => String }, description: { nullable: true, type: () => String } };
    }
};
exports.DriverTransactionInput = DriverTransactionInput;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {}),
    tslib_1.__metadata("design:type", Number)
], DriverTransactionInput.prototype, "driverId", void 0);
exports.DriverTransactionInput = DriverTransactionInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], DriverTransactionInput);


/***/ }),
/* 174 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DriverWalletDTO = void 0;
const tslib_1 = __webpack_require__(1);
const nestjs_query_graphql_1 = __webpack_require__(103);
const graphql_1 = __webpack_require__(6);
const driver_dto_1 = __webpack_require__(175);
let DriverWalletDTO = class DriverWalletDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, balance: { type: () => Number }, currency: { type: () => String }, driverId: { nullable: true, type: () => Number } };
    }
};
exports.DriverWalletDTO = DriverWalletDTO;
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.IDField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], DriverWalletDTO.prototype, "id", void 0);
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.FilterableField)(() => graphql_1.Float),
    tslib_1.__metadata("design:type", Number)
], DriverWalletDTO.prototype, "balance", void 0);
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.FilterableField)(() => String),
    tslib_1.__metadata("design:type", String)
], DriverWalletDTO.prototype, "currency", void 0);
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.FilterableField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], DriverWalletDTO.prototype, "driverId", void 0);
exports.DriverWalletDTO = DriverWalletDTO = tslib_1.__decorate([
    (0, graphql_1.ObjectType)('DriverWallet'),
    (0, nestjs_query_graphql_1.Relation)('driver', () => driver_dto_1.DriverDTO, { nullable: true })
], DriverWalletDTO);


/***/ }),
/* 175 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DriverDTO = void 0;
const tslib_1 = __webpack_require__(1);
const eager_import_0 = __webpack_require__(95);
const eager_import_1 = __webpack_require__(27);
const nestjs_query_graphql_1 = __webpack_require__(103);
const graphql_1 = __webpack_require__(6);
const driver_status_enum_1 = __webpack_require__(95);
const feedback_dto_1 = __webpack_require__(176);
const number_masker_middleware_1 = __webpack_require__(179);
const order_dto_1 = __webpack_require__(180);
const service_dto_1 = __webpack_require__(153);
const media_dto_1 = __webpack_require__(158);
const driver_transaction_dto_1 = __webpack_require__(186);
const driver_wallet_dto_1 = __webpack_require__(174);
const payout_account_dto_1 = __webpack_require__(187);
let DriverDTO = class DriverDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, fleetId: { nullable: true, type: () => Number }, firstName: { nullable: true, type: () => String }, lastName: { nullable: true, type: () => String }, mobileNumber: { type: () => String }, certificateNumber: { nullable: true, type: () => String }, email: { nullable: true, type: () => String }, carPlate: { nullable: true, type: () => String }, status: { type: () => (__webpack_require__(95).DriverStatus) }, gender: { nullable: true, type: () => (__webpack_require__(27).Gender) }, rating: { nullable: true, type: () => Number }, reviewCount: { type: () => Number }, registrationTimestamp: { type: () => Date }, lastSeenTimestamp: { nullable: true, type: () => Date }, accountNumber: { nullable: true, type: () => String }, bankName: { nullable: true, type: () => String }, bankRoutingNumber: { nullable: true, type: () => String }, bankSwift: { nullable: true, type: () => String }, address: { nullable: true, type: () => String }, softRejectionNote: { nullable: true, type: () => String } };
    }
};
exports.DriverDTO = DriverDTO;
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.IDField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], DriverDTO.prototype, "id", void 0);
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.FilterableField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], DriverDTO.prototype, "fleetId", void 0);
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.FilterableField)(() => String),
    tslib_1.__metadata("design:type", String)
], DriverDTO.prototype, "lastName", void 0);
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.FilterableField)(() => String, { middleware: [number_masker_middleware_1.numberMasker] }),
    tslib_1.__metadata("design:type", String)
], DriverDTO.prototype, "mobileNumber", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    tslib_1.__metadata("design:type", Number)
], DriverDTO.prototype, "carProductionYear", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, { nullable: true }),
    tslib_1.__metadata("design:type", Number)
], DriverDTO.prototype, "carId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, { nullable: true }),
    tslib_1.__metadata("design:type", Number)
], DriverDTO.prototype, "carColorId", void 0);
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.FilterableField)(() => driver_status_enum_1.DriverStatus),
    tslib_1.__metadata("design:type", String)
], DriverDTO.prototype, "status", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, { nullable: true }),
    tslib_1.__metadata("design:type", Number)
], DriverDTO.prototype, "mediaId", void 0);
exports.DriverDTO = DriverDTO = tslib_1.__decorate([
    (0, graphql_1.ObjectType)('Driver'),
    (0, nestjs_query_graphql_1.OffsetConnection)('feedbacks', () => feedback_dto_1.FeedbackDTO, { enableAggregate: true }),
    (0, nestjs_query_graphql_1.UnPagedRelation)('wallet', () => driver_wallet_dto_1.DriverWalletDTO, { relationName: 'wallet' }),
    (0, nestjs_query_graphql_1.UnPagedRelation)('enabledServices', () => service_dto_1.ServiceDTO, {
        update: { enabled: true },
    }),
    (0, nestjs_query_graphql_1.UnPagedRelation)('documents', () => media_dto_1.MediaDTO),
    (0, nestjs_query_graphql_1.OffsetConnection)('transactions', () => driver_transaction_dto_1.DriverTransactionDTO),
    (0, nestjs_query_graphql_1.OffsetConnection)('orders', () => order_dto_1.OrderDTO),
    (0, nestjs_query_graphql_1.Relation)('media', () => media_dto_1.MediaDTO, { nullable: true }),
    (0, nestjs_query_graphql_1.OffsetConnection)('payoutAccounts', () => payout_account_dto_1.PayoutAccountDTO)
], DriverDTO);


/***/ }),
/* 176 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FeedbackDTO = void 0;
const tslib_1 = __webpack_require__(1);
const nestjs_query_graphql_1 = __webpack_require__(103);
const graphql_1 = __webpack_require__(6);
const feedback_parameter_dto_1 = __webpack_require__(177);
let FeedbackDTO = class FeedbackDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, reviewTimestamp: { type: () => Date }, description: { nullable: true, type: () => String }, driverId: { type: () => Number }, requestId: { type: () => Number } };
    }
};
exports.FeedbackDTO = FeedbackDTO;
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.IDField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], FeedbackDTO.prototype, "id", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, {}),
    tslib_1.__metadata("design:type", Number)
], FeedbackDTO.prototype, "score", void 0);
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.FilterableField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], FeedbackDTO.prototype, "driverId", void 0);
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.FilterableField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], FeedbackDTO.prototype, "requestId", void 0);
exports.FeedbackDTO = FeedbackDTO = tslib_1.__decorate([
    (0, graphql_1.ObjectType)('Feedback'),
    (0, nestjs_query_graphql_1.FilterableUnPagedRelation)('parameters', () => feedback_parameter_dto_1.FeedbackParameterDTO, {
        enableAggregate: true,
    })
], FeedbackDTO);


/***/ }),
/* 177 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FeedbackParameterDTO = void 0;
const tslib_1 = __webpack_require__(1);
const nestjs_query_graphql_1 = __webpack_require__(103);
const graphql_1 = __webpack_require__(6);
const feedback_parameter_authorizer_1 = __webpack_require__(178);
let FeedbackParameterDTO = class FeedbackParameterDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, title: { type: () => String }, isGood: { type: () => Boolean } };
    }
};
exports.FeedbackParameterDTO = FeedbackParameterDTO;
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.IDField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], FeedbackParameterDTO.prototype, "id", void 0);
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.FilterableField)(),
    tslib_1.__metadata("design:type", String)
], FeedbackParameterDTO.prototype, "title", void 0);
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.FilterableField)(),
    tslib_1.__metadata("design:type", Boolean)
], FeedbackParameterDTO.prototype, "isGood", void 0);
exports.FeedbackParameterDTO = FeedbackParameterDTO = tslib_1.__decorate([
    (0, graphql_1.ObjectType)('FeedbackParameter'),
    (0, nestjs_query_graphql_1.Authorize)(feedback_parameter_authorizer_1.FeedbackParameterAuthorizer)
], FeedbackParameterDTO);


/***/ }),
/* 178 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FeedbackParameterAuthorizer = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const operator_permission_enum_1 = __webpack_require__(93);
const operator_entity_1 = __webpack_require__(19);
const typeorm_1 = __webpack_require__(10);
let FeedbackParameterAuthorizer = class FeedbackParameterAuthorizer {
    constructor(datasource) {
        this.datasource = datasource;
    }
    async authorize(context, authorizerContext) {
        if (authorizerContext.readonly) {
            return undefined;
        }
        const operator = await this.datasource
            .getRepository(operator_entity_1.OperatorEntity)
            .findOne({
            where: { id: context.req.user.id },
            relations: { role: true },
        });
        if (!authorizerContext.readonly &&
            !operator.role.permissions.includes(operator_permission_enum_1.OperatorPermission.ReviewParameter_Edit)) {
            throw new common_1.UnauthorizedException();
        }
        return undefined;
    }
};
exports.FeedbackParameterAuthorizer = FeedbackParameterAuthorizer;
exports.FeedbackParameterAuthorizer = FeedbackParameterAuthorizer = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeorm_1.DataSource])
], FeedbackParameterAuthorizer);


/***/ }),
/* 179 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.numberMasker = void 0;
const numberMasker = async (ctx, next) => {
    let value = await next();
    const length = value.toString().length;
    if (process.env.DEMO_MODE != null && value != null && length > 4) {
        value = `${value.toString().substring(0, length - 3)}xxxx`;
    }
    return value;
};
exports.numberMasker = numberMasker;


/***/ }),
/* 180 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderDTO = void 0;
const tslib_1 = __webpack_require__(1);
const eager_import_0 = __webpack_require__(77);
const eager_import_1 = __webpack_require__(72);
const nestjs_query_graphql_1 = __webpack_require__(103);
const graphql_1 = __webpack_require__(6);
const order_status_enum_1 = __webpack_require__(77);
const provider_transaction_dto_1 = __webpack_require__(126);
const complaint_dto_1 = __webpack_require__(181);
const coupon_dto_1 = __webpack_require__(152);
const driver_transaction_dto_1 = __webpack_require__(186);
const driver_dto_1 = __webpack_require__(175);
const fleet_transaction_dto_1 = __webpack_require__(193);
const rider_transaction_dto_1 = __webpack_require__(194);
const rider_dto_1 = __webpack_require__(195);
const service_dto_1 = __webpack_require__(153);
const order_message_dto_1 = __webpack_require__(198);
const request_activity_dto_1 = __webpack_require__(199);
let OrderDTO = class OrderDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, createdOn: { type: () => Date }, startTimestamp: { nullable: true, type: () => Date }, finishTimestamp: { nullable: true, type: () => Date }, status: { type: () => (__webpack_require__(77).OrderStatus) }, costBest: { type: () => Number }, costAfterCoupon: { type: () => Number }, currency: { type: () => String }, waitMinutes: { type: () => Number }, addresses: { type: () => [String] }, points: { type: () => [(__webpack_require__(72).Point)] }, expectedTimestamp: { nullable: true, type: () => Date }, riderId: { type: () => Number }, driverId: { nullable: true, type: () => Number } };
    }
};
exports.OrderDTO = OrderDTO;
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.IDField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], OrderDTO.prototype, "id", void 0);
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.FilterableField)(),
    tslib_1.__metadata("design:type", Date)
], OrderDTO.prototype, "createdOn", void 0);
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.FilterableField)(() => order_status_enum_1.OrderStatus),
    tslib_1.__metadata("design:type", String)
], OrderDTO.prototype, "status", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, {}),
    tslib_1.__metadata("design:type", Number)
], OrderDTO.prototype, "distanceBest", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, {}),
    tslib_1.__metadata("design:type", Number)
], OrderDTO.prototype, "durationBest", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, {}),
    tslib_1.__metadata("design:type", Number)
], OrderDTO.prototype, "destinationArrivedTo", void 0);
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.FilterableField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], OrderDTO.prototype, "riderId", void 0);
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.FilterableField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], OrderDTO.prototype, "driverId", void 0);
exports.OrderDTO = OrderDTO = tslib_1.__decorate([
    (0, graphql_1.ObjectType)('Order'),
    (0, nestjs_query_graphql_1.Relation)('driver', () => driver_dto_1.DriverDTO, { nullable: true }),
    (0, nestjs_query_graphql_1.Relation)('rider', () => rider_dto_1.RiderDTO, { nullable: true }),
    (0, nestjs_query_graphql_1.Relation)('service', () => service_dto_1.ServiceDTO, { nullable: true }),
    (0, nestjs_query_graphql_1.Relation)('coupon', () => coupon_dto_1.CouponDTO, { nullable: true }),
    (0, nestjs_query_graphql_1.UnPagedRelation)('complaints', () => complaint_dto_1.ComplaintDTO),
    (0, nestjs_query_graphql_1.UnPagedRelation)('conversation', () => order_message_dto_1.OrderMessageDTO, {
        relationName: 'conversation',
    }),
    (0, nestjs_query_graphql_1.UnPagedRelation)('riderTransactions', () => rider_transaction_dto_1.RiderTransactionDTO),
    (0, nestjs_query_graphql_1.UnPagedRelation)('driverTransactions', () => driver_transaction_dto_1.DriverTransactionDTO),
    (0, nestjs_query_graphql_1.UnPagedRelation)('fleetTransactions', () => fleet_transaction_dto_1.FleetTransactionDTO),
    (0, nestjs_query_graphql_1.UnPagedRelation)('providerTransactions', () => provider_transaction_dto_1.ProviderTransactionDTO),
    (0, nestjs_query_graphql_1.UnPagedRelation)('activities', () => request_activity_dto_1.RequestActivityDTO)
], OrderDTO);


/***/ }),
/* 181 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ComplaintDTO = void 0;
const tslib_1 = __webpack_require__(1);
const eager_import_0 = __webpack_require__(22);
const nestjs_query_graphql_1 = __webpack_require__(103);
const graphql_1 = __webpack_require__(6);
const complaint_status_enum_1 = __webpack_require__(22);
const order_dto_1 = __webpack_require__(180);
const complaint_activity_dto_1 = __webpack_require__(182);
let ComplaintDTO = class ComplaintDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, inscriptionTimestamp: { type: () => Date }, requestedByDriver: { type: () => Boolean }, subject: { type: () => String }, content: { nullable: true, type: () => String }, status: { type: () => (__webpack_require__(22).ComplaintStatus) }, requestId: { type: () => Number } };
    }
};
exports.ComplaintDTO = ComplaintDTO;
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.IDField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], ComplaintDTO.prototype, "id", void 0);
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.FilterableField)(() => complaint_status_enum_1.ComplaintStatus),
    tslib_1.__metadata("design:type", String)
], ComplaintDTO.prototype, "status", void 0);
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.FilterableField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], ComplaintDTO.prototype, "requestId", void 0);
exports.ComplaintDTO = ComplaintDTO = tslib_1.__decorate([
    (0, graphql_1.ObjectType)('Complaint'),
    (0, nestjs_query_graphql_1.UnPagedRelation)('activities', () => complaint_activity_dto_1.ComplaintActivityDTO, {
        pagingStrategy: nestjs_query_graphql_1.PagingStrategies.NONE,
    }),
    (0, nestjs_query_graphql_1.Relation)('order', () => order_dto_1.OrderDTO, { relationName: 'request' })
], ComplaintDTO);


/***/ }),
/* 182 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ComplaintActivityDTO = void 0;
const tslib_1 = __webpack_require__(1);
const eager_import_0 = __webpack_require__(90);
const nestjs_query_graphql_1 = __webpack_require__(103);
const graphql_1 = __webpack_require__(6);
const operator_dto_1 = __webpack_require__(183);
let ComplaintActivityDTO = class ComplaintActivityDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, type: { type: () => (__webpack_require__(90).ComplaintActivityType) }, comment: { nullable: true, type: () => String }, complaintId: { type: () => Number } };
    }
};
exports.ComplaintActivityDTO = ComplaintActivityDTO;
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.IDField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], ComplaintActivityDTO.prototype, "id", void 0);
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.FilterableField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], ComplaintActivityDTO.prototype, "complaintId", void 0);
exports.ComplaintActivityDTO = ComplaintActivityDTO = tslib_1.__decorate([
    (0, graphql_1.ObjectType)('ComplaintActivity'),
    (0, nestjs_query_graphql_1.Relation)('actor', () => operator_dto_1.OperatorDTO),
    (0, nestjs_query_graphql_1.Relation)('assignedTo', () => operator_dto_1.OperatorDTO, { nullable: true })
], ComplaintActivityDTO);


/***/ }),
/* 183 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OperatorDTO = void 0;
const tslib_1 = __webpack_require__(1);
const nestjs_query_graphql_1 = __webpack_require__(103);
const graphql_1 = __webpack_require__(6);
const operator_role_dto_1 = __webpack_require__(184);
const operator_authorizer_1 = __webpack_require__(185);
let OperatorDTO = class OperatorDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, firstName: { nullable: true, type: () => String }, lastName: { nullable: true, type: () => String }, userName: { type: () => String }, mobileNumber: { nullable: true, type: () => String }, email: { nullable: true, type: () => String } };
    }
};
exports.OperatorDTO = OperatorDTO;
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.IDField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], OperatorDTO.prototype, "id", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, { nullable: true }),
    tslib_1.__metadata("design:type", Number)
], OperatorDTO.prototype, "roleId", void 0);
exports.OperatorDTO = OperatorDTO = tslib_1.__decorate([
    (0, graphql_1.ObjectType)('Operator'),
    (0, nestjs_query_graphql_1.Relation)('role', () => operator_role_dto_1.OperatorRoleDTO, { nullable: true }),
    (0, nestjs_query_graphql_1.Authorize)(operator_authorizer_1.OperatorAuthorizer)
], OperatorDTO);


/***/ }),
/* 184 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OperatorRoleDTO = void 0;
const tslib_1 = __webpack_require__(1);
const eager_import_0 = __webpack_require__(93);
const nestjs_query_graphql_1 = __webpack_require__(103);
const graphql_1 = __webpack_require__(6);
const operator_authorizer_1 = __webpack_require__(185);
let OperatorRoleDTO = class OperatorRoleDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, title: { type: () => String }, permissions: { type: () => [(__webpack_require__(93).OperatorPermission)] } };
    }
};
exports.OperatorRoleDTO = OperatorRoleDTO;
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.IDField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], OperatorRoleDTO.prototype, "id", void 0);
exports.OperatorRoleDTO = OperatorRoleDTO = tslib_1.__decorate([
    (0, graphql_1.ObjectType)('OperatorRole'),
    (0, nestjs_query_graphql_1.Authorize)(operator_authorizer_1.OperatorAuthorizer)
], OperatorRoleDTO);


/***/ }),
/* 185 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OperatorAuthorizer = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const operator_permission_enum_1 = __webpack_require__(93);
const operator_entity_1 = __webpack_require__(19);
const typeorm_1 = __webpack_require__(10);
let OperatorAuthorizer = class OperatorAuthorizer {
    constructor(datasource) {
        this.datasource = datasource;
    }
    async authorize(context, authorizerContext) {
        const operator = await this.datasource
            .getRepository(operator_entity_1.OperatorEntity)
            .findOne({
            where: { id: context.req.user.id },
            relations: { role: true },
        });
        if (authorizerContext.readonly &&
            !operator.role.permissions.includes(operator_permission_enum_1.OperatorPermission.Users_View)) {
            throw new common_1.UnauthorizedException();
        }
        if (!authorizerContext.readonly &&
            !operator.role.permissions.includes(operator_permission_enum_1.OperatorPermission.Users_Edit)) {
            throw new common_1.UnauthorizedException();
        }
        return undefined;
    }
};
exports.OperatorAuthorizer = OperatorAuthorizer;
exports.OperatorAuthorizer = OperatorAuthorizer = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeorm_1.DataSource])
], OperatorAuthorizer);


/***/ }),
/* 186 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DriverTransactionDTO = void 0;
const tslib_1 = __webpack_require__(1);
const eager_import_0 = __webpack_require__(17);
const eager_import_1 = __webpack_require__(18);
const eager_import_2 = __webpack_require__(15);
const eager_import_3 = __webpack_require__(16);
const nestjs_query_graphql_1 = __webpack_require__(103);
const graphql_1 = __webpack_require__(6);
const transaction_status_enum_1 = __webpack_require__(18);
const operator_dto_1 = __webpack_require__(183);
const payout_account_dto_1 = __webpack_require__(187);
const driver_dto_1 = __webpack_require__(175);
let DriverTransactionDTO = class DriverTransactionDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, createdAt: { type: () => Date }, action: { type: () => (__webpack_require__(17).TransactionAction) }, status: { type: () => (__webpack_require__(18).TransactionStatus) }, deductType: { nullable: true, type: () => (__webpack_require__(15).DriverDeductTransactionType) }, rechargeType: { nullable: true, type: () => (__webpack_require__(16).DriverRechargeTransactionType) }, amount: { type: () => Number }, currency: { type: () => String }, refrenceNumber: { nullable: true, type: () => String }, driverId: { type: () => Number }, paymentGatewayId: { nullable: true, type: () => Number }, payoutSessionId: { nullable: true, type: () => Number }, payoutAccountId: { nullable: true, type: () => Number }, payoutMethodId: { nullable: true, type: () => Number }, requestId: { nullable: true, type: () => Number }, description: { nullable: true, type: () => String } };
    }
};
exports.DriverTransactionDTO = DriverTransactionDTO;
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.FilterableField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], DriverTransactionDTO.prototype, "id", void 0);
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.FilterableField)(),
    tslib_1.__metadata("design:type", Date)
], DriverTransactionDTO.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.FilterableField)(() => transaction_status_enum_1.TransactionStatus),
    tslib_1.__metadata("design:type", String)
], DriverTransactionDTO.prototype, "status", void 0);
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.FilterableField)(),
    tslib_1.__metadata("design:type", Number)
], DriverTransactionDTO.prototype, "amount", void 0);
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.FilterableField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], DriverTransactionDTO.prototype, "driverId", void 0);
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.FilterableField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], DriverTransactionDTO.prototype, "paymentGatewayId", void 0);
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.FilterableField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], DriverTransactionDTO.prototype, "payoutSessionId", void 0);
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.FilterableField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], DriverTransactionDTO.prototype, "payoutAccountId", void 0);
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.FilterableField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], DriverTransactionDTO.prototype, "payoutMethodId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, { nullable: true }),
    tslib_1.__metadata("design:type", Number)
], DriverTransactionDTO.prototype, "operatorId", void 0);
exports.DriverTransactionDTO = DriverTransactionDTO = tslib_1.__decorate([
    (0, graphql_1.ObjectType)('DriverTransaction'),
    (0, nestjs_query_graphql_1.Relation)('operator', () => operator_dto_1.OperatorDTO, { nullable: true }),
    (0, nestjs_query_graphql_1.Relation)('driver', () => driver_dto_1.DriverDTO, { nullable: true }),
    (0, nestjs_query_graphql_1.Relation)('payoutAccount', () => payout_account_dto_1.PayoutAccountDTO, {
        nullable: true,
    })
], DriverTransactionDTO);


/***/ }),
/* 187 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PayoutAccountDTO = void 0;
const tslib_1 = __webpack_require__(1);
const eager_import_0 = __webpack_require__(45);
const graphql_1 = __webpack_require__(6);
const nestjs_query_graphql_1 = __webpack_require__(103);
const payout_method_dto_1 = __webpack_require__(188);
let PayoutAccountDTO = class PayoutAccountDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, name: { type: () => String }, type: { type: () => (__webpack_require__(45).SavedPaymentMethodType) }, last4: { type: () => String }, currency: { type: () => String }, payoutMethodId: { type: () => Number }, isDefault: { type: () => Object }, accountNumber: { nullable: true, type: () => String }, routingNumber: { nullable: true, type: () => String }, accountHolderName: { nullable: true, type: () => String }, bankName: { nullable: true, type: () => String }, branchName: { nullable: true, type: () => String }, accountHolderAddress: { nullable: true, type: () => String }, accountHolderCity: { nullable: true, type: () => String }, accountHolderState: { nullable: true, type: () => String }, accountHolderZip: { nullable: true, type: () => String }, accountHolderCountry: { nullable: true, type: () => String }, accountHolderPhone: { nullable: true, type: () => String }, accountHolderDateOfBirth: { nullable: true, type: () => Date }, isVerified: { type: () => Boolean } };
    }
};
exports.PayoutAccountDTO = PayoutAccountDTO;
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.IDField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], PayoutAccountDTO.prototype, "id", void 0);
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.FilterableField)(),
    tslib_1.__metadata("design:type", Boolean)
], PayoutAccountDTO.prototype, "isDefault", void 0);
exports.PayoutAccountDTO = PayoutAccountDTO = tslib_1.__decorate([
    (0, graphql_1.ObjectType)('PayoutAccount'),
    (0, nestjs_query_graphql_1.Relation)('payoutMethod', () => payout_method_dto_1.PayoutMethodDTO)
], PayoutAccountDTO);


/***/ }),
/* 188 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PayoutMethodDTO = void 0;
const tslib_1 = __webpack_require__(1);
const eager_import_0 = __webpack_require__(49);
const graphql_1 = __webpack_require__(6);
const nestjs_query_graphql_1 = __webpack_require__(103);
const payout_method_type_enum_1 = __webpack_require__(49);
const media_dto_1 = __webpack_require__(158);
const driver_transaction_dto_1 = __webpack_require__(186);
const stripe_1 = __webpack_require__(189);
const payout_authorizer_1 = __webpack_require__(190);
const payment_gateway_dto_1 = __webpack_require__(191);
let PayoutMethodDTO = class PayoutMethodDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, enabled: { type: () => Boolean }, currency: { type: () => String }, name: { type: () => String }, description: { nullable: true, type: () => String }, type: { type: () => (__webpack_require__(49).PayoutMethodType) } };
    }
};
exports.PayoutMethodDTO = PayoutMethodDTO;
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.IDField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], PayoutMethodDTO.prototype, "id", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true, middleware: [payment_gateway_dto_1.apiKeyMasker] }),
    tslib_1.__metadata("design:type", String)
], PayoutMethodDTO.prototype, "publicKey", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true, middleware: [payment_gateway_dto_1.apiKeyMasker] }),
    tslib_1.__metadata("design:type", String)
], PayoutMethodDTO.prototype, "privateKey", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true, middleware: [payment_gateway_dto_1.apiKeyMasker] }),
    tslib_1.__metadata("design:type", String)
], PayoutMethodDTO.prototype, "saltKey", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true, middleware: [payment_gateway_dto_1.apiKeyMasker] }),
    tslib_1.__metadata("design:type", String)
], PayoutMethodDTO.prototype, "merchantId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, { nullable: true }),
    tslib_1.__metadata("design:type", Number)
], PayoutMethodDTO.prototype, "mediaId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, { nullable: true,
        middleware: [
            async (context, next) => {
                if (context.source.type === payout_method_type_enum_1.PayoutMethodType.Stripe) {
                    const stripe = new stripe_1.Stripe(context.source.privateKey, {
                        apiVersion: '2022-11-15',
                    });
                    const balance = await stripe.balance.retrieve();
                    return (balance.available.find((balance) => balance.currency.toLowerCase() ===
                        context.source.currency.toLowerCase())?.amount ?? 0);
                }
                return null;
            },
        ] }),
    tslib_1.__metadata("design:type", Number)
], PayoutMethodDTO.prototype, "balance", void 0);
exports.PayoutMethodDTO = PayoutMethodDTO = tslib_1.__decorate([
    (0, graphql_1.ObjectType)('PayoutMethod'),
    (0, nestjs_query_graphql_1.Relation)('media', () => media_dto_1.MediaDTO, { nullable: true }),
    (0, nestjs_query_graphql_1.FilterableRelation)('driverTransactions', () => driver_transaction_dto_1.DriverTransactionDTO),
    (0, nestjs_query_graphql_1.Authorize)(payout_authorizer_1.PayoutAuthorizer)
], PayoutMethodDTO);


/***/ }),
/* 189 */
/***/ ((module) => {

module.exports = require("stripe");

/***/ }),
/* 190 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PayoutAuthorizer = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const operator_permission_enum_1 = __webpack_require__(93);
const operator_entity_1 = __webpack_require__(19);
const typeorm_1 = __webpack_require__(10);
let PayoutAuthorizer = class PayoutAuthorizer {
    constructor(datasource) {
        this.datasource = datasource;
    }
    async authorize(context, authorizerContext) {
        const operator = await this.datasource
            .getRepository(operator_entity_1.OperatorEntity)
            .findOne({
            where: { id: context.req.user.id },
            relations: {
                role: true,
            },
        });
        if (authorizerContext.readonly &&
            !operator.role.permissions.includes(operator_permission_enum_1.OperatorPermission.Payouts_View)) {
            throw new common_1.UnauthorizedException();
        }
        if (!authorizerContext.readonly &&
            !operator.role.permissions.includes(operator_permission_enum_1.OperatorPermission.Payouts_Edit)) {
            if (authorizerContext.operationGroup === 'create' ||
                authorizerContext.operationGroup === 'update' ||
                authorizerContext.operationGroup === 'delete') {
                throw new common_1.UnauthorizedException();
            }
        }
        return undefined;
    }
};
exports.PayoutAuthorizer = PayoutAuthorizer;
exports.PayoutAuthorizer = PayoutAuthorizer = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeorm_1.DataSource])
], PayoutAuthorizer);


/***/ }),
/* 191 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PaymentGatewayDTO = exports.apiKeyMasker = void 0;
const tslib_1 = __webpack_require__(1);
const eager_import_0 = __webpack_require__(39);
const nestjs_query_graphql_1 = __webpack_require__(103);
const graphql_1 = __webpack_require__(6);
const media_dto_1 = __webpack_require__(158);
const gateway_authorizer_1 = __webpack_require__(192);
const apiKeyMasker = async (ctx, next) => {
    let value = await next();
    if (process.env.DEMO_MODE != null && value != null && value.length > 0) {
        value = value
            .toString()
            .split('')
            .map(() => '*')
            .join('');
    }
    return value;
};
exports.apiKeyMasker = apiKeyMasker;
let PaymentGatewayDTO = class PaymentGatewayDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, enabled: { type: () => Boolean }, title: { type: () => String }, type: { type: () => (__webpack_require__(39).PaymentGatewayType) }, mediaId: { nullable: true, type: () => Number } };
    }
};
exports.PaymentGatewayDTO = PaymentGatewayDTO;
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.IDField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], PaymentGatewayDTO.prototype, "id", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true, middleware: [exports.apiKeyMasker] }),
    tslib_1.__metadata("design:type", String)
], PaymentGatewayDTO.prototype, "publicKey", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => String, { middleware: [exports.apiKeyMasker] }),
    tslib_1.__metadata("design:type", String)
], PaymentGatewayDTO.prototype, "privateKey", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true, middleware: [exports.apiKeyMasker] }),
    tslib_1.__metadata("design:type", String)
], PaymentGatewayDTO.prototype, "merchantId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true, middleware: [exports.apiKeyMasker] }),
    tslib_1.__metadata("design:type", String)
], PaymentGatewayDTO.prototype, "saltKey", void 0);
exports.PaymentGatewayDTO = PaymentGatewayDTO = tslib_1.__decorate([
    (0, graphql_1.ObjectType)('PaymentGateway'),
    (0, nestjs_query_graphql_1.Authorize)(gateway_authorizer_1.GatewayAuthorizer),
    (0, nestjs_query_graphql_1.Relation)('media', () => media_dto_1.MediaDTO, { nullable: true })
], PaymentGatewayDTO);


/***/ }),
/* 192 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GatewayAuthorizer = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const operator_permission_enum_1 = __webpack_require__(93);
const operator_entity_1 = __webpack_require__(19);
const typeorm_1 = __webpack_require__(10);
let GatewayAuthorizer = class GatewayAuthorizer {
    constructor(datasource) {
        this.datasource = datasource;
    }
    async authorize(context, authorizerContext) {
        const operator = await this.datasource
            .getRepository(operator_entity_1.OperatorEntity)
            .findOne({
            where: { id: context.req.user.id },
            relations: {
                role: true,
            },
        });
        if (authorizerContext.readonly &&
            !operator.role.permissions.includes(operator_permission_enum_1.OperatorPermission.Gateways_View)) {
            throw new common_1.UnauthorizedException();
        }
        if (!authorizerContext.readonly &&
            !operator.role.permissions.includes(operator_permission_enum_1.OperatorPermission.Gateways_Edit)) {
            throw new common_1.UnauthorizedException();
        }
        return undefined;
    }
};
exports.GatewayAuthorizer = GatewayAuthorizer;
exports.GatewayAuthorizer = GatewayAuthorizer = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeorm_1.DataSource])
], GatewayAuthorizer);


/***/ }),
/* 193 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FleetTransactionDTO = void 0;
const tslib_1 = __webpack_require__(1);
const eager_import_0 = __webpack_require__(17);
const nestjs_query_graphql_1 = __webpack_require__(103);
const graphql_1 = __webpack_require__(6);
const operator_dto_1 = __webpack_require__(183);
let FleetTransactionDTO = class FleetTransactionDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, transactionTimestamp: { type: () => Date }, action: { type: () => (__webpack_require__(17).TransactionAction) }, deductType: { nullable: true, type: () => String }, rechargeType: { nullable: true, type: () => String }, amount: { type: () => Number }, currency: { type: () => String }, refrenceNumber: { nullable: true, type: () => String }, description: { nullable: true, type: () => String }, operatorId: { nullable: true, type: () => Number }, requestId: { nullable: true, type: () => Number }, fleetId: { type: () => Number } };
    }
};
exports.FleetTransactionDTO = FleetTransactionDTO;
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.IDField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], FleetTransactionDTO.prototype, "id", void 0);
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.FilterableField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], FleetTransactionDTO.prototype, "operatorId", void 0);
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.FilterableField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], FleetTransactionDTO.prototype, "requestId", void 0);
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.FilterableField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], FleetTransactionDTO.prototype, "fleetId", void 0);
exports.FleetTransactionDTO = FleetTransactionDTO = tslib_1.__decorate([
    (0, graphql_1.ObjectType)('FleetTransaction'),
    (0, nestjs_query_graphql_1.Relation)('operator', () => operator_dto_1.OperatorDTO, { nullable: true })
], FleetTransactionDTO);


/***/ }),
/* 194 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RiderTransactionDTO = void 0;
const tslib_1 = __webpack_require__(1);
const eager_import_0 = __webpack_require__(17);
const eager_import_1 = __webpack_require__(35);
const eager_import_2 = __webpack_require__(36);
const eager_import_3 = __webpack_require__(18);
const nestjs_query_graphql_1 = __webpack_require__(103);
const graphql_1 = __webpack_require__(6);
const operator_dto_1 = __webpack_require__(183);
const payment_gateway_dto_1 = __webpack_require__(191);
const rider_dto_1 = __webpack_require__(195);
let RiderTransactionDTO = class RiderTransactionDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, action: { type: () => (__webpack_require__(17).TransactionAction) }, createdAt: { type: () => Date }, deductType: { nullable: true, type: () => (__webpack_require__(35).RiderDeductTransactionType) }, rechargeType: { nullable: true, type: () => (__webpack_require__(36).RiderRechargeTransactionType) }, status: { type: () => (__webpack_require__(18).TransactionStatus) }, amount: { type: () => Number }, currency: { type: () => String }, refrenceNumber: { nullable: true, type: () => String }, description: { nullable: true, type: () => String }, riderId: { type: () => Number } };
    }
};
exports.RiderTransactionDTO = RiderTransactionDTO;
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.IDField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], RiderTransactionDTO.prototype, "id", void 0);
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.FilterableField)(),
    tslib_1.__metadata("design:type", Date)
], RiderTransactionDTO.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.FilterableField)(() => graphql_1.Float),
    tslib_1.__metadata("design:type", Number)
], RiderTransactionDTO.prototype, "amount", void 0);
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.FilterableField)(() => String),
    tslib_1.__metadata("design:type", String)
], RiderTransactionDTO.prototype, "currency", void 0);
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.FilterableField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], RiderTransactionDTO.prototype, "riderId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, { nullable: true }),
    tslib_1.__metadata("design:type", Number)
], RiderTransactionDTO.prototype, "paymentGatewayId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, { nullable: true }),
    tslib_1.__metadata("design:type", Number)
], RiderTransactionDTO.prototype, "operatorId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, { nullable: true }),
    tslib_1.__metadata("design:type", Number)
], RiderTransactionDTO.prototype, "requestId", void 0);
exports.RiderTransactionDTO = RiderTransactionDTO = tslib_1.__decorate([
    (0, graphql_1.ObjectType)('RiderTransaction'),
    (0, nestjs_query_graphql_1.Relation)('operator', () => operator_dto_1.OperatorDTO, { nullable: true }),
    (0, nestjs_query_graphql_1.Relation)('paymentGateway', () => payment_gateway_dto_1.PaymentGatewayDTO, { nullable: true }),
    (0, nestjs_query_graphql_1.Relation)('rider', () => rider_dto_1.RiderDTO)
], RiderTransactionDTO);


/***/ }),
/* 195 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RiderDTO = void 0;
const tslib_1 = __webpack_require__(1);
const eager_import_0 = __webpack_require__(29);
const nestjs_query_graphql_1 = __webpack_require__(103);
const graphql_1 = __webpack_require__(6);
const gender_enum_1 = __webpack_require__(27);
const number_masker_middleware_1 = __webpack_require__(179);
const order_dto_1 = __webpack_require__(180);
const media_dto_1 = __webpack_require__(158);
const rider_address_dto_1 = __webpack_require__(196);
const rider_transaction_dto_1 = __webpack_require__(194);
const rider_wallet_dto_1 = __webpack_require__(197);
let RiderDTO = class RiderDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, status: { type: () => (__webpack_require__(29).RiderStatus) }, firstName: { nullable: true, type: () => String }, lastName: { nullable: true, type: () => String }, mobileNumber: { type: () => String }, registrationTimestamp: { type: () => Date }, email: { nullable: true, type: () => String }, isResident: { nullable: true, type: () => Boolean }, idNumber: { nullable: true, type: () => String } };
    }
};
exports.RiderDTO = RiderDTO;
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.IDField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], RiderDTO.prototype, "id", void 0);
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.FilterableField)(),
    tslib_1.__metadata("design:type", String)
], RiderDTO.prototype, "firstName", void 0);
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.FilterableField)(),
    tslib_1.__metadata("design:type", String)
], RiderDTO.prototype, "lastName", void 0);
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.FilterableField)(() => String, { middleware: [number_masker_middleware_1.numberMasker] }),
    tslib_1.__metadata("design:type", String)
], RiderDTO.prototype, "mobileNumber", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => gender_enum_1.Gender, { nullable: true }),
    tslib_1.__metadata("design:type", String)
], RiderDTO.prototype, "gender", void 0);
exports.RiderDTO = RiderDTO = tslib_1.__decorate([
    (0, graphql_1.ObjectType)('Rider'),
    (0, nestjs_query_graphql_1.OffsetConnection)('addresses', () => rider_address_dto_1.RiderAddressDTO),
    (0, nestjs_query_graphql_1.OffsetConnection)('wallet', () => rider_wallet_dto_1.RiderWalletDTO),
    (0, nestjs_query_graphql_1.OffsetConnection)('transactions', () => rider_transaction_dto_1.RiderTransactionDTO),
    (0, nestjs_query_graphql_1.OffsetConnection)('orders', () => order_dto_1.OrderDTO),
    (0, nestjs_query_graphql_1.Relation)('media', () => media_dto_1.MediaDTO, { nullable: true })
], RiderDTO);


/***/ }),
/* 196 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RiderAddressDTO = void 0;
const tslib_1 = __webpack_require__(1);
const eager_import_0 = __webpack_require__(74);
const eager_import_1 = __webpack_require__(72);
const nestjs_query_graphql_1 = __webpack_require__(103);
const graphql_1 = __webpack_require__(6);
let RiderAddressDTO = class RiderAddressDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, type: { type: () => (__webpack_require__(74).RiderAddressType) }, title: { type: () => String }, details: { nullable: true, type: () => String }, location: { type: () => (__webpack_require__(72).Point) }, riderId: { type: () => Number } };
    }
};
exports.RiderAddressDTO = RiderAddressDTO;
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.IDField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], RiderAddressDTO.prototype, "id", void 0);
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.FilterableField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], RiderAddressDTO.prototype, "riderId", void 0);
exports.RiderAddressDTO = RiderAddressDTO = tslib_1.__decorate([
    (0, graphql_1.ObjectType)('RiderAddress')
], RiderAddressDTO);


/***/ }),
/* 197 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RiderWalletDTO = void 0;
const tslib_1 = __webpack_require__(1);
const nestjs_query_graphql_1 = __webpack_require__(103);
const graphql_1 = __webpack_require__(6);
const rider_dto_1 = __webpack_require__(195);
let RiderWalletDTO = class RiderWalletDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, balance: { type: () => Number }, currency: { type: () => String }, riderId: { nullable: true, type: () => Number } };
    }
};
exports.RiderWalletDTO = RiderWalletDTO;
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.IDField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], RiderWalletDTO.prototype, "id", void 0);
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.FilterableField)(() => graphql_1.Float),
    tslib_1.__metadata("design:type", Number)
], RiderWalletDTO.prototype, "balance", void 0);
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.FilterableField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], RiderWalletDTO.prototype, "riderId", void 0);
exports.RiderWalletDTO = RiderWalletDTO = tslib_1.__decorate([
    (0, graphql_1.ObjectType)('RiderWallet'),
    (0, nestjs_query_graphql_1.Relation)('rider', () => rider_dto_1.RiderDTO, { nullable: true })
], RiderWalletDTO);


/***/ }),
/* 198 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderMessageDTO = void 0;
const tslib_1 = __webpack_require__(1);
const eager_import_0 = __webpack_require__(81);
const graphql_1 = __webpack_require__(6);
const nestjs_query_graphql_1 = __webpack_require__(103);
let OrderMessageDTO = class OrderMessageDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, sentAt: { type: () => Date }, sentByDriver: { type: () => Boolean }, status: { type: () => (__webpack_require__(81).MessageStatus) }, content: { type: () => String } };
    }
};
exports.OrderMessageDTO = OrderMessageDTO;
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.IDField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], OrderMessageDTO.prototype, "id", void 0);
exports.OrderMessageDTO = OrderMessageDTO = tslib_1.__decorate([
    (0, graphql_1.ObjectType)('OrderMessage')
], OrderMessageDTO);


/***/ }),
/* 199 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RequestActivityDTO = void 0;
const tslib_1 = __webpack_require__(1);
const eager_import_0 = __webpack_require__(83);
const nestjs_query_graphql_1 = __webpack_require__(103);
const graphql_1 = __webpack_require__(6);
let RequestActivityDTO = class RequestActivityDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, createdAt: { type: () => Date }, type: { type: () => (__webpack_require__(83).RequestActivityType) } };
    }
};
exports.RequestActivityDTO = RequestActivityDTO;
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.IDField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], RequestActivityDTO.prototype, "id", void 0);
exports.RequestActivityDTO = RequestActivityDTO = tslib_1.__decorate([
    (0, graphql_1.ObjectType)('RequestActivity')
], RequestActivityDTO);


/***/ }),
/* 200 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FeedbackParameterAggregateDto = void 0;
const tslib_1 = __webpack_require__(1);
const graphql_1 = __webpack_require__(6);
let FeedbackParameterAggregateDto = class FeedbackParameterAggregateDto {
    static _GRAPHQL_METADATA_FACTORY() {
        return { title: { type: () => String }, isGood: { type: () => Boolean } };
    }
};
exports.FeedbackParameterAggregateDto = FeedbackParameterAggregateDto;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {}),
    tslib_1.__metadata("design:type", Number)
], FeedbackParameterAggregateDto.prototype, "count", void 0);
exports.FeedbackParameterAggregateDto = FeedbackParameterAggregateDto = tslib_1.__decorate([
    (0, graphql_1.ObjectType)('FeedbackParameterAggregate')
], FeedbackParameterAggregateDto);


/***/ }),
/* 201 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateDriverInput = void 0;
const tslib_1 = __webpack_require__(1);
const eager_import_0 = __webpack_require__(95);
const eager_import_1 = __webpack_require__(27);
const graphql_1 = __webpack_require__(6);
let UpdateDriverInput = class UpdateDriverInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { mobileNumber: { nullable: true, type: () => String }, firstName: { nullable: true, type: () => String }, lastName: { nullable: true, type: () => String }, certificateNumber: { nullable: true, type: () => String }, email: { nullable: true, type: () => String }, carPlate: { nullable: true, type: () => String }, status: { nullable: true, type: () => (__webpack_require__(95).DriverStatus) }, gender: { nullable: true, type: () => (__webpack_require__(27).Gender) }, accountNumber: { nullable: true, type: () => String }, bankName: { nullable: true, type: () => String }, bankRoutingNumber: { nullable: true, type: () => String }, bankSwift: { nullable: true, type: () => String }, address: { nullable: true, type: () => String }, softRejectionNote: { nullable: true, type: () => String } };
    }
};
exports.UpdateDriverInput = UpdateDriverInput;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, { nullable: true }),
    tslib_1.__metadata("design:type", Number)
], UpdateDriverInput.prototype, "fleetId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, { nullable: true }),
    tslib_1.__metadata("design:type", Number)
], UpdateDriverInput.prototype, "carId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, { nullable: true }),
    tslib_1.__metadata("design:type", Number)
], UpdateDriverInput.prototype, "carColorId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    tslib_1.__metadata("design:type", Number)
], UpdateDriverInput.prototype, "carProductionYear", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, { nullable: true }),
    tslib_1.__metadata("design:type", Number)
], UpdateDriverInput.prototype, "mediaId", void 0);
exports.UpdateDriverInput = UpdateDriverInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], UpdateDriverInput);


/***/ }),
/* 202 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FeedbackModule = void 0;
const tslib_1 = __webpack_require__(1);
const nestjs_query_graphql_1 = __webpack_require__(103);
const nestjs_query_typeorm_1 = __webpack_require__(111);
const common_1 = __webpack_require__(2);
const feedback_parameter_entity_1 = __webpack_require__(79);
const feedback_entity_1 = __webpack_require__(78);
const jwt_auth_guard_1 = __webpack_require__(115);
const feedback_parameter_dto_1 = __webpack_require__(177);
const feedback_dto_1 = __webpack_require__(176);
const feedback_parameter_input_1 = __webpack_require__(203);
let FeedbackModule = class FeedbackModule {
};
exports.FeedbackModule = FeedbackModule;
exports.FeedbackModule = FeedbackModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_query_graphql_1.NestjsQueryGraphQLModule.forFeature({
                imports: [
                    nestjs_query_typeorm_1.NestjsQueryTypeOrmModule.forFeature([
                        feedback_entity_1.FeedbackEntity,
                        feedback_parameter_entity_1.FeedbackParameterEntity,
                    ]),
                ],
                resolvers: [
                    {
                        EntityClass: feedback_entity_1.FeedbackEntity,
                        DTOClass: feedback_dto_1.FeedbackDTO,
                        create: { disabled: true },
                        update: { many: { disabled: true } },
                        delete: { disabled: true },
                        pagingStrategy: nestjs_query_graphql_1.PagingStrategies.OFFSET,
                        enableTotalCount: true,
                        guards: [jwt_auth_guard_1.JwtAuthGuard],
                    },
                    {
                        EntityClass: feedback_parameter_entity_1.FeedbackParameterEntity,
                        DTOClass: feedback_parameter_dto_1.FeedbackParameterDTO,
                        CreateDTOClass: feedback_parameter_input_1.FeedbackParameterInput,
                        UpdateDTOClass: feedback_parameter_input_1.FeedbackParameterInput,
                        create: { many: { disabled: true } },
                        update: { many: { disabled: true } },
                        delete: { many: { disabled: true } },
                        pagingStrategy: nestjs_query_graphql_1.PagingStrategies.NONE,
                        guards: [jwt_auth_guard_1.JwtAuthGuard],
                    },
                ],
            }),
        ],
    })
], FeedbackModule);


/***/ }),
/* 203 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FeedbackParameterInput = void 0;
const tslib_1 = __webpack_require__(1);
const graphql_1 = __webpack_require__(6);
let FeedbackParameterInput = class FeedbackParameterInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { title: { type: () => String }, isGood: { type: () => Boolean } };
    }
};
exports.FeedbackParameterInput = FeedbackParameterInput;
exports.FeedbackParameterInput = FeedbackParameterInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], FeedbackParameterInput);


/***/ }),
/* 204 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FleetModule = void 0;
const tslib_1 = __webpack_require__(1);
const nestjs_query_graphql_1 = __webpack_require__(103);
const nestjs_query_typeorm_1 = __webpack_require__(111);
const common_1 = __webpack_require__(2);
const fleet_transaction_entity_1 = __webpack_require__(67);
const fleet_wallet_entity_1 = __webpack_require__(68);
const fleet_entity_1 = __webpack_require__(64);
const shared_fleet_service_1 = __webpack_require__(205);
const jwt_auth_guard_1 = __webpack_require__(115);
const fleet_transaction_dto_1 = __webpack_require__(193);
const fleet_wallet_dto_1 = __webpack_require__(206);
const fleet_dto_1 = __webpack_require__(207);
const fleet_resolver_1 = __webpack_require__(210);
const fleet_input_1 = __webpack_require__(212);
let FleetModule = class FleetModule {
};
exports.FleetModule = FleetModule;
exports.FleetModule = FleetModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_query_graphql_1.NestjsQueryGraphQLModule.forFeature({
                imports: [
                    nestjs_query_typeorm_1.NestjsQueryTypeOrmModule.forFeature([
                        fleet_entity_1.FleetEntity,
                        fleet_transaction_entity_1.FleetTransactionEntity,
                        fleet_wallet_entity_1.FleetWalletEntity,
                    ]),
                ],
                resolvers: [
                    {
                        EntityClass: fleet_entity_1.FleetEntity,
                        DTOClass: fleet_dto_1.FleetDTO,
                        CreateDTOClass: fleet_input_1.FleetInput,
                        UpdateDTOClass: fleet_input_1.FleetInput,
                        create: { many: { disabled: true } },
                        update: { many: { disabled: true } },
                        delete: { disabled: true },
                        pagingStrategy: nestjs_query_graphql_1.PagingStrategies.OFFSET,
                        enableTotalCount: true,
                        guards: [jwt_auth_guard_1.JwtAuthGuard],
                    },
                    {
                        EntityClass: fleet_wallet_entity_1.FleetWalletEntity,
                        DTOClass: fleet_wallet_dto_1.FleetWalletDTO,
                        create: { disabled: true },
                        update: { disabled: true },
                        delete: { disabled: true },
                        pagingStrategy: nestjs_query_graphql_1.PagingStrategies.OFFSET,
                        enableTotalCount: true,
                        guards: [jwt_auth_guard_1.JwtAuthGuard],
                    },
                    {
                        EntityClass: fleet_transaction_entity_1.FleetTransactionEntity,
                        DTOClass: fleet_transaction_dto_1.FleetTransactionDTO,
                        create: { disabled: true },
                        update: { disabled: true },
                        delete: { disabled: true },
                        pagingStrategy: nestjs_query_graphql_1.PagingStrategies.OFFSET,
                        enableTotalCount: true,
                        guards: [jwt_auth_guard_1.JwtAuthGuard],
                    },
                ],
            }),
        ],
        providers: [fleet_resolver_1.FleetResolver, shared_fleet_service_1.SharedFleetService],
    })
], FleetModule);


/***/ }),
/* 205 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SharedFleetService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(7);
const fleet_transaction_entity_1 = __webpack_require__(67);
const fleet_wallet_entity_1 = __webpack_require__(68);
const typeorm_2 = __webpack_require__(10);
const fleet_entity_1 = __webpack_require__(64);
let SharedFleetService = class SharedFleetService {
    constructor(fleetRepository, fleetWalletRepository, fleetTransactionEntity) {
        this.fleetRepository = fleetRepository;
        this.fleetWalletRepository = fleetWalletRepository;
        this.fleetTransactionEntity = fleetTransactionEntity;
    }
    async rechargeWallet(transaction) {
        let wallet = await this.fleetWalletRepository.findOneBy({
            fleetId: transaction.fleetId,
            currency: transaction.currency,
        });
        if (wallet == null) {
            wallet = await this.fleetWalletRepository.save({
                fleetId: transaction.fleetId,
                balance: transaction.amount,
                currency: transaction.currency,
            });
        }
        else {
            await this.fleetWalletRepository.update(wallet.id, {
                balance: transaction.amount + wallet.balance,
            });
            wallet.balance += transaction.amount;
        }
        this.fleetTransactionEntity.save(transaction);
        return wallet;
    }
    async getFleetIdsInPoint(point) {
        const fleets = await this.fleetRepository.query(`SELECT id FROM fleet WHERE ST_Within(st_geomfromtext('POINT(? ?)'), fleet.exclusivityAreas)`, [point.lng, point.lat]);
        return fleets.map((fleet) => fleet.id);
    }
    async getFleetById(id) {
        return this.fleetRepository.findOneBy({ id });
    }
};
exports.SharedFleetService = SharedFleetService;
exports.SharedFleetService = SharedFleetService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(fleet_entity_1.FleetEntity)),
    tslib_1.__param(1, (0, typeorm_1.InjectRepository)(fleet_wallet_entity_1.FleetWalletEntity)),
    tslib_1.__param(2, (0, typeorm_1.InjectRepository)(fleet_transaction_entity_1.FleetTransactionEntity)),
    tslib_1.__metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], SharedFleetService);


/***/ }),
/* 206 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FleetWalletDTO = void 0;
const tslib_1 = __webpack_require__(1);
const nestjs_query_graphql_1 = __webpack_require__(103);
const graphql_1 = __webpack_require__(6);
const fleet_dto_1 = __webpack_require__(207);
let FleetWalletDTO = class FleetWalletDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, balance: { type: () => Number }, currency: { type: () => String }, fleetId: { type: () => Number } };
    }
};
exports.FleetWalletDTO = FleetWalletDTO;
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.IDField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], FleetWalletDTO.prototype, "id", void 0);
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.FilterableField)(() => graphql_1.Float),
    tslib_1.__metadata("design:type", Number)
], FleetWalletDTO.prototype, "balance", void 0);
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.FilterableField)(() => String),
    tslib_1.__metadata("design:type", String)
], FleetWalletDTO.prototype, "currency", void 0);
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.FilterableField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], FleetWalletDTO.prototype, "fleetId", void 0);
exports.FleetWalletDTO = FleetWalletDTO = tslib_1.__decorate([
    (0, graphql_1.ObjectType)('FleetWallet'),
    (0, nestjs_query_graphql_1.Relation)('fleet', () => fleet_dto_1.FleetDTO)
], FleetWalletDTO);


/***/ }),
/* 207 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FleetDTO = void 0;
const tslib_1 = __webpack_require__(1);
const eager_import_0 = __webpack_require__(72);
const nestjs_query_graphql_1 = __webpack_require__(103);
const graphql_1 = __webpack_require__(6);
const zone_price_dto_1 = __webpack_require__(208);
const fleet_transaction_dto_1 = __webpack_require__(193);
const fleet_wallet_dto_1 = __webpack_require__(206);
const fleet_authorizer_1 = __webpack_require__(209);
let FleetDTO = class FleetDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, name: { type: () => String }, phoneNumber: { type: () => String }, mobileNumber: { type: () => String }, userName: { nullable: true, type: () => String }, password: { nullable: true, type: () => String }, accountNumber: { type: () => String }, commissionSharePercent: { type: () => Number }, commissionShareFlat: { type: () => Number }, feeMultiplier: { nullable: true, type: () => Number }, address: { nullable: true, type: () => String }, exclusivityAreas: { nullable: true, type: () => [[(__webpack_require__(72).Point)]] } };
    }
};
exports.FleetDTO = FleetDTO;
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.IDField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], FleetDTO.prototype, "id", void 0);
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.FilterableField)(),
    tslib_1.__metadata("design:type", String)
], FleetDTO.prototype, "name", void 0);
exports.FleetDTO = FleetDTO = tslib_1.__decorate([
    (0, graphql_1.ObjectType)('Fleet'),
    (0, nestjs_query_graphql_1.UnPagedRelation)('wallet', () => fleet_wallet_dto_1.FleetWalletDTO, { relationName: 'wallet' }),
    (0, nestjs_query_graphql_1.OffsetConnection)('transactions', () => fleet_transaction_dto_1.FleetTransactionDTO),
    (0, nestjs_query_graphql_1.OffsetConnection)('zonePrices', () => zone_price_dto_1.ZonePriceDTO),
    (0, nestjs_query_graphql_1.Authorize)(fleet_authorizer_1.FleetAuthorizer)
], FleetDTO);


/***/ }),
/* 208 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ZonePriceDTO = void 0;
const tslib_1 = __webpack_require__(1);
const eager_import_0 = __webpack_require__(72);
const eager_import_1 = __webpack_require__(101);
const nestjs_query_graphql_1 = __webpack_require__(103);
const graphql_1 = __webpack_require__(6);
const fleet_dto_1 = __webpack_require__(207);
const service_authorizer_1 = __webpack_require__(160);
const service_dto_1 = __webpack_require__(153);
let ZonePriceDTO = class ZonePriceDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, name: { type: () => String }, from: { type: () => [[(__webpack_require__(72).Point)]] }, to: { type: () => [[(__webpack_require__(72).Point)]] }, cost: { type: () => Number }, timeMultipliers: { type: () => [(__webpack_require__(101).TimeMultiplier)] } };
    }
};
exports.ZonePriceDTO = ZonePriceDTO;
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.IDField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], ZonePriceDTO.prototype, "id", void 0);
exports.ZonePriceDTO = ZonePriceDTO = tslib_1.__decorate([
    (0, graphql_1.ObjectType)('ZonePrice'),
    (0, nestjs_query_graphql_1.UnPagedRelation)('fleets', () => fleet_dto_1.FleetDTO, {
        update: { enabled: true },
    }),
    (0, nestjs_query_graphql_1.UnPagedRelation)('services', () => service_dto_1.ServiceDTO, {
        update: { enabled: true },
    }),
    (0, nestjs_query_graphql_1.Authorize)(service_authorizer_1.ServiceAuthorizer)
], ZonePriceDTO);


/***/ }),
/* 209 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FleetAuthorizer = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const operator_permission_enum_1 = __webpack_require__(93);
const operator_entity_1 = __webpack_require__(19);
const typeorm_1 = __webpack_require__(10);
let FleetAuthorizer = class FleetAuthorizer {
    constructor(datasource) {
        this.datasource = datasource;
    }
    async authorize(context, authorizerContext) {
        const operator = await this.datasource
            .getRepository(operator_entity_1.OperatorEntity)
            .findOne({ where: { id: context.req.user.id }, relations: ['role'] });
        if (authorizerContext.readonly &&
            !operator.role.permissions.includes(operator_permission_enum_1.OperatorPermission.Fleets_View)) {
            throw new common_1.UnauthorizedException();
        }
        if (!authorizerContext.readonly &&
            !operator.role.permissions.includes(operator_permission_enum_1.OperatorPermission.Fleets_Edit)) {
            throw new common_1.UnauthorizedException();
        }
        return undefined;
    }
};
exports.FleetAuthorizer = FleetAuthorizer;
exports.FleetAuthorizer = FleetAuthorizer = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeorm_1.DataSource])
], FleetAuthorizer);


/***/ }),
/* 210 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FleetResolver = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const graphql_1 = __webpack_require__(6);
const transaction_action_enum_1 = __webpack_require__(17);
const shared_fleet_service_1 = __webpack_require__(205);
const jwt_auth_guard_1 = __webpack_require__(115);
const fleet_transaction_input_1 = __webpack_require__(211);
const fleet_wallet_dto_1 = __webpack_require__(206);
let FleetResolver = class FleetResolver {
    constructor(sharedFleetService, context) {
        this.sharedFleetService = sharedFleetService;
        this.context = context;
    }
    async createFleetTransaction(input) {
        input.amount = input.action == transaction_action_enum_1.TransactionAction.Recharge ? Math.abs(input.amount) : Math.abs(input.amount) * -1;
        return this.sharedFleetService.rechargeWallet({ ...input, operatorId: this.context.req.user.id });
    }
};
exports.FleetResolver = FleetResolver;
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => fleet_wallet_dto_1.FleetWalletDTO),
    tslib_1.__param(0, (0, graphql_1.Args)('input', { type: () => fleet_transaction_input_1.FleetTransactionInput })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [fleet_transaction_input_1.FleetTransactionInput]),
    tslib_1.__metadata("design:returntype", Promise)
], FleetResolver.prototype, "createFleetTransaction", null);
exports.FleetResolver = FleetResolver = tslib_1.__decorate([
    (0, graphql_1.Resolver)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    tslib_1.__param(1, (0, common_1.Inject)(graphql_1.CONTEXT)),
    tslib_1.__metadata("design:paramtypes", [shared_fleet_service_1.SharedFleetService, Object])
], FleetResolver);


/***/ }),
/* 211 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FleetTransactionInput = void 0;
const tslib_1 = __webpack_require__(1);
const eager_import_0 = __webpack_require__(17);
const graphql_1 = __webpack_require__(6);
let FleetTransactionInput = class FleetTransactionInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { action: { type: () => (__webpack_require__(17).TransactionAction) }, deductType: { nullable: true, type: () => String }, rechargeType: { nullable: true, type: () => String }, amount: { type: () => Number }, currency: { type: () => String }, refrenceNumber: { nullable: true, type: () => String }, description: { nullable: true, type: () => String } };
    }
};
exports.FleetTransactionInput = FleetTransactionInput;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {}),
    tslib_1.__metadata("design:type", Number)
], FleetTransactionInput.prototype, "fleetId", void 0);
exports.FleetTransactionInput = FleetTransactionInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], FleetTransactionInput);


/***/ }),
/* 212 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FleetInput = void 0;
const tslib_1 = __webpack_require__(1);
const eager_import_0 = __webpack_require__(72);
const graphql_1 = __webpack_require__(6);
let FleetInput = class FleetInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { name: { type: () => String }, phoneNumber: { type: () => String }, mobileNumber: { type: () => String }, userName: { type: () => String }, password: { type: () => String }, accountNumber: { type: () => String }, commissionSharePercent: { type: () => Number }, commissionShareFlat: { type: () => Number }, feeMultiplier: { nullable: true, type: () => Number }, address: { nullable: true, type: () => String }, exclusivityAreas: { nullable: true, type: () => [[(__webpack_require__(72).Point)]] } };
    }
};
exports.FleetInput = FleetInput;
exports.FleetInput = FleetInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], FleetInput);


/***/ }),
/* 213 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OperatorModule = void 0;
const tslib_1 = __webpack_require__(1);
const nestjs_query_graphql_1 = __webpack_require__(103);
const nestjs_query_typeorm_1 = __webpack_require__(111);
const common_1 = __webpack_require__(2);
const operator_role_entity_1 = __webpack_require__(92);
const operator_entity_1 = __webpack_require__(19);
const jwt_auth_guard_1 = __webpack_require__(115);
const operator_role_dto_1 = __webpack_require__(184);
const operator_dto_1 = __webpack_require__(183);
const create_operator_input_1 = __webpack_require__(214);
const operator_service_1 = __webpack_require__(215);
const operator_resolver_1 = __webpack_require__(216);
const operator_role_input_1 = __webpack_require__(218);
let OperatorModule = class OperatorModule {
};
exports.OperatorModule = OperatorModule;
exports.OperatorModule = OperatorModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_query_graphql_1.NestjsQueryGraphQLModule.forFeature({
                imports: [
                    nestjs_query_typeorm_1.NestjsQueryTypeOrmModule.forFeature([
                        operator_entity_1.OperatorEntity,
                        operator_role_entity_1.OperatorRoleEntity,
                    ]),
                ],
                resolvers: [
                    {
                        EntityClass: operator_role_entity_1.OperatorRoleEntity,
                        DTOClass: operator_role_dto_1.OperatorRoleDTO,
                        CreateDTOClass: operator_role_input_1.OperatorRoleInput,
                        UpdateDTOClass: operator_role_input_1.OperatorRoleInput,
                        create: { many: { disabled: true } },
                        update: { many: { disabled: true } },
                        delete: { disabled: true },
                        pagingStrategy: nestjs_query_graphql_1.PagingStrategies.NONE,
                        guards: [jwt_auth_guard_1.JwtAuthGuard],
                    },
                    {
                        EntityClass: operator_entity_1.OperatorEntity,
                        DTOClass: operator_dto_1.OperatorDTO,
                        CreateDTOClass: create_operator_input_1.CreateOperatorInput,
                        create: { many: { disabled: true } },
                        update: { many: { disabled: true } },
                        delete: { disabled: true },
                        pagingStrategy: nestjs_query_graphql_1.PagingStrategies.OFFSET,
                        enableTotalCount: true,
                        guards: [jwt_auth_guard_1.JwtAuthGuard],
                    },
                ],
            }),
        ],
        providers: [operator_service_1.OperatorService, operator_resolver_1.OperatorResolver],
        exports: [operator_service_1.OperatorService],
    })
], OperatorModule);


/***/ }),
/* 214 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateOperatorInput = void 0;
const tslib_1 = __webpack_require__(1);
const nestjs_query_graphql_1 = __webpack_require__(103);
const graphql_1 = __webpack_require__(6);
const operator_authorizer_1 = __webpack_require__(185);
let CreateOperatorInput = class CreateOperatorInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { firstName: { nullable: true, type: () => String }, lastName: { nullable: true, type: () => String }, userName: { type: () => String }, password: { type: () => String }, mobileNumber: { type: () => String }, email: { nullable: true, type: () => String } };
    }
};
exports.CreateOperatorInput = CreateOperatorInput;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {}),
    tslib_1.__metadata("design:type", Number)
], CreateOperatorInput.prototype, "roleId", void 0);
exports.CreateOperatorInput = CreateOperatorInput = tslib_1.__decorate([
    (0, graphql_1.InputType)(),
    (0, nestjs_query_graphql_1.Authorize)(operator_authorizer_1.OperatorAuthorizer)
], CreateOperatorInput);


/***/ }),
/* 215 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OperatorService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(7);
const operator_entity_1 = __webpack_require__(19);
const apollo_1 = __webpack_require__(116);
const typeorm_2 = __webpack_require__(10);
let OperatorService = class OperatorService {
    constructor(repo) {
        this.repo = repo;
    }
    async validateCredentials(userName, password) {
        return this.repo.findOneBy({ userName, password });
    }
    async getById(id) {
        return this.repo.findOneBy({ id });
    }
    async hasPermission(id, permission) {
        const operator = await this.repo.findOneOrFail({
            where: { id },
            relations: { role: true },
        });
        const hasPermission = operator.role.permissions.includes(permission);
        if (!hasPermission)
            throw new apollo_1.ForbiddenError('PERMISSION_NOT_GRANTED');
        return operator;
    }
    async hasPermissionBoolean(id, permission) {
        const operator = await this.repo.findOneOrFail({
            where: { id },
            relations: { role: true },
        });
        return operator.role.permissions.includes(permission);
    }
};
exports.OperatorService = OperatorService;
exports.OperatorService = OperatorService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(operator_entity_1.OperatorEntity)),
    tslib_1.__metadata("design:paramtypes", [typeorm_2.Repository])
], OperatorService);


/***/ }),
/* 216 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OperatorResolver = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const graphql_1 = __webpack_require__(6);
const apollo_1 = __webpack_require__(116);
const jwt_auth_guard_1 = __webpack_require__(115);
const operator_dto_1 = __webpack_require__(183);
const update_password_input_1 = __webpack_require__(217);
const operator_service_1 = __webpack_require__(215);
let OperatorResolver = class OperatorResolver {
    constructor(service, context) {
        this.service = service;
        this.context = context;
    }
    async updatePassword(input) {
        if (process.env.DEMO_MODE != null) {
            throw new apollo_1.ForbiddenError('Action not allowed in demo mode.');
        }
        const operator = await this.service.getById(this.context.req.user.id);
        if (operator.password != input.oldPassword) {
            throw new apollo_1.ForbiddenError("Old password don't match");
        }
        await this.service.repo.update(operator.id, { password: input.newPasswod });
        operator.password = input.newPasswod;
        return operator;
    }
};
exports.OperatorResolver = OperatorResolver;
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => operator_dto_1.OperatorDTO),
    tslib_1.__param(0, (0, graphql_1.Args)('input', { type: () => update_password_input_1.UpdatePasswordInput })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [update_password_input_1.UpdatePasswordInput]),
    tslib_1.__metadata("design:returntype", Promise)
], OperatorResolver.prototype, "updatePassword", null);
exports.OperatorResolver = OperatorResolver = tslib_1.__decorate([
    (0, graphql_1.Resolver)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    tslib_1.__param(1, (0, common_1.Inject)(graphql_1.CONTEXT)),
    tslib_1.__metadata("design:paramtypes", [operator_service_1.OperatorService, Object])
], OperatorResolver);


/***/ }),
/* 217 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdatePasswordInput = void 0;
const tslib_1 = __webpack_require__(1);
const graphql_1 = __webpack_require__(6);
let UpdatePasswordInput = class UpdatePasswordInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { oldPassword: { type: () => String }, newPasswod: { type: () => String } };
    }
};
exports.UpdatePasswordInput = UpdatePasswordInput;
exports.UpdatePasswordInput = UpdatePasswordInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], UpdatePasswordInput);


/***/ }),
/* 218 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OperatorRoleInput = void 0;
const tslib_1 = __webpack_require__(1);
const eager_import_0 = __webpack_require__(93);
const graphql_1 = __webpack_require__(6);
let OperatorRoleInput = class OperatorRoleInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { title: { type: () => String }, permissions: { type: () => [(__webpack_require__(93).OperatorPermission)] } };
    }
};
exports.OperatorRoleInput = OperatorRoleInput;
exports.OperatorRoleInput = OperatorRoleInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], OperatorRoleInput);


/***/ }),
/* 219 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderModule = void 0;
const tslib_1 = __webpack_require__(1);
const nestjs_query_graphql_1 = __webpack_require__(103);
const nestjs_query_typeorm_1 = __webpack_require__(111);
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(7);
const database_1 = __webpack_require__(8);
const request_activity_entity_1 = __webpack_require__(82);
const request_message_entity_1 = __webpack_require__(80);
const request_entity_1 = __webpack_require__(23);
const shared_order_module_1 = __webpack_require__(220);
const redis_helper_module_1 = __webpack_require__(165);
const jwt_auth_guard_1 = __webpack_require__(115);
const dispatcher_resolver_1 = __webpack_require__(238);
const order_message_dto_1 = __webpack_require__(198);
const order_dto_1 = __webpack_require__(180);
const order_subscription_service_1 = __webpack_require__(245);
const order_service_1 = __webpack_require__(244);
const order_cancel_reason_entity_1 = __webpack_require__(88);
const order_cancel_reason_dto_1 = __webpack_require__(246);
const order_cancel_reason_input_1 = __webpack_require__(247);
let OrderModule = class OrderModule {
};
exports.OrderModule = OrderModule;
exports.OrderModule = OrderModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            shared_order_module_1.SharedOrderModule,
            redis_helper_module_1.RedisHelpersModule,
            typeorm_1.TypeOrmModule.forFeature([request_activity_entity_1.RequestActivityEntity]),
            nestjs_query_graphql_1.NestjsQueryGraphQLModule.forFeature({
                imports: [
                    nestjs_query_typeorm_1.NestjsQueryTypeOrmModule.forFeature([
                        request_entity_1.RequestEntity,
                        request_message_entity_1.OrderMessageEntity,
                        order_cancel_reason_entity_1.OrderCancelReasonEntity,
                    ]),
                ],
                pubSub: database_1.RedisPubSubProvider.provider(),
                resolvers: [
                    {
                        EntityClass: request_entity_1.RequestEntity,
                        DTOClass: order_dto_1.OrderDTO,
                        pagingStrategy: nestjs_query_graphql_1.PagingStrategies.OFFSET,
                        enableTotalCount: true,
                        enableAggregate: true,
                        guards: [jwt_auth_guard_1.JwtAuthGuard],
                        create: { disabled: true },
                        update: { disabled: true },
                        delete: { disabled: true },
                    },
                    {
                        EntityClass: request_message_entity_1.OrderMessageEntity,
                        DTOClass: order_message_dto_1.OrderMessageDTO,
                        pagingStrategy: nestjs_query_graphql_1.PagingStrategies.OFFSET,
                        create: { disabled: true },
                        update: { disabled: true },
                        delete: { disabled: true },
                        read: { disabled: true },
                    },
                    {
                        EntityClass: order_cancel_reason_entity_1.OrderCancelReasonEntity,
                        DTOClass: order_cancel_reason_dto_1.OrderCancelReasonDTO,
                        CreateDTOClass: order_cancel_reason_input_1.OrderCancelReasonInput,
                        UpdateDTOClass: order_cancel_reason_input_1.OrderCancelReasonInput,
                        guards: [jwt_auth_guard_1.JwtAuthGuard],
                        create: { many: { disabled: true } },
                        update: { many: { disabled: true } },
                        delete: { many: { disabled: true } },
                        pagingStrategy: nestjs_query_graphql_1.PagingStrategies.OFFSET,
                        enableTotalCount: true,
                    },
                ],
            }),
        ],
        providers: [
            dispatcher_resolver_1.DispatcherResolver,
            order_subscription_service_1.OrderSubscriptionService,
            order_service_1.OrderService,
            database_1.RedisPubSubProvider.provider(),
        ],
    })
], OrderModule);


/***/ }),
/* 220 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SharedOrderModule = void 0;
const tslib_1 = __webpack_require__(1);
const axios_1 = __webpack_require__(5);
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(7);
const common_coupon_module_1 = __webpack_require__(221);
const redis_pub_sub_provider_1 = __webpack_require__(102);
const driver_transaction_entity_1 = __webpack_require__(14);
const driver_wallet_entity_1 = __webpack_require__(94);
const driver_entity_1 = __webpack_require__(12);
const fleet_transaction_entity_1 = __webpack_require__(67);
const fleet_wallet_entity_1 = __webpack_require__(68);
const fleet_entity_1 = __webpack_require__(64);
const payment_entity_1 = __webpack_require__(97);
const provider_transaction_entity_1 = __webpack_require__(40);
const provider_wallet_entity_1 = __webpack_require__(96);
const request_activity_entity_1 = __webpack_require__(82);
const request_entity_1 = __webpack_require__(23);
const rider_entity_1 = __webpack_require__(26);
const rider_transaction_entity_1 = __webpack_require__(34);
const rider_wallet_entity_1 = __webpack_require__(75);
const service_category_entity_1 = __webpack_require__(59);
const service_option_entity_1 = __webpack_require__(60);
const service_entity_1 = __webpack_require__(52);
const zone_price_entity_1 = __webpack_require__(63);
const redis_helper_module_1 = __webpack_require__(165);
const shared_configuration_service_1 = __webpack_require__(225);
const firebase_notification_service_module_1 = __webpack_require__(226);
const google_services_module_1 = __webpack_require__(229);
const region_module_1 = __webpack_require__(232);
const service_service_1 = __webpack_require__(234);
const shared_driver_service_1 = __webpack_require__(164);
const shared_fleet_service_1 = __webpack_require__(205);
const shared_order_service_1 = __webpack_require__(235);
const shared_provider_service_1 = __webpack_require__(236);
const shared_rider_service_1 = __webpack_require__(224);
let SharedOrderModule = class SharedOrderModule {
};
exports.SharedOrderModule = SharedOrderModule;
exports.SharedOrderModule = SharedOrderModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            redis_helper_module_1.RedisHelpersModule,
            common_coupon_module_1.CommonCouponModule,
            typeorm_1.TypeOrmModule.forFeature([
                service_category_entity_1.ServiceCategoryEntity,
                service_option_entity_1.ServiceOptionEntity,
                service_entity_1.ServiceEntity,
                rider_entity_1.RiderEntity,
                driver_entity_1.DriverEntity,
                driver_wallet_entity_1.DriverWalletEntity,
                driver_transaction_entity_1.DriverTransactionEntity,
                fleet_entity_1.FleetEntity,
                fleet_wallet_entity_1.FleetWalletEntity,
                fleet_transaction_entity_1.FleetTransactionEntity,
                provider_wallet_entity_1.ProviderWalletEntity,
                provider_transaction_entity_1.ProviderTransactionEntity,
                rider_wallet_entity_1.RiderWalletEntity,
                rider_transaction_entity_1.RiderTransactionEntity,
                request_entity_1.RequestEntity,
                request_activity_entity_1.RequestActivityEntity,
                zone_price_entity_1.ZonePriceEntity,
                payment_entity_1.PaymentEntity,
            ]),
            axios_1.HttpModule,
            region_module_1.RegionModule,
            google_services_module_1.GoogleServicesModule,
            firebase_notification_service_module_1.FirebaseNotificationModule.register(),
        ],
        providers: [
            redis_pub_sub_provider_1.RedisPubSubProvider.provider(),
            service_service_1.ServiceService,
            shared_driver_service_1.SharedDriverService,
            shared_fleet_service_1.SharedFleetService,
            shared_order_service_1.SharedOrderService,
            shared_provider_service_1.SharedProviderService,
            shared_rider_service_1.SharedRiderService,
            shared_configuration_service_1.SharedConfigurationService,
        ],
        exports: [
            shared_driver_service_1.SharedDriverService,
            shared_fleet_service_1.SharedFleetService,
            shared_order_service_1.SharedOrderService,
            shared_provider_service_1.SharedProviderService,
            shared_rider_service_1.SharedRiderService,
        ],
    })
], SharedOrderModule);


/***/ }),
/* 221 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommonCouponModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(7);
const coupon_entity_1 = __webpack_require__(25);
const request_entity_1 = __webpack_require__(23);
const common_coupon_service_1 = __webpack_require__(222);
const common_gift_card_service_1 = __webpack_require__(223);
const gift_code_entity_1 = __webpack_require__(37);
const shared_rider_service_1 = __webpack_require__(224);
const shared_driver_service_1 = __webpack_require__(164);
const rider_entity_1 = __webpack_require__(26);
const driver_entity_1 = __webpack_require__(12);
const rider_wallet_entity_1 = __webpack_require__(75);
const driver_wallet_entity_1 = __webpack_require__(94);
const rider_transaction_entity_1 = __webpack_require__(34);
const driver_transaction_entity_1 = __webpack_require__(14);
let CommonCouponModule = class CommonCouponModule {
};
exports.CommonCouponModule = CommonCouponModule;
exports.CommonCouponModule = CommonCouponModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                request_entity_1.RequestEntity,
                rider_entity_1.RiderEntity,
                driver_entity_1.DriverEntity,
                coupon_entity_1.CouponEntity,
                rider_wallet_entity_1.RiderWalletEntity,
                driver_wallet_entity_1.DriverWalletEntity,
                rider_transaction_entity_1.RiderTransactionEntity,
                driver_transaction_entity_1.DriverTransactionEntity,
                gift_code_entity_1.GiftCodeEntity,
            ]),
        ],
        providers: [
            common_coupon_service_1.CommonCouponService,
            common_gift_card_service_1.CommonGiftCardService,
            shared_rider_service_1.SharedRiderService,
            shared_driver_service_1.SharedDriverService,
        ],
        exports: [common_coupon_service_1.CommonCouponService, common_gift_card_service_1.CommonGiftCardService],
    })
], CommonCouponModule);


/***/ }),
/* 222 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommonCouponService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(7);
const coupon_entity_1 = __webpack_require__(25);
const request_entity_1 = __webpack_require__(23);
const apollo_1 = __webpack_require__(116);
const typeorm_2 = __webpack_require__(10);
let CommonCouponService = class CommonCouponService {
    constructor(couponRepo, requestRepo) {
        this.couponRepo = couponRepo;
        this.requestRepo = requestRepo;
    }
    applyCouponOnPrice(coupon, price) {
        if (coupon == null)
            return price;
        price *= (100.0 - coupon.discountPercent) / 100.0;
        price -= coupon.discountFlat;
        return price;
    }
    async getCouponInfo(input) {
        const coupon = await this.couponRepo.findOneBy({ code: input.code });
        if (coupon == null) {
            throw new apollo_1.ForbiddenError('Incorrect code');
        }
        if (coupon.expireAt == null || coupon.expireAt < new Date()) {
            throw new apollo_1.ForbiddenError('Coupon expired');
        }
        if (input.riderId != null) {
            const requestsWithCoupon = await this.requestRepo.count({
                where: { riderId: input.riderId, couponId: coupon.id },
            });
            if (requestsWithCoupon >= coupon.manyTimesUserCanUse) {
                throw new apollo_1.ForbiddenError('Coupon already used.');
            }
        }
        if (!coupon.isEnabled) {
            throw new apollo_1.ForbiddenError('Coupon is disabled.');
        }
        const timesCouponUsed = await this.requestRepo.count({
            where: { couponId: coupon.id },
        });
        if (timesCouponUsed >= coupon.manyUsersCanUse) {
            throw new apollo_1.ForbiddenError('Coupon usage limit exceeded.');
        }
        return coupon;
    }
    async checkCoupon(code, riderId) {
        const coupon = await this.couponRepo.findOneBy({ code });
        if (coupon == null) {
            throw new apollo_1.ForbiddenError('Incorrect code');
        }
        if (coupon.expireAt == null || coupon.expireAt < new Date()) {
            throw new apollo_1.ForbiddenError('Coupon expired');
        }
        if (riderId != null) {
            const requestsWithCoupon = await this.requestRepo.count({
                where: { riderId, couponId: coupon.id },
            });
            if (requestsWithCoupon >= coupon.manyTimesUserCanUse) {
                throw new apollo_1.ForbiddenError('Coupon already used.');
            }
        }
        if (!coupon.isEnabled) {
            throw new apollo_1.ForbiddenError('Coupon is disabled.');
        }
        const timesCouponUsed = await this.requestRepo.count({
            where: { couponId: coupon.id },
        });
        if (timesCouponUsed >= coupon.manyUsersCanUse) {
            throw new apollo_1.ForbiddenError('Coupon usage limit exceeded.');
        }
        return coupon;
    }
    async applyCoupon(code, orderId, riderId) {
        const coupon = await this.checkCoupon(code, riderId);
        let request = await this.requestRepo.findOneOrFail({
            where: { id: orderId },
            relations: { service: true },
        });
        const finalCost = this.applyCouponOnPrice(coupon, request.costBest + request.waitMinutes * request.service.perMinuteWait);
        await this.requestRepo.update(request.id, {
            couponId: coupon.id,
            costAfterCoupon: finalCost,
        });
        request = await this.requestRepo.findOneOrFail({
            where: { id: orderId },
            relations: { service: true },
        });
        return request;
    }
};
exports.CommonCouponService = CommonCouponService;
exports.CommonCouponService = CommonCouponService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(coupon_entity_1.CouponEntity)),
    tslib_1.__param(1, (0, typeorm_1.InjectRepository)(request_entity_1.RequestEntity)),
    tslib_1.__metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CommonCouponService);


/***/ }),
/* 223 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommonGiftCardService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(7);
const driver_recharge_transaction_type_enum_1 = __webpack_require__(16);
const rider_recharge_transaction_type_enum_1 = __webpack_require__(36);
const transaction_action_enum_1 = __webpack_require__(17);
const transaction_status_enum_1 = __webpack_require__(18);
const gift_code_entity_1 = __webpack_require__(37);
const shared_driver_service_1 = __webpack_require__(164);
const shared_rider_service_1 = __webpack_require__(224);
const typeorm_2 = __webpack_require__(10);
let CommonGiftCardService = class CommonGiftCardService {
    constructor(giftCardRepo, sharedRiderService, sharedDriverService) {
        this.giftCardRepo = giftCardRepo;
        this.sharedRiderService = sharedRiderService;
        this.sharedDriverService = sharedDriverService;
    }
    async redeemGiftCard(input) {
        const giftCode = await this.giftCardRepo.findOne({
            where: {
                code: input.code,
            },
            relations: {
                gift: true,
            },
        });
        if (!giftCode) {
            throw new Error('Invalid gift code');
        }
        if (giftCode.usedAt != null) {
            throw new Error('Gift code already used');
        }
        if (giftCode.gift.expireAt != null && giftCode.gift.expireAt < new Date()) {
            throw new Error('Gift code expired');
        }
        giftCode.usedAt = new Date();
        if (input.userType === 'rider') {
            await this.sharedRiderService.rechargeWallet({
                action: transaction_action_enum_1.TransactionAction.Recharge,
                status: transaction_status_enum_1.TransactionStatus.Done,
                riderId: input.userId,
                amount: giftCode.gift.amount,
                currency: giftCode.gift.currency,
                giftCardId: giftCode.id,
                rechargeType: rider_recharge_transaction_type_enum_1.RiderRechargeTransactionType.Gift,
            });
        }
        else {
            await this.sharedDriverService.rechargeWallet({
                action: transaction_action_enum_1.TransactionAction.Recharge,
                status: transaction_status_enum_1.TransactionStatus.Done,
                driverId: input.userId,
                amount: giftCode.gift.amount,
                currency: giftCode.gift.currency,
                giftCardId: giftCode.id,
                rechargeType: driver_recharge_transaction_type_enum_1.DriverRechargeTransactionType.Gift,
            });
        }
        await this.giftCardRepo.save(giftCode);
        return giftCode.gift;
    }
};
exports.CommonGiftCardService = CommonGiftCardService;
exports.CommonGiftCardService = CommonGiftCardService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(gift_code_entity_1.GiftCodeEntity)),
    tslib_1.__metadata("design:paramtypes", [typeorm_2.Repository,
        shared_rider_service_1.SharedRiderService,
        shared_driver_service_1.SharedDriverService])
], CommonGiftCardService);


/***/ }),
/* 224 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SharedRiderService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(7);
const rider_entity_1 = __webpack_require__(26);
const rider_transaction_entity_1 = __webpack_require__(34);
const rider_wallet_entity_1 = __webpack_require__(75);
const typeorm_2 = __webpack_require__(10);
const driver_entity_1 = __webpack_require__(12);
let SharedRiderService = class SharedRiderService {
    constructor(repo, driverRepo, riderWalletRepo, riderTransactionRepo) {
        this.repo = repo;
        this.driverRepo = driverRepo;
        this.riderWalletRepo = riderWalletRepo;
        this.riderTransactionRepo = riderTransactionRepo;
    }
    async findById(id) {
        return this.repo.findOneOrFail({ where: { id }, withDeleted: true });
    }
    async addDriverToFavoriteList(input) {
        const rider = await this.repo.findOneOrFail({
            where: { id: input.riderId },
            relations: {
                favoriteDrivers: true,
            },
        });
        const favoriteDrivers = rider.favoriteDrivers;
        if (favoriteDrivers.some((driver) => driver.id === input.driverId)) {
            return false;
        }
        favoriteDrivers.push(await this.driverRepo
            .createQueryBuilder('driver')
            .where('driver.id = :id', { id: input.driverId })
            .getOneOrFail());
        await this.repo.save(rider);
        return true;
    }
    async findWithDeleted(filter) {
        return this.repo.findOne({ where: filter, withDeleted: true });
    }
    async findUserByMobileNumber(mobileNumber) {
        return this.repo.findOne({ where: { mobileNumber }, withDeleted: true });
    }
    async createUserWithMobileNumber(input) {
        common_1.Logger.log('creating rider with ');
        const rider = this.repo.create({
            mobileNumber: input.mobileNumber,
            countryIso: input.countryIso,
        });
        const riderEntity = await this.repo.save(rider);
        return riderEntity;
    }
    async findOrCreateUserWithMobileNumber(input) {
        const findResult = await this.findUserByMobileNumber(input.mobileNumber);
        if (findResult?.deletedAt != null) {
            await this.repo.restore(findResult?.id);
        }
        if (findResult == null) {
            return await this.createUserWithMobileNumber(input);
        }
        else {
            return findResult;
        }
    }
    async deleteById(id) {
        const user = await this.findById(id);
        await this.repo.softDelete(id);
        return user;
    }
    async getRiderCreditInCurrency(riderId, currency) {
        const wallet = await this.riderWalletRepo.findOneBy({ riderId, currency });
        return wallet?.balance ?? 0;
    }
    async rechargeWallet(transaction) {
        let wallet = await this.riderWalletRepo.findOneBy({
            riderId: transaction.riderId,
            currency: transaction.currency,
        });
        if (wallet == null) {
            wallet = await this.riderWalletRepo.save({
                balance: transaction.amount,
                currency: transaction.currency,
                riderId: transaction.riderId,
            });
        }
        else {
            await this.riderWalletRepo.update(wallet.id, {
                balance: transaction.amount + wallet.balance,
            });
            wallet.balance += transaction.amount;
        }
        this.riderTransactionRepo.save(transaction);
        return wallet;
    }
};
exports.SharedRiderService = SharedRiderService;
exports.SharedRiderService = SharedRiderService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(rider_entity_1.RiderEntity)),
    tslib_1.__param(1, (0, typeorm_1.InjectRepository)(driver_entity_1.DriverEntity)),
    tslib_1.__param(2, (0, typeorm_1.InjectRepository)(rider_wallet_entity_1.RiderWalletEntity)),
    tslib_1.__param(3, (0, typeorm_1.InjectRepository)(rider_transaction_entity_1.RiderTransactionEntity)),
    tslib_1.__metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], SharedRiderService);


/***/ }),
/* 225 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SharedConfigurationService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const fs = tslib_1.__importStar(__webpack_require__(136));
let SharedConfigurationService = class SharedConfigurationService {
    constructor() { }
    async getConfiguration() {
        const configAddress = `${process.cwd()}/config/config.${process.env.NODE_ENV ?? 'production'}.json`;
        if (fs.existsSync(configAddress)) {
            const file = await fs.promises.readFile(configAddress, {
                encoding: 'utf-8',
            });
            const config = JSON.parse(file);
            const firebaseKeyFileAddress = `${process.cwd()}/config/${config.firebaseProjectPrivateKey}`;
            if (config.firebaseProjectPrivateKey != null &&
                fs.existsSync(firebaseKeyFileAddress)) {
                config.purchaseCode = 'RESTRICTED';
                config.firebaseProjectPrivateKey = 'RESTRICTED';
                return config;
            }
            return config;
        }
        else {
            return {};
        }
    }
};
exports.SharedConfigurationService = SharedConfigurationService;
exports.SharedConfigurationService = SharedConfigurationService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], SharedConfigurationService);


/***/ }),
/* 226 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var FirebaseNotificationModule_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FirebaseNotificationModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const fs_1 = __webpack_require__(136);
const driver_notification_service_1 = __webpack_require__(227);
const rider_notification_service_1 = __webpack_require__(228);
let FirebaseNotificationModule = FirebaseNotificationModule_1 = class FirebaseNotificationModule {
    static async register() {
        let providers = [];
        const configAddress = `${process.cwd()}/config/config.${process.env.NODE_ENV ?? 'production'}.json`;
        common_1.Logger.log('configAddress: ' + configAddress, 'FirebaseNotificationModule');
        if ((0, fs_1.existsSync)(configAddress)) {
            const file = await fs_1.promises.readFile(configAddress, { encoding: 'utf-8' });
            const config = JSON.parse(file);
            const firebaseKeyFileAddress = `${process.cwd()}/config/${config.firebaseProjectPrivateKey}`;
            if (config.firebaseProjectPrivateKey != null &&
                (0, fs_1.existsSync)(firebaseKeyFileAddress)) {
                providers = [driver_notification_service_1.DriverNotificationService, rider_notification_service_1.RiderNotificationService];
            }
        }
        return {
            module: FirebaseNotificationModule_1,
            imports: [],
            providers: providers,
            exports: providers,
        };
    }
};
exports.FirebaseNotificationModule = FirebaseNotificationModule;
exports.FirebaseNotificationModule = FirebaseNotificationModule = FirebaseNotificationModule_1 = tslib_1.__decorate([
    (0, common_1.Module)({})
], FirebaseNotificationModule);


/***/ }),
/* 227 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DriverNotificationService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const firebase_admin_1 = __webpack_require__(133);
let DriverNotificationService = class DriverNotificationService {
    constructor() { }
    async requests(driver) {
        const tokens = driver
            .filter((_driver) => (_driver.notificationPlayerId?.length ?? 0) > 0)
            .map((x) => x.notificationPlayerId);
        if (tokens.length < 1)
            return;
        common_1.Logger.log(`Sending notification to: ${JSON.stringify(tokens)}`);
        try {
            const notificationResult = await (0, firebase_admin_1.messaging)().sendMulticast({
                tokens: tokens,
                android: {
                    notification: {
                        sound: 'default',
                        titleLocKey: 'notification_new_request_title',
                        bodyLocKey: 'notification_new_request_body',
                        channelId: 'request',
                        icon: 'notification_icon',
                        priority: 'high',
                    },
                },
                apns: {
                    payload: {
                        aps: {
                            sound: {
                                critical: true,
                                name: process.env.REQUEST_SOUND ?? 'default',
                                volume: 1.0,
                            },
                            badge: 1,
                            contentAvailable: true,
                            alert: {
                                titleLocKey: 'notification_new_request_title',
                                subtitleLocKey: 'notification_new_request_body',
                            },
                        },
                    },
                },
            });
            common_1.Logger.log(notificationResult);
        }
        catch (error) {
            common_1.Logger.error(error);
        }
    }
    canceled(driver) {
        this.sendNotification(driver, 'notification_cancel_title', 'notification_cancel_body');
    }
    message(driver, message) {
        if (driver.notificationPlayerId == null)
            return;
        try {
            (0, firebase_admin_1.messaging)().send({
                token: driver.notificationPlayerId,
                android: {
                    notification: {
                        sound: 'default',
                        titleLocKey: 'notification_new_message_title',
                        body: message.content,
                        channelId: 'message',
                        icon: 'notification_icon',
                    },
                },
                apns: {
                    payload: {
                        aps: {
                            sound: 'default',
                            badge: 1,
                            contentAvailable: true,
                            alert: {
                                titleLocKey: 'notification_new_message_title',
                                subtitle: message.content,
                            },
                        },
                    },
                },
            });
        }
        catch (error) { }
    }
    paid(driver) {
        this.sendNotification(driver, 'notification_paid_title', 'notification_paid_body');
    }
    assigned(driver, time, from, to) {
        this.sendNotification(driver, 'notification_assigned_title', 'notification_assigned_body', [time, from, to]);
    }
    upcomingBooking(driver) {
        this.sendNotification(driver, 'notification_upcoming_ride_title', 'notification_upcoming_ride_body');
    }
    sendNotification(driver, titleLocKey, bodyLocKey, bodyLocArgs = [], sound = 'default', channelId = 'tripEvents') {
        if (driver.notificationPlayerId == null ||
            process.env['NODE_ENV'] === 'dev')
            return;
        try {
            (0, firebase_admin_1.messaging)().send({
                token: driver.notificationPlayerId,
                android: {
                    notification: {
                        sound,
                        titleLocKey,
                        bodyLocKey,
                        bodyLocArgs,
                        channelId,
                        icon: 'notification_icon',
                    },
                },
                apns: {
                    payload: {
                        aps: {
                            sound,
                            alert: {
                                titleLocKey,
                                subtitleLocKey: bodyLocKey,
                                subtitleLocArgs: bodyLocArgs,
                            },
                        },
                    },
                },
            });
        }
        catch (error) { }
    }
};
exports.DriverNotificationService = DriverNotificationService;
exports.DriverNotificationService = DriverNotificationService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], DriverNotificationService);


/***/ }),
/* 228 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RiderNotificationService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const firebase_admin_1 = __webpack_require__(133);
let RiderNotificationService = class RiderNotificationService {
    constructor() { }
    message(rider, message) {
        if (rider.notificationPlayerId == null)
            return;
        try {
            (0, firebase_admin_1.messaging)().send({
                token: rider.notificationPlayerId,
                android: {
                    notification: {
                        sound: 'default',
                        titleLocKey: 'notification_new_message_title',
                        body: message.content,
                        channelId: 'message',
                        icon: 'notification_icon',
                    },
                },
                apns: {
                    payload: {
                        aps: {
                            sound: 'default',
                            badge: 1,
                            alert: {
                                titleLocKey: 'notification_new_message_title',
                                subtitle: message.content,
                            },
                        },
                    },
                },
            });
        }
        catch (error) { }
    }
    canceled(rider) {
        this.sendNotification(rider, 'notification_cancel_title', 'notification_cancel_body', 'Canceled', 'Your trip has been canceled');
    }
    accepted(rider) {
        this.sendNotification(rider, 'notification_found_title', 'notification_found_body', 'Accepted', 'A driver has accepted your requet');
    }
    bookingAssigned(rider, time) {
        this.sendNotification(rider, 'notification_booking_assigned_title', 'notification_booking_assigned_body', 'Assigned', 'A driver has been assigned to your trip', [time]);
    }
    arrived(rider) {
        this.sendNotification(rider, 'notification_arrived_title', 'notification_arrived_body', 'Arrived', 'Driver has arrived to your location');
    }
    started(rider) {
        this.sendNotification(rider, 'notification_started_title', 'notification_started_body', 'Started', 'Trip has been started');
    }
    waitingForPostPay(rider) {
        this.sendNotification(rider, 'notification_waiting_for_pay_title', 'notification_waiting_for_pay_body', 'Finished', 'Waiting for post-pay');
    }
    finished(rider) {
        this.sendNotification(rider, 'notification_finished_title', 'notification_finished_body', 'Finished', 'Trip has been finished.');
    }
    sendNotification(rider, titleLocKey, bodyLocKey, titleDefault, bodyDefault, bodyLocArgs = [], sound = 'default', channelId = 'tripEvents') {
        if (rider.notificationPlayerId == null ||
            rider.notificationPlayerId.length < 5) {
            return;
        }
        try {
            (0, firebase_admin_1.messaging)().send({
                token: rider.notificationPlayerId,
                android: {
                    notification: {
                        sound,
                        titleLocKey,
                        bodyLocKey,
                        bodyLocArgs,
                        channelId,
                        icon: 'notification_icon',
                    },
                },
                apns: {
                    payload: {
                        aps: {
                            sound,
                            alert: {
                                titleLocKey,
                                subtitleLocKey: bodyLocKey,
                                subtitleLocArgs: bodyLocArgs,
                            },
                        },
                    },
                },
                webpush: {
                    notification: {
                        title: titleDefault,
                        body: bodyDefault,
                    },
                },
            });
        }
        catch (error) { }
    }
};
exports.RiderNotificationService = RiderNotificationService;
exports.RiderNotificationService = RiderNotificationService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], RiderNotificationService);


/***/ }),
/* 229 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GoogleServicesModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const shared_configuration_service_1 = __webpack_require__(225);
const google_services_service_1 = __webpack_require__(230);
let GoogleServicesModule = class GoogleServicesModule {
};
exports.GoogleServicesModule = GoogleServicesModule;
exports.GoogleServicesModule = GoogleServicesModule = tslib_1.__decorate([
    (0, common_1.Module)({
        providers: [google_services_service_1.GoogleServicesService, shared_configuration_service_1.SharedConfigurationService],
        exports: [google_services_service_1.GoogleServicesService]
    })
], GoogleServicesModule);


/***/ }),
/* 230 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GoogleServicesService = void 0;
const tslib_1 = __webpack_require__(1);
const google_maps_services_js_1 = __webpack_require__(231);
const common_1 = __webpack_require__(2);
const apollo_1 = __webpack_require__(116);
const shared_configuration_service_1 = __webpack_require__(225);
let GoogleServicesService = class GoogleServicesService {
    constructor(configurationService) {
        this.configurationService = configurationService;
        this.client = new google_maps_services_js_1.Client({});
    }
    async getSumDistanceAndDuration(points) {
        let distance = 0;
        let duration = 0;
        const config = await this.configurationService.getConfiguration();
        for (let i = 0; i < points.length - 1; i++) {
            const matrixResponse = await this.client.distancematrix({
                params: {
                    origins: [points[i]],
                    destinations: [points[i + 1]],
                    key: config.backendMapsAPIKey,
                },
            });
            if (matrixResponse.statusText !== 'OK') {
                throw new apollo_1.ForbiddenError('NO_ROUTE_FOUND');
            }
            distance += matrixResponse.data.rows[0].elements
                .filter((element) => element.status == 'OK')
                .reduce((a, b) => {
                return a + b.distance.value;
            }, 0);
            duration += matrixResponse.data.rows[0].elements
                .filter((element) => element.status == 'OK')
                .reduce((a, b) => {
                return a + b.duration.value;
            }, 0);
        }
        let directions = [];
        if (process.env.SHOW_DIRECTIONS != null) {
            try {
                const directionsAPI = await this.client.directions({
                    params: {
                        key: config.backendMapsAPIKey,
                        origin: points[0],
                        destination: points[points.length - 1],
                        waypoints: points.length > 2 ? points.slice(1, points.length - 1) : [],
                    },
                });
                common_1.Logger.log(directionsAPI.data, 'Directions');
                if (directionsAPI.data.routes.length > 0) {
                    directions =
                        this.decode(directionsAPI.data.routes[0].overview_polyline.points) ?? [];
                }
            }
            catch (exception) {
                common_1.Logger.error(exception);
            }
        }
        return { distance, duration, directions };
    }
    decode(encoded) {
        // array that holds the points
        const points = [];
        let index = 0;
        const len = encoded.length;
        let lat = 0, lng = 0;
        while (index < len) {
            let b, shift = 0, result = 0;
            do {
                b = encoded.charAt(index++).charCodeAt(0) - 63; //finds ascii                                                                                    //and substract it by 63
                result |= (b & 0x1f) << shift;
                shift += 5;
            } while (b >= 0x20);
            const dlat = (result & 1) != 0 ? ~(result >> 1) : result >> 1;
            lat += dlat;
            shift = 0;
            result = 0;
            do {
                b = encoded.charAt(index++).charCodeAt(0) - 63;
                result |= (b & 0x1f) << shift;
                shift += 5;
            } while (b >= 0x20);
            const dlng = (result & 1) != 0 ? ~(result >> 1) : result >> 1;
            lng += dlng;
            points.push({ lat: lat / 1e5, lng: lng / 1e5 });
        }
        return points;
    }
};
exports.GoogleServicesService = GoogleServicesService;
exports.GoogleServicesService = GoogleServicesService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [shared_configuration_service_1.SharedConfigurationService])
], GoogleServicesService);


/***/ }),
/* 231 */
/***/ ((module) => {

module.exports = require("@googlemaps/google-maps-services-js");

/***/ }),
/* 232 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RegionModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(7);
const region_entity_1 = __webpack_require__(57);
const region_service_1 = __webpack_require__(233);
let RegionModule = class RegionModule {
};
exports.RegionModule = RegionModule;
exports.RegionModule = RegionModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([region_entity_1.RegionEntity])],
        providers: [region_service_1.RegionService],
        exports: [region_service_1.RegionService]
    })
], RegionModule);


/***/ }),
/* 233 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RegionService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(7);
const region_entity_1 = __webpack_require__(57);
const typeorm_2 = __webpack_require__(10);
let RegionService = class RegionService {
    constructor(regionRepository) {
        this.regionRepository = regionRepository;
    }
    async getRegionWithPoint(point) {
        const regions = await this.regionRepository.query(`SELECT * FROM region WHERE enabled=TRUE AND ST_Within(st_geomfromtext('POINT(? ?)'), region.location)`, [point.lng, point.lat]);
        return regions;
    }
    async getRegionServices(regionId) {
        return ((await this.regionRepository.findOne({
            where: { id: regionId },
            relations: ['services'],
        }))?.services ?? []);
    }
};
exports.RegionService = RegionService;
exports.RegionService = RegionService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(region_entity_1.RegionEntity)),
    tslib_1.__metadata("design:paramtypes", [typeorm_2.Repository])
], RegionService);


/***/ }),
/* 234 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(7);
const service_entity_1 = __webpack_require__(52);
const typeorm_2 = __webpack_require__(10);
const weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];
let ServiceService = class ServiceService {
    constructor(service) {
        this.service = service;
    }
    calculateCost(service, distance, duration, eta, fleetMultiplier = 1, isResident = true) {
        let i = service.baseFare;
        let multiplier = 1;
        console.log(`Calculating Trip fee with base fare ${i} distance of ${distance} meters and duration of ${duration}`);
        i +=
            (service.perHundredMeters * distance) / 100 +
                (service.perMinuteDrive * duration) / 60;
        console.log(`Initial calculation without multiplier: ${i}`);
        let ratioCost = 0;
        let newRatioCost = 0;
        let ratioDistance = 0;
        let endDistance = 0;
        for (const _multiplier of service.distanceMultipliers) {
            if (distance > _multiplier.distanceFrom) {
                endDistance =
                    distance > _multiplier.distanceTo ? _multiplier.distanceTo : distance;
                ratioDistance = endDistance - _multiplier.distanceFrom;
                ratioCost = (ratioDistance / distance) * i;
                newRatioCost = ratioCost * _multiplier.multiply;
                i = i - ratioCost + newRatioCost;
                console.log(`After distance multiplier: ${i}`);
            }
        }
        for (const _multiplier of service.timeMultipliers) {
            const startMinutes = parseInt(_multiplier.startTime.split(':')[0]) * 60 +
                parseInt(_multiplier.startTime.split(':')[1]);
            const nowMinutes = eta.getHours() * 60 + eta.getMinutes();
            const endMinutes = parseInt(_multiplier.endTime.split(':')[0]) * 60 +
                parseInt(_multiplier.endTime.split(':')[1]);
            if (nowMinutes >= startMinutes && nowMinutes <= endMinutes) {
                i *= _multiplier.multiply;
                multiplier *= _multiplier.multiply;
                console.log(`After time multiplier: ${i}`);
            }
        }
        for (const _multiplier of service.weekdayMultipliers) {
            if (_multiplier.weekday === weekdays[eta.getDay()]) {
                i *= _multiplier.multiply;
                multiplier *= _multiplier.multiply;
                console.log(`After weekday multiplier: ${i}`);
            }
        }
        for (const _multiplier of service.dateRangeMultipliers) {
            const startDate = new Date(_multiplier.startDate);
            const endDate = new Date(_multiplier.endDate);
            if (eta >= startDate && eta <= endDate) {
                i *= _multiplier.multiply;
                multiplier *= _multiplier.multiply;
                console.log(`After date range multiplier: ${i}`);
            }
        }
        i *= fleetMultiplier;
        multiplier *= fleetMultiplier;
        console.log(`After fleet multiplier: ${i}`);
        if (i < service.minimumFee * multiplier) {
            i = service.minimumFee * multiplier;
            console.log(`After Minimum fee applied: ${i}`);
        }
        if (isResident === false) {
            i *= service.touristMultiplier;
        }
        if (service.roundingFactor != null) {
            i = Math.round(i / service.roundingFactor) * service.roundingFactor;
            console.log(`After Rounding factor applied: ${i}`);
        }
        return i;
    }
    getWithId(id) {
        return this.service.findOneBy({ id });
    }
};
exports.ServiceService = ServiceService;
exports.ServiceService = ServiceService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(service_entity_1.ServiceEntity)),
    tslib_1.__metadata("design:paramtypes", [typeorm_2.Repository])
], ServiceService);


/***/ }),
/* 235 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SharedOrderService = void 0;
const tslib_1 = __webpack_require__(1);
const nestjs_query_graphql_1 = __webpack_require__(103);
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(7);
const common_coupon_service_1 = __webpack_require__(222);
const driver_deduct_transaction_type_enum_1 = __webpack_require__(15);
const driver_recharge_transaction_type_enum_1 = __webpack_require__(16);
const driver_status_enum_1 = __webpack_require__(95);
const payment_status_enum_1 = __webpack_require__(99);
const provider_recharge_transaction_type_enum_1 = __webpack_require__(42);
const request_activity_type_enum_1 = __webpack_require__(83);
const rider_deduct_transaction_type_enum_1 = __webpack_require__(35);
const service_option_type_enum_1 = __webpack_require__(62);
const service_payment_method_enum_1 = __webpack_require__(56);
const transaction_action_enum_1 = __webpack_require__(17);
const transaction_status_enum_1 = __webpack_require__(18);
const payment_entity_1 = __webpack_require__(97);
const request_activity_entity_1 = __webpack_require__(82);
const service_option_entity_1 = __webpack_require__(60);
const zone_price_entity_1 = __webpack_require__(63);
const graphql_redis_subscriptions_1 = __webpack_require__(104);
const typeorm_2 = __webpack_require__(10);
const axios_1 = __webpack_require__(5);
const order_status_enum_1 = __webpack_require__(77);
const request_entity_1 = __webpack_require__(23);
const service_category_entity_1 = __webpack_require__(59);
const driver_redis_service_1 = __webpack_require__(166);
const order_redis_service_1 = __webpack_require__(168);
const driver_notification_service_1 = __webpack_require__(227);
const rider_notification_service_1 = __webpack_require__(228);
const google_services_service_1 = __webpack_require__(230);
const region_service_1 = __webpack_require__(233);
const service_service_1 = __webpack_require__(234);
const shared_driver_service_1 = __webpack_require__(164);
const shared_fleet_service_1 = __webpack_require__(205);
const shared_provider_service_1 = __webpack_require__(236);
const shared_rider_service_1 = __webpack_require__(224);
const rxjs_1 = __webpack_require__(237);
const apollo_1 = __webpack_require__(116);
const payment_mode_enum_1 = __webpack_require__(89);
let SharedOrderService = class SharedOrderService {
    constructor(orderRepository, activityRepository, regionService, serviceCategoryRepository, serviceOptionRepository, zonePriceRepository, paymentRepository, googleServices, servicesService, riderService, driverRedisService, orderRedisService, driverService, sharedProviderService, sharedFleetService, commonCouponService, pubSub, driverNotificationService, riderNotificationService, httpService) {
        this.orderRepository = orderRepository;
        this.activityRepository = activityRepository;
        this.regionService = regionService;
        this.serviceCategoryRepository = serviceCategoryRepository;
        this.serviceOptionRepository = serviceOptionRepository;
        this.zonePriceRepository = zonePriceRepository;
        this.paymentRepository = paymentRepository;
        this.googleServices = googleServices;
        this.servicesService = servicesService;
        this.riderService = riderService;
        this.driverRedisService = driverRedisService;
        this.orderRedisService = orderRedisService;
        this.driverService = driverService;
        this.sharedProviderService = sharedProviderService;
        this.sharedFleetService = sharedFleetService;
        this.commonCouponService = commonCouponService;
        this.pubSub = pubSub;
        this.driverNotificationService = driverNotificationService;
        this.riderNotificationService = riderNotificationService;
        this.httpService = httpService;
    }
    async getZonePricingsForPoints(from, to) {
        let pricings = await this.zonePriceRepository.query("SELECT * FROM zone_price WHERE ST_Within(st_geomfromtext('POINT(? ?)'), `from`) AND ST_Within(st_geomfromtext('POINT(? ?)'), `to`)", [from.lng, from.lat, to.lng, to.lat]);
        pricings = await this.zonePriceRepository.find({
            where: { id: (0, typeorm_2.In)(pricings.map((p) => p.id)) },
            relations: { services: true, fleets: true },
        });
        return pricings;
    }
    async calculateFare(input) {
        let zonePricings = [];
        if (input.points.length == 2) {
            zonePricings = await this.getZonePricingsForPoints(input.points[0], input.points[1]);
        }
        const regions = await this.regionService.getRegionWithPoint(input.points[0]);
        if (regions.length < 1) {
            throw new apollo_1.ForbiddenError(CalculateFareError.RegionUnsupported);
        }
        const servicesInRegion = await this.regionService.getRegionServices(regions[0].id);
        if (servicesInRegion.length < 1) {
            throw new apollo_1.ForbiddenError(CalculateFareError.NoServiceInRegion);
        }
        if ((input.twoWay ?? false) && input.points.length > 1) {
            input.points.push(input.points[0]);
        }
        const metrics = servicesInRegion.findIndex((x) => x.perHundredMeters > 0) > -1
            ? await this.googleServices.getSumDistanceAndDuration(input.points)
            : { distance: 0, duration: 0, directions: [] };
        const cats = await this.serviceCategoryRepository.find({
            relations: ['services', 'services.media', 'services.options'],
        });
        let isResident = process.env.MOTAXI == null;
        if (input.riderId != null) {
            const rider = await this.riderService.findById(input.riderId);
            isResident = rider?.isResident ?? process.env.MOTAXI == null;
        }
        const fleetIdsInPoint = await this.sharedFleetService.getFleetIdsInPoint(input.points[0]);
        const feeMultiplier = (await this.sharedFleetService.getFleetById(fleetIdsInPoint[0]))
            ?.feeMultiplier ?? 1;
        const _cats = cats
            .map((cat) => {
            const { services, ..._cat } = cat;
            const _services = services
                .filter((x) => servicesInRegion.filter((y) => y.id == x.id).length > 0)
                .map((service) => {
                let cost;
                const zonePricesWithService = zonePricings.filter((zone) => zone.services.find((_service) => _service.id == service.id) !=
                    null);
                if (zonePricesWithService.length > 0) {
                    cost = zonePricesWithService[0].cost;
                    const eta = new Date();
                    for (const _multiplier of zonePricesWithService[0]
                        .timeMultipliers) {
                        const startMinutes = parseInt(_multiplier.startTime.split(':')[0]) * 60 +
                            parseInt(_multiplier.startTime.split(':')[1]);
                        const nowMinutes = eta.getHours() * 60 + eta.getMinutes();
                        const endMinutes = parseInt(_multiplier.endTime.split(':')[0]) * 60 +
                            parseInt(_multiplier.endTime.split(':')[1]);
                        if (nowMinutes >= startMinutes && nowMinutes <= endMinutes) {
                            cost *= _multiplier.multiply;
                        }
                    }
                }
                else {
                    cost = this.servicesService.calculateCost(service, metrics.distance, metrics.duration, new Date(), feeMultiplier, isResident);
                }
                const waitFee = service.perMinuteWait * (input.waitTime ?? 0);
                if (input.coupon == null) {
                    return {
                        ...service,
                        cost: cost + waitFee,
                    };
                }
                else {
                    const costAfterCoupon = this.commonCouponService.applyCouponOnPrice(input.coupon, cost + waitFee);
                    return {
                        ...service,
                        cost: cost + waitFee,
                        costAfterCoupon,
                    };
                }
            });
            return {
                ..._cat,
                services: _services,
            };
        })
            .filter((x) => x.services.length > 0);
        common_1.Logger.log(`_services: ${JSON.stringify(_cats)}`, 'calculateFare');
        common_1.Logger.log(`metrics: ${JSON.stringify(metrics)}`, 'calculateFare');
        return {
            ...metrics,
            currency: regions[0].currency,
            services: _cats,
        };
    }
    async createOrder(input) {
        let zonePricings = [];
        if (input.points.length == 2) {
            zonePricings = await this.getZonePricingsForPoints(input.points[0], input.points[1]);
        }
        const service = await this.servicesService.getWithId(input.serviceId);
        if (service == undefined) {
            throw new apollo_1.ForbiddenError('SERVICE_NOT_FOUND');
        }
        const closeDrivers = await this.driverRedisService.getClose(input.points[0], service.searchRadius);
        common_1.Logger.log(`closeDrivers: ${JSON.stringify(closeDrivers)}`, 'createOrder');
        const driverIds = closeDrivers.map((x) => x.driverId);
        const fleetIdsInPoint = await this.sharedFleetService.getFleetIdsInPoint(input.points[0]);
        const driversWithService = await this.driverService.getOnlineDriversWithServiceId(driverIds, input.serviceId, fleetIdsInPoint);
        common_1.Logger.log(`driversWithService: ${JSON.stringify(driversWithService)}`, 'createOrder');
        let optionFee = 0;
        let options = [];
        if (input.optionIds != null) {
            options = await this.serviceOptionRepository.findByIds(input.optionIds);
            if ((input.twoWay ?? false) && input.points.length > 1) {
                input.points.push(input.points[0]);
                input.addresses.push(input.addresses[0]);
            }
            const paidOptions = options.filter((option) => option.type == service_option_type_enum_1.ServiceOptionType.Paid);
            optionFee =
                paidOptions.length == 0
                    ? 0
                    : paidOptions
                        .map((option) => option.additionalFee ?? 0)
                        .reduce((previous, current) => (current += previous));
        }
        const metrics = service.perHundredMeters > 0
            ? await this.googleServices.getSumDistanceAndDuration(input.points)
            : { distance: 0, duration: 0, directions: [] };
        const eta = new Date(new Date().getTime() + (input.intervalMinutes | 0) * 60 * 1000);
        const rider = input.riderId == null
            ? null
            : await this.riderService.findById(input.riderId);
        const isResident = rider?.isResident ?? process.env.MOTAXI == null;
        const feeMultiplier = fleetIdsInPoint.length == 0
            ? 1
            : (await this.sharedFleetService.getFleetById(fleetIdsInPoint[0]))
                ?.feeMultiplier ?? 1;
        let cost = this.servicesService.calculateCost(service, metrics.distance, metrics.duration, eta, feeMultiplier, isResident) +
            optionFee +
            service.perMinuteWait * input.waitMinutes;
        const zonePricing = zonePricings.filter((price) => {
            return (price.services.filter((service) => service.id == input.serviceId)
                .length > 0);
        });
        if (zonePricing.length > 0) {
            cost = zonePricing[0].cost;
            const eta = new Date();
            for (const _multiplier of zonePricings[0].timeMultipliers) {
                const startMinutes = parseInt(_multiplier.startTime.split(':')[0]) * 60 +
                    parseInt(_multiplier.startTime.split(':')[1]);
                const nowMinutes = eta.getHours() * 60 + eta.getMinutes();
                const endMinutes = parseInt(_multiplier.endTime.split(':')[0]) * 60 +
                    parseInt(_multiplier.endTime.split(':')[1]);
                if (nowMinutes >= startMinutes && nowMinutes <= endMinutes) {
                    cost *= _multiplier.multiply;
                }
            }
        }
        const regions = await this.regionService.getRegionWithPoint(input.points[0]);
        if (service.maximumDestinationDistance != 0 &&
            metrics.distance > service.maximumDestinationDistance) {
            throw new apollo_1.ForbiddenError('DISTANCE_TOO_FAR');
        }
        let shouldPrePay = false;
        const paidAmount = 0;
        if (service.prepayPercent > 0 && input.riderId != null) {
            const balance = await this.riderService.getRiderCreditInCurrency(input.riderId, regions[0].currency);
            const amountNeedsToBePrePaid = (cost * service.prepayPercent) / 100;
            if (balance < amountNeedsToBePrePaid) {
                shouldPrePay = true;
            }
            else {
                // await this.riderService.rechargeWallet({
                //     amount: -amountNeedsToBePrePaid,
                //     currency: regions[0].currency,
                //     action: TransactionAction.Deduct,
                //     deductType: RiderDeductTransactionType.OrderFee,
                //     status: TransactionStatus.Done,
                //     riderId: input.riderId
                // });
                // paidAmount = amountNeedsToBePrePaid;
            }
        }
        const orderObject = this.orderRepository.create({
            serviceId: input.serviceId,
            currency: regions[0].currency,
            riderId: input.riderId,
            points: input.points,
            addresses: input.addresses.map((address) => address.replace(', ', '-')),
            distanceBest: metrics.distance,
            durationBest: metrics.duration,
            directions: metrics.directions,
            paymentMode: input.paymentMode,
            savedPaymentMethodId: input.paymentMode == payment_mode_enum_1.PaymentMode.SavedPaymentMethod
                ? input.paymentMethodId
                : undefined,
            paymentGatewayId: input.paymentMode == payment_mode_enum_1.PaymentMode.PaymentGateway
                ? input.paymentMethodId
                : undefined,
            status: shouldPrePay
                ? order_status_enum_1.OrderStatus.WaitingForPrePay
                : input.intervalMinutes > 30
                    ? order_status_enum_1.OrderStatus.Booked
                    : driversWithService.length < 1
                        ? order_status_enum_1.OrderStatus.NoCloseFound
                        : order_status_enum_1.OrderStatus.Requested,
            paidAmount: paidAmount,
            costBest: cost,
            costAfterCoupon: cost,
            expectedTimestamp: eta,
            operatorId: input.operatorId,
            waitMinutes: input.waitMinutes,
            waitCost: service.perMinuteWait * input.waitMinutes,
            rideOptionsCost: optionFee,
            fleetId: input.fleetId,
            providerShare: service.providerShareFlat + (service.providerSharePercent * cost) / 100,
            options: options,
        });
        let order = await this.orderRepository.save(orderObject);
        if (input.couponCode != null && input.couponCode != '' && rider != null) {
            order = await this.commonCouponService.applyCoupon(input.couponCode, order.id, rider.id);
        }
        let activityType = request_activity_type_enum_1.RequestActivityType.RequestedByRider;
        if (input.intervalMinutes > 0) {
            activityType =
                input.operatorId == null
                    ? (activityType = request_activity_type_enum_1.RequestActivityType.BookedByRider)
                    : request_activity_type_enum_1.RequestActivityType.BookedByOperator;
        }
        else {
            activityType =
                input.operatorId == null
                    ? (activityType = request_activity_type_enum_1.RequestActivityType.RequestedByRider)
                    : request_activity_type_enum_1.RequestActivityType.RequestedByOperator;
        }
        this.activityRepository.insert({ requestId: order.id, type: activityType });
        await this.orderRedisService.add({ ...order, fleetIds: fleetIdsInPoint }, input.intervalMinutes | 0);
        common_1.Logger.log(`publishing order: ${order.id}`, 'createOrder');
        common_1.Logger.log(`driversWithService: ${JSON.stringify(driversWithService)}`, 'createOrder');
        if ((input.intervalMinutes ?? 0) < 30 && !shouldPrePay) {
            this.orderRedisService.driverNotified(order.id, driversWithService);
            this.pubSub.publish('orderCreated', {
                orderCreated: order,
                driverIds: driversWithService.map((driver) => driver.id),
            });
            this.driverNotificationService.requests(driversWithService);
        }
        return order;
    }
    async processPrePay(orderId, authorizedAmount = 0) {
        const order = await this.orderRepository.findOneOrFail({
            where: { id: orderId },
            relations: ['service', 'driver', 'driver.fleet', 'rider'],
        });
        const riderCredit = await this.riderService.getRiderCreditInCurrency(order.riderId, order.currency);
        common_1.Logger.log(`riderCredit: ${riderCredit}`, 'processPrePay');
        common_1.Logger.log(`authorizedAmount: ${authorizedAmount}`, 'processPrePay');
        common_1.Logger.log(`serviceFee: ${order.costAfterCoupon}`, 'processPrePay');
        common_1.Logger.log(`Minmum required authorizedAmount: ${order.costAfterCoupon * (order.service.prepayPercent / 100.0)}`, 'processPrePay');
        if (riderCredit +
            authorizedAmount -
            order.costAfterCoupon * (order.service.prepayPercent / 100.0) >
            1) {
            throw new apollo_1.ForbiddenError('Credit is not enough');
        }
        await this.orderRepository.update(order.id, {
            status: order_status_enum_1.OrderStatus.Requested,
        });
        const closeDriverIds = (await this.driverRedisService.getClose(order.points[0], order.service.searchRadius)).map((x) => x.driverId);
        const fleetIdsInPoint = await this.sharedFleetService.getFleetIdsInPoint(order.points[0]);
        const driversWithService = await this.driverService.getOnlineDriversWithServiceId(closeDriverIds, order.serviceId, fleetIdsInPoint);
        this.orderRedisService.driverNotified(order.id, driversWithService);
        this.pubSub.publish('orderCreated', {
            orderCreated: order,
            driverIds: driversWithService.map((driver) => driver.id),
        });
        this.driverNotificationService.requests(driversWithService);
        return this.orderRepository.findOneOrFail({
            where: { id: orderId },
            relations: ['service', 'driver', 'driver.fleet', 'rider'],
        });
    }
    async finish(orderId, cashAmount = 0.0) {
        const order = await this.orderRepository.findOneOrFail({
            where: { id: orderId },
            relations: ['service', 'driver', 'driver.fleet', 'rider'],
        });
        if (order.service.paymentMethod == service_payment_method_enum_1.ServicePaymentMethod.OnlyCredit &&
            cashAmount > 0) {
            throw new apollo_1.ForbiddenError('Cash payment is not available for this service.');
        }
        let riderCredit = await this.riderService.getRiderCreditInCurrency(order.riderId, order.currency);
        const providerPercent = order.rider.isResident === false
            ? order.service.providerSharePercent * order.service.touristMultiplier
            : order.service.providerSharePercent;
        const commission = (providerPercent * order.costAfterCoupon) / 100 +
            order.service.providerShareFlat;
        let unPaidAmount = order.costAfterCoupon - order.paidAmount + order.tipAmount;
        if (riderCredit + cashAmount < unPaidAmount) {
            const payment = await this.paymentRepository.find({
                where: {
                    userType: 'client',
                    userId: order.riderId.toString(),
                    status: payment_status_enum_1.PaymentStatus.Authorized,
                    orderNumber: order.id.toString(),
                },
                order: { id: 'DESC' },
            });
            const status = order_status_enum_1.OrderStatus.WaitingForPostPay;
            if (payment.length > 0) {
                const captureResult = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${process.env.GATEWAY_SERVER_URL}/capture?id=${payment[0].transactionNumber}&amount=${unPaidAmount - riderCredit}`));
                if (captureResult.data.status == 'OK') {
                    riderCredit = await this.riderService.getRiderCreditInCurrency(order.riderId, order.currency);
                    unPaidAmount =
                        order.costAfterCoupon - order.paidAmount + order.tipAmount;
                    if (riderCredit + cashAmount < unPaidAmount) {
                        await this.orderRepository.update(order.id, {
                            status,
                        });
                        return;
                    }
                }
                else {
                    await this.orderRepository.update(order.id, {
                        status,
                    });
                    return;
                }
            }
            else {
                await this.orderRepository.update(order.id, {
                    status,
                });
                return;
            }
        }
        await this.driverService.rechargeWallet({
            status: transaction_status_enum_1.TransactionStatus.Done,
            driverId: order.driverId,
            currency: order.currency,
            action: transaction_action_enum_1.TransactionAction.Deduct,
            deductType: driver_deduct_transaction_type_enum_1.DriverDeductTransactionType.Commission,
            amount: -1 * commission,
            requestId: order.id,
        });
        let fleetShare = 0;
        if (order.driver?.fleetId != null) {
            fleetShare =
                (commission * order.driver.fleet.commissionSharePercent) / 100 +
                    order.driver.fleet.commissionShareFlat;
            if (fleetShare > 0) {
                this.sharedFleetService.rechargeWallet({
                    fleetId: order.driver.fleetId,
                    action: transaction_action_enum_1.TransactionAction.Recharge,
                    rechargeType: provider_recharge_transaction_type_enum_1.ProviderRechargeTransactionType.Commission,
                    amount: fleetShare,
                    currency: order.currency,
                    requestId: order.id,
                    driverId: order.driverId,
                });
            }
        }
        await this.sharedProviderService.rechargeWallet({
            action: transaction_action_enum_1.TransactionAction.Recharge,
            rechargeType: provider_recharge_transaction_type_enum_1.ProviderRechargeTransactionType.Commission,
            currency: order.currency,
            amount: commission - fleetShare,
        });
        if (order.costAfterCoupon - cashAmount > 0) {
            await this.driverService.rechargeWallet({
                status: transaction_status_enum_1.TransactionStatus.Done,
                driverId: order.driverId,
                currency: order.currency,
                requestId: order.id,
                action: transaction_action_enum_1.TransactionAction.Recharge,
                rechargeType: driver_recharge_transaction_type_enum_1.DriverRechargeTransactionType.OrderFee,
                amount: order.costAfterCoupon - cashAmount + order.tipAmount,
            });
        }
        if (riderCredit > 0 && cashAmount < unPaidAmount) {
            await this.riderService.rechargeWallet({
                status: transaction_status_enum_1.TransactionStatus.Done,
                action: transaction_action_enum_1.TransactionAction.Deduct,
                deductType: rider_deduct_transaction_type_enum_1.RiderDeductTransactionType.OrderFee,
                currency: order.currency,
                requestId: order.id,
                amount: -1 * (unPaidAmount - cashAmount),
                riderId: order.riderId,
            });
        }
        await this.orderRepository.update(order.id, {
            paidAmount: order.costAfterCoupon,
            status: order_status_enum_1.OrderStatus.WaitingForReview,
            finishTimestamp: new Date(),
        });
        await this.driverService.updateDriverStatus(order.driverId, driver_status_enum_1.DriverStatus.Online);
        this.activityRepository.insert({
            requestId: order.id,
            type: request_activity_type_enum_1.RequestActivityType.Paid,
        });
    }
    async assignOrderToDriver(orderId, driverId) {
        const [travel, driverLocation] = await Promise.all([
            this.orderRepository.findOneOrFail({
                where: { id: orderId },
                relations: ['driver', 'driver.car', 'driver.carColor', 'service'],
            }),
            this.driverRedisService.getDriverCoordinate(driverId),
        ]);
        this.activityRepository.insert({
            requestId: orderId,
            type: request_activity_type_enum_1.RequestActivityType.DriverAccepted,
        });
        //  const allowedStatuses = [OrderStatus.Found, OrderStatus.NoCloseFound, OrderStatus.Requested, OrderStatus.Booked];
        // if (travel == null || !allowedStatuses.includes(travel.status)) {
        if (travel == null) {
            throw new apollo_1.ForbiddenError('Already Taken');
        }
        if (travel.driverId != null) {
            this.driverNotificationService.canceled(travel.driver);
            await this.driverService.updateDriverStatus(travel.driverId, driver_status_enum_1.DriverStatus.Online);
            travel.status = order_status_enum_1.OrderStatus.RiderCanceled;
            this.pubSub.publish('orderUpdated', { orderUpdated: travel });
        }
        const metrics = driverLocation != null
            ? await this.googleServices.getSumDistanceAndDuration([
                travel.points[0],
                driverLocation,
            ])
            : { distance: 0, duration: 0 };
        const dt = new Date();
        const etaPickup = dt.setSeconds(dt.getSeconds() + metrics.duration);
        this.driverService.updateDriverStatus(driverId, driver_status_enum_1.DriverStatus.InService);
        await this.orderRedisService.expire([orderId]);
        await this.orderRepository.update(orderId, {
            status: order_status_enum_1.OrderStatus.DriverAccepted,
            etaPickup: new Date(etaPickup),
            driverId,
        });
        const result = await this.orderRepository.findOneOrFail({
            where: { id: orderId },
            relations: [
                'driver',
                'driver.car',
                'driver.carColor',
                'service',
                'rider',
            ],
        });
        this.pubSub.publish('orderUpdated', { orderUpdated: result });
        this.pubSub.publish('orderRemoved', { orderRemoved: result }); // This one has a filter to let know all except the one accepted.
        this.riderNotificationService.bookingAssigned(result.rider, result.expectedTimestamp.toISOString());
        this.driverNotificationService.assigned(result.driver, result.expectedTimestamp.toTimeString(), result.addresses[0], result.addresses[result.addresses.length - 1]);
        return result;
    }
};
exports.SharedOrderService = SharedOrderService;
exports.SharedOrderService = SharedOrderService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(request_entity_1.RequestEntity)),
    tslib_1.__param(1, (0, typeorm_1.InjectRepository)(request_activity_entity_1.RequestActivityEntity)),
    tslib_1.__param(3, (0, typeorm_1.InjectRepository)(service_category_entity_1.ServiceCategoryEntity)),
    tslib_1.__param(4, (0, typeorm_1.InjectRepository)(service_option_entity_1.ServiceOptionEntity)),
    tslib_1.__param(5, (0, typeorm_1.InjectRepository)(zone_price_entity_1.ZonePriceEntity)),
    tslib_1.__param(6, (0, typeorm_1.InjectRepository)(payment_entity_1.PaymentEntity)),
    tslib_1.__param(16, (0, nestjs_query_graphql_1.InjectPubSub)()),
    tslib_1.__metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        region_service_1.RegionService,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        google_services_service_1.GoogleServicesService,
        service_service_1.ServiceService,
        shared_rider_service_1.SharedRiderService,
        driver_redis_service_1.DriverRedisService,
        order_redis_service_1.OrderRedisService,
        shared_driver_service_1.SharedDriverService,
        shared_provider_service_1.SharedProviderService,
        shared_fleet_service_1.SharedFleetService,
        common_coupon_service_1.CommonCouponService,
        graphql_redis_subscriptions_1.RedisPubSub,
        driver_notification_service_1.DriverNotificationService,
        rider_notification_service_1.RiderNotificationService,
        axios_1.HttpService])
], SharedOrderService);
var CalculateFareError;
(function (CalculateFareError) {
    CalculateFareError["RegionUnsupported"] = "REGION_UNSUPPORTED";
    CalculateFareError["NoServiceInRegion"] = "NO_SERVICE_IN_REGION";
})(CalculateFareError || (CalculateFareError = {}));


/***/ }),
/* 236 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SharedProviderService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(7);
const provider_transaction_entity_1 = __webpack_require__(40);
const provider_wallet_entity_1 = __webpack_require__(96);
const typeorm_2 = __webpack_require__(10);
let SharedProviderService = class SharedProviderService {
    constructor(providerWalletRepo, providerTransactionRepo) {
        this.providerWalletRepo = providerWalletRepo;
        this.providerTransactionRepo = providerTransactionRepo;
    }
    async rechargeWallet(transaction) {
        let wallet = await this.providerWalletRepo.findOneBy({
            currency: transaction.currency,
        });
        if (wallet == null) {
            wallet = await this.providerWalletRepo.save({
                balance: transaction.amount,
                currency: transaction.currency,
            });
        }
        else {
            await this.providerWalletRepo.update(wallet.id, {
                balance: transaction.amount + wallet.balance,
            });
            wallet.balance += transaction.amount;
        }
        if (transaction.amount != 0) {
            common_1.Logger.log(`Saving transaction ${JSON.stringify(transaction)}`);
            this.providerTransactionRepo.save(transaction);
        }
        return wallet;
    }
};
exports.SharedProviderService = SharedProviderService;
exports.SharedProviderService = SharedProviderService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(provider_wallet_entity_1.ProviderWalletEntity)),
    tslib_1.__param(1, (0, typeorm_1.InjectRepository)(provider_transaction_entity_1.ProviderTransactionEntity)),
    tslib_1.__metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], SharedProviderService);


/***/ }),
/* 237 */
/***/ ((module) => {

module.exports = require("rxjs");

/***/ }),
/* 238 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DispatcherResolver = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const graphql_1 = __webpack_require__(6);
const shared_order_service_1 = __webpack_require__(235);
const jwt_auth_guard_1 = __webpack_require__(115);
const calculate_fare_dto_1 = __webpack_require__(239);
const calculate_fare_input_1 = __webpack_require__(242);
const create_order_input_1 = __webpack_require__(243);
const order_dto_1 = __webpack_require__(180);
const order_service_1 = __webpack_require__(244);
let DispatcherResolver = class DispatcherResolver {
    constructor(context, sharedOrderService, orderService) {
        this.context = context;
        this.sharedOrderService = sharedOrderService;
        this.orderService = orderService;
    }
    async calculateFare(input) {
        return this.sharedOrderService.calculateFare({ ...input, twoWay: false });
    }
    async createOrder(input) {
        return this.sharedOrderService.createOrder({
            ...input,
            operatorId: this.context.req.user.id,
            twoWay: false,
            optionIds: [],
            waitMinutes: 0,
        });
    }
    async cancelOrder(orderId) {
        return this.orderService.cancelOrder(orderId);
    }
    async assignDriverToOrder(orderId, driverId) {
        return this.sharedOrderService.assignOrderToDriver(orderId, driverId);
    }
};
exports.DispatcherResolver = DispatcherResolver;
tslib_1.__decorate([
    (0, graphql_1.Query)(() => calculate_fare_dto_1.CalculateFareDTO),
    tslib_1.__param(0, (0, graphql_1.Args)('input', { type: () => calculate_fare_input_1.CalculateFareInput })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [calculate_fare_input_1.CalculateFareInput]),
    tslib_1.__metadata("design:returntype", Promise)
], DispatcherResolver.prototype, "calculateFare", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => order_dto_1.OrderDTO),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    tslib_1.__param(0, (0, graphql_1.Args)('input', { type: () => create_order_input_1.CreateOrderInput })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [create_order_input_1.CreateOrderInput]),
    tslib_1.__metadata("design:returntype", Promise)
], DispatcherResolver.prototype, "createOrder", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => order_dto_1.OrderDTO),
    tslib_1.__param(0, (0, graphql_1.Args)('orderId', { type: () => graphql_1.ID })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], DispatcherResolver.prototype, "cancelOrder", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => order_dto_1.OrderDTO),
    tslib_1.__param(0, (0, graphql_1.Args)('orderId', { type: () => graphql_1.ID })),
    tslib_1.__param(1, (0, graphql_1.Args)('driverId', { type: () => graphql_1.ID })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], DispatcherResolver.prototype, "assignDriverToOrder", null);
exports.DispatcherResolver = DispatcherResolver = tslib_1.__decorate([
    (0, graphql_1.Resolver)(() => order_dto_1.OrderDTO),
    tslib_1.__param(0, (0, common_1.Inject)(graphql_1.CONTEXT)),
    tslib_1.__metadata("design:paramtypes", [Object, shared_order_service_1.SharedOrderService,
        order_service_1.OrderService])
], DispatcherResolver);


/***/ }),
/* 239 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CalculateFareDTO = exports.CalculateFareError = void 0;
const tslib_1 = __webpack_require__(1);
const eager_import_0 = __webpack_require__(240);
const eager_import_1 = __webpack_require__(239);
const graphql_1 = __webpack_require__(6);
var CalculateFareError;
(function (CalculateFareError) {
    CalculateFareError["RegionUnsupported"] = "REGION_UNSUPPORTED";
    CalculateFareError["NoServiceInRegion"] = "NO_SERVICE_IN_REGION";
})(CalculateFareError || (exports.CalculateFareError = CalculateFareError = {}));
(0, graphql_1.registerEnumType)(CalculateFareError, { name: 'CalculateFareError' });
let CalculateFareDTO = class CalculateFareDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { currency: { type: () => String }, distance: { type: () => Number }, duration: { type: () => Number }, services: { type: () => [(__webpack_require__(240).ServiceCategoryWithCostDTO)] }, error: { nullable: true, type: () => (__webpack_require__(239).CalculateFareError) } };
    }
};
exports.CalculateFareDTO = CalculateFareDTO;
exports.CalculateFareDTO = CalculateFareDTO = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], CalculateFareDTO);


/***/ }),
/* 240 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceCategoryWithCostDTO = void 0;
const tslib_1 = __webpack_require__(1);
const eager_import_0 = __webpack_require__(241);
const nestjs_query_graphql_1 = __webpack_require__(103);
const graphql_1 = __webpack_require__(6);
let ServiceCategoryWithCostDTO = class ServiceCategoryWithCostDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, name: { type: () => String }, services: { type: () => [(__webpack_require__(241).ServiceWithCostDTO)] } };
    }
};
exports.ServiceCategoryWithCostDTO = ServiceCategoryWithCostDTO;
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.IDField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], ServiceCategoryWithCostDTO.prototype, "id", void 0);
exports.ServiceCategoryWithCostDTO = ServiceCategoryWithCostDTO = tslib_1.__decorate([
    (0, graphql_1.ObjectType)('ServiceCategoryWithCost')
], ServiceCategoryWithCostDTO);


/***/ }),
/* 241 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceWithCostDTO = void 0;
const tslib_1 = __webpack_require__(1);
const eager_import_0 = __webpack_require__(158);
const nestjs_query_graphql_1 = __webpack_require__(103);
const graphql_1 = __webpack_require__(6);
let ServiceWithCostDTO = class ServiceWithCostDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, name: { type: () => String }, cost: { type: () => Number }, media: { type: () => (__webpack_require__(158).MediaDTO) } };
    }
};
exports.ServiceWithCostDTO = ServiceWithCostDTO;
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.IDField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], ServiceWithCostDTO.prototype, "id", void 0);
exports.ServiceWithCostDTO = ServiceWithCostDTO = tslib_1.__decorate([
    (0, graphql_1.ObjectType)('ServiceWithCost')
], ServiceWithCostDTO);


/***/ }),
/* 242 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CalculateFareInput = void 0;
const tslib_1 = __webpack_require__(1);
const eager_import_0 = __webpack_require__(72);
const graphql_1 = __webpack_require__(6);
let CalculateFareInput = class CalculateFareInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { points: { type: () => [(__webpack_require__(72).Point)] } };
    }
};
exports.CalculateFareInput = CalculateFareInput;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {}),
    tslib_1.__metadata("design:type", Number)
], CalculateFareInput.prototype, "riderId", void 0);
exports.CalculateFareInput = CalculateFareInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], CalculateFareInput);


/***/ }),
/* 243 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateOrderInput = void 0;
const tslib_1 = __webpack_require__(1);
const eager_import_0 = __webpack_require__(72);
const graphql_1 = __webpack_require__(6);
let CreateOrderInput = class CreateOrderInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { points: { type: () => [(__webpack_require__(72).Point)] }, addresses: { type: () => [String] } };
    }
};
exports.CreateOrderInput = CreateOrderInput;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {}),
    tslib_1.__metadata("design:type", Number)
], CreateOrderInput.prototype, "riderId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {}),
    tslib_1.__metadata("design:type", Number)
], CreateOrderInput.prototype, "serviceId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, {}),
    tslib_1.__metadata("design:type", Number)
], CreateOrderInput.prototype, "intervalMinutes", void 0);
exports.CreateOrderInput = CreateOrderInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], CreateOrderInput);


/***/ }),
/* 244 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderService = void 0;
const tslib_1 = __webpack_require__(1);
const nestjs_query_graphql_1 = __webpack_require__(103);
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(7);
const order_status_enum_1 = __webpack_require__(77);
const request_activity_type_enum_1 = __webpack_require__(83);
const request_activity_entity_1 = __webpack_require__(82);
const request_entity_1 = __webpack_require__(23);
const order_redis_service_1 = __webpack_require__(168);
const graphql_redis_subscriptions_1 = __webpack_require__(104);
const typeorm_2 = __webpack_require__(10);
let OrderService = class OrderService {
    constructor(orderRepository, activityRepository, orderRedisService, pubSub) {
        this.orderRepository = orderRepository;
        this.activityRepository = activityRepository;
        this.orderRedisService = orderRedisService;
        this.pubSub = pubSub;
    }
    async cancelOrder(orderId) {
        let order = await this.orderRepository.findOne({
            where: { id: orderId },
            relations: { service: true },
        });
        this.activityRepository.insert({
            requestId: order.id,
            type: request_activity_type_enum_1.RequestActivityType.CanceledByOperator,
        });
        await this.orderRepository.update(order.id, {
            status: order_status_enum_1.OrderStatus.Expired,
            finishTimestamp: new Date(),
            costAfterCoupon: 0,
        });
        this.orderRedisService.expire([order.id]);
        this.pubSub.publish('orderRemoved', { orderRemoved: order });
        return order;
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(request_entity_1.RequestEntity)),
    tslib_1.__param(1, (0, typeorm_1.InjectRepository)(request_activity_entity_1.RequestActivityEntity)),
    tslib_1.__param(3, (0, nestjs_query_graphql_1.InjectPubSub)()),
    tslib_1.__metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        order_redis_service_1.OrderRedisService,
        graphql_redis_subscriptions_1.RedisPubSub])
], OrderService);


/***/ }),
/* 245 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderSubscriptionService = void 0;
const tslib_1 = __webpack_require__(1);
const nestjs_query_graphql_1 = __webpack_require__(103);
const common_1 = __webpack_require__(2);
const graphql_1 = __webpack_require__(6);
const graphql_redis_subscriptions_1 = __webpack_require__(104);
const order_dto_1 = __webpack_require__(180);
let OrderSubscriptionService = class OrderSubscriptionService {
    constructor(pubSub) {
        this.pubSub = pubSub;
    }
    orderUpdated(orderId) {
        return this.pubSub.asyncIterator('orderUpdated');
    }
};
exports.OrderSubscriptionService = OrderSubscriptionService;
tslib_1.__decorate([
    (0, graphql_1.Subscription)(() => order_dto_1.OrderDTO, {
        filter: (payload, variables, context) => {
            return variables.orderId == payload.orderUpdated.id;
        },
    }),
    tslib_1.__param(0, (0, graphql_1.Args)('orderId', { type: () => graphql_1.ID })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", void 0)
], OrderSubscriptionService.prototype, "orderUpdated", null);
exports.OrderSubscriptionService = OrderSubscriptionService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, nestjs_query_graphql_1.InjectPubSub)()),
    tslib_1.__metadata("design:paramtypes", [graphql_redis_subscriptions_1.RedisPubSub])
], OrderSubscriptionService);


/***/ }),
/* 246 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderCancelReasonDTO = void 0;
const tslib_1 = __webpack_require__(1);
const nestjs_query_graphql_1 = __webpack_require__(103);
const graphql_1 = __webpack_require__(6);
const anouncement_user_type_enum_1 = __webpack_require__(32);
const service_authorizer_1 = __webpack_require__(160);
let OrderCancelReasonDTO = class OrderCancelReasonDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number } };
    }
};
exports.OrderCancelReasonDTO = OrderCancelReasonDTO;
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.IDField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], OrderCancelReasonDTO.prototype, "id", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => String, {}),
    tslib_1.__metadata("design:type", String)
], OrderCancelReasonDTO.prototype, "title", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => Boolean, {}),
    tslib_1.__metadata("design:type", Boolean)
], OrderCancelReasonDTO.prototype, "isEnabled", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => anouncement_user_type_enum_1.AnnouncementUserType, {}),
    tslib_1.__metadata("design:type", String)
], OrderCancelReasonDTO.prototype, "userType", void 0);
exports.OrderCancelReasonDTO = OrderCancelReasonDTO = tslib_1.__decorate([
    (0, graphql_1.ObjectType)('OrderCancelReason'),
    (0, nestjs_query_graphql_1.Authorize)(service_authorizer_1.ServiceAuthorizer)
], OrderCancelReasonDTO);


/***/ }),
/* 247 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderCancelReasonInput = void 0;
const tslib_1 = __webpack_require__(1);
const graphql_1 = __webpack_require__(6);
const anouncement_user_type_enum_1 = __webpack_require__(32);
let OrderCancelReasonInput = class OrderCancelReasonInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { title: { nullable: true, type: () => String } };
    }
};
exports.OrderCancelReasonInput = OrderCancelReasonInput;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => Boolean, { nullable: true }),
    tslib_1.__metadata("design:type", Boolean)
], OrderCancelReasonInput.prototype, "isEnabled", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => anouncement_user_type_enum_1.AnnouncementUserType, { nullable: true }),
    tslib_1.__metadata("design:type", String)
], OrderCancelReasonInput.prototype, "userType", void 0);
exports.OrderCancelReasonInput = OrderCancelReasonInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], OrderCancelReasonInput);


/***/ }),
/* 248 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PaymentGatewayModule = void 0;
const tslib_1 = __webpack_require__(1);
const nestjs_query_graphql_1 = __webpack_require__(103);
const nestjs_query_typeorm_1 = __webpack_require__(111);
const common_1 = __webpack_require__(2);
const payment_gateway_entity_1 = __webpack_require__(33);
const jwt_auth_guard_1 = __webpack_require__(115);
const payment_gateway_dto_1 = __webpack_require__(191);
const payment_gateway_input_1 = __webpack_require__(249);
let PaymentGatewayModule = class PaymentGatewayModule {
};
exports.PaymentGatewayModule = PaymentGatewayModule;
exports.PaymentGatewayModule = PaymentGatewayModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_query_graphql_1.NestjsQueryGraphQLModule.forFeature({
                imports: [nestjs_query_typeorm_1.NestjsQueryTypeOrmModule.forFeature([payment_gateway_entity_1.PaymentGatewayEntity])],
                resolvers: [
                    {
                        EntityClass: payment_gateway_entity_1.PaymentGatewayEntity,
                        DTOClass: payment_gateway_dto_1.PaymentGatewayDTO,
                        CreateDTOClass: payment_gateway_input_1.PaymentGatewayInput,
                        UpdateDTOClass: payment_gateway_input_1.PaymentGatewayInput,
                        create: { many: { disabled: true } },
                        update: { many: { disabled: true } },
                        delete: { disabled: true },
                        pagingStrategy: nestjs_query_graphql_1.PagingStrategies.OFFSET,
                        enableTotalCount: true,
                        guards: [jwt_auth_guard_1.JwtAuthGuard],
                    },
                ],
            }),
        ],
    })
], PaymentGatewayModule);


/***/ }),
/* 249 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PaymentGatewayInput = void 0;
const tslib_1 = __webpack_require__(1);
const eager_import_0 = __webpack_require__(39);
const graphql_1 = __webpack_require__(6);
let PaymentGatewayInput = class PaymentGatewayInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { enabled: { type: () => Boolean }, title: { type: () => String }, type: { type: () => (__webpack_require__(39).PaymentGatewayType) }, publicKey: { nullable: true, type: () => String }, privateKey: { type: () => String }, merchantId: { nullable: true, type: () => String }, saltKey: { nullable: true, type: () => String }, mediaId: { nullable: true, type: () => Number } };
    }
};
exports.PaymentGatewayInput = PaymentGatewayInput;
exports.PaymentGatewayInput = PaymentGatewayInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], PaymentGatewayInput);


/***/ }),
/* 250 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RegionModule = void 0;
const tslib_1 = __webpack_require__(1);
const nestjs_query_graphql_1 = __webpack_require__(103);
const nestjs_query_typeorm_1 = __webpack_require__(111);
const common_1 = __webpack_require__(2);
const region_entity_1 = __webpack_require__(57);
const jwt_auth_guard_1 = __webpack_require__(115);
const region_dto_1 = __webpack_require__(156);
const region_input_1 = __webpack_require__(251);
let RegionModule = class RegionModule {
};
exports.RegionModule = RegionModule;
exports.RegionModule = RegionModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_query_graphql_1.NestjsQueryGraphQLModule.forFeature({
                imports: [nestjs_query_typeorm_1.NestjsQueryTypeOrmModule.forFeature([region_entity_1.RegionEntity])],
                resolvers: [
                    {
                        EntityClass: region_entity_1.RegionEntity,
                        DTOClass: region_dto_1.RegionDTO,
                        create: { many: { disabled: true } },
                        update: { many: { disabled: true } },
                        delete: { many: { disabled: true } },
                        CreateDTOClass: region_input_1.RegionInput,
                        UpdateDTOClass: region_input_1.RegionInput,
                        pagingStrategy: nestjs_query_graphql_1.PagingStrategies.OFFSET,
                        enableTotalCount: true,
                        enableAggregate: true,
                        guards: [jwt_auth_guard_1.JwtAuthGuard],
                    },
                ],
            }),
        ],
    })
], RegionModule);


/***/ }),
/* 251 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RegionInput = void 0;
const tslib_1 = __webpack_require__(1);
const eager_import_0 = __webpack_require__(72);
const graphql_1 = __webpack_require__(6);
let RegionInput = class RegionInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { name: { type: () => String }, currency: { type: () => String }, enabled: { type: () => Boolean }, location: { type: () => [[(__webpack_require__(72).Point)]] } };
    }
};
exports.RegionInput = RegionInput;
exports.RegionInput = RegionInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], RegionInput);


/***/ }),
/* 252 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RiderModule = void 0;
const tslib_1 = __webpack_require__(1);
const nestjs_query_graphql_1 = __webpack_require__(103);
const nestjs_query_typeorm_1 = __webpack_require__(111);
const common_1 = __webpack_require__(2);
const rider_address_entity_1 = __webpack_require__(71);
const rider_entity_1 = __webpack_require__(26);
const rider_transaction_entity_1 = __webpack_require__(34);
const rider_wallet_entity_1 = __webpack_require__(75);
const shared_rider_service_1 = __webpack_require__(224);
const jwt_auth_guard_1 = __webpack_require__(115);
const rider_address_dto_1 = __webpack_require__(196);
const rider_transaction_dto_1 = __webpack_require__(194);
const rider_wallet_dto_1 = __webpack_require__(197);
const rider_dto_1 = __webpack_require__(195);
const rider_resolver_1 = __webpack_require__(253);
const rider_input_1 = __webpack_require__(255);
const driver_entity_1 = __webpack_require__(12);
let RiderModule = class RiderModule {
};
exports.RiderModule = RiderModule;
exports.RiderModule = RiderModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_query_graphql_1.NestjsQueryGraphQLModule.forFeature({
                imports: [
                    nestjs_query_typeorm_1.NestjsQueryTypeOrmModule.forFeature([
                        rider_entity_1.RiderEntity,
                        driver_entity_1.DriverEntity,
                        rider_wallet_entity_1.RiderWalletEntity,
                        rider_transaction_entity_1.RiderTransactionEntity,
                        rider_address_entity_1.RiderAddressEntity,
                    ]),
                ],
                resolvers: [
                    {
                        EntityClass: rider_entity_1.RiderEntity,
                        DTOClass: rider_dto_1.RiderDTO,
                        CreateDTOClass: rider_input_1.RiderInput,
                        UpdateDTOClass: rider_input_1.RiderInput,
                        create: { many: { disabled: true } },
                        update: { many: { disabled: true } },
                        delete: { disabled: true },
                        pagingStrategy: nestjs_query_graphql_1.PagingStrategies.OFFSET,
                        enableTotalCount: true,
                        guards: [jwt_auth_guard_1.JwtAuthGuard],
                    },
                    {
                        EntityClass: rider_wallet_entity_1.RiderWalletEntity,
                        DTOClass: rider_wallet_dto_1.RiderWalletDTO,
                        create: { disabled: true },
                        update: { disabled: true },
                        delete: { disabled: true },
                        pagingStrategy: nestjs_query_graphql_1.PagingStrategies.OFFSET,
                        enableTotalCount: true,
                        guards: [jwt_auth_guard_1.JwtAuthGuard],
                    },
                    {
                        EntityClass: rider_transaction_entity_1.RiderTransactionEntity,
                        DTOClass: rider_transaction_dto_1.RiderTransactionDTO,
                        create: { many: { disabled: true } },
                        update: { disabled: true },
                        delete: { disabled: true },
                        pagingStrategy: nestjs_query_graphql_1.PagingStrategies.OFFSET,
                        enableTotalCount: true,
                        guards: [jwt_auth_guard_1.JwtAuthGuard],
                    },
                    {
                        EntityClass: rider_address_entity_1.RiderAddressEntity,
                        DTOClass: rider_address_dto_1.RiderAddressDTO,
                        create: { many: { disabled: true } },
                        delete: { disabled: true },
                        pagingStrategy: nestjs_query_graphql_1.PagingStrategies.OFFSET,
                        enableTotalCount: true,
                        guards: [jwt_auth_guard_1.JwtAuthGuard],
                    },
                ],
            }),
        ],
        providers: [rider_resolver_1.RiderResolver, shared_rider_service_1.SharedRiderService],
    })
], RiderModule);


/***/ }),
/* 253 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RiderResolver = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const graphql_1 = __webpack_require__(6);
const operator_permission_enum_1 = __webpack_require__(93);
const transaction_action_enum_1 = __webpack_require__(17);
const transaction_status_enum_1 = __webpack_require__(18);
const operator_entity_1 = __webpack_require__(19);
const shared_rider_service_1 = __webpack_require__(224);
const apollo_1 = __webpack_require__(116);
const jwt_auth_guard_1 = __webpack_require__(115);
const rider_transaction_input_1 = __webpack_require__(254);
const rider_wallet_dto_1 = __webpack_require__(197);
const rider_dto_1 = __webpack_require__(195);
const typeorm_1 = __webpack_require__(10);
let RiderResolver = class RiderResolver {
    constructor(sharedRiderService, context, datasource) {
        this.sharedRiderService = sharedRiderService;
        this.context = context;
        this.datasource = datasource;
    }
    async createRiderTransaction(input) {
        input.amount =
            input.action == transaction_action_enum_1.TransactionAction.Recharge
                ? Math.abs(input.amount)
                : Math.abs(input.amount) * -1;
        return this.sharedRiderService.rechargeWallet({
            ...input,
            operatorId: this.context.req.user.id,
            status: transaction_status_enum_1.TransactionStatus.Done,
        });
    }
    async deleteOneRider(id) {
        const operator = await this.datasource
            .getRepository(operator_entity_1.OperatorEntity)
            .findOne({
            where: { id: this.context.req.user.id },
            relations: { role: true },
        });
        if (!operator.role.permissions.includes(operator_permission_enum_1.OperatorPermission.Riders_Edit)) {
            throw new apollo_1.ForbiddenError('PERMISSION_NOT_GRANTED');
        }
        return this.sharedRiderService.deleteById(id);
    }
};
exports.RiderResolver = RiderResolver;
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => rider_wallet_dto_1.RiderWalletDTO),
    tslib_1.__param(0, (0, graphql_1.Args)('input', { type: () => rider_transaction_input_1.RiderTransactionInput })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [rider_transaction_input_1.RiderTransactionInput]),
    tslib_1.__metadata("design:returntype", Promise)
], RiderResolver.prototype, "createRiderTransaction", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => rider_dto_1.RiderDTO),
    tslib_1.__param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], RiderResolver.prototype, "deleteOneRider", null);
exports.RiderResolver = RiderResolver = tslib_1.__decorate([
    (0, graphql_1.Resolver)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    tslib_1.__param(1, (0, common_1.Inject)(graphql_1.CONTEXT)),
    tslib_1.__metadata("design:paramtypes", [shared_rider_service_1.SharedRiderService, Object, typeorm_1.DataSource])
], RiderResolver);


/***/ }),
/* 254 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RiderTransactionInput = void 0;
const tslib_1 = __webpack_require__(1);
const eager_import_0 = __webpack_require__(17);
const eager_import_1 = __webpack_require__(35);
const eager_import_2 = __webpack_require__(36);
const graphql_1 = __webpack_require__(6);
let RiderTransactionInput = class RiderTransactionInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { action: { type: () => (__webpack_require__(17).TransactionAction) }, deductType: { nullable: true, type: () => (__webpack_require__(35).RiderDeductTransactionType) }, rechargeType: { nullable: true, type: () => (__webpack_require__(36).RiderRechargeTransactionType) }, amount: { type: () => Number }, currency: { type: () => String }, refrenceNumber: { nullable: true, type: () => String }, description: { nullable: true, type: () => String } };
    }
};
exports.RiderTransactionInput = RiderTransactionInput;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {}),
    tslib_1.__metadata("design:type", Number)
], RiderTransactionInput.prototype, "riderId", void 0);
exports.RiderTransactionInput = RiderTransactionInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], RiderTransactionInput);


/***/ }),
/* 255 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RiderInput = void 0;
const tslib_1 = __webpack_require__(1);
const eager_import_0 = __webpack_require__(29);
const eager_import_1 = __webpack_require__(27);
const graphql_1 = __webpack_require__(6);
let RiderInput = class RiderInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { status: { nullable: true, type: () => (__webpack_require__(29).RiderStatus) }, firstName: { nullable: true, type: () => String }, lastName: { nullable: true, type: () => String }, mobileNumber: { nullable: true, type: () => String }, registrationTimestamp: { nullable: true, type: () => Date }, email: { nullable: true, type: () => String }, gender: { nullable: true, type: () => (__webpack_require__(27).Gender) }, isResident: { nullable: true, type: () => Boolean }, idNumber: { nullable: true, type: () => String } };
    }
};
exports.RiderInput = RiderInput;
exports.RiderInput = RiderInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], RiderInput);


/***/ }),
/* 256 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceModule = void 0;
const tslib_1 = __webpack_require__(1);
const nestjs_query_graphql_1 = __webpack_require__(103);
const nestjs_query_typeorm_1 = __webpack_require__(111);
const common_1 = __webpack_require__(2);
const service_category_entity_1 = __webpack_require__(59);
const service_option_entity_1 = __webpack_require__(60);
const service_entity_1 = __webpack_require__(52);
const zone_price_entity_1 = __webpack_require__(63);
const jwt_auth_guard_1 = __webpack_require__(115);
const operator_module_1 = __webpack_require__(213);
const service_category_dto_1 = __webpack_require__(257);
const service_option_dto_1 = __webpack_require__(159);
const service_dto_1 = __webpack_require__(153);
const zone_price_dto_1 = __webpack_require__(208);
const service_category_query_service_1 = __webpack_require__(258);
const service_option_query_service_1 = __webpack_require__(260);
const service_query_service_1 = __webpack_require__(261);
const service_option_input_1 = __webpack_require__(262);
const service_input_1 = __webpack_require__(263);
const service_category_input_1 = __webpack_require__(264);
const zone_price_input_1 = __webpack_require__(265);
let ServiceModule = class ServiceModule {
};
exports.ServiceModule = ServiceModule;
exports.ServiceModule = ServiceModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_query_graphql_1.NestjsQueryGraphQLModule.forFeature({
                imports: [
                    nestjs_query_typeorm_1.NestjsQueryTypeOrmModule.forFeature([
                        service_category_entity_1.ServiceCategoryEntity,
                        service_entity_1.ServiceEntity,
                        service_option_entity_1.ServiceOptionEntity,
                        zone_price_entity_1.ZonePriceEntity,
                    ]),
                    operator_module_1.OperatorModule,
                ],
                services: [
                    service_query_service_1.ServiceQueryService,
                    service_category_query_service_1.ServiceCategoryQueryService,
                    service_option_query_service_1.ServiceOptionQueryService,
                ],
                resolvers: [
                    {
                        EntityClass: service_entity_1.ServiceEntity,
                        DTOClass: service_dto_1.ServiceDTO,
                        ServiceClass: service_query_service_1.ServiceQueryService,
                        CreateDTOClass: service_input_1.ServiceInput,
                        UpdateDTOClass: service_input_1.ServiceInput,
                        create: { many: { disabled: true } },
                        update: { many: { disabled: true } },
                        delete: { many: { disabled: true } },
                        pagingStrategy: nestjs_query_graphql_1.PagingStrategies.NONE,
                        guards: [jwt_auth_guard_1.JwtAuthGuard],
                    },
                    {
                        EntityClass: service_category_entity_1.ServiceCategoryEntity,
                        DTOClass: service_category_dto_1.ServiceCategoryDTO,
                        ServiceClass: service_category_query_service_1.ServiceCategoryQueryService,
                        CreateDTOClass: service_category_input_1.ServiceCategoryInput,
                        UpdateDTOClass: service_category_input_1.ServiceCategoryInput,
                        create: { many: { disabled: true } },
                        update: { many: { disabled: true } },
                        delete: { many: { disabled: true } },
                        pagingStrategy: nestjs_query_graphql_1.PagingStrategies.NONE,
                        guards: [jwt_auth_guard_1.JwtAuthGuard],
                    },
                    {
                        EntityClass: service_option_entity_1.ServiceOptionEntity,
                        DTOClass: service_option_dto_1.ServiceOptionDTO,
                        CreateDTOClass: service_option_input_1.ServiceOptionInput,
                        UpdateDTOClass: service_option_input_1.ServiceOptionInput,
                        ServiceClass: service_option_query_service_1.ServiceOptionQueryService,
                        create: { many: { disabled: true } },
                        update: { many: { disabled: true } },
                        delete: { many: { disabled: true } },
                        pagingStrategy: nestjs_query_graphql_1.PagingStrategies.NONE,
                        guards: [jwt_auth_guard_1.JwtAuthGuard],
                    },
                    {
                        EntityClass: zone_price_entity_1.ZonePriceEntity,
                        DTOClass: zone_price_dto_1.ZonePriceDTO,
                        CreateDTOClass: zone_price_input_1.ZonePriceInput,
                        UpdateDTOClass: zone_price_input_1.ZonePriceInput,
                        create: { many: { disabled: true } },
                        update: { many: { disabled: true } },
                        delete: { many: { disabled: true } },
                        pagingStrategy: nestjs_query_graphql_1.PagingStrategies.OFFSET,
                        enableTotalCount: true,
                        guards: [jwt_auth_guard_1.JwtAuthGuard],
                    },
                ],
            }),
        ],
    })
], ServiceModule);


/***/ }),
/* 257 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceCategoryDTO = void 0;
const tslib_1 = __webpack_require__(1);
const nestjs_query_graphql_1 = __webpack_require__(103);
const graphql_1 = __webpack_require__(6);
const service_authorizer_1 = __webpack_require__(160);
const service_dto_1 = __webpack_require__(153);
let ServiceCategoryDTO = class ServiceCategoryDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, name: { type: () => String } };
    }
};
exports.ServiceCategoryDTO = ServiceCategoryDTO;
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.IDField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], ServiceCategoryDTO.prototype, "id", void 0);
exports.ServiceCategoryDTO = ServiceCategoryDTO = tslib_1.__decorate([
    (0, graphql_1.ObjectType)('ServiceCategory'),
    (0, nestjs_query_graphql_1.UnPagedRelation)('services', () => service_dto_1.ServiceDTO, {
        pagingStrategy: nestjs_query_graphql_1.PagingStrategies.NONE,
    }),
    (0, nestjs_query_graphql_1.Authorize)(service_authorizer_1.ServiceAuthorizer)
], ServiceCategoryDTO);


/***/ }),
/* 258 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceCategoryQueryService = void 0;
const tslib_1 = __webpack_require__(1);
const nestjs_query_core_1 = __webpack_require__(259);
const nestjs_query_typeorm_1 = __webpack_require__(111);
const common_1 = __webpack_require__(2);
const graphql_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(7);
const operator_permission_enum_1 = __webpack_require__(93);
const service_category_entity_1 = __webpack_require__(59);
const typeorm_2 = __webpack_require__(10);
const operator_service_1 = __webpack_require__(215);
const service_category_dto_1 = __webpack_require__(257);
let ServiceCategoryQueryService = class ServiceCategoryQueryService extends nestjs_query_typeorm_1.TypeOrmQueryService {
    constructor(serviceRepo, operatorService, userContext) {
        super(serviceRepo, { useSoftDelete: true });
        this.operatorService = operatorService;
        this.userContext = userContext;
    }
    async deleteOne(id, opts) {
        await this.operatorService.hasPermission(this.userContext.req.user.id, operator_permission_enum_1.OperatorPermission.Services_Edit);
        return super.deleteOne(id, opts);
    }
};
exports.ServiceCategoryQueryService = ServiceCategoryQueryService;
exports.ServiceCategoryQueryService = ServiceCategoryQueryService = tslib_1.__decorate([
    (0, nestjs_query_core_1.QueryService)(service_category_dto_1.ServiceCategoryDTO),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(service_category_entity_1.ServiceCategoryEntity)),
    tslib_1.__param(2, (0, common_1.Inject)(graphql_1.CONTEXT)),
    tslib_1.__metadata("design:paramtypes", [typeorm_2.Repository,
        operator_service_1.OperatorService, Object])
], ServiceCategoryQueryService);


/***/ }),
/* 259 */
/***/ ((module) => {

module.exports = require("@ptc-org/nestjs-query-core");

/***/ }),
/* 260 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceOptionQueryService = void 0;
const tslib_1 = __webpack_require__(1);
const nestjs_query_core_1 = __webpack_require__(259);
const nestjs_query_typeorm_1 = __webpack_require__(111);
const common_1 = __webpack_require__(2);
const graphql_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(7);
const operator_permission_enum_1 = __webpack_require__(93);
const service_option_entity_1 = __webpack_require__(60);
const typeorm_2 = __webpack_require__(10);
const operator_service_1 = __webpack_require__(215);
const service_option_dto_1 = __webpack_require__(159);
let ServiceOptionQueryService = class ServiceOptionQueryService extends nestjs_query_typeorm_1.TypeOrmQueryService {
    constructor(serviceRepo, operatorService, userContext) {
        super(serviceRepo, { useSoftDelete: true });
        this.operatorService = operatorService;
        this.userContext = userContext;
    }
    async deleteOne(id, opts) {
        await this.operatorService.hasPermission(this.userContext.req.user.id, operator_permission_enum_1.OperatorPermission.Services_Edit);
        return super.deleteOne(id, opts);
    }
};
exports.ServiceOptionQueryService = ServiceOptionQueryService;
exports.ServiceOptionQueryService = ServiceOptionQueryService = tslib_1.__decorate([
    (0, nestjs_query_core_1.QueryService)(service_option_dto_1.ServiceOptionDTO),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(service_option_entity_1.ServiceOptionEntity)),
    tslib_1.__param(2, (0, common_1.Inject)(graphql_1.CONTEXT)),
    tslib_1.__metadata("design:paramtypes", [typeorm_2.Repository,
        operator_service_1.OperatorService, Object])
], ServiceOptionQueryService);


/***/ }),
/* 261 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceQueryService = void 0;
const tslib_1 = __webpack_require__(1);
const nestjs_query_core_1 = __webpack_require__(259);
const nestjs_query_typeorm_1 = __webpack_require__(111);
const common_1 = __webpack_require__(2);
const graphql_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(7);
const operator_permission_enum_1 = __webpack_require__(93);
const service_entity_1 = __webpack_require__(52);
const typeorm_2 = __webpack_require__(10);
const operator_service_1 = __webpack_require__(215);
const service_dto_1 = __webpack_require__(153);
let ServiceQueryService = class ServiceQueryService extends nestjs_query_typeorm_1.TypeOrmQueryService {
    constructor(serviceRepo, operatorService, userContext) {
        super(serviceRepo, { useSoftDelete: true });
        this.operatorService = operatorService;
        this.userContext = userContext;
    }
    async deleteOne(id, opts) {
        await this.operatorService.hasPermission(this.userContext.req.user.id, operator_permission_enum_1.OperatorPermission.Services_Edit);
        return super.deleteOne(id, opts);
    }
};
exports.ServiceQueryService = ServiceQueryService;
exports.ServiceQueryService = ServiceQueryService = tslib_1.__decorate([
    (0, nestjs_query_core_1.QueryService)(service_dto_1.ServiceDTO),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(service_entity_1.ServiceEntity)),
    tslib_1.__param(2, (0, common_1.Inject)(graphql_1.CONTEXT)),
    tslib_1.__metadata("design:paramtypes", [typeorm_2.Repository,
        operator_service_1.OperatorService, Object])
], ServiceQueryService);


/***/ }),
/* 262 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceOptionInput = void 0;
const tslib_1 = __webpack_require__(1);
const eager_import_0 = __webpack_require__(62);
const eager_import_1 = __webpack_require__(61);
const graphql_1 = __webpack_require__(6);
let ServiceOptionInput = class ServiceOptionInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { name: { type: () => String }, type: { type: () => (__webpack_require__(62).ServiceOptionType) }, additionalFee: { nullable: true, type: () => Number }, icon: { type: () => (__webpack_require__(61).ServiceOptionIcon) } };
    }
};
exports.ServiceOptionInput = ServiceOptionInput;
exports.ServiceOptionInput = ServiceOptionInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], ServiceOptionInput);


/***/ }),
/* 263 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceInput = void 0;
const tslib_1 = __webpack_require__(1);
const eager_import_0 = __webpack_require__(56);
const eager_import_1 = __webpack_require__(101);
const eager_import_2 = __webpack_require__(100);
const eager_import_3 = __webpack_require__(154);
const eager_import_4 = __webpack_require__(155);
const graphql_1 = __webpack_require__(6);
const nestjs_query_graphql_1 = __webpack_require__(103);
let ServiceInput = class ServiceInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { name: { type: () => String }, description: { nullable: true, type: () => String }, categoryId: { type: () => Number }, baseFare: { type: () => Number }, roundingFactor: { nullable: true, type: () => Number }, perHundredMeters: { type: () => Number }, perMinuteDrive: { type: () => Number }, perMinuteWait: { type: () => Number }, prepayPercent: { type: () => Number }, minimumFee: { type: () => Number }, paymentMethod: { type: () => (__webpack_require__(56).ServicePaymentMethod) }, cancellationTotalFee: { type: () => Number }, cancellationDriverShare: { type: () => Number }, providerShareFlat: { type: () => Number }, twoWayAvailable: { type: () => Boolean }, timeMultipliers: { type: () => [(__webpack_require__(101).TimeMultiplier)] }, distanceMultipliers: { type: () => [(__webpack_require__(100).DistanceMultiplier)] }, weekdayMultipliers: { type: () => [(__webpack_require__(154).WeekdayMultiplier)] }, dateRangeMultipliers: { type: () => [(__webpack_require__(155).DateRangeMultiplier)] } };
    }
};
exports.ServiceInput = ServiceInput;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    tslib_1.__metadata("design:type", Number)
], ServiceInput.prototype, "personCapacity", void 0);
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.FilterableField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], ServiceInput.prototype, "categoryId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, {}),
    tslib_1.__metadata("design:type", Number)
], ServiceInput.prototype, "searchRadius", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, {}),
    tslib_1.__metadata("design:type", Number)
], ServiceInput.prototype, "providerSharePercent", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, {}),
    tslib_1.__metadata("design:type", Number)
], ServiceInput.prototype, "maximumDestinationDistance", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {}),
    tslib_1.__metadata("design:type", Number)
], ServiceInput.prototype, "mediaId", void 0);
exports.ServiceInput = ServiceInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], ServiceInput);


/***/ }),
/* 264 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceCategoryInput = void 0;
const tslib_1 = __webpack_require__(1);
const graphql_1 = __webpack_require__(6);
let ServiceCategoryInput = class ServiceCategoryInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { name: { type: () => String }, enabled: { nullable: true, type: () => Boolean } };
    }
};
exports.ServiceCategoryInput = ServiceCategoryInput;
exports.ServiceCategoryInput = ServiceCategoryInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], ServiceCategoryInput);


/***/ }),
/* 265 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ZonePriceInput = void 0;
const tslib_1 = __webpack_require__(1);
const eager_import_0 = __webpack_require__(72);
const eager_import_1 = __webpack_require__(101);
const graphql_1 = __webpack_require__(6);
let ZonePriceInput = class ZonePriceInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { name: { type: () => String }, from: { type: () => [[(__webpack_require__(72).Point)]] }, to: { type: () => [[(__webpack_require__(72).Point)]] }, cost: { type: () => Number }, timeMultipliers: { type: () => [(__webpack_require__(101).TimeMultiplier)] } };
    }
};
exports.ZonePriceInput = ZonePriceInput;
exports.ZonePriceInput = ZonePriceInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], ZonePriceInput);


/***/ }),
/* 266 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const jwt_1 = __webpack_require__(267);
const passport_1 = __webpack_require__(117);
const operator_module_1 = __webpack_require__(213);
const auth_resolver_1 = __webpack_require__(268);
const auth_service_1 = __webpack_require__(269);
const jwt_strategy_1 = __webpack_require__(271);
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            operator_module_1.OperatorModule,
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: 'secret',
            }),
        ],
        providers: [jwt_strategy_1.JwtStrategy, auth_service_1.AuthService, auth_resolver_1.AuthResolver],
    })
], AuthModule);


/***/ }),
/* 267 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 268 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthResolver = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const graphql_1 = __webpack_require__(6);
const operator_dto_1 = __webpack_require__(183);
const auth_service_1 = __webpack_require__(269);
const token_dto_1 = __webpack_require__(270);
const jwt_auth_guard_1 = __webpack_require__(115);
let AuthResolver = class AuthResolver {
    constructor(authService, context) {
        this.authService = authService;
        this.context = context;
    }
    //@UseGuards(LocalAdminAuthGuard)
    async login(userName, password) {
        const token = await this.authService.loginAdmin({ userName, password });
        return {
            token
        };
    }
    async me() {
        return this.authService.getAdmin(this.context.req.user.id);
    }
};
exports.AuthResolver = AuthResolver;
tslib_1.__decorate([
    (0, graphql_1.Query)(() => token_dto_1.TokenObject),
    tslib_1.__param(0, (0, graphql_1.Args)('userName', { type: () => String })),
    tslib_1.__param(1, (0, graphql_1.Args)('password', { type: () => String })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthResolver.prototype, "login", null);
tslib_1.__decorate([
    (0, graphql_1.Query)(() => operator_dto_1.OperatorDTO),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], AuthResolver.prototype, "me", null);
exports.AuthResolver = AuthResolver = tslib_1.__decorate([
    (0, graphql_1.Resolver)(),
    tslib_1.__param(1, (0, common_1.Inject)(graphql_1.CONTEXT)),
    tslib_1.__metadata("design:paramtypes", [auth_service_1.AuthService, Object])
], AuthResolver);


/***/ }),
/* 269 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const jwt_1 = __webpack_require__(267);
const apollo_1 = __webpack_require__(116);
const operator_service_1 = __webpack_require__(215);
let AuthService = class AuthService {
    constructor(jwtService, adminService) {
        this.jwtService = jwtService;
        this.adminService = adminService;
    }
    async getAdmin(id) {
        return this.adminService.getById(id);
    }
    async loginAdmin(args) {
        const admin = await this.adminService.validateCredentials(args.userName, args.password);
        if (admin == null) {
            throw new apollo_1.ForbiddenError('Invalid Credentials');
        }
        return this.jwtService.sign({ id: admin.id });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [jwt_1.JwtService,
        operator_service_1.OperatorService])
], AuthService);


/***/ }),
/* 270 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TokenObject = void 0;
const tslib_1 = __webpack_require__(1);
const graphql_1 = __webpack_require__(6);
let TokenObject = class TokenObject {
    static _GRAPHQL_METADATA_FACTORY() {
        return { token: { type: () => String } };
    }
};
exports.TokenObject = TokenObject;
exports.TokenObject = TokenObject = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], TokenObject);


/***/ }),
/* 271 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.validateToken = exports.JwtStrategy = void 0;
const tslib_1 = __webpack_require__(1);
const passport_jwt_1 = __webpack_require__(272);
const passport_1 = __webpack_require__(117);
const common_1 = __webpack_require__(2);
const jwt_decode_1 = tslib_1.__importDefault(__webpack_require__(273));
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor() {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'secret',
        });
    }
    async validate(payload) {
        return payload;
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], JwtStrategy);
async function validateToken(token) {
    const res = (0, jwt_decode_1.default)(token);
    return {
        id: res.id,
    };
}
exports.validateToken = validateToken;


/***/ }),
/* 272 */
/***/ ((module) => {

module.exports = require("passport-jwt");

/***/ }),
/* 273 */
/***/ ((module) => {

module.exports = require("jwt-decode");

/***/ }),
/* 274 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UploadModule = void 0;
const tslib_1 = __webpack_require__(1);
const nestjs_query_graphql_1 = __webpack_require__(103);
const nestjs_query_typeorm_1 = __webpack_require__(111);
const common_1 = __webpack_require__(2);
const media_entity_1 = __webpack_require__(30);
const media_dto_1 = __webpack_require__(158);
const upload_service_1 = __webpack_require__(135);
let UploadModule = class UploadModule {
};
exports.UploadModule = UploadModule;
exports.UploadModule = UploadModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_query_graphql_1.NestjsQueryGraphQLModule.forFeature({
                imports: [nestjs_query_typeorm_1.NestjsQueryTypeOrmModule.forFeature([media_entity_1.MediaEntity])],
                resolvers: [
                    {
                        DTOClass: media_dto_1.MediaDTO,
                        EntityClass: media_entity_1.MediaEntity,
                        create: { disabled: true },
                        read: { disabled: true },
                        delete: { disabled: true },
                        update: { disabled: true },
                    },
                ],
            }),
        ],
        providers: [upload_service_1.UploadService],
        exports: [upload_service_1.UploadService],
    })
], UploadModule);


/***/ }),
/* 275 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ComplaintModule = void 0;
const tslib_1 = __webpack_require__(1);
const nestjs_query_graphql_1 = __webpack_require__(103);
const nestjs_query_typeorm_1 = __webpack_require__(111);
const common_1 = __webpack_require__(2);
const database_1 = __webpack_require__(8);
const complaint_activity_entity_1 = __webpack_require__(20);
const complaint_entity_1 = __webpack_require__(21);
const jwt_auth_guard_1 = __webpack_require__(115);
const complaint_subscription_service_1 = __webpack_require__(276);
const complaint_activity_dto_1 = __webpack_require__(182);
const complaint_dto_1 = __webpack_require__(181);
let ComplaintModule = class ComplaintModule {
};
exports.ComplaintModule = ComplaintModule;
exports.ComplaintModule = ComplaintModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_query_graphql_1.NestjsQueryGraphQLModule.forFeature({
                imports: [
                    nestjs_query_typeorm_1.NestjsQueryTypeOrmModule.forFeature([
                        complaint_entity_1.ComplaintEntity,
                        complaint_activity_entity_1.ComplaintActivityEntity,
                    ]),
                ],
                resolvers: [
                    {
                        EntityClass: complaint_entity_1.ComplaintEntity,
                        DTOClass: complaint_dto_1.ComplaintDTO,
                        create: { disabled: true },
                        update: { many: { disabled: true } },
                        delete: { disabled: true },
                        enableAggregate: true,
                        pagingStrategy: nestjs_query_graphql_1.PagingStrategies.OFFSET,
                        enableTotalCount: true,
                        guards: [jwt_auth_guard_1.JwtAuthGuard],
                    },
                    {
                        EntityClass: complaint_activity_entity_1.ComplaintActivityEntity,
                        DTOClass: complaint_activity_dto_1.ComplaintActivityDTO,
                        pagingStrategy: nestjs_query_graphql_1.PagingStrategies.NONE,
                        update: { disabled: true },
                        delete: { disabled: true },
                        guards: [jwt_auth_guard_1.JwtAuthGuard],
                    },
                ],
            }),
        ],
        providers: [complaint_subscription_service_1.ComplaintSubscriptionService, database_1.RedisPubSubProvider.provider()],
    })
], ComplaintModule);


/***/ }),
/* 276 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ComplaintSubscriptionService = void 0;
const tslib_1 = __webpack_require__(1);
const nestjs_query_graphql_1 = __webpack_require__(103);
const common_1 = __webpack_require__(2);
const graphql_1 = __webpack_require__(6);
const graphql_redis_subscriptions_1 = __webpack_require__(104);
const complaint_dto_1 = __webpack_require__(181);
let ComplaintSubscriptionService = class ComplaintSubscriptionService {
    constructor(pubSub) {
        this.pubSub = pubSub;
    }
    complaintCreated() {
        return this.pubSub.asyncIterator('complaintCreated');
    }
};
exports.ComplaintSubscriptionService = ComplaintSubscriptionService;
tslib_1.__decorate([
    (0, graphql_1.Subscription)(() => complaint_dto_1.ComplaintDTO, {
        filter: (payload, variables, context) => {
            return payload.adminIds.includes(context.user.id);
        },
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], ComplaintSubscriptionService.prototype, "complaintCreated", null);
exports.ComplaintSubscriptionService = ComplaintSubscriptionService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, nestjs_query_graphql_1.InjectPubSub)()),
    tslib_1.__metadata("design:paramtypes", [graphql_redis_subscriptions_1.RedisPubSub])
], ComplaintSubscriptionService);


/***/ }),
/* 277 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfigurationModule = void 0;
const tslib_1 = __webpack_require__(1);
const axios_1 = __webpack_require__(5);
const common_1 = __webpack_require__(2);
const configuration_controller_1 = __webpack_require__(278);
const configuration_resolver_1 = __webpack_require__(281);
const configuration_service_1 = __webpack_require__(279);
let ConfigurationModule = class ConfigurationModule {
};
exports.ConfigurationModule = ConfigurationModule;
exports.ConfigurationModule = ConfigurationModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            axios_1.HttpModule,
        ],
        providers: [
            configuration_service_1.ConfigurationService,
            configuration_resolver_1.ConfigurationResolver
        ],
        controllers: [
            configuration_controller_1.ConfigurationController
        ]
    })
], ConfigurationModule);


/***/ }),
/* 278 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfigurationController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const fastify = tslib_1.__importStar(__webpack_require__(132));
const configuration_service_1 = __webpack_require__(279);
let ConfigurationController = class ConfigurationController {
    constructor(configurationService) {
        this.configurationService = configurationService;
    }
    async upload(req, res) {
        this.configurationService.uploadFile(req, res, 'config');
    }
};
exports.ConfigurationController = ConfigurationController;
tslib_1.__decorate([
    (0, common_1.Post)('upload'),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ConfigurationController.prototype, "upload", null);
exports.ConfigurationController = ConfigurationController = tslib_1.__decorate([
    (0, common_1.Controller)('config'),
    tslib_1.__metadata("design:paramtypes", [configuration_service_1.ConfigurationService])
], ConfigurationController);


/***/ }),
/* 279 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfigurationService = void 0;
const tslib_1 = __webpack_require__(1);
const axios_1 = __webpack_require__(5);
const common_1 = __webpack_require__(2);
const rxjs_1 = __webpack_require__(237);
const config_dto_1 = __webpack_require__(280);
const fs = tslib_1.__importStar(__webpack_require__(136));
const util = tslib_1.__importStar(__webpack_require__(137));
const path_1 = __webpack_require__(108);
const stream_1 = __webpack_require__(138);
const apollo_1 = __webpack_require__(116);
const pump = util.promisify(stream_1.pipeline);
let ConfigurationService = class ConfigurationService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async getConfiguration() {
        const configAddress = `${process.cwd()}/config/config.${process.env.NODE_ENV ?? 'production'}.json`;
        if (fs.existsSync(configAddress)) {
            const file = await fs.promises.readFile(configAddress, {
                encoding: 'utf-8',
            });
            const config = JSON.parse(file);
            const firebaseKeyFileAddress = `${process.cwd()}/config/${config.firebaseProjectPrivateKey}`;
            return config;
            if (config.firebaseProjectPrivateKey != null &&
                fs.existsSync(firebaseKeyFileAddress)) {
                if (global.saltKey == null) {
                    config.purchaseCode = null;
                    return config;
                }
                return {
                    adminPanelAPIKey: config.adminPanelAPIKey,
                    backendMapsAPIKey: process.env.DEMO_MODE != null
                        ? this.maskString(config.backendMapsAPIKey)
                        : config.backendMapsAPIKey,
                    purchaseCode: 'RESTRICTED',
                    firebaseProjectPrivateKey: process.env.DEMO_MODE != null
                        ? this.maskString(config.firebaseProjectPrivateKey)
                        : config.firebaseProjectPrivateKey,
                    twilioAccountSid: process.env.DEMO_MODE != null
                        ? this.maskString(config.twilioAccountSid)
                        : config.twilioAccountSid,
                    twilioAuthToken: process.env.DEMO_MODE != null
                        ? this.maskString(config.twilioAuthToken)
                        : config.twilioAuthToken,
                    twilioFromNumber: process.env.DEMO_MODE != null
                        ? this.maskString(config.twilioFromNumber)
                        : config.twilioFromNumber,
                    twilioVerificationCodeSMSTemplate: process.env.DEMO_MODE != null
                        ? this.maskString(config.twilioVerificationCodeSMSTemplate)
                        : config.twilioVerificationCodeSMSTemplate,
                };
            }
            return config;
        }
        else {
            return new config_dto_1.CurrentConfiguration();
        }
    }
    async saveConfiguration(newConfig) {
        const config = await this.getConfiguration();
        if (process.env.DEMO_MODE != null) {
            throw new apollo_1.ForbiddenError('Cannot change configuration in demo mode.');
        }
        const finalConfig = Object.assign(config, newConfig);
        const str = JSON.stringify(finalConfig);
        await fs.promises.mkdir(`${process.cwd()}/config`, { recursive: true });
        await fs.promises.writeFile(`${process.cwd()}/config/config.${process.env.NODE_ENV ?? 'production'}.json`, str);
        return true;
    }
    maskString(str) {
        if (str == null) {
            return null;
        }
        return str
            .split('')
            .map(() => '*')
            .join('');
    }
    async updatePurchaseCode(code, email) {
        let url = `http://31.220.15.49:9000/verify?purchaseCode=${code}&port=4001`;
        if (email) {
            url += `&email=${email}`;
        }
        const result = await (0, rxjs_1.firstValueFrom)(this.httpService.get(url));
        if (true) {
            await this.saveConfiguration({ purchaseCode: code });
            return {
                status: config_dto_1.UpdatePurchaseCodeStatus.OK,
            };
        }
        else {}
    }
    async updateMapsAPIKey(backend, adminPanel) {
        await this.saveConfiguration({
            backendMapsAPIKey: backend,
            adminPanelAPIKey: adminPanel,
        });
        return {
            status: config_dto_1.UpdateConfigStatus.OK,
        };
    }
    async updateFirebase(keyFileName) {
        await this.saveConfiguration({ firebaseProjectPrivateKey: keyFileName });
        return {
            status: config_dto_1.UpdateConfigStatus.OK,
        };
    }
    async disablePreviousServer(ip) {
        const result = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`http://31.220.15.49:9000/disable_one?ip=${ip}`));
        if (result.data.status == 'OK') {
            return { status: config_dto_1.UpdateConfigStatus.OK };
        }
        else {
            return { status: config_dto_1.UpdateConfigStatus.INVALID };
        }
    }
    async uploadFile(req, res, dir, fileNamePrefix) {
        let _fileName = '';
        const data = await req.file();
        await fs.promises.mkdir(dir, { recursive: true });
        _fileName = (0, path_1.join)(dir, fileNamePrefix != null
            ? `${fileNamePrefix}-${data.filename}`
            : data.filename);
        await pump(data.file, fs.createWriteStream(_fileName));
        res.code(200).send({ address: _fileName });
    }
};
exports.ConfigurationService = ConfigurationService;
exports.ConfigurationService = ConfigurationService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [axios_1.HttpService])
], ConfigurationService);


/***/ }),
/* 280 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateConfigResult = exports.UpdateConfigStatus = exports.UpdatePurchaseCodeClient = exports.UpdatePurchaseCodeResult = exports.UpdatePurchaseCodeStatus = exports.UploadResult = exports.CurrentConfiguration = void 0;
const tslib_1 = __webpack_require__(1);
const eager_import_0 = __webpack_require__(280);
const graphql_1 = __webpack_require__(6);
let CurrentConfiguration = class CurrentConfiguration {
    static _GRAPHQL_METADATA_FACTORY() {
        return { purchaseCode: { nullable: true, type: () => String }, backendMapsAPIKey: { nullable: true, type: () => String }, adminPanelAPIKey: { nullable: true, type: () => String }, firebaseProjectPrivateKey: { nullable: true, type: () => String }, twilioAccountSid: { nullable: true, type: () => String }, twilioAuthToken: { nullable: true, type: () => String }, twilioFromNumber: { nullable: true, type: () => String }, twilioVerificationCodeSMSTemplate: { nullable: true, type: () => String } };
    }
};
exports.CurrentConfiguration = CurrentConfiguration;
exports.CurrentConfiguration = CurrentConfiguration = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], CurrentConfiguration);
let UploadResult = class UploadResult {
    static _GRAPHQL_METADATA_FACTORY() {
        return { url: { type: () => String } };
    }
};
exports.UploadResult = UploadResult;
exports.UploadResult = UploadResult = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], UploadResult);
var UpdatePurchaseCodeStatus;
(function (UpdatePurchaseCodeStatus) {
    UpdatePurchaseCodeStatus["OK"] = "OK";
    UpdatePurchaseCodeStatus["INVALID"] = "INVALID";
    UpdatePurchaseCodeStatus["OVERUSED"] = "OVERUSED";
    UpdatePurchaseCodeStatus["CLIENT_FOUND"] = "CLIENT_FOUND";
})(UpdatePurchaseCodeStatus || (exports.UpdatePurchaseCodeStatus = UpdatePurchaseCodeStatus = {}));
(0, graphql_1.registerEnumType)(UpdatePurchaseCodeStatus, {
    name: 'UpdatePurchaseCodeStatus',
});
let UpdatePurchaseCodeResult = class UpdatePurchaseCodeResult {
    static _GRAPHQL_METADATA_FACTORY() {
        return { status: { type: () => (__webpack_require__(280).UpdatePurchaseCodeStatus) }, message: { nullable: true, type: () => String }, clients: { nullable: true, type: () => [(__webpack_require__(280).UpdatePurchaseCodeClient)] } };
    }
};
exports.UpdatePurchaseCodeResult = UpdatePurchaseCodeResult;
exports.UpdatePurchaseCodeResult = UpdatePurchaseCodeResult = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], UpdatePurchaseCodeResult);
let UpdatePurchaseCodeClient = class UpdatePurchaseCodeClient {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, enabled: { type: () => Number }, ip: { type: () => String }, port: { type: () => Number }, token: { type: () => String }, purchase_id: { type: () => Number }, first_verified_at: { type: () => String }, last_verified_at: { type: () => String } };
    }
};
exports.UpdatePurchaseCodeClient = UpdatePurchaseCodeClient;
exports.UpdatePurchaseCodeClient = UpdatePurchaseCodeClient = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], UpdatePurchaseCodeClient);
var UpdateConfigStatus;
(function (UpdateConfigStatus) {
    UpdateConfigStatus["OK"] = "OK";
    UpdateConfigStatus["INVALID"] = "INVALID";
})(UpdateConfigStatus || (exports.UpdateConfigStatus = UpdateConfigStatus = {}));
(0, graphql_1.registerEnumType)(UpdateConfigStatus, { name: 'UpdateConfigStatus' });
let UpdateConfigResult = class UpdateConfigResult {
    static _GRAPHQL_METADATA_FACTORY() {
        return { status: { type: () => (__webpack_require__(280).UpdateConfigStatus) }, message: { nullable: true, type: () => String } };
    }
};
exports.UpdateConfigResult = UpdateConfigResult;
exports.UpdateConfigResult = UpdateConfigResult = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], UpdateConfigResult);


/***/ }),
/* 281 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfigurationResolver = void 0;
const tslib_1 = __webpack_require__(1);
const graphql_1 = __webpack_require__(6);
const config_dto_1 = __webpack_require__(280);
const configuration_service_1 = __webpack_require__(279);
const update_config_input_1 = __webpack_require__(282);
let ConfigurationResolver = class ConfigurationResolver {
    constructor(configurationService) {
        this.configurationService = configurationService;
    }
    // @Mutation(() => UploadResult)
    // async uploads(@Args('input', { type: () => GraphQLUpload }) {createReadStream,filename}): Promise<{url: string}> {
    //     return {url: filename};
    // }
    async currentConfiguration() {
        const currentConfig = await this.configurationService.getConfiguration();
        if (process.env.DEMO_MODE != null) {
            return {
                purchaseCode: 'RESTRICTED',
                adminPanelAPIKey: currentConfig.adminPanelAPIKey,
                firebaseProjectPrivateKey: currentConfig.firebaseProjectPrivateKey,
            };
        }
        return currentConfig;
    }
    async updatePurchaseCode(purchaseCode, email) {
        return this.configurationService.updatePurchaseCode(purchaseCode, email);
    }
    async updateMapsAPIKey(backend, adminPanel) {
        return this.configurationService.updateMapsAPIKey(backend, adminPanel);
    }
    async updateFirebase(keyFileName) {
        return this.configurationService.updateFirebase(keyFileName);
    }
    async disablePreviousServer(ip) {
        return this.configurationService.disablePreviousServer(ip);
    }
    async saveConfiguration(input) {
        return this.configurationService.saveConfiguration(input);
    }
};
exports.ConfigurationResolver = ConfigurationResolver;
tslib_1.__decorate([
    (0, graphql_1.Query)(() => config_dto_1.CurrentConfiguration),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], ConfigurationResolver.prototype, "currentConfiguration", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => config_dto_1.UpdatePurchaseCodeResult),
    tslib_1.__param(0, (0, graphql_1.Args)('purchaseCode', { type: () => String })),
    tslib_1.__param(1, (0, graphql_1.Args)('email', { type: () => String, nullable: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], ConfigurationResolver.prototype, "updatePurchaseCode", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => config_dto_1.UpdateConfigResult),
    tslib_1.__param(0, (0, graphql_1.Args)('backend', { type: () => String })),
    tslib_1.__param(1, (0, graphql_1.Args)('adminPanel', { type: () => String })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], ConfigurationResolver.prototype, "updateMapsAPIKey", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => config_dto_1.UpdateConfigResult),
    tslib_1.__param(0, (0, graphql_1.Args)('keyFileName', { type: () => String })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], ConfigurationResolver.prototype, "updateFirebase", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => config_dto_1.UpdateConfigResult),
    tslib_1.__param(0, (0, graphql_1.Args)('ip', { type: () => String })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], ConfigurationResolver.prototype, "disablePreviousServer", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => config_dto_1.CurrentConfiguration),
    tslib_1.__param(0, (0, graphql_1.Args)('input', { type: () => update_config_input_1.UpdateConfigInput })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [config_dto_1.CurrentConfiguration]),
    tslib_1.__metadata("design:returntype", Promise)
], ConfigurationResolver.prototype, "saveConfiguration", null);
exports.ConfigurationResolver = ConfigurationResolver = tslib_1.__decorate([
    (0, graphql_1.Resolver)(),
    tslib_1.__metadata("design:paramtypes", [configuration_service_1.ConfigurationService])
], ConfigurationResolver);


/***/ }),
/* 282 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateConfigInput = void 0;
const tslib_1 = __webpack_require__(1);
const graphql_1 = __webpack_require__(6);
let UpdateConfigInput = class UpdateConfigInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { backendMapsAPIKey: { nullable: true, type: () => String }, adminPanelAPIKey: { nullable: true, type: () => String }, twilioAccountSid: { nullable: true, type: () => String }, twilioAuthToken: { nullable: true, type: () => String }, twilioFromNumber: { nullable: true, type: () => String }, twilioVerificationCodeSMSTemplate: { nullable: true, type: () => String } };
    }
};
exports.UpdateConfigInput = UpdateConfigInput;
exports.UpdateConfigInput = UpdateConfigInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], UpdateConfigInput);


/***/ }),
/* 283 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SOSModule = void 0;
const tslib_1 = __webpack_require__(1);
const nestjs_query_graphql_1 = __webpack_require__(103);
const nestjs_query_typeorm_1 = __webpack_require__(111);
const common_1 = __webpack_require__(2);
const database_1 = __webpack_require__(8);
const sos_activity_entity_1 = __webpack_require__(86);
const sos_entity_1 = __webpack_require__(84);
const jwt_auth_guard_1 = __webpack_require__(115);
const create_sos_activity_input_1 = __webpack_require__(284);
const sos_activity_dto_1 = __webpack_require__(285);
const sos_dto_1 = __webpack_require__(286);
const sos_acitivty_query_service_1 = __webpack_require__(287);
const sos_subscription_service_1 = __webpack_require__(288);
let SOSModule = class SOSModule {
};
exports.SOSModule = SOSModule;
exports.SOSModule = SOSModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_query_graphql_1.NestjsQueryGraphQLModule.forFeature({
                imports: [
                    nestjs_query_typeorm_1.NestjsQueryTypeOrmModule.forFeature([sos_entity_1.SOSEntity, sos_activity_entity_1.SOSActivityEntity]),
                ],
                services: [sos_acitivty_query_service_1.SOSActivityQueryService],
                resolvers: [
                    {
                        EntityClass: sos_entity_1.SOSEntity,
                        DTOClass: sos_dto_1.SOSDTO,
                        create: { disabled: true },
                        update: { disabled: true },
                        delete: { disabled: true },
                        pagingStrategy: nestjs_query_graphql_1.PagingStrategies.OFFSET,
                        enableTotalCount: true,
                        enableAggregate: true,
                        guards: [jwt_auth_guard_1.JwtAuthGuard],
                    },
                    {
                        EntityClass: sos_activity_entity_1.SOSActivityEntity,
                        DTOClass: sos_activity_dto_1.SOSActivityDTO,
                        CreateDTOClass: create_sos_activity_input_1.CreateSOSAcitivtyInput,
                        ServiceClass: sos_acitivty_query_service_1.SOSActivityQueryService,
                        read: { disabled: true },
                        create: { many: { disabled: true } },
                        update: { disabled: true },
                        delete: { disabled: true },
                        pagingStrategy: nestjs_query_graphql_1.PagingStrategies.NONE,
                        guards: [jwt_auth_guard_1.JwtAuthGuard],
                    },
                ],
            }),
        ],
        providers: [sos_subscription_service_1.SOSSubscriptionService, database_1.RedisPubSubProvider.provider()],
    })
], SOSModule);


/***/ }),
/* 284 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateSOSAcitivtyInput = void 0;
const tslib_1 = __webpack_require__(1);
const eager_import_0 = __webpack_require__(87);
const graphql_1 = __webpack_require__(6);
let CreateSOSAcitivtyInput = class CreateSOSAcitivtyInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { action: { type: () => (__webpack_require__(87).SOSActivityAction) }, note: { nullable: true, type: () => String } };
    }
};
exports.CreateSOSAcitivtyInput = CreateSOSAcitivtyInput;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {}),
    tslib_1.__metadata("design:type", Number)
], CreateSOSAcitivtyInput.prototype, "sosId", void 0);
exports.CreateSOSAcitivtyInput = CreateSOSAcitivtyInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], CreateSOSAcitivtyInput);


/***/ }),
/* 285 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SOSActivityDTO = void 0;
const tslib_1 = __webpack_require__(1);
const eager_import_0 = __webpack_require__(87);
const nestjs_query_graphql_1 = __webpack_require__(103);
const graphql_1 = __webpack_require__(6);
const operator_dto_1 = __webpack_require__(183);
let SOSActivityDTO = class SOSActivityDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, createdAt: { type: () => Date }, action: { type: () => (__webpack_require__(87).SOSActivityAction) }, note: { nullable: true, type: () => String }, operatorId: { nullable: true, type: () => Number } };
    }
};
exports.SOSActivityDTO = SOSActivityDTO;
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.IDField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], SOSActivityDTO.prototype, "id", void 0);
exports.SOSActivityDTO = SOSActivityDTO = tslib_1.__decorate([
    (0, graphql_1.ObjectType)('SOSActivity'),
    (0, nestjs_query_graphql_1.Relation)('operator', () => operator_dto_1.OperatorDTO)
], SOSActivityDTO);


/***/ }),
/* 286 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SOSDTO = void 0;
const tslib_1 = __webpack_require__(1);
const eager_import_0 = __webpack_require__(85);
const eager_import_1 = __webpack_require__(72);
const nestjs_query_graphql_1 = __webpack_require__(103);
const graphql_1 = __webpack_require__(6);
const sos_status_enum_1 = __webpack_require__(85);
const order_dto_1 = __webpack_require__(180);
const sos_activity_dto_1 = __webpack_require__(285);
let SOSDTO = class SOSDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, createdAt: { type: () => Date }, status: { type: () => (__webpack_require__(85).SOSStatus) }, location: { nullable: true, type: () => (__webpack_require__(72).Point) }, submittedByRider: { type: () => Boolean }, requestId: { type: () => Number } };
    }
};
exports.SOSDTO = SOSDTO;
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.IDField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], SOSDTO.prototype, "id", void 0);
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.FilterableField)(() => sos_status_enum_1.SOSStatus),
    tslib_1.__metadata("design:type", String)
], SOSDTO.prototype, "status", void 0);
exports.SOSDTO = SOSDTO = tslib_1.__decorate([
    (0, graphql_1.ObjectType)('DistressSignal'),
    (0, nestjs_query_graphql_1.UnPagedRelation)('activities', () => sos_activity_dto_1.SOSActivityDTO),
    (0, nestjs_query_graphql_1.Relation)('order', () => order_dto_1.OrderDTO, { relationName: 'request' })
], SOSDTO);


/***/ }),
/* 287 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SOSActivityQueryService = void 0;
const tslib_1 = __webpack_require__(1);
const nestjs_query_core_1 = __webpack_require__(259);
const nestjs_query_typeorm_1 = __webpack_require__(111);
const common_1 = __webpack_require__(2);
const graphql_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(7);
const sos_activity_action_enum_1 = __webpack_require__(87);
const sos_status_enum_1 = __webpack_require__(85);
const sos_activity_entity_1 = __webpack_require__(86);
const sos_entity_1 = __webpack_require__(84);
const typeorm_2 = __webpack_require__(10);
const sos_activity_dto_1 = __webpack_require__(285);
let SOSActivityQueryService = class SOSActivityQueryService extends nestjs_query_typeorm_1.TypeOrmQueryService {
    constructor(sosActivityRepo, sosRepository, userContext) {
        super(sosActivityRepo);
        this.sosRepository = sosRepository;
        this.userContext = userContext;
    }
    async createOne(record) {
        const activity = await super.createOne({
            ...record,
            operatorId: this.userContext.req.user.id,
        });
        switch (activity.action) {
            case sos_activity_action_enum_1.SOSActivityAction.MarkedAsResolved:
                await this.sosRepository.update(record.sosId, {
                    status: sos_status_enum_1.SOSStatus.Resolved,
                });
                break;
            case sos_activity_action_enum_1.SOSActivityAction.MarkedAsFalseAlarm:
                await this.sosRepository.update(record.sosId, {
                    status: sos_status_enum_1.SOSStatus.FalseAlarm,
                });
                break;
        }
        return activity;
    }
};
exports.SOSActivityQueryService = SOSActivityQueryService;
exports.SOSActivityQueryService = SOSActivityQueryService = tslib_1.__decorate([
    (0, nestjs_query_core_1.QueryService)(sos_activity_dto_1.SOSActivityDTO),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(sos_activity_entity_1.SOSActivityEntity)),
    tslib_1.__param(1, (0, typeorm_1.InjectRepository)(sos_entity_1.SOSEntity)),
    tslib_1.__param(2, (0, common_1.Inject)(graphql_1.CONTEXT)),
    tslib_1.__metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository, Object])
], SOSActivityQueryService);


/***/ }),
/* 288 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SOSSubscriptionService = void 0;
const tslib_1 = __webpack_require__(1);
const nestjs_query_graphql_1 = __webpack_require__(103);
const common_1 = __webpack_require__(2);
const graphql_1 = __webpack_require__(6);
const graphql_redis_subscriptions_1 = __webpack_require__(104);
const sos_dto_1 = __webpack_require__(286);
let SOSSubscriptionService = class SOSSubscriptionService {
    constructor(pubSub) {
        this.pubSub = pubSub;
    }
    sosCreated() {
        return this.pubSub.asyncIterator('sosCreated');
    }
};
exports.SOSSubscriptionService = SOSSubscriptionService;
tslib_1.__decorate([
    (0, graphql_1.Subscription)(() => sos_dto_1.SOSDTO, {
        filter: (payload, variables, context) => {
            common_1.Logger.log(payload.adminIds.includes(context.user.id));
            return payload.adminIds.includes(context.user.id);
        },
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], SOSSubscriptionService.prototype, "sosCreated", null);
exports.SOSSubscriptionService = SOSSubscriptionService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, nestjs_query_graphql_1.InjectPubSub)()),
    tslib_1.__metadata("design:paramtypes", [graphql_redis_subscriptions_1.RedisPubSub])
], SOSSubscriptionService);


/***/ }),
/* 289 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RewardModule = void 0;
const tslib_1 = __webpack_require__(1);
const nestjs_query_graphql_1 = __webpack_require__(103);
const nestjs_query_typeorm_1 = __webpack_require__(111);
const common_1 = __webpack_require__(2);
const reward_entity_1 = __webpack_require__(290);
const reward_dto_1 = __webpack_require__(294);
let RewardModule = class RewardModule {
};
exports.RewardModule = RewardModule;
exports.RewardModule = RewardModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_query_graphql_1.NestjsQueryGraphQLModule.forFeature({
                imports: [nestjs_query_typeorm_1.NestjsQueryTypeOrmModule.forFeature([reward_entity_1.RewardEntity])],
                resolvers: [
                    {
                        EntityClass: reward_entity_1.RewardEntity,
                        DTOClass: reward_dto_1.RewardDTO,
                        create: { many: { disabled: true } },
                        update: { many: { disabled: true } },
                        delete: { many: { disabled: true } },
                        pagingStrategy: nestjs_query_graphql_1.PagingStrategies.OFFSET,
                        enableTotalCount: true,
                    },
                ],
            }),
        ],
    })
], RewardModule);


/***/ }),
/* 290 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RewardEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(10);
const reward_app_type_1 = __webpack_require__(291);
const reward_beneficiary_1 = __webpack_require__(292);
const reward_event_1 = __webpack_require__(293);
let RewardEntity = class RewardEntity {
};
exports.RewardEntity = RewardEntity;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], RewardEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], RewardEntity.prototype, "title", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        nullable: true
    }),
    tslib_1.__metadata("design:type", Date)
], RewardEntity.prototype, "startDate", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        nullable: true
    }),
    tslib_1.__metadata("design:type", Date)
], RewardEntity.prototype, "endDate", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('enum', {
        enum: reward_app_type_1.RewardAppType
    }),
    tslib_1.__metadata("design:type", String)
], RewardEntity.prototype, "appType", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('enum', {
        enum: reward_beneficiary_1.RewardBeneficiary
    }),
    tslib_1.__metadata("design:type", String)
], RewardEntity.prototype, "beneficiary", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('enum', {
        enum: reward_event_1.RewardEvent
    }),
    tslib_1.__metadata("design:type", String)
], RewardEntity.prototype, "event", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('float', {
        default: '0.00',
        precision: 10,
        scale: 2
    }),
    tslib_1.__metadata("design:type", Number)
], RewardEntity.prototype, "creditGift", void 0);
tslib_1.__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], RewardEntity.prototype, "deletedAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('int', { nullable: true }),
    tslib_1.__metadata("design:type", Number)
], RewardEntity.prototype, "tripFeePercentGift", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('char', { length: 3, nullable: true }),
    tslib_1.__metadata("design:type", String)
], RewardEntity.prototype, "creditCurrency", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('int', { nullable: true }),
    tslib_1.__metadata("design:type", Number)
], RewardEntity.prototype, "conditionTripCountsLessThan", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('simple-array', { nullable: true }),
    tslib_1.__metadata("design:type", Array)
], RewardEntity.prototype, "conditionUserNumberFirstDigits", void 0);
exports.RewardEntity = RewardEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)('reward')
], RewardEntity);


/***/ }),
/* 291 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RewardAppType = void 0;
const graphql_1 = __webpack_require__(6);
var RewardAppType;
(function (RewardAppType) {
    RewardAppType["Driver"] = "Driver";
    RewardAppType["Rider"] = "Rider";
})(RewardAppType || (exports.RewardAppType = RewardAppType = {}));
(0, graphql_1.registerEnumType)(RewardAppType, { name: 'RewardAppType' });


/***/ }),
/* 292 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RewardBeneficiary = void 0;
const graphql_1 = __webpack_require__(6);
var RewardBeneficiary;
(function (RewardBeneficiary) {
    RewardBeneficiary["Self"] = "Self";
    RewardBeneficiary["Referrer"] = "Referrer";
})(RewardBeneficiary || (exports.RewardBeneficiary = RewardBeneficiary = {}));
(0, graphql_1.registerEnumType)(RewardBeneficiary, { name: 'RewardBeneficiary' });


/***/ }),
/* 293 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RewardEvent = void 0;
const graphql_1 = __webpack_require__(6);
var RewardEvent;
(function (RewardEvent) {
    RewardEvent["Register"] = "Register";
    RewardEvent["ServiceCompleted"] = "ServiceCompleted";
})(RewardEvent || (exports.RewardEvent = RewardEvent = {}));
(0, graphql_1.registerEnumType)(RewardEvent, { name: 'RewardEvent' });


/***/ }),
/* 294 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RewardDTO = void 0;
const tslib_1 = __webpack_require__(1);
const eager_import_0 = __webpack_require__(291);
const eager_import_1 = __webpack_require__(292);
const eager_import_2 = __webpack_require__(293);
const nestjs_query_graphql_1 = __webpack_require__(103);
const graphql_1 = __webpack_require__(6);
let RewardDTO = class RewardDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, title: { type: () => String }, startDate: { nullable: true, type: () => Date }, endDate: { nullable: true, type: () => Date }, appType: { type: () => (__webpack_require__(291).RewardAppType) }, beneficiary: { type: () => (__webpack_require__(292).RewardBeneficiary) }, event: { type: () => (__webpack_require__(293).RewardEvent) }, creditGift: { type: () => Number }, tripFeePercentGift: { nullable: true, type: () => Number }, creditCurrency: { nullable: true, type: () => String }, conditionTripCountsLessThan: { nullable: true, type: () => Number }, conditionUserNumberFirstDigits: { nullable: true, type: () => [String] } };
    }
};
exports.RewardDTO = RewardDTO;
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.IDField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], RewardDTO.prototype, "id", void 0);
exports.RewardDTO = RewardDTO = tslib_1.__decorate([
    (0, graphql_1.ObjectType)('Reward')
], RewardDTO);


/***/ }),
/* 295 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PayoutModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const nestjs_query_graphql_1 = __webpack_require__(103);
const nestjs_query_typeorm_1 = __webpack_require__(111);
const payout_method_dto_1 = __webpack_require__(188);
const payout_method_entity_1 = __webpack_require__(48);
const create_payout_method_input_1 = __webpack_require__(296);
const jwt_auth_guard_1 = __webpack_require__(115);
const payout_account_dto_1 = __webpack_require__(187);
const payout_account_entity_1 = __webpack_require__(47);
const payout_session_dto_1 = __webpack_require__(297);
const payout_session_entity_1 = __webpack_require__(50);
const payout_service_1 = __webpack_require__(298);
const payout_resolver_1 = __webpack_require__(299);
const typeorm_1 = __webpack_require__(7);
const region_entity_1 = __webpack_require__(57);
const driver_wallet_entity_1 = __webpack_require__(94);
const driver_transaction_entity_1 = __webpack_require__(14);
const operator_module_1 = __webpack_require__(213);
let PayoutModule = class PayoutModule {
};
exports.PayoutModule = PayoutModule;
exports.PayoutModule = PayoutModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            operator_module_1.OperatorModule,
            typeorm_1.TypeOrmModule.forFeature([
                region_entity_1.RegionEntity,
                payout_session_entity_1.PayoutSessionEntity,
                driver_wallet_entity_1.DriverWalletEntity,
                driver_transaction_entity_1.DriverTransactionEntity,
            ]),
            nestjs_query_graphql_1.NestjsQueryGraphQLModule.forFeature({
                imports: [
                    nestjs_query_typeorm_1.NestjsQueryTypeOrmModule.forFeature([
                        payout_method_entity_1.PayoutMethodEntity,
                        payout_session_entity_1.PayoutSessionEntity,
                        payout_account_entity_1.PayoutAccountEntity,
                    ]),
                ],
                resolvers: [
                    {
                        DTOClass: payout_method_dto_1.PayoutMethodDTO,
                        EntityClass: payout_method_entity_1.PayoutMethodEntity,
                        CreateDTOClass: create_payout_method_input_1.CreatePayoutMethodInput,
                        UpdateDTOClass: create_payout_method_input_1.CreatePayoutMethodInput,
                        guards: [jwt_auth_guard_1.JwtAuthGuard],
                        create: { many: { disabled: true } },
                        update: { many: { disabled: true } },
                        delete: { many: { disabled: true } },
                        enableTotalCount: true,
                        pagingStrategy: nestjs_query_graphql_1.PagingStrategies.NONE,
                    },
                    {
                        DTOClass: payout_account_dto_1.PayoutAccountDTO,
                        EntityClass: payout_account_entity_1.PayoutAccountEntity,
                        read: { many: { disabled: true } },
                        create: { disabled: true },
                        update: { disabled: true },
                        delete: { disabled: true },
                        guards: [jwt_auth_guard_1.JwtAuthGuard],
                    },
                    {
                        DTOClass: payout_session_dto_1.PayoutSessionDTO,
                        EntityClass: payout_session_entity_1.PayoutSessionEntity,
                        create: { disabled: true },
                        update: { disabled: true },
                        delete: { disabled: true },
                        guards: [jwt_auth_guard_1.JwtAuthGuard],
                        pagingStrategy: nestjs_query_graphql_1.PagingStrategies.OFFSET,
                        enableTotalCount: true,
                    },
                ],
            }),
        ],
        providers: [payout_service_1.PayoutService, payout_resolver_1.PayoutResolver],
    })
], PayoutModule);


/***/ }),
/* 296 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreatePayoutMethodInput = void 0;
const tslib_1 = __webpack_require__(1);
const eager_import_0 = __webpack_require__(49);
const graphql_1 = __webpack_require__(6);
let CreatePayoutMethodInput = class CreatePayoutMethodInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { enabled: { nullable: true, type: () => Boolean }, name: { type: () => String }, description: { type: () => String }, currency: { type: () => String }, type: { type: () => (__webpack_require__(49).PayoutMethodType) }, publicKey: { nullable: true, type: () => String }, privateKey: { nullable: true, type: () => String }, saltKey: { nullable: true, type: () => String }, merchantId: { nullable: true, type: () => String }, mediaId: { nullable: true, type: () => Number }, deletedAt: { nullable: true, type: () => Date } };
    }
};
exports.CreatePayoutMethodInput = CreatePayoutMethodInput;
exports.CreatePayoutMethodInput = CreatePayoutMethodInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], CreatePayoutMethodInput);


/***/ }),
/* 297 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PayoutSessionDTO = void 0;
const tslib_1 = __webpack_require__(1);
const eager_import_0 = __webpack_require__(51);
const graphql_1 = __webpack_require__(6);
const nestjs_query_graphql_1 = __webpack_require__(103);
const driver_transaction_dto_1 = __webpack_require__(186);
const payout_method_dto_1 = __webpack_require__(188);
const payout_authorizer_1 = __webpack_require__(190);
let PayoutSessionDTO = class PayoutSessionDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, createdAt: { type: () => Date }, processedAt: { nullable: true, type: () => Date }, description: { nullable: true, type: () => String }, status: { type: () => (__webpack_require__(51).PayoutSessionStatus) }, totalAmount: { type: () => Number }, currency: { type: () => String } };
    }
};
exports.PayoutSessionDTO = PayoutSessionDTO;
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.IDField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], PayoutSessionDTO.prototype, "id", void 0);
exports.PayoutSessionDTO = PayoutSessionDTO = tslib_1.__decorate([
    (0, graphql_1.ObjectType)('PayoutSession'),
    (0, nestjs_query_graphql_1.OffsetConnection)('driverTransactions', () => driver_transaction_dto_1.DriverTransactionDTO, {
        enableAggregate: true,
    }),
    (0, nestjs_query_graphql_1.UnPagedRelation)('payoutMethods', () => payout_method_dto_1.PayoutMethodDTO),
    (0, nestjs_query_graphql_1.Authorize)(payout_authorizer_1.PayoutAuthorizer)
], PayoutSessionDTO);


/***/ }),
/* 298 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PayoutService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(7);
const region_entity_1 = __webpack_require__(57);
const typeorm_2 = __webpack_require__(10);
const driver_transaction_entity_1 = __webpack_require__(14);
const driver_wallet_entity_1 = __webpack_require__(94);
const payout_session_status_enum_1 = __webpack_require__(51);
const payout_session_entity_1 = __webpack_require__(50);
const transaction_action_enum_1 = __webpack_require__(17);
const driver_deduct_transaction_type_enum_1 = __webpack_require__(15);
const apollo_1 = __webpack_require__(116);
const json_2_csv_1 = __webpack_require__(114);
const promises_1 = __webpack_require__(113);
const path_1 = __webpack_require__(108);
const transaction_status_enum_1 = __webpack_require__(18);
const payout_method_type_enum_1 = __webpack_require__(49);
const stripe_1 = __webpack_require__(189);
const payout_method_entity_1 = __webpack_require__(48);
let PayoutService = class PayoutService {
    constructor(regionRepository, payoutSessionRepository, payoutMethodRepository, driverWalletRepository, driverTransactionRepository) {
        this.regionRepository = regionRepository;
        this.payoutSessionRepository = payoutSessionRepository;
        this.payoutMethodRepository = payoutMethodRepository;
        this.driverWalletRepository = driverWalletRepository;
        this.driverTransactionRepository = driverTransactionRepository;
    }
    async getSupportedCurrencies() {
        const regions = await this.regionRepository.find();
        const currencies = regions.map((region) => region.currency);
        const distinctCurrencies = [...new Set(currencies)];
        return distinctCurrencies;
    }
    async getPayoutStatistics(input) {
        let { currency } = input;
        if (!currency) {
            const currentCurrencies = await this.getSupportedCurrencies();
            currency = currentCurrencies.length > 0 ? currentCurrencies[0] : 'USD';
        }
        const pendingAmount = await this.getPendingAmount(currency);
        const lastPayoutAmount = await this.getLastPayoutAmount(currency);
        const payoutMethodStats = await this.getDriversDefaultPayoutMethodStats(currency);
        return {
            pendingAmount,
            lastPayoutAmount,
            currency,
            usersDefaultPayoutMethodStats: payoutMethodStats,
        };
    }
    async getPendingAmount(currency) {
        const pendingAmount = await this.driverWalletRepository.find({
            where: { currency, balance: (0, typeorm_2.MoreThan)(0) },
        });
        const sum = pendingAmount.reduce((a, b) => a + (b.balance || 0), 0);
        return sum || 0;
    }
    async getDriversDefaultPayoutMethodStats(currency) {
        const driverWallets = await this.driverWalletRepository.find({
            where: { currency, balance: (0, typeorm_2.MoreThan)(0) },
            relations: ['driver', 'driver.payoutAccounts'],
        });
        const payoutMethods = await this.payoutMethodRepository.find({
            where: { currency },
        });
        const result = [];
        payoutMethods.forEach((payoutMethod) => {
            const driverWalletsWithPayoutMethod = driverWallets.filter((driverWallet) => {
                if (driverWallet.driver == null) {
                    // This drivers have deleted their account
                    return false;
                }
                return driverWallet.driver.payoutAccounts.find((account) => account.payoutMethodId === payoutMethod.id && account.isDefault);
            });
            if (driverWalletsWithPayoutMethod.length > 0) {
                result.push({
                    payoutMethod,
                    totalCount: driverWalletsWithPayoutMethod.length,
                });
            }
        });
        const driversWithoutDefaultPayoutMethod = driverWallets.filter((driverWallet) => {
            if (driverWallet.driver == null) {
                // This drivers have deleted their account
                return false;
            }
            return (driverWallet.driver.payoutAccounts.filter((account) => account.isDefault).length === 0);
        });
        if (driversWithoutDefaultPayoutMethod.length > 0) {
            result.push({
                payoutMethod: null,
                totalCount: driversWithoutDefaultPayoutMethod.length,
            });
        }
        return result;
    }
    async getLastPayoutAmount(currency) {
        const lastPayout = await this.payoutSessionRepository.findOne({
            where: {
                currency,
                status: payout_session_status_enum_1.PayoutSessionStatus.PAID,
            },
            order: {
                createdAt: 'DESC',
            },
        });
        if (!lastPayout) {
            return 0;
        }
        return lastPayout.totalAmount;
    }
    async createPayoutSession(operatorId, input) {
        const driverWallets = await this.driverWalletRepository.find({
            where: {
                currency: input.currency,
                balance: (0, typeorm_2.MoreThan)(input.minimumAmount),
            },
            relations: ['driver', 'driver.payoutAccounts'],
        });
        if (driverWallets.length === 0) {
            throw new apollo_1.ForbiddenError('No drivers to payout with these filters');
        }
        const session = this.payoutSessionRepository.create({
            createdByOperatorId: operatorId,
            currency: input.currency,
            description: input.description,
            totalAmount: 0,
            payoutMethods: input.payoutMethodIds.map((id) => ({ id })),
        });
        let result = await this.payoutSessionRepository.save(session);
        let totalAmount = 0;
        driverWallets.forEach(async (driverWallet) => {
            const defaultPayoutAccount = driverWallet.driver.payoutAccounts.find((account) => account.isDefault);
            if (defaultPayoutAccount) {
                totalAmount += driverWallet.balance;
                const transaction = this.driverTransactionRepository.create({
                    driverId: driverWallet.driver.id,
                    amount: driverWallet.balance,
                    currency: driverWallet.currency,
                    action: transaction_action_enum_1.TransactionAction.Deduct,
                    deductType: driver_deduct_transaction_type_enum_1.DriverDeductTransactionType.Withdraw,
                    payoutSessionId: result.id,
                    payoutAccountId: defaultPayoutAccount.id,
                    payoutMethodId: defaultPayoutAccount.payoutMethodId,
                });
                await this.driverTransactionRepository.save(transaction);
            }
        });
        await this.payoutSessionRepository.update(result.id, { totalAmount });
        return result;
    }
    async exportToCsv(input) {
        const driverTransactions = await this.driverTransactionRepository.find({
            where: {
                payoutSessionId: input.payoutSessionId,
                payoutMethodId: input.payoutMethodId,
                status: transaction_status_enum_1.TransactionStatus.Processing,
            },
            relations: ['driver', 'payoutAccount', 'payoutMethod'],
        });
        const result = driverTransactions.map((transaction) => {
            return {
                transactionId: transaction.id,
                driverFirstName: transaction.driver.firstName,
                driverLastName: transaction.driver.lastName,
                amount: transaction.amount,
                currency: transaction.currency,
                accountNumber: transaction.payoutAccount.accountNumber,
                routingNumber: transaction.payoutAccount.routingNumber,
                bankName: transaction.payoutAccount.bankName,
                branchName: transaction.payoutAccount.branchName,
                accountHolderName: transaction.payoutAccount.accountHolderName,
                accountHolderCountry: transaction.payoutAccount.accountHolderCountry,
                accountHolderState: transaction.payoutAccount.accountHolderState,
                accountHolderCity: transaction.payoutAccount.accountHolderCity,
                accountHolderAddress: transaction.payoutAccount.accountHolderAddress,
                accountHolderZip: transaction.payoutAccount.accountHolderZip,
            };
        });
        const str = await (0, json_2_csv_1.json2csv)(result);
        const fileName = `${new Date().getTime().toString()}.csv`;
        await (0, promises_1.writeFile)((0, path_1.join)(process.cwd(), 'uploads', `${new Date().getTime().toString()}.csv`), str);
        return {
            url: `uploads/${fileName}`,
        };
    }
    async runAutoPayout(input) {
        const driverTransactions = await this.driverTransactionRepository.find({
            where: {
                payoutSessionId: input.payoutSessionId,
                payoutMethodId: input.payoutMethodId,
                status: transaction_status_enum_1.TransactionStatus.Processing,
            },
            relations: ['driver', 'payoutAccount', 'payoutMethod'],
        });
        for (const transaction of driverTransactions) {
            if (transaction.payoutMethod.type == payout_method_type_enum_1.PayoutMethodType.Stripe) {
                const instance = new stripe_1.Stripe(transaction.payoutMethod.privateKey, {
                    apiVersion: '2022-11-15',
                });
                await instance.transfers.create({
                    amount: Math.floor(transaction.amount * 100),
                    currency: transaction.currency,
                    destination: transaction.payoutAccount.token,
                    description: 'Payout',
                });
                this.driverWalletRepository.decrement({
                    driverId: transaction.driverId,
                    currency: transaction.currency,
                }, 'balance', transaction.amount);
                await this.driverTransactionRepository.update(transaction.id, {
                    status: transaction_status_enum_1.TransactionStatus.Done,
                });
            }
        }
    }
    async manualPayout(input) {
        let driverTransaction = await this.driverTransactionRepository.findOneBy({
            id: input.driverTransactionId,
        });
        this.driverTransactionRepository.update(input.driverTransactionId, {
            refrenceNumber: input.transactionNumber,
            description: input.description,
            status: transaction_status_enum_1.TransactionStatus.Done,
        });
        this.driverWalletRepository.decrement({
            driverId: driverTransaction.driverId,
            currency: driverTransaction.currency,
        }, 'balance', driverTransaction.amount);
        return this.driverTransactionRepository.findOneBy({
            id: input.driverTransactionId,
        });
    }
    async updatePayoutSession(id, update) {
        await this.payoutSessionRepository.update(id, update);
        return this.payoutSessionRepository.findOneBy({ id });
    }
};
exports.PayoutService = PayoutService;
exports.PayoutService = PayoutService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(region_entity_1.RegionEntity)),
    tslib_1.__param(1, (0, typeorm_1.InjectRepository)(payout_session_entity_1.PayoutSessionEntity)),
    tslib_1.__param(2, (0, typeorm_1.InjectRepository)(payout_method_entity_1.PayoutMethodEntity)),
    tslib_1.__param(3, (0, typeorm_1.InjectRepository)(driver_wallet_entity_1.DriverWalletEntity)),
    tslib_1.__param(4, (0, typeorm_1.InjectRepository)(driver_transaction_entity_1.DriverTransactionEntity)),
    tslib_1.__metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], PayoutService);
class ExportCSV {
}


/***/ }),
/* 299 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PayoutResolver = void 0;
const tslib_1 = __webpack_require__(1);
const graphql_1 = __webpack_require__(6);
const payout_service_1 = __webpack_require__(298);
const payout_statistics_dto_1 = __webpack_require__(300);
const payout_session_dto_1 = __webpack_require__(297);
const create_payout_session_input_1 = __webpack_require__(301);
const common_1 = __webpack_require__(2);
const jwt_auth_guard_1 = __webpack_require__(115);
const export_session_to_csv_input_1 = __webpack_require__(302);
const run_auto_payout_input_1 = __webpack_require__(303);
const driver_transaction_dto_1 = __webpack_require__(186);
const manual_payout_input_1 = __webpack_require__(304);
const operator_service_1 = __webpack_require__(215);
const operator_permission_enum_1 = __webpack_require__(93);
const apollo_1 = __webpack_require__(116);
const update_payout_session_input_1 = __webpack_require__(305);
let PayoutResolver = class PayoutResolver {
    constructor(payoutService, operatorService, context) {
        this.payoutService = payoutService;
        this.operatorService = operatorService;
        this.context = context;
    }
    async supportedCurrencies() {
        return this.payoutService.getSupportedCurrencies();
    }
    async payoutStatistics(currency) {
        return this.payoutService.getPayoutStatistics({ currency });
    }
    async createPayoutSession(input) {
        const hasPermission = await this.operatorService.hasPermissionBoolean(this.context.req.user.id, operator_permission_enum_1.OperatorPermission.Payouts_Edit);
        if (!hasPermission) {
            throw new apollo_1.ForbiddenError('You do not have permission to perform this action');
        }
        return this.payoutService.createPayoutSession(this.context.req.user.id, input);
    }
    async exportSessionToCsv(input) {
        const hasPermission = await this.operatorService.hasPermissionBoolean(this.context.req.user.id, operator_permission_enum_1.OperatorPermission.Payouts_Edit);
        if (!hasPermission) {
            throw new apollo_1.ForbiddenError('You do not have permission to perform this action');
        }
        const csv = await this.payoutService.exportToCsv(input);
        return csv.url;
    }
    async runAutoPayout(input) {
        const hasPermission = await this.operatorService.hasPermissionBoolean(this.context.req.user.id, operator_permission_enum_1.OperatorPermission.Payouts_Edit);
        if (!hasPermission) {
            throw new apollo_1.ForbiddenError('You do not have permission to perform this action');
        }
        await this.payoutService.runAutoPayout(input);
        return true;
    }
    async manualPayout(input) {
        const hasPermission = await this.operatorService.hasPermissionBoolean(this.context.req.user.id, operator_permission_enum_1.OperatorPermission.Payouts_Edit);
        if (!hasPermission) {
            throw new apollo_1.ForbiddenError('You do not have permission to perform this action');
        }
        return this.payoutService.manualPayout(input);
    }
    async updatePayoutSession(id, input) {
        const hasPermission = await this.operatorService.hasPermissionBoolean(this.context.req.user.id, operator_permission_enum_1.OperatorPermission.Payouts_Edit);
        if (!hasPermission) {
            throw new apollo_1.ForbiddenError('You do not have permission to perform this action');
        }
        return this.payoutService.updatePayoutSession(id, input);
    }
};
exports.PayoutResolver = PayoutResolver;
tslib_1.__decorate([
    (0, graphql_1.Query)(() => [String]),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], PayoutResolver.prototype, "supportedCurrencies", null);
tslib_1.__decorate([
    (0, graphql_1.Query)(() => payout_statistics_dto_1.PayoutStatisticsDTO),
    tslib_1.__param(0, (0, graphql_1.Args)('currency', { type: () => String, nullable: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], PayoutResolver.prototype, "payoutStatistics", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => payout_session_dto_1.PayoutSessionDTO),
    tslib_1.__param(0, (0, graphql_1.Args)('input', { type: () => create_payout_session_input_1.CreatePayoutSessionInput })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [create_payout_session_input_1.CreatePayoutSessionInput]),
    tslib_1.__metadata("design:returntype", Promise)
], PayoutResolver.prototype, "createPayoutSession", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => String),
    tslib_1.__param(0, (0, graphql_1.Args)('input', { type: () => export_session_to_csv_input_1.ExportSessionToCsvInput })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [export_session_to_csv_input_1.ExportSessionToCsvInput]),
    tslib_1.__metadata("design:returntype", Promise)
], PayoutResolver.prototype, "exportSessionToCsv", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    tslib_1.__param(0, (0, graphql_1.Args)('input', { type: () => run_auto_payout_input_1.RunAutoPayoutInput })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [run_auto_payout_input_1.RunAutoPayoutInput]),
    tslib_1.__metadata("design:returntype", Promise)
], PayoutResolver.prototype, "runAutoPayout", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => driver_transaction_dto_1.DriverTransactionDTO),
    tslib_1.__param(0, (0, graphql_1.Args)('input', { type: () => manual_payout_input_1.ManualPayoutInput })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [manual_payout_input_1.ManualPayoutInput]),
    tslib_1.__metadata("design:returntype", Promise)
], PayoutResolver.prototype, "manualPayout", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => payout_session_dto_1.PayoutSessionDTO),
    tslib_1.__param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    tslib_1.__param(1, (0, graphql_1.Args)('input', { type: () => update_payout_session_input_1.UpdatePayoutSessionInput })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, update_payout_session_input_1.UpdatePayoutSessionInput]),
    tslib_1.__metadata("design:returntype", Promise)
], PayoutResolver.prototype, "updatePayoutSession", null);
exports.PayoutResolver = PayoutResolver = tslib_1.__decorate([
    (0, graphql_1.Resolver)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    tslib_1.__param(2, (0, common_1.Inject)(graphql_1.CONTEXT)),
    tslib_1.__metadata("design:paramtypes", [payout_service_1.PayoutService,
        operator_service_1.OperatorService, Object])
], PayoutResolver);


/***/ }),
/* 300 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PayoutMethodStatsDTO = exports.PayoutStatisticsDTO = void 0;
const tslib_1 = __webpack_require__(1);
const eager_import_0 = __webpack_require__(300);
const eager_import_1 = __webpack_require__(188);
const graphql_1 = __webpack_require__(6);
let PayoutStatisticsDTO = class PayoutStatisticsDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { pendingAmount: { type: () => Number }, lastPayoutAmount: { type: () => Number }, usersDefaultPayoutMethodStats: { type: () => [(__webpack_require__(300).PayoutMethodStatsDTO)] }, currency: { type: () => String } };
    }
};
exports.PayoutStatisticsDTO = PayoutStatisticsDTO;
exports.PayoutStatisticsDTO = PayoutStatisticsDTO = tslib_1.__decorate([
    (0, graphql_1.ObjectType)('PayoutStatistics')
], PayoutStatisticsDTO);
let PayoutMethodStatsDTO = class PayoutMethodStatsDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { payoutMethod: { nullable: true, type: () => (__webpack_require__(188).PayoutMethodDTO) }, totalCount: { type: () => Number } };
    }
};
exports.PayoutMethodStatsDTO = PayoutMethodStatsDTO;
exports.PayoutMethodStatsDTO = PayoutMethodStatsDTO = tslib_1.__decorate([
    (0, graphql_1.ObjectType)('PayoutMethodStats')
], PayoutMethodStatsDTO);


/***/ }),
/* 301 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreatePayoutSessionInput = void 0;
const tslib_1 = __webpack_require__(1);
const graphql_1 = __webpack_require__(6);
let CreatePayoutSessionInput = class CreatePayoutSessionInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { minimumAmount: { type: () => Number }, currency: { type: () => String }, description: { nullable: true, type: () => String } };
    }
};
exports.CreatePayoutSessionInput = CreatePayoutSessionInput;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => [graphql_1.ID], {}),
    tslib_1.__metadata("design:type", Array)
], CreatePayoutSessionInput.prototype, "payoutMethodIds", void 0);
exports.CreatePayoutSessionInput = CreatePayoutSessionInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], CreatePayoutSessionInput);


/***/ }),
/* 302 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExportSessionToCsvInput = void 0;
const tslib_1 = __webpack_require__(1);
const graphql_1 = __webpack_require__(6);
let ExportSessionToCsvInput = class ExportSessionToCsvInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return {};
    }
};
exports.ExportSessionToCsvInput = ExportSessionToCsvInput;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {}),
    tslib_1.__metadata("design:type", Number)
], ExportSessionToCsvInput.prototype, "payoutSessionId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, { nullable: true }),
    tslib_1.__metadata("design:type", Number)
], ExportSessionToCsvInput.prototype, "payoutMethodId", void 0);
exports.ExportSessionToCsvInput = ExportSessionToCsvInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], ExportSessionToCsvInput);


/***/ }),
/* 303 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RunAutoPayoutInput = void 0;
const tslib_1 = __webpack_require__(1);
const graphql_1 = __webpack_require__(6);
let RunAutoPayoutInput = class RunAutoPayoutInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return {};
    }
};
exports.RunAutoPayoutInput = RunAutoPayoutInput;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {}),
    tslib_1.__metadata("design:type", Number)
], RunAutoPayoutInput.prototype, "payoutSessionId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {}),
    tslib_1.__metadata("design:type", Number)
], RunAutoPayoutInput.prototype, "payoutMethodId", void 0);
exports.RunAutoPayoutInput = RunAutoPayoutInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], RunAutoPayoutInput);


/***/ }),
/* 304 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ManualPayoutInput = void 0;
const tslib_1 = __webpack_require__(1);
const graphql_1 = __webpack_require__(6);
let ManualPayoutInput = class ManualPayoutInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { transactionNumber: { type: () => String }, description: { nullable: true, type: () => String } };
    }
};
exports.ManualPayoutInput = ManualPayoutInput;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {}),
    tslib_1.__metadata("design:type", Number)
], ManualPayoutInput.prototype, "driverTransactionId", void 0);
exports.ManualPayoutInput = ManualPayoutInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], ManualPayoutInput);


/***/ }),
/* 305 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdatePayoutSessionInput = void 0;
const tslib_1 = __webpack_require__(1);
const graphql_1 = __webpack_require__(6);
const payout_session_status_enum_1 = __webpack_require__(51);
let UpdatePayoutSessionInput = class UpdatePayoutSessionInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return {};
    }
};
exports.UpdatePayoutSessionInput = UpdatePayoutSessionInput;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => payout_session_status_enum_1.PayoutSessionStatus, {}),
    tslib_1.__metadata("design:type", String)
], UpdatePayoutSessionInput.prototype, "status", void 0);
exports.UpdatePayoutSessionInput = UpdatePayoutSessionInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], UpdatePayoutSessionInput);


/***/ }),
/* 306 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GiftCardModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const nestjs_query_graphql_1 = __webpack_require__(103);
const nestjs_query_typeorm_1 = __webpack_require__(111);
const gift_batch_dto_1 = __webpack_require__(307);
const gift_code_dto_1 = __webpack_require__(308);
const gift_batch_entity_1 = __webpack_require__(38);
const gift_code_entity_1 = __webpack_require__(37);
const jwt_auth_guard_1 = __webpack_require__(115);
const gift_card_service_1 = __webpack_require__(311);
const gift_card_resolver_1 = __webpack_require__(312);
const typeorm_1 = __webpack_require__(7);
const operator_module_1 = __webpack_require__(213);
let GiftCardModule = class GiftCardModule {
};
exports.GiftCardModule = GiftCardModule;
exports.GiftCardModule = GiftCardModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            operator_module_1.OperatorModule,
            typeorm_1.TypeOrmModule.forFeature([gift_batch_entity_1.GiftBatchEntity, gift_code_entity_1.GiftCodeEntity]),
            nestjs_query_graphql_1.NestjsQueryGraphQLModule.forFeature({
                imports: [
                    nestjs_query_typeorm_1.NestjsQueryTypeOrmModule.forFeature([gift_batch_entity_1.GiftBatchEntity, gift_code_entity_1.GiftCodeEntity]),
                ],
                resolvers: [
                    {
                        EntityClass: gift_batch_entity_1.GiftBatchEntity,
                        DTOClass: gift_batch_dto_1.GiftBatchDTO,
                        update: { disabled: true },
                        delete: { disabled: true },
                        create: { disabled: true },
                        guards: [jwt_auth_guard_1.JwtAuthGuard],
                        pagingStrategy: nestjs_query_graphql_1.PagingStrategies.OFFSET,
                        enableTotalCount: true,
                    },
                    {
                        EntityClass: gift_code_entity_1.GiftCodeEntity,
                        DTOClass: gift_code_dto_1.GiftCodeDTO,
                        update: { disabled: true },
                        delete: { disabled: true },
                        create: { disabled: true },
                        guards: [jwt_auth_guard_1.JwtAuthGuard],
                        read: { disabled: true },
                    },
                ],
            }),
        ],
        providers: [gift_card_service_1.GiftCardService, gift_card_resolver_1.GiftCardResolver],
    })
], GiftCardModule);


/***/ }),
/* 307 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GiftBatchDTO = void 0;
const tslib_1 = __webpack_require__(1);
const graphql_1 = __webpack_require__(6);
const nestjs_query_graphql_1 = __webpack_require__(103);
const gift_code_dto_1 = __webpack_require__(308);
const gift_batch_authorizer_1 = __webpack_require__(310);
let GiftBatchDTO = class GiftBatchDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, name: { type: () => String }, currency: { type: () => String }, amount: { type: () => Number }, availableFrom: { nullable: true, type: () => Date }, expireAt: { nullable: true, type: () => Date } };
    }
};
exports.GiftBatchDTO = GiftBatchDTO;
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.IDField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], GiftBatchDTO.prototype, "id", void 0);
exports.GiftBatchDTO = GiftBatchDTO = tslib_1.__decorate([
    (0, graphql_1.ObjectType)('GiftBatch'),
    (0, nestjs_query_graphql_1.OffsetConnection)('giftCodes', () => gift_code_dto_1.GiftCodeDTO, {
        enableTotalCount: true,
        enableAggregate: true,
    }),
    (0, nestjs_query_graphql_1.Authorize)(gift_batch_authorizer_1.GiftBatchAuthorizer)
], GiftBatchDTO);


/***/ }),
/* 308 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GiftCodeDTO = void 0;
const tslib_1 = __webpack_require__(1);
const graphql_1 = __webpack_require__(6);
const nestjs_query_graphql_1 = __webpack_require__(103);
const rider_transaction_dto_1 = __webpack_require__(194);
const driver_transaction_dto_1 = __webpack_require__(186);
const gift_code_authorizer_1 = __webpack_require__(309);
let GiftCodeDTO = class GiftCodeDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, code: { type: () => String }, usedAt: { nullable: true, type: () => Date }, giftId: { type: () => Number } };
    }
};
exports.GiftCodeDTO = GiftCodeDTO;
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.IDField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], GiftCodeDTO.prototype, "id", void 0);
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.FilterableField)({ nullable: true }),
    tslib_1.__metadata("design:type", Date)
], GiftCodeDTO.prototype, "usedAt", void 0);
exports.GiftCodeDTO = GiftCodeDTO = tslib_1.__decorate([
    (0, graphql_1.ObjectType)('GiftCode'),
    (0, nestjs_query_graphql_1.Relation)('riderTransaction', () => rider_transaction_dto_1.RiderTransactionDTO, { nullable: true }),
    (0, nestjs_query_graphql_1.Relation)('driverTransaction', () => driver_transaction_dto_1.DriverTransactionDTO, { nullable: true }),
    (0, nestjs_query_graphql_1.Authorize)(gift_code_authorizer_1.GiftCodeAuthorizer)
], GiftCodeDTO);


/***/ }),
/* 309 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GiftCodeAuthorizer = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const operator_permission_enum_1 = __webpack_require__(93);
const operator_entity_1 = __webpack_require__(19);
const typeorm_1 = __webpack_require__(10);
let GiftCodeAuthorizer = class GiftCodeAuthorizer {
    constructor(datasource) {
        this.datasource = datasource;
    }
    async authorize(context, authorizerContext) {
        const operator = await this.datasource
            .getRepository(operator_entity_1.OperatorEntity)
            .findOne({
            where: { id: context.req.user.id },
            relations: {
                role: true,
            },
        });
        if (authorizerContext.readonly &&
            !operator.role.permissions.includes(operator_permission_enum_1.OperatorPermission.GiftBatch_ViewCodes)) {
            throw new common_1.UnauthorizedException();
        }
        return undefined;
    }
};
exports.GiftCodeAuthorizer = GiftCodeAuthorizer;
exports.GiftCodeAuthorizer = GiftCodeAuthorizer = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeorm_1.DataSource])
], GiftCodeAuthorizer);


/***/ }),
/* 310 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GiftBatchAuthorizer = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const operator_permission_enum_1 = __webpack_require__(93);
const operator_entity_1 = __webpack_require__(19);
const typeorm_1 = __webpack_require__(10);
let GiftBatchAuthorizer = class GiftBatchAuthorizer {
    constructor(datasource) {
        this.datasource = datasource;
    }
    async authorize(context, authorizerContext) {
        const operator = await this.datasource
            .getRepository(operator_entity_1.OperatorEntity)
            .findOne({
            where: { id: context.req.user.id },
            relations: {
                role: true,
            },
        });
        if (authorizerContext.readonly &&
            !operator.role.permissions.includes(operator_permission_enum_1.OperatorPermission.GiftBatch_View)) {
            throw new common_1.UnauthorizedException();
        }
        return undefined;
    }
};
exports.GiftBatchAuthorizer = GiftBatchAuthorizer;
exports.GiftBatchAuthorizer = GiftBatchAuthorizer = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeorm_1.DataSource])
], GiftBatchAuthorizer);


/***/ }),
/* 311 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GiftCardService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(7);
const gift_code_entity_1 = __webpack_require__(37);
const gift_batch_entity_1 = __webpack_require__(38);
const typeorm_2 = __webpack_require__(10);
const json_2_csv_1 = __webpack_require__(114);
const promises_1 = __webpack_require__(113);
const path_1 = __webpack_require__(108);
const operator_service_1 = __webpack_require__(215);
const operator_permission_enum_1 = __webpack_require__(93);
let GiftCardService = class GiftCardService {
    constructor(giftRepository, giftCodeRepository, operatorService) {
        this.giftRepository = giftRepository;
        this.giftCodeRepository = giftCodeRepository;
        this.operatorService = operatorService;
    }
    async createGiftCardBatch(input) {
        let gift = this.giftRepository.create({
            name: input.name,
            currency: input.currency,
            amount: input.amount,
            availableFrom: input.availableFrom,
            expireAt: input.expireAt,
            createdByOperatorId: input.operatorId,
        });
        gift = await this.giftRepository.save(gift);
        const giftCodes = Array.from(Array(input.quantity)).map(() => {
            return this.giftCodeRepository.create({
                code: this.generateGiftCode(),
                gift,
            });
        });
        await this.giftCodeRepository.save(giftCodes);
        return gift;
    }
    generateGiftCode() {
        return Math.random().toString(36).substring(2, 10).toUpperCase();
    }
    async exportGiftCardBatch(input) {
        const { batchId, operatorId } = input;
        await this.operatorService.hasPermission(operatorId, operator_permission_enum_1.OperatorPermission.GiftBatch_ViewCodes);
        const result = await this.giftCodeRepository.find({
            where: {
                giftId: batchId,
            },
            select: {
                code: true,
                usedAt: true,
            },
        });
        const str = await (0, json_2_csv_1.json2csv)(result);
        const fileName = `${new Date().getTime().toString()}.csv`;
        await (0, promises_1.writeFile)((0, path_1.join)(process.cwd(), 'uploads', `${new Date().getTime().toString()}.csv`), str);
        return {
            url: `uploads/${fileName}`,
        };
    }
};
exports.GiftCardService = GiftCardService;
exports.GiftCardService = GiftCardService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(gift_batch_entity_1.GiftBatchEntity)),
    tslib_1.__param(1, (0, typeorm_1.InjectRepository)(gift_code_entity_1.GiftCodeEntity)),
    tslib_1.__metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        operator_service_1.OperatorService])
], GiftCardService);


/***/ }),
/* 312 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GiftCardResolver = void 0;
const tslib_1 = __webpack_require__(1);
const graphql_1 = __webpack_require__(6);
const gift_card_service_1 = __webpack_require__(311);
const gift_batch_dto_1 = __webpack_require__(307);
const create_gift_batch_input_1 = __webpack_require__(313);
const common_1 = __webpack_require__(2);
const jwt_auth_guard_1 = __webpack_require__(115);
let GiftCardResolver = class GiftCardResolver {
    constructor(giftCardService, context) {
        this.giftCardService = giftCardService;
        this.context = context;
    }
    async createGiftCardBatch(input) {
        return this.giftCardService.createGiftCardBatch({
            ...input,
            operatorId: this.context.req.user.id,
        });
    }
    async exportGiftCardBatch(batchId) {
        return (await this.giftCardService.exportGiftCardBatch({
            batchId,
            operatorId: this.context.req.user.id,
        })).url;
    }
};
exports.GiftCardResolver = GiftCardResolver;
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => gift_batch_dto_1.GiftBatchDTO),
    tslib_1.__param(0, (0, graphql_1.Args)('input', { type: () => create_gift_batch_input_1.CreateGiftBatchInput })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [create_gift_batch_input_1.CreateGiftBatchInput]),
    tslib_1.__metadata("design:returntype", Promise)
], GiftCardResolver.prototype, "createGiftCardBatch", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => String),
    tslib_1.__param(0, (0, graphql_1.Args)('batchId', { type: () => graphql_1.ID })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], GiftCardResolver.prototype, "exportGiftCardBatch", null);
exports.GiftCardResolver = GiftCardResolver = tslib_1.__decorate([
    (0, graphql_1.Resolver)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    tslib_1.__param(1, (0, common_1.Inject)(graphql_1.CONTEXT)),
    tslib_1.__metadata("design:paramtypes", [gift_card_service_1.GiftCardService, Object])
], GiftCardResolver);


/***/ }),
/* 313 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateGiftBatchInput = void 0;
const tslib_1 = __webpack_require__(1);
const graphql_1 = __webpack_require__(6);
let CreateGiftBatchInput = class CreateGiftBatchInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { name: { type: () => String }, currency: { type: () => String }, amount: { type: () => Number }, availableFrom: { nullable: true, type: () => Date }, expireAt: { nullable: true, type: () => Date }, quantity: { type: () => Number } };
    }
};
exports.CreateGiftBatchInput = CreateGiftBatchInput;
exports.CreateGiftBatchInput = CreateGiftBatchInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], CreateGiftBatchInput);


/***/ }),
/* 314 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SMSProviderModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const nestjs_query_graphql_1 = __webpack_require__(103);
const sms_provider_entity_1 = __webpack_require__(315);
const sms_provider_dto_1 = __webpack_require__(317);
const nestjs_query_typeorm_1 = __webpack_require__(111);
const typeorm_1 = __webpack_require__(7);
const jwt_auth_guard_1 = __webpack_require__(115);
const sms_provider_service_1 = __webpack_require__(319);
const sms_provider_resolver_1 = __webpack_require__(320);
const sms_provider_input_1 = __webpack_require__(321);
const sms_provider_query_service_1 = __webpack_require__(322);
let SMSProviderModule = class SMSProviderModule {
};
exports.SMSProviderModule = SMSProviderModule;
exports.SMSProviderModule = SMSProviderModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_query_graphql_1.NestjsQueryGraphQLModule.forFeature({
                imports: [nestjs_query_typeorm_1.NestjsQueryTypeOrmModule.forFeature([sms_provider_entity_1.SMSProviderEntity])],
                services: [sms_provider_query_service_1.SMSProviderQueryService],
                resolvers: [
                    {
                        DTOClass: sms_provider_dto_1.SMSProviderDTO,
                        CreateDTOClass: sms_provider_input_1.SMSProviderInput,
                        UpdateDTOClass: sms_provider_input_1.SMSProviderInput,
                        EntityClass: sms_provider_entity_1.SMSProviderEntity,
                        ServiceClass: sms_provider_query_service_1.SMSProviderQueryService,
                        guards: [jwt_auth_guard_1.JwtAuthGuard],
                        read: {
                            many: {
                                name: 'smsProviders',
                            },
                            one: {
                                name: 'smsProvider',
                            },
                        },
                        delete: {
                            many: { disabled: false },
                        },
                        update: {
                            many: { disabled: false },
                        },
                        pagingStrategy: nestjs_query_graphql_1.PagingStrategies.OFFSET,
                        enableTotalCount: true,
                    },
                ],
            }),
            typeorm_1.TypeOrmModule.forFeature([sms_provider_entity_1.SMSProviderEntity]),
        ],
        providers: [sms_provider_service_1.SMSProviderService, sms_provider_resolver_1.SMSProviderResolver],
    })
], SMSProviderModule);


/***/ }),
/* 315 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SMSProviderEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(10);
const sms_provider_type_enum_1 = __webpack_require__(316);
let SMSProviderEntity = class SMSProviderEntity {
};
exports.SMSProviderEntity = SMSProviderEntity;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], SMSProviderEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: sms_provider_type_enum_1.SMSProviderType,
    }),
    tslib_1.__metadata("design:type", String)
], SMSProviderEntity.prototype, "type", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        default: false,
    }),
    tslib_1.__metadata("design:type", Boolean)
], SMSProviderEntity.prototype, "isDefault", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], SMSProviderEntity.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    tslib_1.__metadata("design:type", String)
], SMSProviderEntity.prototype, "accountId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    tslib_1.__metadata("design:type", String)
], SMSProviderEntity.prototype, "authToken", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    tslib_1.__metadata("design:type", String)
], SMSProviderEntity.prototype, "fromNumber", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('text', {
        nullable: true,
    }),
    tslib_1.__metadata("design:type", String)
], SMSProviderEntity.prototype, "verificationTemplate", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    tslib_1.__metadata("design:type", String)
], SMSProviderEntity.prototype, "smsType", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], SMSProviderEntity.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], SMSProviderEntity.prototype, "deletedAt", void 0);
exports.SMSProviderEntity = SMSProviderEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)('sms_provider')
], SMSProviderEntity);


/***/ }),
/* 316 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SMSProviderType = void 0;
const graphql_1 = __webpack_require__(6);
var SMSProviderType;
(function (SMSProviderType) {
    SMSProviderType["Firebase"] = "Firebase";
    SMSProviderType["Twilio"] = "Twilio";
    SMSProviderType["Plivo"] = "Plivo";
    SMSProviderType["Pahappa"] = "Pahappa";
    SMSProviderType["BroadNet"] = "BroadNet";
    SMSProviderType["Vonage"] = "Vonage";
    SMSProviderType["ClickSend"] = "ClickSend";
    SMSProviderType["Infobip"] = "Infobip";
    SMSProviderType["MessageBird"] = "MessageBird";
})(SMSProviderType || (exports.SMSProviderType = SMSProviderType = {}));
(0, graphql_1.registerEnumType)(SMSProviderType, {
    name: 'SMSProviderType',
    description: 'The type of the SMS provider',
});


/***/ }),
/* 317 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SMSProviderDTO = void 0;
const tslib_1 = __webpack_require__(1);
const eager_import_0 = __webpack_require__(316);
const graphql_1 = __webpack_require__(6);
const nestjs_query_graphql_1 = __webpack_require__(103);
const sms_provider_authorizer_1 = __webpack_require__(318);
let SMSProviderDTO = class SMSProviderDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, name: { type: () => String }, type: { type: () => (__webpack_require__(316).SMSProviderType) }, isDefault: { type: () => Boolean }, accountId: { nullable: true, type: () => String }, authToken: { nullable: true, type: () => String }, fromNumber: { nullable: true, type: () => String }, verificationTemplate: { nullable: true, type: () => String }, smsType: { nullable: true, type: () => String } };
    }
};
exports.SMSProviderDTO = SMSProviderDTO;
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.IDField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], SMSProviderDTO.prototype, "id", void 0);
exports.SMSProviderDTO = SMSProviderDTO = tslib_1.__decorate([
    (0, graphql_1.ObjectType)('SMSProvider', {
        description: 'SMS Provider',
    }),
    (0, nestjs_query_graphql_1.Authorize)(sms_provider_authorizer_1.SMSProviderAuthorizer)
], SMSProviderDTO);


/***/ }),
/* 318 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SMSProviderAuthorizer = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const operator_permission_enum_1 = __webpack_require__(93);
const operator_entity_1 = __webpack_require__(19);
const typeorm_1 = __webpack_require__(10);
let SMSProviderAuthorizer = class SMSProviderAuthorizer {
    constructor(datasource) {
        this.datasource = datasource;
    }
    async authorize(context, authorizerContext) {
        const operator = await this.datasource
            .getRepository(operator_entity_1.OperatorEntity)
            .findOne({
            where: { id: context.req.user.id },
            relations: {
                role: true,
            },
        });
        if (authorizerContext.readonly &&
            !operator.role.permissions.includes(operator_permission_enum_1.OperatorPermission.SMSProviders_View)) {
            throw new common_1.UnauthorizedException();
        }
        if (!authorizerContext.readonly &&
            !operator.role.permissions.includes(operator_permission_enum_1.OperatorPermission.SMSProviders_Edit)) {
            if (authorizerContext.operationGroup === 'create' ||
                authorizerContext.operationGroup === 'update' ||
                authorizerContext.operationGroup === 'delete') {
                throw new common_1.UnauthorizedException();
            }
        }
        return undefined;
    }
};
exports.SMSProviderAuthorizer = SMSProviderAuthorizer;
exports.SMSProviderAuthorizer = SMSProviderAuthorizer = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeorm_1.DataSource])
], SMSProviderAuthorizer);


/***/ }),
/* 319 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SMSProviderService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(7);
const sms_provider_entity_1 = __webpack_require__(315);
const typeorm_2 = __webpack_require__(10);
let SMSProviderService = class SMSProviderService {
    constructor(smsProviderRepository) {
        this.smsProviderRepository = smsProviderRepository;
    }
    async markAsDefault(id) {
        await this.smsProviderRepository.update({}, { isDefault: false });
        await this.smsProviderRepository.update({ id }, { isDefault: true });
        const provider = await this.smsProviderRepository.findOneBy({ id });
        return provider;
    }
};
exports.SMSProviderService = SMSProviderService;
exports.SMSProviderService = SMSProviderService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(sms_provider_entity_1.SMSProviderEntity)),
    tslib_1.__metadata("design:paramtypes", [typeorm_2.Repository])
], SMSProviderService);


/***/ }),
/* 320 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SMSProviderResolver = void 0;
const tslib_1 = __webpack_require__(1);
const graphql_1 = __webpack_require__(6);
const sms_provider_service_1 = __webpack_require__(319);
const sms_provider_dto_1 = __webpack_require__(317);
let SMSProviderResolver = class SMSProviderResolver {
    constructor(smsProviderService) {
        this.smsProviderService = smsProviderService;
    }
    async markSMSProviderAsDefault(id) {
        return await this.smsProviderService.markAsDefault(id);
    }
};
exports.SMSProviderResolver = SMSProviderResolver;
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => sms_provider_dto_1.SMSProviderDTO),
    tslib_1.__param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], SMSProviderResolver.prototype, "markSMSProviderAsDefault", null);
exports.SMSProviderResolver = SMSProviderResolver = tslib_1.__decorate([
    (0, graphql_1.Resolver)(),
    tslib_1.__metadata("design:paramtypes", [sms_provider_service_1.SMSProviderService])
], SMSProviderResolver);


/***/ }),
/* 321 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SMSProviderInput = void 0;
const tslib_1 = __webpack_require__(1);
const eager_import_0 = __webpack_require__(316);
const graphql_1 = __webpack_require__(6);
let SMSProviderInput = class SMSProviderInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { name: { nullable: true, type: () => String }, type: { nullable: true, type: () => (__webpack_require__(316).SMSProviderType) }, isDefault: { nullable: true, type: () => Boolean }, accountId: { nullable: true, type: () => String }, authToken: { nullable: true, type: () => String }, fromNumber: { nullable: true, type: () => String }, verificationTemplate: { nullable: true, type: () => String }, smsType: { nullable: true, type: () => String } };
    }
};
exports.SMSProviderInput = SMSProviderInput;
exports.SMSProviderInput = SMSProviderInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], SMSProviderInput);


/***/ }),
/* 322 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SMSProviderQueryService = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(7);
const nestjs_query_core_1 = __webpack_require__(259);
const nestjs_query_typeorm_1 = __webpack_require__(111);
const sms_provider_entity_1 = __webpack_require__(315);
const typeorm_2 = __webpack_require__(10);
const sms_provider_dto_1 = __webpack_require__(317);
let SMSProviderQueryService = class SMSProviderQueryService extends nestjs_query_typeorm_1.TypeOrmQueryService {
    constructor(repo) {
        super(repo);
        this.repo = repo;
    }
    async createOne(record) {
        const count = await this.repo.count();
        if (count === 0) {
            record.isDefault = true;
        }
        if (record.isDefault) {
            await this.repo.update({}, { isDefault: false });
        }
        return super.createOne(record);
    }
};
exports.SMSProviderQueryService = SMSProviderQueryService;
exports.SMSProviderQueryService = SMSProviderQueryService = tslib_1.__decorate([
    (0, nestjs_query_core_1.QueryService)(sms_provider_dto_1.SMSProviderDTO),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(sms_provider_entity_1.SMSProviderEntity)),
    tslib_1.__metadata("design:paramtypes", [typeorm_2.Repository])
], SMSProviderQueryService);


/***/ }),
/* 323 */
/***/ ((module) => {

module.exports = require("@nestjs/platform-fastify");

/***/ }),
/* 324 */
/***/ ((module) => {

module.exports = require("@fastify/multipart");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const core_1 = __webpack_require__(3);
const admin_api_module_1 = __webpack_require__(4);
const platform_fastify_1 = __webpack_require__(323);
const multipart_1 = tslib_1.__importDefault(__webpack_require__(324));
const path_1 = __webpack_require__(108);
async function bootstrap() {
    const adapter = new platform_fastify_1.FastifyAdapter();
    const app = await core_1.NestFactory.create(admin_api_module_1.AdminAPIModule.register(), adapter);
    const port = process.env.ADMIN_API_PORT || 3000;
    app.enableShutdownHooks();
    app.enableCors();
    app.register(multipart_1.default, {
        limits: {
            fileSize: 10000000,
        },
    });
    app.useStaticAssets({
        root: (0, path_1.join)(process.cwd(), 'uploads'),
        prefix: '/uploads/',
    });
    await app.listen(port, '0.0.0.0', () => {
        common_1.Logger.log(`Listening at http://localhost:${port}`, 'Admin API');
    });
}
bootstrap();

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;