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
;
(function(window, document) {
    let _this, defaults = {
        drawType: 1, //1跳动的彩色线条 2亮晶晶
        leaveAutoer: true, //鼠标移出后自动绘制 drawType为1时生效
        showTime: 20, //绘制的线条显示的时间 drawType为1时生效
        maxWidth: 20, //最大宽度 drawType为1时生效
        minWidth: 5, //最小宽度 drawType为1时生效
        color: '#F8EC85', //颜色 drawType为2时生效
    };
    let width = window.innerWidth,
        height = window.innerHeight;
    let mouser = function(options) {
        _this = this;
        _this.options = Object.assign(defaults, options);
        _this.init();
    };
    mouser.prototype = {
        changeModel: function(option) {
            _this.options = Object.assign(_this.options, option);
            document.getElementById("mouser-style").remove();
            document.getElementById("mouser").remove();
            _this.init();
        },
        init: function() {
            //设置样式
            const cssStr = `body{width:100vw;min-height:100vh;padding:0;margin:0;}`;
            let style = document.createElement("style");
            style.type = "text/css";
            style.id = "mouser-style";
            style.innerHTML = cssStr;
            document.getElementsByTagName("head").item(0).appendChild(style);
            //创建画布
            if(_this.options.drawType === 4){
                let domSvgBox = document.createElement("div");
                domSvgBox.id = 'mouser';
                domSvgBox.style = 'position: fixed; top: 0px; left: 0px; width: 100vw; height: 100vh; z-index: 2147483647; pointer-events: none;';
                domSvgBox.innerHTML = `<svg id="stage" width="1920" height="1080" xmlns="http://www.w3.org/2000/svg"></svg>`;
                document.body.appendChild(domSvgBox);
            }else{
                let domCanvas = document.createElement("canvas");
                domCanvas.id = "mouser";
                domCanvas.style =
                    "position: fixed;top: 0;left: 0;width: 100%;height: 100%;z-index: 999;pointer-events: none;";
                document.body.appendChild(domCanvas);
                // document.writeln(`<canvas id="mouser" style="position: fixed;top: 0;left: 0;width: 100%;height: 100%;z-index: 999;pointer-events: none;"></canvas>`);
                var canvas = document.getElementById("mouser")
                var ctx = canvas.getContext("2d");
                canvas.width = width;
                canvas.height = height;
                canvas.clipContent = false; //当子项目的边界超出此容器时，显示子项目在此容器中。
                function resize() {
                    width = window.innerWidth;
                    height = window.innerHeight;
                    canvas.width = width;
                    canvas.height = height;
                }
                window.addEventListener('resize', resize);
            }
            switch (_this.options.drawType) {
                case 1: //跳动的彩色线条
                    let body = [];
                    let mouse_pos_x = canvas.width / 2;
                    let mouse_pos_y = canvas.height / 2;
                    let delta = 1;
                    let step = 0;
                    let loop = 0;
                    let line = 0;
                    let lineMax = _this.options.maxWidth;
                    let lineMin = _this.options.minWidth;
                    let TWO_PI = 2 * Math.PI;
                    let t = 0;
                    let animate = true;
                    let op = 1;
                    let bodyLength = _this.options.showTime;
                    document.body.addEventListener('mouseleave', mouse_leave);
                    document.body.addEventListener('mousemove', mouse_track);
                    // canvas.addEventListener('mouseleave', mouse_leave);
                    // canvas.addEventListener('mousemove', mouse_track);
                    function mouse_leave() {
                        if (_this.options.leaveAutoer) {
                            animate = true;
                        } else {
                            animate = false;
                        }
                    }

                    function mouse_track(event) {
                        animate = false;
                        if ((Math.abs(mouse_pos_x - event.clientX) > delta) || (Math.abs(mouse_pos_y - event
                                .clientY) > delta)) {
                            mouse_pos_x = event.clientX;
                            mouse_pos_y = event.clientY;
                        }
                    }
                    let red = [];
                    let grn = [];
                    let blu = [];
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
                    let startX = canvas.width / 2 + size * (16 * Math.sin(0) * Math.sin(0) * Math.sin(0));
                    let startY = canvas.height - (canvas.height / 2 + (size * (13 * Math.cos(0) - 5 * Math
                        .cos(0) - 2 * Math.cos(0) - Math.cos(0))));
                    for (let i = 0; i < bodyLength; i++) {
                        let b = {
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
                            mouse_pos_x = canvas.width / 2 + size * (16 * Math.sin(t) * Math.sin(t) * Math
                                .sin(t));
                            mouse_pos_y = canvas.height - (canvas.height / 2 + (size * (13 * Math.cos(t) -
                                5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t))));
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
                case 2: //亮晶晶
                    //设置画布自动宽高和请求动画
                    let Stage = function() {
                        function t(t, n, i) {
                            let e = this;
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
                            return window.requestAnimationFrame || window
                                .webkitRequestAnimationFrame || window.mozRequestAnimationFrame ||
                                window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
                                function(t) {
                                    window.setTimeout(t, 1e3 / 60)
                                }
                        }(), t.prototype.update = function() {
                            let t = this;
                            t.needClear && ctx.clearRect(0, 0, canvas.width, canvas.height), t
                                .renderList.forEach(function(n) {
                                    n(ctx, canvas)
                                }), requestAnimationFrame(function() {
                                    t.update()
                                })
                        }, t.prototype.onUpdate = function(t) {
                            this.renderList.push(t)
                        }, t
                    }();;
                    //绘制
                    let Twinkle = function() {
                        //数据
                        function t(t, e, a) {
                            this.initSymbols(t, e, a), this.particles = [], this._pool = [], this
                                .mouse = new s
                        }
                        //控制移动
                        function s(t, s) {
                            this.x = t || 0, this.y = s || 0
                        }
                        //放入亮晶
                        function e(t, s, e) {
                            this.color = n(t), this.size = 2 * (s + e);
                            for (let a = 0, i = o.length; i > a; a++) this.push(this._createSymbol(o[a],
                                s, e))
                        }
                        //开始绘制
                        function a(t, s, e, a, i, o) {
                            this.init(t, s, e, a, i, o)
                        }
                        //配置颜色
                        function i(t, s, e, a, i) {
                            return "rgba" === t ? "rgba(" + s + "," + e + "," + a + "," + i + ")" :
                                "hsla" === t ? "hsla(" + s + "," + e + "%," + a + "%," + i + ")" : ""
                        }
                        if (!ctx) return $.noop;
                        let o = [4, 6, 8, 10, 12],
                            h = 2500;
                        t.prototype = {
                            mouse: null,
                            gravity: .035,
                            initSymbols: function(t, s, a) {
                                this._symbols = new e(t, s, a)
                            },
                            //生成随机的亮晶
                            render: function(t) {
                                let s, e, a, i, o, n, r, l, p, c, d, m, u, y, g, f = this
                                    .particles,
                                    v = this.mouse,
                                    b = this.gravity,
                                    M = this._symbols,
                                    x = this._symbols.length,
                                    _ = this._symbols.size,
                                    w = .5 * this._symbols.size,
                                    I = t.canvas.width,
                                    $ = t.canvas.height;
                                if (s = Math.min(.005 * (v.speedX * v.speedX + v.speedY * v
                                        .speedY), 1), f.length < h)
                                    for (e = .5 + 4.5 * s, a = .1 + .5 * s, i = .5 + .5 * s, y =
                                        (3 * Math.random() | 0) + (20 * s | 0), u = 0; y >
                                        u; u++) this._createParticle(a, e, i);
                                for (p = .5 * -I, c = 1.5 * I, d = .5 * -$, m = 1.5 * $, u = 0,
                                    y = f.length; y > u; u++) g = f[u], g.vx += .03 * v.speedX *
                                    s, g.vy += .03 * v.speedY * s + b, g.x += g.vx + v.speedX, g
                                    .y += g.vy + v.speedY, g.scale -= .005, g.angle += Math
                                    .random(), g.x + w < p || g.x - w > c || g.y + w < d || g
                                    .y - w > m || g.scale <= 0 ? (this._pool.push(g), f.splice(
                                        u, 1), y--, u--) : (l = g.scale, o = M[x * Math
                                            .random() | 0], Math.random() < .7 && (l *= .2), n =
                                        _ *
                                        l, r = .5 * n, t.save(), t.globalCompositeOperation =
                                        "lighter", t.translate(g.x, g.y), t.rotate(g.angle), t
                                        .drawImage(o, 0, 0, _, _, -r, -r, n, n), t.restore());
                                t.fill(), v.speedX = v.speedY = 0
                            },
                            _createParticle: function(t, s, e) {
                                let i = t + (s - t) * Math.random(),
                                    o = 2 * Math.PI * Math.random(),
                                    h = this._pool.length ? this._pool.shift() : new a;
                                h.init(this.mouse.x, this.mouse.y, i * Math.cos(o), i * Math
                                    .sin(o), e * Math.random(), 2 * Math.PI * Math.random()
                                ), this.particles.push(h)
                            }
                        }, s.prototype = {
                            x: 0,
                            y: 0,
                            speedX: 0,
                            speedY: 0,
                            update: function(t, s) {
                                this.speedX = .7 * (this.x - t), this.speedY = .7 * (this.y -
                                    s), this.x = t, this.y = s
                            }
                        }, e.prototype = [], e.prototype._createSymbol = function(t, s, e) {
                            let a, o, h = this.size,
                                n = this.size / 2,
                                r = this.color;
                            a = document.createElement("canvas"), a.width = a.height = h, o = a
                                .getContext("2d"), o.fillStyle = i(r[0], r[1], r[2], r[3], r[4]), o
                                .shadowBlur = e, o.shadowColor = i(r[0], r[1], r[2], r[3], .75 * r[
                                    4]);
                            let l, p, c, d;
                            for (o.beginPath(), l = 1, p = 2 * t; p >= l; l++) c = l % 2 ? .1 * s :
                                s, d = 2 * Math.PI * l / p, o[1 === l ? "moveTo" : "lineTo"](n + c *
                                    Math.cos(d), n + c * Math.sin(d));
                            return o.fill(), a
                        }, a.prototype.init = function(t, s, e, a, i, o) {
                            this.x = t || 0, this.y = s || 0, this.vx = e || 0, this.vy = a || 0,
                                this.scale = i || 0, this.angle = o || 0
                        };
                        let n = function() {
                            let t = /^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/,
                                s = /^rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d\.]+)\s*\)$/,
                                e = /^hsl\(\s*([\d\.]+)\s*,\s*([\d\.]+)%\s*,\s*([\d\.]+)%\s*\)$/,
                                a =
                                /^hsla\(\s*([\d\.]+)\s*,\s*([\d\.]+)%\s*,\s*([\d\.]+)%\s*,\s*([\d\.]+)\s*\)$/,
                                i = /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/;
                            return function(o) {
                                o = o.replace(/^\s*#|\s*$/g, ""), o = o.toLowerCase();
                                let h;
                                return (h = o.match(t) || o.match(s)) ? ["rgba", parseInt(h[1],
                                        10), parseInt(h[2], 10), parseInt(h[3], 10),
                                    parseFloat(4 === h.length ? 1 : h[4])
                                ] : (h = o.match(e) || o.match(a)) ? ["hsla", parseFloat(h[
                                    1]), parseFloat(h[2]), parseFloat(h[3]), parseFloat(
                                    4 === h.length ? 1 : h[4])] : (3 === o.length && (o = o
                                    .replace(/(.)/g, "$1$1")), (h = o.match(i)) ? [
                                    "rgba", parseInt(h[1], 16), parseInt(h[2], 16),
                                    parseInt(h[3], 16), 1
                                ] : null)
                            }
                        }();
                        return t
                    }();;
                    let Index = function() {
                        let v = new Stage("mouser"),
                            m = new Twinkle(_this.options.color, 14, 1);
                        m.mouse.update(0, 0), document.body.addEventListener('mousemove', function(e) {
                            // console.log(e.clientX, e.clientY)
                            m.mouse.update(e.clientX, e.clientY)
                        }), v.onUpdate(function(e) {
                            m.render(e)
                        }), v.update();
                    }();
                    break;
                case 3:
                    let largeHeader, points, target, animateHeader = true;
                    import('./mouser-spt/TweenLite.min.js').then(() => {
                        import('./mouser-spt/EasePack.min.js').then(() => {
                            initHeader();
                            initAnimation();
                            addListeners();
                            function initHeader() {
                                target = {
                                    x: canvas.width / 2,
                                    y: canvas.height / 2
                                };
                                // create points
                                points = [];
                                for (let x = 0; x < canvas.width; x = x + canvas.width / 20) {
                                    for (let y = 0; y < canvas.height; y = y + canvas.height / 20) {
                                        let px = x + Math.random() * canvas.width / 20;
                                        let py = y + Math.random() * canvas.height / 20;
                                        let p = {
                                            x: px,
                                            originX: px,
                                            y: py,
                                            originY: py
                                        };
                                        points.push(p);
                                    }
                                }
                                // for each point find the 5 closest points
                                for (let i = 0; i < points.length; i++) {
                                    let closest = [];
                                    let p1 = points[i];
                                    for (let j = 0; j < points.length; j++) {
                                        let p2 = points[j]
                                        if (!(p1 == p2)) {
                                            let placed = false;
                                            for (let k = 0; k < 5; k++) {
                                                if (!placed) {
                                                    if (closest[k] == undefined) {
                                                        closest[k] = p2;
                                                        placed = true;
                                                    }
                                                }
                                            }
                                            for (let k = 0; k < 5; k++) {
                                                if (!placed) {
                                                    if (getDistance(p1, p2) < getDistance(
                                                            p1, closest[k])) {
                                                        closest[k] = p2;
                                                        placed = true;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    p1.closest = closest;
                                }
                                // assign a circle to each point
                                for (let i in points) {
                                    let c = new Circle(points[i], 2 + Math.random() * 2,
                                        'rgba(255,255,255,0.3)');
                                    points[i].circle = c;
                                }
                            }
                            // Event handling
                            function addListeners() {
                                if (!('ontouchstart' in window)) {
                                    window.addEventListener('mousemove', mouseMove);
                                }
                                window.addEventListener('scroll', scrollCheck);
                                // window.addEventListener('resize', ()=>{
                                //     initHeader();
                                //     initAnimation();
                                //     addListeners();
                                // });
                            }
                            function mouseMove(e) {
                                let posx = 0, posy = 0;
                                if (e.pageX || e.pageY) {
                                    posx = e.pageX;
                                    posy = e.pageY;
                                } else if (e.clientX || e.clientY) {
                                    posx = e.clientX + document.body.scrollLeft + document
                                        .documentElement.scrollLeft;
                                    posy = e.clientY + document.body.scrollTop + document
                                        .documentElement.scrollTop;
                                }
                                target.x = posx;
                                target.y = posy;
                            }
                            function scrollCheck() {
                                if (document.body.scrollTop > height) animateHeader = false;
                                else animateHeader = true;
                            }

                            // animation
                            function initAnimation() {
                                animate3();
                                for (var i in points) {
                                    shiftPoint(points[i]);
                                }
                            }
                            function animate3() {
                                if (animateHeader) {
                                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                                    for (var i in points) {
                                        // detect points in range
                                        if (Math.abs(getDistance(target, points[i])) <
                                            4000) {
                                            points[i].active = 0.3;
                                            points[i].circle.active = 0.6;
                                        } else if (Math.abs(getDistance(target, points[
                                            i])) < 20000) {
                                            points[i].active = 0.1;
                                            points[i].circle.active = 0.3;
                                        } else if (Math.abs(getDistance(target, points[
                                            i])) < 40000) {
                                            points[i].active = 0.02;
                                            points[i].circle.active = 0.1;
                                        } else {
                                            points[i].active = 0;
                                            points[i].circle.active = 0;
                                        }
                                        drawLines(points[i]);
                                        points[i].circle.draw();
                                    }
                                }
                                requestAnimationFrame(animate3);
                            }
                            function shiftPoint(p) {
                                TweenLite.to(p, 1 + 1 * Math.random(), {
                                    x: p.originX - 50 + Math.random() * 100,
                                    y: p.originY - 50 + Math.random() * 100,
                                    ease: Circ.easeInOut,
                                    onComplete: function() {
                                        shiftPoint(p);
                                    }
                                });
                            }
                            // Canvas manipulation
                            function drawLines(p) {
                                if (!p.active) return;
                                for (let i in p.closest) {
                                    ctx.beginPath();
                                    ctx.moveTo(p.x, p.y);
                                    ctx.lineTo(p.closest[i].x, p.closest[i].y);
                                    ctx.strokeStyle = 'rgba(156,217,249,' + p.active + ')';
                                    ctx.stroke();
                                }
                            }
                            function Circle(pos, rad, color) {
                                let _this = this;
                                // constructor
                                (function() {
                                    _this.pos = pos || null;
                                    _this.radius = rad || null;
                                    _this.color = color || null;
                                })();
                                this.draw = function() {
                                    if (!_this.active) return;
                                    ctx.beginPath();
                                    ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0,
                                        2 * Math.PI, false);
                                    ctx.fillStyle = 'rgba(156,217,249,' + _this.active +
                                        ')';
                                    ctx.fill();
                                };
                            }
                            // Util
                            function getDistance(p1, p2) {
                                return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
                            }
                        })
                    })
                    break;
                case 4:
                    import('./mouser-spt/TweenMax.min.js').then(() => {
                        import('./mouser-spt/Rx.min.js').then(() => {
                            let App = /** @class */ (function () {
                                function App(container) {
                                    let _this = this;
                                    this.width = 600;
                                    this.height = 600;
                                    this.followers = [];
                                    this.colors = ['red', 'blue', 'green', 'yellow', 'white'];
                                    this.previewMode = false;
                                    this.record = false;
                                    this.recording = [];
                                    console.log('APP STARTED');
                                    this.previewMode = location.pathname.match(/fullcpgrid/i);
                                    this.container = container;
                                    this.svg = document.getElementById('stage');
                                    window.addEventListener('resize', function () { return _this.onResize(); });
                                    this.onResize();
                                    this.colors.map(function (color) { return _this.followers.push(new Follower(_this.svg, color)); });
                                    let input = new Input(this.container);
                                    input.starts.subscribe(function () {
                                        _this.recording = [];
                                        _this.record = true;
                                    });
                                    input.ends.subscribe(function () {
                                        _this.record = false;
                                        console.clear();
                                        console.log(JSON.stringify(_this.recording));
                                    });
                                    input.moves.distinctUntilChanged(function (a, b) { return a.x == b.x && a.y == b.y; }).subscribe(function (position) {
                                        if (_this.autoMouse)
                                            _this.autoMouse.unsubscribe();
                                        _this.followers.map(function (follower) { return follower.add(position); });
                                        if (_this.record) {
                                            _this.recording.push({
                                                x: (position.x / _this.width) * 100,
                                                y: (position.y / _this.height) * 100
                                            });
                                        }
                                    });
                                    let path = [{ "x": 48.47222222222222, "y": 50.30581039755352 }, { "x": 48.19444444444444, "y": 51.52905198776758 }, { "x": 47.5, "y": 53.36391437308868 }, { "x": 46.111111111111114, "y": 55.35168195718655 }, { "x": 44.375, "y": 56.574923547400616 }, { "x": 42.36111111111111, "y": 57.3394495412844 }, { "x": 40.13888888888889, "y": 57.3394495412844 }, { "x": 38.54166666666667, "y": 57.3394495412844 }, { "x": 36.52777777777778, "y": 53.97553516819572 }, { "x": 36.18055555555556, "y": 52.90519877675841 }, { "x": 35.34722222222222, "y": 47.55351681957187 }, { "x": 35.27777777777778, "y": 42.813455657492355 }, { "x": 35.27777777777778, "y": 38.379204892966364 }, { "x": 35.97222222222222, "y": 34.25076452599388 }, { "x": 37.15277777777778, "y": 30.886850152905197 }, { "x": 38.47222222222222, "y": 27.981651376146786 }, { "x": 40, "y": 26.452599388379205 }, { "x": 41.388888888888886, "y": 25.840978593272173 }, { "x": 42.77777777777778, "y": 25.840978593272173 }, { "x": 43.81944444444444, "y": 25.993883792048926 }, { "x": 44.79166666666667, "y": 27.675840978593275 }, { "x": 45.69444444444444, "y": 29.66360856269113 }, { "x": 46.736111111111114, "y": 32.56880733944954 }, { "x": 47.77777777777778, "y": 36.23853211009174 }, { "x": 48.95833333333333, "y": 40.36697247706422 }, { "x": 50.416666666666664, "y": 44.64831804281346 }, { "x": 52.361111111111114, "y": 48.62385321100918 }, { "x": 54.37499999999999, "y": 51.52905198776758 }, { "x": 56.52777777777778, "y": 53.36391437308868 }, { "x": 59.02777777777778, "y": 53.97553516819572 }, { "x": 61.458333333333336, "y": 53.97553516819572 }, { "x": 63.61111111111111, "y": 53.21100917431193 }, { "x": 65.76388888888889, "y": 51.52905198776758 }, { "x": 67.84722222222223, "y": 49.38837920489297 }, { "x": 69.51388888888889, "y": 47.24770642201835 }, { "x": 70.625, "y": 45.412844036697244 }, { "x": 71.38888888888889, "y": 42.96636085626911 }, { "x": 71.66666666666667, "y": 39.908256880733944 }, { "x": 71.66666666666667, "y": 36.54434250764526 }, { "x": 70.90277777777779, "y": 32.87461773700306 }, { "x": 68.54166666666667, "y": 26.605504587155966 }, { "x": 66.52777777777777, "y": 23.24159021406728 }, { "x": 64.86111111111111, "y": 21.253822629969417 }, { "x": 63.19444444444444, "y": 20.18348623853211 }, { "x": 61.38888888888889, "y": 20.03058103975535 }, { "x": 59.72222222222222, "y": 20.03058103975535 }, { "x": 58.54166666666667, "y": 20.948012232415902 }, { "x": 57.291666666666664, "y": 23.08868501529052 }, { "x": 55.90277777777778, "y": 25.993883792048926 }, { "x": 54.23611111111111, "y": 29.81651376146789 }, { "x": 51.24999999999999, "y": 36.391437308868504 }, { "x": 48.26388888888889, "y": 42.04892966360856 }, { "x": 44.30555555555556, "y": 48.62385321100918 }, { "x": 39.58333333333333, "y": 54.58715596330275 }, { "x": 34.236111111111114, "y": 59.63302752293578 }, { "x": 28.888888888888886, "y": 62.99694189602446 }, { "x": 25.27777777777778, "y": 64.83180428134557 }, { "x": 21.041666666666668, "y": 65.29051987767585 }, { "x": 17.77777777777778, "y": 65.29051987767585 }, { "x": 15.208333333333332, "y": 64.6788990825688 }, { "x": 12.291666666666666, "y": 60.85626911314985 }, { "x": 10, "y": 55.5045871559633 }, { "x": 8.194444444444445, "y": 48.47094801223242 }, { "x": 7.222222222222221, "y": 42.354740061162076 }, { "x": 6.805555555555555, "y": 34.25076452599388 }, { "x": 6.805555555555555, "y": 27.82874617737003 }, { "x": 7.569444444444444, "y": 22.32415902140673 }, { "x": 8.055555555555555, "y": 21.100917431192663 }, { "x": 11.597222222222223, "y": 16.819571865443425 }, { "x": 14.86111111111111, "y": 15.29051987767584 }, { "x": 19.65277777777778, "y": 14.220183486238533 }, { "x": 23.26388888888889, "y": 14.220183486238533 }, { "x": 27.083333333333332, "y": 15.443425076452598 }, { "x": 29.72222222222222, "y": 18.04281345565749 }, { "x": 31.944444444444443, "y": 21.55963302752294 }, { "x": 34.375, "y": 27.981651376146786 }, { "x": 35.97222222222222, "y": 32.87461773700306 }, { "x": 37.708333333333336, "y": 38.99082568807339 }, { "x": 39.44444444444444, "y": 44.64831804281346 }, { "x": 41.11111111111111, "y": 49.08256880733945 }, { "x": 42.77777777777778, "y": 52.293577981651374 }, { "x": 45, "y": 54.74006116207951 }, { "x": 47.291666666666664, "y": 56.574923547400616 }, { "x": 50.27777777777778, "y": 57.49235474006116 }, { "x": 54.93055555555556, "y": 58.103975535168196 }, { "x": 57.08333333333333, "y": 58.103975535168196 }, { "x": 60.34722222222222, "y": 56.42201834862385 }, { "x": 63.125, "y": 53.669724770642205 }, { "x": 66.11111111111111, "y": 50.764525993883794 }, { "x": 68.61111111111111, "y": 48.62385321100918 }, { "x": 70.90277777777779, "y": 47.24770642201835 }, { "x": 73.125, "y": 46.788990825688074 }, { "x": 75.20833333333333, "y": 46.788990825688074 }, { "x": 77.22222222222223, "y": 46.788990825688074 }, { "x": 79.09722222222221, "y": 47.55351681957187 }, { "x": 80.83333333333333, "y": 48.62385321100918 }, { "x": 83.61111111111111, "y": 49.84709480122324 }, { "x": 84.44444444444444, "y": 50 }, { "x": 86.875, "y": 50 }, { "x": 88.33333333333333, "y": 48.1651376146789 }, { "x": 89.44444444444444, "y": 45.718654434250766 }, { "x": 90.13888888888889, "y": 43.27217125382263 }, { "x": 90.34722222222223, "y": 39.908256880733944 }, { "x": 90.34722222222223, "y": 34.09785932721712 }, { "x": 89.58333333333334, "y": 30.275229357798167 }, { "x": 87.63888888888889, "y": 25.382262996941897 }, { "x": 85.41666666666666, "y": 21.712538226299692 }, { "x": 83.19444444444444, "y": 19.418960244648318 }, { "x": 80.83333333333333, "y": 18.04281345565749 }, { "x": 78.68055555555556, "y": 17.584097859327215 }, { "x": 77.01388888888889, "y": 17.584097859327215 }, { "x": 75.34722222222221, "y": 17.584097859327215 }, { "x": 74.02777777777779, "y": 18.501529051987767 }, { "x": 72.63888888888889, "y": 20.642201834862387 }, { "x": 71.04166666666667, "y": 24.159021406727827 }, { "x": 69.375, "y": 28.440366972477065 }, { "x": 67.56944444444444, "y": 33.63914373088685 }, { "x": 65.83333333333333, "y": 38.07339449541284 }, { "x": 63.95833333333333, "y": 41.437308868501525 }, { "x": 61.736111111111114, "y": 43.883792048929664 }, { "x": 59.65277777777778, "y": 44.95412844036697 }, { "x": 57.291666666666664, "y": 45.25993883792049 }, { "x": 55.34722222222223, "y": 44.342507645259936 }, { "x": 53.333333333333336, "y": 42.04892966360856 }, { "x": 51.24999999999999, "y": 39.296636085626915 }, { "x": 48.95833333333333, "y": 36.69724770642202 }, { "x": 45.69444444444444, "y": 34.70948012232416 }, { "x": 44.44444444444444, "y": 34.70948012232416 }, { "x": 40.13888888888889, "y": 34.70948012232416 }, { "x": 37.84722222222222, "y": 36.850152905198776 }, { "x": 35.55555555555556, "y": 39.60244648318042 }, { "x": 33.05555555555556, "y": 43.425076452599384 }, { "x": 30.625000000000004, "y": 47.09480122324159 }, { "x": 26.805555555555554, "y": 52.752293577981646 }, { "x": 24.65277777777778, "y": 55.81039755351682 }, { "x": 22.15277777777778, "y": 58.86850152905198 }, { "x": 19.86111111111111, "y": 61.773700305810394 }, { "x": 18.194444444444443, "y": 63.76146788990825 }, { "x": 16.59722222222222, "y": 65.13761467889908 }, { "x": 14.791666666666666, "y": 65.90214067278288 }, { "x": 13.333333333333334, "y": 66.05504587155964 }, { "x": 12.083333333333334, "y": 65.90214067278288 }, { "x": 11.180555555555555, "y": 63.91437308868502 }, { "x": 10.694444444444445, "y": 61.92660550458715 }, { "x": 10.277777777777777, "y": 59.48012232415903 }, { "x": 10.069444444444445, "y": 56.88073394495413 }, { "x": 10.069444444444445, "y": 54.58715596330275 }, { "x": 10.902777777777779, "y": 48.92966360856269 }, { "x": 12.986111111111112, "y": 42.04892966360856 }, { "x": 15.069444444444443, "y": 37.308868501529055 }, { "x": 17.77777777777778, "y": 32.11009174311927 }, { "x": 20.34722222222222, "y": 28.899082568807337 }, { "x": 24.375, "y": 27.217125382262996 }, { "x": 27.98611111111111, "y": 27.217125382262996 }, { "x": 31.11111111111111, "y": 27.217125382262996 }, { "x": 34.791666666666664, "y": 28.899082568807337 }, { "x": 37.916666666666664, "y": 31.65137614678899 }, { "x": 39.09722222222222, "y": 33.79204892966361 }, { "x": 40, "y": 36.54434250764526 }, { "x": 40.763888888888886, "y": 40.0611620795107 }, { "x": 42.36111111111111, "y": 46.330275229357795 }, { "x": 44.583333333333336, "y": 53.36391437308868 }, { "x": 46.31944444444444, "y": 57.645259938837924 }, { "x": 48.26388888888889, "y": 61.31498470948012 }, { "x": 50.55555555555556, "y": 63.149847094801224 }, { "x": 52.84722222222222, "y": 63.455657492354746 }, { "x": 55.27777777777778, "y": 63.455657492354746 }, { "x": 58.05555555555556, "y": 61.16207951070336 }, { "x": 60.69444444444444, "y": 59.021406727828754 }, { "x": 62.916666666666664, "y": 56.88073394495413 }, { "x": 64.93055555555556, "y": 54.58715596330275 }, { "x": 66.31944444444444, "y": 52.44648318042814 }, { "x": 66.875, "y": 50.917431192660544 }, { "x": 67.43055555555556, "y": 48.62385321100918 }, { "x": 67.70833333333334, "y": 46.330275229357795 }, { "x": 67.70833333333334, "y": 44.64831804281346 }, { "x": 67.5, "y": 43.27217125382263 }, { "x": 66.80555555555556, "y": 41.74311926605505 }, { "x": 65.97222222222221, "y": 40.825688073394495 }, { "x": 65.48611111111111, "y": 40.67278287461774 }, { "x": 64.65277777777779, "y": 40.36697247706422 }, { "x": 64.02777777777777, "y": 40.214067278287466 }, { "x": 63.05555555555556, "y": 40.214067278287466 }, { "x": 62.01388888888889, "y": 40.214067278287466 }, { "x": 61.458333333333336, "y": 40.51987767584097 }, { "x": 60.27777777777777, "y": 41.13149847094802 }, { "x": 59.09722222222222, "y": 42.04892966360856 }, { "x": 58.12500000000001, "y": 42.813455657492355 }, { "x": 57.22222222222222, "y": 43.730886850152906 }, { "x": 56.458333333333336, "y": 44.4954128440367 }, { "x": 55.486111111111114, "y": 45.412844036697244 }, { "x": 54.37499999999999, "y": 46.63608562691132 }, { "x": 53.75, "y": 46.94189602446483 }, { "x": 52.56944444444444, "y": 47.40061162079511 }, { "x": 51.31944444444444, "y": 47.85932721712538 }];
                                    if (location.pathname.match(/fullcpgrid/i))
                                        this.autoMouse = Rx.Observable.interval(20).map(function (i) { return path[i % path.length]; })
                                            .map(function (p) {
                                            return {
                                                x: (p.x / 100) * _this.width,
                                                y: (p.y / 100) * _this.height
                                            };
                                        })
                                            .subscribe(function (position) { return _this.followers.map(function (follower) { return follower.add(position); }); });
                                }
                                App.prototype.onResize = function () {
                                    this.width = this.container.offsetWidth;
                                    this.height = this.container.offsetHeight;
                                    this.svg.setAttribute('width', String(this.width));
                                    this.svg.setAttribute('height', String(this.height));
                                };
                                return App;
                            }());
                            let Follower = /** @class */ (function () {
                                function Follower(stage, color) {
                                    let _this = this;
                                    this.removeDelay = 400;
                                    this.points = [];
                                    this.stage = stage;
                                    this.color = color;
                                    this.line = document.createElementNS("http://www.w3.org/2000/svg", 'path');
                                    this.line.style.fill = this.color;
                                    this.stage.appendChild(this.line);
                                    window.requestAnimationFrame(function () { return _this.trim(); });
                                }
                                Follower.prototype.getDrift = function () {
                                    return (Math.random() - 0.5) * 3;
                                };
                                Follower.prototype.add = function (position) {
                                    let direction = { x: 0, y: 0 };
                                    if (this.points[0]) {
                                        direction.x = (position.x - this.points[0].position.x) * 0.25;
                                        direction.y = (position.y - this.points[0].position.y) * 0.25;
                                    }
                                    let point = {
                                        position: position,
                                        time: new Date().getTime(),
                                        drift: { x: this.getDrift() + (direction.x / 2), y: this.getDrift() + (direction.y / 2) },
                                        age: 0,
                                        direction: direction
                                    };
                                    let shapeChance = Math.random();
                                    let chance = 0.1;
                                    if (shapeChance < chance)
                                        this.makeCircle(point);
                                    else if (shapeChance < chance * 2)
                                        this.makeSquare(point);
                                    else if (shapeChance < chance * 3)
                                        this.makeTriangle(point);
                                    this.points.unshift(point);
                                };
                                Follower.prototype.createLine = function (points) {
                                    let path = [points.length ? 'M' : ''];
                                    if (points.length > 0) {
                                        let forward = true;
                                        let i = 0;
                                        while (i >= 0) {
                                            let point = points[i];
                                            let offsetX = point.direction.x * ((i - points.length) / points.length) * 0.6;
                                            let offsetY = point.direction.y * ((i - points.length) / points.length) * 0.6;
                                            let x = point.position.x + (forward ? offsetY : -offsetY);
                                            let y = point.position.y + (forward ? offsetX : -offsetX);
                                            point.age += 0.2;
                                            path.push(String(x + (point.drift.x) * point.age));
                                            path.push(String(y + (point.drift.y) * point.age));
                                            i += forward ? 1 : -1;
                                            if (i == points.length) {
                                                i--;
                                                forward = false;
                                            }
                                        }
                                    }
                                    let pathString = path.join(' ');
                                    return pathString;
                                };
                                Follower.prototype.trim = function () {
                                    let _this = this;
                                    if (this.points.length > 0) {
                                        let last = this.points[this.points.length - 1];
                                        let now = new Date().getTime();
                                        if (last.time < now - this.removeDelay)
                                            this.points.pop();
                                    }
                                    this.line.setAttribute('d', this.createLine(this.points));
                                    window.requestAnimationFrame(function () { return _this.trim(); });
                                };
                                Follower.prototype.makeCircle = function (point) {
                                    let circle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
                                    circle.setAttribute('r', String((Math.abs(point.direction.x) + Math.abs(point.direction.y)) * 1));
                                    circle.style.fill = this.color;
                                    circle.setAttribute('cx', '0');
                                    circle.setAttribute('cy', '0');
                                    this.moveShape(circle, point);
                                };
                                Follower.prototype.makeSquare = function (point) {
                                    let size = (Math.abs(point.direction.x) + Math.abs(point.direction.y)) * 1.5;
                                    let square = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
                                    square.setAttribute('width', String(size));
                                    square.setAttribute('height', String(size));
                                    square.style.fill = this.color;
                                    this.moveShape(square, point);
                                };
                                Follower.prototype.makeTriangle = function (point) {
                                    let size = (Math.abs(point.direction.x) + Math.abs(point.direction.y)) * 1.5;
                                    let triangle = document.createElementNS("http://www.w3.org/2000/svg", 'polygon');
                                    triangle.setAttribute('points', "0,0 " + size + "," + size / 2 + " 0," + size);
                                    triangle.style.fill = this.color;
                                    this.moveShape(triangle, point);
                                };
                                Follower.prototype.moveShape = function (shape, point) {
                                    let _this = this;
                                    this.stage.appendChild(shape);
                                    let driftX = point.position.x + (point.direction.x * (Math.random() * 20)) + point.drift.x * (Math.random() * 10);
                                    let driftY = point.position.y + (point.direction.y * (Math.random() * 20)) + point.drift.y * (Math.random() * 10);
                                    TweenMax.fromTo(shape, 0.5 + Math.random(), { x: point.position.x, y: point.position.y }, { scale: 0, x: driftX, y: driftY, ease: Power4.easeOut, rotation: Math.random() * 360, onComplete: function () { _this.stage.removeChild(shape); } });
                                };
                                return Follower;
                            }());
                            let Input = /** @class */ (function () {
                                function Input(element) {
                                    this.mouseEventToCoordinate = function (mouseEvent) {
                                        mouseEvent.preventDefault();
                                        return {
                                            x: mouseEvent.clientX,
                                            y: mouseEvent.clientY
                                        };
                                    };
                                    this.touchEventToCoordinate = function (touchEvent) {
                                        touchEvent.preventDefault();
                                        return {
                                            x: touchEvent.changedTouches[0].clientX,
                                            y: touchEvent.changedTouches[0].clientY
                                        };
                                    };
                                    this.mouseDowns = Rx.Observable.fromEvent(element, "mousedown").map(this.mouseEventToCoordinate);
                                    this.mouseMoves = Rx.Observable.fromEvent(window, "mousemove").map(this.mouseEventToCoordinate);
                                    this.mouseUps = Rx.Observable.fromEvent(window, "mouseup").map(this.mouseEventToCoordinate);
                                    this.touchStarts = Rx.Observable.fromEvent(element, "touchstart").map(this.touchEventToCoordinate);
                                    this.touchMoves = Rx.Observable.fromEvent(element, "touchmove").map(this.touchEventToCoordinate);
                                    this.touchEnds = Rx.Observable.fromEvent(window, "touchend").map(this.touchEventToCoordinate);
                                    this.starts = this.mouseDowns.merge(this.touchStarts);
                                    this.moves = this.mouseMoves.merge(this.touchMoves);
                                    this.ends = this.mouseUps.merge(this.touchEnds);
                                }
                                return Input;
                            }());
                            let container = document.getElementById('mouser');
                            let app = new App(container);
                        });
                    });
                    break;
                case 5:
                    let RAF = (function() {
                        return window.requestAnimationFrame || window.webkitRequestAnimationFrame ||
                            window.mozRequestAnimationFrame ||
                            window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
                            function(callback) {
                                window.setTimeout(callback, 1000 / 60);
                            };
                    })();
                    // 鼠标活动时，获取鼠标坐标
                    let warea = {
                        x: null,
                        y: null,
                        max: 20000
                    };
                    window.onmousemove = function(e) {
                        e = e || window.event;
                        warea.x = e.clientX;
                        warea.y = e.clientY;
                    };
                    window.onmouseout = function(e) {
                        warea.x = null;
                        warea.y = null;
                    };
                    // 添加粒子
                    // x，y为粒子坐标，xa, ya为粒子xy轴加速度，max为连线的最大距离
                    let dots = [];
                    for (let i = 0; i < 300; i++) {
                        let x = Math.random() * canvas.width;
                        let y = Math.random() * canvas.height;
                        let xa = Math.random() * 2 - 1;
                        let ya = Math.random() * 2 - 1;
                        dots.push({
                            x: x,
                            y: y,
                            xa: xa,
                            ya: ya,
                            max: 6000
                        })
                    }
                    // 延迟100秒开始执行动画，如果立即执行有时位置计算会出错
                    setTimeout(function() {
                        animate5();
                    }, 100);
                    // 每一帧循环的逻辑
                    function animate5() {
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        // 将鼠标坐标添加进去，产生一个用于比对距离的点数组
                        let ndots = [warea].concat(dots);
                        dots.forEach(function(dot) {
                            // 粒子位移
                            dot.x += dot.xa;
                            dot.y += dot.ya;
                            // 遇到边界将加速度反向
                            dot.xa *= (dot.x > canvas.width || dot.x < 0) ? -1 : 1;
                            dot.ya *= (dot.y > canvas.height || dot.y < 0) ? -1 : 1;
                            // 绘制点
                            ctx.fillRect(dot.x - 0.5, dot.y - 0.5, 1, 1);
                            // 循环比对粒子间的距离
                            for (let i = 0; i < ndots.length; i++) {
                                let d2 = ndots[i];
                                if (dot === d2 || d2.x === null || d2.y === null) continue;
                                let xc = dot.x - d2.x;
                                let yc = dot.y - d2.y;
                                // 两个粒子之间的距离
                                let dis = xc * xc + yc * yc;
                                // 距离比
                                let ratio;
                                // 如果两个粒子之间的距离小于粒子对象的max值，则在两个粒子间画线
                                if (dis < d2.max) {
                                    // 如果是鼠标，则让粒子向鼠标的位置移动
                                    if (d2 === warea && dis > (d2.max / 2)) {
                                        dot.x -= xc * 0.03;
                                        dot.y -= yc * 0.03;
                                    }
                                    // 计算距离比
                                    ratio = (d2.max - dis) / d2.max;
                                    // 画线
                                    ctx.beginPath();
                                    ctx.lineWidth = ratio / 2;
                                    ctx.strokeStyle = 'rgba(165,251,255,' + (ratio + 0.2) + ')';
                                    ctx.moveTo(dot.x, dot.y);
                                    ctx.lineTo(d2.x, d2.y);
                                    ctx.stroke();
                                }

                            }
                            // 将已经计算过的粒子从数组中删除
                            ndots.splice(ndots.indexOf(dot), 1);
                        });
                        RAF(animate5);
                    }
                    break;
                default:
                    break;
            }
        }
    };
    window.Mouser = mouser;
})(window, document);
