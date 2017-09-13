
# infinite-scroll
无限滚动

# 思路

1. 判断滚动条是否到达容器底部

2. 到达底部后将 isLoaidng 状态更改

3. 创建 loading 动画

4. 加载数据

5. 加载完成之后, 删除 loading 动画, isLoading 状态改为 false 

[线上demo](https://caraws.github.io/IFE/IFE2017/infinite-scroll/index.html)