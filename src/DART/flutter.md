# flutter 初识

## 计数器示例

```js
import 'package:flutter/material.dart';

// 导入了Material UI组件库

void main() => runApp(new MyApp());

// 主函数入口 整个app new 成一个组件传进去运行 这也是黑盒子啊

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: 'Flutter Demo',
      theme: new ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: new MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}
```

MyApp 组件是无状态的组件

```js
class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);
  // 继承自有状态的组件 并给final变量 title 赋值
  final String title;
  // 为什么这里这里的title一定要加final
  @override
  _MyHomePageState createState() => new _MyHomePageState();
}
```

\_MyHomePageState 类要干的事：

1 生成和管理 MyHomePage 组件的状态机 数据层的行为在这里表现

2 构建**DOM** 也就是 build 方法

```dart
class _MyHomePageState extends State<MyHomePage> {
  //State<MyHomePage>注明是那个组件的state
  int _counter = 0;
  //MyHomePage页面变量
  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }
  @override
  // 每次setState都会触发build函数
  Widget build(BuildContext context) {
    return new Scaffold(
      // Scaffold 页面级的DOM构建脚手架
      appBar: new AppBar(
        title: new Text(widget.title),
        //widget.title？这里的widget就是从new MyHomePage(title: 'Flutter Demo Home Page') 传下来的
      ),
      body: new Center(
        child: new Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            new Text(
              'You have pushed the button this many times:',
            ),
            new Text(
              '$_counter',
              style: Theme.of(context).textTheme.display1,
              // context 可能是一层层传下来的
            ),
          ],
        ),
      ),
      floatingActionButton: new FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: new Icon(Icons.add),
      ),
      // This trailing comma makes auto-formatting nicer for build methods.
    );
  }
}
```

状态管理部分 要视具体情况而定

颜色指定

```dart
Color c = const Color(0xFF42A5F5);                      // 16进制的ARGB
Color c = const Color.fromARGB(0xFF, 0x42, 0xA5, 0xF5);
Color c = const Color.fromARGB(255, 66, 165, 245);
Color c = const Color.fromRGBO(66, 165, 245, 1.0);      // opacity：不透明度
```

页面骨架屏 Scaffold ScafffoldRouteState

组件的生命周期 initState => state 在组件中概念、范围

在 build 函数中结合 state 中的变量来遍历、条件生成 dom 结构

ListView.itemBuilder 如果是固定的内容可以直接写 需要动态生成的内容需要调用 builder 方法 在需要显示的时候的才渲染出来

GridView Sliver 实现滑动粘性效果

通知 Notification 并不是 桌面端通知 对标的是 showToast

组件中 context 中的用法 怎么用？ 怎么通知传递？

async 函数 需要导入原生 dart 包

```dart
import 'dart:async';
( ) async {
  let res = await httpGet('uri')
}
```

json model 化 从后端拿到数据之后怎么接受？ 怎么确定数据结构？
flutter action 中介绍了 模版序列化库 json_serilizable 我们先不用
怎么定义层层 json 结构

> As of Dart 2.1, you don’t need to import dart:async to use the Future and Stream APIs, because dart:core exports those classes.

dart2.1 之后 不需要再单独引入'dart:async'

import 'dart:convert' show json; #这是什么写法？？ 只导入 json 对象 限制引入 hide
dart 中的 import 是智能的 多个文件都引用同一个库只会引入一次

for in 循环不能用来遍历 map 键值对

flutter_wbview_plugin 的应用
Ink 的应用 里面可以装 Boxdecoration
Inkwell 的应用 里面可以用 ontap 事件
每次有重大功能都要重启模拟器 滑动还巨卡的

flutter 布局相关
正常的滑动布局：整个页面作为 child 放入到 SingleChildScrollView 中

column 和 row 的组合 expand

怎么实现 span 按钮？ 用 Container constraint decorateBox ... 用 Container 具有普遍性 相当于一个超集

Opacity 设置透明度 GestureDetector 设置手势 这些都是盒子

自代交互控件

**RaisedButton** **IconButton** **OutlineButton** **Checkbox** **SnackBar** **Switch**

不自带交互 交互装饰包装

**GestureDetector** **inkWell** **Listener**

了解下 BoxConstraints.expand(width: 60, height: 40) 和 SizeBox 之间的异同

andriod studio 对元素执行提取快捷方式 Extract Methods

Stack 定位需要注意的点 首先 包裹他外部容器好像需要定大小 比如 ConstrainBox 和 SizeBox
alignment: 子元素没有 positioned 定位的话怎么对齐
fit: 子元素的大小怎么定义

IndexedStack 只显示第 index 子元素 【继承自 Stack 组件】

Gridview 也需要注意 包裹它的外部容器要有边界尺寸
SliverGridDelegateWithFixedCrossAxisCount 实现了一个横轴为固定数量子元素的 layout 算法
SliverGridDelegateWithMaxCrossAxisExtent 实现了一个横轴子元素为固定最大长度的 layout 算法【引入适配之前这个用的比较少
GridView.builder 常用 itemBuilder

flutter 中 web view 能发起 post 请求吗？ 为什么要要在 web view 中用 flutter 发起 post 请求？ webview 与普通 flutter 页面的通讯、传值？

事件通知 子组件会将通知事件层层往上传递 区别与点击事件的传递

Listener 命中测试中属性
behavior: HitTestBehavior.opaque # 整个 widget 区域均可点击 这应该是常态的
behavior: HitTestBehavior.deferToChild # 他会依次判断 最小的子 widget 能不能触发 如果有子 widget 能够触发 那就会往上传 否则不能 比如我们 Container 中包含了 Text

behavior: HitTestBehavior.translucent # 层叠布局的时候允许对上层透明区域进行点透 什么时候会用到 绝对定位的时候可能会

通知、自定义通知

捕捉类库、组件内部发出的通知

```dart
return NotificationListener(
  onNotification: (note) {
    switch (note.runtimeType) {
      case ScrollStartNotification: print("开始滚动"); break;
      case ScrollUpdateNotification: print("正在滚动"); break;
      case ScrollEndNotification: print("滚动停止"); break;
      case OverscrollNotification: print("滚动到边界"); break;
    }
  },
  child: bar,
);
```

自定义通知 相当于 vue 中的父子组件通讯 通过 context 往上传

```dart
cladd CustomNote extends Notification {
  String msg;
  CustomNote (this.msg);
}
NotificationListener <MyNotification> (
  onNotification: (notification) {
    setState(() {
      _msg += notification.msg + "  ";
    });
  },
  child: Container(
    child: Button(
      onPress: () {
        MyNotification("Hi").dispatch(context);
      }
    )
  )
)
```

flutter 现在知道的两种路由推栈的方式 先声明 context 推入路由名字 还有一种是 materialRoutePage

CustomScrollView 自定义滑动列表
pinned: true, #到顶是否固定 还是直接冲掉
expandedHeight: 200, #展开的宽度 收起的宽度取决于 appbar 的宽度
floating: true, #没有到顶是否展开 默认 false 到顶才能展开
flexibleSpace: #展开的时候的设置背景文字
flexibleSpace： #不一定就要用 FlexibleSpaceBar( ) 可以用任何组件

## flutter 的路由

两种常见的路由跳转方式

- 在 materialapp 中预先定义好路由及相关页面实体 这种方式是静态路由 不能向下个页面传递参数 但是可以接受返回值 Navigator.of(context).pushNamed('/router/second');

  带返回值

  ```dart
  Navigator.of(context).pushNamed('/router/second').then((value) {
    //dialog显示返回值
    //_showDialog(context, value);
  })
  // 下一个页面返回
  Navigator.of(context).pop('这个是要返回给上一个页面的数据');
  ```

- 直接生成下个页面的对象 可以传递想要的参数

  ```dart
  Navigator.of(context).push(MaterialPageRoute(builder: (context) {
    return  WebviewPage(
      title: articles[index].title,
      link: articles[index].link,
    );
  }));
  ```

- 自定义路由的切换动画

  ```dart
  Navigator.of(context).push(PageRouteBuilder(
    pageBuilder: (BuildContext context, Animation<double> animation, Animation<double> secondaryAnimation) {
      return RefreshIndicatorDemo();
    },
    transitionsBuilder: (BuildContext context, Animation<double> animation, Animation<double> secondaryAnimation, Widget child,) {
      // 添加一个平移动画
      return BRouter.createTransition(animation, child);
    }
  ));
  ```

## 抽象类抽象组件

什么叫抽象类 抽象组件？scrollbar + singleScrollView singleScrollView 已经可以当都使用了 套一层 scrollbar 就会出现滚动条

## 滚中滚

怎么在一个已经滚动的页面上再放入一个滚动容器 其实就是吧 scrollView 放进一个 Container 只不过这个 Container 需要定高

## pageView

pageView 是啥？ 就是在一个定高的容器内放置一个滑块组件 每个滑块都是一屏

媒体查询宽度表达法

Container(
width: MediaQuery.of(context).size.width
)

pageView.custom( ) # 这也是银系列组件的语法糖写法 可以捕获滑动不同距离时候的效果

## NestedScrollView

NestedScrollView 骚操作？ 大概是 一个可收缩头部 + 固定 tabbar 以及可以跟随滑动的 tabview
