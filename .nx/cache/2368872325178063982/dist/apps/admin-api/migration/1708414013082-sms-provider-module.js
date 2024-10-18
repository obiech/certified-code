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
exports.SmsProviderModule1708414013082 = void 0;
var sms_provider_type_enum_1 = require("../entities/enums/sms-provider-type.enum");
var typeorm_1 = require("typeorm");
var fs_1 = require("fs");
var operator_permission_enum_1 = require("../entities/enums/operator-permission.enum");
var SmsProviderModule1708414013082 = /** @class */ (function () {
    function SmsProviderModule1708414013082() {
    }
    SmsProviderModule1708414013082.prototype.up = function (queryRunner) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var configAddress, file, config, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, queryRunner.createTable(new typeorm_1.Table({
                                name: 'sms_provider',
                                columns: [
                                    new typeorm_1.TableColumn({
                                        name: 'id',
                                        type: 'int',
                                        isPrimary: true,
                                        isGenerated: true,
                                        generationStrategy: 'increment',
                                    }),
                                    new typeorm_1.TableColumn({
                                        name: 'name',
                                        type: 'varchar',
                                        isNullable: false,
                                    }),
                                    new typeorm_1.TableColumn({
                                        name: 'type',
                                        type: 'enum',
                                        enum: Object.values(sms_provider_type_enum_1.SMSProviderType),
                                        isNullable: false,
                                    }),
                                    new typeorm_1.TableColumn({
                                        name: 'isDefault',
                                        type: 'boolean',
                                        isNullable: false,
                                        default: false,
                                    }),
                                    new typeorm_1.TableColumn({
                                        name: 'accountId',
                                        type: 'varchar',
                                        isNullable: true,
                                    }),
                                    new typeorm_1.TableColumn({
                                        name: 'authToken',
                                        type: 'varchar',
                                        isNullable: true,
                                    }),
                                    new typeorm_1.TableColumn({
                                        name: 'fromNumber',
                                        type: 'varchar',
                                        isNullable: true,
                                    }),
                                    new typeorm_1.TableColumn({
                                        name: 'verificationTemplate',
                                        type: 'text',
                                        isNullable: true,
                                    }),
                                    new typeorm_1.TableColumn({
                                        name: 'smsType',
                                        type: 'varchar',
                                        isNullable: true,
                                    }),
                                    new typeorm_1.TableColumn({
                                        name: 'createdAt',
                                        type: 'datetime',
                                        default: 'NOW()',
                                    }),
                                    new typeorm_1.TableColumn({
                                        name: 'deletedAt',
                                        type: 'datetime',
                                        isNullable: true,
                                    }),
                                ],
                            }), true)];
                    case 1:
                        _b.sent();
                        configAddress = "".concat(process.cwd(), "/config/config.").concat((_a = process.env.NODE_ENV) !== null && _a !== void 0 ? _a : 'production', ".json");
                        if (!(0, fs_1.existsSync)(configAddress)) return [3 /*break*/, 4];
                        return [4 /*yield*/, fs_1.promises.readFile(configAddress, {
                                encoding: 'utf-8',
                            })];
                    case 2:
                        file = _b.sent();
                        config = JSON.parse(file);
                        if (!(config.twilioAccountSid &&
                            config.twilioAuthToken &&
                            config.twilioFromNumber &&
                            config.twilioVerificationCodeSMSTemplate)) return [3 /*break*/, 4];
                        return [4 /*yield*/, queryRunner.query("INSERT INTO sms_provider (name, type, isDefault, accountId, authToken, fromNumber, verificationTemplate, smsType) VALUES ('Twilio', 'Twilio', 1, '".concat(config.twilioAccountSid, "', '").concat(config.twilioAuthToken, "', '").concat(config.twilioFromNumber, "', '").concat(config.twilioVerificationCodeSMSTemplate, "', null)"))];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4: return [4 /*yield*/, queryRunner.changeColumn('operator_role', 'permissions', new typeorm_1.TableColumn({
                            name: 'permissions',
                            type: 'set',
                            enum: Object.values(operator_permission_enum_1.OperatorPermission),
                        }))];
                    case 5:
                        _b.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        error_1 = _b.sent();
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    SmsProviderModule1708414013082.prototype.down = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, queryRunner.dropTable('sms_provider')];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return SmsProviderModule1708414013082;
}());
exports.SmsProviderModule1708414013082 = SmsProviderModule1708414013082;
