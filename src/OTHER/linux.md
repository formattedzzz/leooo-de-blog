# linux 基操笔记

## vim 操作（命令模式）

- **`dd`** 删除一行
- **`u`** 撤销操作
- **`^ + r`** 对撤销的撤销
- **`i`** 光标之前
- **`a`** 光标之后
- **`o`** 光标新建下一行开始输入
- **`O`** 光标新建上一行开始输入
- **`ZZ`** 保存退出
- **`G`** 定位到最末尾 （一般我们用触摸板滑动就 OK 了）
- **`gg`** 定位到最开始
- **`^`** 定位到当前行首（跟正则一样）
- **`\$`** 定位到当前行尾
- **`:set number`** 显示行号
- **`33G :33`** 定位到第 33 行
- **`v`** 从当前光标开始选中
- **`d`** 剪切 **y** 复制
- **`yy`** 复制当前行
- **`p`** 粘帖
- **`:set ruler`** 打开标尺
  - H 移至视窗的第一行
  - M 移至视窗的中间那行
  - L 移至视窗的最后一行
- **`/leooo`** 简单搜索 leooo 这个单词 n N 切换下一个上一个
- **`:set hlsearch`** 如果搜索结果没有高亮的可以设置一下
- 当前行搜索 foo 替换为 bar
- **`:s/foo/bar/g`**
  全文搜索 foo 替换为 bar
- **`:%s/foo/bar/g`**
  当然还有当前选区 搜索 foo 替换为 bar

## 修复环境变量引起的命令行崩溃

```sh
export PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin:/root/bin
```

## sudo apt-get 安装应用

sudo adduser leo -> 设置密码 -> 确认密码 -> 其他信息 添加新用户
leo 与 ubuntu 并列在/home 文件夹下

## 环境变量

mac 环境变量

```sh
vim ~/.bash_profile
# 这个是针对用户的

source ~/.bash_profile
# 重载环境变量
```

配置 go 环境的全局变量 /etc/profile

## 目录、文件

- **`/`** 主机根目录
- **`~`** 登录用户根目录
- 创建文件：

  **`touch a.txt`**

- 创建文件夹：

  **`mkdir NewFolder`**

- 删除文件：

  **`rm a.txt`**

- 删除空文件夹：

  **`rmdir NewFolder`**

- 删除文件夹的内容包括文件夹

  ```sh
  rm -rf filename
  # -r 是循环的意思 f 是强制、不询问的意思
  ```

- 删除文件夹的内容不包括文件夹

  ```sh
  rm -rf filename/*
  #后面加上 /* 表示删除内容不删除文件夹
  ```

- 移动文件夹

  ```sh
  mv folder /etc/tmp ./folder2
  # 或者 folder2 相对路径和绝对路径均可
  ```

- 列出所有文件及文件夹

  ```sh
  ls /etc
  ```

- 复制文件

  ```sh
  cp /test.txt testcopy.txt
  ```

  将主机根目录下的 test.txt 复制到当前目录下并命名为 testcopy.txt

- 将文件夹压缩为 zip：

  ```sh
  tar -zcv -f report.zip img
  ```

  report.zip 输出文件夹的内容 img 文件夹名称（路径）

- 删除文件里面的内容 但是不要删除文件

  ```sh
  > filename
  # 如 > access.log
  # 或者 cat /dev/null > filename
  ```

- 删除某文件夹下 30 天以前的文件【不包括文件夹】

  ```bash
  sudo find /var/log/ -type f -mtime +30 -exec rm -f {}
  ```

## 盘符

`Df` 命令是 `linux` 系统以磁盘分区为单位查看文件系统，可以加上参数查看磁盘剩余空间信息，命令格式：

```sh
df -hl
```

查看当前所在文件夹（包括所有文件 所以速度比较慢）大小

```sh
du -sh
```

查看每个文件(看不了文件夹)的大小 **ls -hl**

## bash 历史

```sh
cat ~/.bash_history
# 查看当前用户最近都做了哪些 bash 命令
```

```sh
ping -c 4 cloud.tencent.com
# 发送四个 ping 包 测试是否联通
```

## 端口

```sh
netstat -lt
# 列出所有处于监听状态的 tcp 端口

netstat -tulpn
# 查看所有的端口信息, 包括 PID 和进程名称

netstat -nap | grep mysql
# 或者 pgrep mysqld
# 查看某个应用的
```

mac 下查看端口号并删除

```sh
sudo lsof -i :9001
# 找到该端口的进程pid
sudo kill -9 pid
# 杀死该进程
```

mac 改 host 映射

cmd+shift+G

搜索 /private/etc/hosts

## sudo

```sh
sudo su
# 切换到超级权限
su ubuntu (username)
# 切回普通用户

systemctl stop firewalld.service
# 关闭防火墙
```

## nginx

```sh
cat /var/log/nginx/access.log
# 查看访问日志

cat /var/log/nginx/error.log
# 启动错误日志

service nginx reload
# 改了配置需要重载

nginx -t
# 检查配置是否可行

stat access.log
# 查看文件的具体信息

/var/log/nginx
# ningx 日志存放目录 nginx 的日志会定时清理的 非常干净
```

## 统计文件行数

```sh
find . -type f -exec wc -l {} +
# 统计文件行数

find . -type f -name '\*.go' -exec wc -l {} +
# .go文件行数

find . -name "_.go" -o -name "_.tpl" | xargs wc -l
# .go + .tpl文件行数
```

## npm

```sh
npm root -g
# 通过命令查看安装全局的 npm 包目录
# /usr/local/lib/node_modules
```

本地更新版本号

```sh
npm version patch
# 比如我想来个 1.0.1 版本 是最后一位修改了增 1

npm version minor
# 比如我想来个 1.1.0 版本 是第二位修改了增 1

npm version major
# 比如我想来个 2.0.0 版本 是第一位修改了增 1

npm publish --access=public
# 修改远端的版本 提交到远端 npm 中

npm unpublish @leooo/leoui --force
# 删除 npm 远程的包(好像只有 24 小时内可行)
```

## pm2

pm2 基本命令

```sh
pm2 start app.js
pm2 list
pms stop 0
pm2 restart all
```

## 文件传输 scp

```sh
scp /Users/mac/Desktop/test-video.mp4 ubuntu@134.175.168.18:/home/ubuntu/account-server/upload/video
# ubuntu 系统下复制文件到 Mac 本地电脑上

scp ubuntu@134.175.168.18:/home/ubuntu/account-server/upload/video/R-PvhOqCjri37gHhyPTt5bY7.mp4 /Users/mac/Desktop/

scp ubuntu@134.175.168.18:/home/ubuntu/account.sql /Users/mac/Desktop/

# scp /Users/mac/Desktop/ ubuntu@134.175.168.18:/home/ubuntu/

# scp ubuntu@134.175.168.18:/home/ubuntu/ /Users/mac/Desktop/

# 不能传文件夹 需要压缩 unzip weui.zip
```

## flutter

```sh
flutter -h

flutter upgrade
# flutter 升级

flutter channel
# 查看flutter sdk 分支
flutter channel beta
# 切换flutter sdk 分支

flutter doctor
# 检查 flutter 环境

# 安装 flutter
# 安装 andriod studio
# 安装 andriod sdk
# 安装 dart flutter 插件
# 配置环境变量

flutter doctor --android-licenses
# 一直 OK 下去
# 一定要配置好环境变量 不然 flutter doctor 检测不到
```

## 本机的环境配置

```conf
export PATH=${PATH}:/usr/local/mysql/bin
export PATH=${PATH}:/Users/mac/Documents/flutter/bin
export PATH=${PATH}:/Users/mac/Documents/android-sdk-macosx
export PATH=${PATH}:/Users/mac/Documents/android-sdk-macosx/platform-tools
export PUB_HOSTED_URL=https://pub.flutter-io.cn
export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn

GOROOT=/usr/local/Cellar/go/1.11.2/libexec
export GOROOT
export GOPATH=/Users/mac/Desktop/GO
export GOBIN=$GOPATH/bin
export PATH=$PATH:$GOBIN:$GOROOT/bin
```

## yarn

| npm                              | yarn                      |
| -------------------------------- | ------------------------- |
| npm init                         | yarn init                 |
| npm install                      | yarn                      |
| npm install xxx@1.1.1 -g         | yarn global add xxx@1.1.1 |
| npm install xxx@1.1.1 --save     | yarn add xxx@1.1.1        |
| npm install xxx@1.1.1 --save-dev | yarn add xxx@1.1.1 --dev  |
| npm uninstall xxx --save(-dev)   | yarn remove xxx           |
| npm run xxx                      | yarn run xxx              |
|                                  |                           |

```sh
yran config list
# yarn config v1.21.1
# info yarn config
# {
#   'version-tag-prefix': 'v',
#   'version-git-tag': true,
#   'version-commit-hooks': true,
#   'version-git-sign': false,
#   'version-git-message': 'v%s',
#   'init-version': '1.0.0',
#   'init-license': 'MIT',
#   'save-prefix': '^',
#   'bin-links': true,
#   'ignore-scripts': false,
#   'ignore-optional': false,
#   registry: 'https://registry.yarnpkg.com',
#   'strict-ssl': true,
#   'user-agent': 'yarn/1.21.1 npm/? node/v12.13.0 darwin x64',
#   lastUpdateCheck: 1584501887585
# }
```

## Bash 开光

```sh
chmod +x post-update
```

## 查看操作历史

```sh
cat ~/.bash_history
# 查看 ubuntu 系统操作命令历史
cat ~/.mysql_history
# 查看 mysql 操作命令历史
```

## ssh 设置免密登陆

```sh
ssh-copy-id -i id_rsa.pub ubuntu@134.175.168.18
# 输入密码 回车 OK
```

设置配置文件 在.ssh 文件下新建配置文件 config

```conf
Host    leo
HostName        134.175.168.18
User    ubuntu
IdentityFile ~/.ssh/id_rsa
Port    22
```

下次我们只需要在终端 ssh leo 就可以登录我们的服务器啦

## 启动服务

Linux 下的大多数服务都被设置为守护进程（驻留在系统后台运行，但不会因为服务还在运行而导致 Linux 无法停止运行）

所以我们安装的服务通常名字后面都有一个字母`d`，它是英文单词`daemon`的缩写

例如：防火墙服务叫 firewalld，我们之前安装的 MySQL 服务叫 mysqld，Apache 服务器叫 httpd 等。

在安装好服务之后，可以使用`systemctl`命令或`service`命令来完成对服务的启动、停止等操作，具体操作如下所示

```sh
systemctl start firewalld
# 启动防火墙服务

systemctl stop firewalld
# 终止防火墙服务

systemctl restart firewalld
# 重启防火墙服务

systemctl status firewalld
# 查看防火墙服务状态
```

## 查看进程 ps 进程树 pstree

## 杀死进程

## 安全文件传输 sftp

## 计划任务列表

## redis

安装 下载安装包 解压到 `usr/local/` 目录

然后 sudo make test sudo make install 即可 redis-server 启动成功

新建三个文件夹 etc bin db 然后 cp src 下面的三个文件到 bin cp redis.conf 到 etc

修改 etc/redis.conf 设置密码 db 路径

查看 redis 是否在运行

```sh
ps aux | grep redis
```

## 查看云主机 cup 信息

```sh
cat /proc/cpuinfo | grep name | cut -f2 -d: | uniq -c
```

## apt get

```sh
apt list --installed
# 列出所有已安装的包
```

安装位置

​ A、下载的软件的存放位置：/var/cache/apt/archives

​ B、安装后软件的默认位置：/usr/share

​ C、可执行文件位置：/usr/bin

​ D、配置文件位置：/etc

​ E、lib 文件位置：/usr/lib

## 查看 ubuntu 系统版本

```sh
cat /etc/issue
cat /proc/version
```

## ubuntu 安装 docker

```sh
sudo apt-get update
# 更新 apt 包索引

sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common
# 安装以下包以使 apt 可以通过 HTTPS 使用存储库（repository）

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
# 添加 Docker 官方的 GPG 密钥

sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu \$(lsb_release -cs) stable"
# 使用下面的命令来设置stable存储库

sudo apt-get install -y docker-ce
# 安装最新版本的 Docker CE

systemctl status docker
# 查看 docker 服务是否启动

sudo systemctl start docker
# 手动启动

sudo docker run hello-world
# 运行一个镜像
```

## MacOs 快速查看本地 IP

```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
```

## homebrew

homebrew 更新

```bash
sudo brew update
```

查看已安装的所有包

```bash
brew list
```

查看任意包信息

```shell
brew info <packagename>
```

安装包卸载包

```shell
brew install || uninstall <packagename>
```

## 遇到不明的文件权限问题

taro init 项目之后 发现源码目录编辑之后均不可保存 需要获取最高权限 输入开机密码

进入项目根目录 修改读写权限 执行

```sh
sudo chmod -R 777 ./
```

## ubuntu 主机重启

```sh
sudo shutdown -r now
```

## 设置 nginx、mysql 等服务自动重启

```sh
sudo vim /etc/rc.local
```

后面追加

```conf
service mysqld start      # 用来重启mysql
/etc/init.d/nginx start   # 用来重启nginx
```

## systemctl

```sh
systemctl disable nginx.service
# 关闭开机自启

systemctl enable nginx.service
# 开启开机自启

systemctl status nginx.service
# 查看状态

systemctl restart nginx.service
# 重启服务

systemctl list-units --type=service
# 查看所有服务
```

## 命令别名

```js
alias jin="cd go/src/nntms"
```

## 新增 ssh-key 并复制到剪贴板

```sh
# 生成
ssh-keygen -t rsa -C "614791110@qq.com" -b 4096

# 复制
pbcopy < ~/.ssh/id_rsa.pub
```

## ubuntu 控制、查看进程

```sh
top
# linux自带的命令

htop
# top 的升级版 需要自己安装 sudo apt-get install htop

ps -A | less
# 或者 ps -A | mysqld 查看某一应用的进程

pstree

kill id
# 或者 kill -9 id 杀死顽固进程

pgrep nginx
# 查看的某一应用的 pid (进程 ID)

pkill mysql
# 根据应用名称杀死进程
```

## GO 环境

```bash
brew install go

# 环境变量
GOROOT=/usr/local/Cellar/go/1.13.4/libexec
export GOROOT
export GOPATH=/Users/liufulin/Desktop/GO
export GOBIN=$GOPATH/bin
export PATH=$PATH:$GOBIN:$GOROOT/bin
export GOPROXY="https://proxy.golang.org"

#GOROOT： go安装目录
#GOPATH：go工作目录,作为编译后二进制的存放目的地和import包时的搜索路径。其实说通俗点就是你的go项目工作目录。通常情况下GOPATH包含三个目录：bin、pkg、src。
#GOBIN：go可执行文件目录
#PATH：将go可执行文件加入PATH中，使GO命令与我们编写的GO应用可以全局调用
#GOPROXY 这个是用来下载官方提示插件的

go env
#检查一下
```

## vscode 安装 go 插件

## macOS 下升级 curl 到最新

为了覆盖系统自带的 `curl` 命令

`～/` 下新建 `.zshrc` 文件

```conf
export LDFLAGS="-L/usr/local/opt/curl/lib"
export CPPFLAGS="-I/usr/local/opt/curl/include"
export PATH="/usr/local/opt/curl/bin:$PATH"
```

```sh
source .zshrc
which curl
```

## GOland 使用

```bash
#格式化代码
option + command + l
```

## docker 安装 `macOS`

```bash
# 查看已安装的镜像
docker image ls

# 以别名的形式开启一个名为webserver的容器 并运行nginx镜像
docker run -d -p 80:80 --name webserver nginx

# 查看在运行中的容器
docker container ls -a
或 docker ps

# 停止改容器
docker container stop webserver

# 移除该容器（先停止运行再移除）
docker container rm webserver

# 从本地删除镜像
docker image rm nginx

docker image ls

# docker镜像的存储位置
/Users/{YourUserName}/Library/Containers
```

Docker for Mac 安装包包含了 Docker Engine、 Docker 命令行客户端, Docker Compose、Docker Machine 和 Kitematic
