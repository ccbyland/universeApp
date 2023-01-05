/**
 * 辅助工具
 */

import * as THREE from "three";

/**
 * 创建坐标轴对象
 *
 * @export
 * @param {*} size 轴线长度
 * @return {*} 
 */
export function getAxesHelper(size) {
    return new THREE.AxesHelper(size);
}