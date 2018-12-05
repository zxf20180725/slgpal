/*
    特效模块
 */

/*
    功能：
        创建动画对象（动画对象不可以进行人机交互）
    参数：
        x,y：绘制动画的中心点（不是左上角啦）
        img：序列帧图片（只支持一行的序列帧）
        frame：动画一共多少帧
        speed：每帧播放速度（单位毫秒），以游戏主循环为32ms来计算
        loop：循环动画（是否为循环动画）
*/
function Animation(x, y, img, speed, loop) {
    var frame=img.width/img.height;
    var dw = img.width / frame;     //单位宽度
    var dh = img.height;            //单位高度
    return {
        x: x - dw / 2,      //绘图坐标
        y: y - dh / 2,
        dw: dw,
        dy: dh,
        img: img,
        frame: frame,        //最大帧数
        frameCount: speed < 32 ? 1 : parseInt(speed / 32),      //需要等待几次主循环才切换1帧
        currentCount: 0,      //当前计数
        currentFrame: 0,       //当前帧
        loop: loop,              //是否循环播放
        leastOnce: false,       //动画是否至少播放了一次

        //放在游戏主循环里调用
        logic: function () {
            this.currentCount++;
            this.currentFrame = parseInt(this.currentCount / this.frameCount);
            if (this.currentFrame > this.frame) {
                this.currentFrame = 0;
                this.currentCount = 0;
                this.leastOnce = true;
            }
        },

        //绘制动画
        draw: function (ctx) {
            drawCellImg(ctx, img, this.x, this.y, this.currentFrame, 0, this.dw, this.dy);
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
        add: function (x, y, img, frame, speed, loop) {
            var animation = Animation(x, y, img, frame, speed, loop);
            this.animations.push(animation);
        },

        //清空动画
        clear: function () {
            this.animations = [];
        }
    }
}