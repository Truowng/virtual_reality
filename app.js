import * as THREE from "https://threejs.org/build/three.module.js";
import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://threejs.org/examples/jsm/loaders/GLTFLoader.js";

let scene,
  camera,
  renderer,
  controls,
  hlight,
  light,
  light2,
  light3,
  light4,
  directionalLight,
  car;

function init() {
  // Create Scene
  scene = new THREE.Scene();

  // Set background color
  scene.background = new THREE.Color(0x232323);

  // Render
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  //   Set camera
  camera = new THREE.PerspectiveCamera(
    40,
    window.innerWidth / window.innerHeight,
    1,
    5000
  );
  camera.rotation.y = (45 / 180) * Math.PI;
  camera.position.x = 5;
  camera.position.y = 5;
  camera.position.z = 5;

  //  Set controls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.addEventListener("change", renderer);

  //   Setup lights

  //   Ambient Light
  hlight = new THREE.AmbientLight(0x333333, 80);
  scene.add(hlight);

  //   Direction Light
  directionalLight = new THREE.DirectionalLight(0x000000, 300);
  directionalLight.position.set(0, 1, 0);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  //   Another Light
  light = new THREE.PointLight(0x454545, 10);
  light.position.set(0, 300, 500);
  scene.add(light);

  light2 = new THREE.PointLight(0x454545, 10);
  light2.position.set(500, 100, 0);
  scene.add(light2);

  light3 = new THREE.PointLight(0x454545, 10);
  light3.position.set(0, 100, -500);
  scene.add(light3);

  light4 = new THREE.PointLight(0x454545, 10);
  light4.position.set(-500, 300, 500);
  scene.add(light4);

  // Add 3D Model
  let loader = new GLTFLoader();

  loader.load("scene.gltf", function (gltf) {
    car = gltf.scene.children[0];
    // car.scale.set(0.5, 0.5, 0.5);
    scene.add(gltf.scene);
    animate();
  });

  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

init();
