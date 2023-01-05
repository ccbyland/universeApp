/**
 * 基础
 */

import * as THREE from "three";

/**
 * 创建场景
 * 场景允许你在什么地方、摆放什么东西来交给three.js来渲染，这是你放置物体、灯光和摄像机的地方。
 * @export
 * @return {*}
 */
export function getScene() {
  return new THREE.Scene();
}

/**
 * 创建相机
 *
 * @export
 * @param {*} type 相机类型
 * @param {*} opt
 * @return {*}
 */
export function getCamera(type, opt) {
  if (type === "perspective") {
    return getPerspectiveCamera(...opt);
  }
  return null;
}

/**
 * 创建透视相机
 * 这一投影模式被用来模拟人眼所看到的景象，它是3D场景的渲染中使用得最普遍的投影模式。
 *
 * @param {*} fov 摄像机视锥体垂直视野角度
 * @param {*} aspect 摄像机视锥体长宽比
 * @param {*} near 摄像机视锥体近端面
 * @param {*} far 摄像机视锥体远端面
 * @return {*}
 */
function getPerspectiveCamera(fov, aspect, near, far) {
  return new THREE.PerspectiveCamera(fov, aspect, near, far);
}

/**
 * 创建渲染器
 *
 * @export
 * @param {*} type 渲染器类型
 * @param {*} opt
 * @return {*}
 */
export function getRenderer(type, opt) {
  // webGl渲染器
  if (type === "webGl") {
    return new THREE.WebGLRenderer(opt);
  }
  return null;
}