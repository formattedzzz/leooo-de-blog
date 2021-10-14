#!/Users/mac/miniconda3/bin/python
# ------------------------------------------进程跟线程
# 先了解一下进程跟线程的概念 统筹来讲
'''
进程是资源（CPU、内存等）分配的基本单位 它是程序执行时的一个实例 有系统独立分配的内存 执行上下文 执行、切换的开销大
线程是程序执行时的最小单位 它是进程的一个执行流 是CPU调度和分派的基本单位 一个进程可以由很多个线程组成 
'''
from random import randint
from time import time, sleep
from os import getpid
from multiprocessing import Process, Queue
global name
name = 'leooo'

def download_task(filename, name):
    print('开始下载%s...' % filename, name)
    if filename == 'leo.pdf':
        name = 'leoop'
    print(name)
    time_to_download = randint(3, 6)
    sleep(time_to_download)
    print('%s下载完成! 耗费了%d秒' % (filename, time_to_download))

def main():
    start = time()
    download_task('leo.pdf', name)
    download_task('leo.avi', name)
    end = time()
    print('总共耗费了%.2f秒.' % (end - start))
# main函数执行 只有一个进程 任务一个一个排队下载



def main1():
    start = time()
    P1 = Process(target = download_task, args = ('leo.pdf', name)) # download_task('leo.pdf') 放到P1进程中执行
    P1.start()
    P2 = Process(target = download_task, args = ('leo.avi', name))
    P2.start()
    P1.join()
    P2.join()
    end = time()
    print('总共耗费了%.2f秒.' % (end - start))
# main1函数执行 开启两个进程 任务同时下载 只花了7秒钟

# 进程之间的通讯 上面main1写到的P1、P2确实都能访问启动进程的变量、上下文 但两个进程是完全复制了当前进程的执行上下文 互补干扰
# 稍作修改验证一下 P1线程执行的时候修改一下全局变量name P2下面再打印一下 发现外部的name是修改不了的 修改的只是P1进程上下文中的name

# 进程通讯 了解一个简单的 multiprocessing 模块中的 Queue 类

def put (q):
    # put进程执行 把5个数推进q队列
	# for i in range(5):
	# 	q.put(str(i))
	# print('put is done')
    print('put')
    sleep(2)
    q.put({'name': 'leo'})
    q.put({'age': 12})
    return {'data': 'put'}
    pass

def get (q):
    print('get', q.empty())
    # get进程执行 把q队列里面的值依次取出来
    while True:
        info = q.get()
        print('get %s' % info)
        print('get is running')
        if q.empty():	# 如果队列空了，就退出循环
            print('队列已空')
            break
    return {'data': 'get'}

def get2 (q):
    print('get2', q.empty())
    # get进程执行 把q队列里面的值依次取出来
    while True:
        info = q.get()
        print('get2 %s' % info)
        print('get2 is running')
        if q.empty():	# 如果队列空了，就退出循环
            print('get2队列已空')
            break
    return {'data': 'get2'}

def main2 ():
	print('main task start')
	q = Queue()
    # 一个队列 新开的进程都能访问到这个队列 而且访问的是同一个队列

	p1 = Process(target = put, args = (q, ))
	p2 = Process(target = get, args = (q, ))
	p3 = Process(target = get2, args = (q, ))

	p2.start()
	p3.start()
	p1.start()
	p1.join()
	p2.join()
	p3.join()
	print('main task done')

# main1中两个进程 是同时执行的 都跑完之后才出的 两者并非执行
# 分析下main2的执行结果 可以看到 两者确实是并发执行 但问题是 get 执行就立即遍历通讯队列
# 队列是put中2秒后才有值的 但get居然会等待put执行之后才遍历？ 这是什么机制

# main task start
# get
# put
# get {'name': 'leo'}
# is running
# get {'age': 12}
# is running
# main task done

# 如果再加一个队列get2呢 表现行为还是一样的 只不过是每个人一个值
# main task start
# get True
# get2 True
# put
# get {'name': 'leo'}
# is running
# 队列已空
# get2 {'age': 12}
# get2 is running
# get2队列已空
# main task done


if __name__ == '__main__':
    main2()

    
