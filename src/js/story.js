//游戏剧情管理

//新的游戏
function story_0_start_game() {
    talkManager.start(1);       //新的游戏，开始1号对话
}

//剧情事件列表
let story_events = [
    story_0_start_game,     //开始游戏
];

function StoryManager() {
    return {
        mainLineId: -1,
        //推动剧情发展
        promote: function () {
            if (this.mainLineId + 1 < story_events.length) {    //保证还有剧情，否则会下标越界
                this.mainLineId++;
                story_events[this.mainLineId]();
            }
        }
    }
}

let storyManager = StoryManager();            //剧情管理器
talkManager.storyMgr = storyManager;        //解决先后引用问题（在对话中推动剧情发展需要用到storyManager）