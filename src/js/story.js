//游戏剧情管理
/*
    剧情编号mainLineId说明：

    0：开始新的游戏，场景变为故事场景，开始1号对话
 */

//新的游戏
function story_0_start_game() {
    scene = 1;
    talkManager.start(1);       //新的游戏，开始1号对话
    aniManager.clear();
    aniManager.add(400, 250, aniImages[0], 1000, true, 2);       //加入小孩动画
    aniManager.add(420, 220, aniImages[1], 1000, true, 1);      //加入小虎单帧图片
}

//剧情事件列表
let story_events = [
    story_0_start_game,     //开始游戏
];

function StoryManager() {
    return {
        mainLineId: -1,
        //推动剧情发展
        promote: function (mainLineId) {
            // if (this.mainLineId + 1 < story_events.length) {    //保证还有剧情，否则会下标越界
            //     this.mainLineId++;
            //     story_events[this.mainLineId]();
            // }
            this.mainLineId = mainLineId;
            if (this.mainLineId < story_events.length)
                story_events[this.mainLineId]();
        }
    }
}

let storyManager = StoryManager();            //剧情管理器
talkManager.storyMgr = storyManager;        //解决先后引用问题（在对话中推动剧情发展需要用到storyManager）