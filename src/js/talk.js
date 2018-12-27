//对话管理

function TalkManager(ctx) {
    return {
        ctx: ctx,
        sw: false,              //是否正在对话
        talkId: -1,             //当前对话id
        talkCount: -1,           //当前对话进度
        talkScript: null,       //对话脚本
        faceX: 0,               //face当前绘图坐标
        faceY: 0,
        boxX: 0,                //对话框当前绘图坐标
        boxY: 0,
        boxWidth: 350,           //对话框宽高
        boxHeight: 150,

        //开始一个新对话
        start: function (talkId) {
            this.talkId = talkId;
            this.talkCount = 0;
            this.talkScript = talk_script[talkId].script;
            this.sw = true;
            this.getCurrentInfo();
        },

        //获取当前对话框的一些信息
        getCurrentInfo: function () {
            //当前对话对象
            var currentTalk = this.talkScript[this.talkCount];
            var faceW = faceImages[currentTalk.face].width;
            var faceH = faceImages[currentTalk.face].height;
            this.faceY = 480 - faceH;
            this.boxY = 480 - this.boxHeight;
            if (currentTalk.pos === 0) {        //头像在左边
                this.faceX = 0;
                this.boxX = faceW;
            } else {      //头像在右边
                this.faceX = 640 - faceW;
                this.boxX = this.faceX - this.boxWidth;
            }
        },

        //对话
        talk: function () {
            if (!this.sw)
                return;
            if (this.talkCount !== 0) {
                //TODO:调用事件回调函数
            }
            this.talkCount++;
            if (this.talkCount >= this.talkScript.length) {
                this.sw = false;
                return;
            }
            this.getCurrentInfo();
        },

        draw: function () {
            if (!this.sw)
                return;
            //画头像
            drawSrcImg(this.ctx, faceImages[this.talkScript[this.talkCount].face], this.faceX, this.faceY);
            //画对话框
            drawFillRect(this.ctx, "rgba(0,0,0,0.8)", this.boxX, this.boxY, this.boxWidth, this.boxHeight);
            //画名字
            drawText(this.ctx, "rgb(255,255,255)", 17, this.talkScript[this.talkCount].name + ":", this.boxX + 10, this.boxY + 5);
            //画文字
            drawRectText(this.ctx, "rgb(255,255,255)", 16, this.talkScript[this.talkCount].text, this.boxX + 10, this.boxY + 30, this.boxWidth - 20);
        },

        mouseDown: function () {
            this.talk();
        }
    }
}