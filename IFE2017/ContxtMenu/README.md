# IFE2017 任务三:右键自定义菜单
    依赖项 vue.js (练习vue)
    逻辑实现都是原生js

## 思路及问题
1.触发右键点击 : oncontextmenu事件.
2.在vue中阻止原生默认菜单 @contextmenu.stop.prevent="".
3.vue绑定style :  :style="{left:theLeft+'px',top:theTop+'px'}".
4.获取鼠标指针坐标及当前目标
```
    //获取当前指针坐标
	let x = e.clientX;
	let y = e.clientY;
	//获取当前目标
	let target = e.target;
	//获取屏幕宽高
	let WinW = document.body.clientWidth || document.documentElement.clientWidth;
	let WinH =  document.documentElement.clientHeight;
```
5.判断逻辑,右边是否能放下菜单或者下方是否能放下
```
    //判断右侧宽度是否足够
	if ((WinW - x) < 200 ) {
		this.theTop = y ;
		this.theLeft = (x - 200);
	//判断下方高度是否足够
	}else if ((WinH - y) < 80) {
		this.theTop = (y - 80);
		this.theLeft = x ;
	}else{
		this.theTop = y ;
		this.theLeft = x ;	
	}
```
6.注意菜单不要相对于div定位,而是相对于window


### DEMO地址 : https://caradelevingne.github.io/IFE/IFE2017/ContextMenu/index.html
