# IFE2017:任务四 css实现折叠菜单

Created 2017.2.27 By Cara

## 思路
1.利用伪类:target实现选中,但是会改变hash值
注意:a标签的href要有对应的id,使用时#id:target;还有display不能实现过渡效果,所以这里用的visibility
```css关键代码
.panel>ul{
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	background: #fff;
}
.panel-menu>li{
	width: 100%;
	text-align: center;
	line-height: 30px;
}
.panel>ul>li:not(:last-child){
	border-bottom: thin solid #ccc;
}
.panel .panel-menu:not(:target)>li{
	height: 0;
	visibility: hidden;
}
.panel .panel-menu:target>li{
	height: 30px;
	visibility: visible;
	-webkit-transition: all .3s linear;
	-moz-transition: all .3s linear;
	-ms-transition: all .3s linear;
	transition: all .3s linear;
}
```
最后为了刷新清除hash值 用了js判断是否hash值为空

### demo地址 : https://caraws.github.io/IFE/IFE2017/collapse/index.html

### demo优化地址 : https://caraws.github.io/IFE/IFE2017/collapse/better.html
