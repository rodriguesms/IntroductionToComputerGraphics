const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 720/480, 0.1, 1000);

const renderer = new THREE.WebGLRenderer( {alpha: true});
renderer.setSize(720, 480);
document.getElementById('cube').appendChild( renderer.domElement );

const cubeGeometry = new THREE.BoxGeometry( 1, 1, 1 );
const edgeGeometry = new THREE.EdgesGeometry(cubeGeometry);

const cubeMaterial = new THREE.MeshBasicMaterial({color: "#656565"});
const edgeMaterial = new THREE.LineBasicMaterial({color: "#000", linewidth: 5, linejoin:  'round'});

const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
const edge = new THREE.LineSegments(edgeGeometry, edgeMaterial);

scene.add(cube);
scene.add(edge);

camera.position.z = 3;


cube.rotation.z += 0.75;
edge.rotation.z += 0.75;


const rotate = () => {

    requestAnimationFrame(rotate);

    //cube.rotation.x += 0.01;
    //edge.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    edge.rotation.y += 0.01;


    renderer.render( scene, camera );
}

rotate();
