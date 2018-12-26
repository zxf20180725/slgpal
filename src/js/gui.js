/*
    gui模块
 */

//按钮
function Button(x, y, imgNormal, imgMove, imgDown, callback) {
    return {
        x: x,
        y: y,
        imgs: [imgNormal, imgMove, imgDown],
        width: imgNormal.width,
        height: imgNormal.height,
        state: 0,   //0正常 1焦点 2按下
        callback: callback,
        //绘制按钮
        draw: function (ctx) {
            drawSrcImg(ctx, this.imgs[this.state], this.x, this.y);
        },

        //碰撞检测
        colli: function (x, y) {
            return x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height;
        },

        //获得焦点
        mouseMove: function (x, y) {
            if (this.state === 2)
                return;
            if (this.colli(x, y))
                this.state = 1;
            else
                this.state = 0;
        },

        //鼠标按下
        mouseDown: function (x, y) {
            if (this.colli(x, y))
                this.state = 2;
        },

        //鼠标弹起
        mouseUp: function (x, y) {
            if (this.state === 2) {
                this.state = 0;
                if (this.callback)
                    return this.callback();
            }
        }
    };
}