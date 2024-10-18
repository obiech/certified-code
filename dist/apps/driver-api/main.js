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
/***/ ((module) => {

module.exports = require("@nestjs/platform-fastify");

/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("@fastify/multipart");

/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DriverAPIModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const config_1 = __webpack_require__(8);
const graphql_1 = __webpack_require__(9);
const schedule_1 = __webpack_require__(10);
const typeorm_1 = __webpack_require__(11);
const database_1 = __webpack_require__(12);
const nestjs_redis_1 = __webpack_require__(112);
const path_1 = __webpack_require__(6);
const auth_module_1 = __webpack_require__(113);
const jwt_strategy_1 = __webpack_require__(197);
const driver_api_controller_1 = __webpack_require__(201);
const driver_module_1 = __webpack_require__(117);
const order_module_1 = __webpack_require__(149);
const upload_module_1 = __webpack_require__(143);
const announcements_module_1 = __webpack_require__(205);
const wallet_module_1 = __webpack_require__(207);
const service_module_1 = __webpack_require__(215);
const shared_driver_service_1 = __webpack_require__(140);
const chat_module_1 = __webpack_require__(216);
const complaint_module_1 = __webpack_require__(221);
const apollo_1 = __webpack_require__(138);
const feedbacks_module_1 = __webpack_require__(224);
const payout_module_1 = __webpack_require__(229);
const sos_module_1 = __webpack_require__(237);
let DriverAPIModule = class DriverAPIModule {
};
exports.DriverAPIModule = DriverAPIModule;
exports.DriverAPIModule = DriverAPIModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            database_1.DatabaseModule,
            service_module_1.ServiceModule,
            feedbacks_module_1.FeedbacksModule,
            payout_module_1.PayoutModule,
            sos_module_1.SOSModule,
            config_1.ConfigModule.forRoot(),
            schedule_1.ScheduleModule.forRoot(),
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                // cors: false,
                subscriptions: {
                    'subscriptions-transport-ws': {
                        keepAlive: 5000,
                        onConnect: async (connectionParams) => {
                            if (connectionParams.authToken) {
                                return (0, jwt_strategy_1.validateToken)(connectionParams.authToken);
                            }
                            throw new Error('Missing auth token!');
                        },
                    },
                },
                autoSchemaFile: (0, path_1.join)(process.cwd(), 'apps/driver-frontend/lib/core/graphql/schema.gql'),
                buildSchemaOptions: {
                    dateScalarMode: 'timestamp',
                },
                // context: ({ req, res, payload, connection }) => ({
                //   req,
                //   res,
                //   payload,
                //   connection,
                // }),
            }),
            typeorm_1.TypeOrmModule.forFeature(database_1.entities),
            auth_module_1.AuthModule.register(),
            upload_module_1.UploadModule,
            driver_module_1.DriverModule,
            chat_module_1.ChatModule,
            order_module_1.OrderModule,
            wallet_module_1.WalletModule,
            nestjs_redis_1.RedisModule.forRoot({
                closeClient: true,
                commonOptions: { db: 2 },
                config: {
                    host: process.env.REDIS_HOST ?? 'localhost',
                },
            }),
            announcements_module_1.AnnouncementsModule,
            complaint_module_1.ComplaintModule,
        ],
        controllers: [driver_api_controller_1.DriverAPIController],
        providers: [database_1.CryptoService, shared_driver_service_1.SharedDriverService],
    })
], DriverAPIModule);


/***/ }),
/* 8 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 9 */
/***/ ((module) => {

module.exports = require("@nestjs/graphql");

/***/ }),
/* 10 */
/***/ ((module) => {

module.exports = require("@nestjs/schedule");

/***/ }),
/* 11 */
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(13), exports);
tslib_1.__exportStar(__webpack_require__(76), exports);
tslib_1.__exportStar(__webpack_require__(104), exports);
tslib_1.__exportStar(__webpack_require__(105), exports);
tslib_1.__exportStar(__webpack_require__(106), exports);
tslib_1.__exportStar(__webpack_require__(110), exports);


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DatabaseModule = exports.AppDataSource = exports.entities = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(11);
const typeorm_2 = __webpack_require__(14);
const car_color_entity_1 = __webpack_require__(15);
const car_model_entity_1 = __webpack_require__(17);
const complaint_activity_entity_1 = __webpack_require__(24);
const complaint_entity_1 = __webpack_require__(25);
const coupon_entity_1 = __webpack_require__(29);
const driver_transaction_entity_1 = __webpack_require__(18);
const driver_wallet_entity_1 = __webpack_require__(98);
const driver_entity_1 = __webpack_require__(16);
const feedback_parameter_entity_1 = __webpack_require__(83);
const feedback_entity_1 = __webpack_require__(82);
const fleet_transaction_entity_1 = __webpack_require__(71);
const fleet_wallet_entity_1 = __webpack_require__(72);
const fleet_entity_1 = __webpack_require__(68);
const media_entity_1 = __webpack_require__(34);
const operator_role_entity_1 = __webpack_require__(96);
const operator_entity_1 = __webpack_require__(23);
const request_message_entity_1 = __webpack_require__(84);
const request_entity_1 = __webpack_require__(27);
const payment_gateway_entity_1 = __webpack_require__(37);
const provider_transaction_entity_1 = __webpack_require__(44);
const provider_wallet_entity_1 = __webpack_require__(100);
const region_entity_1 = __webpack_require__(61);
const rider_address_entity_1 = __webpack_require__(75);
const rider_entity_1 = __webpack_require__(30);
const rider_transaction_entity_1 = __webpack_require__(38);
const rider_wallet_entity_1 = __webpack_require__(79);
const service_category_entity_1 = __webpack_require__(63);
const service_entity_1 = __webpack_require__(56);
const payment_entity_1 = __webpack_require__(101);
const service_option_entity_1 = __webpack_require__(64);
const gift_code_entity_1 = __webpack_require__(41);
const gift_batch_entity_1 = __webpack_require__(42);
const sos_entity_1 = __webpack_require__(88);
const sos_activity_entity_1 = __webpack_require__(90);
const announcement_entity_1 = __webpack_require__(35);
const zone_price_entity_1 = __webpack_require__(67);
const gateway_to_user_entity_1 = __webpack_require__(47);
const fleet_device_entity_1 = __webpack_require__(69);
const order_cancel_reason_entity_1 = __webpack_require__(92);
const saved_payment_method_entity_1 = __webpack_require__(48);
const rider_review_entity_1 = __webpack_require__(80);
const payout_account_entity_1 = __webpack_require__(51);
const payout_method_entity_1 = __webpack_require__(52);
const payout_session_entity_1 = __webpack_require__(54);
const request_activity_entity_1 = __webpack_require__(86);
// MYSQL_HOST=us-cluster-east-01.k8s.cleardb.net
// MYSQL_USER=b50f282dae8a4a
// MYSQL_PASS=1c0cfbc2
// MYSQL_DB=heroku_5a5bdd156230275
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
    request_activity_entity_1.RequestActivityEntity,
];
exports.AppDataSource = new typeorm_2.DataSource({
    type: 'mysql',
    host: 'us-cluster-east-01.k8s.cleardb.net',
    port: 3306,
    username: 'b50f282dae8a4a',
    password: '1c0cfbc2',
    database: 'heroku_5a5bdd156230275',
    entities: exports.entities,
    migrations: [`${__dirname}/migration/*.js`],
    synchronize: true,
    logging: true,
});
let DatabaseModule = class DatabaseModule {
    async onModuleInit() {
        common_1.Logger.log('Module init started');
        const conn = await exports.AppDataSource.initialize();
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
                    const dbName = 'heroku_5a5bdd156230275';
                    const baseConn = {
                        type: 'mysql',
                        host: 'us-cluster-east-01.k8s.cleardb.net',
                        port: 3306,
                        username: 'b50f282dae8a4a',
                        password: '1c0cfbc2',
                        database: dbName,
                        // autoLoadEntities: true,
                        entities: exports.entities,
                        legacySpatialSupport: false,
                        migrations: [`${__dirname}/migration/*.js`],
                        synchronize: true,
                        migrationsRun: false,
                        logging: false,
                    };
                    common_1.Logger.log('TypeORM import finished');
                    return baseConn;
                },
            }),
        ],
        controllers: [],
        providers: [],
        exports: [],
    })
    // export class DatabaseModule {}
    // @Module({
    //   imports: [
    //     TypeOrmModule.forRootAsync({
    //       useFactory: async () => {
    //         Logger.log('TypeORM import started');
    //         const conn = await AppDataSource.initialize();
    //         Logger.log('TypeORM import finished');
    //         return {
    //           ...conn.options, // use options from initialized AppDataSource
    //           migrationsRun: false, // Disable auto-run migrations on boot
    //         };
    //       },
    //     }),
    //   ],
    //   controllers: [],
    //   providers: [],
    //   exports: [],
    // })
], DatabaseModule);
// @Module({
//   imports: [
//     TypeOrmModule.forRootAsync({
//       useFactory: async () => {
//         Logger.log('TypeORM import started');
//         const dbName = 'heroku_5a5bdd156230275' || 'ridy';
//         const baseConn: ConnectionOptions = {
//           type: 'mysql',
//           host: 'us-cluster-east-01.k8s.cleardb.net' || 'localhost',
//           port: 3306,
//           username: 'b50f282dae8a4a' || 'root',
//           password: '1c0cfbc2' || 'defaultpassword',
//         };
//         const conn = await createConnection({ ...baseConn, name: 'ts' });
//         const databases = await conn.query(`SHOW DATABASES LIKE '${dbName}';`);
//         let shouldSync =
//           (databases as unknown[]).length < 1 ||
//           process.env.FORCE_SYNC_DB != null;
//         if (shouldSync) {
//           await conn.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`);
//         }
//         //conn.query(`USE ${dbName}`);
//         const tables = await conn.query(`SHOW TABLES FROM ${dbName};`);
//         shouldSync =
//           (tables as unknown[]).length < 5 || process.env.FORCE_SYNC_DB != null;
//         Logger.log('type orm import finished');
//         return {
//           ...baseConn,
//           database: dbName,
//           autoLoadEntities: true,
//           legacySpatialSupport: false,
//           migrations: [`${__dirname}/migration/*.js`],
//           synchronize: shouldSync,
//           migrationsRun: false,
//           logging: false,
//         };
//       },
//     }),
//   ],
//   controllers: [],
//   providers: [],
//   exports: [],
// })
// export class DatabaseModule {
//   async onModuleInit() {
//     Logger.log('Module init started');
//     const conn = await createConnection({
//       name: 'mg',
//       type: 'mysql',
//       host: process.env.MYSQL_HOST || 'localhost',
//       port: 3306,
//       username: process.env.MYSQL_USER || 'root',
//       password: process.env.MYSQL_PASS || 'defaultpassword',
//       database: process.env.MYSQL_DB || 'ridy',
//       migrations: [`${__dirname}/migration/*.js`],
//       migrationsRun: true,
//       logging: false,
//     });
//     const migrationsOutput = await conn.runMigrations();
//     Logger.log('Module init finished.');
//     Logger.log(`${migrationsOutput.length} Migrations done!`);
//   }
// }


/***/ }),
/* 14 */
/***/ ((module) => {

module.exports = require("typeorm");

/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CarColorEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
const driver_entity_1 = __webpack_require__(16);
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
/* 16 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DriverEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
const car_color_entity_1 = __webpack_require__(15);
const car_model_entity_1 = __webpack_require__(17);
const driver_transaction_entity_1 = __webpack_require__(18);
const driver_wallet_entity_1 = __webpack_require__(98);
const driver_status_enum_1 = __webpack_require__(99);
const gender_enum_1 = __webpack_require__(31);
const feedback_entity_1 = __webpack_require__(82);
const fleet_transaction_entity_1 = __webpack_require__(71);
const fleet_entity_1 = __webpack_require__(68);
const media_entity_1 = __webpack_require__(34);
const request_entity_1 = __webpack_require__(27);
const service_entity_1 = __webpack_require__(56);
const saved_payment_method_entity_1 = __webpack_require__(48);
const rider_review_entity_1 = __webpack_require__(80);
const rider_entity_1 = __webpack_require__(30);
const payout_account_entity_1 = __webpack_require__(51);
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
/* 17 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CarModelEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
const driver_entity_1 = __webpack_require__(16);
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
/* 18 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DriverTransactionEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
const driver_entity_1 = __webpack_require__(16);
const driver_deduct_transaction_type_enum_1 = __webpack_require__(19);
const driver_recharge_transaction_type_enum_1 = __webpack_require__(20);
const transaction_action_enum_1 = __webpack_require__(21);
const transaction_status_enum_1 = __webpack_require__(22);
const operator_entity_1 = __webpack_require__(23);
const request_entity_1 = __webpack_require__(27);
const payment_gateway_entity_1 = __webpack_require__(37);
const gift_code_entity_1 = __webpack_require__(41);
const payout_session_entity_1 = __webpack_require__(54);
const payout_account_entity_1 = __webpack_require__(51);
const payout_method_entity_1 = __webpack_require__(52);
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
/* 19 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DriverDeductTransactionType = void 0;
const graphql_1 = __webpack_require__(9);
var DriverDeductTransactionType;
(function (DriverDeductTransactionType) {
    DriverDeductTransactionType["Withdraw"] = "Withdraw";
    DriverDeductTransactionType["Commission"] = "Commission";
    DriverDeductTransactionType["Correction"] = "Correction";
})(DriverDeductTransactionType || (exports.DriverDeductTransactionType = DriverDeductTransactionType = {}));
(0, graphql_1.registerEnumType)(DriverDeductTransactionType, { name: 'DriverDeductTransactionType' });


/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DriverRechargeTransactionType = void 0;
const graphql_1 = __webpack_require__(9);
var DriverRechargeTransactionType;
(function (DriverRechargeTransactionType) {
    DriverRechargeTransactionType["OrderFee"] = "OrderFee";
    DriverRechargeTransactionType["BankTransfer"] = "BankTransfer";
    DriverRechargeTransactionType["InAppPayment"] = "InAppPayment";
    DriverRechargeTransactionType["Gift"] = "Gift";
})(DriverRechargeTransactionType || (exports.DriverRechargeTransactionType = DriverRechargeTransactionType = {}));
(0, graphql_1.registerEnumType)(DriverRechargeTransactionType, { name: 'DriverRechargeTransactionType' });


/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransactionAction = void 0;
const graphql_1 = __webpack_require__(9);
var TransactionAction;
(function (TransactionAction) {
    TransactionAction["Recharge"] = "Recharge";
    TransactionAction["Deduct"] = "Deduct";
})(TransactionAction || (exports.TransactionAction = TransactionAction = {}));
(0, graphql_1.registerEnumType)(TransactionAction, { name: 'TransactionAction' });


/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransactionStatus = void 0;
const graphql_1 = __webpack_require__(9);
var TransactionStatus;
(function (TransactionStatus) {
    TransactionStatus["Processing"] = "Processing";
    TransactionStatus["Done"] = "Done";
    TransactionStatus["Canceled"] = "Canceled";
    TransactionStatus["Rejected"] = "Rejected";
})(TransactionStatus || (exports.TransactionStatus = TransactionStatus = {}));
(0, graphql_1.registerEnumType)(TransactionStatus, { name: 'TransactionStatus' });


/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OperatorEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
const complaint_activity_entity_1 = __webpack_require__(24);
const driver_transaction_entity_1 = __webpack_require__(18);
const enabled_notification_enum_1 = __webpack_require__(95);
const fleet_transaction_entity_1 = __webpack_require__(71);
const fleet_entity_1 = __webpack_require__(68);
const media_entity_1 = __webpack_require__(34);
const operator_role_entity_1 = __webpack_require__(96);
const provider_transaction_entity_1 = __webpack_require__(44);
const request_entity_1 = __webpack_require__(27);
const rider_transaction_entity_1 = __webpack_require__(38);
const sos_activity_entity_1 = __webpack_require__(90);
const payout_session_entity_1 = __webpack_require__(54);
const gift_batch_entity_1 = __webpack_require__(42);
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
/* 24 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ComplaintActivityEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
const complaint_entity_1 = __webpack_require__(25);
const complaint_activity_type_enum_1 = __webpack_require__(94);
const operator_entity_1 = __webpack_require__(23);
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
/* 25 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ComplaintEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
const complaint_activity_entity_1 = __webpack_require__(24);
const complaint_status_enum_1 = __webpack_require__(26);
const request_entity_1 = __webpack_require__(27);
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
/* 26 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ComplaintStatus = void 0;
const graphql_1 = __webpack_require__(9);
var ComplaintStatus;
(function (ComplaintStatus) {
    ComplaintStatus["Submitted"] = "Submitted";
    ComplaintStatus["UnderInvestigation"] = "UnderInvestigation";
    ComplaintStatus["Resolved"] = "Resolved";
})(ComplaintStatus || (exports.ComplaintStatus = ComplaintStatus = {}));
(0, graphql_1.registerEnumType)(ComplaintStatus, { name: 'ComplaintStatus' });


/***/ }),
/* 27 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RequestEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
const multipoint_transformer_1 = __webpack_require__(28);
const complaint_entity_1 = __webpack_require__(25);
const coupon_entity_1 = __webpack_require__(29);
const driver_transaction_entity_1 = __webpack_require__(18);
const driver_entity_1 = __webpack_require__(16);
const order_status_enum_1 = __webpack_require__(81);
const feedback_entity_1 = __webpack_require__(82);
const fleet_transaction_entity_1 = __webpack_require__(71);
const request_message_entity_1 = __webpack_require__(84);
const payment_gateway_entity_1 = __webpack_require__(37);
const provider_transaction_entity_1 = __webpack_require__(44);
const rider_entity_1 = __webpack_require__(30);
const rider_transaction_entity_1 = __webpack_require__(38);
const service_entity_1 = __webpack_require__(56);
const operator_entity_1 = __webpack_require__(23);
const request_activity_entity_1 = __webpack_require__(86);
const service_option_entity_1 = __webpack_require__(64);
const sos_entity_1 = __webpack_require__(88);
const fleet_entity_1 = __webpack_require__(68);
const order_cancel_reason_entity_1 = __webpack_require__(92);
const payment_mode_enum_1 = __webpack_require__(93);
const saved_payment_method_entity_1 = __webpack_require__(48);
const rider_review_entity_1 = __webpack_require__(80);
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
/* 28 */
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
/* 29 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CouponEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
const request_entity_1 = __webpack_require__(27);
const rider_entity_1 = __webpack_require__(30);
const service_entity_1 = __webpack_require__(56);
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
/* 30 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RiderEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
const coupon_entity_1 = __webpack_require__(29);
const gender_enum_1 = __webpack_require__(31);
const rider_document_type_1 = __webpack_require__(32);
const rider_status_enum_1 = __webpack_require__(33);
const media_entity_1 = __webpack_require__(34);
const request_entity_1 = __webpack_require__(27);
const rider_address_entity_1 = __webpack_require__(75);
const rider_transaction_entity_1 = __webpack_require__(38);
const rider_wallet_entity_1 = __webpack_require__(79);
const saved_payment_method_entity_1 = __webpack_require__(48);
const rider_review_entity_1 = __webpack_require__(80);
const driver_entity_1 = __webpack_require__(16);
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
/* 31 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Gender = void 0;
const graphql_1 = __webpack_require__(9);
var Gender;
(function (Gender) {
    Gender["Male"] = "male";
    Gender["Female"] = "female";
    Gender["Unknown"] = "unknown";
})(Gender || (exports.Gender = Gender = {}));
(0, graphql_1.registerEnumType)(Gender, { name: 'Gender' });


/***/ }),
/* 32 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RiderDocumentType = void 0;
const graphql_1 = __webpack_require__(9);
var RiderDocumentType;
(function (RiderDocumentType) {
    RiderDocumentType["ID"] = "ID";
    RiderDocumentType["Passport"] = "Passport";
    RiderDocumentType["DriverLicense"] = "DriverLicense";
    RiderDocumentType["ResidentPermitID"] = "ResidentPermitID";
})(RiderDocumentType || (exports.RiderDocumentType = RiderDocumentType = {}));
(0, graphql_1.registerEnumType)(RiderDocumentType, { name: 'RiderDocumentType' });


/***/ }),
/* 33 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RiderStatus = void 0;
const graphql_1 = __webpack_require__(9);
var RiderStatus;
(function (RiderStatus) {
    RiderStatus["Enabled"] = "enabled";
    RiderStatus["Disabled"] = "blocked";
})(RiderStatus || (exports.RiderStatus = RiderStatus = {}));
(0, graphql_1.registerEnumType)(RiderStatus, { name: 'RiderStatus' });


/***/ }),
/* 34 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MediaEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
const announcement_entity_1 = __webpack_require__(35);
const driver_entity_1 = __webpack_require__(16);
const operator_entity_1 = __webpack_require__(23);
const payment_gateway_entity_1 = __webpack_require__(37);
const rider_entity_1 = __webpack_require__(30);
const service_entity_1 = __webpack_require__(56);
const payout_method_entity_1 = __webpack_require__(52);
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
/* 35 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AnnouncementEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
const anouncement_user_type_enum_1 = __webpack_require__(36);
const media_entity_1 = __webpack_require__(34);
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
/* 36 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AnnouncementUserType = void 0;
const graphql_1 = __webpack_require__(9);
var AnnouncementUserType;
(function (AnnouncementUserType) {
    AnnouncementUserType["Driver"] = "Driver";
    AnnouncementUserType["Rider"] = "Rider";
    AnnouncementUserType["Operator"] = "Operator";
})(AnnouncementUserType || (exports.AnnouncementUserType = AnnouncementUserType = {}));
(0, graphql_1.registerEnumType)(AnnouncementUserType, { name: 'AnnouncementUserType' });


/***/ }),
/* 37 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PaymentGatewayEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
const request_entity_1 = __webpack_require__(27);
const rider_transaction_entity_1 = __webpack_require__(38);
const payment_gateway_type_enum_1 = __webpack_require__(43);
const provider_transaction_entity_1 = __webpack_require__(44);
const media_entity_1 = __webpack_require__(34);
const gateway_to_user_entity_1 = __webpack_require__(47);
const saved_payment_method_entity_1 = __webpack_require__(48);
const payout_account_entity_1 = __webpack_require__(51);
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
/* 38 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RiderTransactionEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
const rider_deduct_transaction_type_enum_1 = __webpack_require__(39);
const rider_recharge_transaction_type_enum_1 = __webpack_require__(40);
const transaction_action_enum_1 = __webpack_require__(21);
const transaction_status_enum_1 = __webpack_require__(22);
const operator_entity_1 = __webpack_require__(23);
const request_entity_1 = __webpack_require__(27);
const payment_gateway_entity_1 = __webpack_require__(37);
const rider_entity_1 = __webpack_require__(30);
const gift_code_entity_1 = __webpack_require__(41);
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
/* 39 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RiderDeductTransactionType = void 0;
const graphql_1 = __webpack_require__(9);
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
/* 40 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RiderRechargeTransactionType = void 0;
const graphql_1 = __webpack_require__(9);
var RiderRechargeTransactionType;
(function (RiderRechargeTransactionType) {
    RiderRechargeTransactionType["BankTransfer"] = "BankTransfer";
    RiderRechargeTransactionType["Gift"] = "Gift";
    RiderRechargeTransactionType["Correction"] = "Correction";
    RiderRechargeTransactionType["InAppPayment"] = "InAppPayment";
})(RiderRechargeTransactionType || (exports.RiderRechargeTransactionType = RiderRechargeTransactionType = {}));
(0, graphql_1.registerEnumType)(RiderRechargeTransactionType, { name: 'RiderRechargeTransactionType' });


/***/ }),
/* 41 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GiftCodeEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
const rider_transaction_entity_1 = __webpack_require__(38);
const driver_transaction_entity_1 = __webpack_require__(18);
const gift_batch_entity_1 = __webpack_require__(42);
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
/* 42 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GiftBatchEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
const gift_code_entity_1 = __webpack_require__(41);
const operator_entity_1 = __webpack_require__(23);
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
/* 43 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PaymentGatewayType = void 0;
const graphql_1 = __webpack_require__(9);
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
/* 44 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProviderTransactionEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
const provider_deduct_transaction_type_enum_1 = __webpack_require__(45);
const provider_recharge_transaction_type_enum_1 = __webpack_require__(46);
const transaction_action_enum_1 = __webpack_require__(21);
const operator_entity_1 = __webpack_require__(23);
const payment_gateway_entity_1 = __webpack_require__(37);
const request_entity_1 = __webpack_require__(27);
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
/* 45 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProviderDeductTransactionType = void 0;
const graphql_1 = __webpack_require__(9);
var ProviderDeductTransactionType;
(function (ProviderDeductTransactionType) {
    ProviderDeductTransactionType["Withdraw"] = "Withdraw";
})(ProviderDeductTransactionType || (exports.ProviderDeductTransactionType = ProviderDeductTransactionType = {}));
(0, graphql_1.registerEnumType)(ProviderDeductTransactionType, { name: 'ProviderDeductTransactionType' });


/***/ }),
/* 46 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProviderRechargeTransactionType = void 0;
const graphql_1 = __webpack_require__(9);
var ProviderRechargeTransactionType;
(function (ProviderRechargeTransactionType) {
    ProviderRechargeTransactionType["Commission"] = "Commission";
})(ProviderRechargeTransactionType || (exports.ProviderRechargeTransactionType = ProviderRechargeTransactionType = {}));
(0, graphql_1.registerEnumType)(ProviderRechargeTransactionType, { name: 'ProviderRechargeTransactionType' });


/***/ }),
/* 47 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GatewayToUserEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
const payment_gateway_entity_1 = __webpack_require__(37);
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
/* 48 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SavedPaymentMethodEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
const saved_payment_method_type_1 = __webpack_require__(49);
const rider_entity_1 = __webpack_require__(30);
const driver_entity_1 = __webpack_require__(16);
const payment_gateway_entity_1 = __webpack_require__(37);
const card_type_enum_1 = __webpack_require__(50);
const request_entity_1 = __webpack_require__(27);
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
/* 49 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SavedPaymentMethodType = void 0;
const graphql_1 = __webpack_require__(9);
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
/* 50 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProviderBrand = void 0;
const graphql_1 = __webpack_require__(9);
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
/* 51 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PayoutAccountEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
const driver_entity_1 = __webpack_require__(16);
const payment_gateway_entity_1 = __webpack_require__(37);
const payout_method_entity_1 = __webpack_require__(52);
const saved_payment_method_type_1 = __webpack_require__(49);
const driver_transaction_entity_1 = __webpack_require__(18);
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
/* 52 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PayoutMethodEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
const media_entity_1 = __webpack_require__(34);
const payout_method_type_enum_1 = __webpack_require__(53);
const payout_account_entity_1 = __webpack_require__(51);
const payout_session_entity_1 = __webpack_require__(54);
const driver_transaction_entity_1 = __webpack_require__(18);
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
/* 53 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PayoutMethodType = void 0;
const graphql_1 = __webpack_require__(9);
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
/* 54 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PayoutSessionEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
const driver_transaction_entity_1 = __webpack_require__(18);
const payout_session_status_enum_1 = __webpack_require__(55);
const operator_entity_1 = __webpack_require__(23);
const payout_method_entity_1 = __webpack_require__(52);
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
/* 55 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PayoutSessionStatus = void 0;
const graphql_1 = __webpack_require__(9);
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
/* 56 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
const distance_multiplier_transformer_1 = __webpack_require__(57);
const time_multiplier_transformer_1 = __webpack_require__(58);
const coupon_entity_1 = __webpack_require__(29);
const driver_entity_1 = __webpack_require__(16);
const service_distance_fee_mode_enum_1 = __webpack_require__(59);
const service_payment_method_enum_1 = __webpack_require__(60);
const media_entity_1 = __webpack_require__(34);
const request_entity_1 = __webpack_require__(27);
const region_entity_1 = __webpack_require__(61);
const service_category_entity_1 = __webpack_require__(63);
const service_option_entity_1 = __webpack_require__(64);
const zone_price_entity_1 = __webpack_require__(67);
const weekday_multiplier_transformer_1 = __webpack_require__(73);
const date_range_multiplier_transformer_1 = __webpack_require__(74);
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
/* 57 */
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
/* 58 */
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
/* 59 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceDistanceFeeMode = void 0;
const graphql_1 = __webpack_require__(9);
var ServiceDistanceFeeMode;
(function (ServiceDistanceFeeMode) {
    ServiceDistanceFeeMode["None"] = "None";
    ServiceDistanceFeeMode["PickupToDestination"] = "PickupToDestination";
    ServiceDistanceFeeMode["Radial"] = "Radial";
})(ServiceDistanceFeeMode || (exports.ServiceDistanceFeeMode = ServiceDistanceFeeMode = {}));
(0, graphql_1.registerEnumType)(ServiceDistanceFeeMode, { name: 'ServiceDistanceFeeMode' });


/***/ }),
/* 60 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServicePaymentMethod = void 0;
const graphql_1 = __webpack_require__(9);
var ServicePaymentMethod;
(function (ServicePaymentMethod) {
    ServicePaymentMethod["CashCredit"] = "CashCredit";
    ServicePaymentMethod["OnlyCredit"] = "OnlyCredit";
    ServicePaymentMethod["OnlyCash"] = "OnlyCash";
})(ServicePaymentMethod || (exports.ServicePaymentMethod = ServicePaymentMethod = {}));
(0, graphql_1.registerEnumType)(ServicePaymentMethod, { name: 'ServicePaymentMethod' });


/***/ }),
/* 61 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RegionEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
const polygon_transformer_1 = __webpack_require__(62);
const service_entity_1 = __webpack_require__(56);
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
/* 62 */
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
/* 63 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceCategoryEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
const service_entity_1 = __webpack_require__(56);
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
/* 64 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceOptionEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
const service_option_icon_enum_1 = __webpack_require__(65);
const service_option_type_enum_1 = __webpack_require__(66);
const request_entity_1 = __webpack_require__(27);
const service_entity_1 = __webpack_require__(56);
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
/* 65 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceOptionIcon = void 0;
const graphql_1 = __webpack_require__(9);
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
/* 66 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceOptionType = void 0;
const graphql_1 = __webpack_require__(9);
var ServiceOptionType;
(function (ServiceOptionType) {
    ServiceOptionType["Free"] = "Free";
    ServiceOptionType["Paid"] = "Paid";
    ServiceOptionType["TwoWay"] = "TwoWay";
})(ServiceOptionType || (exports.ServiceOptionType = ServiceOptionType = {}));
(0, graphql_1.registerEnumType)(ServiceOptionType, { name: 'ServiceOptionType' });


/***/ }),
/* 67 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ZonePriceEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
const polygon_transformer_1 = __webpack_require__(62);
const time_multiplier_transformer_1 = __webpack_require__(58);
const fleet_entity_1 = __webpack_require__(68);
const service_entity_1 = __webpack_require__(56);
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
/* 68 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FleetEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
const polygon_transformer_1 = __webpack_require__(62);
const driver_entity_1 = __webpack_require__(16);
const fleet_device_entity_1 = __webpack_require__(69);
const fleet_transaction_entity_1 = __webpack_require__(71);
const fleet_wallet_entity_1 = __webpack_require__(72);
const operator_entity_1 = __webpack_require__(23);
const request_entity_1 = __webpack_require__(27);
const zone_price_entity_1 = __webpack_require__(67);
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
/* 69 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FleetDeviceEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
const device_platform_enum_1 = __webpack_require__(70);
const fleet_entity_1 = __webpack_require__(68);
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
/* 70 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DevicePlatform = void 0;
const graphql_1 = __webpack_require__(9);
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
/* 71 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FleetTransactionEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
const driver_entity_1 = __webpack_require__(16);
const provider_deduct_transaction_type_enum_1 = __webpack_require__(45);
const provider_recharge_transaction_type_enum_1 = __webpack_require__(46);
const transaction_action_enum_1 = __webpack_require__(21);
const fleet_entity_1 = __webpack_require__(68);
const operator_entity_1 = __webpack_require__(23);
const request_entity_1 = __webpack_require__(27);
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
/* 72 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FleetWalletEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
const fleet_entity_1 = __webpack_require__(68);
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
/* 73 */
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
/* 74 */
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
/* 75 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RiderAddressEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
const point_1 = __webpack_require__(76);
const point_transformer_1 = __webpack_require__(77);
const rider_address_type_enum_1 = __webpack_require__(78);
const rider_entity_1 = __webpack_require__(30);
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
/* 76 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Point = void 0;
const tslib_1 = __webpack_require__(1);
const graphql_1 = __webpack_require__(9);
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
/* 77 */
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
/* 78 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RiderAddressType = void 0;
const graphql_1 = __webpack_require__(9);
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
/* 79 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RiderWalletEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
const rider_entity_1 = __webpack_require__(30);
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
/* 80 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RiderReviewEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
const rider_entity_1 = __webpack_require__(30);
const driver_entity_1 = __webpack_require__(16);
const request_entity_1 = __webpack_require__(27);
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
/* 81 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderStatus = void 0;
const graphql_1 = __webpack_require__(9);
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
/* 82 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FeedbackEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
const driver_entity_1 = __webpack_require__(16);
const feedback_parameter_entity_1 = __webpack_require__(83);
const request_entity_1 = __webpack_require__(27);
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
/* 83 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FeedbackParameterEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
const feedback_entity_1 = __webpack_require__(82);
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
/* 84 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderMessageEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
const message_status_enum_1 = __webpack_require__(85);
const request_entity_1 = __webpack_require__(27);
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
/* 85 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MessageStatus = void 0;
const graphql_1 = __webpack_require__(9);
var MessageStatus;
(function (MessageStatus) {
    MessageStatus["Sent"] = "sent";
    MessageStatus["Delivered"] = "delivered";
    MessageStatus["Seen"] = "seen";
})(MessageStatus || (exports.MessageStatus = MessageStatus = {}));
(0, graphql_1.registerEnumType)(MessageStatus, { name: 'MessageStatus' });


/***/ }),
/* 86 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RequestActivityEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
const request_activity_type_enum_1 = __webpack_require__(87);
const request_entity_1 = __webpack_require__(27);
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
/* 87 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RequestActivityType = void 0;
const graphql_1 = __webpack_require__(9);
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
/* 88 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SOSEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
const point_1 = __webpack_require__(76);
const point_transformer_1 = __webpack_require__(77);
const sos_status_enum_1 = __webpack_require__(89);
const request_entity_1 = __webpack_require__(27);
const sos_activity_entity_1 = __webpack_require__(90);
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
/* 89 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SOSStatus = void 0;
const graphql_1 = __webpack_require__(9);
var SOSStatus;
(function (SOSStatus) {
    SOSStatus["Submitted"] = "Submitted";
    SOSStatus["UnderReview"] = "UnderReview";
    SOSStatus["FalseAlarm"] = "FalseAlarm";
    SOSStatus["Resolved"] = "Resolved";
})(SOSStatus || (exports.SOSStatus = SOSStatus = {}));
(0, graphql_1.registerEnumType)(SOSStatus, { name: 'SOSStatus' });


/***/ }),
/* 90 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SOSActivityEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
const sos_activity_action_enum_1 = __webpack_require__(91);
const operator_entity_1 = __webpack_require__(23);
const sos_entity_1 = __webpack_require__(88);
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
/* 91 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SOSActivityAction = void 0;
const graphql_1 = __webpack_require__(9);
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
/* 92 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderCancelReasonEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
const request_entity_1 = __webpack_require__(27);
const anouncement_user_type_enum_1 = __webpack_require__(36);
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
/* 93 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PaymentMode = void 0;
const graphql_1 = __webpack_require__(9);
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
/* 94 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ComplaintActivityType = void 0;
const graphql_1 = __webpack_require__(9);
var ComplaintActivityType;
(function (ComplaintActivityType) {
    ComplaintActivityType["AssignToOperator"] = "AssignedToOperator";
    ComplaintActivityType["Update"] = "Update";
    ComplaintActivityType["Resolved"] = "Resolved";
})(ComplaintActivityType || (exports.ComplaintActivityType = ComplaintActivityType = {}));
(0, graphql_1.registerEnumType)(ComplaintActivityType, { name: 'ComplaintActivityType' });


/***/ }),
/* 95 */
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
/* 96 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OperatorRoleEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
const operator_permission_enum_1 = __webpack_require__(97);
const operator_entity_1 = __webpack_require__(23);
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
/* 97 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OperatorPermission = void 0;
const graphql_1 = __webpack_require__(9);
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
/* 98 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DriverWalletEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
const driver_entity_1 = __webpack_require__(16);
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
/* 99 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DriverStatus = void 0;
const graphql_1 = __webpack_require__(9);
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
/* 100 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProviderWalletEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
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
/* 101 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PaymentEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
const Entity_1 = __webpack_require__(102);
const payment_status_enum_1 = __webpack_require__(103);
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
/* 102 */
/***/ ((module) => {

module.exports = require("typeorm/decorator/entity/Entity");

/***/ }),
/* 103 */
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
/* 104 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DistanceMultiplier = void 0;
const tslib_1 = __webpack_require__(1);
const graphql_1 = __webpack_require__(9);
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
/* 105 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TimeMultiplier = void 0;
const tslib_1 = __webpack_require__(1);
const graphql_1 = __webpack_require__(9);
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
/* 106 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RedisPubSubProvider = void 0;
const tslib_1 = __webpack_require__(1);
const nestjs_query_graphql_1 = __webpack_require__(107);
const graphql_redis_subscriptions_1 = __webpack_require__(108);
const ioredis_1 = tslib_1.__importDefault(__webpack_require__(109));
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
/* 107 */
/***/ ((module) => {

module.exports = require("@ptc-org/nestjs-query-graphql");

/***/ }),
/* 108 */
/***/ ((module) => {

module.exports = require("graphql-redis-subscriptions");

/***/ }),
/* 109 */
/***/ ((module) => {

module.exports = require("ioredis");

/***/ }),
/* 110 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CryptoService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const crypto_1 = __webpack_require__(111);
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
/* 111 */
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),
/* 112 */
/***/ ((module) => {

module.exports = require("@songkeys/nestjs-redis");

/***/ }),
/* 113 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var AuthModule_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const jwt_1 = __webpack_require__(114);
const passport_1 = __webpack_require__(115);
const fs_1 = __webpack_require__(116);
const driver_module_1 = __webpack_require__(117);
const order_module_1 = __webpack_require__(149);
const auth_resolver_1 = __webpack_require__(179);
const auth_service_1 = __webpack_require__(185);
const jwt_strategy_1 = __webpack_require__(197);
const sms_module_1 = __webpack_require__(200);
const redis_helper_module_1 = __webpack_require__(139);
let AuthModule = AuthModule_1 = class AuthModule {
    static async register() {
        const modules = [
            driver_module_1.DriverModule,
            order_module_1.OrderModule,
            passport_1.PassportModule,
            sms_module_1.SMSModule,
            redis_helper_module_1.RedisHelpersModule,
            jwt_1.JwtModule.register({
                secret: 'secret_driver',
            }),
        ];
        let providers = [];
        const configAddress = `${process.cwd()}/config/config.${process.env.NODE_ENV ?? 'production'}.json`;
        if ((0, fs_1.existsSync)(configAddress)) {
            const file = await fs_1.promises.readFile(configAddress, { encoding: 'utf-8' });
            const config = JSON.parse(file);
            if (config.firebaseProjectPrivateKey != null &&
                (0, fs_1.existsSync)(`${process.cwd()}/config/${config.firebaseProjectPrivateKey}`)) {
                common_1.Logger.log('Firebase Auth Module initialized');
                providers = [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy, auth_resolver_1.AuthResolver];
            }
        }
        return {
            module: AuthModule_1,
            imports: modules,
            providers: providers,
        };
    }
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = AuthModule_1 = tslib_1.__decorate([
    (0, common_1.Module)({})
], AuthModule);


/***/ }),
/* 114 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 115 */
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),
/* 116 */
/***/ ((module) => {

module.exports = require("fs");

/***/ }),
/* 117 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DriverModule = void 0;
const tslib_1 = __webpack_require__(1);
const nestjs_query_graphql_1 = __webpack_require__(107);
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(11);
const driver_entity_1 = __webpack_require__(16);
const driver_service_1 = __webpack_require__(118);
const driver_dto_1 = __webpack_require__(120);
const nestjs_query_typeorm_1 = __webpack_require__(136);
const car_model_dto_1 = __webpack_require__(121);
const car_model_entity_1 = __webpack_require__(17);
const car_color_dto_1 = __webpack_require__(122);
const car_color_entity_1 = __webpack_require__(15);
const jwt_gql_auth_guard_1 = __webpack_require__(137);
const redis_helper_module_1 = __webpack_require__(139);
const upload_module_1 = __webpack_require__(143);
const media_entity_1 = __webpack_require__(34);
const driver_query_service_1 = __webpack_require__(147);
const service_entity_1 = __webpack_require__(56);
const update_driver_input_1 = __webpack_require__(148);
let DriverModule = class DriverModule {
};
exports.DriverModule = DriverModule;
exports.DriverModule = DriverModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            redis_helper_module_1.RedisHelpersModule,
            upload_module_1.UploadModule,
            typeorm_1.TypeOrmModule.forFeature([driver_entity_1.DriverEntity]),
            nestjs_query_graphql_1.NestjsQueryGraphQLModule.forFeature({
                imports: [
                    redis_helper_module_1.RedisHelpersModule,
                    nestjs_query_typeorm_1.NestjsQueryTypeOrmModule.forFeature([
                        driver_entity_1.DriverEntity,
                        car_model_entity_1.CarModelEntity,
                        car_color_entity_1.CarColorEntity,
                        media_entity_1.MediaEntity,
                        service_entity_1.ServiceEntity,
                    ]),
                ],
                services: [driver_query_service_1.DriverQueryService],
                resolvers: [
                    {
                        EntityClass: driver_entity_1.DriverEntity,
                        DTOClass: driver_dto_1.DriverDTO,
                        ServiceClass: driver_query_service_1.DriverQueryService,
                        UpdateDTOClass: update_driver_input_1.UpdateDriverInput,
                        read: { many: { disabled: true } },
                        create: { disabled: true },
                        update: { many: { disabled: true } },
                        delete: { disabled: true },
                        guards: [jwt_gql_auth_guard_1.GqlAuthGuard],
                    },
                    {
                        EntityClass: car_model_entity_1.CarModelEntity,
                        DTOClass: car_model_dto_1.CarModelDTO,
                        create: { disabled: true },
                        read: { one: { disabled: true } },
                        update: { disabled: true },
                        delete: { disabled: true },
                        pagingStrategy: nestjs_query_graphql_1.PagingStrategies.NONE,
                    },
                    {
                        EntityClass: car_color_entity_1.CarColorEntity,
                        DTOClass: car_color_dto_1.CarColorDTO,
                        create: { disabled: true },
                        read: { one: { disabled: true } },
                        update: { disabled: true },
                        delete: { disabled: true },
                        pagingStrategy: nestjs_query_graphql_1.PagingStrategies.NONE,
                    },
                ],
            }),
        ],
        providers: [driver_service_1.DriverService],
        exports: [driver_service_1.DriverService],
    })
], DriverModule);


/***/ }),
/* 118 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DriverService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const driver_entity_1 = __webpack_require__(16);
const typeorm_1 = __webpack_require__(14);
const typeorm_2 = __webpack_require__(11);
const driver_status_enum_1 = __webpack_require__(99);
const driver_redis_service_1 = __webpack_require__(119);
let DriverService = class DriverService {
    constructor(repo, driverRedisService) {
        this.repo = repo;
        this.driverRedisService = driverRedisService;
    }
    async findWithDeleted(input) {
        return this.repo.findOne({ where: input, withDeleted: true });
    }
    async findOrCreateUserWithMobileNumber(input) {
        const findResult = await this.findWithDeleted({
            mobileNumber: input.mobileNumber,
        });
        if (findResult?.deletedAt != null) {
            await this.repo.restore(findResult.id);
        }
        if (findResult == null) {
            const driver = this.repo.create(input);
            return this.repo.save(driver);
        }
        const user = this.repo.findOne({
            where: { mobileNumber: input.mobileNumber },
            withDeleted: true,
            relations: {
                documents: true,
                media: true,
            },
        });
        return user;
    }
    async findByIds(ids) {
        return this.repo.find({ where: { id: (0, typeorm_1.In)(ids) }, withDeleted: true });
    }
    async setPassword(input) {
        await this.repo.update(input.driverId, {
            password: input.password,
        });
        return this.repo.findOneBy({ id: input.driverId });
    }
    async expireDriverStatus(driverIds) {
        if (driverIds.length < 1) {
            return;
        }
        this.driverRedisService.expire(driverIds);
        return this.repo.update(driverIds, {
            status: driver_status_enum_1.DriverStatus.Offline,
            lastSeenTimestamp: new Date(),
        });
    }
};
exports.DriverService = DriverService;
exports.DriverService = DriverService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_2.InjectRepository)(driver_entity_1.DriverEntity)),
    tslib_1.__metadata("design:paramtypes", [typeorm_1.Repository,
        driver_redis_service_1.DriverRedisService])
], DriverService);


/***/ }),
/* 119 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DriverRedisService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const nestjs_redis_1 = __webpack_require__(112);
const ioredis_1 = __webpack_require__(109);
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
/* 120 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DriverDTO = void 0;
const tslib_1 = __webpack_require__(1);
const eager_import_0 = __webpack_require__(99);
const eager_import_1 = __webpack_require__(31);
const graphql_1 = __webpack_require__(9);
const nestjs_query_graphql_1 = __webpack_require__(107);
const car_model_dto_1 = __webpack_require__(121);
const car_color_dto_1 = __webpack_require__(122);
const order_dto_1 = __webpack_require__(123);
const nestjs_query_core_1 = __webpack_require__(133);
const order_status_enum_1 = __webpack_require__(81);
const media_dto_1 = __webpack_require__(125);
const driver_wallet_dto_1 = __webpack_require__(134);
const service_dto_1 = __webpack_require__(127);
const common_1 = __webpack_require__(2);
const saved_payment_method_dto_1 = __webpack_require__(132);
const driver_transaction_dto_1 = __webpack_require__(135);
let DriverDTO = class DriverDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, firstName: { nullable: true, type: () => String }, lastName: { nullable: true, type: () => String }, mobileNumber: { type: () => String }, certificateNumber: { nullable: true, type: () => String }, countryIso: { nullable: true, type: () => String }, email: { nullable: true, type: () => String }, carPlate: { nullable: true, type: () => String }, status: { type: () => (__webpack_require__(99).DriverStatus) }, gender: { nullable: true, type: () => (__webpack_require__(31).Gender) }, registrationTimestamp: { type: () => Date }, lastSeenTimestamp: { nullable: true, type: () => Date }, accountNumber: { nullable: true, type: () => String }, bankName: { nullable: true, type: () => String }, bankRoutingNumber: { nullable: true, type: () => String }, bankSwift: { nullable: true, type: () => String }, address: { nullable: true, type: () => String }, softRejectionNote: { nullable: true, type: () => String }, rating: { nullable: true, type: () => Number } };
    }
};
exports.DriverDTO = DriverDTO;
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.IDField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], DriverDTO.prototype, "id", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    tslib_1.__metadata("design:type", Number)
], DriverDTO.prototype, "carProductionYear", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    tslib_1.__metadata("design:type", Number)
], DriverDTO.prototype, "presetAvatarNumber", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, { nullable: true }),
    tslib_1.__metadata("design:type", Number)
], DriverDTO.prototype, "carId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, { nullable: true, description: 'arbitary field to prevent exception. The correct field is carId',
        defaultValue: null }),
    tslib_1.__metadata("design:type", Number)
], DriverDTO.prototype, "carModelId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, { nullable: true }),
    tslib_1.__metadata("design:type", Number)
], DriverDTO.prototype, "carColorId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    tslib_1.__metadata("design:type", Number)
], DriverDTO.prototype, "searchDistance", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => Boolean, { middleware: [
            (ctx, next) => {
                if (process.env.HIDDEN_WALLETS == null)
                    return false;
                common_1.Logger.log(`looking for hidden wallet ${process.env.HIDDEN_WALLETS.split(',').includes(ctx.context.req.user.id.toString())}`);
                return process.env.HIDDEN_WALLETS.split(',').includes(ctx.context.req.user.id.toString());
            },
        ] }),
    tslib_1.__metadata("design:type", Boolean)
], DriverDTO.prototype, "isWalletHidden", void 0);
exports.DriverDTO = DriverDTO = tslib_1.__decorate([
    (0, graphql_1.ObjectType)('Driver'),
    (0, nestjs_query_graphql_1.Authorize)({
        authorize: (context) => ({ id: { eq: context.req.user.id } }),
    }),
    (0, nestjs_query_graphql_1.BeforeFindOne)((input, context) => {
        return { id: context.req.user.id };
    }),
    (0, nestjs_query_graphql_1.BeforeUpdateOne)((input, context) => {
        return { id: context.req.user.id, update: input.update };
    }),
    (0, nestjs_query_graphql_1.UnPagedRelation)('documents', () => media_dto_1.MediaDTO, {
        update: { enabled: true },
        nullable: true,
    }),
    (0, nestjs_query_graphql_1.Relation)('car', () => car_model_dto_1.CarModelDTO, {
        nullable: true,
    }),
    (0, nestjs_query_graphql_1.Relation)('carColor', () => car_color_dto_1.CarColorDTO, {
        nullable: true,
    }),
    (0, nestjs_query_graphql_1.Relation)('media', () => media_dto_1.MediaDTO, {
        nullable: true,
    }),
    (0, nestjs_query_graphql_1.OffsetConnection)('historyOrders', () => order_dto_1.OrderDTO, {
        relationName: 'orders',
        enableAggregate: true,
    }),
    (0, nestjs_query_graphql_1.UnPagedRelation)('savedPaymentMethods', () => saved_payment_method_dto_1.SavedPaymentMethodDto),
    (0, nestjs_query_graphql_1.OffsetConnection)('orders', () => order_dto_1.OrderDTO, {
        maxResultsSize: 1,
        defaultFilter: {
            status: {
                in: [
                    order_status_enum_1.OrderStatus.DriverAccepted,
                    order_status_enum_1.OrderStatus.Arrived,
                    order_status_enum_1.OrderStatus.Started,
                    order_status_enum_1.OrderStatus.WaitingForPostPay,
                ],
            },
        },
        defaultSort: [{ field: 'id', direction: nestjs_query_core_1.SortDirection.DESC }],
        defaultResultSize: 1,
    }) // This is essentially same as currentOrders and should be phased out. In most build prior to v2.3.x the chat feature relied on this
    ,
    (0, nestjs_query_graphql_1.UnPagedRelation)('currentOrders', () => order_dto_1.OrderDTO, {
        maxResultsSize: 1,
        defaultFilter: {
            status: {
                in: [
                    order_status_enum_1.OrderStatus.DriverAccepted,
                    order_status_enum_1.OrderStatus.Arrived,
                    order_status_enum_1.OrderStatus.Started,
                    order_status_enum_1.OrderStatus.WaitingForPostPay,
                ],
            },
        },
        defaultSort: [{ field: 'id', direction: nestjs_query_core_1.SortDirection.DESC }],
        defaultResultSize: 1,
        relationName: 'orders',
    }),
    (0, nestjs_query_graphql_1.UnPagedRelation)('enabledServices', () => service_dto_1.ServiceDTO),
    (0, nestjs_query_graphql_1.OffsetConnection)('transactions', () => driver_transaction_dto_1.DriverTransactionDTO),
    (0, nestjs_query_graphql_1.UnPagedRelation)('wallet', () => driver_wallet_dto_1.DriverWalletDTO, {
        relationName: 'wallet',
    })
], DriverDTO);


/***/ }),
/* 121 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CarModelDTO = void 0;
const tslib_1 = __webpack_require__(1);
const nestjs_query_graphql_1 = __webpack_require__(107);
const graphql_1 = __webpack_require__(9);
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
    (0, graphql_1.ObjectType)('CarModel')
], CarModelDTO);


/***/ }),
/* 122 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CarColorDTO = void 0;
const tslib_1 = __webpack_require__(1);
const nestjs_query_graphql_1 = __webpack_require__(107);
const graphql_1 = __webpack_require__(9);
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
    (0, graphql_1.ObjectType)('CarColor')
], CarColorDTO);


/***/ }),
/* 123 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderDTO = void 0;
const tslib_1 = __webpack_require__(1);
const eager_import_0 = __webpack_require__(81);
const eager_import_1 = __webpack_require__(76);
const eager_import_2 = __webpack_require__(93);
const nestjs_query_graphql_1 = __webpack_require__(107);
const graphql_1 = __webpack_require__(9);
const order_status_enum_1 = __webpack_require__(81);
const rider_dto_1 = __webpack_require__(124);
const service_dto_1 = __webpack_require__(127);
const order_message_dto_1 = __webpack_require__(128);
const driver_dto_1 = __webpack_require__(120);
const service_option_dto_1 = __webpack_require__(129);
const payment_gateway_dto_1 = __webpack_require__(130);
const saved_payment_method_dto_1 = __webpack_require__(132);
let OrderDTO = class OrderDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, status: { type: () => (__webpack_require__(81).OrderStatus) }, createdOn: { type: () => Date }, distanceBest: { type: () => Number }, startTimestamp: { nullable: true, type: () => Date }, finishTimestamp: { nullable: true, type: () => Date }, etaPickup: { nullable: true, type: () => Date }, waitMinutes: { type: () => Number }, waitCost: { type: () => Number }, rideOptionsCost: { type: () => Number }, taxCost: { type: () => Number }, serviceCost: { type: () => Number }, driverLastSeenMessagesAt: { type: () => Date }, riderLastSeenMessagesAt: { type: () => Date }, expectedTimestamp: { type: () => Date }, costBest: { type: () => Number }, costAfterCoupon: { type: () => Number }, providerShare: { type: () => Number }, paidAmount: { type: () => Number }, currency: { type: () => String }, driverId: { nullable: true, type: () => Number }, addresses: { type: () => [String] }, points: { type: () => [(__webpack_require__(76).Point)] }, tipAmount: { type: () => Number }, paymentMode: { nullable: true, type: () => (__webpack_require__(93).PaymentMode) }, paymentGatewayId: { nullable: true, type: () => Number }, paymentMethodId: { nullable: true, type: () => Number }, directions: { nullable: true, type: () => [(__webpack_require__(76).Point)] }, driverDirections: { nullable: true, type: () => [(__webpack_require__(76).Point)] } };
    }
};
exports.OrderDTO = OrderDTO;
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.IDField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], OrderDTO.prototype, "id", void 0);
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.FilterableField)(() => order_status_enum_1.OrderStatus),
    tslib_1.__metadata("design:type", String)
], OrderDTO.prototype, "status", void 0);
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.FilterableField)(),
    tslib_1.__metadata("design:type", Date)
], OrderDTO.prototype, "createdOn", void 0);
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.FilterableField)(() => graphql_1.Int),
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
    (0, nestjs_query_graphql_1.FilterableField)(),
    tslib_1.__metadata("design:type", Number)
], OrderDTO.prototype, "costBest", void 0);
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.FilterableField)(() => graphql_1.ID, { filterOnly: true }),
    tslib_1.__metadata("design:type", Number)
], OrderDTO.prototype, "driverId", void 0);
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.FilterableField)(() => graphql_1.ID, { nullable: true }),
    tslib_1.__metadata("design:type", Number)
], OrderDTO.prototype, "paymentGatewayId", void 0);
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.FilterableField)(() => graphql_1.ID, { nullable: true }),
    tslib_1.__metadata("design:type", Number)
], OrderDTO.prototype, "paymentMethodId", void 0);
exports.OrderDTO = OrderDTO = tslib_1.__decorate([
    (0, graphql_1.ObjectType)('Order'),
    (0, nestjs_query_graphql_1.Authorize)({
        authorize: (context) => ({ driverId: { eq: context.req.user.id } }),
    }),
    (0, nestjs_query_graphql_1.Relation)('driver', () => driver_dto_1.DriverDTO, {
        nullable: true,
    }),
    (0, nestjs_query_graphql_1.Relation)('rider', () => rider_dto_1.RiderDTO, {
        nullable: true,
    }),
    (0, nestjs_query_graphql_1.Relation)('service', () => service_dto_1.ServiceDTO, {
        nullable: true,
    }),
    (0, nestjs_query_graphql_1.Relation)('paymentGateway', () => payment_gateway_dto_1.PaymentGatewayDTO, {
        nullable: true,
    }),
    (0, nestjs_query_graphql_1.Relation)('savedPaymentMethod', () => saved_payment_method_dto_1.SavedPaymentMethodDto, {
        nullable: true,
    }),
    (0, nestjs_query_graphql_1.UnPagedRelation)('options', () => service_option_dto_1.ServiceOptionDTO),
    (0, nestjs_query_graphql_1.UnPagedRelation)('conversation', () => order_message_dto_1.OrderMessageDTO, {
        relationName: 'conversation',
    })
], OrderDTO);


/***/ }),
/* 124 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RiderDTO = void 0;
const tslib_1 = __webpack_require__(1);
const nestjs_query_graphql_1 = __webpack_require__(107);
const graphql_1 = __webpack_require__(9);
const media_dto_1 = __webpack_require__(125);
const rider_wallet_dto_1 = __webpack_require__(126);
let RiderDTO = class RiderDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, firstName: { nullable: true, type: () => String }, lastName: { nullable: true, type: () => String }, mobileNumber: { type: () => String } };
    }
};
exports.RiderDTO = RiderDTO;
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.IDField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], RiderDTO.prototype, "id", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    tslib_1.__metadata("design:type", Number)
], RiderDTO.prototype, "presetAvatarNumber", void 0);
exports.RiderDTO = RiderDTO = tslib_1.__decorate([
    (0, graphql_1.ObjectType)('Rider'),
    (0, nestjs_query_graphql_1.Relation)('media', () => media_dto_1.MediaDTO, {
        nullable: true,
    }),
    (0, nestjs_query_graphql_1.UnPagedRelation)('wallets', () => rider_wallet_dto_1.RiderWalletDTO)
], RiderDTO);


/***/ }),
/* 125 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MediaDTO = void 0;
const tslib_1 = __webpack_require__(1);
const nestjs_query_graphql_1 = __webpack_require__(107);
const graphql_1 = __webpack_require__(9);
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
/* 126 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RiderWalletDTO = void 0;
const tslib_1 = __webpack_require__(1);
const nestjs_query_graphql_1 = __webpack_require__(107);
const graphql_1 = __webpack_require__(9);
let RiderWalletDTO = class RiderWalletDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, balance: { type: () => Number }, currency: { type: () => String }, riderId: { type: () => Number } };
    }
};
exports.RiderWalletDTO = RiderWalletDTO;
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.IDField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], RiderWalletDTO.prototype, "id", void 0);
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.FilterableField)(() => graphql_1.ID, { filterOnly: true }),
    tslib_1.__metadata("design:type", Number)
], RiderWalletDTO.prototype, "riderId", void 0);
exports.RiderWalletDTO = RiderWalletDTO = tslib_1.__decorate([
    (0, graphql_1.ObjectType)('RiderWallet'),
    (0, nestjs_query_graphql_1.Authorize)({
        authorize: (context) => ({
            riderId: { eq: context.req.user.id },
        }),
    })
], RiderWalletDTO);


/***/ }),
/* 127 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceDTO = void 0;
const tslib_1 = __webpack_require__(1);
const eager_import_0 = __webpack_require__(60);
const nestjs_query_graphql_1 = __webpack_require__(107);
const graphql_1 = __webpack_require__(9);
const media_dto_1 = __webpack_require__(125);
let ServiceDTO = class ServiceDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, name: { type: () => String }, paymentMethod: { type: () => (__webpack_require__(60).ServicePaymentMethod) }, cancellationTotalFee: { type: () => Number } };
    }
};
exports.ServiceDTO = ServiceDTO;
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.IDField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], ServiceDTO.prototype, "id", void 0);
exports.ServiceDTO = ServiceDTO = tslib_1.__decorate([
    (0, graphql_1.ObjectType)('Service'),
    (0, nestjs_query_graphql_1.Relation)('media', () => media_dto_1.MediaDTO)
], ServiceDTO);


/***/ }),
/* 128 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderMessageDTO = void 0;
const tslib_1 = __webpack_require__(1);
const eager_import_0 = __webpack_require__(85);
const nestjs_query_graphql_1 = __webpack_require__(107);
const graphql_1 = __webpack_require__(9);
const order_dto_1 = __webpack_require__(123);
let OrderMessageDTO = class OrderMessageDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, sentAt: { type: () => Date }, status: { type: () => (__webpack_require__(85).MessageStatus) }, content: { type: () => String }, sentByDriver: { type: () => Boolean }, requestId: { type: () => Number } };
    }
};
exports.OrderMessageDTO = OrderMessageDTO;
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.IDField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], OrderMessageDTO.prototype, "id", void 0);
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.FilterableField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], OrderMessageDTO.prototype, "requestId", void 0);
exports.OrderMessageDTO = OrderMessageDTO = tslib_1.__decorate([
    (0, graphql_1.ObjectType)('OrderMessage'),
    (0, nestjs_query_graphql_1.Relation)('request', () => order_dto_1.OrderDTO)
], OrderMessageDTO);


/***/ }),
/* 129 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceOptionDTO = void 0;
const tslib_1 = __webpack_require__(1);
const eager_import_0 = __webpack_require__(66);
const eager_import_1 = __webpack_require__(65);
const nestjs_query_graphql_1 = __webpack_require__(107);
const graphql_1 = __webpack_require__(9);
let ServiceOptionDTO = class ServiceOptionDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, name: { type: () => String }, description: { nullable: true, type: () => String }, type: { type: () => (__webpack_require__(66).ServiceOptionType) }, additionalFee: { nullable: true, type: () => Number }, icon: { type: () => (__webpack_require__(65).ServiceOptionIcon) } };
    }
};
exports.ServiceOptionDTO = ServiceOptionDTO;
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.IDField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], ServiceOptionDTO.prototype, "id", void 0);
exports.ServiceOptionDTO = ServiceOptionDTO = tslib_1.__decorate([
    (0, graphql_1.ObjectType)('ServiceOption')
], ServiceOptionDTO);


/***/ }),
/* 130 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PaymentGatewayDTO = void 0;
const tslib_1 = __webpack_require__(1);
const eager_import_0 = __webpack_require__(43);
const nestjs_query_graphql_1 = __webpack_require__(107);
const graphql_1 = __webpack_require__(9);
const payment_gateway_type_enum_1 = __webpack_require__(43);
const media_dto_1 = __webpack_require__(125);
const gateway_link_method_1 = __webpack_require__(131);
let PaymentGatewayDTO = class PaymentGatewayDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, enabled: { type: () => Boolean }, title: { type: () => String }, type: { type: () => (__webpack_require__(43).PaymentGatewayType) }, publicKey: { nullable: true, type: () => String } };
    }
};
exports.PaymentGatewayDTO = PaymentGatewayDTO;
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.IDField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], PaymentGatewayDTO.prototype, "id", void 0);
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.FilterableField)(),
    tslib_1.__metadata("design:type", Boolean)
], PaymentGatewayDTO.prototype, "enabled", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => gateway_link_method_1.GatewayLinkMethod, { middleware: [
            async (ctx, next) => {
                const type = ctx.source.type;
                return type === payment_gateway_type_enum_1.PaymentGatewayType.Stripe
                    ? gateway_link_method_1.GatewayLinkMethod.redirect
                    : gateway_link_method_1.GatewayLinkMethod.none;
            },
        ] }),
    tslib_1.__metadata("design:type", String)
], PaymentGatewayDTO.prototype, "linkMethod", void 0);
exports.PaymentGatewayDTO = PaymentGatewayDTO = tslib_1.__decorate([
    (0, graphql_1.ObjectType)('PaymentGateway'),
    (0, nestjs_query_graphql_1.Authorize)({
        authorize: (context) => ({ enabled: { is: true } }),
    }),
    (0, nestjs_query_graphql_1.Relation)('media', () => media_dto_1.MediaDTO, {
        nullable: true,
    })
], PaymentGatewayDTO);


/***/ }),
/* 131 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GatewayLinkMethod = void 0;
const graphql_1 = __webpack_require__(9);
var GatewayLinkMethod;
(function (GatewayLinkMethod) {
    GatewayLinkMethod["none"] = "none";
    GatewayLinkMethod["redirect"] = "redirect";
    GatewayLinkMethod["manual"] = "manual";
})(GatewayLinkMethod || (exports.GatewayLinkMethod = GatewayLinkMethod = {}));
(0, graphql_1.registerEnumType)(GatewayLinkMethod, {
    name: 'GatewayLinkMethod',
    description: 'Method of connecting to a payout or saved payment method.',
});


/***/ }),
/* 132 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SavedPaymentMethodDto = void 0;
const tslib_1 = __webpack_require__(1);
const eager_import_0 = __webpack_require__(49);
const eager_import_1 = __webpack_require__(50);
const graphql_1 = __webpack_require__(9);
const nestjs_query_graphql_1 = __webpack_require__(107);
let SavedPaymentMethodDto = class SavedPaymentMethodDto {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, type: { type: () => (__webpack_require__(49).SavedPaymentMethodType) }, lastFour: { nullable: true, type: () => String }, isEnabled: { type: () => Boolean }, isDefault: { type: () => Boolean }, providerBrand: { nullable: true, type: () => (__webpack_require__(50).ProviderBrand) }, title: { type: () => String }, expiryDate: { nullable: true, type: () => Date }, holderName: { nullable: true, type: () => String }, driverId: { nullable: true, type: () => Number } };
    }
};
exports.SavedPaymentMethodDto = SavedPaymentMethodDto;
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.IDField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], SavedPaymentMethodDto.prototype, "id", void 0);
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.FilterableField)(() => graphql_1.ID, { filterOnly: true }),
    tslib_1.__metadata("design:type", Number)
], SavedPaymentMethodDto.prototype, "driverId", void 0);
exports.SavedPaymentMethodDto = SavedPaymentMethodDto = tslib_1.__decorate([
    (0, graphql_1.ObjectType)('SavedPaymentMethod'),
    (0, nestjs_query_graphql_1.Authorize)({
        authorize: (context) => ({
            driverId: { eq: context.req.user.id },
        }),
    })
], SavedPaymentMethodDto);


/***/ }),
/* 133 */
/***/ ((module) => {

module.exports = require("@ptc-org/nestjs-query-core");

/***/ }),
/* 134 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DriverWalletDTO = void 0;
const tslib_1 = __webpack_require__(1);
const nestjs_query_graphql_1 = __webpack_require__(107);
const graphql_1 = __webpack_require__(9);
let DriverWalletDTO = class DriverWalletDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, balance: { type: () => Number }, currency: { type: () => String }, driverId: { type: () => Number } };
    }
};
exports.DriverWalletDTO = DriverWalletDTO;
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.IDField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], DriverWalletDTO.prototype, "id", void 0);
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.FilterableField)(() => graphql_1.ID, { filterOnly: true }),
    tslib_1.__metadata("design:type", Number)
], DriverWalletDTO.prototype, "driverId", void 0);
exports.DriverWalletDTO = DriverWalletDTO = tslib_1.__decorate([
    (0, graphql_1.ObjectType)('DriverWallet'),
    (0, nestjs_query_graphql_1.Authorize)({
        authorize: (context) => ({
            driverId: { eq: context.req.user.id },
        }),
    })
], DriverWalletDTO);


/***/ }),
/* 135 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DriverTransactionDTO = void 0;
const tslib_1 = __webpack_require__(1);
const eager_import_0 = __webpack_require__(21);
const eager_import_1 = __webpack_require__(19);
const eager_import_2 = __webpack_require__(20);
const nestjs_query_graphql_1 = __webpack_require__(107);
const graphql_1 = __webpack_require__(9);
let DriverTransactionDTO = class DriverTransactionDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, createdAt: { type: () => Date }, action: { type: () => (__webpack_require__(21).TransactionAction) }, deductType: { nullable: true, type: () => (__webpack_require__(19).DriverDeductTransactionType) }, rechargeType: { nullable: true, type: () => (__webpack_require__(20).DriverRechargeTransactionType) }, amount: { type: () => Number }, currency: { type: () => String }, refrenceNumber: { nullable: true, type: () => String }, driverId: { type: () => Number } };
    }
};
exports.DriverTransactionDTO = DriverTransactionDTO;
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.IDField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], DriverTransactionDTO.prototype, "id", void 0);
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.FilterableField)(() => graphql_1.ID, { filterOnly: true }),
    tslib_1.__metadata("design:type", Number)
], DriverTransactionDTO.prototype, "driverId", void 0);
exports.DriverTransactionDTO = DriverTransactionDTO = tslib_1.__decorate([
    (0, graphql_1.ObjectType)('DriverTransacion'),
    (0, nestjs_query_graphql_1.Authorize)({
        authorize: (context) => ({
            driverId: { eq: context.req.user.id },
        }),
    })
], DriverTransactionDTO);


/***/ }),
/* 136 */
/***/ ((module) => {

module.exports = require("@ptc-org/nestjs-query-typeorm");

/***/ }),
/* 137 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GqlAuthGuard = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const graphql_1 = __webpack_require__(9);
const passport_1 = __webpack_require__(115);
const apollo_1 = __webpack_require__(138);
let GqlAuthGuard = class GqlAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    getRequest(context) {
        const ctx = graphql_1.GqlExecutionContext.create(context).getContext();
        //const { req, connection } = ctx.getContext();
        return ctx.req ? ctx.req : { user: ctx };
    }
    canActivate(context) {
        if (context.getArgs()[2].id != null) {
            return true;
        }
        /*const ctx = GqlExecutionContext.create(context);
        const { req } = ctx.getContext();*/
        //const req = this.getRequest(context);
        return super.canActivate(context);
    }
    // canActivate(context: ExecutionContext) {
    //   const ctx = GqlExecutionContext.create(context);
    //   const { req } = ctx.getContext();
    //   return super.canActivate(
    //     new ExecutionContextHost([req]),
    //   );
    // }
    handleRequest(err, user) {
        if (err || !user) {
            throw err || new apollo_1.AuthenticationError('GqlAuthGuard');
        }
        return user;
    }
};
exports.GqlAuthGuard = GqlAuthGuard;
exports.GqlAuthGuard = GqlAuthGuard = tslib_1.__decorate([
    (0, common_1.Injectable)()
], GqlAuthGuard);


/***/ }),
/* 138 */
/***/ ((module) => {

module.exports = require("@nestjs/apollo");

/***/ }),
/* 139 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RedisHelpersModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(11);
const driver_transaction_entity_1 = __webpack_require__(18);
const driver_wallet_entity_1 = __webpack_require__(98);
const driver_entity_1 = __webpack_require__(16);
const shared_driver_service_1 = __webpack_require__(140);
const driver_redis_service_1 = __webpack_require__(119);
const order_redis_service_1 = __webpack_require__(141);
const auth_redis_service_1 = __webpack_require__(142);
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
/* 140 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SharedDriverService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(11);
const typeorm_2 = __webpack_require__(14);
const driver_transaction_entity_1 = __webpack_require__(18);
const driver_wallet_entity_1 = __webpack_require__(98);
const driver_entity_1 = __webpack_require__(16);
const driver_status_enum_1 = __webpack_require__(99);
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
/* 141 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderRedisService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const nestjs_redis_1 = __webpack_require__(112);
const ioredis_1 = __webpack_require__(109);
const shared_driver_service_1 = __webpack_require__(140);
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
/* 142 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VerifyHash = exports.AuthRedisService = void 0;
const tslib_1 = __webpack_require__(1);
const apollo_1 = __webpack_require__(138);
const common_1 = __webpack_require__(2);
const nestjs_redis_1 = __webpack_require__(112);
const ioredis_1 = tslib_1.__importDefault(__webpack_require__(109));
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
/* 143 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UploadModule = void 0;
const tslib_1 = __webpack_require__(1);
const nestjs_query_graphql_1 = __webpack_require__(107);
const nestjs_query_typeorm_1 = __webpack_require__(136);
const common_1 = __webpack_require__(2);
const driver_entity_1 = __webpack_require__(16);
const media_entity_1 = __webpack_require__(34);
const media_dto_1 = __webpack_require__(125);
const upload_service_1 = __webpack_require__(144);
let UploadModule = class UploadModule {
};
exports.UploadModule = UploadModule;
exports.UploadModule = UploadModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_query_graphql_1.NestjsQueryGraphQLModule.forFeature({
                imports: [
                    nestjs_query_typeorm_1.NestjsQueryTypeOrmModule.forFeature([media_entity_1.MediaEntity, driver_entity_1.DriverEntity]),
                ],
                resolvers: [
                    {
                        EntityClass: media_entity_1.MediaEntity,
                        DTOClass: media_dto_1.MediaDTO,
                        create: { disabled: true },
                        read: { disabled: true },
                        delete: { disabled: true },
                        update: { disabled: true },
                    },
                ],
            }),
        ],
        providers: [upload_service_1.UploadService],
        exports: [upload_service_1.UploadService, nestjs_query_graphql_1.NestjsQueryGraphQLModule],
    })
], UploadModule);


/***/ }),
/* 144 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UploadService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const fs = tslib_1.__importStar(__webpack_require__(116));
const stream = __webpack_require__(145);
const util = tslib_1.__importStar(__webpack_require__(146));
const path_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(11);
const media_entity_1 = __webpack_require__(34);
const typeorm_2 = __webpack_require__(14);
const driver_entity_1 = __webpack_require__(16);
let UploadService = class UploadService {
    constructor(mediaRepository, driverRepository) {
        this.mediaRepository = mediaRepository;
        this.driverRepository = driverRepository;
    }
    async uploadMedia(req, res, dir, driverId, type, fileNamePrefix) {
        //Check request is multipart
        if (!req.isMultipart()) {
            res.send(new common_1.BadRequestException());
            return;
        }
        let _fileName = '';
        const mp = await req.multipart(async (field, file, filename, encoding, mimetype) => {
            const pipeline = util.promisify(stream.pipeline);
            await fs.promises.mkdir(dir, { recursive: true });
            _fileName = (0, path_1.join)(dir, fileNamePrefix != null ? `${fileNamePrefix}-${filename}` : filename);
            const writeStream = fs.createWriteStream((0, path_1.join)(process.cwd(), _fileName));
            try {
                await pipeline(file, writeStream);
            }
            catch (err) {
                console.error('Pipeline failed', err);
            }
        }, async (err) => {
            if (err) {
                res.send(new common_1.HttpException('Internal server error', 500));
                return;
            }
            if (type == 'PROFILE') {
                const insert = await this.mediaRepository.insert({ address: _fileName });
                await this.driverRepository.update(driverId, { mediaId: insert.raw.insertId });
                res.code(200).send({ id: insert.raw.insertId, address: _fileName });
            }
            else {
                const insert = await this.mediaRepository.insert({ address: _fileName, driverDocumentId: driverId });
                res.code(200).send({ id: insert.raw.insertId, address: _fileName });
            }
        });
        // for key value pairs in request
        // mp.on('field', function (key: any, value: any) {
        //   //console.log('form-data', key, value);
        // });
    }
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(media_entity_1.MediaEntity)),
    tslib_1.__param(1, (0, typeorm_1.InjectRepository)(driver_entity_1.DriverEntity)),
    tslib_1.__metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UploadService);


/***/ }),
/* 145 */
/***/ ((module) => {

module.exports = require("stream");

/***/ }),
/* 146 */
/***/ ((module) => {

module.exports = require("util");

/***/ }),
/* 147 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DriverQueryService = void 0;
const tslib_1 = __webpack_require__(1);
const nestjs_query_core_1 = __webpack_require__(133);
const nestjs_query_typeorm_1 = __webpack_require__(136);
const common_1 = __webpack_require__(2);
const graphql_1 = __webpack_require__(9);
const typeorm_1 = __webpack_require__(11);
const driver_entity_1 = __webpack_require__(16);
const driver_status_enum_1 = __webpack_require__(99);
const service_entity_1 = __webpack_require__(56);
const driver_redis_service_1 = __webpack_require__(119);
const typeorm_2 = __webpack_require__(14);
let DriverQueryService = class DriverQueryService extends nestjs_query_typeorm_1.TypeOrmQueryService {
    constructor(driverReposotriy, serviceRepository, driverRedisService, context) {
        super(driverReposotriy);
        this.driverReposotriy = driverReposotriy;
        this.serviceRepository = serviceRepository;
        this.driverRedisService = driverRedisService;
        this.context = context;
    }
    async updateOne(id, update, opts) {
        id = this.context.req.user.id;
        const allowedStatuses = [
            driver_status_enum_1.DriverStatus.Offline,
            driver_status_enum_1.DriverStatus.Online,
            driver_status_enum_1.DriverStatus.WaitingDocuments,
            driver_status_enum_1.DriverStatus.SoftReject,
        ];
        const isNotAllowed = allowedStatuses.filter((status) => driver_status_enum_1.DriverStatus[status] == driver_status_enum_1.DriverStatus[update.status]).length < 1;
        if (update.status && isNotAllowed) {
            delete update.status;
        }
        if (update.status == driver_status_enum_1.DriverStatus.PendingApproval &&
            process.env.DEMO_MODE != null) {
            update.status = driver_status_enum_1.DriverStatus.Offline;
            const services = await this.serviceRepository.find();
            await this.driverReposotriy.save({
                id: id,
                enabledServices: services,
            });
        }
        if (update.status == driver_status_enum_1.DriverStatus.Offline) {
            await this.driverRedisService.expire([id]);
        }
        return super.updateOne(id, update, opts);
    }
};
exports.DriverQueryService = DriverQueryService;
exports.DriverQueryService = DriverQueryService = tslib_1.__decorate([
    (0, nestjs_query_core_1.QueryService)(driver_entity_1.DriverEntity),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(driver_entity_1.DriverEntity)),
    tslib_1.__param(1, (0, typeorm_1.InjectRepository)(service_entity_1.ServiceEntity)),
    tslib_1.__param(3, (0, common_1.Inject)(graphql_1.CONTEXT)),
    tslib_1.__metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        driver_redis_service_1.DriverRedisService, Object])
], DriverQueryService);


/***/ }),
/* 148 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateDriverInput = void 0;
const tslib_1 = __webpack_require__(1);
const eager_import_0 = __webpack_require__(99);
const eager_import_1 = __webpack_require__(31);
const graphql_1 = __webpack_require__(9);
let UpdateDriverInput = class UpdateDriverInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { firstName: { nullable: true, type: () => String }, lastName: { nullable: true, type: () => String }, status: { nullable: true, type: () => (__webpack_require__(99).DriverStatus) }, certificateNumber: { nullable: true, type: () => String }, email: { nullable: true, type: () => String }, carPlate: { nullable: true, type: () => String }, gender: { nullable: true, type: () => (__webpack_require__(31).Gender) }, accountNumber: { nullable: true, type: () => String }, bankName: { nullable: true, type: () => String }, bankRoutingNumber: { nullable: true, type: () => String }, password: { nullable: true, type: () => String }, bankSwift: { nullable: true, type: () => String }, address: { nullable: true, type: () => String }, notificationPlayerId: { nullable: true, type: () => String } };
    }
};
exports.UpdateDriverInput = UpdateDriverInput;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    tslib_1.__metadata("design:type", Number)
], UpdateDriverInput.prototype, "carProductionYear", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, { nullable: true }),
    tslib_1.__metadata("design:type", Number)
], UpdateDriverInput.prototype, "mediaId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    tslib_1.__metadata("design:type", Number)
], UpdateDriverInput.prototype, "presetAvatarNumber", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, { nullable: true }),
    tslib_1.__metadata("design:type", Number)
], UpdateDriverInput.prototype, "carModelId", void 0);
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
], UpdateDriverInput.prototype, "searchDistance", void 0);
exports.UpdateDriverInput = UpdateDriverInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], UpdateDriverInput);


/***/ }),
/* 149 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderModule = void 0;
const tslib_1 = __webpack_require__(1);
const nestjs_query_graphql_1 = __webpack_require__(107);
const nestjs_query_typeorm_1 = __webpack_require__(136);
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(11);
const database_1 = __webpack_require__(12);
const driver_transaction_entity_1 = __webpack_require__(18);
const driver_wallet_entity_1 = __webpack_require__(98);
const driver_entity_1 = __webpack_require__(16);
const request_entity_1 = __webpack_require__(27);
const provider_transaction_entity_1 = __webpack_require__(44);
const provider_wallet_entity_1 = __webpack_require__(100);
const rider_entity_1 = __webpack_require__(30);
const rider_transaction_entity_1 = __webpack_require__(38);
const rider_wallet_entity_1 = __webpack_require__(79);
const service_category_entity_1 = __webpack_require__(63);
const service_entity_1 = __webpack_require__(56);
const payment_entity_1 = __webpack_require__(101);
const firebase_notification_service_module_1 = __webpack_require__(150);
const google_services_module_1 = __webpack_require__(154);
const shared_order_service_1 = __webpack_require__(158);
const shared_provider_service_1 = __webpack_require__(164);
const shared_fleet_service_1 = __webpack_require__(163);
const region_module_1 = __webpack_require__(167);
const shared_rider_service_1 = __webpack_require__(165);
const service_service_1 = __webpack_require__(162);
const order_dto_1 = __webpack_require__(123);
const order_resolver_1 = __webpack_require__(168);
const driver_order_query_service_1 = __webpack_require__(169);
const redis_helper_module_1 = __webpack_require__(139);
const cron_job_service_1 = __webpack_require__(173);
const driver_module_1 = __webpack_require__(117);
const shared_driver_service_1 = __webpack_require__(140);
const order_service_1 = __webpack_require__(170);
const fleet_wallet_entity_1 = __webpack_require__(72);
const fleet_transaction_entity_1 = __webpack_require__(71);
const order_subscription_service_1 = __webpack_require__(174);
const rider_dto_1 = __webpack_require__(124);
const request_activity_entity_1 = __webpack_require__(86);
const fleet_entity_1 = __webpack_require__(68);
const service_option_entity_1 = __webpack_require__(64);
const coupon_1 = __webpack_require__(175);
const zone_price_entity_1 = __webpack_require__(67);
const axios_1 = __webpack_require__(160);
const order_cancel_reason_entity_1 = __webpack_require__(92);
const cancel_reason_dto_1 = __webpack_require__(178);
const rider_review_entity_1 = __webpack_require__(80);
let OrderModule = class OrderModule {
};
exports.OrderModule = OrderModule;
exports.OrderModule = OrderModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            redis_helper_module_1.RedisHelpersModule,
            driver_module_1.DriverModule,
            coupon_1.CommonCouponModule,
            typeorm_1.TypeOrmModule.forFeature([
                request_entity_1.RequestEntity,
                service_category_entity_1.ServiceCategoryEntity,
                service_option_entity_1.ServiceOptionEntity,
                service_entity_1.ServiceEntity,
                rider_entity_1.RiderEntity,
                rider_wallet_entity_1.RiderWalletEntity,
                rider_transaction_entity_1.RiderTransactionEntity,
                driver_entity_1.DriverEntity,
                driver_wallet_entity_1.DriverWalletEntity,
                driver_transaction_entity_1.DriverTransactionEntity,
                provider_wallet_entity_1.ProviderWalletEntity,
                provider_transaction_entity_1.ProviderTransactionEntity,
                fleet_entity_1.FleetEntity,
                fleet_wallet_entity_1.FleetWalletEntity,
                fleet_transaction_entity_1.FleetTransactionEntity,
                zone_price_entity_1.ZonePriceEntity,
                payment_entity_1.PaymentEntity,
                rider_review_entity_1.RiderReviewEntity,
            ]),
            region_module_1.RegionModule,
            axios_1.HttpModule,
            firebase_notification_service_module_1.FirebaseNotificationModule.register(),
            google_services_module_1.GoogleServicesModule,
            nestjs_query_graphql_1.NestjsQueryGraphQLModule.forFeature({
                imports: [
                    nestjs_query_typeorm_1.NestjsQueryTypeOrmModule.forFeature([
                        request_entity_1.RequestEntity,
                        rider_entity_1.RiderEntity,
                        request_activity_entity_1.RequestActivityEntity,
                        order_cancel_reason_entity_1.OrderCancelReasonEntity,
                    ]),
                ],
                pubSub: database_1.RedisPubSubProvider.provider(),
                dtos: [{ DTOClass: order_dto_1.OrderDTO }],
                resolvers: [
                    {
                        DTOClass: rider_dto_1.RiderDTO,
                        EntityClass: rider_entity_1.RiderEntity,
                        read: { disabled: true },
                        create: { disabled: true },
                        update: { disabled: true },
                        delete: { disabled: true },
                    },
                    {
                        DTOClass: cancel_reason_dto_1.OrderCancelReasonDTO,
                        EntityClass: order_cancel_reason_entity_1.OrderCancelReasonEntity,
                        read: { one: { disabled: false } },
                        create: { disabled: true },
                        update: { disabled: true },
                        delete: { disabled: true },
                        pagingStrategy: nestjs_query_graphql_1.PagingStrategies.NONE,
                    },
                ],
            }),
        ],
        providers: [
            order_subscription_service_1.OrderSubscriptionService,
            shared_order_service_1.SharedOrderService,
            driver_order_query_service_1.DriverOrderQueryService,
            order_resolver_1.OrderResolver,
            order_service_1.OrderService,
            service_service_1.ServiceService,
            shared_rider_service_1.SharedRiderService,
            shared_driver_service_1.SharedDriverService,
            shared_provider_service_1.SharedProviderService,
            shared_fleet_service_1.SharedFleetService,
            database_1.RedisPubSubProvider.provider(),
            cron_job_service_1.CronJobService,
        ],
        exports: [driver_order_query_service_1.DriverOrderQueryService, shared_driver_service_1.SharedDriverService],
    })
], OrderModule);


/***/ }),
/* 150 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var FirebaseNotificationModule_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FirebaseNotificationModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const fs_1 = __webpack_require__(116);
const driver_notification_service_1 = __webpack_require__(151);
const rider_notification_service_1 = __webpack_require__(153);
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
            providers: [driver_notification_service_1.DriverNotificationService, rider_notification_service_1.RiderNotificationService],
            exports: [driver_notification_service_1.DriverNotificationService, rider_notification_service_1.RiderNotificationService],
        };
    }
};
exports.FirebaseNotificationModule = FirebaseNotificationModule;
exports.FirebaseNotificationModule = FirebaseNotificationModule = FirebaseNotificationModule_1 = tslib_1.__decorate([
    (0, common_1.Module)({})
], FirebaseNotificationModule);


/***/ }),
/* 151 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DriverNotificationService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const firebase_admin_1 = __webpack_require__(152);
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
/* 152 */
/***/ ((module) => {

module.exports = require("firebase-admin");

/***/ }),
/* 153 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RiderNotificationService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const firebase_admin_1 = __webpack_require__(152);
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
/* 154 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GoogleServicesModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const shared_configuration_service_1 = __webpack_require__(155);
const google_services_service_1 = __webpack_require__(156);
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
/* 155 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SharedConfigurationService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const fs = tslib_1.__importStar(__webpack_require__(116));
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
/* 156 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GoogleServicesService = void 0;
const tslib_1 = __webpack_require__(1);
const google_maps_services_js_1 = __webpack_require__(157);
const common_1 = __webpack_require__(2);
const apollo_1 = __webpack_require__(138);
const shared_configuration_service_1 = __webpack_require__(155);
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
/* 157 */
/***/ ((module) => {

module.exports = require("@googlemaps/google-maps-services-js");

/***/ }),
/* 158 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SharedOrderService = void 0;
const tslib_1 = __webpack_require__(1);
const nestjs_query_graphql_1 = __webpack_require__(107);
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(11);
const common_coupon_service_1 = __webpack_require__(159);
const driver_deduct_transaction_type_enum_1 = __webpack_require__(19);
const driver_recharge_transaction_type_enum_1 = __webpack_require__(20);
const driver_status_enum_1 = __webpack_require__(99);
const payment_status_enum_1 = __webpack_require__(103);
const provider_recharge_transaction_type_enum_1 = __webpack_require__(46);
const request_activity_type_enum_1 = __webpack_require__(87);
const rider_deduct_transaction_type_enum_1 = __webpack_require__(39);
const service_option_type_enum_1 = __webpack_require__(66);
const service_payment_method_enum_1 = __webpack_require__(60);
const transaction_action_enum_1 = __webpack_require__(21);
const transaction_status_enum_1 = __webpack_require__(22);
const payment_entity_1 = __webpack_require__(101);
const request_activity_entity_1 = __webpack_require__(86);
const service_option_entity_1 = __webpack_require__(64);
const zone_price_entity_1 = __webpack_require__(67);
const graphql_redis_subscriptions_1 = __webpack_require__(108);
const typeorm_2 = __webpack_require__(14);
const axios_1 = __webpack_require__(160);
const order_status_enum_1 = __webpack_require__(81);
const request_entity_1 = __webpack_require__(27);
const service_category_entity_1 = __webpack_require__(63);
const driver_redis_service_1 = __webpack_require__(119);
const order_redis_service_1 = __webpack_require__(141);
const driver_notification_service_1 = __webpack_require__(151);
const rider_notification_service_1 = __webpack_require__(153);
const google_services_service_1 = __webpack_require__(156);
const region_service_1 = __webpack_require__(161);
const service_service_1 = __webpack_require__(162);
const shared_driver_service_1 = __webpack_require__(140);
const shared_fleet_service_1 = __webpack_require__(163);
const shared_provider_service_1 = __webpack_require__(164);
const shared_rider_service_1 = __webpack_require__(165);
const rxjs_1 = __webpack_require__(166);
const apollo_1 = __webpack_require__(138);
const payment_mode_enum_1 = __webpack_require__(93);
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
/* 159 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommonCouponService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(11);
const coupon_entity_1 = __webpack_require__(29);
const request_entity_1 = __webpack_require__(27);
const apollo_1 = __webpack_require__(138);
const typeorm_2 = __webpack_require__(14);
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
/* 160 */
/***/ ((module) => {

module.exports = require("@nestjs/axios");

/***/ }),
/* 161 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RegionService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(11);
const region_entity_1 = __webpack_require__(61);
const typeorm_2 = __webpack_require__(14);
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
/* 162 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(11);
const service_entity_1 = __webpack_require__(56);
const typeorm_2 = __webpack_require__(14);
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
/* 163 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SharedFleetService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(11);
const fleet_transaction_entity_1 = __webpack_require__(71);
const fleet_wallet_entity_1 = __webpack_require__(72);
const typeorm_2 = __webpack_require__(14);
const fleet_entity_1 = __webpack_require__(68);
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
/* 164 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SharedProviderService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(11);
const provider_transaction_entity_1 = __webpack_require__(44);
const provider_wallet_entity_1 = __webpack_require__(100);
const typeorm_2 = __webpack_require__(14);
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
/* 165 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SharedRiderService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(11);
const rider_entity_1 = __webpack_require__(30);
const rider_transaction_entity_1 = __webpack_require__(38);
const rider_wallet_entity_1 = __webpack_require__(79);
const typeorm_2 = __webpack_require__(14);
const driver_entity_1 = __webpack_require__(16);
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
/* 166 */
/***/ ((module) => {

module.exports = require("rxjs");

/***/ }),
/* 167 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RegionModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(11);
const region_entity_1 = __webpack_require__(61);
const region_service_1 = __webpack_require__(161);
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
/* 168 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderResolver = void 0;
const tslib_1 = __webpack_require__(1);
const nestjs_query_graphql_1 = __webpack_require__(107);
const common_1 = __webpack_require__(2);
const graphql_1 = __webpack_require__(9);
const database_1 = __webpack_require__(12);
const driver_redis_service_1 = __webpack_require__(119);
const graphql_redis_subscriptions_1 = __webpack_require__(108);
const jwt_gql_auth_guard_1 = __webpack_require__(137);
const driver_order_query_service_1 = __webpack_require__(169);
const order_dto_1 = __webpack_require__(123);
const update_order_input_1 = __webpack_require__(171);
const order_service_1 = __webpack_require__(170);
const shared_driver_service_1 = __webpack_require__(140);
const driver_status_enum_1 = __webpack_require__(99);
const order_status_enum_1 = __webpack_require__(81);
const typeorm_1 = __webpack_require__(14);
const rider_review_input_1 = __webpack_require__(172);
let OrderResolver = class OrderResolver extends (0, nestjs_query_graphql_1.CRUDResolver)(order_dto_1.OrderDTO, {
    UpdateDTOClass: update_order_input_1.UpdateOrderInput,
    create: { disabled: true },
    update: { many: { disabled: true } },
    delete: { disabled: true },
    enableAggregate: true,
}) {
    constructor(driverOrderService, context, orderService, driverService, driverRedisService, redisPubSub) {
        super(driverOrderService);
        this.driverOrderService = driverOrderService;
        this.context = context;
        this.orderService = orderService;
        this.driverService = driverService;
        this.driverRedisService = driverRedisService;
        this.redisPubSub = redisPubSub;
    }
    // @Query(() => OrderDTO)
    // async currentOrder(): Promise<OrderDTO> {
    //   return this.orderRepository.findOne({ driverId: this.context.req.user.id, status: In([OrderStatus.DriverAccepted, OrderStatus.Arrived, OrderStatus.Started, OrderStatus.WaitingForPostPay]) });
    // }
    async availableOrders() {
        return this.orderService.getOrdersForDriverWithId(this.context.req.user.id);
    }
    async updateDriversLocationNew(point) {
        await this.driverRedisService.setLocation(this.context.req.user.id, point);
        const driver = await this.driverService.findById(this.context.req.user.id);
        if (driver.status == driver_status_enum_1.DriverStatus.InService) {
            const driverCurrentOrder = await this.orderService.orderRepository.findOne({
                where: {
                    driverId: this.context.req.user.id,
                    status: (0, typeorm_1.In)([
                        order_status_enum_1.OrderStatus.DriverAccepted,
                        order_status_enum_1.OrderStatus.Arrived,
                        order_status_enum_1.OrderStatus.Started,
                        order_status_enum_1.OrderStatus.WaitingForPostPay,
                    ]),
                },
                order: { id: 'DESC' },
            });
            common_1.Logger.log(JSON.stringify(driverCurrentOrder), 'driverCurrentOrder');
            common_1.Logger.log(JSON.stringify(point), 'point');
            await this.redisPubSub.publish('driverLocationUpdated', {
                driverLocationUpdated: point,
                riderId: driverCurrentOrder.riderId,
            });
            return [];
        }
        else if (driver.status == driver_status_enum_1.DriverStatus.Online ||
            driver.status == driver_status_enum_1.DriverStatus.Offline) {
            return this.orderService.getOrdersForDriverEntity(driver);
        }
        else {
            return [];
        }
    }
    async submitReview(input) {
        return this.orderService.submitReview({
            ...input,
            driverId: this.context.req.user.id,
        });
    }
};
exports.OrderResolver = OrderResolver;
tslib_1.__decorate([
    (0, graphql_1.Query)(() => [order_dto_1.OrderDTO]),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], OrderResolver.prototype, "availableOrders", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => [order_dto_1.OrderDTO]),
    tslib_1.__param(0, (0, graphql_1.Args)('point', { type: () => database_1.Point })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [database_1.Point]),
    tslib_1.__metadata("design:returntype", Promise)
], OrderResolver.prototype, "updateDriversLocationNew", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => order_dto_1.OrderDTO),
    tslib_1.__param(0, (0, graphql_1.Args)('input', { type: () => rider_review_input_1.RiderReviewInput })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [rider_review_input_1.RiderReviewInput]),
    tslib_1.__metadata("design:returntype", Promise)
], OrderResolver.prototype, "submitReview", null);
exports.OrderResolver = OrderResolver = tslib_1.__decorate([
    (0, graphql_1.Resolver)(() => order_dto_1.OrderDTO),
    (0, common_1.UseGuards)(jwt_gql_auth_guard_1.GqlAuthGuard),
    tslib_1.__param(1, (0, common_1.Inject)(graphql_1.CONTEXT)),
    tslib_1.__param(5, (0, nestjs_query_graphql_1.InjectPubSub)()),
    tslib_1.__metadata("design:paramtypes", [driver_order_query_service_1.DriverOrderQueryService, Object, order_service_1.OrderService,
        shared_driver_service_1.SharedDriverService,
        driver_redis_service_1.DriverRedisService,
        graphql_redis_subscriptions_1.RedisPubSub])
], OrderResolver);


/***/ }),
/* 169 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DriverOrderQueryService = void 0;
const tslib_1 = __webpack_require__(1);
const nestjs_query_core_1 = __webpack_require__(133);
const nestjs_query_graphql_1 = __webpack_require__(107);
const nestjs_query_typeorm_1 = __webpack_require__(136);
const common_1 = __webpack_require__(2);
const graphql_1 = __webpack_require__(9);
const typeorm_1 = __webpack_require__(11);
const driver_status_enum_1 = __webpack_require__(99);
const order_status_enum_1 = __webpack_require__(81);
const request_activity_type_enum_1 = __webpack_require__(87);
const request_activity_entity_1 = __webpack_require__(86);
const request_entity_1 = __webpack_require__(27);
const rider_notification_service_1 = __webpack_require__(153);
const google_services_service_1 = __webpack_require__(156);
const shared_driver_service_1 = __webpack_require__(140);
const shared_order_service_1 = __webpack_require__(158);
const driver_redis_service_1 = __webpack_require__(119);
const order_redis_service_1 = __webpack_require__(141);
const apollo_1 = __webpack_require__(138);
const graphql_redis_subscriptions_1 = __webpack_require__(108);
const typeorm_2 = __webpack_require__(14);
const order_service_1 = __webpack_require__(170);
let DriverOrderQueryService = class DriverOrderQueryService extends nestjs_query_typeorm_1.TypeOrmQueryService {
    constructor(orderRepository, activityRepository, driverService, orderService, orderRedisService, driverRedisService, googleServices, sharedOrderService, pubSub, context, riderNotificationService) {
        super(orderRepository);
        this.orderRepository = orderRepository;
        this.activityRepository = activityRepository;
        this.driverService = driverService;
        this.orderService = orderService;
        this.orderRedisService = orderRedisService;
        this.driverRedisService = driverRedisService;
        this.googleServices = googleServices;
        this.sharedOrderService = sharedOrderService;
        this.pubSub = pubSub;
        this.context = context;
        this.riderNotificationService = riderNotificationService;
    }
    async updateOne(id, update) {
        let order = await this.orderRepository.findOne({
            where: { id },
            relations: [
                'rider',
                'service',
                'options',
                'conversation',
                'driver',
                'savedPaymentMethod',
                'paymentGateway',
                'driver.car',
                'driver.carColor',
            ],
        });
        let publishChanges = true;
        switch (update.status) {
            case order_status_enum_1.OrderStatus.DriverCanceled:
                await this.activityRepository.insert({
                    requestId: id,
                    type: request_activity_type_enum_1.RequestActivityType.CanceledByDriver,
                });
                await this.orderService.cancelOrder(id);
                this.riderNotificationService.canceled(order.rider);
                break;
            case order_status_enum_1.OrderStatus.DriverAccepted:
                const [travel, driverLocation] = await Promise.all([
                    this.orderRepository.findOneBy({ id }),
                    this.driverRedisService.getDriverCoordinate(this.context.req.user.id),
                ]);
                this.activityRepository.insert({
                    requestId: travel.id,
                    type: request_activity_type_enum_1.RequestActivityType.DriverAccepted,
                });
                const allowedStatuses = [
                    order_status_enum_1.OrderStatus.Found,
                    order_status_enum_1.OrderStatus.NotFound,
                    order_status_enum_1.OrderStatus.NoCloseFound,
                    order_status_enum_1.OrderStatus.Requested,
                    order_status_enum_1.OrderStatus.Booked,
                ];
                if (travel == null || !allowedStatuses.includes(travel.status)) {
                    throw new apollo_1.ForbiddenError('Already Taken');
                }
                const metrics = driverLocation != null
                    ? await this.googleServices.getSumDistanceAndDuration([
                        travel.points[0],
                        driverLocation,
                    ])
                    : { distance: 0, duration: 0 };
                const dt = new Date();
                const etaPickup = dt.setSeconds(dt.getSeconds() + metrics.duration);
                this.driverService.updateDriverStatus(this.context.req.user.id, driver_status_enum_1.DriverStatus.InService);
                await this.orderRedisService.expire([id]);
                await super.updateOne(id, {
                    status: order_status_enum_1.OrderStatus.DriverAccepted,
                    etaPickup: new Date(etaPickup),
                    driverId: this.context.req.user.id,
                });
                order = await this.orderRepository.findOne({
                    where: { id },
                    relations: [
                        'rider',
                        'service',
                        'options',
                        'conversation',
                        'driver',
                        'savedPaymentMethod',
                        'paymentGateway',
                        'driver.car',
                        'driver.carColor',
                    ],
                });
                this.riderNotificationService.accepted(order.rider);
                this.pubSub.publish('orderUpdated', { orderUpdated: order });
                this.pubSub.publish('orderRemoved', { orderRemoved: order }); // This one has a filter to let know all except the one accepted.
                publishChanges = false;
                break;
            case order_status_enum_1.OrderStatus.Arrived:
            case order_status_enum_1.OrderStatus.Started:
                await super.updateOne(id, { status: update.status });
                this.activityRepository.insert({
                    requestId: id,
                    type: update.status == order_status_enum_1.OrderStatus.Arrived
                        ? request_activity_type_enum_1.RequestActivityType.ArrivedToPickupPoint
                        : request_activity_type_enum_1.RequestActivityType.Started,
                });
                //result.driver = await this.driverService.driverRepo.findOne(this.context.req.user.id, {relations: ['car', 'carColor']});
                if (update.status == order_status_enum_1.OrderStatus.Arrived) {
                    this.riderNotificationService.arrived(order.rider);
                }
                else {
                    this.riderNotificationService.started(order.rider);
                }
                break;
            case order_status_enum_1.OrderStatus.Finished:
                await this.sharedOrderService.finish(id, update.paidAmount);
                this.activityRepository.insert({
                    requestId: id,
                    type: request_activity_type_enum_1.RequestActivityType.ArrivedToDestination,
                });
                order = await this.orderRepository.findOne({
                    where: { id },
                    relations: [
                        'rider',
                        'service',
                        'options',
                        'conversation',
                        'driver',
                        'driver.car',
                        'savedPaymentMethod',
                        'paymentGateway',
                        'driver.carColor',
                    ],
                });
                if (order.paidAmount + update.paidAmount < order.costAfterCoupon) {
                    this.riderNotificationService.waitingForPostPay(order.rider);
                }
                else {
                    this.riderNotificationService.finished(order.rider);
                }
                break;
            default:
                if (update.status != null) {
                    throw new apollo_1.ForbiddenError('Update status to this is not possible');
                }
                else {
                    await super.updateOne(id, update);
                }
        }
        if (update.destinationArrivedTo != null) {
            this.repo.update(id, {
                destinationArrivedTo: update.destinationArrivedTo > order.addresses.length
                    ? order.addresses.length
                    : update.destinationArrivedTo,
            });
        }
        if (publishChanges) {
            order = await this.orderRepository.findOne({
                where: { id },
                relations: [
                    'rider',
                    'service',
                    'options',
                    'conversation',
                    'driver',
                    'savedPaymentMethod',
                    'paymentGateway',
                    'driver.car',
                    'driver.carColor',
                ],
            });
            this.pubSub.publish('orderUpdated', { orderUpdated: order });
        }
        return order;
    }
};
exports.DriverOrderQueryService = DriverOrderQueryService;
exports.DriverOrderQueryService = DriverOrderQueryService = tslib_1.__decorate([
    (0, nestjs_query_core_1.QueryService)(request_entity_1.RequestEntity),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(request_entity_1.RequestEntity)),
    tslib_1.__param(1, (0, typeorm_1.InjectRepository)(request_activity_entity_1.RequestActivityEntity)),
    tslib_1.__param(8, (0, nestjs_query_graphql_1.InjectPubSub)()),
    tslib_1.__param(9, (0, common_1.Inject)(graphql_1.CONTEXT)),
    tslib_1.__metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        shared_driver_service_1.SharedDriverService,
        order_service_1.OrderService,
        order_redis_service_1.OrderRedisService,
        driver_redis_service_1.DriverRedisService,
        google_services_service_1.GoogleServicesService,
        shared_order_service_1.SharedOrderService,
        graphql_redis_subscriptions_1.RedisPubSub, Object, rider_notification_service_1.RiderNotificationService])
], DriverOrderQueryService);


/***/ }),
/* 170 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderService = void 0;
const tslib_1 = __webpack_require__(1);
const nestjs_query_graphql_1 = __webpack_require__(107);
const axios_1 = __webpack_require__(160);
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(11);
const driver_status_enum_1 = __webpack_require__(99);
const order_status_enum_1 = __webpack_require__(81);
const payment_status_enum_1 = __webpack_require__(103);
const request_activity_type_enum_1 = __webpack_require__(87);
const payment_entity_1 = __webpack_require__(101);
const request_activity_entity_1 = __webpack_require__(86);
const request_entity_1 = __webpack_require__(27);
const shared_driver_service_1 = __webpack_require__(140);
const shared_fleet_service_1 = __webpack_require__(163);
const order_redis_service_1 = __webpack_require__(141);
const apollo_1 = __webpack_require__(138);
const graphql_redis_subscriptions_1 = __webpack_require__(108);
const rxjs_1 = __webpack_require__(166);
const typeorm_2 = __webpack_require__(14);
const driver_entity_1 = __webpack_require__(16);
const rider_review_entity_1 = __webpack_require__(80);
const rider_entity_1 = __webpack_require__(30);
let OrderService = class OrderService {
    constructor(orderRepository, activityRepository, paymentRepository, reviewRepository, driverRepository, riderRepository, driverService, orderRedisService, sharedFleetService, pubSub, httpService) {
        this.orderRepository = orderRepository;
        this.activityRepository = activityRepository;
        this.paymentRepository = paymentRepository;
        this.reviewRepository = reviewRepository;
        this.driverRepository = driverRepository;
        this.riderRepository = riderRepository;
        this.driverService = driverService;
        this.orderRedisService = orderRedisService;
        this.sharedFleetService = sharedFleetService;
        this.pubSub = pubSub;
        this.httpService = httpService;
    }
    async cancelOrder(orderId) {
        let order = await this.orderRepository.findOneBy({ id: orderId });
        const allowedStatuses = [
            order_status_enum_1.OrderStatus.DriverAccepted,
            order_status_enum_1.OrderStatus.Arrived,
            order_status_enum_1.OrderStatus.DriverCanceled,
        ];
        common_1.Logger.log(`canceling order ${JSON.stringify(order)}`, 'OrderService.cancelOrder');
        if (order == null || !allowedStatuses.includes(order.status)) {
            throw new apollo_1.ForbiddenError('CANCEL_NOT_ALLOWED');
        }
        await this.orderRepository.update(order.id, {
            status: order_status_enum_1.OrderStatus.DriverCanceled,
            finishTimestamp: new Date(),
            costAfterCoupon: 0,
        });
        order = await this.orderRepository.findOneBy({ id: order.id });
        const payments = await this.paymentRepository.find({
            where: {
                userType: 'client',
                userId: order.riderId.toString(),
                status: payment_status_enum_1.PaymentStatus.Authorized,
                orderNumber: order.id.toString(),
            },
            order: { id: 'DESC' },
        });
        for (let payment of payments) {
            await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${process.env.GATEWAY_SERVER_URL}/cancel_preauth?id=${payment.transactionNumber}`));
        }
        await this.driverService.updateDriverStatus(order.driverId, driver_status_enum_1.DriverStatus.Online);
        return order;
    }
    async expireOrders(orderIds) {
        this.orderRedisService.expire(orderIds);
        await this.orderRepository.update(orderIds, {
            status: order_status_enum_1.OrderStatus.Expired,
        });
        const orders = await this.orderRepository.find({
            where: { id: (0, typeorm_2.In)(orderIds) },
        });
        for (const order of orders) {
            this.pubSub.publish('orderUpdated', { orderUpdated: order });
            this.pubSub.publish('orderRemoved', { orderRemoved: order });
        }
        for (const requestId of orderIds) {
            this.activityRepository.insert({
                requestId,
                type: request_activity_type_enum_1.RequestActivityType.Expired,
            });
        }
    }
    async getOrdersForDriverWithId(driverId) {
        const driver = await this.driverService.findById(driverId);
        return this.getOrdersForDriverEntity(driver);
    }
    async submitReview(input) {
        const order = await this.orderRepository.findOneBy({
            id: input.orderId,
            driverId: input.driverId,
        });
        if (order == null) {
            throw new apollo_1.ForbiddenError('ORDER_NOT_FOUND');
        }
        if (order.status != order_status_enum_1.OrderStatus.Finished) {
            throw new apollo_1.ForbiddenError('ORDER_NOT_FINISHED');
        }
        const review = await this.reviewRepository.findOneBy({
            orderId: order.id,
        });
        if (review != null) {
            throw new apollo_1.ForbiddenError('ALREADY_REVIEWED');
        }
        const rider = await this.riderRepository.findOneBy({
            id: order.riderId,
        });
        if (rider == null) {
            throw new apollo_1.ForbiddenError('RIDER_NOT_FOUND');
        }
        const newReview = this.reviewRepository.create({
            orderId: order.id,
            riderId: rider.id,
            driverId: order.driverId,
            score: input.score,
            description: input.description,
        });
        await this.reviewRepository.save(newReview);
        return order;
    }
    async getOrdersForDriverEntity(driver) {
        common_1.Logger.log(`getting orders for driver ${JSON.stringify(driver)}`);
        const orderIds = (await this.orderRedisService.getForDriver(driver.id, driver.searchDistance)).map((id) => parseInt(id));
        common_1.Logger.log(`got order ids ${JSON.stringify(orderIds)}`);
        let orders = await this.orderRepository.find({
            where: {
                id: (0, typeorm_2.In)(orderIds),
                serviceId: (0, typeorm_2.In)(driver.enabledServices.map((service) => service.id)),
                status: (0, typeorm_2.In)([
                    order_status_enum_1.OrderStatus.NoCloseFound,
                    order_status_enum_1.OrderStatus.NoCloseFound,
                    order_status_enum_1.OrderStatus.Found,
                    order_status_enum_1.OrderStatus.Booked,
                    order_status_enum_1.OrderStatus.Requested,
                ]),
            },
            relations: ['service', 'options'],
        });
        common_1.Logger.log(`got orders ${JSON.stringify(orders)}`);
        for (let order of orders) {
            const fleetIds = await this.sharedFleetService.getFleetIdsInPoint(order.points[0]);
            if (fleetIds.length > 0 &&
                (!fleetIds.includes(driver.fleetId) || driver.fleetId == null)) {
                orders = orders.filter((_order) => _order.id != order.id);
            }
        }
        common_1.Logger.log(`got filtered orders by fleet criteria ${JSON.stringify(orders)}`);
        return orders;
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(request_entity_1.RequestEntity)),
    tslib_1.__param(1, (0, typeorm_1.InjectRepository)(request_activity_entity_1.RequestActivityEntity)),
    tslib_1.__param(2, (0, typeorm_1.InjectRepository)(payment_entity_1.PaymentEntity)),
    tslib_1.__param(3, (0, typeorm_1.InjectRepository)(rider_review_entity_1.RiderReviewEntity)),
    tslib_1.__param(4, (0, typeorm_1.InjectRepository)(driver_entity_1.DriverEntity)),
    tslib_1.__param(5, (0, typeorm_1.InjectRepository)(rider_entity_1.RiderEntity)),
    tslib_1.__param(9, (0, nestjs_query_graphql_1.InjectPubSub)()),
    tslib_1.__metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        shared_driver_service_1.SharedDriverService,
        order_redis_service_1.OrderRedisService,
        shared_fleet_service_1.SharedFleetService,
        graphql_redis_subscriptions_1.RedisPubSub,
        axios_1.HttpService])
], OrderService);


/***/ }),
/* 171 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateOrderInput = void 0;
const tslib_1 = __webpack_require__(1);
const eager_import_0 = __webpack_require__(81);
const graphql_1 = __webpack_require__(9);
let UpdateOrderInput = class UpdateOrderInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { status: { nullable: true, type: () => (__webpack_require__(81).OrderStatus) }, paidAmount: { nullable: true, type: () => Number } };
    }
};
exports.UpdateOrderInput = UpdateOrderInput;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    tslib_1.__metadata("design:type", Number)
], UpdateOrderInput.prototype, "destinationArrivedTo", void 0);
exports.UpdateOrderInput = UpdateOrderInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], UpdateOrderInput);


/***/ }),
/* 172 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RiderReviewInput = void 0;
const tslib_1 = __webpack_require__(1);
const graphql_1 = __webpack_require__(9);
let RiderReviewInput = class RiderReviewInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { description: { nullable: true, type: () => String } };
    }
};
exports.RiderReviewInput = RiderReviewInput;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { description: 'Score, a value between 0 to 100' }),
    tslib_1.__metadata("design:type", Number)
], RiderReviewInput.prototype, "score", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => String, { description: 'Order ID' }),
    tslib_1.__metadata("design:type", Number)
], RiderReviewInput.prototype, "orderId", void 0);
exports.RiderReviewInput = RiderReviewInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], RiderReviewInput);


/***/ }),
/* 173 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var CronJobService_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CronJobService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const schedule_1 = __webpack_require__(10);
const driver_status_enum_1 = __webpack_require__(99);
const driver_notification_service_1 = __webpack_require__(151);
const driver_redis_service_1 = __webpack_require__(119);
const order_redis_service_1 = __webpack_require__(141);
const nestjs_redis_1 = __webpack_require__(112);
const driver_service_1 = __webpack_require__(118);
const order_service_1 = __webpack_require__(170);
const ioredis_1 = __webpack_require__(109);
const shared_driver_service_1 = __webpack_require__(140);
const typeorm_1 = __webpack_require__(14);
const shared_fleet_service_1 = __webpack_require__(163);
let CronJobService = CronJobService_1 = class CronJobService {
    constructor(orderService, driverService, redisService, driverRedisService, orderRedisService, driverNotificationService, sharedDriverService, sharedFleetService) {
        this.orderService = orderService;
        this.driverService = driverService;
        this.redisService = redisService;
        this.driverRedisService = driverRedisService;
        this.orderRedisService = orderRedisService;
        this.driverNotificationService = driverNotificationService;
        this.sharedDriverService = sharedDriverService;
        this.sharedFleetService = sharedFleetService;
    }
    async cronTask() {
        const logger = new common_1.Logger(CronJobService_1.name);
        logger.debug('Running expiration validation cron task.');
        const ts = Math.round(new Date().getTime());
        // Driver Locations Expire Time If Not Updated, 60 Minutes By Default
        const tsDriverMaxTime = ts - 60 * 60000;
        // Requests Expire Time, 10 Minutes By Default
        const expirationMinutes = parseInt(process.env.REQUEST_EXPIRATION ?? '10');
        const tsRequestMaxTime = ts - expirationMinutes * 60000;
        const expiredDrivers = (await this.redisService.zrangebyscore('driver-location-time', 0, tsDriverMaxTime)).map((str) => parseInt(str));
        const expiredRequests = (await this.redisService.zrangebyscore('request-time', 0, tsRequestMaxTime)).map((str) => parseInt(str));
        // Expiring drivers locations with outdated location
        if (expiredDrivers.length > 0 && process.env.DRIVERS_ALWAYS_ON == null) {
            const drivers = (await this.driverService.findByIds(expiredDrivers))
                .filter((driver) => driver.status != driver_status_enum_1.DriverStatus.InService)
                .map((driver) => driver.id);
            this.driverService.expireDriverStatus(drivers);
        }
        // Expiring requests with expired timestamp (10 minutes ago by default)
        if (expiredRequests.length > 0) {
            this.orderService.expireOrders(expiredRequests);
        }
        // Notifying drivers of an unaccepted orders
        const waitingMinTime = ts - 10 * 60000;
        const waitingMaxTime = ts + 30 * 60000;
        const waitingRequestIds = (await this.orderRedisService.getRequestIdsInTimeRage(waitingMinTime, waitingMaxTime)).map((id) => parseInt(id));
        for (const waitingRequest of waitingRequestIds) {
            const driversNotified = await this.orderRedisService.getDriversNotified(waitingRequest);
            const requestLocation = await this.redisService.geopos('request', waitingRequest.toString());
            let closeDrivers = await this.driverRedisService.getClose({
                lat: parseFloat(requestLocation[0][1]),
                lng: parseFloat(requestLocation[0][0]),
            }, 10000);
            closeDrivers = closeDrivers.filter((x) => {
                return !driversNotified.includes(x.driverId);
            });
            if (closeDrivers.length > 0) {
                const driverIds = closeDrivers.map((x) => x.driverId);
                const order = await this.orderService.orderRepository.findOneBy({
                    id: waitingRequest,
                });
                const fleetIds = await this.sharedFleetService.getFleetIdsInPoint(order.points[0]);
                const drivers = await this.sharedDriverService.getOnlineDriversWithServiceId(driverIds, order.serviceId, fleetIds);
                this.driverNotificationService.requests(drivers);
            }
        }
        // Notifiying driver on upcoming booking orders
        const expectedTimestampFrom = ts - 15 * 60000;
        const expectedTimestampTo = ts - 10 * 60000;
        const expectedTimestampFromDate = new Date().setTime(expectedTimestampFrom);
        const expectedTimestampToDate = new Date().setTime(expectedTimestampTo);
        const drivers = (await this.orderService.orderRepository.find({
            where: {
                expectedTimestamp: (0, typeorm_1.Between)(expectedTimestampFromDate, expectedTimestampToDate),
                driverId: (0, typeorm_1.Not)((0, typeorm_1.IsNull)()),
            },
            relations: ['driver'],
        })).map((order) => order.driver);
        for (const driver of drivers) {
            this.driverNotificationService.upcomingBooking(driver);
        }
    }
};
exports.CronJobService = CronJobService;
tslib_1.__decorate([
    (0, schedule_1.Interval)(300000),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], CronJobService.prototype, "cronTask", null);
exports.CronJobService = CronJobService = CronJobService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(2, (0, nestjs_redis_1.InjectRedis)()),
    tslib_1.__metadata("design:paramtypes", [order_service_1.OrderService,
        driver_service_1.DriverService,
        ioredis_1.Redis,
        driver_redis_service_1.DriverRedisService,
        order_redis_service_1.OrderRedisService,
        driver_notification_service_1.DriverNotificationService,
        shared_driver_service_1.SharedDriverService,
        shared_fleet_service_1.SharedFleetService])
], CronJobService);


/***/ }),
/* 174 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderSubscriptionService = void 0;
const tslib_1 = __webpack_require__(1);
const nestjs_query_graphql_1 = __webpack_require__(107);
const common_1 = __webpack_require__(2);
const graphql_1 = __webpack_require__(9);
const graphql_redis_subscriptions_1 = __webpack_require__(108);
const order_dto_1 = __webpack_require__(123);
let OrderSubscriptionService = class OrderSubscriptionService {
    constructor(pubSub) {
        this.pubSub = pubSub;
    }
    orderCreated() {
        return this.pubSub.asyncIterator('orderCreated');
    }
    orderUpdated() {
        return this.pubSub.asyncIterator('orderUpdated');
    }
    orderRemoved() {
        return this.pubSub.asyncIterator('orderRemoved');
    }
};
exports.OrderSubscriptionService = OrderSubscriptionService;
tslib_1.__decorate([
    (0, graphql_1.Subscription)(() => order_dto_1.OrderDTO, {
        filter: (payload, variables, context) => {
            return payload.driverIds.includes(context.id);
        },
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], OrderSubscriptionService.prototype, "orderCreated", null);
tslib_1.__decorate([
    (0, graphql_1.Subscription)(() => order_dto_1.OrderDTO, {
        filter: (payload, variables, context) => {
            return context.id == payload.orderUpdated.driverId;
        },
        resolve: (payload) => {
            payload.orderUpdated.riderLastSeenMessagesAt = new Date(payload.orderUpdated.riderLastSeenMessagesAt);
            payload.orderUpdated.createdOn = new Date(payload.orderUpdated.createdOn);
            if (payload.orderUpdated.startTimestamp != null) {
                payload.orderUpdated.startTimestamp = new Date(payload.orderUpdated.startTimestamp);
            }
            payload.orderUpdated.expectedTimestamp = new Date(payload.orderUpdated.expectedTimestamp);
            if (payload.orderUpdated.finishTimestamp != null) {
                payload.orderUpdated.finishTimestamp = new Date(payload.orderUpdated.finishTimestamp);
            }
            if (payload.orderUpdated.etaPickup != null) {
                payload.orderUpdated.etaPickup = new Date(payload.orderUpdated.etaPickup);
            }
            payload.orderUpdated.driverLastSeenMessagesAt = new Date(payload.orderUpdated.driverLastSeenMessagesAt);
            payload.orderUpdated.expectedTimestamp = new Date(payload.orderUpdated.expectedTimestamp);
            common_1.Logger.log(JSON.stringify(payload), `orderUpdated payload`);
            return payload.orderUpdated;
        },
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], OrderSubscriptionService.prototype, "orderUpdated", null);
tslib_1.__decorate([
    (0, graphql_1.Subscription)(() => order_dto_1.OrderDTO, {
        filter: (payload, variables, context) => {
            if (payload.orderRemoved.driverId == null)
                return true;
            return context.id != payload.orderRemoved.driverId;
        },
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], OrderSubscriptionService.prototype, "orderRemoved", null);
exports.OrderSubscriptionService = OrderSubscriptionService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, nestjs_query_graphql_1.InjectPubSub)()),
    tslib_1.__metadata("design:paramtypes", [graphql_redis_subscriptions_1.RedisPubSub])
], OrderSubscriptionService);


/***/ }),
/* 175 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(176), exports);
tslib_1.__exportStar(__webpack_require__(159), exports);
tslib_1.__exportStar(__webpack_require__(177), exports);


/***/ }),
/* 176 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommonCouponModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(11);
const coupon_entity_1 = __webpack_require__(29);
const request_entity_1 = __webpack_require__(27);
const common_coupon_service_1 = __webpack_require__(159);
const common_gift_card_service_1 = __webpack_require__(177);
const gift_code_entity_1 = __webpack_require__(41);
const shared_rider_service_1 = __webpack_require__(165);
const shared_driver_service_1 = __webpack_require__(140);
const rider_entity_1 = __webpack_require__(30);
const driver_entity_1 = __webpack_require__(16);
const rider_wallet_entity_1 = __webpack_require__(79);
const driver_wallet_entity_1 = __webpack_require__(98);
const rider_transaction_entity_1 = __webpack_require__(38);
const driver_transaction_entity_1 = __webpack_require__(18);
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
/* 177 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommonGiftCardService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(11);
const driver_recharge_transaction_type_enum_1 = __webpack_require__(20);
const rider_recharge_transaction_type_enum_1 = __webpack_require__(40);
const transaction_action_enum_1 = __webpack_require__(21);
const transaction_status_enum_1 = __webpack_require__(22);
const gift_code_entity_1 = __webpack_require__(41);
const shared_driver_service_1 = __webpack_require__(140);
const shared_rider_service_1 = __webpack_require__(165);
const typeorm_2 = __webpack_require__(14);
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
/* 178 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderCancelReasonDTO = void 0;
const tslib_1 = __webpack_require__(1);
const eager_import_0 = __webpack_require__(36);
const graphql_1 = __webpack_require__(9);
const nestjs_query_graphql_1 = __webpack_require__(107);
const anouncement_user_type_enum_1 = __webpack_require__(36);
let OrderCancelReasonDTO = class OrderCancelReasonDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, isEnabled: { type: () => Boolean }, userType: { type: () => (__webpack_require__(36).AnnouncementUserType) } };
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
    (0, nestjs_query_graphql_1.FilterableField)({ filterOnly: true }),
    tslib_1.__metadata("design:type", Boolean)
], OrderCancelReasonDTO.prototype, "isEnabled", void 0);
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.FilterableField)(() => anouncement_user_type_enum_1.AnnouncementUserType, { filterOnly: true }),
    tslib_1.__metadata("design:type", String)
], OrderCancelReasonDTO.prototype, "userType", void 0);
exports.OrderCancelReasonDTO = OrderCancelReasonDTO = tslib_1.__decorate([
    (0, nestjs_query_graphql_1.Authorize)({
        authorize: (context) => ({
            userType: { eq: anouncement_user_type_enum_1.AnnouncementUserType.Driver },
            isEnabled: true,
        }),
    }),
    (0, graphql_1.ObjectType)('OrderCancelReason')
], OrderCancelReasonDTO);


/***/ }),
/* 179 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthResolver = void 0;
const tslib_1 = __webpack_require__(1);
const graphql_1 = __webpack_require__(9);
const jwt_1 = __webpack_require__(114);
const driver_service_1 = __webpack_require__(118);
const login_dto_1 = __webpack_require__(180);
const login_input_1 = __webpack_require__(181);
const version_status_enum_1 = __webpack_require__(182);
const driver_dto_1 = __webpack_require__(120);
const common_1 = __webpack_require__(2);
const jwt_gql_auth_guard_1 = __webpack_require__(137);
const shared_driver_service_1 = __webpack_require__(140);
const apollo_1 = __webpack_require__(138);
const firebase_admin_1 = __webpack_require__(152);
const verification_dto_1 = __webpack_require__(183);
const verify_number_dto_1 = __webpack_require__(184);
const auth_service_1 = __webpack_require__(185);
let AuthResolver = class AuthResolver {
    constructor(driverService, sharedDriverService, jwtService, userContext, authService) {
        this.driverService = driverService;
        this.sharedDriverService = sharedDriverService;
        this.jwtService = jwtService;
        this.userContext = userContext;
        this.authService = authService;
    }
    async login(input) {
        const decodedToken = await (0, firebase_admin_1.auth)().verifyIdToken(input.firebaseToken);
        const number = decodedToken.firebase.identities.phone[0].substring(1);
        const user = await this.driverService.findOrCreateUserWithMobileNumber({
            mobileNumber: number,
            countryIso: null,
        });
        const payload = { id: user.id };
        return {
            jwtToken: this.jwtService.sign(payload),
        };
    }
    async requireUpdate(versionCode) {
        if (process.env.MANDATORY_VERSION_CODE != null &&
            versionCode < parseInt(process.env.MANDATORY_VERSION_CODE)) {
            return version_status_enum_1.VersionStatus.MandatoryUpdate;
        }
        if (process.env.OPTIONAL_VERSION_CODE != null &&
            versionCode < parseInt(process.env.OPTIONAL_VERSION_CODE)) {
            return version_status_enum_1.VersionStatus.OptionalUpdate;
        }
        return version_status_enum_1.VersionStatus.Latest;
    }
    async deleteUser() {
        return this.sharedDriverService.deleteById(this.userContext.req.user.id);
    }
    async skipVerification(mobileNumber) {
        if (process.env.DEMO_MODE !== 'true') {
            throw new apollo_1.ForbiddenError('Not in demo mode');
        }
        if (mobileNumber.startsWith('+')) {
            mobileNumber = mobileNumber.substring(1);
        }
        const user = await this.driverService.findOrCreateUserWithMobileNumber({
            mobileNumber,
        });
        const payload = { id: user.id };
        return {
            jwtToken: this.jwtService.sign(payload),
        };
    }
    async verifyNumber(mobileNumber, countryIso, forceSendOtp) {
        if (mobileNumber.startsWith('+')) {
            mobileNumber = mobileNumber.substring(1);
        }
        const rider = await this.driverService.findWithDeleted({ mobileNumber });
        if (rider != null && rider.password != null && forceSendOtp !== true) {
            return {
                isExistingUser: true,
            };
        }
        const { hash } = await this.authService.sendVerificationCode({
            mobileNumber,
            countryIso,
        });
        return { isExistingUser: false, hash };
    }
    async verifyOtp(hash, code) {
        const verifyCoderesult = await this.authService.verifyCode(hash, code);
        const user = await this.driverService.findOrCreateUserWithMobileNumber({
            ...verifyCoderesult,
        });
        const payload = { id: user.id };
        return {
            jwtToken: this.jwtService.sign(payload),
            user: { ...user, isWalletHidden: false },
            hasName: user.firstName != null && user.lastName != null,
            hasPassword: user.password != null,
        };
    }
    async verifyPassword(mobileNumber, password) {
        const user = await this.driverService.findWithDeleted({ mobileNumber });
        if (user == null || user.password !== password) {
            throw new apollo_1.ForbiddenError('Wrong password');
        }
        const payload = { id: user.id };
        return {
            jwtToken: this.jwtService.sign(payload),
            user: { ...user, isWalletHidden: false },
            hasName: user.firstName != null && user.lastName != null,
            hasPassword: user.password != null,
        };
    }
    async setPassword(password) {
        const user = await this.driverService.setPassword({
            driverId: this.userContext.req.user.id,
            password,
        });
        const payload = { id: user.id };
        return {
            jwtToken: this.jwtService.sign(payload),
            user: { ...user, isWalletHidden: false },
            hasName: user.firstName != null && user.lastName != null,
            hasPassword: user.password != null,
        };
    }
};
exports.AuthResolver = AuthResolver;
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => login_dto_1.LoginDTO),
    tslib_1.__param(0, (0, graphql_1.Args)('input', { type: () => login_input_1.LoginInput })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [login_input_1.LoginInput]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthResolver.prototype, "login", null);
tslib_1.__decorate([
    (0, graphql_1.Query)(() => version_status_enum_1.VersionStatus),
    tslib_1.__param(0, (0, graphql_1.Args)('versionCode', { type: () => graphql_1.Int })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthResolver.prototype, "requireUpdate", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => driver_dto_1.DriverDTO),
    (0, common_1.UseGuards)(jwt_gql_auth_guard_1.GqlAuthGuard),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], AuthResolver.prototype, "deleteUser", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => login_dto_1.LoginDTO),
    tslib_1.__param(0, (0, graphql_1.Args)('mobileNumber')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthResolver.prototype, "skipVerification", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => verify_number_dto_1.VerifyNumberDto, {
        description: 'Returns a hash that will need to be passed in subsequent verify code call in order for match and verifcation to happen. Real sms is not sent in demo mode. It is 123456 by default.',
    }),
    tslib_1.__param(0, (0, graphql_1.Args)('mobileNumber')),
    tslib_1.__param(1, (0, graphql_1.Args)('countryIso', { nullable: true })),
    tslib_1.__param(2, (0, graphql_1.Args)('forceSendOtp', { nullable: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Boolean]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthResolver.prototype, "verifyNumber", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => verification_dto_1.VerificationDto, {
        description: 'Returns a JWT token if the code matches the hash. In demo mode the OTP is not sent. It is 123456 by default.',
    }),
    tslib_1.__param(0, (0, graphql_1.Args)('hash')),
    tslib_1.__param(1, (0, graphql_1.Args)('code')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthResolver.prototype, "verifyOtp", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => verification_dto_1.VerificationDto),
    tslib_1.__param(0, (0, graphql_1.Args)('mobileNumber')),
    tslib_1.__param(1, (0, graphql_1.Args)('password')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthResolver.prototype, "verifyPassword", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => verification_dto_1.VerificationDto),
    (0, common_1.UseGuards)(jwt_gql_auth_guard_1.GqlAuthGuard),
    tslib_1.__param(0, (0, graphql_1.Args)('password')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthResolver.prototype, "setPassword", null);
exports.AuthResolver = AuthResolver = tslib_1.__decorate([
    (0, graphql_1.Resolver)(),
    tslib_1.__param(3, (0, common_1.Inject)(graphql_1.CONTEXT)),
    tslib_1.__metadata("design:paramtypes", [driver_service_1.DriverService,
        shared_driver_service_1.SharedDriverService,
        jwt_1.JwtService, Object, auth_service_1.AuthService])
], AuthResolver);


/***/ }),
/* 180 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoginDTO = void 0;
const tslib_1 = __webpack_require__(1);
const graphql_1 = __webpack_require__(9);
let LoginDTO = class LoginDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { jwtToken: { type: () => String } };
    }
};
exports.LoginDTO = LoginDTO;
exports.LoginDTO = LoginDTO = tslib_1.__decorate([
    (0, graphql_1.ObjectType)('Login')
], LoginDTO);


/***/ }),
/* 181 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoginInput = void 0;
const tslib_1 = __webpack_require__(1);
const graphql_1 = __webpack_require__(9);
let LoginInput = class LoginInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { firebaseToken: { type: () => String } };
    }
};
exports.LoginInput = LoginInput;
exports.LoginInput = LoginInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], LoginInput);


/***/ }),
/* 182 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VersionStatus = void 0;
const graphql_1 = __webpack_require__(9);
var VersionStatus;
(function (VersionStatus) {
    VersionStatus["Latest"] = "Latest";
    VersionStatus["MandatoryUpdate"] = "MandatoryUpdate";
    VersionStatus["OptionalUpdate"] = "OptionalUpdate";
})(VersionStatus || (exports.VersionStatus = VersionStatus = {}));
(0, graphql_1.registerEnumType)(VersionStatus, { name: 'VersionStatus' });


/***/ }),
/* 183 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VerificationDto = void 0;
const tslib_1 = __webpack_require__(1);
const eager_import_0 = __webpack_require__(120);
const graphql_1 = __webpack_require__(9);
let VerificationDto = class VerificationDto {
    static _GRAPHQL_METADATA_FACTORY() {
        return { jwtToken: { type: () => String }, user: { type: () => (__webpack_require__(120).DriverDTO) }, hasPassword: { type: () => Boolean }, hasName: { type: () => Boolean } };
    }
};
exports.VerificationDto = VerificationDto;
exports.VerificationDto = VerificationDto = tslib_1.__decorate([
    (0, graphql_1.ObjectType)('VerifcationResult')
], VerificationDto);


/***/ }),
/* 184 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VerifyNumberDto = void 0;
const tslib_1 = __webpack_require__(1);
const graphql_1 = __webpack_require__(9);
let VerifyNumberDto = class VerifyNumberDto {
    static _GRAPHQL_METADATA_FACTORY() {
        return {};
    }
};
exports.VerifyNumberDto = VerifyNumberDto;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => Boolean, { description: 'If an existing user then the hash will be null, so the user can be logged in using password instead of OTP.' }),
    tslib_1.__metadata("design:type", Boolean)
], VerifyNumberDto.prototype, "isExistingUser", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true,
        description: 'Hash that will need to be passed in subsequent verify code call in order for match and verifcation to happen.' }),
    tslib_1.__metadata("design:type", String)
], VerifyNumberDto.prototype, "hash", void 0);
exports.VerifyNumberDto = VerifyNumberDto = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], VerifyNumberDto);


/***/ }),
/* 185 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const jwt_1 = __webpack_require__(114);
const driver_service_1 = __webpack_require__(118);
const firebase_admin_1 = __webpack_require__(152);
const sms_service_1 = __webpack_require__(186);
const auth_redis_service_1 = __webpack_require__(142);
let AuthService = class AuthService {
    constructor(driverService, jwtService, smsService, authRedisService) {
        this.driverService = driverService;
        this.jwtService = jwtService;
        this.smsService = smsService;
        this.authRedisService = authRedisService;
    }
    async validateUser(firebaseToken) {
        const decodedToken = await (0, firebase_admin_1.auth)().verifyIdToken(firebaseToken);
        const number = decodedToken.firebase.identities.phone[0].substring(1);
        const user = await this.driverService.findOrCreateUserWithMobileNumber({
            mobileNumber: number,
        });
        return user;
    }
    async loginUser(user) {
        const payload = { id: user.id };
        return {
            token: this.jwtService.sign(payload),
        };
    }
    async sendVerificationCode(input) {
        const code = process.env.DEMO_MODE
            ? '123456'
            : await this.smsService.sendVerificationCodeSms(input.mobileNumber);
        const hash = await this.authRedisService.createVerificationCode({
            ...input,
            code,
        });
        return hash;
    }
    async verifyCode(hash, code) {
        const result = await this.authRedisService.isVerificationCodeValid(hash, code);
        await this.authRedisService.deleteVerificationCode(hash);
        return result;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [driver_service_1.DriverService,
        jwt_1.JwtService,
        sms_service_1.SMSService,
        auth_redis_service_1.AuthRedisService])
], AuthService);


/***/ }),
/* 186 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SMSService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const twilio_1 = __webpack_require__(187);
const shared_configuration_service_1 = __webpack_require__(155);
const sms_provider_service_1 = __webpack_require__(188);
const sms_provider_type_enum_1 = __webpack_require__(190);
const broadnet_service_1 = __webpack_require__(191);
const twilio_service_1 = __webpack_require__(192);
const plivo_service_1 = __webpack_require__(193);
const vonage_service_1 = __webpack_require__(195);
const apollo_1 = __webpack_require__(138);
const pahappa_service_1 = __webpack_require__(196);
let SMSService = class SMSService {
    constructor(smsProviderService, sharedConfigService, twilioService, broadnetService, plivoService, vonageService, pahappaService) {
        this.smsProviderService = smsProviderService;
        this.sharedConfigService = sharedConfigService;
        this.twilioService = twilioService;
        this.broadnetService = broadnetService;
        this.plivoService = plivoService;
        this.vonageService = vonageService;
        this.pahappaService = pahappaService;
    }
    async sendVerificationCodeSms(phoneNumber) {
        const defaultProvider = await this.smsProviderService.getDefaultProvider();
        const random6Digit = Math.floor(100000 + Math.random() * 900000).toString();
        const message = defaultProvider.verificationTemplate?.replace('{code}', random6Digit) ??
            'OTP is {code}';
        switch (defaultProvider?.type) {
            case sms_provider_type_enum_1.SMSProviderType.Twilio:
                await this.twilioService.sendOTP({
                    providerEntity: defaultProvider,
                    phoneNumber,
                    message,
                });
                break;
            case sms_provider_type_enum_1.SMSProviderType.BroadNet:
                await this.broadnetService.sendOTP({
                    providerEntity: defaultProvider,
                    phoneNumber,
                    message,
                });
                break;
            case sms_provider_type_enum_1.SMSProviderType.Vonage:
                await this.vonageService.sendOTP({
                    providerEntity: defaultProvider,
                    phoneNumber,
                    message,
                });
                break;
            case sms_provider_type_enum_1.SMSProviderType.Plivo:
                await this.plivoService.sendOTP({
                    providerEntity: defaultProvider,
                    phoneNumber,
                    message,
                });
                break;
            case sms_provider_type_enum_1.SMSProviderType.Pahappa:
                await this.pahappaService.sendOTP({
                    providerEntity: defaultProvider,
                    phoneNumber,
                    message,
                });
                break;
            case sms_provider_type_enum_1.SMSProviderType.Firebase:
                return random6Digit;
            default:
                throw new apollo_1.ForbiddenError('The default SMS provider is not supported');
        }
        return random6Digit;
    }
    async sendVerificationCodeWhatsapp(phoneNumber) {
        const config = await this.sharedConfigService.getConfiguration();
        if (config?.twilioAccountSid == null ||
            config?.twilioAuthToken == null ||
            config?.twilioFromNumber == null ||
            config.twilioVerificationCodeSMSTemplate == null)
            throw new Error('twilio config not found');
        const client = new twilio_1.Twilio(config.twilioAccountSid, config.twilioAuthToken);
        const random6Digit = Math.floor(100000 + Math.random() * 900000).toString();
        await client.messages.create({
            body: config.twilioVerificationCodeSMSTemplate.replace('{code}', random6Digit),
            from: config.twilioFromNumber,
            to: `whatsapp:+${phoneNumber}`,
        });
        return random6Digit;
    }
};
exports.SMSService = SMSService;
exports.SMSService = SMSService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [sms_provider_service_1.SMSProviderService,
        shared_configuration_service_1.SharedConfigurationService,
        twilio_service_1.TwilioService,
        broadnet_service_1.BroadnetService,
        plivo_service_1.PlivoService,
        vonage_service_1.VonageService,
        pahappa_service_1.PahappaService])
], SMSService);


/***/ }),
/* 187 */
/***/ ((module) => {

module.exports = require("twilio");

/***/ }),
/* 188 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SMSProviderService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(11);
const sms_provider_entity_1 = __webpack_require__(189);
const typeorm_2 = __webpack_require__(14);
const apollo_1 = __webpack_require__(138);
let SMSProviderService = class SMSProviderService {
    constructor(smsProviderRepository) {
        this.smsProviderRepository = smsProviderRepository;
    }
    async getDefaultProvider() {
        const defaultProvider = await this.smsProviderRepository.findOne({
            where: { isDefault: true },
        });
        if (defaultProvider == null) {
            throw new apollo_1.ForbiddenError('Default SMS provider not found');
        }
        return defaultProvider;
    }
};
exports.SMSProviderService = SMSProviderService;
exports.SMSProviderService = SMSProviderService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(sms_provider_entity_1.SMSProviderEntity)),
    tslib_1.__metadata("design:paramtypes", [typeorm_2.Repository])
], SMSProviderService);


/***/ }),
/* 189 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SMSProviderEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(14);
const sms_provider_type_enum_1 = __webpack_require__(190);
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
/* 190 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SMSProviderType = void 0;
const graphql_1 = __webpack_require__(9);
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
/* 191 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BroadnetService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const axios_1 = __webpack_require__(160);
const rxjs_1 = __webpack_require__(166);
const apollo_1 = __webpack_require__(138);
let BroadnetService = class BroadnetService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async sendOTP(input) {
        const config = input.providerEntity;
        if (config == null) {
            throw new Error('Broadnet config not found');
        }
        common_1.Logger.log('Sending sms to ' + input.phoneNumber + ' using Broadnet');
        common_1.Logger.log('Message: ' + input.message);
        common_1.Logger.log('Config: ' + JSON.stringify(config));
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get('https://gw5s.broadnet.me:8443/websmpp/websms', {
            params: {
                user: config.accountId,
                pass: config.authToken,
                sid: config.fromNumber,
                type: config.smsType,
                mno: input.phoneNumber,
                text: input.message,
            },
        }));
        if (response.status !== 200) {
            throw new apollo_1.ForbiddenError('Broadnet failed to send sms, status: ' + response.statusText);
        }
    }
};
exports.BroadnetService = BroadnetService;
exports.BroadnetService = BroadnetService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [axios_1.HttpService])
], BroadnetService);


/***/ }),
/* 192 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TwilioService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const twilio_1 = __webpack_require__(187);
const apollo_1 = __webpack_require__(138);
let TwilioService = class TwilioService {
    constructor() { }
    async sendOTP(input) {
        try {
            const client = new twilio_1.Twilio(input.providerEntity.accountId, input.providerEntity.authToken);
            await client.messages.create({
                body: input.message,
                from: input.providerEntity.fromNumber,
                to: `+${input.phoneNumber}`,
            });
        }
        catch (error) {
            throw new apollo_1.ForbiddenError(error.message);
        }
    }
};
exports.TwilioService = TwilioService;
exports.TwilioService = TwilioService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], TwilioService);


/***/ }),
/* 193 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PlivoService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const plivo_1 = __webpack_require__(194);
let PlivoService = class PlivoService {
    constructor() { }
    async sendOTP(input) {
        const client = new plivo_1.Client(input.providerEntity.accountId, input.providerEntity.authToken);
        const result = await client.messages.create(input.providerEntity.fromNumber, input.phoneNumber, input.message);
        common_1.Logger.log(JSON.stringify(result), 'PlivoService');
    }
};
exports.PlivoService = PlivoService;
exports.PlivoService = PlivoService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], PlivoService);


/***/ }),
/* 194 */
/***/ ((module) => {

module.exports = require("plivo");

/***/ }),
/* 195 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VonageService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const axios_1 = __webpack_require__(160);
const rxjs_1 = __webpack_require__(166);
const apollo_1 = __webpack_require__(138);
let VonageService = class VonageService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async sendOTP(input) {
        const config = input.providerEntity;
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(`https://rest.nexmo.com/sms/json`, {
            api_key: config.accountId,
            api_secret: config.authToken,
            from: config.fromNumber,
            to: input.phoneNumber,
            text: input.message,
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        }));
        common_1.Logger.log(JSON.stringify(response.data), 'VonageService');
        if (response.status !== 200) {
            throw new apollo_1.ForbiddenError('Vonage failed to send sms, status: ' + response.statusText);
        }
    }
};
exports.VonageService = VonageService;
exports.VonageService = VonageService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [axios_1.HttpService])
], VonageService);


/***/ }),
/* 196 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PahappaService = void 0;
const tslib_1 = __webpack_require__(1);
const axios_1 = __webpack_require__(160);
const common_1 = __webpack_require__(2);
const rxjs_1 = __webpack_require__(166);
const apollo_1 = __webpack_require__(138);
let PahappaService = class PahappaService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async sendOTP(input) {
        const { providerEntity, phoneNumber, message } = input;
        try {
            // Make an HTTP request to the Pahappa SMS API
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get('https://www.egosms.co/api/v1/plain/', {
                params: {
                    username: providerEntity.accountId,
                    password: providerEntity.authToken,
                    number: phoneNumber,
                    message: message,
                    sender: providerEntity.fromNumber,
                    priority: 0,
                },
            }));
            // Handle any errors from the API response
            if (response.status !== 200) {
                throw new apollo_1.ForbiddenError('Failed to send Pahappa OTP');
            }
        }
        catch (error) {
            // Handle any errors that occurred during the OTP sending process
            // You can log the error or perform any necessary error handling
            console.error('Failed to send Pahappa OTP:', error);
            throw new apollo_1.ForbiddenError(`Failed to send Pahappa OTP: ${error.message}`);
        }
    }
};
exports.PahappaService = PahappaService;
exports.PahappaService = PahappaService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [axios_1.HttpService])
], PahappaService);


/***/ }),
/* 197 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.validateToken = exports.JwtStrategy = void 0;
const tslib_1 = __webpack_require__(1);
const passport_jwt_1 = __webpack_require__(198);
const passport_1 = __webpack_require__(115);
const common_1 = __webpack_require__(2);
const jwt_decode_1 = tslib_1.__importDefault(__webpack_require__(199));
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor() {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'secret_driver'
        });
    }
    async validate(payload) {
        return { id: payload.id };
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], JwtStrategy);
async function validateToken(token) {
    const res = (0, jwt_decode_1.default)(token);
    common_1.Logger.log(`validated driver socket: ${res.id}`);
    return {
        id: res.id
    };
}
exports.validateToken = validateToken;


/***/ }),
/* 198 */
/***/ ((module) => {

module.exports = require("passport-jwt");

/***/ }),
/* 199 */
/***/ ((module) => {

module.exports = require("jwt-decode");

/***/ }),
/* 200 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SMSModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const sms_service_1 = __webpack_require__(186);
const shared_configuration_service_1 = __webpack_require__(155);
const sms_provider_service_1 = __webpack_require__(188);
const twilio_service_1 = __webpack_require__(192);
const broadnet_service_1 = __webpack_require__(191);
const plivo_service_1 = __webpack_require__(193);
const vonage_service_1 = __webpack_require__(195);
const typeorm_1 = __webpack_require__(11);
const sms_provider_entity_1 = __webpack_require__(189);
const axios_1 = __webpack_require__(160);
const pahappa_service_1 = __webpack_require__(196);
let SMSModule = class SMSModule {
};
exports.SMSModule = SMSModule;
exports.SMSModule = SMSModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([sms_provider_entity_1.SMSProviderEntity]), axios_1.HttpModule],
        providers: [
            sms_service_1.SMSService,
            sms_provider_service_1.SMSProviderService,
            twilio_service_1.TwilioService,
            plivo_service_1.PlivoService,
            broadnet_service_1.BroadnetService,
            pahappa_service_1.PahappaService,
            vonage_service_1.VonageService,
            shared_configuration_service_1.SharedConfigurationService,
        ],
        exports: [sms_service_1.SMSService],
    })
], SMSModule);


/***/ }),
/* 201 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DriverAPIController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const fastify = tslib_1.__importStar(__webpack_require__(202));
const rest_jwt_auth_guard_1 = __webpack_require__(203);
const util_1 = __webpack_require__(146);
const stream_1 = __webpack_require__(145);
const fs_1 = __webpack_require__(116);
const typeorm_1 = __webpack_require__(11);
const driver_entity_1 = __webpack_require__(16);
const media_entity_1 = __webpack_require__(34);
const typeorm_2 = __webpack_require__(14);
const path_1 = __webpack_require__(6);
const pump = (0, util_1.promisify)(stream_1.pipeline);
const database_1 = __webpack_require__(12);
const shared_driver_service_1 = __webpack_require__(140);
const transaction_action_enum_1 = __webpack_require__(21);
const driver_recharge_transaction_type_enum_1 = __webpack_require__(20);
const transaction_status_enum_1 = __webpack_require__(22);
const package_json_1 = __webpack_require__(204);
const payment_entity_1 = __webpack_require__(101);
let DriverAPIController = class DriverAPIController {
    constructor(mediaRepository, driverRepository, paymentRepository, cryptoService, sharedDriverService) {
        this.mediaRepository = mediaRepository;
        this.driverRepository = driverRepository;
        this.paymentRepository = paymentRepository;
        this.cryptoService = cryptoService;
        this.sharedDriverService = sharedDriverService;
    }
    async defaultPath(res) {
        res.send(`✅ Driver API microservice running.\nVersion: ${package_json_1.version}`);
    }
    async verifyPayment(req, res) {
        const token = req.query.token;
        const decrypted = await this.cryptoService.decrypt(token);
        if (decrypted.userType == 'driver') {
            if (decrypted.status == 'success') {
                await this.sharedDriverService.rechargeWallet({
                    driverId: decrypted.userId,
                    amount: decrypted.amount,
                    currency: decrypted.currency,
                    refrenceNumber: decrypted.transactionNumber,
                    action: transaction_action_enum_1.TransactionAction.Recharge,
                    rechargeType: driver_recharge_transaction_type_enum_1.DriverRechargeTransactionType.InAppPayment,
                    paymentGatewayId: decrypted.gatewayId,
                    status: transaction_status_enum_1.TransactionStatus.Done,
                });
                await this.paymentRepository.delete({
                    transactionNumber: decrypted.transactionNumber,
                });
            }
        }
        res
            .code(301)
            .redirect(301, `${process.env.DRIVER_APPLICATION_ID ?? 'default.driver.redirection'}://`);
    }
    async successMessage(req, res) {
        res.send('Transaction successful. Close this page and go back to the app.');
    }
    async upload(req, res) {
        const data = await req.file();
        const dir = 'uploads';
        await fs_1.promises.mkdir(dir, { recursive: true });
        const _fileName = (0, path_1.join)(dir, `${new Date().getTime()}-${data.filename}`);
        await pump(data.file, (0, fs_1.createWriteStream)(_fileName));
        const insert = await this.mediaRepository.save({ address: _fileName });
        await this.driverRepository.update(req.user.id, {
            mediaId: insert.id,
        });
        insert.id = insert.id.toString();
        res.code(200).send(insert);
    }
    async uploadDocuement(req, res) {
        const data = await req.file();
        const dir = 'uploads';
        await fs_1.promises.mkdir(dir, { recursive: true });
        const _fileName = (0, path_1.join)(dir, `${new Date().getTime()}-${data.filename}`);
        await pump(data.file, (0, fs_1.createWriteStream)(_fileName));
        const insert = await this.mediaRepository.save({
            address: _fileName,
            driverDocumentId: req.user.id,
        });
        insert.id = insert.id.toString();
        res.code(200).send(insert);
    }
    async uploadMedia(req, res) {
        const data = await req.file();
        const dir = 'uploads';
        await fs_1.promises.mkdir(dir, { recursive: true });
        const _fileName = (0, path_1.join)(dir, `${new Date().getTime()}-${data.filename}`);
        await pump(data.file, (0, fs_1.createWriteStream)(_fileName));
        const insert = await this.mediaRepository.save({
            address: _fileName,
            uploadedByDriverId: req.user.id,
        });
        insert.id = insert.id.toString();
        res.code(200).send(insert);
    }
};
exports.DriverAPIController = DriverAPIController;
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DriverAPIController.prototype, "defaultPath", null);
tslib_1.__decorate([
    (0, common_1.Get)('payment_result'),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DriverAPIController.prototype, "verifyPayment", null);
tslib_1.__decorate([
    (0, common_1.Get)('success_message'),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DriverAPIController.prototype, "successMessage", null);
tslib_1.__decorate([
    (0, common_1.Post)('upload_profile'),
    (0, common_1.UseGuards)(rest_jwt_auth_guard_1.RestJwtAuthGuard),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DriverAPIController.prototype, "upload", null);
tslib_1.__decorate([
    (0, common_1.Post)('upload_document'),
    (0, common_1.UseGuards)(rest_jwt_auth_guard_1.RestJwtAuthGuard),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DriverAPIController.prototype, "uploadDocuement", null);
tslib_1.__decorate([
    (0, common_1.Post)('upload_media'),
    (0, common_1.UseGuards)(rest_jwt_auth_guard_1.RestJwtAuthGuard),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DriverAPIController.prototype, "uploadMedia", null);
exports.DriverAPIController = DriverAPIController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(media_entity_1.MediaEntity)),
    tslib_1.__param(1, (0, typeorm_1.InjectRepository)(driver_entity_1.DriverEntity)),
    tslib_1.__param(2, (0, typeorm_1.InjectRepository)(payment_entity_1.PaymentEntity)),
    tslib_1.__metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        database_1.CryptoService,
        shared_driver_service_1.SharedDriverService])
], DriverAPIController);


/***/ }),
/* 202 */
/***/ ((module) => {

module.exports = require("fastify");

/***/ }),
/* 203 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RestJwtAuthGuard = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(115);
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
/* 204 */
/***/ ((module) => {

module.exports = JSON.parse('{"name":"ridy","version":"3.1.5","license":"MIT","scripts":{"ng":"nx","postinstall":"node ./decorate-angular-cli.js","nx":"nx","migration:run":"npx ts-node --project libs/database/tsconfig.json ./node_modules/typeorm/cli.js migration:run --dataSource=libs/database/src/lib/database.module.ts","start":"ts-node src/index.ts","build":"nx build","serve":"nx serve","test":"ng test","lint":"nx workspace-lint && ng lint","e2e":"ng e2e","affected:apps":"nx affected:apps","affected:libs":"nx affected:libs","affected:build":"nx affected:build","affected:e2e":"nx affected:e2e","affected:test":"nx affected:test","affected:lint":"nx affected:lint","affected:dep-graph":"nx affected:dep-graph","affected":"nx affected","format":"nx format:write","format:write":"nx format:write","format:check":"nx format:check","update":"nx migrate latest","workspace-generator":"nx workspace-generator","dep-graph":"nx dep-graph","help":"nx help","i18n:extract":"ngx-translate-extract --input ./apps/admin-panel/src --output ./apps/admin-panel/src/assets/i18n/{en,es,bn,de,hi,ko,id,ja,pt,ru,ur,zh,fr,ar,hy}.json --clean --format namespaced-json","typeorm":"node --require ts-node/register ./node_modules/typeorm/cli.js","semantic-release":"semantic-release"},"private":true,"dependencies":{"@angular/animations":"17.0.9","@angular/cdk":"17.0.6","@angular/common":"17.0.9","@angular/compiler":"17.0.9","@angular/core":"17.0.9","@angular/forms":"17.0.9","@angular/google-maps":"^16.2.1","@angular/platform-browser":"17.0.9","@angular/platform-browser-dynamic":"17.0.9","@angular/router":"17.0.9","@angular/service-worker":"17.0.9","@ant-design/icons-angular":"17.0.0","@antv/g2":"^4.2.10","@apollo/client":"^3.7.17","@apollo/server":"^4.3.2","@as-integrations/fastify":"^2.1.0","@fastify/cors":"^8.3.0","@fastify/multipart":"^7.7.3","@fastify/static":"^6.10.2","@googlemaps/google-maps-services-js":"^3.3.34","@ingameltd/payu":"^1.0.5","@nestjs/apollo":"12.0.11","@nestjs/axios":"^3.0.1","@nestjs/common":"10.3.1","@nestjs/config":"^3.1.1","@nestjs/core":"10.3.1","@nestjs/graphql":"^12.0.11","@nestjs/jwt":"^10.2.0","@nestjs/passport":"^10.0.0","@nestjs/platform-fastify":"^10.3.1","@nestjs/schedule":"^4.0.0","@nestjs/serve-static":"^4.0.0","@nestjs/typeorm":"^10.0.1","@nestjs/websockets":"^10.3.1","@nx/angular":"17.2.8","@nx/web":"17.2.8","@paypal/checkout-server-sdk":"^1.0.3","@ptc-org/nestjs-query-core":"^4.2.0","@ptc-org/nestjs-query-graphql":"^4.2.0","@ptc-org/nestjs-query-typeorm":"^4.2.0","@songkeys/nestjs-redis":"^10.0.0","apollo-angular":"^6.0.0","autoprefixer":"^10.4.14","class-transformer":"0.5.1","class-validator":"0.14.0","core-js":"^3.37.0","dataloader":"^2.2.2","dotenv":"16.3.1","fastify":"^4.21.0","firebase-admin":"^11.10.1","graphql":"^16.7.1","graphql-redis-subscriptions":"^2.6.0","graphql-relay":"^0.10.0","graphql-subscriptions":"^2.0.0","graphql-tools":"^9.0.0","handlebars":"^4.7.7","instamojo-payment-nodejs":"^3.0.0","ioredis":"^5.3.2","json-2-csv":"^4.0.0","jwt-decode":"^3.1.2","mercadopago":"^1.5.17","mysql2":"^3.11.3","ng-zorro-antd":"^17.2.0","ngx-timeago":"^3.0.0","node-rsa":"^1.1.1","overshom-wayforpay":"^1.1.0","passport":"^0.6.0","passport-jwt":"^4.0.1","passport-local":"^1.0.0","paystack-node":"^0.3.0","paytm-pg-node-sdk":"^1.0.4","paytmchecksum":"^1.5.1","plivo":"^4.60.1","razorpay":"^2.9.1","reflect-metadata":"^0.1.13","rxjs":"^7.8.1","sberbank-acquiring":"^1.2.1","stripe":"^12.14.0","tslib":"^2.6.1","twilio":"^4.17.0","zone.js":"0.14.3"},"devDependencies":{"@angular-devkit/build-angular":"17.0.10","@angular-devkit/core":"17.0.10","@angular-devkit/schematics":"17.0.10","@angular-eslint/eslint-plugin":"17.0.1","@angular-eslint/eslint-plugin-template":"17.0.1","@angular-eslint/template-parser":"17.0.1","@angular/cli":"~17.0.0","@angular/compiler-cli":"17.0.9","@angular/language-service":"17.0.9","@bartholomej/ngx-translate-extract":"^8.0.2","@graphql-codegen/cli":"^5.0.0","@graphql-codegen/introspection":"^4.0.0","@graphql-codegen/typescript":"^4.0.1","@graphql-codegen/typescript-apollo-angular":"^4.0.0","@graphql-codegen/typescript-operations":"^4.0.1","@nestjs/schematics":"10.1.0","@nestjs/testing":"10.3.1","@ngx-translate/core":"^15.0.0","@ngx-translate/http-loader":"^8.0.0","@nx/eslint":"17.2.8","@nx/eslint-plugin":"17.2.8","@nx/jest":"17.2.8","@nx/js":"17.2.8","@nx/nest":"17.2.8","@nx/node":"17.2.8","@nx/workspace":"17.2.8","@nxrocks/common":"^3.1.0","@nxrocks/nx-flutter":"^8.1.0","@parcel/watcher":"^2.3.0","@schematics/angular":"17.0.10","@semantic-release/changelog":"^6.0.3","@semantic-release/commit-analyzer":"^10.0.1","@semantic-release/git":"^10.0.1","@semantic-release/gitlab":"^12.0.3","@semantic-release/npm":"^10.0.4","@semantic-release/release-notes-generator":"^11.0.4","@tailwindcss/forms":"^0.5.4","@tailwindcss/typography":"^0.5.9","@types/busboy":"^1.5.0","@types/cron":"^2.0.1","@types/estree":"1.0.1","@types/ioredis":"^5.0.0","@types/jest":"29.5.3","@types/node":"^20.11.10","@types/paypal__checkout-server-sdk":"^1.0.5","@typescript-eslint/eslint-plugin":"^6.21.0","@typescript-eslint/parser":"^6.21.0","conventional-changelog-conventionalcommits":"^6.1.0","eslint":"^8.56.0","eslint-config-prettier":"9.1.0","jest":"29.6.1","jest-environment-jsdom":"29.6.1","jest-preset-angular":"13.1.6","json-autotranslate":"^1.11.0","ng-packagr":"17.0.3","nx":"20.0.2","postcss":"^8.4.27","postcss-import":"15.1.0","postcss-preset-env":"9.1.0","postcss-url":"10.1.3","prettier":"3.0.0","semantic-release":"^24.1.0","semantic-release-npm-github-publish":"^1.5.4","semantic-release-plus":"^20.0.0","tailwindcss":"^3.3.3","ts-jest":"29.1.1","ts-node":"^10.9.1","typeorm":"^0.3.20","typescript":"^5.2.2"},"resolutions":{"nx":"20.0.0","semantic-release":"24.1.0","babel/core":"7.4.0","typescript":"^4.9.5"},"overrides":{"@googlemaps/url-signature":"1.0.32"},"repository":{"type":"git","url":"https://github.com/ridyio/ridy-monorepo.git"},"publishConfig":{"access":"restricted"}}');

/***/ }),
/* 205 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AnnouncementsModule = void 0;
const tslib_1 = __webpack_require__(1);
const nestjs_query_graphql_1 = __webpack_require__(107);
const nestjs_query_typeorm_1 = __webpack_require__(136);
const common_1 = __webpack_require__(2);
const announcement_entity_1 = __webpack_require__(35);
const jwt_gql_auth_guard_1 = __webpack_require__(137);
const announcement_dto_1 = __webpack_require__(206);
let AnnouncementsModule = class AnnouncementsModule {
};
exports.AnnouncementsModule = AnnouncementsModule;
exports.AnnouncementsModule = AnnouncementsModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_query_graphql_1.NestjsQueryGraphQLModule.forFeature({
                imports: [nestjs_query_typeorm_1.NestjsQueryTypeOrmModule.forFeature([announcement_entity_1.AnnouncementEntity])],
                resolvers: [
                    {
                        EntityClass: announcement_entity_1.AnnouncementEntity,
                        DTOClass: announcement_dto_1.AnnouncementDTO,
                        read: { one: { disabled: true } },
                        create: { disabled: true },
                        update: { disabled: true },
                        delete: { disabled: true },
                        guards: [jwt_gql_auth_guard_1.GqlAuthGuard],
                    },
                ],
            }),
        ],
    })
], AnnouncementsModule);


/***/ }),
/* 206 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AnnouncementDTO = void 0;
const tslib_1 = __webpack_require__(1);
const eager_import_0 = __webpack_require__(36);
const nestjs_query_graphql_1 = __webpack_require__(107);
const graphql_1 = __webpack_require__(9);
const anouncement_user_type_enum_1 = __webpack_require__(36);
let AnnouncementDTO = class AnnouncementDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, title: { type: () => String }, description: { type: () => String }, startAt: { type: () => Date }, expireAt: { type: () => Date }, url: { nullable: true, type: () => String }, userType: { type: () => [(__webpack_require__(36).AnnouncementUserType)] } };
    }
};
exports.AnnouncementDTO = AnnouncementDTO;
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.IDField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], AnnouncementDTO.prototype, "id", void 0);
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.FilterableField)(() => anouncement_user_type_enum_1.AnnouncementUserType),
    tslib_1.__metadata("design:type", Array)
], AnnouncementDTO.prototype, "userType", void 0);
exports.AnnouncementDTO = AnnouncementDTO = tslib_1.__decorate([
    (0, graphql_1.ObjectType)('Announcement'),
    (0, nestjs_query_graphql_1.QueryOptions)({
        pagingStrategy: nestjs_query_graphql_1.PagingStrategies.NONE,
    }),
    (0, nestjs_query_graphql_1.Authorize)({
        authorize: () => ({
            userType: { in: [[anouncement_user_type_enum_1.AnnouncementUserType.Driver]] },
            startAt: { lt: new Date() },
            expireAt: { gt: new Date() },
        }),
    })
], AnnouncementDTO);


/***/ }),
/* 207 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WalletModule = void 0;
const tslib_1 = __webpack_require__(1);
const nestjs_query_graphql_1 = __webpack_require__(107);
const nestjs_query_typeorm_1 = __webpack_require__(136);
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(11);
const driver_transaction_entity_1 = __webpack_require__(18);
const driver_wallet_entity_1 = __webpack_require__(98);
const payment_gateway_entity_1 = __webpack_require__(37);
const request_entity_1 = __webpack_require__(27);
const jwt_gql_auth_guard_1 = __webpack_require__(137);
const driver_transaction_dto_1 = __webpack_require__(135);
const driver_wallet_dto_1 = __webpack_require__(134);
const payment_gateway_dto_1 = __webpack_require__(130);
const earnings_service_1 = __webpack_require__(208);
const wallet_resolver_1 = __webpack_require__(210);
const saved_payment_method_entity_1 = __webpack_require__(48);
const saved_payment_method_dto_1 = __webpack_require__(132);
const gift_code_entity_1 = __webpack_require__(41);
const coupon_1 = __webpack_require__(175);
const axios_1 = __webpack_require__(160);
const database_1 = __webpack_require__(12);
const wallet_service_1 = __webpack_require__(214);
let WalletModule = class WalletModule {
};
exports.WalletModule = WalletModule;
exports.WalletModule = WalletModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([request_entity_1.RequestEntity]),
            coupon_1.CommonCouponModule,
            axios_1.HttpModule,
            nestjs_query_graphql_1.NestjsQueryGraphQLModule.forFeature({
                imports: [
                    nestjs_query_typeorm_1.NestjsQueryTypeOrmModule.forFeature([
                        driver_transaction_entity_1.DriverTransactionEntity,
                        driver_wallet_entity_1.DriverWalletEntity,
                        payment_gateway_entity_1.PaymentGatewayEntity,
                        saved_payment_method_entity_1.SavedPaymentMethodEntity,
                        gift_code_entity_1.GiftCodeEntity,
                    ]),
                ],
                resolvers: [
                    {
                        EntityClass: driver_transaction_entity_1.DriverTransactionEntity,
                        DTOClass: driver_transaction_dto_1.DriverTransactionDTO,
                        read: { one: { disabled: true } },
                        create: { disabled: true },
                        update: { disabled: true },
                        delete: { disabled: true },
                        guards: [jwt_gql_auth_guard_1.GqlAuthGuard],
                    },
                    {
                        EntityClass: driver_wallet_entity_1.DriverWalletEntity,
                        DTOClass: driver_wallet_dto_1.DriverWalletDTO,
                        read: { one: { disabled: true } },
                        create: { disabled: true },
                        update: { disabled: true },
                        delete: { disabled: true },
                        guards: [jwt_gql_auth_guard_1.GqlAuthGuard],
                        pagingStrategy: nestjs_query_graphql_1.PagingStrategies.NONE,
                    },
                    {
                        EntityClass: payment_gateway_entity_1.PaymentGatewayEntity,
                        DTOClass: payment_gateway_dto_1.PaymentGatewayDTO,
                        read: { one: { disabled: true } },
                        create: { disabled: true },
                        update: { disabled: true },
                        delete: { disabled: true },
                        pagingStrategy: nestjs_query_graphql_1.PagingStrategies.NONE,
                    },
                    {
                        EntityClass: saved_payment_method_entity_1.SavedPaymentMethodEntity,
                        DTOClass: saved_payment_method_dto_1.SavedPaymentMethodDto,
                        guards: [jwt_gql_auth_guard_1.GqlAuthGuard],
                        read: { disabled: false },
                        create: { disabled: true },
                        update: { disabled: true },
                        delete: { disabled: true },
                        pagingStrategy: nestjs_query_graphql_1.PagingStrategies.NONE,
                    },
                ],
            }),
        ],
        providers: [wallet_resolver_1.WalletResolver, earnings_service_1.EarningsService, database_1.CryptoService, wallet_service_1.WalletService],
        exports: [wallet_service_1.WalletService],
    })
], WalletModule);


/***/ }),
/* 208 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EarningsService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(11);
const request_entity_1 = __webpack_require__(27);
const typeorm_2 = __webpack_require__(14);
const earnings_dto_1 = __webpack_require__(209);
let EarningsService = class EarningsService {
    constructor(requestRepository) {
        this.requestRepository = requestRepository;
    }
    async getStats(driverId, timeFrame) {
        const q = await this.requestRepository.query('SELECT currency, COUNT(currency) as count from request where driverId = ? group by currency order by count desc LIMIT 1', [driverId]);
        if (q.length < 1) {
            return {
                currency: 'USD',
                dataset: [],
            };
        }
        const mostUsedCurrency = q[0].currency;
        let dataset;
        const fields = 'SUM(costBest - providerShare) AS earning, COUNT(id) AS count, SUM(distanceBest) AS distance, SUM(durationBest) AS time';
        switch (timeFrame) {
            case earnings_dto_1.TimeQuery.Daily:
                dataset = await this.requestRepository.query(`SELECT ANY_VALUE(DATE_FORMAT(requestTimestamp, '%W')) as name, CONCAT(ANY_VALUE(MONTH(CURRENT_TIMESTAMP)),'/',ANY_VALUE(DAY(CURRENT_TIMESTAMP))) AS current, ${fields} from request WHERE DATEDIFF(NOW(),requestTimestamp) < 7 AND driverId = ? AND currency = ? GROUP BY DATE(requestTimestamp)`, [driverId, mostUsedCurrency]);
                break;
            case earnings_dto_1.TimeQuery.Weekly:
                dataset = await this.requestRepository.query(`SELECT CONCAT(ANY_VALUE(YEAR(requestTimestamp)),',W',ANY_VALUE(WEEK(requestTimestamp))) AS name, CONCAT(ANY_VALUE(YEAR(CURRENT_TIMESTAMP)),',W',ANY_VALUE(WEEK(CURRENT_TIMESTAMP))) AS current, ${fields} FROM request WHERE driverId = ? AND currency = ? GROUP BY YEAR(requestTimestamp), WEEK(requestTimestamp)`, [driverId, mostUsedCurrency]);
                break;
            case earnings_dto_1.TimeQuery.Monthly:
                dataset = await this.requestRepository.query(`SELECT CONCAT(ANY_VALUE(YEAR(requestTimestamp)),'/',ANY_VALUE(MONTH(requestTimestamp))) AS name, CONCAT(ANY_VALUE(YEAR(CURRENT_TIMESTAMP)),'/',ANY_VALUE(MONTH(CURRENT_TIMESTAMP))) AS current, ${fields} FROM request WHERE DATE(requestTimestamp) > DATE(MAKEDATE(year(now()),1)) AND driverId = ? AND currency = ? GROUP BY YEAR(requestTimestamp), MONTH(requestTimestamp)`, [driverId, mostUsedCurrency]);
                break;
        }
        return {
            currency: mostUsedCurrency,
            dataset: dataset,
        };
    }
    async getStatsNew(input) {
        const q = await this.requestRepository.query('SELECT currency, COUNT(currency) as count from request where driverId = ? group by currency order by count desc LIMIT 1', [input.driverId]);
        if (q.length < 1) {
            return {
                currency: 'USD',
                dataset: [],
            };
        }
        const mostUsedCurrency = q[0].currency;
        let dataset;
        const fields = 'SUM(costBest - providerShare) AS earning, COUNT(id) AS count, SUM(distanceBest) AS distance, SUM(durationBest) AS time';
        switch (input.timeFrame) {
            case earnings_dto_1.TimeQuery.Daily:
                dataset = await this.requestRepository.query(`SELECT ANY_VALUE(DATE_FORMAT(requestTimestamp, '%W')) as name, CONCAT(ANY_VALUE(MONTH(CURRENT_TIMESTAMP)),'/',ANY_VALUE(DAY(CURRENT_TIMESTAMP))) AS current, ${fields} from request WHERE requestTimestamp > ? AND requestTimestamp < ? AND driverId = ? AND currency = ? GROUP BY DATE(requestTimestamp)`, [input.startDate, input.endDate, input.driverId, mostUsedCurrency]);
                break;
            case earnings_dto_1.TimeQuery.Weekly:
                dataset = await this.requestRepository.query(`SELECT CONCAT(ANY_VALUE(YEAR(requestTimestamp)),',W',ANY_VALUE(WEEK(requestTimestamp))) AS name, CONCAT(ANY_VALUE(YEAR(CURRENT_TIMESTAMP)),',W',ANY_VALUE(WEEK(CURRENT_TIMESTAMP))) AS current, ${fields} FROM request WHERE requestTimestamp > ? AND requestTimestamp < ? AND driverId = ? AND currency = ? GROUP BY YEAR(requestTimestamp), WEEK(requestTimestamp)`, [input.startDate, input.endDate, input.driverId, mostUsedCurrency]);
                break;
            case earnings_dto_1.TimeQuery.Monthly:
                dataset = await this.requestRepository.query(`SELECT CONCAT(ANY_VALUE(YEAR(requestTimestamp)),'/',ANY_VALUE(MONTH(requestTimestamp))) AS name, CONCAT(ANY_VALUE(YEAR(CURRENT_TIMESTAMP)),'/',ANY_VALUE(MONTH(CURRENT_TIMESTAMP))) AS current, ${fields} FROM request WHERE requestTimestamp > ? AND requestTimestamp < ? AND driverId = ? AND currency = ? GROUP BY YEAR(requestTimestamp), MONTH(requestTimestamp)`, [input.startDate, input.endDate, input.driverId, mostUsedCurrency]);
                break;
        }
        return {
            currency: mostUsedCurrency,
            dataset: dataset,
        };
    }
};
exports.EarningsService = EarningsService;
exports.EarningsService = EarningsService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(request_entity_1.RequestEntity)),
    tslib_1.__metadata("design:paramtypes", [typeorm_2.Repository])
], EarningsService);


/***/ }),
/* 209 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Datapoint = exports.StatisticsResult = exports.TimeQuery = void 0;
const tslib_1 = __webpack_require__(1);
const eager_import_0 = __webpack_require__(209);
const graphql_1 = __webpack_require__(9);
var TimeQuery;
(function (TimeQuery) {
    TimeQuery["Daily"] = "daily";
    TimeQuery["Weekly"] = "weekly";
    TimeQuery["Monthly"] = "monthly";
})(TimeQuery || (exports.TimeQuery = TimeQuery = {}));
(0, graphql_1.registerEnumType)(TimeQuery, { name: 'TimeQuery' });
let StatisticsResult = class StatisticsResult {
    static _GRAPHQL_METADATA_FACTORY() {
        return { currency: { type: () => String }, dataset: { type: () => [(__webpack_require__(209).Datapoint)] } };
    }
};
exports.StatisticsResult = StatisticsResult;
exports.StatisticsResult = StatisticsResult = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], StatisticsResult);
let Datapoint = class Datapoint {
    static _GRAPHQL_METADATA_FACTORY() {
        return { name: { type: () => String }, current: { type: () => String }, earning: { type: () => Number }, count: { type: () => Number }, distance: { type: () => Number }, time: { type: () => Number } };
    }
};
exports.Datapoint = Datapoint;
exports.Datapoint = Datapoint = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], Datapoint);


/***/ }),
/* 210 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WalletResolver = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const graphql_1 = __webpack_require__(9);
const typeorm_1 = __webpack_require__(11);
const payment_gateway_entity_1 = __webpack_require__(37);
const typeorm_2 = __webpack_require__(14);
const jwt_gql_auth_guard_1 = __webpack_require__(137);
const earnings_dto_1 = __webpack_require__(209);
const top_up_wallet_input_1 = __webpack_require__(211);
const earnings_service_1 = __webpack_require__(208);
const gift_card_dto_1 = __webpack_require__(212);
const coupon_1 = __webpack_require__(175);
const setup_payment_method_dto_1 = __webpack_require__(213);
const rxjs_1 = __webpack_require__(166);
const database_1 = __webpack_require__(12);
const axios_1 = __webpack_require__(160);
const saved_payment_method_dto_1 = __webpack_require__(132);
const saved_payment_method_entity_1 = __webpack_require__(48);
let WalletResolver = class WalletResolver {
    constructor(gatewayRepo, savedPaymentMethodRepo, context, earningsService, commonGiftCardService, httpService, cryptoService) {
        this.gatewayRepo = gatewayRepo;
        this.savedPaymentMethodRepo = savedPaymentMethodRepo;
        this.context = context;
        this.earningsService = earningsService;
        this.commonGiftCardService = commonGiftCardService;
        this.httpService = httpService;
        this.cryptoService = cryptoService;
    }
    async topUpWallet(input) {
        const gateway = await this.gatewayRepo.findOneBy({ id: input.gatewayId });
        const params = `userType=driver&userId=${this.context.req.user.id}&paymentGatewayId=${gateway.id}&amount=${input.amount}&currency=${input.currency}&returnUrl=${process.env.DRIVER_SERVER_URL}/payment_result`;
        return {
            status: top_up_wallet_input_1.TopUpWalletStatus.Redirect,
            url: `${process.env.GATEWAY_SERVER_URL}/pay?${params}`,
        };
    }
    async getStats(timeFrame) {
        return this.earningsService.getStats(this.context.req.user.id, timeFrame);
    }
    async getStatsNew(timeFrame, startDate, endDate) {
        return this.earningsService.getStatsNew({
            driverId: this.context.req.user.id,
            timeFrame,
            startDate,
            endDate,
        });
    }
    async setupPaymentMethod(gatewayId) {
        const obj = {
            gatewayId: gatewayId.toString(),
            userType: 'driver',
            currency: 'usd',
            userId: this.context.req.user.id.toString(),
            returnUrl: `${process.env.DRIVER_APPLICATION_ID ?? 'default.driver.redirection'}://`,
        };
        const encrypted = await this.cryptoService.encrypt(JSON.stringify(obj));
        const result = await (0, rxjs_1.firstValueFrom)(this.httpService.post(`${process.env.GATEWAY_SERVER_URL}/setup_saved_payment_method`, {
            token: encrypted,
        }));
        return result.data;
    }
    async updatePaymentMethodDefault(id, isDefault) {
        if (isDefault) {
            await this.savedPaymentMethodRepo.update({ riderId: this.context.req.user.id }, { isDefault: false });
        }
        await this.savedPaymentMethodRepo.update({ id }, { isDefault });
        return this.savedPaymentMethodRepo.find({
            where: { riderId: this.context.req.user.id },
        });
    }
    async redeemGiftCard(code) {
        return this.commonGiftCardService.redeemGiftCard({
            code,
            userType: 'driver',
            userId: this.context.req.user.id,
        });
    }
};
exports.WalletResolver = WalletResolver;
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => top_up_wallet_input_1.TopUpWalletResponse),
    tslib_1.__param(0, (0, graphql_1.Args)('input', { type: () => top_up_wallet_input_1.TopUpWalletInput })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [top_up_wallet_input_1.TopUpWalletInput]),
    tslib_1.__metadata("design:returntype", Promise)
], WalletResolver.prototype, "topUpWallet", null);
tslib_1.__decorate([
    (0, graphql_1.Query)(() => earnings_dto_1.StatisticsResult),
    tslib_1.__param(0, (0, graphql_1.Args)('timeframe', { type: () => earnings_dto_1.TimeQuery })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], WalletResolver.prototype, "getStats", null);
tslib_1.__decorate([
    (0, graphql_1.Query)(() => earnings_dto_1.StatisticsResult),
    tslib_1.__param(0, (0, graphql_1.Args)('timeframe', { type: () => earnings_dto_1.TimeQuery })),
    tslib_1.__param(1, (0, graphql_1.Args)('startDate', { type: () => graphql_1.GraphQLISODateTime })),
    tslib_1.__param(2, (0, graphql_1.Args)('endDate', { type: () => graphql_1.GraphQLISODateTime })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Date,
        Date]),
    tslib_1.__metadata("design:returntype", Promise)
], WalletResolver.prototype, "getStatsNew", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => setup_payment_method_dto_1.SetupPaymentMethodDto),
    tslib_1.__param(0, (0, graphql_1.Args)('gatewayId', { type: () => graphql_1.ID })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], WalletResolver.prototype, "setupPaymentMethod", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => [saved_payment_method_dto_1.SavedPaymentMethodDto]),
    tslib_1.__param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    tslib_1.__param(1, (0, graphql_1.Args)('isDefault', { type: () => Boolean })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Boolean]),
    tslib_1.__metadata("design:returntype", Promise)
], WalletResolver.prototype, "updatePaymentMethodDefault", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => gift_card_dto_1.GiftCardDTO),
    tslib_1.__param(0, (0, graphql_1.Args)('code', { type: () => String })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], WalletResolver.prototype, "redeemGiftCard", null);
exports.WalletResolver = WalletResolver = tslib_1.__decorate([
    (0, common_1.UseGuards)(jwt_gql_auth_guard_1.GqlAuthGuard),
    (0, graphql_1.Resolver)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(payment_gateway_entity_1.PaymentGatewayEntity)),
    tslib_1.__param(1, (0, typeorm_1.InjectRepository)(saved_payment_method_entity_1.SavedPaymentMethodEntity)),
    tslib_1.__param(2, (0, common_1.Inject)(graphql_1.CONTEXT)),
    tslib_1.__metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository, Object, earnings_service_1.EarningsService,
        coupon_1.CommonGiftCardService,
        axios_1.HttpService,
        database_1.CryptoService])
], WalletResolver);


/***/ }),
/* 211 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TopUpWalletResponse = exports.TopUpWalletInput = exports.TopUpWalletStatus = void 0;
const tslib_1 = __webpack_require__(1);
const eager_import_0 = __webpack_require__(211);
const graphql_1 = __webpack_require__(9);
const payment_mode_enum_1 = __webpack_require__(93);
var TopUpWalletStatus;
(function (TopUpWalletStatus) {
    TopUpWalletStatus["OK"] = "ok";
    TopUpWalletStatus["Redirect"] = "redirect";
    TopUpWalletStatus["Failed"] = "failed";
})(TopUpWalletStatus || (exports.TopUpWalletStatus = TopUpWalletStatus = {}));
(0, graphql_1.registerEnumType)(TopUpWalletStatus, { name: 'TopUpWalletStatus' });
let TopUpWalletInput = class TopUpWalletInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { amount: { type: () => Number }, currency: { type: () => String }, token: { nullable: true, type: () => String }, pin: { nullable: true, type: () => Number }, otp: { nullable: true, type: () => Number }, transactionId: { nullable: true, type: () => String } };
    }
};
exports.TopUpWalletInput = TopUpWalletInput;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {}),
    tslib_1.__metadata("design:type", Number)
], TopUpWalletInput.prototype, "gatewayId", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => payment_mode_enum_1.PaymentMode, { defaultValue: payment_mode_enum_1.PaymentMode.PaymentGateway }),
    tslib_1.__metadata("design:type", String)
], TopUpWalletInput.prototype, "paymentMode", void 0);
exports.TopUpWalletInput = TopUpWalletInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], TopUpWalletInput);
let TopUpWalletResponse = class TopUpWalletResponse {
    static _GRAPHQL_METADATA_FACTORY() {
        return { status: { type: () => (__webpack_require__(211).TopUpWalletStatus) }, url: { nullable: true, type: () => String }, error: { nullable: true, type: () => String } };
    }
};
exports.TopUpWalletResponse = TopUpWalletResponse;
exports.TopUpWalletResponse = TopUpWalletResponse = tslib_1.__decorate([
    (0, graphql_1.ObjectType)()
], TopUpWalletResponse);


/***/ }),
/* 212 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GiftCardDTO = void 0;
const tslib_1 = __webpack_require__(1);
const graphql_1 = __webpack_require__(9);
const nestjs_query_graphql_1 = __webpack_require__(107);
let GiftCardDTO = class GiftCardDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, amount: { type: () => Number }, currency: { type: () => String } };
    }
};
exports.GiftCardDTO = GiftCardDTO;
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.IDField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], GiftCardDTO.prototype, "id", void 0);
exports.GiftCardDTO = GiftCardDTO = tslib_1.__decorate([
    (0, graphql_1.ObjectType)('GiftCard')
], GiftCardDTO);


/***/ }),
/* 213 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SetupPaymentMethodDto = void 0;
const tslib_1 = __webpack_require__(1);
const graphql_1 = __webpack_require__(9);
let SetupPaymentMethodDto = class SetupPaymentMethodDto {
    static _GRAPHQL_METADATA_FACTORY() {
        return { url: { nullable: true, type: () => String } };
    }
};
exports.SetupPaymentMethodDto = SetupPaymentMethodDto;
exports.SetupPaymentMethodDto = SetupPaymentMethodDto = tslib_1.__decorate([
    (0, graphql_1.ObjectType)('SetupPaymentMethod')
], SetupPaymentMethodDto);


/***/ }),
/* 214 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WalletService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(11);
const payment_gateway_entity_1 = __webpack_require__(37);
const typeorm_2 = __webpack_require__(14);
const payment_gateway_type_enum_1 = __webpack_require__(43);
const gateway_link_method_1 = __webpack_require__(131);
let WalletService = class WalletService {
    constructor(gatewayRepo) {
        this.gatewayRepo = gatewayRepo;
    }
    async getGateways() {
        let result = await this.gatewayRepo.find({
            where: { enabled: true },
        });
        result = result.map((item) => {
            item['linkMethod'] =
                item.type == payment_gateway_type_enum_1.PaymentGatewayType.Stripe
                    ? gateway_link_method_1.GatewayLinkMethod.redirect
                    : gateway_link_method_1.GatewayLinkMethod.none;
            return item;
        });
        return result;
    }
};
exports.WalletService = WalletService;
exports.WalletService = WalletService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(payment_gateway_entity_1.PaymentGatewayEntity)),
    tslib_1.__metadata("design:paramtypes", [typeorm_2.Repository])
], WalletService);


/***/ }),
/* 215 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServiceModule = void 0;
const tslib_1 = __webpack_require__(1);
const nestjs_query_graphql_1 = __webpack_require__(107);
const nestjs_query_typeorm_1 = __webpack_require__(136);
const common_1 = __webpack_require__(2);
const media_entity_1 = __webpack_require__(34);
const service_category_entity_1 = __webpack_require__(63);
const service_entity_1 = __webpack_require__(56);
const service_service_1 = __webpack_require__(162);
const upload_module_1 = __webpack_require__(143);
const service_dto_1 = __webpack_require__(127);
let ServiceModule = class ServiceModule {
};
exports.ServiceModule = ServiceModule;
exports.ServiceModule = ServiceModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            upload_module_1.UploadModule,
            nestjs_query_graphql_1.NestjsQueryGraphQLModule.forFeature({
                imports: [
                    nestjs_query_typeorm_1.NestjsQueryTypeOrmModule.forFeature([
                        service_entity_1.ServiceEntity,
                        service_category_entity_1.ServiceCategoryEntity,
                        media_entity_1.MediaEntity,
                    ]),
                ],
                resolvers: [
                    {
                        EntityClass: service_entity_1.ServiceEntity,
                        DTOClass: service_dto_1.ServiceDTO,
                        create: { disabled: true },
                        read: { disabled: true },
                        update: { disabled: true },
                        delete: { disabled: true },
                    },
                    // {
                    //     EntityClass: ServiceCategoryEntity,
                    //     DTOClass: ServiceCategoryDTO,
                    //     pagingStrategy: PagingStrategies.NONE,
                    //     create: { disabled: true },
                    //     read: { one: { disabled: true } },
                    //     update: { disabled: true },
                    //     delete: { disabled: true },
                    // }
                ],
            }),
        ],
        providers: [service_service_1.ServiceService],
        exports: [service_service_1.ServiceService],
    })
], ServiceModule);


/***/ }),
/* 216 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChatModule = void 0;
const tslib_1 = __webpack_require__(1);
const nestjs_query_graphql_1 = __webpack_require__(107);
const nestjs_query_typeorm_1 = __webpack_require__(136);
const common_1 = __webpack_require__(2);
const database_1 = __webpack_require__(12);
const request_message_entity_1 = __webpack_require__(84);
const request_entity_1 = __webpack_require__(27);
const firebase_notification_service_module_1 = __webpack_require__(150);
const rider_notification_service_1 = __webpack_require__(153);
const jwt_gql_auth_guard_1 = __webpack_require__(137);
const order_module_1 = __webpack_require__(149);
const chat_resolver_1 = __webpack_require__(217);
const chat_service_1 = __webpack_require__(218);
const chat_subscription_service_1 = __webpack_require__(219);
const order_message_dto_1 = __webpack_require__(128);
const order_message_input_1 = __webpack_require__(220);
let ChatModule = class ChatModule {
};
exports.ChatModule = ChatModule;
exports.ChatModule = ChatModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            order_module_1.OrderModule,
            firebase_notification_service_module_1.FirebaseNotificationModule.register(),
            nestjs_query_graphql_1.NestjsQueryGraphQLModule.forFeature({
                imports: [
                    nestjs_query_typeorm_1.NestjsQueryTypeOrmModule.forFeature([
                        request_message_entity_1.OrderMessageEntity,
                        request_entity_1.RequestEntity,
                    ]),
                ],
                services: [chat_service_1.ChatService, rider_notification_service_1.RiderNotificationService],
                pubSub: database_1.RedisPubSubProvider.provider(),
                resolvers: [
                    {
                        EntityClass: request_message_entity_1.OrderMessageEntity,
                        DTOClass: order_message_dto_1.OrderMessageDTO,
                        CreateDTOClass: order_message_input_1.OrderMessageInput,
                        ServiceClass: chat_service_1.ChatService,
                        pagingStrategy: nestjs_query_graphql_1.PagingStrategies.NONE,
                        create: { many: { disabled: true } },
                        read: { one: { disabled: true } },
                        update: { disabled: true },
                        delete: { disabled: true },
                        guards: [jwt_gql_auth_guard_1.GqlAuthGuard],
                    },
                ],
            }),
        ],
        providers: [
            chat_subscription_service_1.ChatSubscriptionService,
            chat_resolver_1.ChatResolver,
            database_1.RedisPubSubProvider.provider(),
        ],
    })
], ChatModule);


/***/ }),
/* 217 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChatResolver = void 0;
const tslib_1 = __webpack_require__(1);
const graphql_1 = __webpack_require__(9);
const chat_service_1 = __webpack_require__(218);
let ChatResolver = class ChatResolver {
    constructor(chatService) {
        this.chatService = chatService;
    }
    async updateLastSeenMessagesAt(orderId) {
        return await this.chatService.updateLastSeenMessagesAt(orderId);
    }
};
exports.ChatResolver = ChatResolver;
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    tslib_1.__param(0, (0, graphql_1.Args)('orderId', { type: () => graphql_1.ID })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], ChatResolver.prototype, "updateLastSeenMessagesAt", null);
exports.ChatResolver = ChatResolver = tslib_1.__decorate([
    (0, graphql_1.Resolver)(),
    tslib_1.__metadata("design:paramtypes", [chat_service_1.ChatService])
], ChatResolver);


/***/ }),
/* 218 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChatService = void 0;
const tslib_1 = __webpack_require__(1);
const nestjs_query_core_1 = __webpack_require__(133);
const nestjs_query_graphql_1 = __webpack_require__(107);
const nestjs_query_typeorm_1 = __webpack_require__(136);
const typeorm_1 = __webpack_require__(11);
const request_message_entity_1 = __webpack_require__(84);
const request_entity_1 = __webpack_require__(27);
const rider_notification_service_1 = __webpack_require__(153);
const graphql_redis_subscriptions_1 = __webpack_require__(108);
const typeorm_2 = __webpack_require__(14);
let ChatService = class ChatService extends nestjs_query_typeorm_1.TypeOrmQueryService {
    constructor(repository, requestRepository, pubSub, riderNotificationService) {
        super(repository);
        this.repository = repository;
        this.requestRepository = requestRepository;
        this.pubSub = pubSub;
        this.riderNotificationService = riderNotificationService;
    }
    async createOne(input) {
        let message = await super.createOne({ ...input, sentByDriver: true });
        const order = await this.requestRepository.findOne({
            where: { id: message.requestId },
            relations: {
                rider: true,
                driver: true,
            },
        });
        message = await this.getById(message.id);
        this.riderNotificationService.message(order.rider, message);
        this.pubSub.publish('newMessageForRider', {
            newMessageReceived: message,
            riderId: order.riderId,
        });
        return message;
    }
    async updateLastSeenMessagesAt(orderId) {
        await this.requestRepository.update(orderId, {
            driverLastSeenMessagesAt: new Date(),
        });
        return true;
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = tslib_1.__decorate([
    (0, nestjs_query_core_1.QueryService)(request_message_entity_1.OrderMessageEntity),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(request_message_entity_1.OrderMessageEntity)),
    tslib_1.__param(1, (0, typeorm_1.InjectRepository)(request_entity_1.RequestEntity)),
    tslib_1.__param(2, (0, nestjs_query_graphql_1.InjectPubSub)()),
    tslib_1.__metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        graphql_redis_subscriptions_1.RedisPubSub,
        rider_notification_service_1.RiderNotificationService])
], ChatService);


/***/ }),
/* 219 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChatSubscriptionService = void 0;
const tslib_1 = __webpack_require__(1);
const nestjs_query_graphql_1 = __webpack_require__(107);
const common_1 = __webpack_require__(2);
const graphql_1 = __webpack_require__(9);
const graphql_redis_subscriptions_1 = __webpack_require__(108);
const order_message_dto_1 = __webpack_require__(128);
let ChatSubscriptionService = class ChatSubscriptionService {
    constructor(pubSub) {
        this.pubSub = pubSub;
    }
    newMessageReceived() {
        return this.pubSub.asyncIterator('newMessageForDriver');
    }
};
exports.ChatSubscriptionService = ChatSubscriptionService;
tslib_1.__decorate([
    (0, graphql_1.Subscription)(() => order_message_dto_1.OrderMessageDTO, {
        filter: (payload, variables, context) => {
            return context.id == payload.driverId;
        },
        resolve: (payload) => {
            common_1.Logger.log(`newMessageReceived for driver: ${payload.driverId}`, payload.newMessageReceived);
            payload.newMessageReceived.sentAt = new Date(payload.newMessageReceived.sentAt);
            return payload.newMessageReceived;
        },
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], ChatSubscriptionService.prototype, "newMessageReceived", null);
exports.ChatSubscriptionService = ChatSubscriptionService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, nestjs_query_graphql_1.InjectPubSub)()),
    tslib_1.__metadata("design:paramtypes", [graphql_redis_subscriptions_1.RedisPubSub])
], ChatSubscriptionService);


/***/ }),
/* 220 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderMessageInput = void 0;
const tslib_1 = __webpack_require__(1);
const graphql_1 = __webpack_require__(9);
let OrderMessageInput = class OrderMessageInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { content: { type: () => String } };
    }
};
exports.OrderMessageInput = OrderMessageInput;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {}),
    tslib_1.__metadata("design:type", Number)
], OrderMessageInput.prototype, "requestId", void 0);
exports.OrderMessageInput = OrderMessageInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], OrderMessageInput);


/***/ }),
/* 221 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ComplaintModule = void 0;
const tslib_1 = __webpack_require__(1);
const nestjs_query_graphql_1 = __webpack_require__(107);
const nestjs_query_typeorm_1 = __webpack_require__(136);
const common_1 = __webpack_require__(2);
const complaint_entity_1 = __webpack_require__(25);
const jwt_gql_auth_guard_1 = __webpack_require__(137);
const complaint_dto_1 = __webpack_require__(222);
const complaint_input_1 = __webpack_require__(223);
let ComplaintModule = class ComplaintModule {
};
exports.ComplaintModule = ComplaintModule;
exports.ComplaintModule = ComplaintModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_query_graphql_1.NestjsQueryGraphQLModule.forFeature({
                imports: [nestjs_query_typeorm_1.NestjsQueryTypeOrmModule.forFeature([complaint_entity_1.ComplaintEntity])],
                resolvers: [
                    {
                        EntityClass: complaint_entity_1.ComplaintEntity,
                        DTOClass: complaint_dto_1.ComplaintDTO,
                        CreateDTOClass: complaint_input_1.ComplaintInput,
                        read: { disabled: true },
                        update: { disabled: true },
                        delete: { disabled: true },
                        create: { many: { disabled: true } },
                        guards: [jwt_gql_auth_guard_1.GqlAuthGuard],
                    },
                ],
            }),
        ],
    })
], ComplaintModule);


/***/ }),
/* 222 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ComplaintDTO = void 0;
const tslib_1 = __webpack_require__(1);
const eager_import_0 = __webpack_require__(26);
const nestjs_query_graphql_1 = __webpack_require__(107);
const graphql_1 = __webpack_require__(9);
let ComplaintDTO = class ComplaintDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, subject: { type: () => String }, content: { nullable: true, type: () => String }, status: { type: () => (__webpack_require__(26).ComplaintStatus) } };
    }
};
exports.ComplaintDTO = ComplaintDTO;
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.IDField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], ComplaintDTO.prototype, "id", void 0);
exports.ComplaintDTO = ComplaintDTO = tslib_1.__decorate([
    (0, graphql_1.ObjectType)('Complaint')
], ComplaintDTO);


/***/ }),
/* 223 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ComplaintInput = void 0;
const tslib_1 = __webpack_require__(1);
const nestjs_query_graphql_1 = __webpack_require__(107);
const graphql_1 = __webpack_require__(9);
let ComplaintInput = class ComplaintInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { subject: { type: () => String }, content: { nullable: true, type: () => String }, requestedByDriver: { nullable: true, type: () => Boolean } };
    }
};
exports.ComplaintInput = ComplaintInput;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {}),
    tslib_1.__metadata("design:type", Number)
], ComplaintInput.prototype, "requestId", void 0);
exports.ComplaintInput = ComplaintInput = tslib_1.__decorate([
    (0, graphql_1.InputType)(),
    (0, nestjs_query_graphql_1.BeforeCreateOne)((input) => {
        input.input.requestedByDriver = true;
        return input;
    })
], ComplaintInput);


/***/ }),
/* 224 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FeedbacksModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(11);
const feedback_entity_1 = __webpack_require__(82);
const feedbacks_service_1 = __webpack_require__(225);
const feedbacks_resolver_1 = __webpack_require__(226);
const driver_entity_1 = __webpack_require__(16);
let FeedbacksModule = class FeedbacksModule {
};
exports.FeedbacksModule = FeedbacksModule;
exports.FeedbacksModule = FeedbacksModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([feedback_entity_1.FeedbackEntity, driver_entity_1.DriverEntity])],
        providers: [feedbacks_service_1.FeedbacksService, feedbacks_resolver_1.FeedbacksResolver],
        exports: [],
    })
], FeedbacksModule);


/***/ }),
/* 225 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FeedbacksService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(11);
const typeorm_2 = __webpack_require__(14);
const feedback_entity_1 = __webpack_require__(82);
const typeorm_3 = __webpack_require__(14);
const driver_entity_1 = __webpack_require__(16);
let FeedbacksService = class FeedbacksService {
    constructor(feedbackRepository, driverRepository) {
        this.feedbackRepository = feedbackRepository;
        this.driverRepository = driverRepository;
    }
    async getFeedbacksSummary(input) {
        const driver = await this.driverRepository.findOneOrFail({
            where: { id: input.driverId },
        });
        const goodFeedbacks = await this.feedbackRepository.find({
            where: {
                driverId: driver.id,
                score: (0, typeorm_2.MoreThan)(90),
                description: (0, typeorm_2.Not)((0, typeorm_2.IsNull)()),
            },
            relations: ['request.service', 'parameters'],
        });
        const points = await this.driverRepository.query(`
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
          ORDER BY isGood DESC, count DESC`, [input.driverId]);
        const goodPoints = points.filter((p) => p.isGood).map((p) => p.title);
        const badPoints = points.filter((p) => !p.isGood).map((p) => p.title);
        return {
            averageRating: driver.rating,
            goodReviews: goodFeedbacks.map((feedback) => ({
                serviceName: feedback.request.service?.name ?? 'Deleted Service',
                rating: feedback.score,
                review: feedback.description,
                goodPoints: feedback.parameters
                    .filter((p) => p.isGood)
                    .map((p) => p.title),
            })),
            goodPoints,
            badPoints,
        };
    }
};
exports.FeedbacksService = FeedbacksService;
exports.FeedbacksService = FeedbacksService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(feedback_entity_1.FeedbackEntity)),
    tslib_1.__param(1, (0, typeorm_1.InjectRepository)(driver_entity_1.DriverEntity)),
    tslib_1.__metadata("design:paramtypes", [typeorm_3.Repository,
        typeorm_3.Repository])
], FeedbacksService);


/***/ }),
/* 226 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FeedbacksResolver = void 0;
const tslib_1 = __webpack_require__(1);
const graphql_1 = __webpack_require__(9);
const feedbacks_service_1 = __webpack_require__(225);
const feedbacks_summary_dto_1 = __webpack_require__(227);
const common_1 = __webpack_require__(2);
const jwt_gql_auth_guard_1 = __webpack_require__(137);
let FeedbacksResolver = class FeedbacksResolver {
    constructor(feedbacksService, userContext) {
        this.feedbacksService = feedbacksService;
        this.userContext = userContext;
    }
    async feedbacksSummary() {
        return this.feedbacksService.getFeedbacksSummary({
            driverId: this.userContext.req.user.id,
        });
    }
};
exports.FeedbacksResolver = FeedbacksResolver;
tslib_1.__decorate([
    (0, graphql_1.Query)(() => feedbacks_summary_dto_1.FeedbacksSummaryDTO),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], FeedbacksResolver.prototype, "feedbacksSummary", null);
exports.FeedbacksResolver = FeedbacksResolver = tslib_1.__decorate([
    (0, graphql_1.Resolver)(),
    (0, common_1.UseGuards)(jwt_gql_auth_guard_1.GqlAuthGuard),
    tslib_1.__param(1, (0, common_1.Inject)(graphql_1.CONTEXT)),
    tslib_1.__metadata("design:paramtypes", [feedbacks_service_1.FeedbacksService, Object])
], FeedbacksResolver);


/***/ }),
/* 227 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FeedbacksSummaryDTO = void 0;
const tslib_1 = __webpack_require__(1);
const eager_import_0 = __webpack_require__(228);
const graphql_1 = __webpack_require__(9);
let FeedbacksSummaryDTO = class FeedbacksSummaryDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { averageRating: { nullable: true, type: () => Number }, goodPoints: { type: () => [String] }, badPoints: { type: () => [String] }, goodReviews: { type: () => [(__webpack_require__(228).ReviewEntity)] } };
    }
};
exports.FeedbacksSummaryDTO = FeedbacksSummaryDTO;
exports.FeedbacksSummaryDTO = FeedbacksSummaryDTO = tslib_1.__decorate([
    (0, graphql_1.ObjectType)('FeedbacksSummary')
], FeedbacksSummaryDTO);


/***/ }),
/* 228 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReviewEntity = void 0;
const tslib_1 = __webpack_require__(1);
const graphql_1 = __webpack_require__(9);
let ReviewEntity = class ReviewEntity {
    static _GRAPHQL_METADATA_FACTORY() {
        return { serviceName: { type: () => String }, rating: { type: () => Number }, review: { type: () => String }, goodPoints: { type: () => [String] } };
    }
};
exports.ReviewEntity = ReviewEntity;
exports.ReviewEntity = ReviewEntity = tslib_1.__decorate([
    (0, graphql_1.ObjectType)('Review')
], ReviewEntity);


/***/ }),
/* 229 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PayoutModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(11);
const payout_account_entity_1 = __webpack_require__(51);
const driver_entity_1 = __webpack_require__(16);
const nestjs_query_graphql_1 = __webpack_require__(107);
const jwt_gql_auth_guard_1 = __webpack_require__(137);
const payout_account_dto_1 = __webpack_require__(230);
const nestjs_query_typeorm_1 = __webpack_require__(136);
const payout_service_1 = __webpack_require__(232);
const payout_resolver_1 = __webpack_require__(233);
const payment_gateway_entity_1 = __webpack_require__(37);
const wallet_module_1 = __webpack_require__(207);
const payout_method_dto_1 = __webpack_require__(231);
const payout_method_entity_1 = __webpack_require__(52);
const axios_1 = __webpack_require__(160);
let PayoutModule = class PayoutModule {
};
exports.PayoutModule = PayoutModule;
exports.PayoutModule = PayoutModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            axios_1.HttpModule,
            typeorm_1.TypeOrmModule.forFeature([driver_entity_1.DriverEntity]),
            nestjs_query_graphql_1.NestjsQueryGraphQLModule.forFeature({
                imports: [
                    wallet_module_1.WalletModule,
                    nestjs_query_typeorm_1.NestjsQueryTypeOrmModule.forFeature([
                        payout_account_entity_1.PayoutAccountEntity,
                        payment_gateway_entity_1.PaymentGatewayEntity,
                        payout_method_entity_1.PayoutMethodEntity,
                    ]),
                ],
                resolvers: [
                    {
                        DTOClass: payout_account_dto_1.PayoutAccountDTO,
                        EntityClass: payout_account_entity_1.PayoutAccountEntity,
                        read: { one: { disabled: true } },
                        create: { many: { disabled: true } },
                        delete: { many: { disabled: true } },
                        update: { many: { disabled: true } },
                        guards: [jwt_gql_auth_guard_1.GqlAuthGuard],
                        pagingStrategy: nestjs_query_graphql_1.PagingStrategies.NONE,
                    },
                    {
                        DTOClass: payout_method_dto_1.PayoutMethodDTO,
                        EntityClass: payout_method_entity_1.PayoutMethodEntity,
                        read: { one: { disabled: true } },
                        create: { disabled: true },
                        delete: { disabled: true },
                        update: { disabled: true },
                        guards: [jwt_gql_auth_guard_1.GqlAuthGuard],
                        pagingStrategy: nestjs_query_graphql_1.PagingStrategies.NONE,
                    },
                ],
            }),
        ],
        providers: [payout_service_1.PayoutService, payout_resolver_1.PayoutResolver],
    })
], PayoutModule);


/***/ }),
/* 230 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PayoutAccountDTO = void 0;
const tslib_1 = __webpack_require__(1);
const eager_import_0 = __webpack_require__(131);
const graphql_1 = __webpack_require__(9);
const nestjs_query_graphql_1 = __webpack_require__(107);
const payment_gateway_dto_1 = __webpack_require__(130);
const payout_method_dto_1 = __webpack_require__(231);
let PayoutAccountDTO = class PayoutAccountDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, name: { nullable: true, type: () => String }, accountNumber: { nullable: true, type: () => String }, routingNumber: { nullable: true, type: () => String }, bankName: { nullable: true, type: () => String }, accountHolderName: { nullable: true, type: () => String }, branchName: { nullable: true, type: () => String }, isDefault: { type: () => Boolean }, accountHolderAddress: { nullable: true, type: () => String }, accountHolderCity: { nullable: true, type: () => String }, accountHolderState: { nullable: true, type: () => String }, accountHolderZip: { nullable: true, type: () => String }, accountHolderCountry: { nullable: true, type: () => String }, accountHolderPhone: { nullable: true, type: () => String }, accountHolderDateOfBirth: { nullable: true, type: () => Date }, driverId: { type: () => Number }, linkType: { nullable: true, type: () => (__webpack_require__(131).GatewayLinkMethod) } };
    }
};
exports.PayoutAccountDTO = PayoutAccountDTO;
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.IDField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], PayoutAccountDTO.prototype, "id", void 0);
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.FilterableField)(() => graphql_1.ID, { filterOnly: true }),
    tslib_1.__metadata("design:type", Number)
], PayoutAccountDTO.prototype, "driverId", void 0);
exports.PayoutAccountDTO = PayoutAccountDTO = tslib_1.__decorate([
    (0, graphql_1.ObjectType)('PayoutAccount'),
    (0, nestjs_query_graphql_1.Relation)('paymentGateway', () => payment_gateway_dto_1.PaymentGatewayDTO, {
        nullable: true,
        description: 'Deprecated in favor of payout method relation',
    }),
    (0, nestjs_query_graphql_1.Relation)('payoutMethod', () => payout_method_dto_1.PayoutMethodDTO),
    (0, nestjs_query_graphql_1.Authorize)({
        authorize: (context) => ({
            driverId: { eq: context.req.user.id },
        }),
    })
], PayoutAccountDTO);


/***/ }),
/* 231 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PayoutMethodDTO = void 0;
const tslib_1 = __webpack_require__(1);
const eager_import_0 = __webpack_require__(53);
const graphql_1 = __webpack_require__(9);
const gateway_link_method_1 = __webpack_require__(131);
const payment_gateway_type_enum_1 = __webpack_require__(43);
const nestjs_query_graphql_1 = __webpack_require__(107);
const media_dto_1 = __webpack_require__(125);
let PayoutMethodDTO = class PayoutMethodDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number }, enabled: { type: () => Boolean }, name: { type: () => String }, type: { type: () => (__webpack_require__(53).PayoutMethodType) } };
    }
};
exports.PayoutMethodDTO = PayoutMethodDTO;
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.IDField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], PayoutMethodDTO.prototype, "id", void 0);
tslib_1.__decorate([
    (0, graphql_1.Field)(() => gateway_link_method_1.GatewayLinkMethod, { middleware: [
            async (ctx, next) => {
                const type = ctx.source.type;
                return type === payment_gateway_type_enum_1.PaymentGatewayType.Stripe
                    ? gateway_link_method_1.GatewayLinkMethod.redirect
                    : gateway_link_method_1.GatewayLinkMethod.manual;
            },
        ] }),
    tslib_1.__metadata("design:type", String)
], PayoutMethodDTO.prototype, "linkMethod", void 0);
exports.PayoutMethodDTO = PayoutMethodDTO = tslib_1.__decorate([
    (0, graphql_1.ObjectType)('PayoutMethod'),
    (0, nestjs_query_graphql_1.Relation)('media', () => media_dto_1.MediaDTO, { nullable: true }),
    (0, nestjs_query_graphql_1.Authorize)({
        authorize: (context, authorizationContext) => ({
            enabled: true,
        }),
    })
], PayoutMethodDTO);


/***/ }),
/* 232 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PayoutService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(11);
const payout_account_entity_1 = __webpack_require__(51);
const typeorm_2 = __webpack_require__(14);
const jwt_gql_auth_guard_1 = __webpack_require__(137);
const payout_method_entity_1 = __webpack_require__(52);
const rxjs_1 = __webpack_require__(166);
const axios_1 = __webpack_require__(160);
let PayoutService = class PayoutService {
    constructor(payoutAccountsRepository, payoutMethodRepository, httpService) {
        this.payoutAccountsRepository = payoutAccountsRepository;
        this.payoutMethodRepository = payoutMethodRepository;
        this.httpService = httpService;
    }
    async getSupportedPayoutMethods() {
        return [];
        // let paymentGateways: PaymentGatewayDTO[] = (
        //   await this.paymentGatewayRepository.find({
        //     where: { type: In([PaymentGatewayType.Stripe]), enabled: true },
        //   })
        // ).map((item: any) => {
        //   item.linkMethod = GatewayLinkMethod.redirect;
        //   return item;
        // });
        // const redirectMethods = paymentGateways.map((gateway) => ({
        //   id: gateway.id,
        //   name: gateway.title,
        //   type: gateway.type,
        //   linkMethod: GatewayLinkMethod.redirect,
        //   paymentGateway: gateway,
        // }));
        // return [
        //   ...redirectMethods,
        //   {
        //     id: 0,
        //     name: 'Bank Transfer',
        //     linkMethod: GatewayLinkMethod.manual,
        //   },
        // ];
    }
    async getPayoutLinkUrl(input) {
        const apiBody = {
            driverId: input.driverId,
            payoutMethodId: input.payoutMethodId,
            returnUrl: `${process.env.DRIVER_APPLICATION_ID ?? 'default.driver.redirection'}://`,
        };
        const payoutIntentResult = await (0, rxjs_1.firstValueFrom)(this.httpService.post(`${process.env.GATEWAY_SERVER_URL}/get_payout_link_url`, apiBody));
        return payoutIntentResult.data;
    }
    async markPayoutAccountAsDefault(input) {
        const payoutAccount = await this.payoutAccountsRepository.findOneOrFail({
            where: { id: input.payoutMethodId, driverId: input.driverId },
        });
        await this.payoutAccountsRepository.update({ driverId: input.driverId }, { isDefault: false });
        payoutAccount.isDefault = true;
        return this.payoutAccountsRepository.save(payoutAccount);
    }
    async createPayoutAccount(input) {
        await this.payoutAccountsRepository.update({ driverId: input.driverId }, { isDefault: false });
        const payoutMethod = await this.payoutMethodRepository.findOneOrFail({
            where: { id: input.payoutMethodId },
        });
        const payoutAccount = this.payoutAccountsRepository.create({
            ...input,
            driverId: input.driverId,
            last4: input.accountNumber.slice(-4),
            currency: payoutMethod.currency,
            isDefault: true,
            name: input.bankName + ' ' + input.accountNumber.slice(-4),
        });
        return this.payoutAccountsRepository.save(payoutAccount);
    }
    async updatePayoutMethod(input) {
        const payoutAccount = await this.payoutAccountsRepository.findOneOrFail({
            where: { id: input.id, driverId: input.driverId },
        });
        if (input.isDefault) {
            await this.payoutAccountsRepository.update({ driverId: input.driverId }, { isDefault: false });
        }
        payoutAccount.isDefault = input.isDefault;
        return this.payoutAccountsRepository.save(payoutAccount);
    }
};
exports.PayoutService = PayoutService;
exports.PayoutService = PayoutService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    (0, common_1.UseGuards)(jwt_gql_auth_guard_1.GqlAuthGuard),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(payout_account_entity_1.PayoutAccountEntity)),
    tslib_1.__param(1, (0, typeorm_1.InjectRepository)(payout_method_entity_1.PayoutMethodEntity)),
    tslib_1.__metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        axios_1.HttpService])
], PayoutService);


/***/ }),
/* 233 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IntentResultToTopUpWalletStatus = exports.PayoutResolver = void 0;
const tslib_1 = __webpack_require__(1);
const graphql_1 = __webpack_require__(9);
const payout_service_1 = __webpack_require__(232);
const payout_account_dto_1 = __webpack_require__(230);
const common_1 = __webpack_require__(2);
const payout_method_dto_1 = __webpack_require__(231);
const top_up_wallet_input_1 = __webpack_require__(211);
const payout_account_input_1 = __webpack_require__(234);
const get_payout_link_url_input_1 = __webpack_require__(235);
const jwt_gql_auth_guard_1 = __webpack_require__(137);
const update_payout_method_input_1 = __webpack_require__(236);
let PayoutResolver = class PayoutResolver {
    constructor(payoutService, context) {
        this.payoutService = payoutService;
        this.context = context;
    }
    async markPayoutAccountAsDefault(payoutMethodId) {
        return this.payoutService.markPayoutAccountAsDefault({
            payoutMethodId: payoutMethodId,
            driverId: this.context.req.user.id,
        });
    }
    async updatePayoutMethod(input) {
        return this.payoutService.updatePayoutMethod({
            driverId: this.context.req.user.id,
            ...input,
        });
    }
    async getSupportedPayoutMethods() {
        return this.payoutService.getSupportedPayoutMethods();
    }
    async getPayoutLinkUrl(input) {
        const intentResult = await this.payoutService.getPayoutLinkUrl({
            driverId: this.context.req.user.id,
            payoutMethodId: input.gatewayId,
        });
        return {
            status: (0, exports.IntentResultToTopUpWalletStatus)(intentResult.status),
            url: intentResult.url,
        };
    }
    async createPayoutAccount(input) {
        return this.payoutService.createPayoutAccount({
            driverId: this.context.req.user.id,
            ...input,
        });
    }
};
exports.PayoutResolver = PayoutResolver;
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => payout_account_dto_1.PayoutAccountDTO),
    tslib_1.__param(0, (0, graphql_1.Args)('payoutMethodId', { type: () => graphql_1.ID })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], PayoutResolver.prototype, "markPayoutAccountAsDefault", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => payout_account_dto_1.PayoutAccountDTO),
    tslib_1.__param(0, (0, graphql_1.Args)('input', { type: () => update_payout_method_input_1.UpdatePayoutMethodInput })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [update_payout_method_input_1.UpdatePayoutMethodInput]),
    tslib_1.__metadata("design:returntype", Promise)
], PayoutResolver.prototype, "updatePayoutMethod", null);
tslib_1.__decorate([
    (0, graphql_1.Query)(() => [payout_method_dto_1.PayoutMethodDTO]),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], PayoutResolver.prototype, "getSupportedPayoutMethods", null);
tslib_1.__decorate([
    (0, graphql_1.Query)(() => top_up_wallet_input_1.TopUpWalletResponse),
    tslib_1.__param(0, (0, graphql_1.Args)('input', { type: () => get_payout_link_url_input_1.GetPayoutLinkUrlInput })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [get_payout_link_url_input_1.GetPayoutLinkUrlInput]),
    tslib_1.__metadata("design:returntype", Promise)
], PayoutResolver.prototype, "getPayoutLinkUrl", null);
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => payout_account_dto_1.PayoutAccountDTO),
    tslib_1.__param(0, (0, graphql_1.Args)('input', { type: () => payout_account_input_1.PayoutAccountInput })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [payout_account_input_1.PayoutAccountInput]),
    tslib_1.__metadata("design:returntype", Promise)
], PayoutResolver.prototype, "createPayoutAccount", null);
exports.PayoutResolver = PayoutResolver = tslib_1.__decorate([
    (0, graphql_1.Resolver)(),
    (0, common_1.UseGuards)(jwt_gql_auth_guard_1.GqlAuthGuard),
    tslib_1.__param(1, (0, common_1.Inject)(graphql_1.CONTEXT)),
    tslib_1.__metadata("design:paramtypes", [payout_service_1.PayoutService, Object])
], PayoutResolver);
const IntentResultToTopUpWalletStatusMap = new Map([
    ['success', top_up_wallet_input_1.TopUpWalletStatus.OK],
    ['redirect', top_up_wallet_input_1.TopUpWalletStatus.Redirect],
    ['failed', top_up_wallet_input_1.TopUpWalletStatus.Failed],
]);
const IntentResultToTopUpWalletStatus = (status) => {
    return IntentResultToTopUpWalletStatusMap.get(status);
};
exports.IntentResultToTopUpWalletStatus = IntentResultToTopUpWalletStatus;


/***/ }),
/* 234 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PayoutAccountInput = void 0;
const tslib_1 = __webpack_require__(1);
const graphql_1 = __webpack_require__(9);
let PayoutAccountInput = class PayoutAccountInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { name: { type: () => String }, accountNumber: { type: () => String }, routingNumber: { nullable: true, type: () => String }, bankName: { type: () => String }, accountHolderName: { nullable: true, type: () => String }, branchName: { nullable: true, type: () => String }, isDefault: { type: () => Boolean }, accountHolderAddress: { nullable: true, type: () => String }, accountHolderCity: { nullable: true, type: () => String }, accountHolderState: { nullable: true, type: () => String }, accountHolderZip: { nullable: true, type: () => String }, accountHolderCountry: { nullable: true, type: () => String }, accountHolderPhone: { nullable: true, type: () => String }, accountHolderDateOfBirth: { nullable: true, type: () => Date } };
    }
};
exports.PayoutAccountInput = PayoutAccountInput;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {}),
    tslib_1.__metadata("design:type", Number)
], PayoutAccountInput.prototype, "payoutMethodId", void 0);
exports.PayoutAccountInput = PayoutAccountInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], PayoutAccountInput);


/***/ }),
/* 235 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetPayoutLinkUrlInput = void 0;
const tslib_1 = __webpack_require__(1);
const graphql_1 = __webpack_require__(9);
const nestjs_query_graphql_1 = __webpack_require__(107);
let GetPayoutLinkUrlInput = class GetPayoutLinkUrlInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { gatewayId: { type: () => Number } };
    }
};
exports.GetPayoutLinkUrlInput = GetPayoutLinkUrlInput;
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.IDField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], GetPayoutLinkUrlInput.prototype, "gatewayId", void 0);
exports.GetPayoutLinkUrlInput = GetPayoutLinkUrlInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], GetPayoutLinkUrlInput);


/***/ }),
/* 236 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdatePayoutMethodInput = void 0;
const tslib_1 = __webpack_require__(1);
const graphql_1 = __webpack_require__(9);
let UpdatePayoutMethodInput = class UpdatePayoutMethodInput {
    static _GRAPHQL_METADATA_FACTORY() {
        return { isDefault: { type: () => Boolean } };
    }
};
exports.UpdatePayoutMethodInput = UpdatePayoutMethodInput;
tslib_1.__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, {}),
    tslib_1.__metadata("design:type", Number)
], UpdatePayoutMethodInput.prototype, "id", void 0);
exports.UpdatePayoutMethodInput = UpdatePayoutMethodInput = tslib_1.__decorate([
    (0, graphql_1.InputType)()
], UpdatePayoutMethodInput);


/***/ }),
/* 237 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SOSModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(11);
const database_1 = __webpack_require__(12);
const operator_entity_1 = __webpack_require__(23);
const sos_entity_1 = __webpack_require__(88);
const sos_resolver_1 = __webpack_require__(238);
const sos_service_1 = __webpack_require__(240);
let SOSModule = class SOSModule {
};
exports.SOSModule = SOSModule;
exports.SOSModule = SOSModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([sos_entity_1.SOSEntity, operator_entity_1.OperatorEntity])],
        providers: [sos_service_1.SOSService, sos_resolver_1.SOSResolver, database_1.RedisPubSubProvider.provider()],
    })
], SOSModule);


/***/ }),
/* 238 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SOSResolver = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const graphql_1 = __webpack_require__(9);
const database_1 = __webpack_require__(12);
const jwt_gql_auth_guard_1 = __webpack_require__(137);
const sos_dto_1 = __webpack_require__(239);
const sos_service_1 = __webpack_require__(240);
let SOSResolver = class SOSResolver {
    constructor(sosService) {
        this.sosService = sosService;
    }
    async sosSignal(requestId, location) {
        return this.sosService.submitSOS({ location, requestId });
    }
};
exports.SOSResolver = SOSResolver;
tslib_1.__decorate([
    (0, graphql_1.Mutation)(() => sos_dto_1.SOSDTO),
    (0, common_1.UseGuards)(jwt_gql_auth_guard_1.GqlAuthGuard),
    tslib_1.__param(0, (0, graphql_1.Args)('orderId', { type: () => graphql_1.ID })),
    tslib_1.__param(1, (0, graphql_1.Args)('location', { type: () => database_1.Point, nullable: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, database_1.Point]),
    tslib_1.__metadata("design:returntype", Promise)
], SOSResolver.prototype, "sosSignal", null);
exports.SOSResolver = SOSResolver = tslib_1.__decorate([
    (0, graphql_1.Resolver)(() => sos_dto_1.SOSDTO),
    tslib_1.__metadata("design:paramtypes", [sos_service_1.SOSService])
], SOSResolver);


/***/ }),
/* 239 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SOSDTO = void 0;
const tslib_1 = __webpack_require__(1);
const nestjs_query_graphql_1 = __webpack_require__(107);
const graphql_1 = __webpack_require__(9);
let SOSDTO = class SOSDTO {
    static _GRAPHQL_METADATA_FACTORY() {
        return { id: { type: () => Number } };
    }
};
exports.SOSDTO = SOSDTO;
tslib_1.__decorate([
    (0, nestjs_query_graphql_1.IDField)(() => graphql_1.ID),
    tslib_1.__metadata("design:type", Number)
], SOSDTO.prototype, "id", void 0);
exports.SOSDTO = SOSDTO = tslib_1.__decorate([
    (0, graphql_1.ObjectType)('SOS')
], SOSDTO);


/***/ }),
/* 240 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SOSService = void 0;
const tslib_1 = __webpack_require__(1);
const nestjs_query_graphql_1 = __webpack_require__(107);
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(11);
const operator_entity_1 = __webpack_require__(23);
const sos_entity_1 = __webpack_require__(88);
const graphql_redis_subscriptions_1 = __webpack_require__(108);
const typeorm_2 = __webpack_require__(14);
const enabled_notification_enum_1 = __webpack_require__(95);
let SOSService = class SOSService {
    constructor(sosRepository, operatorRepo, pubSub) {
        this.sosRepository = sosRepository;
        this.operatorRepo = operatorRepo;
        this.pubSub = pubSub;
    }
    async submitSOS(input) {
        let dto = await this.sosRepository.save({
            submittedByRider: false,
            ...input,
        });
        let savedRecord = await this.sosRepository.findOneOrFail({
            where: { id: dto.id },
            relations: {
                request: true,
                activities: true,
            },
        });
        const admins = await this.operatorRepo.find({
            where: { enabledNotifications: enabled_notification_enum_1.EnabledNotification.SOS },
        });
        this.pubSub.publish('sosCreated', {
            sosCreated: savedRecord,
            adminIds: admins.map((admin) => admin.id),
        });
        return savedRecord;
    }
};
exports.SOSService = SOSService;
exports.SOSService = SOSService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(sos_entity_1.SOSEntity)),
    tslib_1.__param(1, (0, typeorm_1.InjectRepository)(operator_entity_1.OperatorEntity)),
    tslib_1.__param(2, (0, nestjs_query_graphql_1.InjectPubSub)()),
    tslib_1.__metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        graphql_redis_subscriptions_1.RedisPubSub])
], SOSService);


/***/ }),
/* 241 */
/***/ ((module) => {

module.exports = require("fs/promises");

/***/ }),
/* 242 */
/***/ ((module) => {

module.exports = require("firebase-admin/app");

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
const platform_fastify_1 = __webpack_require__(4);
const multipart_1 = tslib_1.__importDefault(__webpack_require__(5));
const path_1 = __webpack_require__(6);
const driver_api_module_1 = __webpack_require__(7);
const fs_1 = __webpack_require__(116);
const promises_1 = __webpack_require__(241);
const app_1 = __webpack_require__(242);
const firebase_admin_1 = __webpack_require__(152);
async function bootstrap() {
    const adapter = new platform_fastify_1.FastifyAdapter();
    const app = await core_1.NestFactory.create(driver_api_module_1.DriverAPIModule, adapter);
    const port = process.env.DRIVER_API_PORT || 3000;
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
    const configAddress = `${process.cwd()}/config/config.${process.env.NODE_ENV ?? 'production'}.json`;
    if ((0, fs_1.existsSync)(configAddress)) {
        const file = await (0, promises_1.readFile)(configAddress, { encoding: 'utf-8' });
        const config = JSON.parse(file);
        if (config.firebaseProjectPrivateKey != null &&
            (0, fs_1.existsSync)(`${process.cwd()}/config/${config.firebaseProjectPrivateKey}`)) {
            (0, app_1.initializeApp)({
                credential: firebase_admin_1.credential.cert(`${process.cwd()}/config/${config.firebaseProjectPrivateKey}`),
            });
        }
    }
    await app.listen(port, '0.0.0.0', () => {
        common_1.Logger.log('Listening at http://localhost:' + port, 'Driver API');
    });
}
bootstrap();

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;