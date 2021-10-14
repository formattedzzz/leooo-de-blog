#!/Users/mac/miniconda3/bin/python
import json
import time
from math import sqrt
import requests
"""
'r': 只读read
'w': 写入（会先清空之前的内容）没有该文件则创建文件
'x': 写入 如果文件已经存在会产生异常 相当于新建文件
'a': 追加 append 在r的基础上
'b': 二进制blob 组合 rb 读取二进制文件 wb写入二进制文件 type(二进制数据) <class 'bytes'>
't': 文本模式（默认）
'+': 更新

dump - 将Python对象按照JSON格式序列化到文件中
dumps - 将Python对象处理成JSON格式的字符串
load - 将文件中的JSON数据反序列化成对象
loads - 将字符串的内容反序列化成Python对象

"""

def is_prime(n):
    """判断素数的函数"""
    assert n > 0  # 断言
    for factor in range(2, int(sqrt(n)) + 1):
        if n % factor == 0:
            return False
    return True if n != 1 else False # 这写法怪怪的呀

def main ():
    print(json) # <module 'json' from '/Users/mac/miniconda3/lib/python3.7/json/__init__.py'>
    f = open('致橡树.txt', 'r', encoding='utf-8') # 这样写是很脆弱的 如果文件不存在 整个线程就崩了
    print(f.read())
    pass

    # 使用try catch 语句 表现行为跟js 是一样的 在try 或 catch return之前 先执行 finally 
    try:
        print('try')
        with open('致橡树.txt', 'r', encoding='utf-8') as f:
            # 逐行读取
            # for line in f:
            #     print(line)
            #     # sleep 函数的同步的
            #     time.sleep(0.5)

            # 逐行读取然后存为列表
            linelist = f.readlines()
            print(len(linelist))
        return 1
    except:
        print('except')
        return 0
    finally:
        print('finally')

def main1 ():
    filenames = ('a.txt', 'b.txt', 'c.txt')
    fs_list = []
    try:
        start = time.time()
        for filename in filenames:
            fs_list.append(open(filename, 'w', encoding='utf-8'))
        for number in range(1, 5000):
            if is_prime(number):
                if number < 100:
                    fs_list[0].write(str(number) + '\n')
                elif number < 1000:
                    fs_list[1].write(str(number) + '\n')
                else:
                    fs_list[2].write(str(number) + '\n')
    except IOError as ex:
        print(ex)
        print('写文件时发生错误!')
    finally:
        for fs in fs_list:
            fs.close()
        print('操作完成!用时：', time.time() - start)

def main2():
    mydict = {
        'name': '骆昊',
        'age': 38,
        'qq': 957658,
        'friends': ['王大锤', '白元芳'],
        'cars': [
            {'brand': 'BYD', 'max_speed': 180},
            {'brand': 'Audi', 'max_speed': 280},
            {'brand': 'Benz', 'max_speed': 320}
        ]
    }
    try:
        with open('leo.json', 'a', encoding='utf-8') as fs:
            json.dump(mydict, fs)
    except IOError as e:
        print(e)
    print('保存数据完成!')

def main3():
    # resp = requests.get('https://wx.nnleo.cn/views/users')
    resp = requests.get('https://github.com/jackfrued/Python-100-Days/blob/master/Day01-15/res/after-browser.jpg?raw=true')
    # 这一步也是同步 这语法也太简洁了吧 下载一张图片
    print(type(resp.content), type(resp.text))
    with open('leo.jpg', 'wb') as fs:
        fs.write(resp.content)
    # resp.content bytes resp.text str
    # data_model = json.loads(resp.text)
    # data_model = resp.json() # 直接调用json方法获取python能用的字典结构
    # for k, v in data_model.items():
    #     if k == 'users'
    #         print(len(v), '个用户')

def main4 ():
    pass

if __name__ == '__main__':
    main3()
    print(time.time(), type('blob data') == bytes) # 返回好几位小数的浮点数 单位秒


