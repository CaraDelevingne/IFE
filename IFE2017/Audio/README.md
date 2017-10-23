# IFE2017 模仿豆瓣音乐播放器
    Created By Cara on 8/3/17

## 思路及问题
    html跟着模仿就行,重点在js,用一个index当做音乐播放列表的下标,分别给标题/作者/音频src/图片赋值;
    用class作为对象的模板,让对象原型的写法更清晰.
    首先初始化所有的需要用到的变量,将函数分类
    MDN了解Audio可视化音频接口
    requestAnimationFrame()执行动画,类似setInterval
    音乐文件跨域问题

#### index.js 函数说明

| 函数名 | 参数 | 说明 |
| :------: | :------: | :------: |
| DouBanFm | X | 播放器类 |
| constructor | X | 构造函数: 初始化要用的变量 |
| handler | X | 所有事件处理程序 |
| loadAndPlay | index | 读取音乐文件,index作为音乐文件的索引值 |
| load | X | 获取音乐详情并赋值对应的初始化变量:音乐名称/作者/专辑图片/音乐路径 |
| play/pause | X | 播放音乐,以及暂停/播放键的切换 | 
| prev/next | X | 上一曲/下一曲,并判断当前歌曲是否为最后一曲或者第一曲 |
| setVolume | e | 设置音量大小,参数event对象,用于获取当前鼠标点击的位置计算音量百分比 | 
| setProgress | e | 设置进度条,参数event对象,用于获取当前鼠标位置计算当前播放时间 |
| updataProgress | X | 更新播放时间并更新进度条 |

    最后需要实例化 var Fm  = new DouBanFm();

``` javascript
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
```

#### analyser.js 可视化音频流 函数说明
    
| 函数名 | 参数 | 说明 |
| :------: | :------: | :------: |
| Analyser | X | 整个音频可视化类 |
| constructor | element/audio | 构造函数: 初始化要用的变量,参数element传入canvas对象/audio传入new Audio("xxx.mp3") |
| draw | X | 在canvas中画动画音频 |

注意 : 最后在index.js中实例化该类并在constructor中调用.由于这里用的不是本地音乐所以有跨域的问题,会导致获取不到音频播放器也不会播放.
       所以歌曲都用的别人做好的,服务端做过处理.

``` javascript
    constructor (element,audio) {
        this.canvas = document.querySelector(element);
        this.canvas.width = document.querySelector(".wrapper").clientWidth;
        this.canvas.height = 256;
        this.canvasContext = this.canvas.getContext('2d');

        //解决跨域,服务端要做响应处理,这里直接用的别人做好了的
        audio.crossOrigin = 'Anonymous';
        //创建音频处理接口,音频上下文
        this.audioContext = new AudioContext();
        //创建控制节点
        this.analyser = this.audioContext.createAnalyser();
        //创建媒体节点
        this.audioSource = this.audioContext.createMediaElementSource(audio);
        ////连接：媒体节点 → 控制节点 → 输出源
        this.audioSource.connect(this.analyser);
        //最终输出到音频播放器
        this.analyser.connect(this.audioContext.destination);
        //出来的数组为8bit整型数组，即值为0~256，整个数组长度为1024，即会有1024个频率
        let bufferLength = this.analyser.frequencyBinCount;
        //将音频节点的数据拷贝到Uin8Array中
        this.dataArray = new Uint8Array(bufferLength);
        this.draw();
    }

    draw () {
        //执行动画
        requestAnimationFrame(this.draw.bind(this));
        //将音频节点的数据拷贝到Uin8Array中
        this.analyser.getByteFrequencyData(this.dataArray);
        let length = this.analyser.fftSize / 3;
        //数组长度与画布宽度比例:平分
        let width = this.canvas.width / length;
        this.canvasContext.clearRect(0,0,this.canvas.width,this.canvas.height);
        for (let i = 0; i < length; i ++) {
            let barHeight = this.dataArray[i];
            this.canvasContext.fillStyle = 'rgba(47, 152, 66, 0.2)';
            this.canvasContext.fillRect(i * width, this.canvas.height - barHeight , width, barHeight);
        }
    }
```


### DEMO地址 : https://caraws.github.io/IFE/IFE2017/Audio/index.html
