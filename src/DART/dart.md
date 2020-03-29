# dart 初识

## 环境

```sh
flutter -h
# flutter 升级
flutter upgrade

# 查看和切换 flutter sdk 分支
flutter channel #查看
flutter channel beta #切换

flutter doctor
# 检查 flutter 环境
```

- 安装 flutter
- 安装 andriod studio
- 安装 andriod sdk
- 安装 dart flutter 插件
- 配置环境变量
- 运行 flutter doctor --android-licenses 一直 OK 下去

> 一定要配置好环境变量 不要 flutter doctor 检测不到

- vscode 上敲 flutter 和 dart

  安装插件 dart dart-import

  创建新项目 flutter create myflutterapp

  cd myflutterapp

  打开 android studio 开启一个模拟器

  flutter run

  每次修改并保存之后 在命令行输入 r 热重载（状态保留） r 热重启（状态重置）

  To hot reload changes while running, press "r". To hot restart (and rebuild state), press "R".

- 安装 server 端 dart

  ```sh
  brew tap dart-lang/dart
  brew install dart
  ```

dart 真正的一切皆对象
代码规范 需要加分号
开发模式下用 `assert()` 来检查数据类型和值合不合规范 生产模式下的 `assert` 是不生效的
需要带上运行参数

```sh
dart --enable-asserts main.dart
```

## 变量类型

- **`String`**
- **`bool`**
- **`num`**
- **`int`**
- **`double`**
- **`List`**
- **`Map`**
- **`null`**
- **`enum`**

```dart
print(name.runtimeType);
// int double bool
```

- **`静态类型`** 可以 用 `name.runtimeType == String` 来判断
  `List` 和 `Map` 结构的不知道诶 知道打印出来长这个样子

```dart
print('${const [1, 2, 3].runtimeType}')
```

```dart
print('${const {"name": "xiaolin", "age": 22}.runtimeType}')
// _InternalLinkedHashMap<dynamic, dynamic>
```

## 变量申明

```dart
final String name = 'xiaolin'     //只能被赋值一次

const Number age = 22   // const 申明的变量只能问数字、字符串、null、和布尔类型的值 不能是Map、List
var name1 = '$变量名 "other string" ${表达式}'  // 模板字符串 只要是要调用函数表达式 都要 ${}
var name = 'bob' // name 就是字符串

// 可以申明动态的数据类型
dynamic name1 = 'Bob';
print(name1);                 // 'Bob'
name1 =  23;                  // 可以赋值任意类型的值
print(name1);                 // 23
```

## 字符串换行

```dart
const String str = """ the first line
so her name is $name 'of' ${bbb > ccc ? bbb : ccc}
"""
// 或者替换成
'''
'''
```

`String.isEmpty` 属性 表示是否为空
被 `final` 或 `const` 修饰的变量无法再去修改其值
`const` 申明的变量中由其他变量组成 则其他变量也只能 `const` 类型的

## 字符串转数字

```dart
// num int double
int.parse()             // 只接受整数类型的字符串
double.parse()          // 所有数字类型的字符串 如果是 整数 会变成整数.0

String piAsString = 3.14159.toStringAsFixed(2);
// '3.14'  toStringAsFixed(2)方法参数必选
```

## 布尔类型

`boolean` dart 是强 `bool` 类型检查 只有 `true` 和 `false` 才具有布尔类型

bool true

## 数组类型

和 js 的本质区别 数组元素是同一种类型的值 js 中的数组严格意义上来讲不是数组

```dart
List arr = [1, 2, 3, 4]
var array = new List(length)
print(arr.length, arr[1], arr.first, arr.last)  // 4

arr.add(5)
arr.addAll([6, 7, 8])

List arr2 = [9, 10]

arr.addAll(arr2)

arr.removeAt(0)                                 // 删除并返回删除的
arr.remove(1)                                   // 删除指定的元素 只会删除检索到的第一个
arr.setRange(index1, index2, item1, item2)
arr.removeRange(start, end)                     // Array.slice() 同样的 含头不含尾
```

过滤操作 区别就是是直接原数组过滤 原数组会变

```dart
arr.removeWhere((item) {
  return item.length > 3
});
arr.clear();
var list = [];
list.add(123);
list.add('value');
list.add({'name':  'xiaolin', 'age':  22});
print(jsonEncode(list));
// 没有像 List<num> list = [] 这样申明数组可以添加任意类型

// filter过滤
list.where((item) => condition...);
// 数组转集合
print(const [1, 2, 3, 2].toSet());  // {1, 2, 3}
```

## Set 类型(集合)

长这个样子 {1, 2, 'name', 4.2}

无序 不重复 无索引值 长度不能固定

```dart
var testSet = new Set();            // 需要调用new关键字显示申明
var testSet2 = new Set(2);          // 错误，Set没有固定元素的定义
print(testSet.length);              // 0
testSet.add(1);
testSet.add(1);                     // 重复元素无效
testSet.add("a");
print(testSet);
print(testSet.contains(1));
testSet.addAll(['b', 'c']);
testSet.remove('b');
```

集合转数组：**set.toList( )**

## Map 类型(映射)

一般来说，map 是将键和值相关联的对象 键和值都可以是任何类型的对象
只支持 map['name'] 这样的写法 不能点访问 类上的方法是可以的

```dart
var map = new Map();

//或者 Map()

var json = new Map<String, num>();

map['name'] = 'xiaolin';
map['age'] = 18;
map.containsKey('key');  // 判断是否有某个属性
print(map['age']);
print(map.length);       // 访问map有多少个属性

var entries = map.entries;
var values = map.values;

// map转字符串：map.toString()
// map的一个添加属性的接口 #如果没有该属性就赋该回调的返回值
map.pushIfAbsent('key', () {
  return something
});
```

## 一些通用的方法

遍历 forEach
List Set 只有 item 一个参数
list.forEach((item) => coding...)
Map 有且必须有 key、val 两个参数
map.forEach((key, val) => coding)

过滤 where
list.where((item) => condition...)
set.where((item) => condition...)
map.where((key, val) => condition...)

改造 map
list.map((item) => condition...)
set.map((item) => condition...)

判断 any...

判断 every...

## 一等公民 函数

格式

`返回值类型` `函数名称` (`形参类型 1` `形参名称 1`, `形参类型 2` `形参名称 2`) {
return ...
}

关于函数简写 函数只包含一条语句，可以使用箭头符号=>来缩短它

```dart
list.forEach((item) => print('${list.indexOf(item)} is $item'))
```

设置形参默认值 和 js 一样

```dart
void main (String name = 'xiaolin') {
  print(name)
}
```

命名参数的语法

```dart
void main(List<String> args) {
  var name = fullName(firstName: 'John', lastName: 'Doe');
  print(name);
}
```

形参用{} 包起来 然后在调用的时候指明这是哪一个参数 这样写的好处在于 传参明了 参数都不是必传了 没传的函数体内得到的是 null

```dart
fullName ({String firstName, String lastName}) {
  return "$firstName $lastName";
}
```

形参为回调函数的写法

```dart
void main () {
  run(getFullName)
}
void run ( String cd(String name1, String name2) ) {
  print(cb('liu', 'xiaolin'))
}
String getFullName (String firstname, String lastname) {
  return "$firstname-$lastname"
}
String fun1 (Person person) {
  //coding...
}
print(fun1.runtimeType)         // (Person) => String
print("${fun1 is Function}")    // true
```

dart 中可选参数、具名参数、参数默认值

也可以用[]包起来

```dart
void joo (bool a, [int b = 0]) {
  //...
}
void foo (a, {@require b, c = 1}, bool d = false) {
  //...
}
```

## Future StringBuffer 类型

## Error 错误类型

throw new FormatException('Expected at least 1 section');
跟 js 一样 throw 之后就宕机了

```dart
try catch finally

try { divide(10, 0);
} on IntegerDivisionByZeroException {  #可以针对某种错误类型进行单独捕获
  print('Division by zero.');
} catch (e) {
  print(e);
} finally {
  print('I will always be executed!');
}
```

## 转解码

```dart
var uri =  'http://example.org/api?foo=some message';
var encoded =  Uri.encodeComponent(uri);

assert(encoded == 'http%3A%2F%2Fexample.org%2Fapi%3Ffoo%3Dsome%20message'); true

var decoded =  Uri.decodeComponent(encoded);
uri.startsWith('http') == true
```

## 类 class

- 通过 class new 出来的类实例.runtimeType = 该类名

```dart
class  Point {
  num x, y;                           // 这里定义了两个实例下的变量
  Point(this.x, this.y);              // 这是 this.x = x 的一种初始化实例属性的简写形式
  num getDis (num x, num y) {
    num disX = x -  this.x;
    num disY = y -  this.y;
    return  sqrt(disX * disX + disY * disY);
  }
}
```

- 另一种初始化的方式 记记其写法就好 没什么鸟用

```dart
Point.fromJson (Map<String, num> json)
: x = json['x'],
  y = json['y'] {
  print('In Point.fromJson(): ($x, $y)');
}
```

- 构造函数参数的的类型检查

```dart
Point.withAssert(this.x,  this.y)
:assert(x >=  0) {
  print('In Point.withAssert(): ($x, $y)');
}
```

总结来说就是在参数()后，执行体{}前加冒号做处理

var dot1 = new Point(1, 1);

或者提前申明类名

Point dot1 = new Point(1, 1);
print(dot1.getDis(2, 2));

- **`Getters and setters`**【重点】

  相当于可以赋值的 computed 事实上 computed 也能赋值的

```dart
class  Point {
  num x, y;  // 这里申明实例下的变量
  Point(this.x, this.y);
  num getDis (num x, num y) {
    num disX = x -  this.x;
    num disY = y -  this.y;
    return  sqrt(disX * disX + disY * disY);
  }
  num get xlen {
    return x * 100
  }
  set xlen (num val) {
    x = val / 100;
  }
}
```

与 computed 属性一致 getter 是依赖实例上属性（这里也就是在类内部定义的变量）来生成的新的计算属性
依赖一变 值就变 同样 setter 的时候我们需要根据计算的逻辑相反关系去 set 其依赖的值 要保持依赖跟计算属性
的同步性 否则会报错：stack overflow

-------------------- Factory constructors 工厂模式构造函数（不明白...）

-------------------- Constant constructors 类的作用用来生成一个常量对象

-------------------- Implicit interfaces 不继承但实现其接口【重点】

> 官方说明：Every class implicitly defines an interface containing all the instance members of the class and of any interfaces it implements. If you want to create a class A that supports class B’s API without inheriting B’s implementation, class A should implement the B interface.

怎么说：每个类都隐式地定义了一个接口，该接口包含该类的所有实例成员及其实现的任何接口。如果要在不继承 A 类的情况下创建支持 A 类 API 的 B 类，则 B 类应实现 A 隐式定义的那个接口

```dart
class Person {
  final _name;
  Person(this._name);
  String greet(String who) =>  'Hello, $who. I am $_name.';
}
class Impostor implements  Person {
  get _name => '';
  String greet(String who) =>  'Hi $who. Do you know who I am?';
}
String  greetBob(Person person) => person.greet('Bob');
```

这里 greetBob 函数需要传入的参数的是 Person 类的一个实例，但 new Impostor()并没有继承 Person 类，但它实现了 Person 的定义的隐式接口，所以确切的说 greetBob 函数要传入的参数的是一个实现了该类任一接口的实例

```dart
void main ( ) {
  print(greetBob(Person('Kathy')));     // Hello, Bob. I am Kathy.
  print(greetBob(Impostor()));          // Hi Bob. Do you know who I am?
}

//-------------------- Implicit interfaces     类的继承【重点】

class  Point {
  num x, y;
  Point.constructor(Map option) {
    x = option['x'];
    y = option['y'];
  }
  num getDis (num x, num y) {
    num disX = x - this.x;
    num disY = y - this.y;
    return  sqrt(disX * disX + disY * disY);
  }
  num  get xlen {
    return x * 100;
  }
  set xlen (num val) {
    x = val / 100;
  }
}
class Surface extends Point {
  Surface.constructor(Map data): super.constructor(data){
  }
}
var dot1 =  new  Point.constructor({'x':  1, 'y':  1});
print(dot1.getDis(2, 2));
print('${dot1.xlen}, ${dot1.x}');
try {
  dot1.xlen =  90;
} catch (err) {
  print(err);         // stack overflow
}
print('${dot1.xlen}, ${dot1.x}');

var dot2 = new Surface.constructor({'x':  1, 'y':  1});
print(dot2.getDis(3, 3));
print('${dot2.xlen}, ${dot2.x}');
```

## 一些操作符

`stateful` 组件 至少需要继承两种组件

一个 `StatefulWidget` 类

一个 `State` 类。`StatefulWidget` 类本身是不变的，但是 `State` 类中持有的状态在 `widget` 生命周期中可能会发生变化

`as` `is` `is!` as 强转操作

a = value;

给 a 变量赋值

`b ??= value;`

如果 b 是 `null` 则赋值给 b

如果不是 `null` 则 b 的值保持不变

`a ?? b` 跟三目差不多 如果 a 为非空则计算 a 的值 否则计算 b 的值

## 单例模式

什么叫单例模式？为什么他们对 dio 的请求中要用到单例模式？

- 先看看 js 中的单例模式^fuck^

```js
var Singleton = function(name) {
  this.name = name;
};
Singleton.prototype.getName = function() {
  console.log(this.name);
};
Singleton.getInstance = (function() {
  var instance = null;
  return function(name) {
    if (!instance) {
      instance = new Singleton(name);
    }
    return instance;
  };
})();
```

直接用闭包 Singleton.getInstance('aaa') === Singleton.getInstance('bbb') // true

```js
var CreateDiv = (function() {
  var instance;
  var CreateDiv = function(html) {
    if (instance) {
      return instance;
    }
    this.html = html;
    this.init();
    return (instance = this);
  };
  CreateDiv.prototype.init = function() {
    var div = document.createElement("div");
    div.innerHTML = this.html;
    document.body.appendChild(div);
  };
  return CreateDiv;
})();
var a = new CreateDiv("html1");
var b = new CreateDiv("html2");
alert(a === b); // true
```

- dart 中得单例模式

```dart
class Manager {
// 厂模式
  factory Manager () => _getInstance()
  static Manager get instance => _getInstance();
  static Manager _instance;
  Manager._internal () {
// 初始化
  }
  static Manager _getInstance () {
    if (_instance == null) {
      _instance = new Manager._internal();
    }
    return _instance;
  }
}
```

- 对请求管理器封装一个 dio 管理器

## 一些语法迁移

- promise

  promise.all 在 dart 中怎么实现？
  response = await Future.wait([dio.post("/info"), dio.get("/token")]);

- 反序列化

  json.decode(jsonstr) #使用这个 API jsonstr 必须是一个 jsonstr 否则直接报错 所以不存在这样的判断 json.decode(jsonstr) is! Map

- 变量初始化

  ```dart
  Map info;
  info['leo']   // 报错 没有初始化的话 访问不存在的属性 报错
  info = {
    "name": "leoo"
  }
  info['key']   // null 不会报错
  ```

  同样的一个 List 没有初始化也不能调用 add 方法 其实也就是 任何变量没有赋值前默认都是 null

- dart 中的三个修饰符 @deprecated @override @proxy

- list.map()之后还要调用.toList( )方法

- part 语句 全局混入

- Future 和 Completer 构造器

## dart 代码片段

```dart
import "dart:convert";
class Api {
  int x;
  int y;
  Api.fromParams({this.x, this.y});
  factory Api(json){
    return Api.fromJson(json);
  }
  Api.fromJson(json){
    x = json['x'];
    y = json['y'];
  }
  String toStr () {
    return "{x:$x , y: $y }";
  }
}
Map info = {
};
List<Api> arr;
Map map = json.decode('{}');
void main() {
  for (int i = 0; i < 5; i++) {
    print('hello ${i + 1}');
  }
  arr = [];
  arr.add(new Api({'x': 1, 'y': 2}));
  // jsonstr必须是json字符串 否则报错
  print(json.decode('{}') is Map);
  print(info['leo']);
  // 初始化后可以访问其他属性 不会报错
  print(map['leo']);
  print(123);
  print(new Api({'x': 3, 'y': 4}).toStr());
  // 传参数的格式
  print(new Api.fromParams(x: 10, y: 12));
}
```

## dart 中类的混入 关键词 with `类中类`

```dart
class Television {
  void turnOn () {
    _illuminateDisplay();
  }
  void _illuminateDisplay () {
  }
}

class Update {
  void updateApp () {

  }
}

class Charge {
  void chargeVip () {

  }
}

class SmartTelevision extends Television with Update, Charge {
  void turnOn () {
    super.turnOn();
    _bootNetworkInterface();
    updateApp();
    chargeVip();
  }
  void _bootNetworkInterface () {
  }
}
```

## 事件装饰器的构造一览

```dart
  GestureDetector({
    Key key,
    this.child,
    this.onTapDown, //按下，每次和屏幕交互都会调用
    this.onTapUp, //抬起，停止触摸时调用
    this.onTap, //点击，短暂触摸屏幕时调用
    this.onTapCancel, //取消 触发了onTapDown，但没有完成onTap
    this.onDoubleTap, //双击，短时间内触摸屏幕两次
    this.onLongPress, //长按，触摸时间超过500ms触发
    this.onLongPressUp, //长按松开
    this.onVerticalDragDown,  //触摸点开始和屏幕交互，同时竖直拖动按下
    this.onVerticalDragStart, //触摸点开始在竖直方向拖动开始
    this.onVerticalDragUpdate,  //触摸点每次位置改变时，竖直拖动更新
    this.onVerticalDragEnd, //竖直拖动结束
    this.onVerticalDragCancel,  //竖直拖动取消
    this.onHorizontalDragDown,  //触摸点开始跟屏幕交互，并水平拖动
    this.onHorizontalDragStart, //水平拖动开始，触摸点开始在水平方向移动
    this.onHorizontalDragUpdate,  //水平拖动更新，触摸点更新
    this.onHorizontalDragEnd, //水平拖动结束触发
    this.onHorizontalDragCancel,  //水平拖动取消 onHorizontalDragDown没有成功触发
    //onPan可以取代onVerticalDrag或者onHorizontalDrag，三者不能并存
    this.onPanDown, //触摸点开始跟屏幕交互时触发
    this.onPanStart,  //触摸点开始移动时触发
    this.onPanUpdate, //屏幕上的触摸点位置每次改变时，都会触发这个回调
    this.onPanEnd,  //pan操作完成时触发
    this.onPanCancel, //pan操作取消
    //onScale可以取代onVerticalDrag或者onHorizontalDrag，三者不能并存，不能与onPan并存
    this.onScaleStart,  //触摸点开始跟屏幕交互时触发，同时会建立一个焦点为1.0
    this.onScaleUpdate, //跟屏幕交互时触发，同时会标示一个新的焦点
    this.onScaleEnd,  //触摸点不再跟屏幕交互，标示这个scale手势完成
    this.behavior,
    this.excludeFromSemantics = false
  })
```

## 点击事件的基本冒泡模型

```dart
new Listener(
  onPointerDown: (PointerDownEvent event) => setState(() => print(456)),
  child: Container(
    padding: EdgeInsets.all(20),
    width: double.infinity,
    color: Colors.brown,
    child: Listener(
      child: Container(
        alignment: Alignment.center,
        color: Colors.blue,
        width: double.infinity,
        height: 150.0,
        child: Text(_event?.toString() ?? "", style: TextStyle(color: Colors.white)),
      ),
      onPointerDown: (PointerDownEvent event) => setState(() => print(123)),
      //onPointerMove: (PointerMoveEvent event) => setState(() => _event = event),
      //onPointerUp: (PointerUpEvent event) => setState(() => _event = event),
    ),
  ),
)
// 123
// 456
```

## fluterr 自定义滑动列表组件

```dart
CustomScrollView(
  slivers: <Widget>[
    //AppBar，包含一个导航栏
    SliverAppBar(
      pinned: true,
      expandedHeight: 200,
      //floating: true,
      flexibleSpace: FlexibleSpaceBar(
        title: const Text('Demo'),
        background: Image.network("https://wx.nnleo.cn/static/img/full1.jpg", fit: BoxFit.cover,),
      ),
    ),
    SliverPersistentHeader(
      pinned: true,
      delegate: _SliverAppBarDelegate(
        minHeight: 60.0,
        maxHeight: 120.0,
        child: Container(
          color: Color(0xffee8800),
          child: Text('Demo'),
        ),
      ),
    ),

    SliverPadding(
      padding: EdgeInsets.all(8.0),
      sliver: SliverGrid(
        gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2,
          mainAxisSpacing: 10.0,
          crossAxisSpacing: 10.0,
          childAspectRatio: 4.0,
        ),
        delegate: SliverChildBuilderDelegate(
          (BuildContext context, int index) {
            return Container(
              alignment: Alignment.center,
              color: Colors.cyan[100 * (index % 9)],
              child: Text('grid item $index'),
            );
          },
          childCount: 20,
        ),
      ),
    ),
    SliverFixedExtentList(
      itemExtent: 50.0,
      delegate: SliverChildBuilderDelegate(
        (BuildContext context, int index) {
          return Container(
            alignment: Alignment.center,
            color: Colors.lightBlue[100 * (index % 9)],
            child: Text('list item $index'),
          );
        },
        childCount: 50
      ),
    ),
  ],
)

```

## 级联符号

```js
animation = tween.animate(controller)
          ..addListener(() {
            setState(() {
              // the animation object’s value is the changed state
            });
          });
// 等价于
animation = tween.animate(controller);
animation.addListener(() {
  setState(() {
    // the animation object’s value is the changed state
  });
});
```
