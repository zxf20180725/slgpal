let canvas = document.getElementById("main");
let ctx = canvas.getContext("2d");
let video = document.getElementById("video");

let scene = 0;      //场景编号 0：开始界面   1：游戏界面
let aniManager = AnimationManager(ctx);     //动画管理器
let fadeManager = FadeManager(ctx);         //淡入淡出管理器

let faceImages = [];      //所有头像图片
faceImages.push(NewImage("./image/face/8-1.png", 200, 250));      //测试头像1
faceImages.push(NewImage("./image/face/7-1.png", 200, 250));      //测试头像2