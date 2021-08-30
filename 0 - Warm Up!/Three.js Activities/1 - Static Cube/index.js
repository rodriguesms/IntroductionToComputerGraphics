// In order to render an element, a scene, a camera and a renderer are needed

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, 720/480, 0.1, 1000); 
// The Camera receives a FOV value, followed by the aspect ratio (which i've decided to put into 720p x 480p)

const renderer = new THREE.WebGLRenderer( {alpha: true});
// Getting a WebGL Renderer with true alpha parameter means that the background should be transparent

renderer.setSize(720, 480); // Then, i set the renderer size to the same aspect ratio that has been selected to the camera
//Then, the image shouldn't be distorced

document.getElementById('cube').appendChild( renderer.domElement ); // Then, i set my renderer to the Cube element present in my HTML

const cubeGeometry = new THREE.BoxGeometry( 1, 1, 1 );
const edgeGeometry = new THREE.EdgesGeometry(cubeGeometry);

// Then, i create a cube, wich basically is a box (3D element with same values for it's width, height and depth)
// Also, i've created a edge wich basically uses the cubegeometry to define itself, in order to get all cube's metrics

const cubeMaterial = new THREE.MeshBasicMaterial({color: "#656565"});
const edgeMaterial = new THREE.LineBasicMaterial({color: "#000", linewidth: 5, linejoin:  'round'});

// And then i set a material (appearence) to the cube and edge

const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
const edge = new THREE.LineSegments(edgeGeometry, edgeMaterial);

scene.add(cube);
scene.add(edge);

// Adding the elements to the scene

camera.position.z = 3;

cube.rotation.x = 0.6;
cube.rotation.y = 0.75;
edge.rotation.x = 0.6;
edge.rotation.y = 0.75;

// Rotating once in order to look more like a cube, instead of a square

renderer.render( scene, camera );