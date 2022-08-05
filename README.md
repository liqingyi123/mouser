# mouser

#### 介绍
鼠标特效库，简单几行代码就可实现华丽的鼠标拖尾特效

#### 安装教程
```js
<script src="js/mouser-lqy.min.js" type="text/javascript" charset="utf-8"></script>
// 或者
import 'js/mouser-lqy.min.js';

let mouserModel = 1, mouser;
mouser = new Mouser({
	drawType: mouserModel,
	leaveAutoer: false,
	showTime: 15,
	maxWidth: 8,
	minWidth: 8,
})
function changeMouser(){
	mouserModel = mouserModel === 1 ? 2 : 1;
	document.title = `Canvas绘制鼠标${mouserModel === 1 ? '线条' : '星星'}特效`;
	const option = mouserModel === 1 ? {
		drawType: mouserModel, //1彩色线条
		leaveAutoer: false, //鼠标移出后自动绘制 drawType为1时生效
		showTime: 15, //绘制的线条显示的时间 drawType为1时生效
		maxWidth: 8, //最大宽度 drawType为1时生效
		minWidth: 8, //最小宽度 drawType为1时生效
	} : {
		drawType: mouserModel, //1彩色线条 2星星
		color: '#F8EC85',//颜色 drawType为2时生效
	};
	mouser.changeModel(option);
}
```
