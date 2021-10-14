# ----------------------------基本数据类型
# -----------字符串
def main():
    str1 = 'hello, world!'
    # 通过len函数计算字符串的长度
    print(len(str1))  # 13
    # 获得字符串首字母大写的拷贝
    print(str1.capitalize())  # Hello, world!
    # 获得字符串变大写后的拷贝
    print(str1.upper())  # HELLO, WORLD!
    # 从字符串中查找子串所在位置
    print(str1.find('or'))  # 8
    print(str1.find('shit'))  # -1
    # 与find类似但找不到子串时会引发异常
    # print(str1.index('or'))
    # print(str1.index('shit'))
    # 检查字符串是否以指定的字符串开头
    print(str1.startswith('He'))  # False
    print(str1.startswith('hel'))  # True
    # 检查字符串是否以指定的字符串结尾
    print(str1.endswith('!'))  # True
    # 将字符串以指定的宽度居中并在两侧填充指定的字符
    print(str1.center(50, '*'))
    # 将字符串以指定的宽度靠右放置左侧填充指定的字符
    print(str1.rjust(50, ' '))
    str2 = 'abc123456'
    # 从字符串中取出指定位置的字符(下标运算)
    print(str2[2])  # c
    # 字符串切片(从指定的开始索引到指定的结束索引)
    print(str2[2:5])  # c12
    print(str2[2:])  # c123456
    print(str2[2::2])  # c246
    print(str2[::2])  # ac246
    print(str2[::-1])  # 654321cba
    print(str2[-3:-1])  # 45
    # 检查字符串是否由数字构成
    print(str2.isdigit())  # False
    # 检查字符串是否以字母构成
    print(str2.isalpha())  # False
    # 检查字符串是否以数字和字母构成
    print(str2.isalnum())  # True
    str3 = '  jackfrued@126.com '
    print(str3)
    # 获得字符串修剪左右两侧空格的拷贝
    print(str3.strip())
    print('-----------------------------------')

def main2():
    # 列表 不同类型的值也能放在一起
    list1 = [1, 3, 5, 7, 100, 'd']
    print(list1)
    list2 = ['hello'] * 5
    # 有点像字符串迭代器
    print(list2)
    # 计算列表长度(元素个数)
    print(len(list1))
    # 下标(索引)运算
    print(list1[0])
    print(list1[4])
    # print(list1[5])  # IndexError: list index out of range -1倒数第一个
    print(list1[-1])
    print(list1[-3])
    list1[2] = 300
    print(list1)
    # 添加元素
    list1.append(200)
    list1.insert(1, 400)
    list1 += [1000, 2000]
    print(list1)
    print(len(list1))
    # 删除元素
    list1.remove(3)
    if 1234 in list1:
      list1.remove(1234)
    del list1[0]
    print(list1)
    # 清空列表元素
    list1.clear()
    print(list1)
    # 真的很灵活 [捂脸.jpg]

    fruits = ['grape', 'apple', 'strawberry', 'waxberry']
    fruits += ['pitaya', 'pear', 'mango']

    # 循环遍历列表元素
    for fruit in fruits:
      print(fruit, end='-')
    print('\n')
    # 带上index索引遍历
    for i, v in enumerate(fruits):
      print(i, v)

    # 列表切片
    fruits2 = fruits[1:4]
    print(fruits2)
    # fruit3 = fruits  # 没有复制列表只创建了新的引用
    # 可以通过完整切片操作来复制列表
    fruits3 = fruits[:]
    print(fruits3)
    fruits4 = fruits[-3:-1] # 同理 不包括倒数第一个
    print(fruits4)
    # 可以通过反向切片操作来获得倒转后的列表的拷贝
    fruits5 = fruits[::-1]
    print(fruits5)
    pass


# 列表过滤filter
def main3 ():
  list1 = [1, 2, 3, 4, 5, 5, 6, 7]
  def func (val):
    if int(val) > 3:
      return True
    else:
      return False
  # list2 = list(filter(lambda x: x % 2 == 0, list1))
  list2 = list(filter(func, list1))
  print(list2)
  pass
  
# 列表推导
def main4 ():
  set1 = {x for x in 'abccddejnkmn' if (x not in 'bc') and x is not 'e'}
  list1 = [x for x in 'abccddejnkmn' if (x not in 'bc') and x is not 'e']
  print(set1, list1)
  pass

# 列表改造map
def main5 ():
  list1 = [1, 2, 3, 4, 5, 5, 6, 7]
  def func (val):
    if int(val) > 3:
      return True
    else:
      return False
  # list2 = list(filter(lambda x: x % 2 == 0, list1))
  list2 = list(map(func, list1))
  print(list2)
  pass

if __name__ == '__main__':
  main5()