class Analyser {
    constructor(element, audio) {
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
        this.dataArray = new Uint8Array(bufferLength);
        this.draw();
    }

    draw() {
        //执行动画
        requestAnimationFrame(this.draw.bind(this));
        //将音频节点的数据拷贝到Uin8Array中
        this.analyser.getByteFrequencyData(this.dataArray);
        let length = this.analyser.fftSize / 3;
        //数组长度与画布宽度比例:平分
        let width = this.canvas.width / length;
        this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let i = 0; i < length; i++) {
            let barHeight = this.dataArray[i];
            this.canvasContext.fillStyle = 'rgba(47, 152, 66, 0.2)';
            this.canvasContext.fillRect(i * width, this.canvas.height - barHeight, width, barHeight);

        }
    }
}