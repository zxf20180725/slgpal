//战斗场景
let roleWxh = {};
let roleSqs = {};
let roleSm = {};
let roleLyr = {};

function fightLogic() {
    fightManager.logic();
}

function fightDraw() {
    fightManager.draw();
}

function fightMouseMove(mx, my) {

}

function fightMouseDown(mx, my) {
    talkManager.mouseDown();
}

function fightMouseUp(mx, my) {

}

function FightManager(ctx) {
    return {
        ctx:ctx,
        fightData: null,
        mapData: null,
        mapImg: null,
        //进入战斗场景
        enter: function (fightId) {
            //初始化各种数据
            this.fightData = fight_data[fightId];
            this.mapData = ajax('./image/all_map/' + this.fightData.fightScene + '.json');
            this.mapImg = NewImage('./image/all_map/' + this.fightData.fightScene + '.jpg', this.mapData.w, this.mapData.h);
        },
        logic: function () {

        },
        draw: function () {
            drawSrcImg(this.ctx, this.mapImg, 0, 0);
        }
    }
}

let fightManager = FightManager(ctx);
