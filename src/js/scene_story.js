let sceneImg = NewImage('./image/all_scene/' + storyScene + '.jpg', 640, 480);


function storyLogic() {

}

function storyDraw() {
    //画背景图片
    drawSrcImg(ctx, sceneImg, 0, 0);
}

function storyMouseMove(mx, my) {

}

function storyMouseDown(mx, my) {

}

function storyMouseUp(mx, my) {

}

function storyChangeScene(scene) {
    storyScene = scene;
    sceneImg = NewImage('./image/all_scene/' + storyScene + '.jpg', 640, 480);
}