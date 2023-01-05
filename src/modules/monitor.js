/**
 * 性能检测
 */

import Stats from 'stats.js';

/**
 * 动画性能组件
 *
 * @export
 * @param {*} type 
 * 0: fps 上一秒渲染的FPS帧。数字越高越好 
 * 1: ms 渲染帧需要毫秒。数字越低越好
 * 2: mb 已分配内存
 * 3+: custom 自定义自定义面板支持
 * @return {*} 
 */
export function initStats(type = 0) {
  const stats = new Stats();
  stats.showPanel(type);
  document.body.appendChild(stats.dom);
  return stats;
}