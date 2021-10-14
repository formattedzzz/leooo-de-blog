# -------------------------生成器跟元组
# 元组跟列表的区别 list [] tuple () 元组的属性无法修改
import sys

def main ():
  # 单层迭代器
  # f = [x for x in range(1, 10)]
  # print(f)

  # 双层迭代器
  f = [x + y for x in 'ABCDE' for y in '1234567']
  print(f, type(f) == list)  # A1 A2 A3 ... E5 E6 E7 True

  # f = [x ** 2 for x in range(1, 1000)]
  # print(sys.getsizeof(f))  # 查看对象占用内存的字节数
  # print(f)
  arr = ('leo', 1, 3, True)
  print('arr is', type(arr) == tuple)  # 函数里的arguments对象就是tuple

  # print(list(arr), tuple(f))  # 列表跟元组的互相转化


# yield关键字生成迭代器
def fib(n):
  a, b = 0, 1
  for _ in range(n):
    a, b = b, a + b
    yield a
print(fib(10), type(fib(10)))
# yield返回一个元素 整个函数返回一个generator迭代器

if __name__ == '__main__':
  main()

# 这里有一个非常值得探讨的问题，我们已经有了列表这种数据结构，为什么还需要元组这样的类型呢？ 一般怎么生成一个元组呢
# 1、简单的说就是一个不变的对象要比可变的对象更加容易维护；另一方面因为没有任何一个线程能够修改不变对象的内部状态
#    一个不变对象自动就是线程安全的，这样就可以省掉处理同步化的开销。一个不变对象可以方便的被共享访问
# 2、元组在创建时间和占用的空间上面都优于列表


def leoset ():
  set1 = {1, 2, 3, 3, 3, 2}
  print(set1)
  print('Length =', len(set1))
  set2 = set(range(1, 10))
  print(set2)
  set1.add(4)
  set1.add(5)
  set2.update({9, 11, 12})
  # set2.update([9, 11, 12]) 也可以传一个列表作为参数
  print(set1)
  print(set2)
  set2.discard(5)
  set2.discard(13)  # 删除不存在的元素也不会报错
  print(set2)

  # remove的元素如果不存在会引发KeyError
  if 4 in set2:
    set2.remove(4)
  print(set2)
  # 遍历集合容器
  for elem in set2:
    print(elem ** 2, end=' ')
  print()

  # 将元组转换成集合
  set3 = set((1, 2, 3, 3, 2, 1))
  print(set3.pop()) 
  print(set3)

  # 集合的交集、并集、差集、对称差运算
  print(set1 & set2)
  # print(set1.intersection(set2))
  print(set1 | set2)
  # print(set1.union(set2))
  print(set1 - set2)
  # print(set1.difference(set2))
  print(set1 ^ set2)
  # print(set1.symmetric_difference(set2))
  # 判断子集和超集
  print(set2 <= set1)
  # print(set2.issubset(set1))
  print(set3 <= set1)
  # print(set3.issubset(set1))
  print(set1 >= set2)
  # print(set1.issuperset(set2))
  print(set1 >= set3)
  # print(set1.issuperset(set3))
leoset()








