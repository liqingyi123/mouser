# mouser

#### 介绍
鼠标特效库，简单几行代码就可实现华丽的鼠标拖尾特效

#### 菜单（改变drawType）
1. 跳动的彩色线条
2. 金闪闪
3. 大数据专用
4. 街头涂鸦
5. 连线点阵

#### 火候及调料
| 字段 | 默认值 | 说明 |
|:---:|:---:|:---|
| drawType | 1 | 特效选择<br>1 跳动的彩色线条<br>2 金闪闪<br>3 大数据专用<br>4 街头涂鸦<br>5 连线点阵 |
| leaveAutoer | true | 鼠标移出后自动绘制(drawType为1时生效) |
| showTime | 20 | 绘制的线条显示的时间(drawType为1时生效) |
| maxWidth | 20 | 最大宽度(drawType为1时生效) |
| minWidth | 5 | 最小宽度(drawType为1时生效) |
| color | 2默认值#F8EC85<br>5默认值#A5FBFF | 星星的颜色(drawType为2和5时生效) |
| dotColor | #9CD9F9 | 点的颜色(drawType为3时生效) |
| lineColor | #9CD9F9 | 线的颜色(drawType为3时生效) |
| number | 8000 | 点的数量(drawType为时生效) |

#### 烹调方式
```js
<script src="js/mouser-lqy.min.js" type="text/javascript" charset="utf-8"></script>
// 或者
import 'js/mouser-lqy.min.js';

let mouserModel = 1, mouser;
const mouseModels = {
    1: {
        title: '彩色线条',
        options: {
            leaveAutoer: false,
            showTime: 20,
            maxWidth: 12,
            minWidth: 4,
        }
    },
    2: {
        title: '金闪闪',
        options: {
            color: '#F8EC85',
        }
    },
    3: {
        title: '大数据',
        options: {
            dotColor: '#F22323',
            lineColor: '#F2EC23'
        }
    },
    4: {
        title: '街头涂鸦',
        options: {}
    },
    5: {
        title: '连线点阵',
        options: {
            color: '#FFF300',
            number: 10000
        }
    }
}
mouser = new Mouser({
    ...{
        drawType: mouserModel
    },
    ...mouseModels[mouserModel].options
});
function changeMouser(type) {
    mouserModel = type;
    document.title = `Canvas绘制鼠标${mouseModels[mouserModel].title}特效`;
    mouser.changeModel({
        ...{
            drawType: mouserModel
        },
        ...mouseModels[mouserModel].options
    });
}
```

#### 效果
!['跳动的彩色线条'](https://www.weblqy.top/work/mdStatic/mouser/1.jpg '跳动的彩色线条')
!['金闪闪'](https://www.weblqy.top/work/mdStatic/mouser/2.jpg '金闪闪')
!['大数据专用'](https://www.weblqy.top/work/mdStatic/mouser/3.jpg '大数据专用')
!['街头涂鸦'](https://www.weblqy.top/work/mdStatic/mouser/4.jpg '街头涂鸦')
!['连线点阵'](https://www.weblqy.top/work/mdStatic/mouser/5.jpg '连线点阵')
