# -----------------------面向对象编程进阶
class Person(object):
   # 限定Person对象只能绑定_name, _age和_gender属性
  # __slots__ = ('_name', '_age', '_gender')
  def __init__(self, name, age):
    self._name = name
    self._age = age
    self.leo = 'lei'

  # 访问器 - getter方法
  @property
  def name(self):
    return self._name

  # 访问器 - getter方法
  @property
  def age(self):
    return self._age

  # 修改器 - setter方法 跟装饰器的有关系吗？
  @age.setter
  def age(self, age):
    self._age = age

  def play(self):
    if self._age <= 16:
      print('%s正在玩飞行棋.' % self._name)
    else:
      print('%s正在玩斗地主.' % self._name)

  # 类静态方法修饰器 跟js static关键字是一样的 通过类本身来调用
  @staticmethod
  def leo ():
    print('leo-static')

def main():
  person = Person('王大锤', 12)
  person.play()
  person.age = 22
  person.play()
  # person.name = '白元芳'  # AttributeError: can't set attribute


if __name__ == '__main__':
  main()