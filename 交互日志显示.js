function displayInteractionLog() {
    const logContainer = document.createElement('div');
    logContainer.className = 'interaction-log';

    // 播放统计
    const stats = `
        <div class="log-section">
            <h3>播放统计</h3>
            <p>总播放时长: ${formatTime(interactionData.videoStats.totalPlayTime)}</p>
            <p>暂停次数: ${interactionData.pauseEvents.length}</p>
            <p>跳转次数: ${interactionData.seekEvents.length}</p>
        </div>
    `;

    // 事件日志
    const events = interactionData.playEvents
        .concat(interactionData.pauseEvents)
        .concat(interactionData.seekEvents)
        .sort((a, b) => a.timestamp - b.timestamp);

    let eventLog = '<div class="log-section"><h3>事件序列</h3><ul>';
    events.forEach(event => {
        eventLog += `<li>[${formatTime(event.videoTime)}] ${event.type.toUpperCase()}</li>`;
    });
    eventLog += '</ul></div>';

    logContainer.innerHTML = stats + eventLog;
    document.body.appendChild(logContainer);
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}