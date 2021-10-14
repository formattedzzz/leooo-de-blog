# -------------------------字典 map 也就是es6中的map
import os
import time

def main ():
  string = 'pop'
  obj = {
    'name': 'leo',
    '哈哈': 24,
    23: 'name',
    string: '陈蕾',
    # 'list': [1, 2, ('kkk'), {'name': 'leo'}]
  }
  # 这个自由度就比较大了啊
  print(obj)

  # 遍历obj
  for key in obj:
    print(key, ': ', obj[key])
  # 还可以这样 
  # for k, v in obj.items():
  #   print(k, ' : ', v)

  # 判断属性
  if 'name' in obj:
    print(obj['name'])
  
  # 更新值
  obj['name'] = 'npm'
  obj.update(name='cnpm')
  

  # 取值还可以
  print(obj.get('name'))
  # 如果取不到可以加一个默认值
  print(obj.get('_pop', 'chenlei')[0])
  print(obj)
  print(obj.keys(), obj.values(), type(obj.keys()))
  for x in obj.keys():
    print(x)


  # content = '北京欢迎你为你开天辟地.......'
  # print(content)
  # time.sleep(2)
  # os.system('clear')  # 清理屏幕上的输出
  # print(content)

  # while True:
  #   os.system('clear')  # os.system('clear')
  #   print(content)
  #   # 休眠200毫秒
  #   time.sleep(0.2)
  #   content = content[1:] + content[0]

if __name__ == '__main__':
  main()

def get_suffix(filename, has_dot=False):
    """
    获取文件名的后缀名
    :param filename: 文件名
    :param has_dot: 返回的后缀名是否需要带点
    :return: 文件的后缀名
    """
    
    pos = filename.rfind('.')
    print(pos, filename.find('.'))
    if 0 < pos < len(filename) - 1:
      index = pos if has_dot else pos + 1
      return filename[index:]
    else:
      return ''

print(get_suffix('123.min.js'))


