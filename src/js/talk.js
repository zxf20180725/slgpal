//对话管理

//*************************************对话事件*************************************
function talk_0() {
    //盛尊武叫小虎回去
    fadeManager.reset(function () {
        storyChangeScene(1);
        aniManager.clear();
        talkManager.start(2);
        aniManager.add(250, 250, aniImages[2], 4000, true, 29);
    });
}
function talk_1() {
    //进入战斗
    fadeManager.reset(function () {
        fightManager.enter(0);
        scene=2;
    });
}

let event_list = [talk_0,talk_1];

/*
    face：对话头像
    pos：头像位置 0左边 1右边
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
                event: -1
            },
            {
                name: "狡猾的球球",
                text: "我知道你是傻逼，快滚！",
                face: 0,
                pos: 0,
                event: -1
            }
        ]
    },
    {
        talk_id: 1,
        script: [
            {
                name: "仙剑奇侠传二",
                text: "    欢迎试玩仙剑奇侠传二战棋版，如果您有什么建议或bug反馈请联系QQ：871245007。\n    谢谢您的支持~",
                face: -1,
                pos: 0,
                event: -1
            },
            {
                name: "仙剑奇侠传二",
                text: "    杭州城\n          ----王小虎14岁。",
                face: -1,
                pos: 0,
                event: -1
            },
            {
                name: "仙剑奇侠传二",
                text: "      蜀山峰，入云霄\n      掌门逍遥人品高\n      平妖卫道不辞苦\n      江湖奇人大英豪",
                face: -1,
                pos: 0,
                event: -1
            },
            {
                name: "小孩",
                text: "小虎哥，小虎哥，再告诉我们一些逍遥大侠的故事嘛！",
                face: -1,
                pos: 0,
                event: -1
            },
            {
                name: "仙剑奇侠传二",
                text: "屋内传来师父的声音...",
                face: -1,
                pos: 0,
                event: -1
            },
            {
                name: "盛尊武",
                text: "小虎，进来一下！",
                face: -1,
                pos: 0,
                event: -1
            },
            {
                name: "王小虎",
                text: "哎呀~",
                face: 0,
                pos: 0,
                event: -1
            },
            {
                name: "王小虎",
                text: "不行不行，师父有事找我了！",
                face: 0,
                pos: 0,
                event: -1
            },
            {
                name: "王小虎",
                text: "赶明儿再给你们说故事听。",
                face: 0,
                pos: 0,
                event: -1
            },
            {
                name: "小孩",
                text: "好，小虎哥！你答应明天跟我们说逍遥大侠的故事喔~",
                face: -1,
                pos: 0,
                event: -1
            },
            {
                name: "王小虎",
                text: "好啊~你们快回家吧！",
                face: 0,
                pos: 0,
                event: 0
            },
        ]
    },
    {
        talk_id: 2,
        script: [
            {
                name: "王小虎",
                text: "师父不知什么事在叫唤我，我得赶紧过去看看。",
                face: 0,
                pos: 0,
                event: -1
            },
            {
                name: "王小虎心想",
                text: "（师父都说不再理江湖中事，他还这么跪了两天两夜······）",
                face: 0,
                pos: 0,
                event: -1
            },
            {
                name: "王小虎心想",
                text: "（不知道什么缘故，让这位大哥哥这样子坚持···）",
                face: 0,
                pos: 0,
                event: -1
            },
            {
                name: "王小虎心想",
                text: "（不过说起来，自从皇甫叔在我来到杭州，拜入盛师父门下···）",
                face: 0,
                pos: 0,
                event: -1
            },
            {
                name: "王小虎心想",
                text: "（这半年来，盛师父只叫我打杂、清扫、再不然就是打坐、马步、吐纳什么的···）",
                face: 0,
                pos: 0,
                event: -1
            },
            {
                name: "王小虎心想",
                text: "（这些基础武功，我已跟着李大娘学了好多年了···）",
                face: 0,
                pos: 0,
                event: -1
            },
            {
                name: "王小虎心想",
                text: "（真不知道师父什么时候才愿意传授我真正的刀法···）",
                face: 0,
                pos: 0,
                event: 1
            },
        ]
    },
];

function TalkManager(ctx) {
    return {
        storyMgr: null,         //剧情管理器
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
            var faceW = currentTalk.face !== -1 ? faceImages[currentTalk.face].width : 200;
            var faceH = currentTalk.face !== -1 ? faceImages[currentTalk.face].height : 250;
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
                return false;
            if (this.talkCount !== 0) {
                //调用事件回调函数
                event_id = this.talkScript[this.talkCount].event;
                if (event_id !== -1) {
                    var ret = event_list[event_id]();
                    if (ret !== null) //如果有返回值，就代表要推动剧情发展
                        this.storyMgr.promote(ret);
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
            if (this.talkScript[this.talkCount].face !== -1)
                drawSrcImg(this.ctx, faceImages[this.talkScript[this.talkCount].face], this.faceX, this.faceY);
            //画对话框
            drawFillRect(this.ctx, "rgba(0,0,0,0.8)", this.boxX, this.boxY, this.boxWidth, this.boxHeight);
            //画名字
            drawOutlineText(this.ctx, "rgb(255,127,39)", "rgb(255,255,255)", 16, this.talkScript[this.talkCount].name + ":", this.boxX + 10, this.boxY + 5);
            //画文字
            drawRectText(this.ctx, "rgb(255,255,255)", 16, this.talkScript[this.talkCount].text, this.boxX + 10, this.boxY + 30, this.boxWidth - 20);
        },

        mouseDown: function () {
            return this.talk();
        }
    }
}

let talkManager = TalkManager(ctx);
