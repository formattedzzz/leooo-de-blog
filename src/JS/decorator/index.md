# 装饰器 decorator

在多个不同类之间共享或者扩展一些方法或者行为 我觉得可以简单理解为——类中的混入 mixin

比如在`python`中

```py
def decorator(f):
  print "my decorator"
  return f

@decorator
def myfunc():
  print "my function"

myfunc()
# my decorator
# my function
```

再比如 在`dart`中 也能看到对继承过来的 build 方法进行 重载@override
使得该组件（类）的 build 方法既能保留原有的渲染机制 又能渲染自定义的内容

```js
import 'package:flutter/material.dart';
void main() => runApp(new MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
        title: 'App Demo',
        theme: new ThemeData(
          primarySwatch: Colors.blue,
        ),
        home: new MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}
```

再比如 js 中的装饰器 我首次接触到是用到`mobx`这个库的时候

```js
// stroe/index.js
import { observable, computed, action } from "mobx";
class Appstore {
  @observable store = {
    num: 0,
    todos: [1, 2, 3]
  };
  @computed get todotext() {
    return this.store.todos.join("T");
  }
  @action add(num) {
    this.store.todos.push(num);
  }
}
export default new Appstore();

// app.jsx
import React from "react";
import ReactDOM from "react-dom";
import Store from "@/stroe/index.js";
import { Provider } from "mobx-react";
ReactDOM.render(
  <Provider store={Store}>
    <RouteView></RouteView>
  </Provider>,
  document.getElementById("root")
);

// component.jsx
import React, { Component } from "react";
import { connect } from "react-redux";

@connect(
  state => ({
    ...state
  }),
  dispatch => ({
    dispatch
  })
)
class CounterUI extends Component {
  state = {};
  componentDidMount() {
    console.log(this.props);
  }
  render() {
    return <div>CounterUI</div>;
  }
}
export default CounterUI;
```

其中 connect 就是一个函数 其返回值为一个高阶组件 (component) => {}
被高阶组件处理过的 `component` `props`中注入了 `dispatch` 方法

## 作用于类本身的 decorator

```js
// 给空类Cat加一个isAnimal的静态属性
function isAnimal(target) {
  target.isAnimal = true;
  return target;
}

@isAnimal
class Cat {}
console.log(Cat.isAnimal); // true

// 代码等价于
Cat = isAnimal(function Cat() {});
```

## 作用于类属性的 decorator

```js
function fast(target, name, descriptor) {
  // target === Rabbit.prototype
  // descriptor 形如对象参数 {
  // value: null,
  // enumerable: false,
  // configurable: true,
  // writable: true
  // };
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

这里的装饰器`fast`本质就是用来得出重新定义某属性的`descriptor`的一个方法
装饰器在作用于属性的时候 实际上是通过 `Object.defineProperty` 来进行扩展和封装的
这个装饰器的作用是相当于重载`run`方法 让他速度跑到 20 并且跑的时候把它的速度打印出来

装饰器跟 class 一样 都是语法糖 浏览器并不支持 需要`babel`转义 再运行
这里我们装一个 `babel` 命令行工具 `babel-cli` 及一个转义该语法的插件 `babel-plugin-transform-decorators-legacy`

```bash
babel --plugins transform-decorators-legacy index.js > index_prod.js && node index_prod.js
```

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

很显然 `babel-plugin-transform-decorators-legacy` 转义的考虑了多个装饰器的情况
通过 `Object.getOwnPropertyDescriptor` 方法拿到原有属性的 `descriptor` 来构造统一方法 `_applyDecoratedDescriptor`

## 更多玩法

```js
import { override } from "core-decorators";
// 限制重载提示
class Parent {
  speak(first, second) {}
}
class Child extends Parent {
  @override
  speak() {}
  // SyntaxError: Child#speak() does not properly override Parent#speak(first, second)
}
// or
class Child extends Parent {
  @override
  speaks() {}
  // SyntaxError: No descriptor matching Child#speaks() was found on the prototype chain.
  // Did you mean "speak"?
}
```

```js
import { deprecate } from "core-decorators";

class Person {
  @deprecate
  facepalm() {}

  @deprecate("We stopped facepalming")
  facepalmHard() {}

  @deprecate("We stopped facepalming", {
    url: "http://knowyourmeme.com/memes/facepalm"
  })
  facepalmHarder() {}
}

let person = new Person();

person.facepalm();
// DEPRECATION Person#facepalm: This function will be removed in future versions.

person.facepalmHard();
// DEPRECATION Person#facepalmHard: We stopped facepalming

person.facepalmHarder();
// DEPRECATION Person#facepalmHarder: We stopped facepalming
// See http://knowyourmeme.com/memes/facepalm for more details.
```
