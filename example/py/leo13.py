#!/Users/mac/miniconda3/bin/python
import json
import time
# time模块
def main ():
    time.sleep(0.5)                             # 整个线程睡半秒钟觉
    print(time.time(), type(time.time()))       # 浮点数 单位秒
    # print(time.clock()) # py3.3 开始废弃 3.8版本即将移除
    print(time.asctime()) # Wed Jun 19 12:21:52 2019

    # print(time.localtime(), type(time.localtime()), list(time.localtime()))
    # time.struct_time(tm_year=2019, tm_mon=6, tm_mday=19, tm_hour=12, tm_min=19, tm_sec=39, tm_wday=2, tm_yday=170, tm_isdst=0) 
    # 是一个类
    # <class 'time.struct_time'>
    # 转化成列表就变成了数字
    # [2019, 6, 19, 12, 19, 39, 2, 170, 0]  年月日十分秒 周几 一年的第几天 是否位夏令时

    print(time.ctime(time.time() + 24 * 3600 * 30)) # 接收秒数构建时间戳
    # time.mktime(t) 将一个struct_time转化为时间戳
    print(time.mktime(time.localtime())) # 秒数
    pass

def main2 ():
    # time.strftime(format[, t])
    # 把一个代表时间的元组或者struct_time（如由time.localtime()和time.gmtime()返回）转化为格式化的时间字符串
    print(time.strftime("%Y-%m-%d %X", time.localtime()))
    # 2019-06-19 12:29:29
    pass

if __name__ == '__main__':
    main2()

