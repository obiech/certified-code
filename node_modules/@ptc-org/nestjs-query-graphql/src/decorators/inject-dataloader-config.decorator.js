"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectDataLoaderConfig = void 0;
const common_1 = require("@nestjs/common");
const inject_data_loader_config_pipe_1 = require("../pipes/inject-data-loader-config.pipe");
const InjectDataLoaderConfig = () => (0, common_1.createParamDecorator)(() => null)(inject_data_loader_config_pipe_1.InjectDataLoaderConfigPipe);
exports.InjectDataLoaderConfig = InjectDataLoaderConfig;
//# sourceMappingURL=inject-dataloader-config.decorator.js.map