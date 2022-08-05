/**
 * 名称：鼠标拖尾特效集
 * 版本：2020081901
 * 作者：李青逸
 * Q Q：1787750205
 * 使用示例：
    new Mouser({
        drawType: 2, //1跳动的彩色线条 2亮晶晶
        leaveAutoer: false, //鼠标移出后自动绘制 drawType为1时生效
        showTime: 15, //绘制的线条显示的时间 drawType为1时生效
        maxWidth: 12, //最大宽度 drawType为1时生效
        minWidth: 6, //最小宽度 drawType为1时生效
        color: '#17F5D9',//颜色 drawType为2时生效
    })
 */
;(function (window, document) {
    var _this,defaults = {
        drawType: 1, //1跳动的彩色线条 2亮晶晶
		leaveAutoer: true, //鼠标移出后自动绘制 drawType为1时生效
        showTime: 20, //绘制的线条显示的时间 drawType为1时生效
        maxWidth: 20, //最大宽度 drawType为1时生效
        minWidth: 5, //最小宽度 drawType为1时生效
        color: '#F8EC85',//颜色 drawType为2时生效
	};
	var mouser = function (options) {
		this.options = Object.assign(defaults, options);
		this.init();
	};
	mouser.prototype = {
		init: function () {
			_this = this
            _this.createDom();
		},
        changeModel: function(option){
            this.options = Object.assign(this.options, option);
            document.getElementById("mouser-style").remove();
            document.getElementById("mouser").remove();
            this.createDom();
        },
        createDom: function(){
            //设置样式
            const cssStr = `body{width:100vw;min-height:100vh;padding:0;margin:0;}`;
            var style = document.createElement("style");
            style.type = "text/css";
            style.id = "mouser-style";
            style.innerHTML = cssStr;
            document.getElementsByTagName("head").item(0).appendChild(style);
            //创建画布
            var domCanvas = document.createElement("canvas");
            domCanvas.id = "mouser";
            domCanvas.style = "position: fixed;top: 0;left: 0;width: 100%;height: 100%;z-index: 999;pointer-events: none;";
            document.body.appendChild(domCanvas);
            // document.writeln(`<canvas id="mouser" style="position: fixed;top: 0;left: 0;width: 100%;height: 100%;z-index: 999;pointer-events: none;"></canvas>`);
            var canvas = document.getElementById("mouser")
            var ctx = canvas.getContext("2d");
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            canvas.clipContent = false;//当子项目的边界超出此容器时，显示子项目在此容器中。
            switch (_this.options.drawType){
                case 1://跳动的彩色线条
                    var body = [];
                    var mouse_pos_x = canvas.width / 2;
                    var mouse_pos_y = canvas.height / 2;
                    var delta = 1;
                    var step = 0;
                    var loop = 0;
                    var line = 0;
                    var lineMax = _this.options.maxWidth;
                    var lineMin = _this.options.minWidth;
                    var TWO_PI = 2 * Math.PI;
                    var t = 0;
                    var animate = true;
                    var op = 1;
                    var bodyLength = _this.options.showTime;
                    document.body.addEventListener('mouseleave',mouse_leave);
                    document.body.addEventListener('mousemove', mouse_track);
                    // canvas.addEventListener('mouseleave', mouse_leave);
                    // canvas.addEventListener('mousemove', mouse_track);
                    function mouse_leave() {
                        if (_this.options.leaveAutoer) {
                            animate = true;
                        } else{
                            animate = false;
                        }
                    }
                    function mouse_track(event) {
                        animate = false;
                        if ((Math.abs(mouse_pos_x - event.clientX) > delta) || (Math.abs(mouse_pos_y - event.clientY) > delta)) {
                            mouse_pos_x = event.clientX;
                            mouse_pos_y = event.clientY;
                        }
                    }
                    var red = [];
                    var grn = [];
                    var blu = [];
                    let center = 128;
                    let width = 127;
                    let frequency1 = 0.3;
                    let frequency2 = 0.3;
                    let frequency3 = 0.3;
                    let phase1 = 0;
                    let phase2 = 2;
                    let phase3 = 4;
                    for (let s = 0; s < bodyLength; s++) {
                        red[s] = Math.round(Math.sin(frequency1 * s + phase1) * width + center);
                        grn[s] = Math.round(Math.sin(frequency2 * s + phase2) * width + center);
                        blu[s] = Math.round(Math.sin(frequency3 * s + phase3) * width + center);
                    }
                    let size = Math.min(canvas.width, canvas.height) / 50;
                    //见下文
                    var startX = canvas.width / 2 + size * (16 * Math.sin(0) * Math.sin(0) * Math.sin(0));
                    var startY = canvas.height - (canvas.height / 2 + (size * (13 * Math.cos(0) - 5 * Math.cos(0) - 2 * Math.cos(0) - Math.cos(0))));
                    for (let i = 0; i < bodyLength; i++) {
                        var b = {
                            x: startX,
                            y: startY
                        };
                        body.push(b);
                    }
                    // 绘制
                    function draw() {
                        t += 0.08;
                        t = t % TWO_PI;
                        if (line <= lineMin) {
                            op = 1;
                            line = lineMin + 1;
                        }
                        if (line >= lineMax) {
                            op = -1;
                            line = lineMax - 1;
                        }
                        loop++;
                        if (loop == 5) {
                            step++;
                            step = step % bodyLength;
                            loop = 0;
                        }
                        line = op + line;
                        if (animate) {
                            size = Math.min(canvas.width, canvas.height) / 50;
                            //鼠标移出窗口时自动绘制心脏曲线
                            mouse_pos_x = canvas.width / 2 + size * (16 * Math.sin(t) * Math.sin(t) * Math.sin(t));
                            mouse_pos_y = canvas.height - (canvas.height / 2 + (size * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t))));
                        }
                        canvas.width = window.innerWidth;
                        canvas.height = window.innerHeight;
                        for (let i = (body.length - 1); i > 0; i--) {
                            body[i].x = body[i - 1].x;
                            body[i].y = body[i - 1].y;
                        }
                        body[0].x = mouse_pos_x;
                        body[0].y = mouse_pos_y;
                        ctx.lineWidth = line;
                        ctx.strokeStyle = "rgb(" + red[step] + "," + grn[step] + "," + blu[step] + ")";
                        ctx.fillStyle = "rgb(" + red[step] + "," + grn[step] + "," + blu[step] + ")";
                        //绘制前导圆
                        ctx.beginPath();
                        ctx.arc((body[0].x), (body[0].y), line / 2, 0, TWO_PI);
                        ctx.fill();
                        //绘制线
                        ctx.beginPath();
                        ctx.moveTo(body[0].x, body[0].y);
                        for (let s = 0; s < body.length - 2; s++) {
                            //贝塞尔曲线:
                            var xc = (body[s].x + body[s + 1].x) / 2;
                            var yc = (body[s].y + body[s + 1].y) / 2;
                            ctx.quadraticCurveTo(body[s].x, body[s].y, xc, yc);
                        }
                        ctx.stroke();
                        //绘制尾随圆
                        ctx.beginPath();
                        ctx.arc(xc, yc, line / 2, 0, TWO_PI);
                        ctx.fill();
                        window.requestAnimationFrame(draw);
                    }
                    window.requestAnimationFrame(draw);
                    break;
                case 2://亮晶晶
                    //设置画布自动宽高和请求动画
                    var Stage = function() {
                    	function t(t, n, i) {
                    		var e = this;
                    		this.renderList = [],
                            this.needClear = !0,
                            canvas.width = n || document.documentElement.clientWidth,
                            canvas.height = i || document.documentElement.clientHeight,
                            window.onresize = function() {
                                canvas.width = n || document.documentElement.clientWidth,
                                canvas.height = i || document.documentElement.clientHeight
                    		}
                    	}
                    	return window.requestAnimationFrame = function() {
                    		return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(t) {
                    			window.setTimeout(t, 1e3 / 60)
                    		}
                    	}(), t.prototype.update = function() {
                    		var t = this;
                    		t.needClear && ctx.clearRect(0, 0, canvas.width, canvas.height), t.renderList.forEach(function(n) {
                    			n(ctx, canvas)
                    		}), requestAnimationFrame(function() {
                    			t.update()
                    		})
                    	}, t.prototype.onUpdate = function(t) {
                    		this.renderList.push(t)
                    	}, t
                    }();;
                    //绘制
                    var Twinkle = function() {
                        //数据
                    	function t(t, e, a) {
                    		this.initSymbols(t, e, a), this.particles = [], this._pool = [], this.mouse = new s
                    	}
                        //控制移动
                    	function s(t, s) {
                    		this.x = t || 0, this.y = s || 0
                    	}
                        //放入亮晶
                    	function e(t, s, e) {
                    		this.color = n(t), this.size = 2 * (s + e);
                    		for(var a = 0, i = o.length; i > a; a++) this.push(this._createSymbol(o[a], s, e))
                    	}
                        //开始绘制
                    	function a(t, s, e, a, i, o) {
                    		this.init(t, s, e, a, i, o)
                    	}
                        //配置颜色
                    	function i(t, s, e, a, i) {
                    		return "rgba" === t ? "rgba(" + s + "," + e + "," + a + "," + i + ")" : "hsla" === t ? "hsla(" + s + "," + e + "%," + a + "%," + i + ")" : ""
                    	}
                    	if(!ctx) return $.noop;
                    	var o = [4, 6, 8, 10, 12],
                    		h = 2500;
                    	t.prototype = {
                    		mouse: null,
                    		gravity: .035,
                    		initSymbols: function(t, s, a) {
                    			this._symbols = new e(t, s, a)
                    		},
                            //生成随机的亮晶
                    		render: function(t) {
                    			var s, e, a, i, o, n, r, l, p, c, d, m, u, y, g, f = this.particles,
                    				v = this.mouse,
                    				b = this.gravity,
                    				M = this._symbols,
                    				x = this._symbols.length,
                    				_ = this._symbols.size,
                    				w = .5 * this._symbols.size,
                    				I = t.canvas.width,
                    				$ = t.canvas.height;
                    			if(s = Math.min(.005 * (v.speedX * v.speedX + v.speedY * v.speedY), 1), f.length < h)
                    				for(e = .5 + 4.5 * s, a = .1 + .5 * s, i = .5 + .5 * s, y = (3 * Math.random() | 0) + (20 * s | 0), u = 0; y > u; u++) this._createParticle(a, e, i);
                    			for(p = .5 * -I, c = 1.5 * I, d = .5 * -$, m = 1.5 * $, u = 0, y = f.length; y > u; u++) g = f[u], g.vx += .03 * v.speedX * s, g.vy += .03 * v.speedY * s + b, g.x += g.vx + v.speedX, g.y += g.vy + v.speedY, g.scale -= .005, g.angle += Math.random(), g.x + w < p || g.x - w > c || g.y + w < d || g.y - w > m || g.scale <= 0 ? (this._pool.push(g), f.splice(u, 1), y--, u--) : (l = g.scale, o = M[x * Math.random() | 0], Math.random() < .7 && (l *= .2), n = _ * l, r = .5 * n, t.save(), t.globalCompositeOperation = "lighter", t.translate(g.x, g.y), t.rotate(g.angle), t.drawImage(o, 0, 0, _, _, -r, -r, n, n), t.restore());
                    			t.fill(), v.speedX = v.speedY = 0
                    		},
                    		_createParticle: function(t, s, e) {
                    			var i = t + (s - t) * Math.random(),
                    				o = 2 * Math.PI * Math.random(),
                    				h = this._pool.length ? this._pool.shift() : new a;
                    			h.init(this.mouse.x, this.mouse.y, i * Math.cos(o), i * Math.sin(o), e * Math.random(), 2 * Math.PI * Math.random()), this.particles.push(h)
                    		}
                    	}, s.prototype = {
                    		x: 0,
                    		y: 0,
                    		speedX: 0,
                    		speedY: 0,
                    		update: function(t, s) {
                    			this.speedX = .7 * (this.x - t), this.speedY = .7 * (this.y - s), this.x = t, this.y = s
                    		}
                    	}, e.prototype = [], e.prototype._createSymbol = function(t, s, e) {
                    		var a, o, h = this.size,
                    			n = this.size / 2,
                    			r = this.color;
                    		a = document.createElement("canvas"), a.width = a.height = h, o = a.getContext("2d"), o.fillStyle = i(r[0], r[1], r[2], r[3], r[4]), o.shadowBlur = e, o.shadowColor = i(r[0], r[1], r[2], r[3], .75 * r[4]);
                    		var l, p, c, d;
                    		for(o.beginPath(), l = 1, p = 2 * t; p >= l; l++) c = l % 2 ? .1 * s : s, d = 2 * Math.PI * l / p, o[1 === l ? "moveTo" : "lineTo"](n + c * Math.cos(d), n + c * Math.sin(d));
                    		return o.fill(), a
                    	}, a.prototype.init = function(t, s, e, a, i, o) {
                    		this.x = t || 0, this.y = s || 0, this.vx = e || 0, this.vy = a || 0, this.scale = i || 0, this.angle = o || 0
                    	};
                    	var n = function() {
                    		var t = /^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/,
                    			s = /^rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d\.]+)\s*\)$/,
                    			e = /^hsl\(\s*([\d\.]+)\s*,\s*([\d\.]+)%\s*,\s*([\d\.]+)%\s*\)$/,
                    			a = /^hsla\(\s*([\d\.]+)\s*,\s*([\d\.]+)%\s*,\s*([\d\.]+)%\s*,\s*([\d\.]+)\s*\)$/,
                    			i = /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/;
                    		return function(o) {
                    			o = o.replace(/^\s*#|\s*$/g, ""), o = o.toLowerCase();
                    			var h;
                    			return(h = o.match(t) || o.match(s)) ? ["rgba", parseInt(h[1], 10), parseInt(h[2], 10), parseInt(h[3], 10), parseFloat(4 === h.length ? 1 : h[4])] : (h = o.match(e) || o.match(a)) ? ["hsla", parseFloat(h[1]), parseFloat(h[2]), parseFloat(h[3]), parseFloat(4 === h.length ? 1 : h[4])] : (3 === o.length && (o = o.replace(/(.)/g, "$1$1")), (h = o.match(i)) ? ["rgba", parseInt(h[1], 16), parseInt(h[2], 16), parseInt(h[3], 16), 1] : null)
                    		}
                    	}();
                    	return t
                    }();;
                    var Index = function() {
                    	var v = new Stage("mouser"),
                    		m = new Twinkle(_this.options.color, 14, 1);
                    	m.mouse.update(0, 0), document.body.addEventListener('mousemove',function(e){
                            // console.log(e.clientX, e.clientY)
                            m.mouse.update(e.clientX, e.clientY)
                    	}), v.onUpdate(function(e) {
                    		m.render(e)
                    	}), v.update();
                    }();
                    break;
                default:
                    break;
            }
        }
	};
	window.Mouser = mouser;
})(window, document);
