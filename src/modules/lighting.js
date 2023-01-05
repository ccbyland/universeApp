/**
 * 光源
 */

import * as THREE from "three";
import {
  getSpotLight,
  getPointLight,
} from "../common/light";

export function init(SCENE) {
  // addSpotLight(SCENE);
  addPointLight(SCENE);
}

/**
 * 添加一个聚光灯
 *
 * @param {*} SCENE
 */
function addSpotLight(SCENE) {
  // 构造光源
  const light = getSpotLight(0xFFFFFF, 1.5);
  // 设置空间位置
  light.position.set(1, 0, 0);
  // 开启投射阴影
  light.castShadow = true;
  // 阴影映射宽度和阴影映射高度，决定了有多少像素用来生成阴影
  // 当阴影具有锯齿状边缘或看起来不光滑时，可以增加这个值，在场景渲染之后无法更改
  light.shadow.mapSize = new THREE.Vector2(2048, 2048);
  // 表示到距离光源的哪一个位置可以生成阴影
  light.shadow.camera.far = 6000;
  // 表示距离光源的哪一个位置开始生成阴影
  light.shadow.camera.near = 0.1;
  // 添加到场景中
  SCENE.add(light);
}

/**
 * 添加一个点光源
 *
 * @param {*} SCENE
 */
function addPointLight(SCENE) {
  // 构造光源
  const light = getPointLight(0xffffff, 3.5, 6000);
  // 设置空间位置
  light.position.set(0, 0, 0);
  // 开启投影
  light.castShadow = true;
  // 阴影映射宽度和阴影映射高度，决定了有多少像素用来生成阴影
  // 当阴影具有锯齿状边缘或看起来不光滑时，可以增加这个值，在场景渲染之后无法更改
  light.shadow.mapSize = new THREE.Vector2(2048, 2048);
  // 表示到距离光源的哪一个位置可以生成阴影
  light.shadow.camera.far = 10000;
  // 表示距离光源的哪一个位置开始生成阴影
  light.shadow.camera.near = 0.1;
  // 添加到场景中
  SCENE.add(light);
}