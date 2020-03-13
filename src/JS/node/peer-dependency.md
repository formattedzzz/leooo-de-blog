# 浅谈 npm 依赖模型

## 一些 npm 操作

```sh
# 查看某个包
npm view @leooo/leoui

# 查看某个当前版本
npm view @leooo/leoui version

# 查看某个包
npm view @leooo/leoui versions

# 查看项目包依赖模型（慎）
npm ls
```

## 版本号

```json
{
  "dependencies": {
    "signale": "1.4.0",
    // 固定版本号
    "figlet": "*",
    // 任意版本（>=0.0.0）
    "react": "16.x",
    // 匹配主要版本（>=16.0.0 <17.0.0）
    "table": "~5.4.6",
    // 安装到 x.y.z 中 z 的最新的版本
    "yargs": "^14.0.0"
    // 安装到 x.y.z 中 y 和 z 都为最新版本
  }
}
```

## 各种依赖

- dependencies

  生产依赖。 比如 `antd` 依赖了 `moment` 安装了 `antd` 也会安装 `moment` 并且可以直接在业务中引用(>=npm3.x)

- devDependencies

  开发环境依赖。

- peerDependencies

  对等依赖。 比如 `react` `react-dom` 是 `antd` 的对等依赖。

  如果安装了 `antd` `npm` 会检查你在项目中有没有安装 合格版本的对等依赖

  如果没有就会报警告 (在 `npm2` 时代会协同安装)

## node_modules 依赖模型

### 嵌套模型

假设项目依赖如下：

```json
{
  "name": "my-project",
  "dependencies": {
    "buffer": "^5.4.3",
    "ignore": "^5.1.4"
  }
}
```

`ignore` 包是纯 js 库 无外部依赖

而`buffer` 包的依赖

```json
{
  "name": "buffer",
  "dependencies": {
    "base64-js": "^1.0.2",
    "ieee754": "^1.1.4"
  }
}
```

在`npm2.x`时 npm 会一直嵌套安装下去 装完之后 `node_modules` 下就两个文件夹

```txt
node_modules
--buffer
--ignore
```

如果依赖一多 `node_modules` 将层层嵌套且变得非常大 如果 pkgA 跟 pkgB 相互依赖那岂不是要一直装下去？

### 扁平模型

到了 `npm3.x` 其将早期的嵌套结构改为扁平结构 安装模块时 不管其是直接依赖还是子依赖的依赖 优先将其安装在 `node_modules` 根目录

这时候如果项目中又加一个依赖 `base64-js` 那么 npm 再在 `node_modules` 中检查已安装 `base64-js` 版本是否符合要求 符合就跳过

这就造成了 不同版本的依赖先后顺序会造成不同的`node_modules`结构

开发系统应用时 建议把 `package-lock.json` 文件提交到代码版本仓库 从而保证所有团队开发者以及 CI 环节可以在执行 npm install 时安装的依赖版本都是一致的。
在开发一个 npm 包 时 你的 npm 包 是需要被其他仓库依赖的 由于上面我们讲到的扁平安装机制 如果你锁定了依赖包版本 你的依赖包就不能和其他依赖包共享同一 `semver` 范围内的依赖包 这样会造成不必要的冗余。所以我们不应该把 `package-lock.json` 文件发布出去（ npm 默认也不会把 `package-lock.json` 文件发布出去）

## npm 缓存

`npm5.x` 之后有了缓存策略
查看缓存存取目录

```sh
npm config get cache
```

![npm-cache](https://i.loli.net/2020/03/13/lfBXDV41eMFuh5N.png)

清除缓存

```sh
npm cache clean
```

## 初始化安装的 node_modules 的原理

- 从 npm 远程仓库获取包信息
- 根据 `package.json` 构建依赖树 构建过程：

  构建依赖树时 不管其是直接依赖还是子依赖的依赖 优先将其放置在 `node_modules` 根目录。

  当遇到相同模块时 判断已放置在依赖树的模块版本是否符合新模块的版本范围 如果符合则跳过 不符合则在当前模块的 `node_modules` 下放置该模块。

  注意这一步只是确定逻辑上的依赖树 并非真正的安装 后面会根据这个依赖结构去下载或拿到缓存中的依赖包

- 在缓存中依次查找依赖树中的每个包

  - 不存在缓存：从 npm 远程仓库下载包 校验包的完整性

    校验不通过： 重新下载

    校验通过： 将下载的包复制到 npm 缓存目录 将下载的包按照依赖结构解压到 `node_modules`

  - 存在缓存：将缓存按照依赖结构解压到 `node_modules`

- 将包解压到 `node_modules`
- 生成 `lock` 文件
