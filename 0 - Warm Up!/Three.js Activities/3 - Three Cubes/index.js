const loader = new THREE.TextureLoader(); // The texture loader for the cubes
loader.setPath('textures/'); // Localizes the textures at this folder

const renderLeftCube = () => {

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 480/480, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer( {alpha: true});
    renderer.setSize(480, 480);
    document.getElementById('leftCube').appendChild( renderer.domElement );

    const leftCubeTexture = loader.load('leftCube.png'); // then i set a texture to a file in the path folder

    const cubeGeometry = new THREE.BoxGeometry( 1, 1, 1 );
    const cubeMaterial = new THREE.MeshBasicMaterial({map: leftCubeTexture}); // and finally set the texture to the cube material
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

    const middleCubeTexture = loader.load('/middleCube.png'); // then i set a texture to a file in the path folder

    const cubeGeometry = new THREE.BoxGeometry( 1, 1, 1 );
    const cubeMaterial = new THREE.MeshBasicMaterial({map: middleCubeTexture}); // and finally set the texture to the cube material

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

    const rightCubeTexture = loader.load('/rightCube.png'); // then i set a texture to a file in the path folder

    const cubeGeometry = new THREE.BoxGeometry( 1, 1, 1 );
    const cubeMaterial = new THREE.MeshBasicMaterial({map: rightCubeTexture}); // and finally set the texture to the cube material

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

// The approach used in here was to create a function for each cube and then call the three functions
// Each one is set at one HTML element
// Each one uses a local texture wich is from the Silent Hill (PS1) game

renderLeftCube();
renderMiddleCube();
renderRightCube();