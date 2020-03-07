```js
function fast(target, name, descriptor) {
  target.speed = 20;

  let run = descriptor.value;
  descriptor.value = function() {
    run();
    console.log(`speed ${this.speed}`);
  };

  return descriptor;
}

class Rabbit {
  @fast
  run() {
    console.log("running~");
  }
}

var bunny = new Rabbit();

bunny.run();
// running~
// speed 20

console.log(bunny.speed); // 20
```

babel --plugins transform-decorators-legacy index.js > index_build.js
转换之后：
```js
var _desc, _value, _class;

function _applyDecoratedDescriptor(
  target,
  property,
  decorators,
  descriptor,
  context
) {
  var desc = {};
  Object["ke" + "ys"](descriptor).forEach(function(key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ("value" in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators
    .slice()
    .reverse()
    .reduce(function(desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object["define" + "Property"](target, property, desc);
    desc = null;
  }

  return desc;
}

function fast(target, name, descriptor) {
  target.speed = 20;

  let run = descriptor.value;
  descriptor.value = function() {
    run();
    console.log(`speed ${this.speed}`);
  };

  return descriptor;
}

let Rabbit =
  ((_class = class Rabbit {
    run() {
      console.log("running~");
    }
  }),
  _applyDecoratedDescriptor(
    _class.prototype,
    "run",
    [fast],
    Object.getOwnPropertyDescriptor(_class.prototype, "run"),
    _class.prototype
  ),
  _class);

var bunny = new Rabbit();

bunny.run();
// running~
// speed 20

console.log(bunny.speed); // 20
```
