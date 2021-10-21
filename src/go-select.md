# go `select` 语句

- 用于监控并选择一组 `case` 语句执行相应的代码

- 表达式都必须是 `channel` 的发送或接收操作

`case` 个数区别

- `select` 不存在任何的 `case` 永久阻塞当前 `goroutine`
- `select` 只存在一个 `case` 阻塞的发送/接收
- `select` 存在多个 `case` 则伪随机方式抽取任意一个执⾏
- 如果没有一个 `case` 能 `return` 则可以执行 `default` 块

如何实现: 同时满足条件的多个 `case` 中的优先执行某一个 `case` 呢

```go
func (tc *NoExecuteTaintManager) worker(worker int, done func(), stopCh <-chan struct{}) {
	defer done()

	// 当处理具体事件的时候，我们会希望 Node 的更新操作优先于 Pod 的更新
	// 因为 NodeUpdates 与 NoExecuteTaintManager无关应该尽快处理
	// -- 我们不希望用户(或系统)等到PodUpdate队列被耗尽后，才开始从受污染的Node中清除pod。
	for {
		select {
		case <-stopCh:
			return
		case nodeUpdate := <-tc.nodeUpdateChannels[worker]:
			tc.handleNodeUpdate(nodeUpdate)
			tc.nodeUpdateQueue.Done(nodeUpdate)
		case podUpdate := <-tc.podUpdateChannels[worker]:
			// 如果我们发现了一个 Pod 需要更新，我么你需要先清空 Node 队列.
		priority:
			for {
				select {
				case nodeUpdate := <-tc.nodeUpdateChannels[worker]:
					tc.handleNodeUpdate(nodeUpdate)
					tc.nodeUpdateQueue.Done(nodeUpdate)
				default:
					break priority
				}
			}
			// 在 Node 队列清空后我们再处理 podUpdate.
			tc.handlePodUpdate(podUpdate)
			tc.podUpdateQueue.Done(podUpdate)
		}
	}
}
```
