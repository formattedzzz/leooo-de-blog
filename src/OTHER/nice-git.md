# nice-git

## git 时光机

问题描述：

现在有 6 次 commit 提交记录 时间先后备注分别是 commit-1 到 commit-6

先有人 git reset --hard 29mda73h 强行回到了 commit2 导致 commit3-6 全都没了

又在 commit2 的基础上提交了一个 commit7

那么 git log 里面找不到 commit3-6 的 commitID 了 怎么找回呢

1、使用 **git reflog** 列出你操作过的 commitID （与 **git log** 之间的区别就在这里）

```bash
git reflog
```

2、然后我们找到 commit6 的 ID 切回去

```bash
git reset --hard commit6ID
```

接着我们回到了 commit6

3、使用 **git cherry-pick** 补上 commit7

```bash
git cherry-pick commit7ID
```

## git rebase

```bash
git rebase -i HEAD~4
# 合并最近4次提交 或者这样 git rebase -i commitid
# commitid(不包括本身)之后的所有提交
# -i interactive 表示弹出交互式的rebase配置
# 之后会进入vim 配置
```

默认操作中的 4 次提交都是保留的 一般我们的目的是合并为一次提交 然后保留或者重新总结 commit

这样可以 **pick log1** **squash** 后面 3 次提交 **:wq** 退出 进入 **commit log** 编辑 log1-log4 可以删除合并为

总结性的**log**

## git 浅层 clone

```bash
git clone repourl --depth=1
```

## 其他小伙伴发布分支到远程 而本地没有

法 1:

```bash
git checkout -b branchname
# 同名分支 先本地建立分支

git pull origin branchname
# 同名分支 再在该分支下主动拉取远程分支 则会自动建立关联
```

法 2:

```bash
git fetch
# 先让本地能够检测到远程新增的分支

git checkout -b branchname origin/branchname
# 再新建本地分支与该远程分支进行关联
```

## 想放弃托管某文件但是本地保留

```bash
git rm --cached file_path
```

## 分支删除

```sh
git branch -d dev/leooo
git branch -D dev/leooo
git push origin --delete origin/dev/leooo
```
