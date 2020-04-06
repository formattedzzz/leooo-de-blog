# vue 核心原理之双向绑定

复习面试中 涉及到 vue 初始化基本原理 找了篇博文参考 却发现源码千穿百孔 动手 fix 一下:

```js
// 文件：CompileUtil.js
var CompileUtil = {};
// 更新节点数据的方法
CompileUtil.updater = {
  // 文本更新
  textUpdater(node, value) {
    node.textContent = value;
  },
  // 输入框更新
  modelUpdater(node, value) {
    node.value = value;
  }
};

// 文件：CompileUtil.js —— 取值方法
// 获取 data 值的方法
CompileUtil.getVal = function(vm, exp) {
  // 将匹配的值用 . 分割开，如 vm.data.a.b
  exp = exp.split(".");
  // 归并取值
  return exp.reduce((prev, next) => {
    return prev[next];
  }, vm.$data);
};

// 获取文本 {{}} 中变量在 data 对应的值
CompileUtil.getTextVal = function(vm, exp) {
  // 使用正则匹配出 {{ }} 间的变量名，再调用 getVal 获取值
  return exp.replace(/\{\{([^}]+)\}\}/g, (...args) => {
    return this.getVal(vm, args[1]);
  });
};

// 设置 data 值的方法
CompileUtil.setVal = function(vm, exp, newVal) {
  exp = exp.split(".");
  return exp.reduce((prev, next, currentIndex) => {
    // 如果当前归并的为数组的最后一项，则将新值设置到该属性
    if (currentIndex === exp.length - 1) {
      return (prev[next] = newVal);
    }
    // 继续归并
    return prev[next];
  }, vm.$data);
};

// 文件：CompileUtil.js —— model 方法
// 处理 v-model 指令的方法
CompileUtil.model = function(node, vm, exp) {
  // 获取赋值的方法
  let updateFn = this.updater["modelUpdater"];

  // 获取 data 中对应的变量的值
  let value = this.getVal(vm, exp);

  // 添加观察者，作用与 text 方法相同
  new Watcher(vm, exp, newValue => {
    updateFn && updateFn(node, newValue);
  });

  // v-model 双向数据绑定，对 input 添加事件监听
  node.addEventListener("input", e => {
    // 获取输入的新值
    let newValue = e.target.value;

    // 更新到model层
    this.setVal(vm, exp, newValue);
  });

  // 第一次设置值
  if (updateFn) {
    // console.log("updateFn", value);
    updateFn(node, value);
  }
};

// 文件：CompileUtil.js —— text 方法
// 处理文本节点 {{}} 的方法
CompileUtil.text = function(node, vm, exp) {
  // 获取赋值的方法
  let updateFn = this.updater["textUpdater"];
  // console.log(node, updateFn, vm, exp);
  // 获取 data 中对应的变量的值
  let value = this.getTextVal(vm, exp);

  // 通过正则替换，将取到数据中的值替换掉 {{ }}
  exp.replace(/\{\{([^\{\}]+)\}\}/g, (...args) => {
    // 解析时遇到了模板中需要替换为数据值的变量时，应该添加一个观察者
    // 当变量重新赋值时，调用更新值节点到 Dom 的方法
    new Watcher(vm, args[1], newValue => {
      // 如果数据发生变化，重新获取新值
      updateFn && updateFn(node, newValue);
    });
    // return args[0];
  });

  // 第一次设置值
  if (updateFn) {
    console.log("updateFn", value);
    updateFn(node, value);
  }
};

// 文件：Compiler.js —— 完善
class Compiler {
  constructor(el, vm) {
    this.el = typeof el === "string" ? document.querySelector(el) : el;
    console.log("编译根元素:", this.el);
    this.vm = vm;

    // 如过传入的根元素存在，才开始编译
    if (this.el) {
      // 1、把这些真实的 Dom 移动到内存中，即 fragment（文档碎片）
      let fragment = this.node2fragment(this.el);
      // 2、将模板中的指令中的变量和 {{}} 中的变量替换成真实的数据
      this.compile(fragment);
      // console.log(fragment);
      // 3、把编译好的 fragment 再塞回页面中
      this.el.appendChild(fragment);
    }
  }

  /* 辅助方法 */
  // 判断是否是元素节点
  isElementNode(node) {
    return node.nodeType === 1;
  }

  // ********** 以下为新增代码 **********
  // 判断属性是否为指令
  isDirective(name) {
    return name.includes("v-");
  }
  // ********** 以上为新增代码 **********

  /* 核心方法 */
  // 将根节点转移至文档碎片
  node2fragment(el) {
    // 创建文档碎片
    let fragment = document.createDocumentFragment();
    // 第一个子节点
    let firstChild;

    // 循环取出根节点中的节点并放入文档碎片中
    while ((firstChild = el.firstChild)) {
      fragment.appendChild(firstChild);
    }
    return fragment;
  }

  // ********** 以下为新增代码 **********
  // 解析文档碎片
  compile(fragment) {
    // 当前父节点节点的子节点，包含文本节点，类数组对象
    let childNodes = fragment.childNodes;
    // if (!childNodes) return;
    console.log(childNodes);
    // if (childNodes.length === 0) return;
    // 转换成数组并循环判断每一个节点的类型
    Array.from(childNodes).forEach(node => {
      if (this.isElementNode(node)) {
        // 是元素节点
        // 递归编译子节点
        console.log("node", node);
        this.compile(node);

        // 编译元素节点的方法 这里的 node 就是实实在在的 dom 节点了
        this.compileElement(node);
      } else {
        // 是文本节点
        // 编译文本节点的方法
        console.log("text", node);
        this.compileText(node);
      }
    });
  }
  // 编译元素
  compileElement(node) {
    // 取出当前节点的属性，类数组
    let attrs = node.attributes;
    Array.from(attrs).forEach(attr => {
      // 获取属性名，判断属性是否为指令，即含 v-
      let attrName = attr.name;

      if (this.isDirective(attrName)) {
        // 如果是指令，取到该属性值得变量在 data 中对应得值，替换到节点中
        let exp = attr.value;

        // 取出方法名
        let [, type] = attrName.split("-");
        // console.log(type);
        // 调用指令对应得方法
        CompileUtil[type](node, this.vm, exp);
      }
    });
  }
  // 编译文本
  compileText(node) {
    // 获取文本节点的内容
    let exp = node.textContent;
    // 创建匹配 {{}} 的正则表达式
    let reg = /\{\{[^\{\}]+\}\}/g;

    // 如果存在 {{}} 则使用 text 指令的方法
    if (reg.test(exp)) {
      console.log("exp-ok", exp.trim());
      CompileUtil["text"](node, this.vm, exp);
    }
  }
}

// 文件：Watcher.js
class Watcher {
  constructor(vm, exp, callback) {
    this.vm = vm;
    this.exp = exp;
    this.callback = callback;

    // 更改前的值
    this.value = this.get();
  }
  get() {
    // 将当前的 watcher 添加到 Dep 类的静态属性上
    Dep.target = this;

    // 获取值触发数据劫持
    let value = CompileUtil.getVal(this.vm, this.exp);

    // 清空 Dep 上的 Watcher，防止重复添加
    Dep.target = null;
    return value;
  }
  update() {
    // 获取新值
    let newValue = CompileUtil.getVal(this.vm, this.exp);
    // 获取旧值
    let oldValue = this.value;

    // 如果新值和旧值不相等，就执行 callback 对 dom 进行更新
    if (newValue !== oldValue) {
      this.callback(newValue);
    }
  }
}

// 文件：Dep.js
class Dep {
  constructor() {
    this.subs = [];
  }
  // 添加订阅
  addSub(watcher) {
    this.subs.push(watcher);
  }
  // 通知
  notify() {
    this.subs.forEach(watcher => watcher.update());
  }
}

// 文件：Observer.js
class Observer {
  constructor(data) {
    this.observe(data);
  }
  // 添加数据监听
  observe(data) {
    // 验证 data
    if (!data || typeof data !== "object") {
      return;
    }

    // 要对这个 data 数据将原有的属性改成 set 和 get 的形式
    // 要将数据一一劫持，先获取到 data 的 key 和 value
    Object.keys(data).forEach(key => {
      // 劫持（实现数据响应式）
      this.defineReactive(data, key, data[key]);
      this.observe(data[key]); // 深度劫持
    });
  }
  // 数据响应式
  defineReactive(object, key, value) {
    let _this = this;
    // 每个变化的数据都会对应一个数组，这个数组是存放所有更新的操作
    let dep = new Dep();

    // 获取某个值被监听到
    Object.defineProperty(object, key, {
      enumerable: true,
      configurable: true,
      get() {
        // 当取值时调用的方法
        Dep.target && dep.addSub(Dep.target);
        return value;
      },
      set(newValue) {
        // 当给 data 属性中设置的值适合，更改获取的属性的值
        if (newValue !== value) {
          _this.observe(newValue); // 重新赋值如果是对象进行深度劫持
          value = newValue;
          dep.notify(); // 通知所有人数据更新了
        }
      }
    });
  }
}

// 文件：MVVM.js
class MVVM {
  constructor(options) {
    // 先把 el 和 data 挂在 MVVM 实例上
    this.$el = options.el;
    this.$data = options.data;
    // 如果有要编译的模板就开始编译
    if (this.$el) {
      // 数据劫持，就是把对象所有的属性添加 get 和 set
      new Observer(this.$data);
      // 将数据代理到实例上
      this.proxyData(this.$data);
      // 用数据和元素进行编译
      new Compiler(this.$el, this);
    }
  }
  proxyData(data) {
    // 代理数据的方法
    Object.keys(data).forEach(key => {
      Object.defineProperty(this, key, {
        get() {
          return data[key];
        },
        set(newVal) {
          data[key] = newVal;
        }
      });
    });
  }
}

export default MVVM;
```

简单测试一下:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="root">
      {{name}}<span>{{age}}</span><input type="text" v-model="name" />
    </div>
    <button>change</button>
    <script type="module">
      import MVVM from "./vue-init.js";
      // console.log(CompileUtil);
      var vm = new MVVM({
        el: "#root",
        data: {
          name: "leooo",
          age: 23
        }
      });
      document
        .getElementsByTagName("button")[0]
        .addEventListener("click", () => {
          console.log(vm, vm.name);
          vm.name = Math.random()
            .toString(36)
            .slice(6);
          vm.age = Math.ceil(20 * Math.random());
        });
    </script>
    <!-- <script>
      console.log(document.getElementById("root").attributes);
    </script> -->
  </body>
</html>
```
