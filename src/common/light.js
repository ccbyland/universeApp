const THREE = require('three');

/**
 * 创建聚光灯   
 *
 * @export
 * @param {*} color 光照颜色，默认为0xffffff
 * @param {*} intensity 光照强度，默认为1
 * @param {*} distance  从光源发出光的最大距离，其强度根据光源的距离线性衰减
 * @param {*} angle 光线散射角度，最大为Math.PI/2
 * @param {*} penumbra 聚光锥的半影衰减百分比，在0和1之间的值，默认为0
 * @param {*} decay 沿着光照距离的衰减量
 * @return {*} 
 */
export function getSpotLight(color, intensity, distance, angle, penumbra, decay) {
    return new THREE.SpotLight(color, intensity, distance, angle, penumbra, decay);
}

/**
 * 创建点光源
 *
 * @export
 * @param {*} color 光照颜色，默认 0xffffff
 * @param {*} intensity 光照强度，默认值 1
 * @param {*} distance 这个距离表示从光源到光照强度为0的位置，当设置为0时，光永远不会消失(距离无穷大)默认值 0
 * @param {*} decay 沿着光照距离的衰退量，默认值 1
 * @return {*} 
 */
export function getPointLight(color, intensity, distance, decay) {
    return new THREE.PointLight(color, intensity, distance, decay);
}