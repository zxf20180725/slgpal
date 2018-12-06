let canvas = document.getElementById("main");
let ctx = canvas.getContext("2d");
let timer = setInterval(mainLoop, 32);      //60FPS

let img = NewImage("https://foxy-1252538440.cos.ap-guangzhou.myqcloud.com/TuerHeadImg/1.jpg");
let btn1 = NewImage("./images/btn_normal.png", 253, 87);
let btn2 = NewImage("./images/btn_move.png", 253, 87);
let btn3 = NewImage("./images/btn_down.png", 253, 87);
let effect = NewImage("./images/effect1.png", 2880, 96);
canvas.onmousedown = mouseDown;
canvas.onmouseup = mouseUp;
canvas.onmousemove = mouseMove;

let btn = Button(50, 50, btn1, btn2, btn3, callback);
let aniManager = AnimationManager(ctx);

function callback() {
    alert("你点了劳资！");
}

function mainLoop() {
    //逻辑更新
    aniManager.logic();
    //视图更新
    drawFillRect(ctx, "#f6f6f6", 0, 0, 800, 600);
    // drawSrcImg(ctx,img,0,0);
    // drawImg(ctx,img,0,0,100,100,0,0,img.width,img.height);
    // drawLine(ctx,"#6666",0,0,500,500);
    // drawFillRect(ctx,"green",10,10,200,200);
    // drawText(ctx, "green", 60, "仙路尽头谁为峰，一见无始道成空！", 10, 200);
    // drawRectText(ctx, "blue", 30, "仙路尽头谁为峰，一见无始道成空！", 10, 300, 300);
    drawOutlineText(ctx, "yellow", "red", 30, "狡猾的球球", 10, 250);
    aniManager.draw();
    btn.draw(ctx);
}

function mouseMove() {
    let mx = parseInt(event.clientX - canvas.getBoundingClientRect().left);
    let my = parseInt(event.clientY - canvas.getBoundingClientRect().top);
    // aniManager.add(mx, my, effect, 3000, false);
    btn.getFocus(mx, my);
}

function mouseDown() {
    let mx = parseInt(event.clientX - canvas.getBoundingClientRect().left);
    let my = parseInt(event.clientY - canvas.getBoundingClientRect().top);
    aniManager.add(mx, my, effect, 2000, false);
    btn.mouseDown(mx, my);
}

function mouseUp() {
    let mx = parseInt(event.clientX - canvas.getBoundingClientRect().left);
    let my = parseInt(event.clientY - canvas.getBoundingClientRect().top);
    btn.mouseUp(mx, my);
}