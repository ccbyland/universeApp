import * as THREE from "three";
import {
  getBufferGeometry
} from "../common/geometry";
import {
  getMaterial
} from "../common/material";

export function add(SCENE) {

  const vertices = [];
  for (let i = 0; i < 30000; i++) {
    // 在区间 [-6000,6000] 内随机一个浮点数。
    const x = THREE.MathUtils.randFloatSpread(15000);
    const y = THREE.MathUtils.randFloatSpread(15000);
    const z = THREE.MathUtils.randFloatSpread(15000);
    vertices.push(x, y, z);
  }

  const geometry = getBufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

  const TextureLoader = new THREE.TextureLoader();
  const texture = TextureLoader.load(require(`../resources/2k_sun.jpeg`).default);
  const material = getMaterial('Points', {
    size: 10,    
    // map: texture,
    // color: 0xFFFFFF * Math.random(),
    color: 0xFFFFFF
  });
  const points = new THREE.Points(geometry, material);
  points._name = '粒子';
  SCENE.add(points);
}