/*
    特效模块
 */

/*
    功能：
        创建动画对象（动画对象不可以进行人机交互）
    参数：
        x,y：绘制动画的中心点（不是左上角啦）
        img：序列帧图片（只支持一行的序列帧）
        time：动画时长
        loop：循环动画（是否为循环动画）
        frameCallback：帧回调（回调函数必须提供一个frame参数，传入当前帧）
        doneCallback：播放完成回调（当动画播放结束触发）
*/
function Animation(x, y, img, time, loop, frameNum, frameCallback, doneCallback) {
    var frame = frameNum || img.width / img.height; //动画一共多少帧
    var dw = img.width / frame;         //单位宽度
    var dh = img.height;                //单位高度
    var speed = parseInt(time / frame); //每帧播放速度（单位毫秒）
    return {
        x: x - dw / 2,      //绘图坐标
        y: y - dh / 2,
        dw: dw,
        dh: dh,
        img: img,
        frame: frame,        //最大帧数
        frameCount: speed < 32 ? 1 : parseInt(speed / 32),      //需要等待几次主循环才切换1帧
        currentCount: 0,      //当前计数
        currentFrame: 0,       //当前帧
        loop: loop,              //是否循环播放
        leastOnce: false,       //动画是否至少播放了一次
        frameCallback: frameCallback,        //帧回调
        doneCallback: doneCallback,          //播放完成回调
        //放在游戏主循环里调用
        logic: function () {
            var lastFrame = this.currentFrame;        //上一帧
            this.currentCount++;
            this.currentFrame = parseInt(this.currentCount / this.frameCount);
            if (this.currentFrame >= this.frame) {      //播放完成
                this.currentFrame = 0;
                this.currentCount = 0;
                this.leastOnce = true;
                if (this.frameCallback)
                    this.frameCallback(lastFrame);

                if (this.doneCallback)
                    this.doneCallback(lastFrame);
            } else {      //播放中
                if (lastFrame !== this.currentFrame && this.frameCallback)      //每个动画帧回调，而不是每个主循环回调
                    this.frameCallback(lastFrame);
            }
        },

        //绘制动画
        draw: function (ctx) {
            drawCellImg(ctx, img, this.x, this.y, this.currentFrame, 0, this.dw, this.dh);
        }
    }
}

/*
    功能：
        游戏的动画管理器，可以向游戏添加、删除、清空动画
 */
function AnimationManager(ctx) {
    return {
        ctx: ctx,
        animations: [],

        //动画管理器逻辑
        logic: function () {
            var index = 0;
            for (var animation of this.animations) {
                animation.logic();
                //删除动画
                if (!animation.loop && animation.leastOnce) {
                    this.animations.splice(index, 1);
                    index--;
                }
                index++;
            }
        },

        //渲染各个动画
        draw: function () {
            for (var animation of this.animations) {
                animation.draw(this.ctx);
            }
        },

        //添加动画
        add: function (x, y, img, speed, loop, frameNum, frameCallback, doneCallback) {
            var animation = Animation(x, y, img, speed, loop, frameNum, frameCallback, doneCallback);
            this.animations.push(animation);
        },

        //清空动画
        clear: function () {
            this.animations = [];
        }
    }
}


/*
    功能：
        游戏淡入淡出管理
 */
function FadeManager(ctx, callback) {
    return {
        ctx: ctx,
        sw: false,           //开关
        callback: callback,  //回调函数
        state: 0,            //当前状态
        speed: 10,           //alpha变化速度
        alpha: 0,            //不透明度[0,255]

        logic: function () {
            if (!this.sw)
                return;

            if (this.state === 0) {  //第一阶段，淡出
                this.alpha += this.speed;
                if (this.alpha >= 255) {
                    this.alpha = 255;
                    this.state = 1;
                    if (this.callback)
                        this.callback();
                }
            } else {  //第二阶段，淡入
                this.alpha -= this.speed;
                if (this.alpha <= 0)
                    this.sw = false;
            }
        },

        draw: function () {
            if (!this.sw)
                return;
            drawFillRect(this.ctx, "rgba(0,0,0," + String(this.alpha / 255) + ")", 0, 0, 640, 480);
        },

        reset: function (callback) {
            if (this.sw)
                return;
            this.sw = true;
            this.callback = callback;
            this.state = 0;
            this.speed = 10;
            this.alpha = 0;
        }
    }
}