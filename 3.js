// 示例弹幕数据
const sampleDanmakus = [
    "这个视频太棒了！",
    "666666",
    "前方高能预警！",
    "哈哈哈笑死我了",
    "学到了学到了",
    "打卡签到",
    "UP主辛苦了",
    "这个特效绝了",
    "再来亿遍！",
    "有人和我一样看到这里的吗？",
    "弹幕护体",
    "进度条撑住啊",
    "泪目了",
    "这个转场太丝滑了",
    "三连已给",
    "空降成功",
    "名场面打卡",
    "背景音乐是什么？",
    "这个知识点我记下了",
    "完结撒花",
      "这个视频太棒了！",
    "666666",
    "前方高能预警！",
    "哈哈哈笑死我了",
    "学到了学到了",
    "打卡签到",
    "UP主辛苦了",
    "这个特效绝了",
];

// 初始化弹幕
function initDanmakus() {
    const danmakuContainer = document.getElementById('danmaku-container');
    const videoPlayer = document.getElementById('video-player');

    sampleDanmakus.forEach(text => {
        const danmaku = document.createElement('div');
        danmaku.textContent = text;
        danmaku.classList.add('danmaku');

        // 随机颜色
        const colors = ['#ff0000', '#ffff00', '#00ff00', '#00ffff', '#ff00ff', '#ffffff'];
        danmaku.style.color = colors[Math.floor(Math.random() * colors.length)];

        // 随机位置
        danmaku.style.left = `${videoPlayer.offsetWidth + 100}px`; // 从右侧开始
        const videoHeight = document.getElementById('video-player').offsetHeight;
        danmaku.style.top = `${Math.random() * (videoHeight * 0.25)}px`; // 0-10%高度

        danmakuContainer.appendChild(danmaku);

        // 随机速度 (3-8秒完成动画)
        const duration = 3000 + Math.random() * 5000;

        danmaku.animate([
            { transform: 'translateX(0)', opacity: 1 },
            { transform: `translateX(-${videoPlayer.offsetWidth + 200}px)`, opacity: 0 }
        ], {
            duration: duration,
            iterations: 1,
            fill: 'forwards'
        });
    });
}

// 切换输入框显示状态
function toggleInput() {
    const input = document.getElementById('danmaku-text');
    const button = document.getElementById('toggle-button');

    if (input.style.display === 'none' || input.style.display === '') {
        input.style.display = 'block';
        input.focus(); // 自动聚焦输入框
        button.textContent = '发送弹幕';
    } else {
        input.style.display = 'none';
        button.textContent = '点击发送弹幕';
    }
}

// 发送弹幕
function sendDanmaku() {
    const danmakuText = document.getElementById('danmaku-text').value;
    if (danmakuText.trim() === '') return;

    const danmakuContainer = document.getElementById('danmaku-container');
    const videoPlayer = document.getElementById('video-player');
    const danmaku = document.createElement('div');

    danmaku.textContent = danmakuText;
    danmaku.classList.add('danmaku');

    // 随机颜色
    const colors = ['#ff0000', '#ffff00', '#00ff00', '#00ffff', '#ff00ff', '#ffffff'];
    danmaku.style.color = colors[Math.floor(Math.random() * colors.length)];

    // 随机位置
    danmaku.style.left = `${videoPlayer.offsetWidth + 100}px`;
    const videoHeight = document.getElementById('video-player').offsetHeight;
    danmaku.style.top = `${Math.random() * (videoHeight * 0.25)}px`; // 0-10%高度

    danmakuContainer.appendChild(danmaku);

    // 动画效果
    const duration = 5000; // 5秒完成动画

    danmaku.animate([
        { transform: 'translateX(0)', opacity: 1 },
        { transform: `translateX(-${videoPlayer.offsetWidth + 200}px)`, opacity: 0 }
    ], {
        duration: duration,
        iterations: 1,
        fill: 'forwards'
    });

    // 动画完成后移除DOM元素
    setTimeout(() => {
        danmaku.remove();
    }, duration);

    // 重置输入状态
    document.getElementById('danmaku-text').style.display = 'none';
    document.getElementById('toggle-button').textContent = '点击发送弹幕';
    document.getElementById('danmaku-text').value = '';
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    // 添加事件监听
    document.getElementById('toggle-button').addEventListener('click', toggleInput);

    document.getElementById('danmaku-text').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            sendDanmaku();
        }
    });
document.getElementById('click-image').addEventListener('click', function() {
        // 跳转到另一个页面
        window.location.href = 'http://localhost:63342/PycharmProjects/api%20%E8%B0%83%E7%94%A8/index.html?_ijt=609p7i2cshknuk9fbgclnn05g6';
    });
    // 预加载20条示例弹幕
    initDanmakus();
});