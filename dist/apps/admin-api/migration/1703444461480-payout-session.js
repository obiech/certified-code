"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayoutSession1703444461480 = void 0;
var payout_session_status_enum_1 = require("../entities/enums/payout-session-status.enum");
var typeorm_1 = require("typeorm");
var PayoutSession1703444461480 = /** @class */ (function () {
    function PayoutSession1703444461480() {
    }
    PayoutSession1703444461480.prototype.up = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            var error_1, error_2, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, queryRunner.createTable(new typeorm_1.Table({
                                name: 'payout_session',
                                columns: [
                                    {
                                        name: 'id',
                                        type: 'int',
                                        isPrimary: true,
                                        isGenerated: true,
                                        generationStrategy: 'increment',
                                    },
                                    {
                                        name: 'createdAt',
                                        type: 'datetime',
                                        default: 'NOW()',
                                    },
                                    {
                                        name: 'processedAt',
                                        type: 'datetime',
                                        isNullable: true,
                                    },
                                    {
                                        name: 'description',
                                        type: 'varchar',
                                        isNullable: true,
                                    },
                                    {
                                        name: 'status',
                                        type: 'enum',
                                        enum: Object.values(payout_session_status_enum_1.PayoutSessionStatus),
                                        default: "'pending'",
                                    },
                                    {
                                        name: 'totalAmount',
                                        type: 'float',
                                        default: 0,
                                        precision: 10,
                                        scale: 2,
                                    },
                                    {
                                        name: 'currency',
                                        type: 'varchar',
                                    },
                                    {
                                        name: 'createdByOperatorId',
                                        type: 'int',
                                    },
                                ],
                                foreignKeys: [
                                    {
                                        columnNames: ['createdByOperatorId'],
                                        referencedTableName: 'operator',
                                        referencedColumnNames: ['id'],
                                        onDelete: 'CASCADE',
                                    },
                                ],
                                indices: [
                                    {
                                        columnNames: ['createdByOperatorId'],
                                    },
                                ],
                            }), true, true, true)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, queryRunner.createTable(new typeorm_1.Table({
                                name: 'payout_session_payout_methods_payout_method',
                                columns: [
                                    {
                                        name: 'payoutSessionId',
                                        type: 'int',
                                    },
                                    {
                                        name: 'payoutMethodId',
                                        type: 'int',
                                    },
                                ],
                                foreignKeys: [
                                    {
                                        columnNames: ['payoutSessionId'],
                                        referencedTableName: 'payout_session',
                                        referencedColumnNames: ['id'],
                                        onDelete: 'CASCADE',
                                    },
                                    {
                                        columnNames: ['payoutMethodId'],
                                        referencedTableName: 'payout_method',
                                        referencedColumnNames: ['id'],
                                        onDelete: 'CASCADE',
                                    },
                                ],
                                indices: [
                                    {
                                        columnNames: ['payoutSessionId'],
                                    },
                                    {
                                        columnNames: ['payoutMethodId'],
                                    },
                                ],
                            }))];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        error_2 = _a.sent();
                        return [3 /*break*/, 6];
                    case 6:
                        _a.trys.push([6, 16, , 17]);
                        return [4 /*yield*/, queryRunner.addColumn('driver_transaction', new typeorm_1.TableColumn({
                                name: 'payoutSessionId',
                                type: 'int',
                                isNullable: true,
                            }))];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.addColumn('driver_transaction', new typeorm_1.TableColumn({
                                name: 'payoutAccountId',
                                type: 'int',
                                isNullable: true,
                            }))];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.addColumn('driver_transaction', new typeorm_1.TableColumn({
                                name: 'payoutMethodId',
                                type: 'int',
                                isNullable: true,
                            }))];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.createForeignKey('driver_transaction', new typeorm_1.TableForeignKey({
                                columnNames: ['payoutSessionId'],
                                referencedTableName: 'payout_session',
                                referencedColumnNames: ['id'],
                                onDelete: 'CASCADE',
                            }))];
                    case 10:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.createForeignKey('driver_transaction', new typeorm_1.TableForeignKey({
                                columnNames: ['payoutAccountId'],
                                referencedTableName: 'payout_account',
                                referencedColumnNames: ['id'],
                                onDelete: 'CASCADE',
                            }))];
                    case 11:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.createForeignKey('driver_transaction', new typeorm_1.TableForeignKey({
                                columnNames: ['payoutMethodId'],
                                referencedTableName: 'payout_method',
                                referencedColumnNames: ['id'],
                                onDelete: 'CASCADE',
                            }))];
                    case 12:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.createIndex('driver_transaction', new typeorm_1.TableIndex({
                                columnNames: ['payoutSessionId'],
                            }))];
                    case 13:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.createIndex('driver_transaction', new typeorm_1.TableIndex({
                                columnNames: ['payoutAccountId'],
                            }))];
                    case 14:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.createIndex('driver_transaction', new typeorm_1.TableIndex({
                                columnNames: ['payoutMethodId'],
                            }))];
                    case 15:
                        _a.sent();
                        return [3 /*break*/, 17];
                    case 16:
                        error_3 = _a.sent();
                        return [3 /*break*/, 17];
                    case 17: return [2 /*return*/];
                }
            });
        });
    };
    PayoutSession1703444461480.prototype.down = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    return PayoutSession1703444461480;
}());
exports.PayoutSession1703444461480 = PayoutSession1703444461480;
