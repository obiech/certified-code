"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapReflector = exports.ArrayReflector = exports.ValueReflector = exports.getClassMetadata = exports.classMetadataDecorator = void 0;
require("reflect-metadata");
const classMetadataDecorator = (key) => 
// eslint-disable-next-line @typescript-eslint/ban-types
(data) => 
// eslint-disable-next-line @typescript-eslint/ban-types
(target) => {
    Reflect.defineMetadata(key, data, target);
};
exports.classMetadataDecorator = classMetadataDecorator;
function getClassMetadata(DTOClass, key, includeParents) {
    if (includeParents) {
        return Reflect.getMetadata(key, DTOClass);
    }
    return Reflect.getOwnMetadata(key, DTOClass);
}
exports.getClassMetadata = getClassMetadata;
class Reflector {
    constructor(metaKey) {
        this.metaKey = metaKey;
    }
    // eslint-disable-next-line @typescript-eslint/ban-types
    getMetadata(target, includeParents) {
        if (includeParents) {
            return Reflect.getMetadata(this.metaKey, target);
        }
        return Reflect.getOwnMetadata(this.metaKey, target);
    }
    // eslint-disable-next-line @typescript-eslint/ban-types
    defineMetadata(data, target) {
        Reflect.defineMetadata(this.metaKey, data, target);
    }
}
class ValueReflector extends Reflector {
    set(DTOClass, data) {
        this.defineMetadata(data, DTOClass);
    }
    get(DTOClass, includeParents = false) {
        return this.getMetadata(DTOClass, includeParents);
    }
    isDefined(DTOClass) {
        return this.get(DTOClass) !== undefined;
    }
    memoize(DTOClass, fn) {
        const existing = this.get(DTOClass);
        if (existing) {
            return existing;
        }
        const result = fn();
        this.set(DTOClass, result);
        return result;
    }
}
exports.ValueReflector = ValueReflector;
class ArrayReflector extends Reflector {
    append(DTOClass, data) {
        const metadata = getClassMetadata(DTOClass, this.metaKey, false) ?? [];
        metadata.push(data);
        this.defineMetadata(metadata, DTOClass);
    }
    get(DTOClass, includeParents = false) {
        return this.getMetadata(DTOClass, includeParents);
    }
}
exports.ArrayReflector = ArrayReflector;
class MapReflector extends Reflector {
    set(DTOClass, key, value) {
        const metadata = getClassMetadata(DTOClass, this.metaKey, false) ?? new Map();
        metadata.set(key, value);
        this.defineMetadata(metadata, DTOClass);
    }
    get(DTOClass, key, includeParents) {
        if (typeof key === 'boolean' || typeof key === 'undefined') {
            return this.getMetadata(DTOClass, includeParents ?? false);
        }
        return this.getMetadata(DTOClass, includeParents ?? false)?.get(key);
    }
    getValues(DTOClass, includeParents = false) {
        const values = this.getMetadata(DTOClass, includeParents)?.values();
        return values ? [...values] : undefined;
    }
    has(DTOClass, key) {
        return this.getMetadata(DTOClass, false)?.has(key) ?? false;
    }
    memoize(DTOClass, key, fn) {
        const existing = this.get(DTOClass, key);
        if (existing) {
            return existing;
        }
        const result = fn();
        this.set(DTOClass, key, result);
        return result;
    }
}
exports.MapReflector = MapReflector;
//# sourceMappingURL=reflect.utils.js.map