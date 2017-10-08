(function (global) {
	let speedLabel = document.getElementById('speed'),
		numberLabel = document.getElementById('number'),
		data = ["JavaScript", "Node.Js", "HTML", "CSS", "vue", "react"
				, "JQuery", "Webpack", "Babel", "ES6", "WebSocket"],
		container = document.querySelector('.container'),
		
		content = document.getElementById('content'),
		speed = 0,
		num = 120,
		radius = 300,
		fallLength = 500,
		angleX = Math.PI / 200,
		angleY = Math.PI / 200,
		CX = container.offsetWidth / 2,
		CY = container.offsetHeight / 2,
		EX = container.offsetLeft,
		EY = container.offsetTop;

		// var tagLabel = document.querySelectorAll('.tag');

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
			animate()
		}
	})

	let tags = [];

	// setBall
	const setBall = tagLabel => {
		let opa, fontSize;
		for (let i = 0; i < tagLabel.length; i++) {
			let k = (2 * (i + 1) - 1) / tagLabel.length - 1,
				a = Math.acos(k), // 反余弦
				b = a * Math.sqrt(tagLabel.length * Math.PI), // 平方根
				x = radius * Math.sin(a) * Math.cos(b),
				y = radius * Math.sin(a) * Math.sin(b),
				z = radius * Math.cos(a);

			let t = new tag(tagLabel[i], x, y, z);

			// tagLabel[i].style.color = `rgb(${parseInt(Math.random()*255)}, 
			// 	${parseInt(Math.random()*255)}, ${parseInt(Math.random()*255)})`;
			// 	
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
		setInterval(function () {
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
	}

	const rotateY = _ =>{
		var cos = Math.cos(angleY),
        	sin = Math.sin(angleY);
        tags.forEach(function () {
            var x1 = this.x * cos - this.z * sin;
            var z1 = this.z * cos + this.x * sin;
            this.x = x1;
            this.z = z1;
        })
	}

	addEvent(container, "mousemove", function (e) {
            var x = e.clientX - EX - CX;
            var y = e.clientY - EY - CY;
            angleX = y * 0.0001;
            angleY = x * 0.0001;
        });



	createLabel(data, num);
	var tagLabel = document.querySelectorAll('.tag');
	setBall(tagLabel);
	animate()



	



})(window)