# 正则表达式入门

Create By Cara on 2/3/17

## 记录
1.\b 边界符:匹配字母中文数字下划线; \1 重复一次 ; + 至少一次 ; \w 英文数字下划线 ;\s 空白符
2.边框用div的伪元素来模拟,用hover伪类控制显示
```js
    let repeat = /\b([A-Za-z]+)\s+\1\b/;
```


### demo:https://caradelevingne.github.io/IFE/IFE2017/RegExp/index.html
