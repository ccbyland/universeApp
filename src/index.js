import * as THREE from "three";
import {
  getScene,
  getCamera,
  getRenderer
} from "./common/base";
import {
  init as initTrackballControl
} from './modules/controls/trackball';
import {
  init as FlyControls
} from './modules/controls/fly';
import {
  init as initEvent
} from './modules/event';
import {
  init as initHelper
} from './modules/helper';
import {
  add as addSprite
} from './modules/sprite';
import {
  init as initLighting
} from './modules/lighting';
import {
  init as initAirship,
  update as updateAirship
} from './modules/airship';
import {
  initStats
} from './modules/monitor';
import {
  add as addStar,
  rotation as starRotation
} from './modules/star';
import {
  cameraPosition,
  controlMode,
  starTurn,
  animateSpeed,
  showLighting,
  showSprite,
  showHelper
} from './config';

require('./index.css');

// 全局变量
const APP = document.getElementById('app'); //场景
// 纹理加载器
const TextureLoader = new THREE.TextureLoader();
// 跟踪时间对象
const Clock = new THREE.Clock();
// 屏幕宽高
const {
  innerWidth,
  innerHeight
} = window;
let RENDERER = null; //渲染器
let SCENE = null; //场景
let CAMERA = null; //相机
let TRACKBALL_CONTROL = null; //轨迹球控制器
let FLY_CONTROLS = null; //飞行控制器
let AIRSHIP = null; //飞船
let Stats = null; //性能监控

/**
 * 初始化渲染器
 */
function initRenderer(el) {
  // 创建一个webGl渲染器
  RENDERER = getRenderer("webGl", {
    // 是否使用对数深度缓存。如果要在单个场景中处理巨大的比例差异，就有必要使用
    logarithmicDepthBuffer: true,
    //是否执行抗锯齿，默认为false
    antialias: true,
    //canvas是否包含alpha (透明度)，默认为 false
    alpha: true,
  });
  RENDERER.setSize(innerWidth, innerHeight);
  //如果设置开启，允许在场景中使用阴影贴图，默认是 false
  RENDERER.shadowMap.enabled = true;
  RENDERER.shadowMapSoft = true;
  RENDERER.shadowMap.type = THREE.PCFSoftShadowMap;
  el.appendChild(RENDERER.domElement);
}

/**
 * 初始化场景
 */
function initScene() {
  SCENE = getScene();
  // 纹理
  const texture = TextureLoader.load(require(`./resources/2k_stars.jpeg`).default);
  SCENE.background = texture;
}
/**
 * 初始化相机
 */
function initCamera() {
  // 获取一个相机
  CAMERA = getCamera("perspective", [45, innerWidth / innerHeight, 1, 30000]);
  // 设置相机位置
  CAMERA.position.set(...cameraPosition);
  // 设置相机朝向
  CAMERA.lookAt(0, 0, 0);
}

/**
 * 渲染页面
 */

function render() {

  // 获取自 oldTime 设置后到当前的秒数，同时将 oldTime 设置为当前时间
  // 如果 autoStart 设置为 true 且时钟并未运行，则该方法同时启动时钟
  const delta = Clock.getDelta();
  Stats.update();

  // 轨道球控制器
  TRACKBALL_CONTROL && TRACKBALL_CONTROL.update(delta);
  // 飞船位置更新
  FLY_CONTROLS && FLY_CONTROLS.update(delta);

  // 动画节流中心
  animateThrottle();

  RENDERER.render(SCENE, CAMERA);
  requestAnimationFrame(render);
};

/**
 * 动画节流
 */
function animateThrottle() {
  // 初始化变量
  if (!window.REQUEST_ANIMATION_COUNT) {
    window.REQUEST_ANIMATION_COUNT = 0;
  }
  // 控制启动时机
  if (window.REQUEST_ANIMATION_COUNT == 0) {
    // 星球转动
    starTurn && starRotation();
    // 飞船位置控制
    AIRSHIP && FLY_CONTROLS && FLY_CONTROLS.movementSpeed && updateAirship(CAMERA, SCENE, AIRSHIP, FLY_CONTROLS);
  }
  // 计数器
  window.REQUEST_ANIMATION_COUNT++;
  // 重置
  if (window.REQUEST_ANIMATION_COUNT >= animateSpeed) {
    window.REQUEST_ANIMATION_COUNT = 0;
  }
}
/**
 * 入口
 */
function run() {

  // 初始化渲染器
  initRenderer(APP);
  // 初始化场景
  initScene();
  // 初始化相机
  initCamera();
  // 初始化灯光
  showLighting && initLighting(SCENE);
  // 添加满天星
  showSprite && addSprite(SCENE);
  // 添加星球
  addStar(SCENE);
  // 初始化飞船
  controlMode == 2 && (AIRSHIP = initAirship(SCENE));
  // 初始化控制器
  if (controlMode == 1) {
    TRACKBALL_CONTROL = initTrackballControl(CAMERA, RENDERER);
  } else if (controlMode == 2) {
    FLY_CONTROLS = FlyControls(CAMERA, RENDERER);
  }
  // 初始化事件
  initEvent(CAMERA, RENDERER);
  // 初始化辅助
  showHelper && initHelper(SCENE);
  // 初始化性能统计
  Stats = initStats(2);
  // 渲染页面
  render();
}

run();