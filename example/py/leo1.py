# --------------------------------- 查询编译器信息
import sys
import json
import threading
import random

def main1 ():
  print(sys.version_info, 'leo')

  # --------------------------------- 接受控制台输入
  # a = int(input('a = '))
  # b = int(input('b = '))
  # print('%d + %d = %d' % (a, b, a + b))
  # print('%d - %d = %d' % (a, b, a - b))
  # print('%d * %d = %d' % (a, b, a * b))
  # print('%d / %d = %f' % (a, b, a / b))
  # print('%d // %d = %d' % (a, b, a // b))
  # print('%d %% %d = %d' % (a, b, a % b))
  # print('%d ** %d = %d' % (a, b, a ** b))

  # -------------------------------- 变量定义
  a = 100
  b = 12.345
  c = 1 + 5j
  c2 = 1 - 5j
  d = 'hello, world'
  e = True
  print(type(a))
  print(type(b))
  print(type(c))
  print(type(d))
  print(type(e))
  print(type(type(e)))
  # 输出结果：
  # <class 'int'>
  # <class 'float'>
  # <class 'complex'>
  # <class 'str'>
  # <class 'bool'>
  # <class 'type'>

  print(type(e) == "<class 'bool'>")  # False
  print(type(e) == 'bool')            # False
  print(type(e) == bool)              # Ture
  print(type(c) == complex)           # True

  res = c * c2
  print(res, type(res))  # 共轭复数相乘不是int类型？


  # int()：将一个数值或字符串转换成整数，可以指定进制
  # float()：将一个字符串转换成浮点数
  # str()：将指定的对象转换成字符串形式，可以指定编码
  # chr()：将整数转换成该编码对应的字符串（一个字符）
  # ord()：将字符串（一个字符）转换成对应的编码（整数）

  print(int(10.3), int(10.7))  # 10 10
  # print(int('10.9'))         # 报错
  # print(int('10m'))          # 报错
  print(int('10'))             # 10 注意
  # print("int('10n')=", int('10n'))   # 报错 不合法的参数 并没有NaN的概念
  print(float(10), float(9))   # 10.0 9.0
  print(float('9'))            # 9.0

  print(str(99), str(9.9), type(str(99)))      # '99' '9.9' 
  print(chr(65), chr(66), type(chr(66)))       # 'A' 'B'  一个字符
  print(ord('A'), ord('a'), type(ord('a')))    #  65 97 int数字

def main2 ():
  # ------------------------------------------------语法反刍
  print(type([1, 2, 3]))
  print(type((1, 2, 3)), type((1, 2, 3)) == tuple)
  print(type({'name': 'leo'}), type({'name': 'leo'}) == dict)
  print(type({'name', 'leo'}), type({'name', 'leo'}) == set)
  print(range(10), type(range(10)) == range)

  info = {'name': 'leo'}
  # map 字典转字符串 JSON.stringify
  print(str(info), str(info)[2:6], info.__str__())

  # map 字符串转字典 JSON.parse
  infotxt = {'name': 'leo'}
  print(dict(infotxt), dict(infotxt)['name'])

  liststr = '[1, 2, 34, 5]'
  # list一个字符串相当于 'string'.split('') ==> 变成一个列表 但并不是JSON.stringify的效果
  print(list(liststr))

  list1 = [{'name': 'chenlei'}, 'leoop']
  list2 = list1[:]  # 通过切片可以产生一个浅拷贝的列表 也就是说列表元素不是引用类型的话就没问题哦
  list1[0]['name'] = 'leo'
  list1[1] = 'kkk'
  print(list2[0], list2[1])

  # for v in 'abbcde':
  #   if v != 'a':
  #     print(v)

  str1 = '0123456789'
  print(str1[2::2]) # 2468 下标从2开始 步长为2
  print(str1[2:-2]) # 234567 到倒数第二位（不包括倒数第二位）
  print(str1[:-3])  # 从头取到倒数第三位（不包括倒数第三位）

  # 实现的是字符串到普通python引用对象的相互转化
  res1 = json.dumps({"name": "chenlei"})
  print(res1, type(res1)) # 标准json字符串
  res2 = json.loads('{"haha": 23}')
  print(res2, type(res2)) # 标准字典对象

  res1 = json.dumps(["haha", 23])
  print(res1, type(res1)) # 列表字符串
  res2 = json.loads('["haha", 23]')
  print(res2, type(res2)) # 列表对象

  # 元组的格式同理
  none = (None, True, False)

def func1 ():
    print('Do something')

global name
def main3 ():
  name = 'leooo'
  name2 = 'leoop'
  # 相当于setTimeout()
  threading.Timer(1, func1).start()
  print(name, random.random())
  pass

def main4 ():
  name = 'leooo'
  name2 = 'leoop'
  # 相当于setTimeout()
  # def func ():
  #   print(name + str(random.random()) + name2)
  # return func

  # 直接返回匿名函数
  return lambda: name + str(random.random()) + name
  pass

if __name__ == '__main__':
  func = main4()
  print(func())  # 闭包
  print((lambda x, y: x if x > y else y)(101,102)) # 匿名函数自执行

"""
pass 语句什么也不做 当语法上需要一个语句 但程序需要什么动作也不做时
del 语句 删除变量
python 怎么抛出异常
raise Exception('Invalid Buffer')
断言 assert

python 内置的json包有什么功能？
json.dumps()
json.loads()
这两个直接对接字符串
json.dump()
json.load()
这两个直接对接文件操作

try:
except:
finally:

python 中的定时器好像跟线程有关系？
import threading
threading.timer()
python 中怎么申明全局变量 global 关键字

输出格式化 print('skuid={}&sessionid={}'.format('S02019', 12))

匿名函数写法
func = lambda x, y=2: x / 2 + y ** y
匿名函数自执行
(lambda x, y: x if x > y else y)(101,102)
所以我们可以把匿名函数运用到传一个参数的API中 filter map...
"""