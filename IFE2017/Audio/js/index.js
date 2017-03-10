


class DouBanFm {
	//初始化所有需要的变量
	constructor() {
		this.musicList = playlist;
		this.title = document.querySelector(".title");
		this.author = document.querySelector(".author");
		this.time = document.querySelector(".time");
		this.volume = document.querySelector(".volume");
		this.volumeValue = document.querySelector(".volume-value");
		this.progress = document.querySelector(".progress");
		this.progressValue = document.querySelector(".progress-value");
		this.$prev = document.querySelector(".icon-prev");
		this.$next = document.querySelector(".icon-next");
		this.$play = document.querySelector(".icon-play");
		this.$pause = document.querySelector(".icon-pause");
		this.cover = document.querySelector(".cover>img");
		this.audio = new Audio();
		this.visualizer = new Analyser(".analyser",this.audio);
		this.musicListIndex = 0;
		this.handler();
		
	}

	//所有事件处理
	handler () {
		this.$play.addEventListener('click', this.play.bind(this));
		this.$pause.addEventListener('click', this.pause.bind(this));
		this.$prev.addEventListener('click', this.prev.bind(this));
		this.$next.addEventListener('click', this.next.bind(this));
		this.volume.addEventListener('click', this.setVolume.bind(this));
		this.progress.addEventListener('click', this.setProgress.bind(this));
		this.audio.addEventListener('ended', this.next.bind(this));
		this.audio.addEventListener('timeupdate', this.updataProgress.bind(this));
		this.loadAndPlay(0)
	}
	//读取数据
	loadAndPlay (index) {
		this.musicListIndex = index;
		this.song = this.musicList[this.musicListIndex];
		this.load();
		this.play();
	}
	//获取数据并复赋值
	load () {
		this.title.textContent = this.song.title;
		this.author.textContent = this.song.artist;
		this.cover.src = this.song.picture;
		this.audio.src = this.song.url;
		document.title = this.song.title;
	}
	//play
	play () {
		this.audio.play();
		this.$pause.style.cssText = "display:inline-block";
		this.$play.style.cssText = "display:none";
	}
	//pause
	pause () {
		this.audio.pause();
		this.$pause.style.cssText = "display:none";
		this.$play.style.cssText = "display:inline-block"
	}
	//prev
	prev () {
		if (this.musicListIndex == 0) {
			this.loadAndPlay(this.musicList.length - 1)
		}else{
			this.loadAndPlay(this.musicListIndex - 1)
		}
	}
	//next
	next () {
		if (this.musicListIndex == this.musicList.length - 1) {
			this.loadAndPlay(0)
		}else{
			this.loadAndPlay(this.musicListIndex + 1)
		}
	}
	//设置音量
	setVolume (e) {
		//获得矩形对象:
		const rect = this.volume.getBoundingClientRect();
		//鼠标位置 - 左偏移量 / 元素宽度 ;算出选了占整个音量条的百分比
		const volume = (e.x - rect.left) / rect.width;
		this.volumeValue.style.width = volume * 100 + '%';
		this.audio.volume = volume;
	}
	//设置进度条
	setProgress (e) {
		//当前时间
		this.audio.currentTime = e.offsetX / this.progress.clientWidth * this.audio.duration;
	}
	//更新当前播放时间
	updataProgress () {
		let minute = parseInt(this.audio.currentTime / 60);
		let second = parseInt((this.audio.currentTime - minute) % 60);
		if (second < 10 ) {
			second = '0' + second;
		}if (minute < 10) {
			minute = '0' + minute;
		}
		this.time.textContent = `${minute}:${second}`;
		this.progressValue.style.width = (this.audio.currentTime / this.audio.duration * 100) +'%';
	}
}

//实例化
var Fm  = new DouBanFm();


