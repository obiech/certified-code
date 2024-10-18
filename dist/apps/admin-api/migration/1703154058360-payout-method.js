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
exports.PayoutMethodEntityMigration1627567460081 = void 0;
var payout_method_type_enum_1 = require("../entities/enums/payout-method-type.enum");
var saved_payment_method_type_1 = require("../entities/enums/saved-payment-method-type");
var typeorm_1 = require("typeorm");
var Table_1 = require("typeorm/schema-builder/table/Table");
var PayoutMethodEntityMigration1627567460081 = /** @class */ (function () {
    function PayoutMethodEntityMigration1627567460081() {
    }
    PayoutMethodEntityMigration1627567460081.prototype.up = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            var error_1, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, queryRunner.query('DELETE FROM `payout_account` WHERE id > 0')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.createTable(new Table_1.Table({
                                name: 'payout_method',
                                columns: [
                                    {
                                        name: 'id',
                                        type: 'int',
                                        isPrimary: true,
                                        isGenerated: true,
                                        generationStrategy: 'increment',
                                    },
                                    {
                                        name: 'enabled',
                                        type: 'boolean',
                                        default: true,
                                    },
                                    {
                                        name: 'name',
                                        type: 'varchar',
                                    },
                                    {
                                        name: 'description',
                                        type: 'varchar',
                                        isNullable: true,
                                    },
                                    {
                                        name: 'type',
                                        type: 'enum',
                                        enum: Object.values(payout_method_type_enum_1.PayoutMethodType),
                                    },
                                    {
                                        name: 'publicKey',
                                        type: 'text',
                                        isNullable: true,
                                    },
                                    {
                                        name: 'privateKey',
                                        type: 'text',
                                        isNullable: true,
                                    },
                                    {
                                        name: 'saltKey',
                                        type: 'text',
                                        isNullable: true,
                                    },
                                    {
                                        name: 'merchantId',
                                        type: 'text',
                                        isNullable: true,
                                    },
                                    {
                                        name: 'deletedAt',
                                        type: 'timestamp',
                                        isNullable: true,
                                    },
                                    {
                                        name: 'mediaId',
                                        type: 'int',
                                        isNullable: true,
                                    },
                                ],
                                foreignKeys: [
                                    {
                                        name: 'fk_payout_method_media',
                                        columnNames: ['mediaId'],
                                        referencedTableName: 'media',
                                        referencedColumnNames: ['id'],
                                        onDelete: 'SET NULL',
                                        onUpdate: 'NO ACTION',
                                    },
                                ],
                            }), true)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4:
                        _a.trys.push([4, 10, , 11]);
                        return [4 /*yield*/, queryRunner.addColumn('payout_account', new typeorm_1.TableColumn({
                                name: 'payoutMethodId',
                                type: 'int',
                                isNullable: true,
                            }))];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.createForeignKey('payout_account', new typeorm_1.TableForeignKey({
                                name: 'fk_payout_account_payout_method',
                                columnNames: ['payoutMethodId'],
                                referencedTableName: 'payout_method',
                                referencedColumnNames: ['id'],
                                onDelete: 'SET NULL',
                                onUpdate: 'NO ACTION',
                            }))];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.addColumn('payout_account', new typeorm_1.TableColumn({
                                name: 'type',
                                type: 'enum',
                                enum: Object.values(saved_payment_method_type_1.SavedPaymentMethodType),
                            }))];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.addColumn('payout_account', new typeorm_1.TableColumn({
                                name: 'last4',
                                type: 'varchar',
                            }))];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.addColumn('payout_account', new typeorm_1.TableColumn({
                                name: 'currency',
                                type: 'varchar',
                            }))];
                    case 9:
                        _a.sent();
                        return [3 /*break*/, 11];
                    case 10:
                        error_2 = _a.sent();
                        return [3 /*break*/, 11];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    PayoutMethodEntityMigration1627567460081.prototype.down = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            var error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        return [4 /*yield*/, queryRunner.dropTable('payout_method')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.dropForeignKey('payout_account', 'fk_payout_account_payout_method')];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.dropColumn('payout_account', 'payoutMethodId')];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.dropColumn('payout_account', 'type')];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.dropColumn('payout_account', 'last4')];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.dropColumn('payout_account', 'currency')];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        error_3 = _a.sent();
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    return PayoutMethodEntityMigration1627567460081;
}());
exports.PayoutMethodEntityMigration1627567460081 = PayoutMethodEntityMigration1627567460081;
