# vue-cli3

- webapck `require.context` 用法

```js
require.context(directory, (useSubdirectories = true), (regExp = /^\.\/.*$/), (mode = 'sync'));
```

批量全局注册一些组件

```js
const requireAll = context => context.keys().map(context);

const component = require.context('./components', false, /\.vue$/);

requireAll(component).forEach(({ default: item }) => {
  console.log(item);
  Vue.component(`wb-${item.name}`, item);
});
```

```js
const modules = {};
const context = require.context('./modules', true, /\.js$/);
context.keys().forEach(m => {
  try {
    const moduleName = m.slice(2, m.length - 3);
    const module = context(m).modules;
    modules[moduleName] = module;
  } catch (error) {
    console.log('importAllModules error: ', error);
  }
});
```

这里的 context 返回的是一个构造函数 context.keys() 获取键数组 context(key) 获取 module
