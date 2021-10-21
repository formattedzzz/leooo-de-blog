# sed简明用法

sed 命令在构建常用脚本中无非就是两种场景：

- 从文件获得内容作为标准输出或作为管道输入
- 从现有文件得到改造后的文件

```sh
 # 得到[1,5]的内容 1,5代表范围 p代表操作 -n 表屏蔽默认的逐行输出
sed -n '1,5p' leo.txt

# 用正则来指定输出范围
sed -n '/IP/,/sed/p' leo.txt

# 第4行后面插入两行固定内容
sed -n '4a \
append something after 4th line \
append something again' leo.txt

# 将4-8行内容写入res.txt
sed -n '4,8w res.txt' leo.txt

# 将add.txt 写入到leo.txt第四行的后面
sed '4r add.txt' leo.txt

# 删除第四到第八行
sed '4,8d' leo.txt

# '表达范围s/表达匹配/要替换成的内容/g'
sed '4,8s/localhost/127.0.0.1/g'
```

以上的所有操作都不会影响源文件 只会得到标准输出

```sh
# 链式操作得到衍生文件
sed -e '4,8d' -e '4,8s/localhost/127.0.0.1/g' >new.txt

# 直接修改源文件
sed -i 's/before/afetr/g' leo.txt

# 源文件先备份为源文件.bak 然后生成目标文件
sed -i.bak 's/before/afetr/g' leo.txt
```
