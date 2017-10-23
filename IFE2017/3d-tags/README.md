# 3D 标签云
练习canvas的3D效果,  球体算法, 正好IFE 的项目有就记录一下咯.

### 大概思路
首先3D云其实就是一个球体, 在这个球体上平均分布各个点, 再把这些点
的坐标赋给标签,计算一下 z 轴的大小, 最后通过改变字体的大小/ 透明度
就可以模拟出立体的效果啦.

### 相关的一些公式及说明

1. 球体 x/ y/ z 轴的坐标点
已知半径 R 和球心, 方便起见一般都以坐标轴的原点作为球心. 有如下三个方程式:
```javascript
x = R * sinθ * cosø
y = R * sinθ * sinø
z = R * cosθ
```

其中θ 和 ø 可以去随机数, 来获取圆上的随机点坐标. 但是3D 云的坐标点是需要均匀分配的坐标点, 所以光是去随机点是不够的. 所以又有了下面的公式:

```javascript
// index 为当前索引, length 为标签长度
// 这段我也不懂原理是什么, 在别人的代码里看见的...
θ = acos((2 * (index + 1) - 1) / length - 1)
// n 取 Math.PI
ø = θ * sqrt(length * n)
```

#### 关键代码
```javascript
const setBall = _ => {
	// 标签
	let tagLabel = document.querySelector('.tag');
	for (let i =0, len = tagLabel.length; i < len; i++) {
		let k = (2 * (i + 1) - 1) / len - 1,
			a = acos(k), // 上述θ
			b = a * sqrt(len * Math.PI), // 上述ø
			x = radius * Math.sin(a) * Math.cos(b),
			y = radius * Math.sin(a) * Math.sin(b),
			z = radius * Math.cos(a);
		// 让球体动起来, 我们先把方法放在这儿
		let t = new tag(tagLabel[i], x, y, z);
			tags.push(t);
			t.move()
	}
}
```

以上就可以取得球体所需的平均坐标点, 接下来我们就需要去操作 DOM 每个标签了.

2. 标签字体及透明度计算
```javascript
// fallLength 为焦距
let scale = fallLength/ (fallLength - this.z),
	opa = (this.z + radius) / (2 * radius);
// 每个标签添加样式
this.element.style.cssText = `color: rgb(
	${parseInt(Math.random() * 255)},
	${parseInt(Math.random() * 255)},
	${parseInt(Math.random() * 255)});
	font-size: ${parseInt(15 * scale)}px;
	opacity: ${opa + 0.5};
	z-index: ${parseInt(scale * 100)};
	left: ${this.x + CX - this.element.offsetWidth / 2}px;
	top: ${this.y + CY - this.element.offsetHeight / 2}px`;
```

fallLength 是焦距, 也是一个常量, scale 和 opacity 都要通过 z 轴来调整的. 这里也是从别人的代码里看到的, 应该也是公式吧; 后面就是调整字体大小/ 透明度, 标签位置的操作了. 以上计算就是`move()`函数中的内容. 现在球体已经出来了, 那么就该让他动起来了.

3. 旋转算法
为了让球体动起来, 我们需要知道下面这三个公式:

![旋转公式](http://orf90agxq.bkt.clouddn.com/3d_tags/rotate.png)

然后我们需要两个函数, x 轴选择和 y 轴旋转, 关键代码如下:
```javascript
const rotateX = _ => {
	// angleX 是事先定义好的角度值
	let sin = Math.sin(angleX),
		cos = Math.cos(angleX);
	tags.forEach(function () {
		let y1 = this.y * cos - this.z * sin,
			z1 = this.z * cos + this.y * sin;
		this.y = y1;
		this.z = z1;
	})
}

const rotateY = _ =>{
	// angleX 是事先定义好的角度值
	var cos = Math.cos(angleY),
	 	sin = Math.sin(angleY);
	tags.forEach(function () {
		var x1 = this.x * cos - this.z * sin;
		var z1 = this.z * cos + this.x * sin;
		this.x = x1;
		this.z = z1;
	 })
}
```
这里 angleX 和 angleY 为角度值, 用来控制标签云的旋转方向和速度. 角度的正负值控制旋转方向; 大小控制旋转速度.

4. 鼠标控制
这里就是最后一步了, 通过鼠标改变球体的旋转方向. 这里我做了一点点扩展几个输入框, 可以让用户自由填写云内容/ 数量及旋转速度, 下面直接看代码吧.

```javascript
// 来个事件监听
const addEvent = function (element, event, fn) {
	if (element.addEventListener) {
		element.addEventListener(event, fn, false)
	}else if (element.attachEvent) {
		element.attachEvent('on' + event, fn)
	}else {
		element['on' + event] = fn
	}
};

// 获取用户输入标签
addEvent(content, 'blur', function () {
	if (!!this.value) {
		console.log(typeof this.value)
		data = this.value.split(',');
		createLabel(data, num);
		let item = document.querySelectorAll('.tag');
		setBall(item)
	}
});

// 获取用户输入数量
addEvent(numberLabel, 'blur', function () {
	if (+this.value < 0 || +this.value > 200) {
		alert('请填写11 - 200之间的数值')
	}else {
		num = +this.value;
		createLabel(data, num);
		let item = document.querySelectorAll('.tag');
		setBall(item)
	}
})

// 获取转速
addEvent(speedLabel, 'blur', function () {
	if (+this.value < 0) {
		alert('请输入大于0的数值')
	}else {
		speed = +this.value;
		clearInterval(interval)
		animate()
	}
})

// 鼠标移动
addEvent(container, "mousemove", function (e) {
	// EX: 宽度的一半; CX: 左边距
	// EY: 高度的一半; CY: 上边距
	var x = e.clientX - EX - CX;
		var y = e.clientY - EY - CY;
		angleX = y * 0.0001;
		angleY = x * 0.0001;
});
```
到这里3D 云的流程差不多就走完了, 下面放一个完整的 js 部分代码吧.

```javascript
(function (global) {
	let speedLabel = document.getElementById('speed'),
		numberLabel = document.getElementById('number'),
		data = ["JavaScript", "Node.Js", "HTML", "CSS", "vue", "react"
				, "JQuery", "Webpack", "Babel", "ES6", "WebSocket"],
		container = document.querySelector('.container'),
		content = document.getElementById('content'),
		interval,
		speed = 100,
		num = 120,
		radius = 300,
		fallLength = 500,
		angleX = Math.PI / 500,
		angleY = Math.PI / 500,
		CX = container.offsetWidth / 2,
		CY = container.offsetHeight / 2,
		EX = container.offsetLeft,
		EY = container.offsetTop;


	// 创建标签
	const createLabel = (data, num) => {
		let html = '', index;
		for (let i = 0; i < num; i++) {
			index = Math.floor(Math.random() * data.length);
			html += `<label class='tag'>${data[index]}</label>`;
		}
		container.innerHTML = html;
	};

	// 事件监听
	const addEvent = function (element, event, fn) {
		if (element.addEventListener) {
			element.addEventListener(event, fn, false)
		}else if (element.attachEvent) {
			element.attachEvent('on' + event, fn)
		}else {
			element['on' + event] = fn
		}
	};

	// 获取用户输入标签
	addEvent(content, 'blur', function () {
		if (!!this.value) {
			console.log(typeof this.value)
			data = this.value.split(',');
			createLabel(data, num);
			let item = document.querySelectorAll('.tag');
			setBall(item)
		}
	});

	// 获取用户输入数量
	addEvent(numberLabel, 'blur', function () {
		if (+this.value < 0 || +this.value > 200) {
			alert('请填写11 - 200之间的数值')
		}else {
			num = +this.value;
			createLabel(data, num);
			let item = document.querySelectorAll('.tag');
			setBall(item)
		}
	})

	// 获取转速
	addEvent(speedLabel, 'blur', function () {
		if (+this.value < 0) {
			alert('请输入大于0的数值')
		}else {
			speed = +this.value;
			clearInterval(interval)
			animate()
		}
	})

	let tags = [];

	// setBall
	const setBall = _ => {
		let tagLabel = document.querySelectorAll('.tag');
		for (let i = 0; i < tagLabel.length; i++) {
			let k = (2 * (i + 1) - 1) / tagLabel.length - 1,
				a = Math.acos(k), // 反余弦
				b = a * Math.sqrt(tagLabel.length * Math.PI), // 平方根
				x = radius * Math.sin(a) * Math.cos(b),
				y = radius * Math.sin(a) * Math.sin(b),
				z = radius * Math.cos(a);

			let t = new tag(tagLabel[i], x, y, z);
			tags.push(t);
			t.move()
		}
	};

	Array.prototype.forEach = function (callback) {
		for(let i = 0; i < this.length; i++) {
			callback.call(this[i]);
		}
	}



	function tag (el, x, y, z) {

		this.element = el;
		this.x = x;
		this.y = y;
		this.z = z;
	}

	tag.prototype = {
		move: function () {
			let scale = fallLength/ (fallLength - this.z),
				opa = (this.z + radius) / (2 * radius);
			this.element.style.cssText = `color: rgb(${parseInt(Math.random() * 255)},
				${parseInt(Math.random() * 255)}, ${parseInt(Math.random() * 255)});
				font-size: ${parseInt(15 * scale)}px;
				opacity: ${opa + 0.5};
				z-index: ${parseInt(scale * 100)};
				left: ${this.x + CX - this.element.offsetWidth / 2}px;
				top: ${this.y + CY - this.element.offsetHeight / 2}px`;
		}
	}

	const animate = _ => {
		interval = setInterval(function () {
			rotateX();
			rotateY();
			tags.forEach(function () {
				this.move()
			})
		}, speed)
	};

	const rotateX = _ => {
		let sin = Math.sin(angleX),
			cos = Math.cos(angleX);
		tags.forEach(function () {
			let y1 = this.y * cos - this.z * sin,
				z1 = this.z * cos + this.y * sin;
			this.y = y1;
			this.z = z1;
		})
	};

	const rotateY = _ =>{
		var cos = Math.cos(angleY),
			sin = Math.sin(angleY);
		tags.forEach(function () {
			var x1 = this.x * cos - this.z * sin;
			var z1 = this.z * cos + this.x * sin;
			this.x = x1;
			this.z = z1;
		})
	};

	// 鼠标移动
	addEvent(container, "mousemove", function (e) {
		var x = e.clientX - EX - CX;
		var y = e.clientY - EY - CY;
		angleX = y * 0.0001;
		angleY = x * 0.0001;
	});

	// 初始化
	createLabel(data, num);
	var tagLabel = document.querySelectorAll('.tag');
	setBall(tagLabel);
	animate()
})(window)
```

Created on 17-10-8 by Cara
[在线预览 demo](https://caraws.github.io/IFE/IFE2017/3d-tags/index.html)