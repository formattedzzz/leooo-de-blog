# shell 脚本

## 脚本开光

```sh
# u 所有者 +x 增加可执行权限
chmod u+x leo.sh
# - 表示去除权限

# u 所有者
# g 同一群组的（不常用）
# o 外人
# a 所有人
# User Group Other All

# + 增加
# - 去除

# x 可执行(1)
# w 可写(2)
# r 可读(4)

chmod 777 ./shell.sh
# 这条命令就是这么来的 三个7依次代表 u、g、o 每个7代表 x+w+r
# 故也等价于
chmod a=rwx ./shell.sh

# 通法
chmod ug+w,o-w leo.sh bob.sh
```

## 最高权限

chmod 777 leo.sh

## source 执行

使用 source 执行 shell 脚本时, 不会创建子进程, 而是在父进程中直接执行!

## 变量

- Shell 中的变量只有字符串这一种类型

- Shell 中变量名与变量值没有长度限制

- Shell 的变量也允许比较操作和整数操作, 只要变量中的字符串为数字

```shell
#!/bin/sh
# 申明脚本解释器 一般类linux系统有bash sh Macos 上有更多
name="leooo"
age=22
# 变量命名 = 两边不能有空格 可以重新赋值
# 变量使用 $name ${name} 通过{}来作为边界线识别
echo "the name is $name and ${age}is age"
```

- 单双引号

  单引号里的任何字符都会原样输出，单引号字符串中的变量是无效的
  单引号字串中不能出现单引号（对单引号使用转义符后也不行）

- 字符串拼接

- 字符串长度

```shell
info="leoo p"
echo ${#info}  # 6
```

- 字符串截取

  ```shell
  string="hello my world"
  echo ${string:2:4}  #输出：llo
  # 参数 start len
  ```

- 循环

```shell
for ((i = 0; i < 5; i++)); do # i = 0 = 两边可以有空格
echo "number $i"
done
```

## 循环遍历某文件夹下的所有文件及文件及名称

```shell
for file in "ls /Users/mac/Desktop/"; do
  echo $file
done
```

## 条件判断

```shell
func1 () {
  local num=123
  #局部变量
  echo "$num"
  if [ $num = "222" ]
  then
    echo "if"
  elif [ $num = 333 ]
  then
    echo "else if"
  else
    echo "else"
  fi
}
func1
#直接执行
```

## 最简单的脚本传参

```shell
echo "脚本参数\$0: $0"
echo "第一个参数\$1: $1"
echo "第二个参数\$2: $2"
```

## 利用子进程来执行一个脚本

```js
let { execFile } = require('child_process')
execFile(
  `${__dirname}/shell.sh`,
  ['--dev', '--version'],
  (error, stdout, stderr) => {
    if (error) {
      throw error
    }
    console.log(stdout)
  }
)
```

## 函数传参数及返回值

```shell
leo="leooo"
add () {
    let "sum=$1+$2"
    echo "$3 --- $4"
    echo "\$leo $leo"
    echo "\${leo} ${leo}"
    return $sum
}
add 4 5 ${leo} $leo
# $?指add函数的返回值
echo "sum=$?"
```

## 捋一捋 shell 中的各种括号

```shell
#小括号

#中括号

#大括号

#双小括号

#双中括号

#双大括号
```

## set -e 是什么作用

- 当命令的返回值为非零状态时，则立即退出脚本的执行

- 作用范围只限于脚本执行的当前进行 **不作用于其创建的子进程** 所以根据上面提到的 在父脚本中 通过 source 命令启动子脚本时**例外**

- 如果返回值为非零时 那么该函数里面的 log 不会输出 所以最好通过判断调用**exit**语句退出好

## 获取当前工作目录的绝对路径及文件夹名称

```sh
project_path=$(
  cd $(dirname $0)
  pwd
)
project_name="${project_path##*/}"
echo $project_path
echo $project_name
```

## find、grep

```sh
find .
#打印当前目录下所有的文件目录列表
find . -name "*.js"
#打印当前目录所有以.js结尾的文件
find . ! -name "*.js"
#打印当前目录所有不以.js结尾的文件
find . \( -name "*.pdf" -or -name "*.txt" \)
#打印当前目录下所有以.txt或.pdf为结尾的文件名
```
