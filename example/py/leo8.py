# -----------------------面向对象编程 类

class Leo:
  # __init__ 函数相当于构造函数 constructor
  # 每个函数好像都需要注入指向实例的参数 而且this居然还不是关键字
  def __init__ (this, obj):
    this.name = obj['name']

  # __开头的属性为类的私有属性或私有方法 子类或实例是不能访问的
  def console (this):
    print('hi', this.name)

  def __console (this):
    print(this.name)

leo = Leo({'name': 'chenlei'})
print(leo.name)
leo.console()
# leo.__console() # error 
# 但是很奇怪 这样居然可以
leo._Leo__console()
print('leo is', isinstance(leo, Leo))

# class Clock(object):
#     """数字时钟"""
#     def __init__(self, hour=0, minute=0, second=0):
#       """初始化方法
#       :param hour: 时
#       :param minute: 分
#       :param second: 秒
#       """
#       self._hour = hour
#       self._minute = minute
#       self._second = second

#     def run(self):
#       """走字"""
#       self._second += 1
#       if self._second == 60:
#         self._second = 0
#         self._minute += 1
#         if self._minute == 60:
#           self._minute = 0
#           self._hour += 1
#           if self._hour == 24:
#             self._hour = 0

#     def show(self):
#       """显示时间"""
#       return '%02d:%02d:%02d' % \
#         (self._hour, self._minute, self._second)

# def main():
#   clock = Clock(23, 59, 58)
#   while True:
#     print(clock.show())
#     # sleep(1)
#     clock.run()

# if __name__ == '__main__':
#   main()