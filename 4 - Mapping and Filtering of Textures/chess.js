import * as THREE from 'https://cdn.skypack.dev/pin/three@v0.133.1-a8rkd0QTHl2tMZXZJAEw/mode=imports/optimized/three.js';
import { OrbitControls } from 'https://cdn.skypack.dev/pin/three@v0.133.1-a8rkd0QTHl2tMZXZJAEw/mode=imports/unoptimized/examples/jsm/controls/OrbitControls.js'

let image = new Image();
image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAIAAAB7GkOtAAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV/TilKqgnaQ4pChOlkQFXHUKhShQqgVWnUwufQLmjQkLS6OgmvBwY/FqoOLs64OroIg+AHi5uak6CIl/i8ptIjx4Lgf7+497t4BQqPMNCswDmh61Uwl4mImuyp2vyKICAbQh4DMLGNOkpLwHF/38PH1LsazvM/9OXrVnMUAn0g8ywyzSrxBPL1ZNTjvE4dZUVaJz4nHTLog8SPXFZffOBccFnhm2Eyn5onDxGKhg5UOZkVTI54ijqqaTvlCxmWV8xZnrVxjrXvyF4Zy+soy12kOI4FFLEGCCAU1lFBGFTFadVIspGg/7uGPOH6JXAq5SmDkWEAFGmTHD/4Hv7u18pMTblIoDnS92PbHCNC9CzTrtv19bNvNE8D/DFzpbX+lAcx8kl5va9EjoH8buLhua8oecLkDDD0Zsik7kp+mkM8D72f0TVlg8BYIrrm9tfZx+gCkqavkDXBwCIwWKHvd4909nb39e6bV3w8hHnKGXcYHQgAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+UKGhQEJyUA9AgAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAIqklEQVR42u3bwQ3DMAwEQSv996y8EriG25mXvQ0QJKBz731+zjn/b13XdX27fx4AkgwAAAMAgJLz/nEX03Vd73QbAIATEAAGAADzjruYrut6s9sAAJyAADAAAJjnHYCu63q02wAAnIAAMAAAmOcdgK7rerTbAACcgAAwAACY5x2Arut6tNsAAJyAADAAAJjnHYCu63q02wAAnIAAMAAAmOcdgK7rerTbAACcgAAwAACY5x2Arut6tNsAAJyAADAAAJjnHYCu63q02wAAnIAAMAAAmOcdgK7rerTbAACcgAAwAACY5x2Arut6tNsAAJyAADAAAJjnHYCu63q02wAAnIAAMAAAmOcdgK7rerTbAACcgAAwAACY5x2Arut6tNsAAJyAADAAAJjnHYCu63q02wAAnIAAMAAAmOcdgK7rerTbAACcgAAwAACY5x2Arut6tNsAAJyAADAAAJjnHYCu63q02wAAnIAAMAAAmOcdgK7rerTbAACcgAAwAACY5x2Arut6tNsAAJyAADAAAJjnHYCu63q02wAAnIAAMAAAmOcdgK7rerTbAACcgAAwAACY5x2Arut6tNsAAJyAADAAAJjnHYCu63q02wAAnIAAMAAAmOcdgK7rerTbAACcgAAwAACY5x2Arut6tNsAAJyAADAAAJjnHYCu63q02wAAnIAAMAAAmOcdgK7rerTbAACcgAAwAACY5x2Arut6tNsAAJyAADAAAJjnHYCu63q02wAAnIAAMAAAmOcdgK7rerTbAACcgAAwAACY5x2Arut6tNsAAJyAADAAAJjnHYCu63q02wAAnIAAMAAAmOcdgK7rerTbAACcgAAwAACY5x2Arut6tNsAAJyAADAAAJjnHYCu63q02wAAnIAAMAAAmOcdgK7rerTbAACcgAAwAACY5x2Arut6tNsAAJyAADAAAJjnHYCu63q02wAAnIAAMAAAmOcdgK7rerTbAACcgAAwAACY5x2Arut6tNsAAJyAADAAAJjnHYCu63q02wAAnIAAMAAAmOcdgK7rerTbAACcgAAwAACY5x2Arut6tNsAAJyAADAAAJjnHYCu63q02wAAnIAAMAAAmOcdgK7rerTbAACcgAAwAACY5x2Arut6tNsAAJyAADAAAJjnHYCu63q02wAAnIAAMAAAmOcdgK7rerTbAACcgAAwAACY5x2Arut6tNsAAJyAADAAAJjnHYCu63q02wAAnIAAMAAAmOcdgK7rerTbAACcgAAwAACY5x2Arut6tNsAAJyAADAAAJjnHYCu63q02wAAnIAAMAAAmOcdgK7rerTbAACcgAAwAACY5x2Arut6tNsAAJyAADAAAJjnHYCu63q02wAAnIAAMAAAmOcdgK7rerTbAACcgAAwAACY5x2Arut6tNsAAJyAADAAAJjnHYCu63q02wAAnIAAMAAAmOcdgK7rerTbAACcgAAwAACY5x2Arut6tNsAAJyAADAAAJjnHYCu63q02wAAnIAAMAAAmOcdgK7rerTbAACcgAAwAACY5x2Arut6tNsAAJyAADAAAJjnHYCu63q02wAAnIAAMAAAmOcdgK7rerTbAACcgAAwAACY5x2Arut6tNsAAJyAADAAAJjnHYCu63q02wAAnIAAMAAAmOcdgK7rerTbAACcgAAwAACY5x2Arut6tNsAAJyAADAAAJjnHYCu63q02wAAnIAAMAAAmOcdgK7rerTbAACcgAAwAACY5x2Arut6tNsAAJyAADAAAJjnHYCu63q02wAAnIAAMAAAmOcdgK7rerTbAACcgAAwAACY5x2Arut6tNsAAJyAADAAAJjnHYCu63q02wAAnIAAMAAAmOcdgK7rerTbAACcgAAwAACY5x2Arut6tNsAAJyAADAAAJjnHYCu63q02wAAnIAAMAAAmOcdgK7rerTbAACcgAAwAACY5x2Arut6tNsAAJyAADAAAJjnHYCu63q02wAAnIAAMAAAmOcdgK7rerTbAACcgAAwAACY5x2Arut6tNsAAJyAADAAAJjnHYCu63q02wAAnIAAMAAAmOcdgK7rerTbAACcgAAwAACY5x2Arut6tNsAAJyAADAAAJjnHYCu63q02wAAnIAAMAAAmOcdgK7rerTbAACcgAAwAACY5x2Arut6tNsAAJyAADAAAJjnHYCu63q02wAAnIAAMAAAmOcdgK7rerTbAACcgAAwAACY5x2Arut6tNsAAJyAADAAAJjnHYCu63q02wAAnIAAMAAAmOcdgK7rerTbAACcgAAwAACY5x2Arut6tNsAAJyAADAAAJjnHYCu63q02wAAnIAAMAAAmOcdgK7rerTbAACcgAAwAACY5x2Arut6tNsAAJyAADAAAJjnHYCu63q02wAAnIAAMAAAmOcdgK7rerTbAACcgAAwAACY5x2Arut6tNsAAJyAADAAAJjnHYCu63q02wAAnIAAMAAAmOcdgK7rerTbAACcgAAwAACY5x2Arut6tNsAAJyAADAAAJjnHYCu63q02wAAnIAAMAAAmOcdgK7rerTbAACcgAAwAACY5x2Arut6tNsAAJyAADAAAJjnHYCu63q02wAAnIAAMAAAmOcdgK7rerTbAACcgAAwAACY5x2Arut6tNsAAJyAADAAAJjnHYCu63q02wAAnIAAMAAAmOcdgK7rerTbAACcgAAwAACY5x2Arut6tNsAAJyAADAAAJjnHYCu63q02wAAnIAAMAAAmOcdgK7rerTbAACcgAAwAACY5x2Arut6tNsAAJyAADAAAJjnHYCu63q02wAAnIAAMAAAmOcdgK7rerTbAACcgAAwAACY5x2Arut6tNsAAJyAADAAAJjnHYCu63q02wAAnIAAMAAAmOcdgK7rerTbAACcgAAwAACY5x2Arut6tNsAAJyAADAAAJjnHYCu63q02wAAnIAAMAAAmOcdgK7rerTbAACcgAAwAACY9wUcsAhhglsPKgAAAABJRU5ErkJggg=='; 
// texture do padrão xadrez

let texture = new THREE.Texture(image);

image.onload = function() {
    texture.needsUpdate = true;
    texture.magFilter = THREE.NearestFilter; // filtro a ser utilizado em caso de magnificação.
    texture.minFilter = THREE.NearestFilter; // filtro a ser utilizado em caso de minificação.
    texture.anisotropy = 1; // fator máximo de anisotropia para o filtro anisotrópico.
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
};

let scene = new THREE.Scene();

let camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.01, 100);
camera.position.z = 1.5;

scene.add(camera);

let renderer = new THREE.WebGLRenderer({canvas: document.getElementById("chess"), alpha: true});
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
