//游戏剧情管理

//新的游戏
function story_0_start_game() {
    talkManager.start(1);
}

let story_events = [
    story_0_start_game,
];

function StoryManager() {
    return {
        mainLineId: -1,
        //推动剧情发展
        promote: function () {
            if (this.mainLineId + 1 < story_events.length) {
                this.mainLineId++;
                story_events[this.mainLineId]()
            }
        }
    }
}

let storyManager = StoryManager();            //剧情管理器
talkManager.storyMgr = storyManager;