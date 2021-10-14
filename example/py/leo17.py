from random import randint
from threading import Thread, Lock
from time import time, sleep
'''
因为多个线程可以共享进程的内存空间 因此要实现多个线程间的通信相对简单 
大家能想到的最直接的办法就是设置一个全局变量 
多个线程共享这个全局变量即可 我们称这个全局变量为资源
抛出一个问题：多个线程抢占资源的问题
'''
def download(filename):
    print('开始下载%s...' % filename)
    time_to_download = randint(3, 5)
    sleep(time_to_download)
    print('%s下载完成! 耗费了%d秒' % (filename, time_to_download))

def main():
    start = time()
    t1 = Thread(target=download, args=('leo.pdf',))
    t1.start()
    t2 = Thread(target=download, args=('leo.avi',))
    t2.start()
    t1.join()
    t2.join()
    end = time()
    print('总共耗费了%.3f秒' % (end - start))

class DownloadTask(Thread):

    def __init__ (self, filename):
        super().__init__()
        self._filename = filename
    def run (self):
        print('开始下载%s...' % self._filename)
        time_to_download = randint(2, 5)
        sleep(time_to_download)
        print('%s下载完成! 耗费了%d秒' % (self._filename, time_to_download))

def main2 ():
    start = time()
    t1 = DownloadTask('Python从入门到住院.pdf')
    t1.start()
    t2 = DownloadTask('Peking Hot.avi')
    t2.start()
    t1.join()
    t2.join()
    end = time()
    print('总共耗费了%.2f秒.' % (end - start))

# -------------------------------------抢占资源案例
'''
我们可以通过“锁”来保护“临界资源” 只有获得“锁”的线程才能访问“临界资源”
而其他没有得到“锁”的线程只能被阻塞起来 直到获得“锁”的线程释放了“锁”
其他线程才有机会获得“锁” 进而访问被保护的“临界资源”
'''
class Account(object):

    def __init__(self):
        self._balance = 0
        self._lock = Lock()

    def deposit(self, money):
        self._lock.acquire()
        try:
            # 计算存款后的余额
            new_balance = self._balance + money
            # 模拟受理存款业务需要0.01秒的时间
            sleep(0.01)
            # 修改账户余额
            self._balance = new_balance
        finally:
            # 在finally中执行释放锁的操作保证正常异常锁都能释放
            self._lock.release()

    @property
    def balance(self):
        return self._balance

# 继承了Thread类就是说 每实例化一个AddMoneyThread类（加上后续的操作）都是再不同的线程中进行的

class AddMoneyThread(Thread):

    def __init__(self, account, money):
        super().__init__()
        self._account = account
        self._money = money

    def run(self):
        self._account.deposit(self._money)

def main3 ():
    account = Account()
    threads = []
    # 创建100个存款的线程向同一个账户中存钱
    for _ in range(100):
        t = AddMoneyThread(account, 1)
        threads.append(t)
        t.start()
    # 等所有存款的线程都执行完毕
    for t in threads:
        t.join()
    print('账户余额为: ￥%d元' % account.balance)
    # 这样都是抢占account这个资源的情况下得到的不是100块

if __name__ == '__main__':
    main3()

'''
关于是多线程还是多进程
CPU密集型 转解码
IO密集型 网络 存储介质I/O

将耗时间的任务放到线程中以获得更好的用户体验
使用多进程对复杂任务进行“分而治之”

'''
