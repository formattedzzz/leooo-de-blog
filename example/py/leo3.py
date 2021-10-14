# ----------------------------函数

from random import randint
# 传默认参数
def roll_dice(n=2):
  """
  摇色子
  :param n: 色子的个数
  :return: n颗色子点数之和
  """
  total = 0
  for _ in range(n):
      total += randint(1, 6)
  return total

def add(a=0, b=0, c=0):
  return a + b + c

# 如果没有指定参数那么使用默认值摇两颗色子
print(roll_dice())

# -----------------------arguments 这兄弟不好惹啊吧
def add(*args):
  print(args, type(args), type(args) == tuple)  # (1, 2, 3, 4) <class 'tuple'> True
  total = 0
  for val in args:
      total += val
  return total
  
add(1, 2, 3, 4)

# ------------------------模块化
import module1 as m1

m1.console()
print(m1.name, __name__)
# __name__ 种性质相当于 __dirname 通过这个变量 我们可以让 通过模块引用的py文件不执行某些代码

# 函数的作用域也跟js差不多吧







