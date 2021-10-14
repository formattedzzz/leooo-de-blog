# ---------------------------运算符

str1 = 'qwe'
print(str1[0])      # q
print(str1[:0])     # ''
print('qwe'[0])     # q
print(('qwe')[0])   # q

print(8 // 3, 8 / 3)

# is is not
print('**:', 4 ** 2)                          # 16
print('is for val:', str1 is 'qwe')           # True
print('is for type:', type(str1) is str)      # True
print('== for type:', type(str1) == str)      # True
print('== for type:', not type(str1) == str)  # False

import math
print('pi = %s : %f : %d : %d : %x' % ('math.pi', math.pi, 12, 0xF, 16))
# pi = math.pi : 3.141593 : 12 : 15 : 10 
# 输出格式化 输出什么类型的值 进制转化之类的

# in not in   成员运算符
# not or and  布尔运算符

# x = float(input('x = '))
# if (x > 1):
#     y = 3 * x - 5
# elif (x >= -1):
#     y = x + 2
# else:
#     y = 5 * x + 3
# print('f(%.2f) = %.2f' % (x, y))
# %.2f 输出为浮点数且保留两位


# if else 语句
# salary = float(input('本月收入: '))
# insurance = float(input('五险一金: '))
# diff = salary - insurance - 3500
# if diff <= 0:
#     rate = 0
#     deduction = 0
# elif diff < 1500:
#     rate = 0.03
#     deduction = 0
# elif diff < 4500:
#     rate = 0.1
#     deduction = 105
# elif diff < 9000:
#     rate = 0.2
#     deduction = 555
# elif diff < 35000:
#     rate = 0.25
#     deduction = 1005
# elif diff < 55000:
#     rate = 0.3
#     deduction = 2755
# elif diff < 80000:
#     rate = 0.35
#     deduction = 5505
# else:
#     rate = 0.45
#     deduction = 13505
# tax = abs(diff * rate - deduction)
# print('个人所得税: ￥%.2f元' % tax)
# print('实际到手收入: ￥%.2f元' % (diff + 3500 - tax))


# --------------------for in循环语句

sumval = 0

# range可以用来产生一个不变的数值序列 循环语句通过缩进来表达
# for x in range(1, 4):
#   sumval += x
# print(sumval)

# 当然也可以写在同一行来表达
# for x in range(0, 102, 10): print(x); sumval += x;
# print(sumval)

# range(start, end, step)  从start开始 不包括end 步长step(可为负数)

# x = int(input('x = '))
# y = int(input('y = '))
# if x > y :
#     x, y = y, x # 交换值有点像解构赋值
# print(x, y)
# for factor in range(x, 0, -1):
#     if x % factor == 0 and y % factor == 0:
#         print('%d和%d的最大公约数是%d' % (x, y, factor))
#         print('%d和%d的最小公倍数是%d' % (x, y, x * y // factor))
#         break

# row = int(input('请输入行数: '))
# for i in range(row):
#     for _ in range(i + 1):
#         print('*', end='')
#     print()

# for i in range(row):
#     for j in range(row):
#         if j < row - i - 1:
#             print(' ', end='')
#         else:
#             print('*', end='')
#     print()

# for i in range(row):
#     for _ in range(row - i - 1):
#         print(' ', end='')
#     for _ in range(2 * i + 1):
#         print('*', end='')
#     print()

# 默认从零开始
# for _ in range(7):
#   print(_)





