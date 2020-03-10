# 初识 puppeteer

我们日常使用浏览器的步骤为：启动浏览器、打开一个网页、进行交互。
而无头浏览器指的是我们使用脚本来执行以上过程的浏览器，能模拟真实的浏览器使用场景。

由于业务中偶然有需求用到：
前端请求进来 提取参数 根据参数在`Linux`服务器通过 `puppeteer` 启动浏览器 打开带参数的页面
将该页面截屏 并存取在服务器某个文件夹下 并向前端返回图片的 URL

```js
let express = require("express");
let bodyParser = require("body-parser");
const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

let app = express();
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.all("*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "x-Request-with");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  next();
});

app.get("/report", async function(req, res) {
  let { skuid, sessionid } = req.query;
  if (!skuid || !sessionid) {
    res.json({
      code: 0,
      data: null,
      message: "必要参数不明 截屏失败"
    });
  }
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  const page = await browser.newPage();
  await page.setViewport({
    width: 750,
    height: 1334
  });
  let request_url = `https://ecs.nncz.cn/report/summary/${skuid}/${sessionid}#ping`;
  await page
    .goto(request_url, {
      waitUntil: "domcontentloaded"
    })
    .catch(err => {
      console.log(err);
      res.json({
        code: 0,
        data: null,
        message: "截屏失败"
      });
    });
  try {
    console.log(path.join(__dirname, `./img/${skuid + sessionid}.jpg`));
    await page
      .screenshot({
        path: path.join(__dirname, `./img/${skuid + sessionid}.jpg`),
        fullPage: true,
        // type: 'png',
        encoding: "gbk"
      })
      .catch(err => {
        res.json({
          code: 0,
          data: null,
          message: "截屏失败"
        });
      });
    res.json({
      code: 1,
      data: `https://node.nncz.cn/img/${skuid + sessionid}.jpg`,
      message: "截屏成功"
    });
  } catch (e) {
    res.json({
      code: 0,
      data: null,
      message: "截屏失败"
    });
  } finally {
    await browser.close();
  }
});

app.get("/preview", async function(req, res) {
  let { skuid, sessionid, dev } = req.query;
  if (!skuid || !sessionid) {
    res.json({
      code: 0,
      data: null,
      message: "必要参数不明 截屏失败"
    });
  }
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  const page = await browser.newPage();
  await page.setViewport({
    width: 720,
    height: 1280
  });
  let request_url = `https://ecs${
    Number(dev) === 1 ? "2" : ""
  }.nncz.cn/static/html/tms-preview.html?skuid=${skuid}&sessionid=${sessionid}&mark=${Math.random()
    .toString(36)
    .slice(6)}#screen`;
  await page
    .goto(request_url, {
      waitUntil: "domcontentloaded"
    })
    .catch(err => {
      console.log(err);
      res.json({
        code: 0,
        data: null,
        message: "截屏失败"
      });
    });
  var now = +new Date();
  while (+new Date() - now < 300) {}
  try {
    console.log(path.join(__dirname, `./img/${skuid + sessionid}.jpg`));
    await page
      .screenshot({
        path: path.join(__dirname, `./img/${"view" + skuid + sessionid}.jpg`),
        fullPage: true,
        // type: 'png',
        encoding: "gbk"
      })
      .catch(err => {
        res.json({
          code: 0,
          data: null,
          message: "截屏失败"
        });
      });
    res.json({
      code: 1,
      data: `https://node.nncz.cn/img/${"view" + skuid + sessionid}.jpg`,
      message: "截屏成功" + (Number(dev) === 1 ? "dev" : "prod")
    });
  } catch (e) {
    res.json({
      code: 0,
      data: null,
      message: "截屏失败"
    });
  } finally {
    await browser.close();
  }
});

app.get("/poster", async function(req, res) {
  let { skuid, sessionid, type, dev } = req.query;
  if (!skuid || !sessionid) {
    res.json({
      code: 0,
      data: null,
      message: "必要参数不明 截屏失败"
    });
  }
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  const page = await browser.newPage();
  await page.setViewport({
    width: 750,
    height: 1334
  });
  let request_url = `https://ecs${
    Number(dev) === 1 ? "2" : ""
  }.nncz.cn/static/html/tms-poster.html?skuid=${skuid}&sessionid=${sessionid}&type=${type}`;
  await page
    .goto(request_url, {
      waitUntil: "domcontentloaded"
    })
    .catch(err => {
      console.log(err);
      res.json({
        code: 0,
        data: null,
        message: "截屏失败"
      });
    });
  var now = +new Date();
  while (+new Date() - now < 300) {}
  try {
    await page
      .screenshot({
        path: path.join(__dirname, `./img/${"poster" + skuid + sessionid}.jpg`),
        fullPage: true,
        // type: 'png',
        encoding: "gbk"
      })
      .catch(err => {
        res.json({
          code: 0,
          data: null,
          message: "截屏失败"
        });
      });
    res.json({
      code: 1,
      data: `https://node.nncz.cn/img/${"poster" + skuid + sessionid}.jpg`,
      message: "截屏成功" + (Number(dev) === 1 ? "dev" : "prod")
    });
  } catch (e) {
    res.json({
      code: 0,
      data: null,
      message: "截屏失败"
    });
  } finally {
    await browser.close();
  }
});

app.get("/img/*", function(req, res) {
  let imgurl = path.join(__dirname, req.path);
  // res.set('Content-Type', 'application/octet-stream;charset=utf-8')
  res.set("Content-Type", "image/png; charset=utf-8");
  fs.readFile(imgurl, function(err, data) {
    if (err) {
      res.header("Content-Type", "application/json;charset=utf-8");
      res.status(404).json({
        code: 0,
        message: "404!没有找到相应资源，请检查路径"
      });
    } else {
      res.send(data);
    }
  });
});

app.listen(7003, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`server is runing at http://localhost:7003`);
  }
});
```

- [更多应用](https://github.com/checkly/puppeteer-examples)

## 坑点

`puppeteer`包集成的 chrome 内核兼容性上还是有很多问题 要测试在 Mac 上面跑跟在 Linux 上面跑区别

比如上面需要的截屏功能 贸贸然拿到服务器跑 截屏出来中文字符显示不出来 因为服务器主机往往都没有屏幕
系统没有内置的中文字体 不用 docker 部署的话需要手动安装 见[ISSUE](https://github.com/puppeteer/puppeteer/issues/1473)

装完字体 你又会发现表情（emoji）字符 显示不出来 所以这又得手动安装 见[ISSUE](https://github.com/puppeteer/puppeteer/issues/1096)

另外还应该考虑浏览器的表现行为做处理

```js
await page.goto(request_url, {
  waitUntil: "domcontentloaded"
});
```

如果打开的是前端框架渲染（无数据请求）的页面
`domcontentloaded` 事件往往发生在页面的渲染完成之前 如页面高度还未完全撑开等
