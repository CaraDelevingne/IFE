# IFE2017 任务CSS制作圆形Loading效果
    Created By Cara on 3/3/17

## 思路及问题
圆形分三个div,一个整圆,一个左边一个右边,两个颜色不一样一起转动,其中一个延迟四分之一和停顿
关键代码:
```
/*整圆*/
		.circle{
			width: 0;
		    height: 0;
			position: absolute;
		    left: calc(50% - 100px);
		    top: calc(50% - 100px);
		    transform: rotate(45deg);
		    border: 100px solid rgb(255,41,140);
		    border-right-color: rgb(251,139,189);
		    border-top-color: rgb(251,139,189);
		    border-radius: 50%;
		}
		/*公共样式*/
		.abs{
			width: 0;
		    height: 0;
		    border: 100px solid transparent;
		    border-radius: 50%;
		    position: absolute;
		    left: calc(50% - 100px);
		    top: calc(50% - 100px);
    		transform: rotate(45deg);
		}
		/*左半边*/
		.left{
			border-left-color: rgb(251,139,189);
		    border-bottom-color: rgb(251,139,189);
		    animation: left 2s linear infinite;
		    z-index: 6;
		}
		/*右半边*/
		.right{
			border-bottom-color: rgb(255,41,140);
		    border-left-color: rgb(255,41,140);
		    
		    animation: right 2s linear infinite;
		    /*延迟四分之一*/
		    animation-delay: 0.5s;
		    z-index: 5;
		}
		
		/*圆环*/
		.ring{
			width: 240px;
            height: 240px;
            position: absolute;
			top: calc(50% - 120px);
			left: calc(50% - 120px);
            border-radius: 50%;
            border: 2px solid rgb(255, 41, 140);
            border-top-color: transparent;
            animation: ring 0.8s linear infinite;
		}
		 @keyframes ring {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(-360deg);
            }
        }
		@keyframes left {
            from {transform: rotate(45deg);}
		    25% {transform: rotate(-135deg);}
		    50% {transform: rotate(-135deg);} 
		    75% {transform: rotate(-315deg);}
		    to {transform: rotate(-315deg);}
        }
		@keyframes right{
			from {transform: rotate(45deg);z-index: 6;}
		    25% {transform: rotate(-135deg);} 
		    50% {transform: rotate(-135deg);z-index: 6;} 
		    50.001% {transform: rotate(-135deg);z-index: 5;} 
		    75% {transform: rotate(-315deg);z-index: 5;} 
		    99.999% {transform: rotate(-315deg);z-index: 5;} 
		    to {transform: rotate(-315deg);z-index: 6}
		} 
```


### DEMO地址 : https://caradelevingne.github.io/IFE/IFE2017/CSS饼状Loading/index.html
