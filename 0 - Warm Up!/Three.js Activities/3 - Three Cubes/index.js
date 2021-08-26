const loader = new THREE.TextureLoader();
loader.setPath('textures/');

const renderLeftCube = () => {

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 480/480, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer( {alpha: true});
    renderer.setSize(480, 480);
    document.getElementById('leftCube').appendChild( renderer.domElement );

    const leftCubeTexture = loader.load('leftCube.png');

    const cubeGeometry = new THREE.BoxGeometry( 1, 1, 1 );
    const cubeMaterial = new THREE.MeshBasicMaterial({map: leftCubeTexture});
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

    scene.add(cube);
    camera.position.z = 3;
    cube.rotation.z = 0.75;

    const rotate = () => {
        requestAnimationFrame(rotate);
        cube.rotation.y += 0.01;
        renderer.render( scene, camera );
    }
    rotate();
}

const renderMiddleCube = () => {

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 480/480, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer( {alpha: true});
    renderer.setSize(480, 480);
    document.getElementById('middleCube').appendChild( renderer.domElement );

    const middleCubeTexture = loader.load('/middleCube.png');
    const cubeGeometry = new THREE.BoxGeometry( 1, 1, 1 );
    const cubeMaterial = new THREE.MeshBasicMaterial({map: middleCubeTexture});

    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

    scene.add(cube);

    camera.position.z = 3;

    cube.rotation.z = 0.75;


    const rotate = () => {

        requestAnimationFrame(rotate);
        cube.rotation.y += 0.01;
        renderer.render( scene, camera );
    }
    rotate();
}

const renderRightCube = () => {

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 480/480, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer( {alpha: true});
    renderer.setSize(480, 480);
    document.getElementById('rightCube').appendChild( renderer.domElement );

    const rightCubeTexture = loader.load('/rightCube.png');
    const cubeGeometry = new THREE.BoxGeometry( 1, 1, 1 );
    const cubeMaterial = new THREE.MeshBasicMaterial({map: rightCubeTexture});

    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

    scene.add(cube);

    camera.position.z = 3;

    cube.rotation.z = 0.75;

    const rotate = () => {
        requestAnimationFrame(rotate);
        cube.rotation.y += 0.01;
        renderer.render( scene, camera );
    }
    rotate();
}

renderLeftCube();
renderMiddleCube();
renderRightCube();