let canvas = document.getElementById("main");
let ctx = canvas.getContext("2d");
let video = document.getElementById("video");
let timer = setInterval(mainLoop, 32);      //60FPS

let btn1 = NewImage("./image/btn1.png", 186, 34);
let btn2 = NewImage("./image/btn2.png", 186, 34);
let btn3 = NewImage("./image/btn3.png", 186, 34);
let btn4 = NewImage("./image/btn4.png", 186, 34);
let btn5 = NewImage("./image/btn5.png", 186, 34);
let btn6 = NewImage("./image/btn6.png", 186, 34);
let login = NewImage("./image/login.png", 640, 480);
let effect = NewImage("./image/effect1.png", 2880, 96);

let btnNewGame = Button(230, 270, btn1, btn2, btn2);
let btnOldGame = Button(230, 320, btn3, btn4, btn4);
let btnExitGame = Button(230, 370, btn5, btn6, btn6);


canvas.onmousedown = mouseDown;
canvas.onmouseup = mouseUp;
canvas.onmousemove = mouseMove;

let aniManager = AnimationManager(ctx);


function mainLoop() {
    //逻辑更新
    aniManager.logic();
    //视图更新
    // drawFillRect(ctx, "#f6f6f6", 0, 0, 640, 480);
    drawSrcImg(ctx, video, 0, 0);
    aniManager.draw();
    drawSrcImg(ctx, login, 0, 0);
    btnNewGame.draw(ctx);
    btnOldGame.draw(ctx);
    btnExitGame.draw(ctx);
}

function mouseMove() {
    let mx = parseInt(event.clientX - canvas.getBoundingClientRect().left);
    let my = parseInt(event.clientY - canvas.getBoundingClientRect().top);
    btnNewGame.mouseMove(mx, my);
    btnOldGame.mouseMove(mx, my);
    btnExitGame.mouseMove(mx, my);
}

function mouseDown() {
    let mx = parseInt(event.clientX - canvas.getBoundingClientRect().left);
    let my = parseInt(event.clientY - canvas.getBoundingClientRect().top);
    aniManager.add(mx, my, effect, 2000, false);
    btnNewGame.mouseDown(mx, my);
    btnOldGame.mouseDown(mx, my);
    btnExitGame.mouseDown(mx, my);
}

function mouseUp() {
    let mx = parseInt(event.clientX - canvas.getBoundingClientRect().left);
    let my = parseInt(event.clientY - canvas.getBoundingClientRect().top);
    btnNewGame.mouseUp(mx, my);
    btnOldGame.mouseUp(mx, my);
    btnExitGame.mouseUp(mx, my);
}