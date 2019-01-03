//开始界面场景的业务逻辑
let startBtn1 = NewImage("./image/btn1.png", 186, 34);
let startBtn2 = NewImage("./image/btn2.png", 186, 34);
let startBtn3 = NewImage("./image/btn3.png", 186, 34);
let startBtn4 = NewImage("./image/btn4.png", 186, 34);
let startBtn5 = NewImage("./image/btn5.png", 186, 34);
let startBtn6 = NewImage("./image/btn6.png", 186, 34);
let startLogin = NewImage("./image/login.png", 640, 480);
let startEffect = NewImage("./image/effect1.png", 2880, 96);

let startBtnNewGame = Button(230, 270, startBtn1, startBtn2, startBtn2, startNewGame);
let startBtnOldGame = Button(230, 320, startBtn3, startBtn4, startBtn4, startOldGame);
let startBtnExitGame = Button(230, 370, startBtn5, startBtn6, startBtn6);


function startLogic() {
}

function startDraw() {
    drawSrcImg(ctx, video, 0, 0);
    aniManager.draw();
    drawSrcImg(ctx, startLogin, 0, 0);
    startBtnNewGame.draw(ctx);
    startBtnOldGame.draw(ctx);
    startBtnExitGame.draw(ctx);
}

function startMouseMove(mx, my) {
    startBtnNewGame.mouseMove(mx, my);
    startBtnOldGame.mouseMove(mx, my);
    startBtnExitGame.mouseMove(mx, my);
}

function startMouseDown(mx, my) {
    aniManager.add(mx, my, startEffect, 2000, false);
    startBtnNewGame.mouseDown(mx, my);
    startBtnOldGame.mouseDown(mx, my);
    startBtnExitGame.mouseDown(mx, my);
}

function startMouseUp(mx, my) {
    startBtnNewGame.mouseUp(mx, my);
    startBtnOldGame.mouseUp(mx, my);
    startBtnExitGame.mouseUp(mx, my);
}

function startNewGame() {
    fadeManager.reset(function () {
        scene = 1;
        storyManager.promote(); // 0
    });
}

function startOldGame() {
    storyManager.promote();
}