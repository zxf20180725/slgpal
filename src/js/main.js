canvas.onmousedown = mouseDown;
canvas.onmouseup = mouseUp;
canvas.onmousemove = mouseMove;
let timer = setInterval(mainLoop, 32);      //60FPS

function mainLoop() {
    switch (scene) {
        case 0:
            fadeManager.logic();
            startLogic();
            startDraw();
            fadeManager.draw();
            break;
    }
}

function mouseMove() {
    let mx = parseInt(event.clientX - canvas.getBoundingClientRect().left);
    let my = parseInt(event.clientY - canvas.getBoundingClientRect().top);
    switch (scene) {
        case 0:
            startMouseMove(mx, my);
            break;
    }
}

function mouseDown() {
    let mx = parseInt(event.clientX - canvas.getBoundingClientRect().left);
    let my = parseInt(event.clientY - canvas.getBoundingClientRect().top);
    switch (scene) {
        case 0:
            startMouseDown(mx, my);
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
    }
}