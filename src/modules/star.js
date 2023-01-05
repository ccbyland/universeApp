/**
 * 星球
 */

import * as THREE from "three";
import {
  getSphereGeometry
} from "../common/geometry";
import {
  getMaterial
} from "../common/material";
// 宇宙数据
import {
  galaxyList
} from '../constant/cosmicData';
import { orbitalMode, showPlanet, showTrack } from '../config';

// 纹理加载器
const TextureLoader = new THREE.TextureLoader();
const turnData = [];
/**
 * 添加星球
 *
 * @export
 * @param {*} SCENE 场景
 */
export function add(SCENE) {
  SCENE.add(analysisStars(galaxyList));
}
/**
 * 解析星球配置
 * @param {*} list
 * @return {*} 
 */
function analysisStars(list) {
  // 创建组
  const parentGroup = new THREE.Group();
  parentGroup._name = 'PARENT_GROUP';
  list.forEach(galaxy => {
    let {
      id, // 唯一标识
      name, // 名字
      radius, // 半径
      distance, // 距离
      rotationRadian, // 自转时间
      revolutionRadian, // 公转时间
      revolutionDirection, // 公转方向
      textureImg, // 纹理图
      haloTextureImg, // 星球环贴图
      isLuminous, // 是否自发光
      satelliteList, // 卫星
      subset // 子集
    } = formatData(galaxy);
    // 创建组
    const group = new THREE.Group();
    group._name = `${name}_GROUP`;
    // 制造星球
    const mesh = makeStar({
      id,
      name,
      radius,
      isLuminous,
      haloTextureImg,
      textureImg: require(`../resources/${textureImg}`).default,
      satelliteList,
    });
    // 空间位置
    mesh.position.set(distance, 0, 0);
    // 添加到组中
    group.add(mesh);
    // 添加轨道
    if(showTrack){
      const track = getTrack(id, distance);
      if (track) {
        group.add(track);
      }
    }
    // 检查子集
    if (subset && subset.length && showPlanet) {
      // 递归解析
      const stars = analysisStars(subset);
      group.add(stars);
    }
    // 轨道倾斜
    if(orbitalMode == 2){
      group.rotation.x = Number(Math.random()) * Math.PI;
    }
    // 添加到父组中
    parentGroup.add(group);
    // 收集转动数据（自转、公转）
    turnData.push({
      id,
      group,
      mesh,
      rotationRadian,
      revolutionRadian,
      revolutionDirection,
    });
  });
  return parentGroup;
}

/**
 * 制造星球
 * @param {*} isLuminous 自发光
 * @param {*} opt
 */
function makeStar({
  id,
  name,
  radius,
  isLuminous,
  haloTextureImg,
  textureImg,
  satelliteList
}) {
  // 新建组
  const group = new THREE.Group();
  group._name = `${name}_group`;
  // 几何图形
  const sphere = getSphereGeometry(radius, 50, 50);
  // 纹理
  const texture = TextureLoader.load(textureImg);
  // 材质
  const material = getMaterial('MeshLambert', getMaterialOpt(isLuminous, texture));
  // 生成网格
  const mesh = new THREE.Mesh(sphere, material);
  mesh._name = name;
  mesh._id = id;
  mesh._radius = radius;
  mesh._star = true;
  // 设置投影
  if (!isLuminous) {
    mesh.castShadow = true;
    mesh.receiveShadow = true;
  }
  // 添加到组中
  group.add(mesh);
  // 获取光环
  if (haloTextureImg) {
    group.add(getHalo(haloTextureImg, radius));
  }
  if (satelliteList && satelliteList.length) {
    satelliteList.forEach(satellite => {
      group.add(getSubsetTrack(satellite));
    })
  }
  return group;
}

/**
 * 获取材质配置
 * @param {*} isLuminous
 * @param {*} texture
 * @return {*} 
 */
function getMaterialOpt(isLuminous, texture) {
  if (isLuminous) {
    return {
      // 材质的放射（光）颜色，基本上是不受其他光照影响的固有颜色，默认为黑色
      emissive: '#FF6633',
      // 设置放射（发光）贴图，默认值为null，放射贴图颜色由放射颜色和强度所调节
      // 如果你有一个放射贴图，请务必将放射颜色设置为黑色以外的其他颜色
      emissiveMap: texture,
      //放射光强度，调节发光颜色，默认为1
      emissiveIntensity: 3
    }
  } else {
    // 颜色贴图，默认为null
    return {
      map: texture
    }
  }
}

/**
 * 获取星球光环
 * @param {*} haloTextureImg
 * @param {*} radius
 * @return {*} 
 */
function getHalo(haloTextureImg, radius) {
  // 几何图形
  const torus = new THREE.TorusGeometry(radius + 90, 30, 50, 50);
  // 材质
  const texture = TextureLoader.load(require(`../resources/${haloTextureImg}`).default);
  const material = new THREE.MeshLambertMaterial({
    // 材质的放射（光）颜色，基本上是不受其他光照影响的固有颜色，默认为黑色
    emissive: '#666666',
    // 设置放射（发光）贴图，默认值为null，放射贴图颜色由放射颜色和强度所调节
    // 如果你有一个放射贴图，请务必将放射颜色设置为黑色以外的其他颜色
    emissiveMap: texture,
    //放射光强度，调节发光颜色，默认为1
    emissiveIntensity: 1,
    // map: texture,
  });
  // 生成网格
  const mesh = new THREE.Mesh(torus, material);
  mesh._name = '光环';
  mesh.rotation.x = -0.5 * Math.PI;
  // 缩放
  mesh.scale.z = 0.15
  // 设置阴影
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

/**
 * 获取子卫星
 * @param {*} satellite
 * @return {*} 
 */
function getSubsetTrack(satellite) {
  const group = new THREE.Group();
  let {
    id,
    name, // 名字
    radius, // 半径
    textureImg, // 纹理图
    haloTextureImg, // 星球环贴图
    isLuminous, // 是否自发光
    satelliteList, // 卫星
    rotationRadian, // 自转时间
    revolutionRadian, // 公转时间
    revolutionDirection, // 公转方向
  } = formatData(satellite);
  // 制造星球
  const mesh = makeStar({
    name,
    radius,
    isLuminous,
    haloTextureImg,
    textureImg: require(`../resources/${textureImg}`).default,
    satelliteList,
  });
  // 地球半径 + 月球半径 + 地月距离
  const _len = 120 + radius + 20;
  // 设置空间位置
  mesh.position.set(0, 0, _len);
  // 添加到组中
  group.add(mesh);
  // 添加轨道
  if(showTrack){
    const track = getTrack(id, _len);
    // 添加到组中
    group.add(track);
  }
  // 收集转动数据（自转、公转）
  turnData.push({
    id,
    group,
    mesh,
    rotationRadian,
    revolutionRadian,
    revolutionDirection
  });
  // 轨道倾斜
  if(orbitalMode == 2){
    group.rotation.x = Number(Math.random()) * Math.PI;
  }
  return group;
}

/**
 * 添加轨道
 * @param {*} id 唯一标识
 * @param {*} distance 距离
 * @return {*} 
 */
function getTrack(id, distance) {
  // 添加太阳系行星轨道
  if (id != 'sun') {
    /**
     * 三维圆环
     * 圆环的半径\圆环管子的半径\圆环管道截面的分段数\管道的分段数
     */
    const torus = new THREE.TorusGeometry(distance, 1, 50, 50);
    const material = new THREE.MeshBasicMaterial({
      color: '#FFFFFF'
    });
    const mesh = new THREE.Mesh(torus, material);
    mesh._name = '轨道';
    mesh.rotation.x = -0.5 * Math.PI;
    return mesh;
  }
}

/**
 * 格式化数据
 *
 * @return {*} 
 */
function formatData(obj) {
  obj.radius = Number(obj.radius.toFixed(2));
  obj.distance = Number(obj.distance.toFixed(2));
  return obj;
}

/**
 * 添加转动 自转和公转
 *
 * @export
 */
export function rotation() {
  turnData.forEach(item => {
    let {
      id,
      group,
      mesh,
      rotationRadian,
      revolutionRadian,
      revolutionDirection
    } = item;

    // 自转
    if (rotationRadian) {
      mesh.rotation.y += Number(rotationRadian);
    }

    // 公转
    if (revolutionRadian && id != 'sun') {
      if (revolutionDirection == 'anti') {
        group.rotation.y -= Number(revolutionRadian);
      } else {
        group.rotation.y += Number(revolutionRadian);
      }
    }
  });
}