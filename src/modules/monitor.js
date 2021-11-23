import Stats from 'stats.js';

/**
 * 动画性能组件
 *
 * @export
 * @param {*} type 0:fps, 1: ms, 2: mb, 3+: custom
 * @return {*} 
 */
export function initStats(type = 0) {
  const stats = new Stats();
  stats.showPanel(type);
  document.body.appendChild(stats.dom);
  return stats;
}