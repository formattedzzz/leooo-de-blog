# 生命周期的改动

- 不要在 componentDidUpdate 钩子函数中使用 setState 函数
- shouldComponentUpdate 钩子函数
- 既然提到了 shouldComponentUpdate 就再了解一下 React.PureComponent 吧

```jsx
shouldComponentUpdate(nextProps, nextState) {
  console.log('shouldComponentUpdate:', nextState);
  const { editingNodeIdx } = this.state;
  if (editingNodeIdx === 1) return false;
  return true;
}
// return boolean 为true才会出发视图更新
// 一般不需要去实现这个函数 因为有React.PureComponent
```

- componentWillReceiveProps 别名 UNSAFE_componentWillReceiveProps

- getDerivedStateFromProps 这两个放在一起 功能相似吧

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

- componentWillUpdate、UNSAFE_componentWillUpdate

- 新的替代函数 getSnapShotBeforeUpdate + componentDidUpdate 两者组合使用

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
