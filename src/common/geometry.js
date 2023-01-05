/**
 * 几何体
 */

const THREE = require('three');

/**
 * 几何体基类
 *
 * @export
 * @param {*} parameters
 * @return {*} 
 */
export function getBufferGeometry(parameters) {
    return new THREE.BufferGeometry(parameters);
}
/**
 * 创建立方几何体
 *
 * @export
 * @param {*} width X轴上面的宽度，默认值为1
 * @param {*} height Y轴上面的高度，默认值为1
 * @param {*} depth Z轴上面的深度，默认值为1
 * @param {*} widthSegments 宽度的分段数，默认值是1
 * @param {*} heightSegments 宽度的分段数，默认值是1
 * @param {*} depthSegments 宽度的分段数，默认值是1
 * @return {*} 
 */
export function getBoxGeometry(width, height, depth, widthSegments, heightSegments, depthSegments) {
    return new THREE.BoxGeometry(width, height, depth, widthSegments, heightSegments, depthSegments);
}

/**
 * 创建球几何体
 *
 * @export
 * @param {*} radius 球体半径，默认为1
 * @param {*} widthSegments 水平分段数（沿着经线分段），最小值为3，默认值为8
 * @param {*} heightSegments 垂直分段数（沿着纬线分段），最小值为2，默认值为6
 * @param {*} phiStart 指定水平（经线）起始角度，默认值为0
 * @param {*} phiLength 指定水平（经线）扫描角度的大小，默认值为 Math.PI * 2
 * @param {*} thetaStart 指定垂直（纬线）起始角度，默认值为0
 * @param {*} thetaLength 指定垂直（纬线）扫描角度大小，默认值为 Math.PI
 * @return {*} 
 */
export function getSphereGeometry(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength) {
    return new THREE.SphereGeometry(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength);
}

/**
 * 创建平面几何体
 *
 * @export
 * @param {*} width 平面沿着X轴的宽度，默认值是1
 * @param {*} height 平面沿着Y轴的高度，默认值是1
 * @param {*} widthSegments 平面的宽度分段数，默认值是1
 * @param {*} heightSegments 平面的高度分段数，默认值是1
 * @return {*} 
 */
export function getPlaneGeometry(width, height, widthSegments, heightSegments) {
    return new THREE.PlaneGeometry(width, height, widthSegments, heightSegments);
}