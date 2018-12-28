//对话管理

//*************************************对话事件*************************************
function event_test() {
    alert('事件测试1');
}

function event_test2() {
    fadeManager.reset();
}

function event_test3() {
    fadeManager.reset();
}

let event_list = [event_test, event_test2, event_test3];

/*
    face：对话头像
    pos：对话框弹出位置 0左边 1右边 -1直接出现
    event：事件编号，即对话完成后的回调函数编号 -1没有事件
*/
let talk_script = [
    {
        talk_id: 0,
        script: [
            {
                name: "狡猾的球球",
                text: "    欢迎试玩仙剑奇侠传二战棋版，如果您有什么建议或bug反馈请联系QQ：871245007。\n    谢谢您的支持~",
                face: 0,
                pos: 0,
                event: -1
            },
            {
                name: "傻逼",
                text: "我是傻逼！我是傻逼！我是傻逼！",
                face: 1,
                pos: 1,
                event: 1
            },
            {
                name: "狡猾的球球",
                text: "我知道你是傻逼，快滚！",
                face: 0,
                pos: 0,
                event: 2
            }
        ]
    }
];

function TalkManager(ctx) {
    return {
        storyMgr:null,
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

        //获取当前对话框的位置信息
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
                event_id=this.talkScript[this.talkCount].event;
                if(event_id!==-1) {
                    var ret =event_list[event_id]();
                    if(ret) //如果返回true，就代表要推动剧情发展
                        this.storyMgr.promote();
                }
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
let talkManager = TalkManager(ctx);
