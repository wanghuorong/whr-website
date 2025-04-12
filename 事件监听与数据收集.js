// 初始化数据存储
const interactionData = {
    playEvents: [],
    pauseEvents: [],
    seekEvents: [],
    mouseMovements: [],
    videoStats: {
        startTime: null,      // 记录首次播放开始时间
        lastPlayStart: null,  // 记录最近一次播放开始时间
        totalPlayTime: 0      // 累计播放时长(秒)
    }
};

// 视频事件监听
const video = document.getElementById('video-player');

video.addEventListener('play', () => {
    const now = Date.now();
    const event = {
        type: 'play',
        timestamp: now,
        videoTime: video.currentTime
    };

    // 记录播放开始时间
    if (!interactionData.videoStats.startTime) {
        interactionData.videoStats.startTime = now;
    }
    interactionData.videoStats.lastPlayStart = now;

    interactionData.playEvents.push(event);
});

video.addEventListener('pause', () => {
    const now = Date.now();
    const event = {
        type: 'pause',
        timestamp: now,
        videoTime: video.currentTime
    };

    // 计算本次播放时长并累加
    if (interactionData.videoStats.lastPlayStart) {
        const duration = (now - interactionData.videoStats.lastPlayStart) / 1000; // 转为秒
        interactionData.videoStats.totalPlayTime += duration;
        console.log(`本次播放: ${duration.toFixed(2)}秒，总时长: ${interactionData.videoStats.totalPlayTime.toFixed(2)}秒`);
    }

    interactionData.pauseEvents.push(event);
});

video.addEventListener('ended', () => {
    // 视频结束时也计算最后一段播放时长
    if (interactionData.videoStats.lastPlayStart) {
        const duration = (Date.now() - interactionData.videoStats.lastPlayStart) / 1000;
        interactionData.videoStats.totalPlayTime += duration;
        console.log(`视频结束，最后一段播放: ${duration.toFixed(2)}秒，总时长: ${interactionData.videoStats.totalPlayTime.toFixed(2)}秒`);
    }
});

video.addEventListener('seeked', (e) => {
    const event = {
        type: 'seek',
        timestamp: Date.now(),
        fromTime: e.target._lastTime || 0,
        toTime: video.currentTime
    };
    interactionData.seekEvents.push(event);
    e.target._lastTime = video.currentTime;
});

// 鼠标移动跟踪（保持不变）
const videoContainer = document.getElementById('video-container');
videoContainer.addEventListener('mousemove', throttle((e) => {
    const rect = videoContainer.getBoundingClientRect();
    const position = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        timestamp: Date.now(),
        videoTime: video.currentTime
    };
    interactionData.mouseMovements.push(position);
}, 200));

// 节流函数（保持不变）
function throttle(fn, delay) {
    let lastCall = 0;
    return function(...args) {
        const now = new Date().getTime();
        if (now - lastCall < delay) return;
        lastCall = now;
        return fn(...args);
    }
}