# IFE2017 任务CSS 3D轮播
    Created By Cara on 7/3/17

## 思路及问题

###任务轮播
用一个div.box包裹6张图片并声明3D,父级.wrapper用 perspective:800px 声明视距;perspective-origin:center以中心点旋转,之后控制这个.box的rotateY来旋转
关键代码:
    css代码:
        ``` css
            .box{
		        width: 200px;
		        height: 200px;
		        -webkit-transform-style: preserve-3d;
		        transform-style: preserve-3d;
		        transition: all 0.5s linear;
		        position: relative;
		        padding: 200px;
	        }
	        .box>div{
		        position: absolute;
		        width: 200px;
		        height: 200px;
	        }
	        .box>div>img{
		        width: 100%;
		        height: 100%;
	        }
	        .img1{
		        transform: rotateY(0deg) translateZ(400px);
	        }
	        .img2{
		        transform: rotateY(65deg) translateZ(400px);
	        }
	        .img3{
		        transform: rotateY(125deg) translateZ(400px);
	        }
	        .img4{
		        transform: rotateY(180deg) translateZ(400px);
	        }
	        .img5{
		        transform: rotateY(245deg) translateZ(400px);
	        }
	        .img6{
		        transform: rotateY(305deg) translateZ(400px);
	        }
        ```
    js代码:
        ```
            let num = 0, clearTime = null;
            let move =  () => {
		        box.css({transform:'rotateY('+ num * 45 +'deg)'});
	        }
	        //自动轮播
	        let autoMove = () => {
		        clearInterval(clearTime);
		        clearTime = setInterval(() => {
			        num++;
			        move();
		        },2000);
	        }
	        autoMove();
        ```

### 这是另一个3D轮播
 每个li代表四个格子,分割图片background-position;rotateX来旋转图片呈现上下前后四个面,下面再分四个div代表四张图片;比如第一个div对应所有li的下面的第一个div也就是一张完整的图片;
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

### 任务DEMO地址 : https://caradelevingne.github.io/IFE/IFE2017/CSS轮播/index1.html

### DEMO地址 : https://caradelevingne.github.io/IFE/IFE2017/CSS轮播/index.html
