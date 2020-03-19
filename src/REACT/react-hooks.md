# react hooks

## useState

```jsx
function ComponentA(props) {
  const [name, setName] = useState(props.name);
  useEffect(() => {
    console.log("useEffect");
  });
  return (
    <div>
      name: {name}
      <br />
      <Button onClick={() => setName("leo")}>set to leo</Button>
    </div>
  );
}
```

这里 `useState` 的参数只是初始化的时候有效 即 ComponentA 整个组件重新渲染的时候
ComponentA 的父组件通过传参数进来的 name 改变是无效的

## useEffect

```jsx
const [age, setAge] = useState(0);
const [name, setName] = useState(props.name);
useEffect(() => {
  const flag = String(
    Math.random()
      .toString(16)
      .slice(0, 5)
  );
  console.log("useEffect", flag);
  // const timer = setInterval(() => setAge(age + 1), 1000);
  return () => {
    console.log("un-useEffect", flag);
    // clearInterval(timer);
  };
});
console.log("render?");
```

- `useEffect` 不填第二个参数的话 首次渲染和之后的每次渲染都会调用 useEffect 函数 组件重新挂载就会触发三次 `useEffect`

- 第二个参数为 `[]` 的话 `useEffect` 函数只会在 `componentDidMount` 时执行

- 第二个参数为`[name, age]` 数组中的某个值变了才会触发 `useEffect`

- 每触发一次 `componentWillUpdate` 比如 setAge(10)
  会先 render -- 再异步执行上一次 `useEffect` 返回的函数 `un-useEffect` -- 最后执行本次更新触发的 `useEffect`

- 可以简单理解 `useEffect` 函数里的返回的函数就是 `componentWillUnMount`

- 所以 `useEffect` 返回的函数很重要 比如设置了定时器一定要下次 `useEffect` 执行前清除

- 最重要的一点必须理解、明确
  每一个全新的开始 所有的局部变量全都重来 全体失忆
  每一次全新的开始 只有 `Hooks` 函数（比如 `useEffect`）具有上一次渲染的"记忆"

```jsx
function App() {
  const [count, setCount] = useState(0);
  const handleResize = () => {
    // 把count输出
    console.log(`count is ${count}`);
  };
  useEffect(() => {
    // 让resize事件触发handleResize
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [count]);
  return (
    <div className="App">
      <Button onClick={() => setCount(count + 1)}>+++</Button>
      <h1>{count}</h1>
    </div>
  );
}
```

想一想这里的 `useEffect` 第二个参数不填或者填空会怎么样？

## useRef

提供函数式组件一个全局的挂载对象

```jsx
const timerID = useRef();

useEffect(() => {
  timerID.current = setInterval(() => {
    setCount(count => count + 1);
  }, 1000);
}, []);

useEffect(() => {
  if (count > 10) {
    clearInterval(timerID.current);
  }
});
```

上面 timerID 是 `useRef` 函数返回的局部变量 组件每次更新访问到的同一个 timerID
总之用可以 `useRef` 来跨越渲染周期存储数据 而且对它修改也不会引起组件渲染

## useMome

```jsx
function Fa(props) {
  const [age, setAge] = useState(0);
  const [name, setName] = useState(props.name || "");

  useEffect(() => {
    const flag = String(
      Math.random()
        .toString(16)
        .slice(0, 5)
    );
    console.log("useEffect", flag, age);
    return () => {
      console.log("un-useEffect", flag);
    };
  }, [name, age]);
  console.log("render...");
  const data = useMemo(
    () => ({
      name
    }),
    [name]
  );
  return (
    <div>
      name: {name}
      <br />
      age: {age}
      <br />
      <PureChild></PureChild>
      <br />
      <MemoPureChild></MemoPureChild>
      <br />
      <Child data={data}></Child>
      <br />
      <MemoChild data={data}></MemoChild>
      <br />
      <Button onClick={() => setAge(age + 1)}>set to num</Button>
      <br />
      <Button onClick={() => setName("leo")}>set to leo</Button>
    </div>
  );
}
const PureChild = () => {
  console.log("PureChild render");
  return <Button type="primary">PureChild</Button>;
};
const MemoPureChild = memo(() => {
  console.log("MemoPureChild render");
  return <Button type="primary">MemoPureChild</Button>;
});
const Child = props => {
  console.log("Child render");
  return <Button type="primary">{JSON.stringify(props.data)}</Button>;
};
const MemoChild = memo(props => {
  console.log("MemoChild render");
  return <Button type="primary">{JSON.stringify(props.data)}</Button>;
});
```

`useMome` 用来处理变量缓存的 看注释的那条：如果 count 发生改变 整个函数重新执行
data 会被重新赋值 Child 组件势必重新渲染 所以`useMome`是解决这个问题的

`useMome` 的用法：
首先 `React.mome()` 包裹的纯组件内容固定的 (没有引用父组件的任何值)
父函数组件重新渲染并不会引起`MemoPureChild`的重新渲染
但是 `MemoChild` 应用了 data 使用 `useMemo` hook 只有 name 发生改变的时候 `MemoChild` 才会重新渲染

## useCallback

跟缓存变量差不多 用来缓存函数 同样需要 `memo` 方法包裹子组件

```jsx
const onChange = useCallback(e => {
  setText(e.target.value());
}, []);
```

只组件挂载完成时申明 此后的每次渲染 onChange 重新赋值 都不会触发渲染

## useContext

传入的是 `React.createContext()` 返回的对象
该 `hooks` 解决的就是函数式组件的 `context` 问题 相当于类组件中

```jsx
var myContext = React.createContext(null);
class ComponentA extends React.Component {
  static ContextType = myContext;
}
```

具体见下文：

## useReducer

```jsx
import React, { useContext, useReducer } from "react";

const reducer = (state = 0, { type }) => {
  switch (type) {
    case "add":
      return state + 1;
    case "delete":
      return state - 1;
    default:
      return state;
  }
};
const Context = React.createContext(null);

const Child = () => {
  const [count, dispatch] = useContext(Context);
  return (
    <div>
      <div>child...{count}</div>
      <button onClick={() => dispatch({ type: "add" })}>child add</button>
      <button onClick={() => dispatch({ type: "delete" })}>child delete</button>
    </div>
  );
};

const Hook = () => {
  const [count, dispatch] = useReducer(reducer, 10);
  return (
    <Context.Provider value={[count, dispatch]}>
      <div>
        <div>mom ... {count}</div>
        <Child />
        <button onClick={() => dispatch({ type: "add" })}>mom add</button>
        <button onClick={() => dispatch({ type: "delete" })}>mom delete</button>
      </div>
    </Context.Provider>
  );
};
export default Hook;
```
