import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

camera.position.set(6, 4, 10);
camera.lookAt(0, 0, 0);

const light = new THREE.PointLight(0xffffff, 50, 10);
light.position.set(5, 5, 5);
scene.add(light);


// 車輪クラス
class wheel extends THREE.Object3D {

  constructor(radius, width, segments, color, x, y, z) {

    super();

    this.geometry = new THREE.CylinderGeometry(
      radius,
      radius,
      width,
      segments
    );

    this.material = new THREE.MeshPhongMaterial({
      color: color
    });

    this.mesh = new THREE.Mesh(
      this.geometry,
      this.material
    );

    this.mesh.rotation.x = Math.PI / 2;

    this.position.set(x, y, z);

    this.add(this.mesh);
  }

  rotateWheel(speed) {
    this.rotation.z += speed;
  }
}


// 機関車グループ
const trainGroup = new THREE.Group();


// 車体
const bodyGeo = new THREE.CylinderGeometry(1, 1, 4, 32);
const bodyMat = new THREE.MeshPhongMaterial({
  color: 0x00ff00
});

const body = new THREE.Mesh(bodyGeo, bodyMat);
body.rotation.z = Math.PI / 2;
body.position.set(0, 1, 0);

trainGroup.add(body);


// 運転席
const cabinGeo = new THREE.BoxGeometry(2, 3, 2);
const cabinMat = new THREE.MeshPhongMaterial({
  color: 0x0000ff
});

const cabin = new THREE.Mesh(cabinGeo, cabinMat);
cabin.position.set(2, 2, 0);

trainGroup.add(cabin);


// 煙突
const chimneyGeo = new THREE.CylinderGeometry(
  0.3,
  0.3,
  1,
  32
);

const chimneyMat = new THREE.MeshPhongMaterial({
  color: 0x663300
});

const chimney = new THREE.Mesh(
  chimneyGeo,
  chimneyMat
);

chimney.position.set(-1.5, 2.2, 0);

trainGroup.add(chimney);


// 赤い大車輪
const wheelBig1 = new wheel(
  0.9,
  0.3,
  32,
  0xff0000,
  2.0,
  1.0,
  -1.1
);

const wheelBig2 = new wheel(
  0.9,
  0.3,
  32,
  0xff0000,
  2.0,
  1.0,
  1.1
);

trainGroup.add(wheelBig1);
trainGroup.add(wheelBig2);


// 黄色い小車輪
const wheelSmall1 = new wheel(
  0.4,
  0.25,
  32,
  0xffff00,
  -1.4,
  0.4,
  -1.1
);

const wheelSmall2 = new wheel(
  0.4,
  0.25,
  32,
  0xffff00,
  -0.2,
  0.4,
  -1.1
);

const wheelSmall3 = new wheel(
  0.4,
  0.25,
  32,
  0xffff00,
  -1.4,
  0.4,
  1.1
);

const wheelSmall4 = new wheel(
  0.4,
  0.25,
  32,
  0xffff00,
  -0.2,
  0.4,
  1.1
);

trainGroup.add(wheelSmall1);
trainGroup.add(wheelSmall2);
trainGroup.add(wheelSmall3);
trainGroup.add(wheelSmall4);


scene.add(trainGroup);


function animate() {

  requestAnimationFrame(animate);

  trainGroup.rotation.y += 0.01;

  wheelBig1.rotateWheel(0.1);
  wheelBig2.rotateWheel(0.1);

  wheelSmall1.rotateWheel(0.1);
  wheelSmall2.rotateWheel(0.1);
  wheelSmall3.rotateWheel(0.1);
  wheelSmall4.rotateWheel(0.1);

  controls.update();

  renderer.render(scene, camera);
}

animate();