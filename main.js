import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 6;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const gridHelper = new THREE.GridHelper(10, 20, 0x88aaff, 0x445566);
scene.add(gridHelper);

const textureLoader = new THREE.TextureLoader();
const texturePath = './owae.png';

const cubeTexture = textureLoader.load(
    texturePath,
    () => console.log('Texture loaded successfully!'),
    undefined,
    (err) => console.error('Failed to load texture:', err)
);

const cubeMaterial = new THREE.MeshStandardMaterial({
    map: cubeTexture,
    roughness: 0.3,
    metalness: 0.1,
    emissive: new THREE.Color(0x331100)
});

const sphereMaterial = new THREE.MeshStandardMaterial({
    map: cubeTexture.clone(),
    roughness: 0.2,
    metalness: 0.3,
    emissive: new THREE.Color(0x002244)
});

const dodecahedronMaterial = new THREE.MeshStandardMaterial({
    map: cubeTexture.clone(),
    roughness: 0.4,
    metalness: 0.2,
    emissive: new THREE.Color(0x220044)
});


const octagonMaterial = new THREE.MeshStandardMaterial({
    map: cubeTexture.clone(),
    roughness: 0.3,
    metalness: 0.2,
    emissive: new THREE.Color(0x224400)
});

const cubeGeometry = new THREE.BoxGeometry(1.2, 1.2, 1.2);
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.set(-2.2, 0, 0);
scene.add(cube);

const sphereGeometry = new THREE.SphereGeometry(0.9, 32, 32);
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(0, 0, 0);
scene.add(sphere);

const dodecahedronGeometry = new THREE.DodecahedronGeometry(0.9);
const dodecahedron = new THREE.Mesh(dodecahedronGeometry, dodecahedronMaterial);
dodecahedron.position.set(2.2, 0, 0);
scene.add(dodecahedron);

const octagonGeometry = new THREE.CylinderGeometry(0.9, 0.9, 1.2, 8);
const octagon = new THREE.Mesh(octagonGeometry, octagonMaterial);
octagon.position.set(-4.5, 0, 0); 
scene.add(octagon);

const ambientLight = new THREE.AmbientLight(0x404060);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(2, 5, 3);
scene.add(dirLight);

const backLight = new THREE.DirectionalLight(0x88aaff, 0.5);
backLight.position.set(-3, -1, -4);
scene.add(backLight);

const pointLight = new THREE.PointLight(0xffaa88, 0.6, 10);
pointLight.position.set(1, 2, 4);
scene.add(pointLight);

function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.015;
    cube.rotation.y += 0.02;

    sphere.rotation.x += 0.005;
    sphere.rotation.y += 0.01;

    dodecahedron.rotation.x += 0.01;
    dodecahedron.rotation.y += 0.015;
    dodecahedron.rotation.z += 0.005;

    octagon.rotation.x += 0.008;
    octagon.rotation.y += 0.012;
    octagon.rotation.z += 0.003;

    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
