//战斗场景
let roleWxh = {
    name: "王小虎",
    level: 1,
    hp: [150, 150],
    mp: [100, 100],
    atk: 10,
    def: 0,


};
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
    if (fightManager.isDown) {
        fightManager.x = mx - fightManager.muX;
        fightManager.y = my - fightManager.muY;
        if (fightManager.x>0)
            fightManager.x=0;
        if (fightManager.x<-fightManager.mapData.w+640)
            fightManager.x=-fightManager.mapData.w+640;
        if (fightManager.y>0)
            fightManager.y=0;
        if(fightManager.y<-fightManager.mapData.h+480)
            fightManager.y=-fightManager.mapData.h+480;
    }
}

function fightMouseDown(mx, my) {
    var ret = null;
    ret = talkManager.mouseDown();
    if (ret !== false)
        return;
    fightManager.muX = mx - fightManager.x;
    fightManager.muY = my - fightManager.y;
    fightManager.isDown = true;

}

function fightMouseUp(mx, my) {
    fightManager.isDown = false;
}

function FightManager(ctx) {
    return {
        ctx: ctx,
        fightData: null,    //战斗数据
        mapData: null,      //地图数据
        mapImg: null,       //地图背景图
        x: 0,                //地图绘制坐标
        y: 0,
        isDown: false,      //鼠标是否按下
        muX: 0,               //鼠标按下时与地图坐标的距离
        muY: 0,
        roundNum: 0,        //回合数
        //进入战斗场景
        enter: function (fightId) {
            //初始化各种数据
            this.fightData = fight_data[fightId];
            this.mapData = JSON.parse(ajax('./image/all_map/' + this.fightData.fightScene + '.json'));
            this.mapImg = NewImage('./image/all_map/' + this.fightData.fightScene + '.jpg', this.mapData.w, this.mapData.h);
            //TODO:进入战斗的回调

        },
        logic: function () {

        },
        draw: function () {
            drawSrcImg(this.ctx, this.mapImg, this.x, this.y);        //绘制地图背景
            //绘制地图网格
            for (var x = 0; x <= this.mapData.w / 32; x++) {
                drawLine(this.ctx, 'rgb(0,255,0)', this.x + x * 32, this.y, this.x + x * 32, this.y + this.mapData.h);
            }
            for (var y = 0; y < this.mapData.h / 32; y++) {
                drawLine(this.ctx, 'rgb(0,255,0)', this.x, this.y + y * 32, this.x + this.mapData.w, this.y + y * 32);
            }
        }
    }
}

let fightManager = FightManager(ctx);
