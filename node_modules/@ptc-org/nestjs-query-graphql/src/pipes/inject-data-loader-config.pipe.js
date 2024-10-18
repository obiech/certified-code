"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectDataLoaderConfigPipe = exports.dataLoaderOptionsToken = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
exports.dataLoaderOptionsToken = 'DATALOADER_OPTIONS';
let InjectDataLoaderConfigPipe = class InjectDataLoaderConfigPipe {
    constructor(moduleRef) {
        this.moduleRef = moduleRef;
        this.options = {};
        try {
            this.options = this.moduleRef.get(exports.dataLoaderOptionsToken, { strict: false });
        }
        catch (error) {
            //
        }
    }
    transform() {
        return this.options;
    }
};
exports.InjectDataLoaderConfigPipe = InjectDataLoaderConfigPipe;
exports.InjectDataLoaderConfigPipe = InjectDataLoaderConfigPipe = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, common_1.Inject)(core_1.ModuleRef)),
    tslib_1.__metadata("design:paramtypes", [core_1.ModuleRef])
], InjectDataLoaderConfigPipe);
//# sourceMappingURL=inject-data-loader-config.pipe.js.map