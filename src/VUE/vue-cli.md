# vue-cli3

- `require.context`

```js
require.context(directory, useSubdirectories = true, regExp = /^\.\/.*$/, mode = 'sync');
```

批量全局注册一些组件

```js
const requireAll = context => context.keys().map(context);

const component = require.context("./components", false, /\.vue$/);

requireAll(component).forEach(({ default: item }) => {
  console.log(item);
  Vue.component(`wb-${item.name}`, item);
});
```
