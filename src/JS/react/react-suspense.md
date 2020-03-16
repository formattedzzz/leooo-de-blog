# react 之重新认识 Suspense

关于 `Suspense` 官网给的文档非常有限 乍一看我们会认为它只是配合 `React.lazy` 实现异步加载的蒙层

但是其实深扒一下我们会发现 它的出现对我们构建应用程序在`异步取数`、`UI渲染`上提供了一种新的方式

## `React.Suspense` 搭配 `React.lazy` 动态导入的代码分割

```jsx
const OtherComponent = React.lazy(() => import("./OtherComponent"));
function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}
```

如果我们一个 URL 下 lazy 一个 `Component` 这是很常用的 该 `Component` 下分很多模块异步取数据渲染

这样又嵌套了很多 `Suspense` 组件 我们来模拟一下：

```jsx
// ---------------- utils.js 写一个方法模拟一定时间加载一个组件
export function slowImport(value, ms = 1000) {
  return new Promise(resolve => {
    setTimeout(() => resolve(value), ms);
  });
}

// ---------------- bar.jsx
import React from "react";
export default function Bar() {
  return (
    <div style={{ background: "#999", padding: 24 }}>this is Bar Component</div>
  );
}

// ---------------- foo.jsx
import React, { Component, lazy, Suspense } from "react";
import { slowImport } from "./utils";
const Bar = lazy(() => slowImport(import("./bar"), 2000));

export default class Foo extends Component {
  render() {
    return (
      <div>
        <Suspense fallback={<div>Bar is loading</div>}>
          this is Foo Component
          <Bar></Bar>
        </Suspense>
      </div>
    );
  }
}

// ---------------- routeComponent.jsx
import React, { Component, lazy, Suspense } from "react";
import { slowImport } from "./utils";
const Foo = lazy(() => slowImport(import("./foo"), 1000));
// import Baz from "./baz";

class RouteComponent extends Component {
  render() {
    return (
      <div style={{ background: "#ccc", padding: 24 }}>
        <Suspense fallback={<div>Foo is loading</div>}>
          this is RouteComponent
          <Foo></Foo>
          {/* <Baz></Baz> */}
        </Suspense>
      </div>
    );
  }
}
export default RouteComponent;
```

这里我们写了 `RouteComponent` 花一秒钟来加载 `Foo` `Foo` 又花 2 秒钟来加载 `Bar` 那么页面的表现为：

- 开始渲染 `RouteComponent` Foo 组件加载中 只显示为 Foo is loading
- 1 秒后 `Foo` 加载完毕 显示 this is RouteComponent + Bar is loading
- 2 秒后 `Bar` 加载完毕 显示 完整

子元素在异步取数时会阻塞父组件渲染 并一直冒泡到最外层第一个 Suspense 此时 Suspense 不会渲染子组件 而是渲染 fallback 当所有子组件异步阻塞取消后才会正常渲染

有多个组件 它要等它里面所有组件都 resolved 之后 才会撤销掉 fallback 中的内容

## `React.Suspense` 应用到任何异步数据流中

组件能在 `render` 方法调用时抛出 `Promise`（或者任何在组件渲染时调用的方法 例如新的静态方法 `getDerivedStateFromProps`）。`React` 会捕获 `Promise` 并沿着组件树往上寻找最近的 `Suspense` 组件 并且它会充当一种边界。`Suspense` 组件接收一个名为 `fallback` 的 `prop` 只要它的子树中有任何组件处于暂停状态 `fallback` 中的组件就会立即被渲染

对于组件的异步取数据 我们每个异步组件都在各自的生命周期内取数据 `fetching` `success` `error` 各自管理异步状态 我们可以 `Suspense` 搭配 `Pending` 中 throw `promise` 的方式 把一些需要的异步组件集中起来统一管理

一般从我们开发来讲 每个模块出错了 我们好像是应该把加载、出错的提示都显示出来 但真正从用户的角度来看 他们并不在意这个 而是在意页面一个整体的反应。

```js
// baz.jsx
import React, { Component } from "react";
let data = "";
let promise = "";
function requestData() {
  if (data) return data;
  if (promise) throw promise;
  promise = new Promise(resolve => {
    setTimeout(() => {
      data = "Data resolved";
      resolve();
    }, 2000);
  });
  throw promise;
}
export default class Baz extends Component {
  render() {
    const data = requestData();
    return <div>this is Foo Component {JSON.stringify(data)}</div>;
  }
}

// ---------------- routeComponent.jsx
import React, { Component, lazy, Suspense } from "react";
import Baz from "./baz";

class RouteComponent extends Component {
  render() {
    return (
      <div style={{ background: "#ccc", padding: 24 }}>
        RouteComponent Layout component
        <Suspense fallback={<div>module is loading</div>}>
          this is RouteComponent
          <Baz></Baz>
        </Suspense>
      </div>
    );
  }
}
export default RouteComponent;
```

通过 throw new Promise 来中断组件渲染 Suspense 会等待这个 Promise 就绪后 接着重新渲染

为了避免重新渲染时 又抛出 Promise 导致'死循环'。这里需要使用一个 `缓存` 来表示异步操作已经就绪了 避免再次抛出异常
能不能在组件内部缓存这些状态？答案是不行, 至少现在不可以

- 将缓存状态提取到 `context`

- 将缓存状态提取到父级
