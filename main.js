import * as THREE from 'three';
import { PointLight } from 'three';
import './style.css'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer(
    {
        canvas: document.querySelector('#can'),
    })

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(50);

renderer.render(scene, camera);

const plano = new THREE.PlaneGeometry(20, 20);
const planomaterial = new THREE.MeshBasicMaterial( {color: 0xffffff, side: THREE.DoubleSide} );
const plane = new THREE.Mesh( plano, planomaterial );
plane.rotation.x = Math.PI * -.5
scene.add( plane );

const geometry = new THREE.TorusGeometry(2, 1, 15, 50);
const material = new THREE.MeshStandardMaterial({color: 0xfffee});
const torus = new THREE.Mesh(geometry, material);
torus.position.set(0, 2.9, 0)

scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);

//const light = new THREE.AmbientLight( 0xffffff );
scene.add(pointLight);

const grindHelper = new THREE.GridHelper(200, 50);
scene.add(grindHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function animate()
{
    requestAnimationFrame(animate);

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.05;
    torus.rotation.z += 0.01;
    pointLight.position.set(camera.position.x, camera.position.y, camera.position.z);
    controls.update();

    renderer.render(scene, camera)
}
animate();