import * as THREE from 'https://cdn.skypack.dev/pin/three@v0.133.1-a8rkd0QTHl2tMZXZJAEw/mode=imports/optimized/three.js';
import { OrbitControls } from 'https://cdn.skypack.dev/pin/three@v0.133.1-a8rkd0QTHl2tMZXZJAEw/mode=imports/unoptimized/examples/jsm/controls/OrbitControls.js'

let image = new Image();
image.src = 'data:image/png;base64,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';
// textura do portão do Doom

let texture = new THREE.Texture(image);

image.onload = () => {
    texture.needsUpdate = true;
    texture.magFilter = THREE.NearestFilter; // filtro a ser utilizado em caso de magnificação.
    texture.minFilter = THREE.NearestFilter; // filtro a ser utilizado em caso de minificação.
    texture.anisotropy = 4; // fator máximo de anisotropia para o filtro anisotrópico.
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
};

let scene = new THREE.Scene();

let camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.01, 100);
camera.position.z = 1.5;

scene.add(camera);

let renderer = new THREE.WebGLRenderer({canvas: document.getElementById("gate"), alpha: true});
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( 720, 360 );
console.log(window.innerHeight, window.innerWidth)
document.getElementById("object").appendChild(renderer.domElement);

let controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.2;
controls.rotateSpeed = 0.05;
controls.screenSpacePanning = true;

let geometry = new THREE.BoxGeometry(1, 1, 1);

//----------------------------------------------------------------------------
// Criação das fontes de luz pontuais.
//----------------------------------------------------------------------------
var point_light1 = new THREE.PointLight(0xffffff);
point_light1.position.set(-10, 10, 20);
scene.add(point_light1);

var point_light2 = new THREE.PointLight(0xffffff);
point_light2.position.set(10, 10, 10);
scene.add(point_light2);

var point_light3 = new THREE.PointLight(0x666666);
point_light3.position.set(0, -10, -10);
scene.add(point_light3);

//----------------------------------------------------------------------------
// Criação do material difuso. A textura define a reflectância difusa (k_d) 
// do material.
//----------------------------------------------------------------------------
let material = new THREE.MeshLambertMaterial({
    map: texture
});

var object_mesh = new THREE.Mesh(geometry, material);
scene.add(object_mesh);

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
  controls.update()  
}

render();
