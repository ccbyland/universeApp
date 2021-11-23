import * as THREE from "three";
import {
  getSphereGeometry
} from "../common/geometry";
import {
  getMaterial
} from "../common/material";
import {
  airshipDistance,
  airshipRadius,
  collisionThreshold
} from '../config';

export function init(SCENE) {
  // 新建组
  const group = new THREE.Group();
  // 几何图形
  const sphere = getSphereGeometry(airshipRadius, 8, 8);
  // 材质
  const material = getMaterial('MeshBasic', {
    color: 0xffffff,
    wireframe: true,
  });
  // 生成网格
  const mesh = new THREE.Mesh(sphere, material);
  // 设置投影
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  // 缩放
  // mesh.scale.x = 0.3;
  // mesh.scale.y = 0.5;
  // mesh.rotation.x = 0.05 * Math.PI;
  // 添加到组中
  group.add(mesh);
  group.position.set(0, 0, 5000);
  group._name = '飞船';
  SCENE.add(group);
  return group;
}

/**
 * 飞船位置更新
 */
export function update(CAMERA, SCENE, AIRSHIP, FLY_CONTROLS) {
  // 相机位置
  const position = CAMERA.getWorldPosition();
  // 相机位置 -> 中心点  ===  方向向量
  const direction = CAMERA.getWorldDirection();
  // 飞船位置
  const _x = airshipDistance * direction.x + position.x;
  const _y = airshipDistance * direction.y + position.y;
  const _z = airshipDistance * direction.z + position.z;
  // 碰撞检测
  AIRSHIP.position.set(_x, _y, _z);
  // collisionDetection(SCENE, AIRSHIP).then((star) => {
  //   const {
  //     id,
  //     name
  //   } = star;
  //   console.error(`即将与${name}碰撞`);
  //   FLY_CONTROLS.movementSpeed = 0;
  //   FLY_CONTROLS.rollSpeed = 0;
  // }).catch(() => {
  //   console.error('没碰撞');
  //   AIRSHIP.position.set(_x, _y, _z);
  // });
}

/**
 * 碰撞检测
 *
 * @param {*} SCENE
 * @param {*} AIRSHIP
 */
function collisionDetection(SCENE, AIRSHIP) {

  return new Promise((resolve, reject) => {
    // 飞船
    const airshipMesh = AIRSHIP.children[0];
    const airshipPosition = airshipMesh.getWorldPosition();

    // 星球组
    const meshList = getStarMesh(SCENE);
    meshList.forEach(obj => {
      const {
        _star,
        _id,
        _name,
        _radius
      } = obj;
      const objPosition = obj.getWorldPosition();
      const distance = airshipPosition.distanceTo(objPosition);
      if (_star && distance - (_radius + airshipRadius) < collisionThreshold) {
        return resolve({
          id: _id,
          name: _name
        });
      }
    });
    return reject();
  })
}

/**
 * 获取所有星球Mesh对象
 *
 * @param {*} SCENE
 * @return {*} 
 */
function getStarMesh(SCENE) {
  const list = [];
  const group = SCENE.children.find(item => {
    return item._name == "PARENT_GROUP";
  });
  if (group && group.children.length) {
    getStarMeshTask(group.children[0].children, list);
  }
  return list;
}

/**
 * 获取所有星球Mesh对象
 *
 * @param {*} children
 * @param {*} list
 */
function getStarMeshTask(children, list) {
  children.forEach(element => {
    if (element.type == "Mesh") {
      list.push(element);
    } else {
      getStarMeshTask(element.children, list);
    }
  });
}