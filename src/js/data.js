//游戏的一些数值
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
                text: "欢迎试玩仙剑奇侠传二战棋版，如果您有什么建议或bug反馈请联系QQ：871245007。谢谢您的支持~",
                face: 0,
                pos: 0,
                event: -1
            },
            {
                name: "丁声东",
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
    }
];