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
    var obj1 = {
        name: 'xiaolin',
        age: 22
    };
    exports.obj1 = obj1;
    var obj2 = {
        name: 'xiaoyue',
        age: 24
    };
    exports.obj2 = obj2;
    ;
    function func(s) {
        return s.substr(0, 4);
    }
    exports.default = func;
    ;
});
