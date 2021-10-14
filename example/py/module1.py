def console ():
  print('hello leo')

# 也不需要申明导出那写东西 全都能访问到？
name = 'leo'

print('引入模块就会执行', __name__) # 引入模块就会执行 module1

if (__name__ == '__main__'):
  print('不是主模块 不会执行')