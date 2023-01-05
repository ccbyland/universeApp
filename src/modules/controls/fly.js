import {
  FlyControls
} from 'three/examples/jsm/controls/FlyControls';
import { movementSpeed } from '../../config';

/**
 * ==============以下按键会移动位置
 * W 向前移动
 * S 向后移动
 * A 向左移动
 * D 向右移动
 * 
 * R 向上移动
 * F 向下移动
 * 
 * Q 向左翻滚
 * E 向右翻滚
 * 
 * ==============以下按键只会改变视野方向
 * 上方向键 向上看
 * 下方向键 向下看
 * 左方向键 向左看
 * 右方向键 向右看
 *
 * @export
 * @param {*} CAMERA
 * @param {*} RENDERER
 * @return {*} 
 */
export function init(CAMERA, RENDERER) {

  const CONTROLS = new FlyControls(CAMERA, RENDERER.domElement);
  // 移动速度，默认为1
  CONTROLS.movementSpeed = movementSpeed;
  // 旋转速度，默认为0.005
  CONTROLS.rollSpeed = Math.PI / 12;
  // 若该值设为true，初始变换后，摄像机将自动向前移动（且不会停止），默认为false
  CONTROLS.autoForward = false;
  // 若该值设为true，你将只能通过执行拖拽交互来环视四周，默认为false
  CONTROLS.dragToLook = true;
  return CONTROLS;
}