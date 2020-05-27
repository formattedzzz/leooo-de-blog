# vue 拾遗

## v-model

怎么给一个组件加上 v-model 属性

## vue.extend

## vue-cli4 打包的 modren 策略

vue-cli-service --modren 命令打包原理
针对原生 script 标签支持 type="module" 的环境 target 为 es2015 [name].[chunkhash].legecy.js
针对不支持的打包为 es5 [name].[chunkhash].js
index.html 中判断 script 元素对象的 noModule 属性是否为 false false 引用[name].[chunkhash].legecy.js 反之亦然
