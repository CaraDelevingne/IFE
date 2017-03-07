# IFE2017 任务CSS 3D轮播
    Created By Cara on 7/3/17

## 思路及问题
 每个li代表四个面,代表上下前后4个面,下面再分四个div,分别对应li的第 1 2 3 4个;比如第一个div对应所有li的下面的第一个div;
关键代码:
```css
        .image{
			transform-style: preserve-3d;
			width: inherit;
			height: inherit;
			margin: inherit;
		}
		.image>li{
			width: 200px;
			height: 140px;
			transform-style: preserve-3d;
			position: relative;
			float: left;
			border: thin solid red;
		}
		.image>li>div{
			width: 100%;
			height: 100%;
			position: absolute;
			background-size: 100%;
			backface-visibility: hidden;
		}
		.image>li>div:first-child{
			background: url("images/timg.jpg") no-repeat;
			transform: rotateX(0deg) translateZ(150px);
		}
		.image>li>div:nth-child(2){
			background: url("images/2.jpg") no-repeat;
			transform: rotateX(90deg) translateZ(150px);
		}
		.image>li>div:nth-child(3){
			background: url("images/5.jpg") no-repeat;
			transform: rotateX(180deg) translateZ(150px);
		}
		.image>li>div:last-child{
			background: url("images/4.jpg") no-repeat;
			transform: rotateX(-90deg) translateZ(150px);
		}
```
```js
    var $t = null,$num=0;
	var $clis = $('.image li');
	$clis.each(function(index,target){
	    $(target).children('div').css({backgroundPosition:-200*index+"px"});
	    //设置旋转的时间
	    $(target).css('transition', index*0.2 +'s');
	});
	function move(){
	    $clis.css('transform','rotateX('+ $num*90 +'deg)');
	}
	function autoMove(){
	    //清除定时器
	    clearInterval($t);
	    $t = setInterval(function(){
	        $num++;
	        move();
	    },2000);
	}
```

### DEMO地址 : https://caradelevingne.github.io/IFE/IFE2017/CSS轮播/indexX.html
