# 生命周期的改动

## class 内部初始化

## `componentWillUpdate` 、 `componentDidUpdate`

不要在 `componentDidUpdate` 钩子函数中使用 `setState` 函数

## `shouldComponentUpdate`

关于 `shouldComponentUpdate` 官方已经提到 一般不需要去实现这个函数 因为有 `React.PureComponent` 而且 `hooks` 也有了 `useMemo`、 `useCallback` 等替代品

```jsx
shouldComponentUpdate(nextProps, nextState) {
  console.log('shouldComponentUpdate:', nextState);
  const { editingNodeIdx } = this.state;
  if (editingNodeIdx === 1) return false;
  return true;
}
// return boolean 为true才会出发视图更新
```

## `componentWillReceiveProps`

下个大版本即将废弃 别名 `UNSAFE_componentWillReceiveProps` 可以继续使用

## `componentWillMount`

下个大版本即将废弃 别名 `UNSAFE_componentWillMount` 可以继续使用

## `getDerivedStateFromProps`

使用场景：**`state` 的值在任何时候都取决于 `props`**

```js
class ExampleComponent extends React.Component {
  state = {
    isScrollingDown: false
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.currentRow !== nextProps.currentRow) {
      // 检测到变化后更新状态、并请求数据
      this.setState({
        isScrollingDown: nextProps.currentRow > this.props.currentRow
      });
      this.loadAsyncData();
    }
  }

  loadAsyncData() {
    /* ... */
  }
}

class ExampleComponent extends React.Component {
  state = {
    isScrollingDown: false,
    lastRow: null
  };
  // 注意这只是个静态函数 所以不能访问到this.props
  static getDerivedStateFromProps(nextProps, prevState) {
    // 不再提供 prevProps 的获取方式
    if (nextProps.currentRow !== prevState.lastRow) {
      // 需要改动哪个state值就返回哪个
      return {
        isScrollingDown: nextProps.currentRow > prevState.lastRow,
        lastRow: nextProps.currentRow
      };
    }
    // 默认不改动 state
    return null;
  }

  componentDidUpdate() {
    // 仅在更新触发后请求数据
    this.loadAsyncData();
  }

  loadAsyncData() {
    /* ... */
  }
}
```

## `componentWillUpdate`

下个大版本即将废弃 别名 `UNSAFE_componentWillUpdate` 可以继续使用

## `getSnapShotBeforeUpdate`

`getSnapShotBeforeUpdate` + `componentDidUpdate` 两者组合使用代替 `componentWillUpdate`

```js
class ScrollingList extends React.Component {
  constructor(props) {
    super(props);
    this.listRef = React.createRef();
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // Are we adding new items to the list?
    // Capture the scroll position so we can adjust scroll later.
    if (prevProps.list.length < this.props.list.length) {
      const list = this.listRef.current;
      return list.scrollHeight - list.scrollTop;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // If we have a snapshot value, we've just added new items.
    // Adjust scroll so these new items don't push the old ones out of view.
    // (snapshot here is the value returned from getSnapshotBeforeUpdate)
    if (snapshot !== null) {
      const list = this.listRef.current;
      list.scrollTop = list.scrollHeight - snapshot;
    }
  }

  render() {
    return <div ref={this.listRef}>{/* ...contents... */}</div>;
  }
}
```

## static `getDerivedStateFromError` `componentDidCatch`

错误边界提供的两个钩子函数

```jsx
// error-handle.jsx
import React from "react";
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 你同样可以将错误日志上报给服务器
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
export default ErrorBoundary;

// error-con.jsx
export default class ErrorCon extends React.Component {
  state = { code: 1 };
  render() {
    if (this.state.code === 0) {
      throw new Error("a error");
    }
    return (
      <div
        onClick={() => {
          this.setState({ code: 0 });
        }}
      >
        this is ErrorCon Component
      </div>
    );
  }
}

// app.jsx
<ErrorHandle>
  <ErrorCon></ErrorCon>
</ErrorHandle>;
```
