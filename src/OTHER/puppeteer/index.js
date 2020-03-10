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
