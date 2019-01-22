//游戏的一些数值

//boss数据
let boss_data = [
    {
        id: 0,
        name: "查协",
        hp: 480,     //体力
        mp: 9999,    //真气
        atk: 10,     //攻击力
        def: 0,      //防御力
        speed: 5,    //移动力
        rewards: {      //击败奖励
            baseExp: 50, //基础经验值
            money: 10,    //金钱
            items: [
                {id: 0, num: 1},
                {id: 1, num: 3},
            ]  //物品列表
        }
    }
];

//小怪数据
let enemy_data = [
    {
        id: 0,
        name: "持棍强盗",
        hp: 26,     //体力
        mp: 9999,    //真气
        atk: 5,     //攻击力
        def: 0,      //防御力
        speed: 3,    //移动力
        rewards: {      //击败奖励
            baseExp: 10, //基础经验值
            money: 1,    //金钱
            items: [
                {id: 0, num: 1},
                {id: 1, num: 3},
            ]  //物品列表
        }
    }
];


//主线战斗数据
let fight_data = [
    {
        id: 0,
        fightScene: 0,
        boss: [
            {id: 0, x: 0, y: 0}     //查协
        ],
        enemy: [
            {id: 0, x: 1, y: 1},    //持棍强盗
            {id: 0, x: 10, y: 10}   //持棍强盗
        ],
        startCb: null,          //战斗开始时的回调
        winCb: null,            //战斗胜利的回调
        loseCb: null,           //战斗失败的回调
        ourRoundStartCb: null,       //我方回合开始时回调
        enemyRoundStartCb: null,     //敌方回合开始时回调
    },     //boss战，査协
];

//同步get请求
function ajax(url) {
    var xhr = new XMLHttpRequest();
    var ret="";
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            ret = xhr.responseText;
        }
    };
    xhr.open('get', url, false);
    xhr.send();
    return ret;
}