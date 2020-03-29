# service worker

## 桌面站点配置 manifest.json

### display 配置项

- fullscreen 全屏显示 会尽可能将所有的显示区域都占满
- standalone 独立应用模式 这种模式下打开的应用有自己的启动图标 并且不会有浏览器的地址栏。
  因此看起来更像一个 Native App
- minimal-ui 与 standalone 相比，该模式会多出地址栏
- browser 一般来说 会和正常使用浏览器打开样式一致。

## 生命周期

![service-worker's life-circle](https://i.loli.net/2020/03/27/j2SWDehY3MTvlLc.png)

## 更新机制

```js
/**
 * service worker 安装激活
 */
self.version = "v2";
let dataCacheName = "leo-api-" + self.version;
let cacheName = "leo-shell-" + self.version;
let filesToCache = [
  "/",
  "./manifest.json",
  // '/sw.js',
  "/index.html",
  "/detail.html",
  "/script/index.js",
  "/script/detail.js",
  "/style/index.css",
  "/style/fonts/iconfont.css",
  "/style/fonts/iconfont.eot",
  "/style/fonts/iconfont.js",
  "/style/fonts/iconfont.svg",
  "/style/fonts/iconfont.ttf",
  "/style/fonts/iconfont.woff",
  "/assets/images/icons/icon_144x144.png",
  "/assets/images/icons/icon_152x152.png",
  "/assets/images/icons/icon_192x192.png",
  "/assets/images/icons/icon_512x512.png"
];

self.addEventListener("install", function(e) {
  console.log("SW Install");
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log("SW precaching");
      return cache.addAll(filesToCache);
    })
  );
  console.log("skipWaiting");
  self.skipWaiting();
});

self.addEventListener("activate", function(e) {
  console.log("SW Activate");
  // 保证生命周期按顺序执行 接受一个 Promise 对象 resolved 才会继续后面的生命周期
  e.waitUntil(
    caches.keys().then(function(keyList) {
      console.log("keyList", keyList);
      return Promise.all(
        keyList.map(function(key) {
          if (key !== cacheName && key !== dataCacheName) {
            console.log("SW Removing old cache", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  console.log("clients.claim");
  return self.clients.claim();
});

self.addEventListener("fetch", function(e) {
  console.log("SW Fetch", e.request.url);
  // 如果数据相关的请求，需要请求更新缓存
  let dataUrl = "/mockData/";
  if (e.request.url.indexOf(dataUrl) > -1) {
    e.respondWith(
      caches.open(dataCacheName).then(function(cache) {
        return fetch(e.request)
          .then(function(response) {
            cache.put(e.request.url, response.clone());
            return response;
          })
          .catch(function() {
            return caches.match(e.request);
          });
      })
    );
  } else {
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
  }
});
```

## 开发测试
