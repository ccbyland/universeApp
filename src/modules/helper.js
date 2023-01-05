/**
 * 辅助
 */

import {
  getAxesHelper
} from '../common/helper';

/**
 * 初始化工具对象
 *
 * @export
 */
export function init(SCENE) {
  initAxesHelper(SCENE);
}
/**
 * 初始化坐标轴
 */
function initAxesHelper(SCENE) {
  SCENE.add(getAxesHelper(6000));
}