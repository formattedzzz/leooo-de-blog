-- 设置变量 number text record list
set title to "oho"

-- 设置类名称
-- set clipboard to "我的变量"

-- 启动某个软件
-- tell application "Safari"
--     activate
-- end tell

-- 嵌套tell
-- tell application "Chrome"
--     tell front document
--         set "新标题" to name
--     end tell
-- end tell

-- 调用弹窗 并获取结果
set leo to "请选择"
set res_obj to display dialog leo buttons {"yes", "no", "I dont know"}
set res_string to button returned of res_obj
# 从返回对象取值并相加
display dialog "您选择了" & res_string

-- 调用发音
-- say "Hello world" using "Fred"
-- beep 2

-- 列表用花括号表示 类似于py 动态类型 能转化成text类型的都能被say
set lyst1 to {1, "2"}
set lyst2 to {"3", "title-content"}
set lyst3 to lyst1 & lyst2
say item -1 of lyst3 & title
