#!/Users/mac/miniconda3/bin/python
# -----------------------面向对象编程继承 总的来说还是非常简单的

# 子类在继承了父类的方法后，可以对父类已有的方法给出新的实现版本，这个动作称之为方法重写（override）

# 抽象类 不能用来实例话 专门用来继承 需要导入内部修饰器
from abc import ABCMeta, abstractmethod
class Pet(object, metaclass=ABCMeta):
  """宠物"""
  def __init__(self, nickname):
    self._nickname = nickname
  @abstractmethod
  def make_voice(self):
    """发出声音"""
    print(self._nickname)
    pass
# Pet('cat').make_voice() # TypeError: Can't instantiate abstract class Pet with abstract methods make_voice


class Person(object):
  # 限定Person对象只能绑定_name, _age和_gender属性
  # __slots__ = ('_name', '_age', '_gender')
  def __init__(self, name, age):
    self._name = name
    self._age = age

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
    # 这是注释
    '''
    多行注释
    '''
    if self._age <= 16:
      print('%s正在玩飞行棋.' % self._name)
    else:
      print('%s正在玩斗地主.' % self._name)
    '''
    末尾的呢
    '''

  # 类静态方法修饰器 跟js static关键字是一样的 通过类本身来调用
  @staticmethod
  def leo ():
    print('leo-static')
  pass

class Student(Person):
  def __init__ (self, name, age, info):
    super().__init__(name, age)
    self.info = info
  def __str__ (self):
    print(self.info)
  def __repr__ ():
    print(str(self.info))

class Poker (object):
  def __init__ (self):
    self.cate = '♠♥♣♦'
    pass

def main():
  person = Person('王大锤', 12)
  person.play()
  person.age = 22
  person.play()
  student = Student('陈蕾', 24, {'job': 'tech'})
  student.play()
  print(student.info, person.play.__doc__)
  # 函数的__doc__属性 输出在函数里开头（末尾的不行）的多行注释
  # person.name = '白元芳'  # AttributeError: can't set attribute

if __name__ == '__main__':
  main()