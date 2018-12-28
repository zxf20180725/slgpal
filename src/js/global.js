let canvas = document.getElementById("main");
let ctx = canvas.getContext("2d");
let video = document.getElementById("video");

let scene = 0;      //场景编号 0：开始界面   1：游戏界面
let storyScene = 0;    //剧情模式中的场景编号（背景图片编号）

let aniManager = AnimationManager(ctx);     //动画管理器
let fadeManager = FadeManager(ctx);         //淡入淡出管理器

let faceImages = [];      //所有头像图片
faceImages.push(NewImage("./image/all_face/27-1.png", 200, 250));      //0 少年王小虎
faceImages.push(NewImage("./image/all_face/13-1.png", 200, 250));      //1 少年喻南松
faceImages.push(NewImage("./image/all_face/34-1.png", 200, 250));      //2 微笑盛尊武
faceImages.push(NewImage("./image/all_face/34-2.png", 200, 250));      //3 严肃盛尊武
faceImages.push(NewImage("./image/all_face/34-3.png", 200, 250));      //4 严肃闭眼盛尊武
faceImages.push(NewImage("./image/all_face/34-4.png", 200, 250));      //4 微笑闭眼盛尊武