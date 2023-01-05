/**
 * 事件
 */

/**
 * 初始化事件
 *
 * @export
 */
export function init(CAMERA, RENDERER) {
  addResizeEvent(CAMERA, RENDERER);
}

/**
 * 窗口缩放事件
 *
 * @param {*} CAMERA
 * @param {*} RENDERER
 */
function addResizeEvent(CAMERA, RENDERER) {
  window.addEventListener('resize', () => {
    const {
      innerWidth,
      innerHeight
    } = window;
    CAMERA.aspect = innerWidth / innerHeight;
    CAMERA.updateProjectionMatrix()
    RENDERER.setSize(innerWidth, innerHeight);
  }, false);
}