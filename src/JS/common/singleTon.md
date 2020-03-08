# 单例模式很简单的写法

写一个普通的类 然后再暴露一个方法 getSingleTon

```js
var Singleton = function(name) {
  this.name = name;
};
Singleton.prototype.getName = function() {
  return this.name;
};
// 获取实例对象
Singleton.prototype.getSingleTon = (function() {
  var instance = null;
  return function(name) {
    if (!instance) {
      instance = new Singleton(name);
    }
    return instance;
  };
})();
// 测试单体模式的实例
var a = getSingleTon("aa");
var b = getSingleTon("bb");
a === b; // true
```
