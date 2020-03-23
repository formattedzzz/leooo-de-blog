(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.info = {
        name: 'leooo',
        age: 22
    };
    var leoo = [1, 3, 9];
    exports.leoo = leoo;
    exports.default = [1, 2, 3];
});
