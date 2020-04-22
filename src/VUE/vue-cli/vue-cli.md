#

## webapck `require.context` 用法

```js
require.context(
  directory,
  (useSubdirectories = true),
  (regExp = /^\.\/.*$/),
  (mode = 'sync')
)
```

批量全局注册一些组件

```js
const requireAll = context => context.keys().map(context)

const component = require.context('./components', false, /\.vue$/)

requireAll(component).forEach(({ default: item }) => {
  console.log(item)
  Vue.component(`wb-${item.name}`, item)
})
```

```js
const modules = {}
const context = require.context('./modules', true, /\.js$/)
context.keys().forEach(m => {
  try {
    const moduleName = m.slice(2, m.length - 3)
    const module = context(m).modules
    modules[moduleName] = module
  } catch (error) {
    console.log('importAllModules error: ', error)
  }
})
```

这里的 context 返回的是一个构造函数 context.keys() 获取键数组 context(key) 获取 module

## vue-cli3 多页面打包配置

先看 [官方文档](https://cli.vuejs.org/zh/config/#filenamehashing)

直接到根目录创建 vue.config.js 覆盖默认的打包配置

```txt
|-- src
    |   |-- App.vue
    |   |-- directoryList.md
    |   |-- main.js
    |   |-- registerServiceWorker.js
    |   |-- assets
    |   |   |-- logo.png
    |   |-- components
    |   |   |-- HelloWorld.vue
    |   |-- multi-pages
    |   |   |-- index
    |   |   |   |-- App.vue
    |   |   |   |-- index.html
    |   |   |   |-- main.js
    |   |   |-- user
    |   |       |-- App.vue
    |   |       |-- index.html
    |   |       |-- main.js
    |   |-- router
    |   |   |-- index.js
    |   |-- store
    |   |   |-- index.js
    |   |-- utils
    |   |   |-- index.js
    |   |-- views
    |       |-- About.vue
    |       |-- Home.vue
```

```js
// vue.config.js
let path = require('path')
let glob = require('glob')
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const fs = require('fs-extra')

//配置pages多页面获取当前文件夹下的html和js
function getEntry(globPath) {
  let entries = {}
  glob.sync(globPath).forEach(function (entry) {
    var tmp = entry.split('/').splice(-3)
    // console.log(tmp)
    const [pagesdirname, pagename, mainjs] = tmp
    entries[tmp[1]] = {
      entry: `src/${pagesdirname}/${pagename}/${mainjs}`,
      template: `src/${pagesdirname}/${pagename}/index.html`,
      filename: `${pagename}.html`
    }
  })
  return entries
}
const pages = getEntry('./src/multi-pages/**?/*.js')
console.log(pages)

module.exports = {
  lintOnSave: false, //禁用eslint
  baseUrl: process.env.NODE_ENV === 'production' ? '//my.cdn.com/sxVue/' : '/',
  productionSourceMap: false,
  pages,
  devServer: {
    index: '/', //默认启动serve 打开/页面
    open: process.platform === 'darwin',
    host: '',
    port: 8088,
    https: false,
    hotOnly: false,
    before: app => {
      app.get('/', (req, res, next) => {
        for (let i in pages) {
          res.write(`<a target="_self" href="/${i}.html">/${i}.html</a></br>`)
        }
        res.end()
      })
      app.get('/mock/:goods/:list', (req, res, next) => {
        //mock数据
        var json = fs.readJsonSync('./src/mock/index.json')
        var { params, query } = req
        res.status(299).json({ json, params, query }).end()
      })
    }
  },
  chainWebpack: config => {},
  configureWebpack: {
    plugins: [
      process.env.NODE_ENV === 'production'
        ? function () {}
        : new BundleAnalyzerPlugin()
    ]
  }
}
```
