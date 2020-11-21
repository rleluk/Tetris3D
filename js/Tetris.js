const scene = new THREE.Scene();
scene.background = new THREE.Color(0xdddddd);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.z = 1000;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const boundingBoxMesh = new THREE.Mesh(
    new THREE.CubeGeometry(
        BOUNDING_BOX.width, 
        BOUNDING_BOX.height, 
        BOUNDING_BOX.depth,
        BOUNDING_BOX.splitX, 
        BOUNDING_BOX.splitY, 
        BOUNDING_BOX.splitZ
    ),
    new THREE.MeshBasicMaterial({ 
        color: 0x203002, 
        wireframe: true 
    })
);

scene.add(boundingBoxMesh);

// moving block 1 time per second
const stepTime = 1000;
var totalTime = 0;
var isGameOver = false;
var lastTick;

const boundingBox = new BoundingBox(scene, BOUNDING_BOX.splitX, BOUNDING_BOX.splitY, BOUNDING_BOX.splitZ);
const movingBlock = new MovingBlock(scene, boundingBox); 

////////////// LISTENERS

const animate = function () {
    const now = Date.now();
    totalTime += now - lastTick;    
    lastTick = now;

    if (totalTime >= stepTime) {
        movingBlock.move(0 ,0, -1);
        totalTime -= stepTime;
    }

    renderer.render(scene, camera);
    if (!isGameOver) requestAnimationFrame(animate);
};

const startGame = () => {
    lastTick = Date.now()
    document.getElementById('points-container').style.display = 'block';
    document.getElementById('main-menu').style.display = 'none';
    movingBlock.generate();
    animate();
};

window.addEventListener('load', (event) => {
    renderer.render(scene, camera);
    document.getElementById('start-button').onclick = startGame;
});

window.addEventListener('keydown', (event) => {
    switch(event.key.toUpperCase()) {
        case 'ARROWUP': 
            movingBlock.move(0, 1, 0);
            break;
        case 'ARROWDOWN': 
            movingBlock.move(0, -1, 0);
            break;
        case 'ARROWLEFT':
            movingBlock.move(-1, 0, 0);
            break;
        case 'ARROWRIGHT': 
            movingBlock.move(1, 0, 0);
            break;
        case ' ':
            movingBlock.move(0, 0, -1);
            break;
        case 'W':
            movingBlock.rotate(90, 0, 0);
            break;
        case 'S':
            movingBlock.rotate(-90, 0, 0);
            break;
        case 'Q':
            movingBlock.rotate(0, 0, 90);
            break;
        case 'E':
            movingBlock.rotate(0, 0, -90);
            break;   
        case 'A':
            movingBlock.rotate(0, 90, 0);
            break;
        case 'D': 
            movingBlock.rotate(0, -90, 0);
            break;
    }
});