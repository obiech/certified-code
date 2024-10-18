"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectId = void 0;
const class_transformer_1 = require("class-transformer");
const ObjectId = () => (target, propertyKey) => {
    (0, class_transformer_1.Transform)((obj) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
        return obj.obj[obj.key];
    })(target, propertyKey);
};
exports.ObjectId = ObjectId;
//# sourceMappingURL=objectId.decorator.js.map