#!/Users/mac/miniconda3/bin/python
# ------------------------------------------进程跟线程
# 先了解一下进程跟线程的概念 统筹来讲
'''
进程是资源（CPU、内存等）分配的基本单位 它是程序执行时的一个实例 有系统独立分配的内存 执行上下文 执行、切换的开销大
线程是程序执行时的最小单位 它是进程的一个执行流 是CPU调度和分派的基本单位 一个进程可以由很多个线程组成 
'''

'''
p.apply_async(func,args=(args))实现 一个池子里能同时运行的任务是取决你电脑的cpu数量 
如我的电脑现在是有4个cpu 那会子进程task0、task1、task2、task3可以同时启动 
task4则在之前的一个某个进程结束后才开始
'''

from time import time, sleep
from os import getpid
from multiprocessing import Process, Queue, Pool
global name
name = 'leooo'

def long_time_task(name):
    print('Run task %s (%s)...' % (name, getpid()))
    start = time()
    sleep(3)
    end = time()
    print('Task %s runs %0.2f seconds.' % (name, (end - start)))

def main ():
    print('Parent process %s.' % getpid())
    p = Pool()
    for i in range(5):
        p.apply_async(long_time_task, args = ('P-' + str(i),))
    print('Waiting for all subprocesses done...')
    p.close()
    p.join()
    print('All subprocesses done.')
    pass

if __name__ == '__main__':
    main()

    
