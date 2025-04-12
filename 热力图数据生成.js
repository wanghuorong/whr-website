function generateHeatmapData() {
    // 1. 准备画布
    const canvas = document.createElement('canvas');
    const videoRect = videoContainer.getBoundingClientRect();
    canvas.width = videoRect.width;
    canvas.height = videoRect.height;
    const ctx = canvas.getContext('2d');

    // 2. 创建热度图数据
    const heatmap = {};
    interactionData.mouseMovements.forEach(move => {
        const x = Math.floor(move.x);
        const y = Math.floor(move.y);
        const key = `${x},${y}`;
        heatmap[key] = (heatmap[key] || 0) + 1;
    });

    // 3. 绘制热力图
    const maxCount = Math.max(...Object.values(heatmap));
    Object.keys(heatmap).forEach(key => {
        const [x, y] = key.split(',').map(Number);
        const intensity = heatmap[key] / maxCount;
        const color = getHeatColor(intensity);

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fill();
    });

    return canvas.toDataURL();
}

function getHeatColor(intensity) {
    // 从蓝色(冷)到红色(热)的渐变
    const r = Math.floor(255 * intensity);
    const b = Math.floor(255 * (1 - intensity));
    return `rgb(${r}, 0, ${b})`;
}
