canvas.onmousedown = mouseDown;
canvas.onmouseup = mouseUp;
canvas.onmousemove = mouseMove;
let timer = setInterval(mainLoop, 32);      //60FPS

function mainLoop() {
    //全局的逻辑
    fadeManager.logic();
    switch (scene) {
        case 0:
            startLogic();
            startDraw();
            break;
        case 1:
            storyLogic();
            storyDraw();
            break;
    }
    //全局的绘图
    talkManager.draw();
    fadeManager.draw();
}

function mouseMove() {
    let mx = parseInt(event.clientX - canvas.getBoundingClientRect().left);
    let my = parseInt(event.clientY - canvas.getBoundingClientRect().top);
    switch (scene) {
        case 0:
            startMouseMove(mx, my);
            break;
        case 1:
            storyMouseMove(mx, my);
            break;
    }
}

function mouseDown() {
    let mx = parseInt(event.clientX - canvas.getBoundingClientRect().left);
    let my = parseInt(event.clientY - canvas.getBoundingClientRect().top);
    switch (scene) {
        case 0:
            startMouseDown(mx, my);
            talkManager.mouseDown();
            break;
        case 1:
            storyMouseDown(mx, my);
            break;
    }
}

function mouseUp() {
    let mx = parseInt(event.clientX - canvas.getBoundingClientRect().left);
    let my = parseInt(event.clientY - canvas.getBoundingClientRect().top);
    switch (scene) {
        case 0:
            startMouseUp(mx, my);
            break;
        case 1:
            storyMouseUp(mx, my);
            break;
    }
}