import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls'

/**
 * 轨迹球控制器
 *
 * @export
 */
export function init(CAMERA, RENDERER) {
  const CONTROLS = new TrackballControls(CAMERA, RENDERER.domElement)
  // 是否启用控制器
  CONTROLS.enabled = true
  // 你能够将相机向内移动多少，其默认值为0
  CONTROLS.minDistance = 0
  // 你能够将相机向外移动多少，其默认值为Infinity
  CONTROLS.maxDistance = 50000

  // 是否禁用平移，默认为false
  CONTROLS.noPan = false
  // 平移的速度，其默认值为0.3
  CONTROLS.panSpeed = 0.3

  // 是否禁用旋转，默认为false
  CONTROLS.noRotate = false
  // 旋转的速度，其默认值为1.0
  CONTROLS.rotateSpeed = 1

  // 是否禁用缩放，默认为false
  CONTROLS.noZoom = false
  // 缩放的速度，其默认值为1.2
  CONTROLS.zoomSpeed = 1.2

  CONTROLS.addEventListener('change', function () {
    // console.log("相机动了！");
  })

  return CONTROLS
}
