#!/Users/mac/miniconda3/bin/python
# ------------------------------------------python 中的正则

import re

def main ():
    '''findall相当于match'''
    str1 = 'ingcvb ingnpm'
    pattern = re.compile(r'(?=ing)\w+\b')   
    res1 = re.findall(pattern, str1)        
    print(res1, type(res1))                 # ['ingcvb', 'ingnpm']

    pattern = re.compile(r'(?<=ing)\w+\b')
    res2 = re.findall(pattern, str1)
    print(res2)                             # ['cvb', 'npm']
    # 从前瞻的表现来看 py的表现行为跟js完全一致
    pass

def main1 ():
    '''sub相当于replace'''
    sentence = '你丫是傻叉吗? 我操你大爷的. Fuck you.'
    purified = re.sub(r'[操肏艹]|fuck|shit|傻[比屄逼叉缺吊屌]|煞笔', '**', sentence, flags = re.IGNORECASE )
    print(purified) # 你丫是*吗? 我*你大爷的. * you.
    pass

def main2 ():
    '''search匹配出第一个 可获取下标 可以当test来用'''
    str1 = 'ingcvb ingnpm ingert'
    pattern = re.compile(r'(?<=ing)\w+\b')
    res = pattern.search(str1) # 先匹配出第一个 然后调用end方法 接着继续匹配还未匹配的字符
    # print(res, type(res)) # <class 're.Match'>
    while res:
        print(res.group())
        res = pattern.search(str1, res.end())
    pass

def main3 ():
    '''finditer相当于匹配迭代器 应该是finditerator的缩写 py老是喜欢无条件的缩写'''
    str1 = 'ingcvb ingnpm ingert'
    pattern = re.compile(r'(?<=ing)\w+\b')
    res = pattern.finditer(str1)
    print(res, type(res))
    # <class 'callable_iterator'> 就是一个迭代器

    for one in res:
        print(one, one.group())
    print(list(res))
    # 并不能直接转化为列表
    pass

def main4 ():
    '''split就相当于js字符串的split方法 但是结合正则功能更强大'''
    poem = '窗前明月光，疑是地上霜。举头望明月，低头思故乡。'
    sentence_list = re.split(r'[，。, .]', poem)
    while '' in sentence_list:
        sentence_list.remove('')
    print(sentence_list)
    # ['窗前明月光', '疑是地上霜', '举头望明月', '低头思故乡']
    # 该功能要换js的话就要先把标点替换成固定字符再调用split方法了
    pass

if __name__ == '__main__':
    main4()