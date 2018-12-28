//游戏剧情管理

//新的游戏
function story_0_start_game() {
    talkManager.start(0);
}

let story_events = [
    story_0_start_game,
];

function StoryManager() {
    return {
        mainLineId: -1,
        //推动剧情发展
        promote: function () {
            this.mainLineId++;
            story_events[this.mainLineId]();
        }
    }
}

let storyManager = StoryManager();            //剧情管理器
talkManager.storyMgr = storyManager;