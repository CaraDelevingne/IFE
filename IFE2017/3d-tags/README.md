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
θ = acos((2 * (index + 1) - 1) / length - 1)
// n 取 Math.PI
ø = θ * sqrt(length * n)
```
### 关键代码
```javascript
const setBall = _ => {
　// 标签
　let tagLabel = document.querySelector('.tag');
　for (let i =0, len = tagLabel.length; i < len; i++) {
	let k = (2 * (i + 1) - 1) / len - 1,
	　a = acos(k),
	　b = a * sqrt(len * Math.PI),
	　x = radius * Math.sin(a) * Math.cos(b),
	　y = radius * Math.sin(a) * Math.sin(b),
	　z = radius * Math.cos(a);
	}
}
```
未完待续

17-10-8 By Cara

[demo](https://caraws.github.io/IFE/IFE2017/3d-tags/index.html)