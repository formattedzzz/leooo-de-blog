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
    var Xiaoleo;
    (function (Xiaoleo) {
        Xiaoleo.haha = true;
    })(Xiaoleo = exports.Xiaoleo || (exports.Xiaoleo = {}));
    (function (Xiaoleo) {
        var Person = (function () {
            function Person(name) {
                this.name = name;
            }
            Person.prototype.bark = function () {
                console.log(this.name);
                return this.name;
            };
            return Person;
        }());
        Xiaoleo.Person = Person;
    })(Xiaoleo = exports.Xiaoleo || (exports.Xiaoleo = {}));
    var Geometric;
    (function (Geometric) {
        var HALF = 0.5;
        var Square = (function () {
            function Square() {
            }
            Square.prototype.area = function (h, w) { return h * w; };
            return Square;
        }());
        Geometric.Square = Square;
        var Triangle = (function () {
            function Triangle() {
            }
            Triangle.prototype.area = function (h, w) { return (h * w) * HALF; };
            ;
            return Triangle;
        }());
        Geometric.Triangle = Triangle;
    })(Geometric = exports.Geometric || (exports.Geometric = {}));
});
