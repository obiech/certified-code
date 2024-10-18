"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrCreateOffsetPagingType = exports.getOrCreateNonePagingType = exports.getOrCreateCursorPagingType = exports.PagingStrategies = void 0;
var constants_1 = require("./constants");
Object.defineProperty(exports, "PagingStrategies", { enumerable: true, get: function () { return constants_1.PagingStrategies; } });
var cursor_paging_type_1 = require("./cursor-paging.type");
Object.defineProperty(exports, "getOrCreateCursorPagingType", { enumerable: true, get: function () { return cursor_paging_type_1.getOrCreateCursorPagingType; } });
var none_paging_type_1 = require("./none-paging.type");
Object.defineProperty(exports, "getOrCreateNonePagingType", { enumerable: true, get: function () { return none_paging_type_1.getOrCreateNonePagingType; } });
var offset_paging_type_1 = require("./offset-paging.type");
Object.defineProperty(exports, "getOrCreateOffsetPagingType", { enumerable: true, get: function () { return offset_paging_type_1.getOrCreateOffsetPagingType; } });
//# sourceMappingURL=index.js.map