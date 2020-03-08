# 初识 Blob 对象

```js
// 从input元素中读取一个文件：
let fileInput = document.getElementById("file");
fileInput.onchange = console.log(fileInput.files[0]);
// 直接创建一个
let file = new File(["1"], "1.txt");
file instanceof File; // true
file instanceof Blob; // true
```

file 和其他类型之间的转换是一个异步的过程，是通过 fileReader 来实现的，转换的结果在 reader 的 onload 事件中获取，代码如下：

- file to base64
  dataUrl 除去 MIME 信息以外才是 base64 的数据

```js
let reader = new FileReader(file);
reader.onload = event => console.log(event.target.result);
reader.readAsDataURL(file);
```

- file to arrayBuffer

```js
let reader = new FileReader(file);
reader.onload = event => console.log(event.target.result);
reader.readAsArrayBuffer(file);
```

- file to binaryString

```js
reader.readAsBinaryString(file);
```

- base64 to file

```js
function dataURLtoFile(dataurl, filename) {
  let arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}
```

```js
// 文件上传时通过转换为bloburl来实现预览
$(".test-file").change(function(e) {
  let file = e.currentTarget.files[0];
  console.log(typeof file, file instanceof Blob); // object true
  const src = URL.createObjectURL(file);
  // console.log(src)
  // blob:http://localhost:7006/866a4808-7336-4ab6-b506-321bd0f024e0
  var img = new Image();
  img.src = src;
  img.onload = function() {
    document.body.append(img);
  };
});
```

## URL.createObjectURL()

Blob 其实是一个可以当作文件用的二进制数据 我们可以通过接口**URL.createObjectURL()**生成一个指向 Blob 的地址 参数本质就是一个 blob 对象

需要注意的是 即使是同样的二进制数据 每调用一次**URL.createObjectURL**方法 就会得到一个不一样的 Blob URL 这个 URL 的存在时间 等同于网页的存在时间 一旦网页刷新或卸载 这个 Blob URL 即失效

## Blob 与 ArrayBuffer 的互转

```js
// 创建一个以二进制数据存储的html文件
const text = "<div>hello world</div>";
const blob = new Blob([text], { type: "text/html" });
// Blob {size: 22, type: "text/html"}
// 以文本读取
const textReader = new FileReader();
textReader.readAsText(blob);
textReader.onload = function() {
  console.log(textReader.result);
  // <div>hello world</div>
};
// 以ArrayBuffer形式读取
const bufReader = new FileReader();
bufReader.readAsArrayBuffer(blob);
bufReader.onload = function() {
  console.log(new Uint8Array(bufReader.result));
  // Uint8Array(22)
  // [60, 100, 105, 118, 62, 104, 101, 108, 108, 111, 32, 119, 111, 114, 108,
  // 100, 60, 47, 100, 105, 118, 62]
};
```

```js
// 我们直接创建一个Uint8Array并填入上面的数据
const u8Buf = new Uint8Array([
  60,
  100,
  105,
  118,
  62,
  104,
  101,
  108,
  108,
  111,
  32,
  119,
  111,
  114,
  108,
  100,
  60,
  47,
  100,
  105,
  118,
  62
]);
const u8Blob = new Blob([u8Buf], { type: "text/html" }); // Blob {size: 22, type: "text/html"}
const textReader = new FileReader();

textReader.readAsText(u8Blob);
textReader.onload = function() {
  console.log(textReader.result);
  // 同样得到div>hello world</div>
};
```

## new Blob()两个参数分别是什么

- 第一个参数

**ArrayBuffer** **ArrayBufferView** **Blob** **DOMString** 二进制数据序列构成的数组

ArrayBuffer 涉及面比较广 我的理解是 ArrayBuffer 代表内存之中的一段二进制数据 **一旦生成不能再改** 可以通过视图（**TypedArray**和**DataView**）进行操作

- 第二个可选参数（BlobPropertyBag 字典）

{type: "application/octet-binary"}

{type: "application/json"}

{type: "video/mpe4"}

{type: application/octet-stream}

## 应用

```html
<body>
  <a download="leooo" class="leooo" href="">BLOB</a>
  <script src="jquery.min.js"></script>
  <script id="leooo"></script>
  <script>
    // -----------------------------blob的本质就是文件
    var json = {
      name: "leooo",
      age: 23
    };
    var blob1 = new Blob([JSON.stringify(json)], {
      type: "application/json"
    });
    console.log(blob1);
    $(".leooo").attr("href", URL.createObjectURL(blob1));
    // 点击链接就会下载一份文件存到本地 因为href只要指向文件或者返回文件流的API地址 都会触发下载行为
  </script>

  <script>
    var script = 'console.log($(".leooo"));';

    // $('#leooo').get(0).textContent = script;

    var newscript = document.createElement("script");
    // 让创建出来的script标签src直接指向blob文件地址
    var blobUrl = URL.createObjectURL(
      new Blob([script], { type: "text/javascript" })
    );
    newscript.src = blobUrl;
    document.body.appendChild(newscript);

    // $('#leooo').attr('src', blobUrl); // 对现有元素也是支持的

    // --------------上面等价于--------------
    // const jsCode = "console.log('hello')";
    // const script = document.createElement('script');
    // script.textContent = jsCode;
    // document.body.appendChild(script);
    // 区别在哪里？🧐
  </script>

  <script type="module">
    var foo = "bar";
    import * as info from "./es.js";
    console.log(info.default);
    info.add();

    // 路径支持的情况
    // 支持
    // import {foo} from 'https://jakearchibald.com/utils/bar.js';
    // import {foo} from '/utils/bar.js';
    // import {foo} from './bar.js';
    // import {foo} from '../bar.js';
    // // 不支持
    // import {foo} from 'bar.js';
    // import {foo} from 'utils/bar.js';

    // export function add () {
    //   console.log('nncz')
    // }
    // export default { foo }
  </script>

  <script>
    console.log(foo);
  </script>

  <script type="module">
    function importCode(code) {
      const blob = new Blob([code], { type: "text/javascript" });
      const script = document.createElement("script");
      document.body.appendChild(script);
      script.setAttribute("type", "module");
      script.src = URL.createObjectURL(blob);
      return import(script.src);
    }
    const code = `
        export function add () {
          console.log('nncz')
        }
        export default {
          foo: 'bar',
        }
      `;
    importCode(code).then(m => {
      console.log(m, m.default); // {foo: 'bar'}
    });
  </script>
</body>
```
