# channel 再理解

- Unbuffered channel 的特点是：

这种 channel 没有缓冲长度 执行到接受者就会 **阻塞就不会往下执行** 等待另一个线程里面的 **发送者执行发送操作** 反之亦然

所以下面这样必然是死机的

```go
chan1 := make(chan int)
chan1 <- 1
// 同一个线程中 这里就已经阻塞了 不会执行到下一句
fmt.Println(<- chan1)
```

```go
func testChannel1() {
    fmt.Println("===>", 1)
    chan2 := make(chan int)
    go func() {
        fmt.Println("===>", 2)
        fmt.Println(<-chan2)
    }()
    fmt.Println("===>", 3)
    chan2 <- 1
    fmt.Println("===>", 4)
}
===> 1
===> 3
===> 2
===> 4
1

func testChannel2() {
    fmt.Println("===>", 1)
    chan2 := make(chan int)
    go func() {
        fmt.Println("===>", 2)
        chan2 <- 1
    }()
    fmt.Println("===>", 3)
    fmt.Println(<-chan2)
    fmt.Println("===>", 4)
}
===> 1
===> 3
===> 2
1
===> 4
```

- Buffered channel

  如果缓冲为空 那么 **执行到接受方便会阻塞** 会等待其他线程发送值

  如果缓冲满了 那 **执行到发送方便会阻塞** 会等待其他线程接收（消耗）值

  遍历读值时 要先 **把通道关闭** 不然 channel 读完会一直等 造成死锁

```go
chan3 := make(chan int, 1)
fmt.Println("===>", 1)
chan3 <- 9
go func() {
    fmt.Println("===>", 2)
    fmt.Println(<-chan3)
}()
fmt.Println("===>", 3)
// 这里会阻塞 因为已经满了 回跳到其他线程接收完
chan3 <- 10
fmt.Println("===>", 4)
fmt.Println(<-chan3)
fmt.Println("===>", 5)

===> 1
===> 3
===> 2
9
===> 4
10
===> 5

func testChannel4() {
    fmt.Println("===>", 1)
    chan1 := make(chan int, 2)
    go func() {
        fmt.Println("===>", 3)
        chan1 <- 1
        chan1 <- 2
        close(chan1)
    }()
    fmt.Println("===>", 4)
    // 这里接受者要拿值 缓冲区为空 就只有等协程执行完 会阻塞
    fmt.Println(<-chan1)
    fmt.Println("===>", 5)
    fmt.Println("===>", 6)
}
===> 1
===> 4
===> 3
1
===> 5
===> 6
```
