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
exports.versionTwoFeatures1650734742695 = void 0;
var versionTwoFeatures1650734742695 = /** @class */ (function () {
    function versionTwoFeatures1650734742695() {
    }
    versionTwoFeatures1650734742695.prototype.up = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            var error_1, error_2, error_3, error_4, error_5, error_6, error_7, error_8, error_9, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, queryRunner.query('ALTER TABLE `service` ADD COLUMN description VARCHAR(255) NULL;')];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, queryRunner.query('ALTER TABLE `service` ADD COLUMN personCapacity SMALLINT NULL;')];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        error_2 = _a.sent();
                        return [3 /*break*/, 6];
                    case 6:
                        _a.trys.push([6, 8, , 9]);
                        return [4 /*yield*/, queryRunner.query('CREATE TABLE `gift_card` (id INT PRIMARY KEY AUTO_INCREMENT, code VARCHAR(255) NOT NULL, currency CHAR(3) NOT NULL, amount FLOAT(10, 2) NOT NULL, isUsed tinyint(1) NOT NULL DEFAULT FALSE, availableTimestamp DATETIME NULL, expirationTimestamp DATETIME NULL, riderTransactionId INT NULL, FOREIGN KEY (riderTransactionId) REFERENCES rider_transaction(id));')];
                    case 7:
                        _a.sent();
                        return [3 /*break*/, 9];
                    case 8:
                        error_3 = _a.sent();
                        return [3 /*break*/, 9];
                    case 9:
                        _a.trys.push([9, 11, , 12]);
                        return [4 /*yield*/, queryRunner.query('ALTER TABLE `request` ADD COLUMN waitMinutes SMALLINT NOT NULL DEFAULT 0;')];
                    case 10:
                        _a.sent();
                        return [3 /*break*/, 12];
                    case 11:
                        error_4 = _a.sent();
                        return [3 /*break*/, 12];
                    case 12:
                        _a.trys.push([12, 14, , 15]);
                        return [4 /*yield*/, queryRunner.query('ALTER TABLE `request` ADD COLUMN tipAmount FLOAT(10,2) NOT NULL DEFAULT 0;')];
                    case 13:
                        _a.sent();
                        return [3 /*break*/, 15];
                    case 14:
                        error_5 = _a.sent();
                        return [3 /*break*/, 15];
                    case 15:
                        _a.trys.push([15, 17, , 18]);
                        return [4 /*yield*/, queryRunner.query('ALTER TABLE `promotion` ADD COLUMN url VARCHAR(1500) NULL;')];
                    case 16:
                        _a.sent();
                        return [3 /*break*/, 18];
                    case 17:
                        error_6 = _a.sent();
                        return [3 /*break*/, 18];
                    case 18:
                        _a.trys.push([18, 20, , 21]);
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE `rider_address` MODIFY type ENUM ('Home', 'Work', 'Partner', 'Other', 'Gym', 'Parent', 'Park', 'Cafe') DEFAULT 'Other' NOT NULL;")];
                    case 19:
                        _a.sent();
                        return [3 /*break*/, 21];
                    case 20:
                        error_7 = _a.sent();
                        return [3 /*break*/, 21];
                    case 21:
                        _a.trys.push([21, 23, , 24]);
                        return [4 /*yield*/, queryRunner.query('ALTER TABLE `driver` ADD COLUMN searchDistance int NULL;')];
                    case 22:
                        _a.sent();
                        return [3 /*break*/, 24];
                    case 23:
                        error_8 = _a.sent();
                        return [3 /*break*/, 24];
                    case 24:
                        _a.trys.push([24, 26, , 27]);
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE `service_option` (id INT PRIMARY KEY AUTO_INCREMENT, name varchar(255) NOT NULL, type ENUM ('TwoWay', 'Free', 'Paid') NOT NULL, additionalFee INT NULL, icon ENUM('Pet', 'TwoWay', 'Luggage', 'PackageDelivery', 'Shopping', 'Custom1', 'Custom2', 'Custom3', 'Custom4', 'Custom5') NOT NULL, serviceId INT NOT NULL, FOREIGN KEY (serviceId) REFERENCES service(id) ON DELETE CASCADE);")];
                    case 25:
                        _a.sent();
                        return [3 /*break*/, 27];
                    case 26:
                        error_9 = _a.sent();
                        return [3 /*break*/, 27];
                    case 27:
                        _a.trys.push([27, 29, , 30]);
                        return [4 /*yield*/, queryRunner.query("CREATE TABLE `request_options_service_option` (`requestId` int NOT NULL, `serviceOptionId` int NOT NULL, PRIMARY KEY (`requestId`,`serviceOptionId`), FOREIGN KEY (`requestId`) REFERENCES `request` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION, FOREIGN KEY (`serviceOptionId`) REFERENCES `service_option` (`id`));")];
                    case 28:
                        _a.sent();
                        return [3 /*break*/, 30];
                    case 29:
                        error_10 = _a.sent();
                        return [3 /*break*/, 30];
                    case 30: return [2 /*return*/];
                }
            });
        });
    };
    versionTwoFeatures1650734742695.prototype.down = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    return versionTwoFeatures1650734742695;
}());
exports.versionTwoFeatures1650734742695 = versionTwoFeatures1650734742695;
