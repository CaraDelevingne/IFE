# 有趣的CSS

IFE任务二 2017.2.27

## 思路
1.利用box-sizing:border-box属性将边框合并在元素内
2.边框用div的伪元素来模拟,用hover伪类控制显示
```css
.title::before{
			content: "";
			position: absolute;
			left: 0;
			top: 50%;
			width: 100%;
			height: 0;
			border: 3px solid #fff;
			border-width: 0 3px;
			visibility: hidden;
			transition: all 0.5s;
		}
		.title::after{
			content: "";
			position: absolute;
			left: 50%;
			top: 0;
			width: 0;
			height: 100%;
			border: 3px solid #fff;
			border-width: 3px 0;
			visibility: hidden;
			transition: all 0.5s;
		}
```
3.文字渐变,利用背景颜色定义颜色,然后用background-clip:text;定义背景色的绘制区域,将background-size放大到200%;
便于之后动画控制background-position来显示文字颜色波动
```
.text{
			background: -webkit-linear-gradient(left,green,yellow 30%,deepskyblue 50%,red 70%,pink 80%,yellow 90%,green 100%);
			color: transparent;
			/*背景绘制区域定为文本区域*/
			-webkit-background-clip: text;
			-o-background-clip: text;
			-moz-background-clip: text;
			background-clip: text;
			background-size: 200%;
			-webkit-animation: text 5s infinite linear;
			-moz-animation: text 5s infinite linear;
			-o-animation: text 5s infinite linear;
			animation: text 5s infinite linear;
		}
		@keyframes text{
			0%{
				background-position: 0 0;
			}
			100%{
				background-position: -100% 0;
			}
		}
```

### demo:https://caradelevingne.github.io/IFE/IFE2017/css3/FunnyCSS.html
