import './style.css'

// document.querySelector('#app').innerHTML = `
//   <h1>Hello Vite!</h1>
//   <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
// `
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Material } from 'three';
import { Light } from 'three';
// import { RectAreaLightUniformsLib } from 'three/RectAreaLightUniformsLib';
// import { HemisphereLight } from 'three/src/lights/HemisphereLight';


const scene = new THREE.Scene();

// these codes are used for fog in the scene
// {
//   const color = 0x1196e4;
//   const near = 10;
//   const far = 100;
//   scene.fog = new THREE.Fog(color, near ,far);
// }
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
scene.add(camera);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(5, 5, 5);
const geometry2 = new THREE.SphereGeometry(5 );
const geometry3 = new THREE.TorusGeometry(5 ,2, 10, 50);
const geometry4 = new THREE.IcosahedronGeometry(5);
const geometry5 = new THREE.CylinderGeometry(5, 5, 20, 32);

// MeshBasic Material
const material2 = new THREE.MeshStandardMaterial(
  {  
   map: new THREE.TextureLoader().load('moon.jpg'),

  color: 0xffffff, 
  opacity: 0.3,
  roughness: 0.5
  });

// In MeshBasicmaterial there are some properties are availabale like transparent and opacity

const material1 = new THREE.MeshLambertMaterial(
  {
    color: 0xf4555c,
    wireframe: false,
    opacity: 1,
    // emissive: 0xffffff,
    map: new THREE.TextureLoader().load('wood.jpg')
  });
const material3 = new THREE.MeshPhongMaterial({
  color: 0xffffff,
  shininess: 0.1,
  map: new THREE.TextureLoader().load('fire.jpg')
  
});
// hello
// lineBasic or Dashed material you have to use this code
const material4 = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('ice.jpg')
  
});
// this function should called for dashed line material
// geometry4.computeLineDistances();

// Points material codes
const material5 = new THREE.PointsMaterial({
  color: 0xffffff
})

// Mesh Matcap Material
const material6 = new THREE.MeshStandardMaterial({
  color: 0xe70814,
  map: new THREE.TextureLoader().load('metal.jpg')
});


// Sprit Material
// const materialsprit = new THREE.SpriteMaterial({
//   map: new THREE.TextureLoader().load('ice.jpg')
// });
//  const sprit = new THREE.Sprite(materialsprit);
//  sprit.scale.set(200, 200, 1);
//  sprit.position.z = -100;
//  scene.add(sprit);
// Sprit only faces to the screen and it acts as a 2d object which taeks only the parameter as material

const cube = new THREE.Mesh(geometry, material1);
cube.position.set(13, 0, 0);
// cube.lookAt(0 ,0 ,0);
const sphere = new THREE.Mesh(geometry2, material2);
const torus = new THREE.Mesh(geometry3 , material3);
torus.position.set(-18 , 0 ,0);
const icso = new THREE.Mesh(geometry4 , material4);
icso.position.set(25 ,0 ,0);
const cylinder = new THREE.Points(geometry5 , material5);
const matcap = new THREE.Mesh(geometry , material6);
matcap.position.set(0 , 0 ,10);





scene.add(cube , sphere , torus, icso, cylinder, matcap);
// color code starts with 0x :- it means it works as a hexa decimal values
camera.position.z = 5;
const controls = new OrbitControls(camera, renderer.domElement);

// Grid in the scene to help to locate the location of the object
// const gridhelper = new THREE.GridHelper(200, 50);
// scene.add(gridhelper);

// Ambient light code

const ambientlight = new THREE.AmbientLight(0xffffff, 1 );
scene.add(ambientlight);
// this light is helps to light all the material and objects globally



// point light code

const pointlight = new THREE.PointLight(0xdf4065, 1, 100);
pointlight.position.set(0, 10, 0);
scene.add(pointlight);
// you can add the PointLightHelper() method to know in which direction the light is coming from 
const pointlighthelper = new THREE.PointLightHelper(pointlight);
scene.add(pointlighthelper);
// RectArea Light code

// const width = 2.0;
// const height = 2.0;
// // const rect = new RectAreaLightUniformsLib();
// // scene.add(rect);
// // rect.init();
// RectAreaLightUniformsLib.init();
// const intensity = 1;
// const rectLight = new THREE.RectAreaLight(0xffffff, intensity, width, height);
// rectLight.position.set(5, 5, 0);
// rectLight.lookAt(0, 0, 0);
// scene.add(rectLight);

// RectArea Light Helper code

// const rectLightHelper = new RectAreaLightHelper(rectLight);
// scene.add(rectLightHelper);

// Directional Light code
// White directional light at half intensity shining from the top.

const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5);
directionalLight.position.set(-30, 5, 0);
directionalLight.lookAt(10, 10, 10);
scene.add( directionalLight );

// Directional Light Helper code

const directionalhelper = new THREE.DirectionalLightHelper(directionalLight);
scene.add(directionalhelper);

// Directional Light 2
const directionallight2 = new THREE.DirectionalLight(0xffffff , 1);
directionallight2.position.set(0, 0, 20);
// directionallight2.lookAt(10,10,10);
directionallight2.target = matcap;
scene.add(directionallight2);

const targetobject = new THREE.Object3D();
scene.add(targetobject);
Light.target = targetobject;

const dirhelper = new THREE.DirectionalLightHelper(directionallight2);
scene.add(dirhelper);
// Hemisphere Light code
// const upcolor = 0xc32d2d;
// const downcolor = 0x4040ff;

// const hemilight =  new THREE.HemisphereLight(upcolor ,  downcolor);
// hemilight.position.set(5 ,5 , 0);
// hemilight.lookAt(0, 0, 0);
// scene.add(hemilight);

// // Hemisphere Light Helper code
//  const hemilighthelper = new THREE.HemisphereLightHelper(hemilight , 5); 
// //  5 is the size of the sphere then you can add color property(optional)
//  scene.add(hemilighthelper);


// Spot Light code
// const spotLight = new THREE.SpotLight( 0x2fea54 );
// spotLight.position.set( 10, 10, 10 );

// spotLight.castShadow = true;

// spotLight.shadow.mapSize.width = 10;
// spotLight.shadow.mapSize.height = 10;

// spotLight.shadow.camera.near = 50;
// spotLight.shadow.camera.far = 40;
// spotLight.shadow.camera.fov = 30;

// scene.add( spotLight );

// Spot light Helper code(to show the position or the source of the source light)
// const spotlighthelper = new THREE.SpotLightHelper(spotLight);
// scene.add(spotlighthelper);

// Light code
// const light = new THREE.Light(0x2fea54, 1)
// scene.add(light);



// Light Helper
// const lighthelper = new THREE.PointLightHelper(pointlight);
// scene.add(lighthelper);

// Background Texture Loader or Image Loader
// const bgtexture = new THREE.TextureLoader().load('bg4.png');
// scene.background = bgtexture;

// const animation = new THREE.LoopOnce();
// scene.add(animation);


function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  sphere.rotation.y +=0.01;

  // Rotation of torus
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;
  torus.rotation.z += 0.01;


  renderer.render(scene, camera);
  controls.update();
};

animate();

