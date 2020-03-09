# try-catch 机制

```html
<body>
  <div class="div1">
    <div class="div3">
      <div class="div5"></div>
      <div class="div6"></div>
    </div>
    <div class="div4"></div>
  </div>
  <div class="div2"></div>
  <script>
    var divs = document.getElementsByTagName("div");
    // 深度遍历获取所有的div
    console.log(divs);
    console.log(divs.length);
    try {
      // 这里如果是divs.length 那就会卡死的
      for (let i = 0; i < 6; i++) {
        console.log(divs.length);
        divs[i].innerHTML += `<div class="${"class" + i}">add-div</div>`;
      }
      console.log("---", divs.length);
      // [].forEach.call(divs, function (item, index) {
      //   item.innerHTML += '<div>123333</div>'
      // });
      // 好像是OK的 没有问题
    } catch (error) {
      console.log(error);
    } finally {
      console.log("finally");
    }
  </script>
  <script>
    // --------------------------------------- //
    function test() {
      try {
        console.log("~try");
        throw new Error("123");
        return "try";
      } catch (err) {
        console.log(err);
        return "catch";
      } finally {
        console.log("~finally");
        // return 'finally'
      }
    }
    console.log(test());
    // ~try
    // Error: 123
    // try-catch:52 ~finally
    // try-catch:56 catch
  </script>
  <script>
    // --------------------------------------- //
    console.time("mark");
    let num = 0;
    try {
      for (let i = 0; i < 1000; i++) {
        num += Math.random();
      }
    } catch (error) {}
    for (let i = 0; i < 1000; i++) {
      num += Math.random();
    }
    console.log("try catch：");
    console.timeEnd("mark");
    // --------------------------------------- //
  </script>
</body>
```
