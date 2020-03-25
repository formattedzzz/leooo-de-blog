# 捋一捋 react 组件的代码混入、逻辑复用、包装赋能

其实对于 react 组件 这三个点没有什么明显的界限。核心概念都是 让组件更好的贴合业务 拥有更好的复用、更方便的功能组合

## mixins

关于 React 的 mixin 需要借助 `React.createClass` 方法

`React.createClass` 可以简单看作是 `React.Component` es5 的一种语法

区别[详见文档](https://react.docschina.org/docs/react-without-es6.html)

通过混入来复用一些代码 但是 `React.createClass` 算是比较远古的 API 了 15.5 版本之后就废弃了
需要安装额外的包来支持 `create-react-class`

```js
import React from "react";

var LogMixin = {
  log: function() {
    console.log("log");
  },
  componentDidMount: function() {
    console.log("in");
  },
  componentWillUnmount: function() {
    console.log("out");
  }
};
var User = React.createClass({
  mixins: [LogMixin],
  render: function() {
    return <div>...</div>;
  }
});
var Goods = React.createClass({
  mixins: [LogMixin],
  render: function() {
    return <div>...</div>;
  }
});
```

## 装饰器

来看看装饰器怎么混入 关于装饰器 [在这里](https://github.com/formattedzzz/fe-notes/blob/master/src/JS/decorator/index.md) 有探究

```js
function classDecorator(target) {
  target.prototype.log = function() {
    console.log("这是新加的方法", this.state);
  };
  if (target.prototype.componentDidMount) {
    let temp = target.prototype.componentDidMount;
    target.prototype.componentDidMount = function() {
      temp.call(this);
      console.log(this, "这是混入的逻辑");
    };
  } else {
    target.prototype.componentDidMount = function() {
      console.log(this, "这是新加的逻辑");
    };
  }
  return target;
}

@classDecorator
class DecoratoredComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { index: 0 };
  }
  componentDidMount() {
    console.log(this, "componentDidMount");
  }
  render() {
    console.log("render");
    return (
      <div>
        <button onClick={this.log}>handleClick</button>
      </div>
    );
  }
}
export default DecoratoredComponent;
```

如上我们写了一个函数作为装饰器来扩展被装饰的组件 这个装饰器干了两件事

- 组件加了一个自动绑定好 `this` 指向（指向组件实例）的 log 方法
- 混入一段逻辑代码到 `componentDidMount` 钩子函数中

这里只是装饰整个组件（类）也可以单独装饰某一个属性

```js
function propsDecorator(target, name, descriptor) {
  // target === DecoratoredComponent.prototype
  // descriptor 形如对象参数 {
  // value: null,
  // enumerable: false,
  // configurable: true,
  // writable: true
  // };
  let componentDidMount = descriptor.value;
  if (componentDidMount) {
    descriptor.value = function() {
      componentDidMount.call(this);
      console.log("这是混入的逻辑");
    };
  } else {
    descriptor.value = function() {
      console.log("这是新加的逻辑");
    };
  }
  return descriptor;
}

class DecoratoredComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { index: 0 };
  }

  @propsDecorator
  componentDidMount() {
    console.log(this, "componentDidMount");
  }

  log = () => {};

  render() {
    console.log("render");
    return (
      <div>
        <button onClick={this.log}>handleClick</button>
      </div>
    );
  }
}
export default DecoratoredComponent;
```

可以看出 从语法及实现的灵活性上来说 装饰模式比混入好很多

## HOC

其实高阶组件思想跟装饰模式的一部分用法完全一致 构造一个函数接受一个组件 返回一个组件

### 条件渲染

比如设计一个权限包装组件 `permissionLayout`

```js
function permissionLayout(WrappedComponent) {
  return class extends Component {
    render() {
      if (this.props.permission === false) return null;
      return <WrappedComponent {...props} />;
    }
  };
}
```

### 改造 props

```js
function handleSomeProps(WrappedComponent) {
  return class extends Component {
    render() {
      const newProps = {
        ...this.props,
        user: "leooo"
      };
      return <WrappedComponent {...newProps} />;
    }
  };
}
```

### 获取原组件 refs

```js
function getRefHOC(WrappedComponent) {
  return class extends Component {
    componentDidMount() {
      this.wapperRef.log();
    }
    render() {
      return (
        <WrappedComponent
          {...this.props}
          ref={ref => {
            this.wapperRef = ref;
          }}
        />
      );
    }
  };
}
```

### 状态管理

比如 `antd form` 为什么我们不再需要对每一个输入框写 `onChange` 事件

核心实现就是 把状态值提到上层 下层接受上层一个函数 prop 上层负责更改及下发状态值

```js
import React from "react";

const formCreate = WrappedComponent =>
  class extends React.Component {
    state = { fields: {} };

    onChange = fieldName => ev =>
      this.setFieldValue(fieldName, ev.target.value);

    handleSubmit = callback => callback(this.state.fields);

    getFieldValue = () => this.state.fields;

    setFieldValue = (fieldName, value) =>
      this.setState(state => {
        state.fields[fieldName] = value;
        return state;
      });

    getField = fieldName => ({
      onChange: this.onChange(fieldName),
      value: this.state.fields[fieldName]
    });

    setInitialValue = (fieldName, value) =>
      this.setFieldValue(fieldName, value);

    render() {
      const props = {
        ...this.props,
        handleSubmit: this.handleSubmit,
        getField: this.getField,
        getFieldValue: this.getFieldValue,
        setFieldValue: this.setFieldValue,
        setInitialValue: this.setInitialValue
      };
      return (
        <WrappedComponent
          {...props}
          ref={ref => (this.instanceComponent = ref)}
        />
      );
    }
  };

class Item extends React.Component {
  form = this.props.children._owner.stateNode.props;
  // 这里通过层层访问 拿到了 父组件所接收到的集合
  // 这种配合嵌套的组件也可以通过 context 传下来的

  componentDidMount() {
    this.updateInitialValue();
  }

  componentDidUpdate() {
    this.updateInitialValue();
  }

  updateInitialValue() {
    let { fieldName, initialValue } = this.props;
    this.initialValue !== initialValue &&
      (this.initialValue = initialValue) &&
      this.form.setInitialValue(fieldName, initialValue);
  }

  render() {
    let { title, fieldName } = this.props;
    return (
      <div>
        <div>{title}</div>
        {/* {React.cloneElement(this.props.children, {
          ...this.form.getField(fieldName)
        })} */}
        {React.createElement(children.type, {
          ...this.form.getField(fieldName)
        })}
        {/* 给 children 注入属性可以调用这两个方法 */}
      </div>
    );
  }
}

class FromDemo extends React.Component {
  render() {
    return (
      <div>
        <Item fieldName="username" title="username" initialValue="username">
          <input />
        </Item>
        <Item fieldName="password" title="password" initialValue="password">
          <input />
        </Item>
        <div
          onClick={() => this.props.handleSubmit(fields => console.log(fields))}
        >
          handleSubmit
        </div>
      </div>
    );
  }
}

export default formCreate(FromDemo);
```

为什么这里还要构造一个 `<Item/>` 组件 当然是为了组件的调用的简洁
另外引入有了 `<Item/>` 组件我们还能把样式及布局一起集成进去...
不然我们就得这样写：

```js
class FromDemo extends React.Component {
  render() {
    return (
      <div>
        <div>
          username
          <input {...this.props.getField("username")} />
        </div>
        <div>
          password
          <input {...this.props.getField("password")} />
        </div>
        <button
          onClick={() => this.props.handleSubmit(fields => console.log(fields))}
        >
          handleSubmit
        </button>
      </div>
    );
  }
}
```

这就是 `antd form` 组件实现的大致思路啦 但 antd 中 `Form.Item` 的作用仅仅是为了布局而实现的
而这里的 `<Item/>` 组件的功能则用包装函数代替

到最新的 `antd4.x` 开始已经改成这种格式了。`Form.Item` 里面的负责采发事件的控件不再需要包装。

当然 组件设计的要完善的多 比如上面的要给 `input` 初始值还需要进行包装 要放到 formCreate 函数返回的那个组件中处理
不然会报非受控组件的错

## render props

先看看[官方的案例](https://zh-hans.reactjs.org/docs/render-props.html#gatsby-focus-wrapper)

### render props 的适用场景

## hooks 中的逻辑复用

### hooks 实现双向绑定

```jsx
function useBind(init) {
  let [value, setValue] = useState(init);
  let onChange = useCallback(function(event) {
    setValue(event.currentTarget.value);
  }, []);
  return {
    value,
    onChange
  };
}
function Page1(props) {
  let value = useBind("");
  return <input {...value} />;
}
```
