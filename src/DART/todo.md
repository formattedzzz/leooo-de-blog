# todos

- dart 模块化的问题

- 枚举类型报错问题

- 引用类型 `runtimeType` 判断问题
  ok 这样判断

```dart
assert(const [] is List);
// true
```

`assert()` 不起作用问题 # 加上运行参数

类型转化的问题 # 引入相关包 不同版本暴露的方法名并不同 jsonstr 的格式必须为 '' 包 ""

```dart
import 'dart:convert';
String jsonstr = '{"name": "xiaolin", "age": 22}';
Map jsondata = jsonDecode(jsonstr);
print('${jsondata['name']} ${jsonEncode(jsondata).runtimeType == String}');
```

怎么批量化的解析复杂的 json 结构(json 内部 list、json 的互相嵌套) 借助工具
基本实现 webpack-merge 在后台不管返回任何数据的情况下 前端不会报错

**`with`** **`AutomaticKeepAliveClientMixin`** 是干什么用的？ 类混入 相当于内部类的概念

TabBar 配合 TabBarView 切换页面

然后每个页面是一个 listview 加载数据

但是切换页面后 listview 的数据会被重置

重新被加载了

解决办法使用 with AutomaticKeepAliveClientMixin 实现 @protected bool get wantKeepAlive=>true 即可

dart 中 `=` 及 `.key` 的操作都是 `set()` `get()`的语法糖 函数调用其实也是 `.call()` 的语法糖 震惊！

dart 中允许重写几乎所有方法（除一些内置操作符之外）

dart 中的 `Symbol`: 使用 **`#`** 开头，后面跟着一个或多个 **`.`** 分割的标识符或运算符 基本用不到

MyClass #com.evil_empire.forTheWin - Dart 是 **不支持函数重载** 的 啥意思？？

dart flutter 中的 `extends`、`implements`、`with` 的用法与区别？
三者可以同时存在 其顺序为： `extends` -> `mixins` -> `implements`

1. Flutter 中的继承是单继承

2. 构造函数不能继承

3. 子类重写超类的方法，要用 `@override` (例如在 json2model 中想要重新实现 `toString()` 方法 还有 widget 的 build 方法)

4. 子类调用超类的方法，要用 `super`

final 声明的值将是采用懒加载的方式 只有当 `get()` 被调用之前 该变量才会被初始化
