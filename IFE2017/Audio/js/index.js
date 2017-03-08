


class DouBanFm {
	constructor() {
		this.musicList = musicList;
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
		this.musicListIndex = 0;
		this.handler();
		
	}


	handler () {
		this.$play.addEventListener('click', this.play.bind(this));
		this.$pause.addEventListener('click', this.pause.bind(this));
		this.$prev.addEventListener('click', this.prev.bind(this));
		this.$next.addEventListener('click', this.next.bind(this));
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
		this.title.textContent = this.song.name;
		this.author.textContent = this.song.author;
		this.cover.src = this.song.cover;
		this.audio.src = this.song.src;
		document.title = this.song.name;
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
}

var Fm  = new DouBanFm()