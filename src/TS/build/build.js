define("namespace/namespace", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Xiaolin;
    (function (Xiaolin) {
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
        Xiaolin.Person = Person;
    })(Xiaolin = exports.Xiaolin || (exports.Xiaolin = {}));
    (function (Xiaolin) {
        Xiaolin.haha = true;
    })(Xiaolin = exports.Xiaolin || (exports.Xiaolin = {}));
});
define("index", ["require", "exports", "namespace/namespace"], function (require, exports, namespace_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function test(para) {
        return {
            info1: para.name,
            info2: para.age
        };
    }
    console.log(test({ name: 'xiaoyue', age: 25 }));
    var anyarr = [1, '', []];
    console.log(new namespace_1.Xiaolin.Person('hahaleo').bark());
    console.log(namespace_1.Xiaolin.haha);
});
define("module1", ["require", "exports"], function (require, exports) {
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
define("module2", ["require", "exports"], function (require, exports) {
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
