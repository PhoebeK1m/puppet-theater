// // src/main.js

// // Imports (ESM)
// import * as THREE from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import { VRMUtils, VRMLoaderPlugin } from '@pixiv/three-vrm';
// import { VRMAnimationLoaderPlugin, createVRMAnimationClip } from '@pixiv/three-vrm-animation';
// import { createOrbitRig } from './camera.js';

// // Global
// let currentVrm;
// let mixer;
// const clock = new THREE.Clock();
// let vrmaClip = null;
// let vrmaAction = null;
// let isVRMAPlaying = false;

// // Renderer
// const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
// renderer.setSize(window.innerWidth-20, window.innerHeight-20);
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// document.body.appendChild(renderer.domElement);

// // Scene
// const scene = new THREE.Scene();
// scene.add(new THREE.AxesHelper(100)); // delete later

// // Camera
// const { orbitCamera } = createOrbitRig(renderer);

// // Light
// const ambientLight = new THREE.AmbientLight(0xffffff);
// ambientLight.position.set(0,0,0).normalize();
// scene.add(ambientLight);

// // Handle resize
// window.addEventListener('resize', () => {
//   orbitCamera.aspect = window.innerWidth / window.innerHeight;
//   orbitCamera.updateProjectionMatrix();
//   renderer.setSize(window.innerWidth, window.innerHeight);
// });

// // Background image
// const textureLoader = new THREE.TextureLoader();
// textureLoader.load(
//   '/austin.png',
//   (bg) => {
//     const aspect = bg.image.width / bg.image.height;
//     const mesh = new THREE.Mesh(
//       new THREE.PlaneGeometry(50, 50),
//       new THREE.MeshBasicMaterial({ map: bg })
//     );
//     mesh.scale.set(aspect, 0.5, 0.5);
//     mesh.rotation.y = -Math.PI/2;
//     mesh.position.set(100.0, 0.0, 0.0);
//     scene.add(mesh);
//   },
//   undefined,
//   (err) => console.error('Failed to load background:', err)
// );

// // VRM load (from /public)
// const gltfLoader = new GLTFLoader();

// // Enable VRM and VRMA parsing on GLTFLoader
// gltfLoader.register((parser) => new VRMLoaderPlugin(parser));
// gltfLoader.register((parser) => new VRMAnimationLoaderPlugin(parser));
// gltfLoader.crossOrigin = 'anonymous';

// gltfLoader.load(
//   '/weighted.vrm',
//   (gltf) => {
//     const vrm = gltf.userData.vrm;
//     VRMUtils.combineSkeletons(vrm.scene);
//     scene.add(vrm.scene);
//     currentVrm = vrm;

//     currentVrm.scene.rotation.y = -Math.PI/2;
//     currentVrm.scene.position.set(20.0,0.0,0.0);
    
//     loadVRMA();
//   },
//   (progress) => {
//     const pct = progress.total ? (100 * progress.loaded / progress.total).toFixed(1) : '…';
//     console.log('Loading model…', pct, '%');
//   },
//   (error) => console.error('VRM load error:', error)
// );

// function loadVRMA() {
//   if (!currentVrm) return;

// // Inside your VRMA loading callback
//   gltfLoader.load(
//     '/twerk.vrma',
//     (gltf) => {
//       const vrmAnim = gltf.userData?.vrmAnimations?.[0];
//       if (vrmAnim) {
//         console.log('[VRMA LOADED] Found VRMAnimation');
        
//         // Create the animation clip
//         vrmaClip = createVRMAnimationClip(vrmAnim, currentVrm);
//         console.log('VRMA animation clip created');
//       } else {
//         console.error('No VRMAnimation found in the loaded VRMA');
//       }
//     },
//     undefined,
//     (err) => console.error('VRMA load error:', err)
//   );
// }

// function playVRMA() {
//   if (!currentVrm || !vrmaClip) {
//     console.warn('VRMA not ready yet.');
//     return;
//   }
//   if (!mixer) mixer = new THREE.AnimationMixer(currentVrm.scene);

//   // uncomment for specific animation
//   const action = mixer.clipAction(vrmaClip);

//   vrmaAction = action;
//   vrmaAction.reset().play(); //.fadeIn(0.5)

//   isVRMAPlaying = true;
// }

// function stopVRMA() {
//   if (vrmaAction) {
//     vrmaAction.fadeOut(0.25);
//     setTimeout(() => vrmaAction.stop(), 300);
//   }
//   isVRMAPlaying = false;
// }

// function toggleVRMA() {
//   if (isVRMAPlaying) stopVRMA();
//   else playVRMA();
// }

// // Safe: wait for DOM, then hook up the buttons
// document.addEventListener('DOMContentLoaded', () => {
//   const btn = document.getElementById('toggleIdle');
//   if (btn) btn.addEventListener('click', toggleVRMA); //toggleIdleAnimation
// });

// function animate() {
//   requestAnimationFrame(animate);
//   const delta = clock.getDelta();

//   if (currentVrm) {
//     currentVrm.update(delta);
//   }
//   if (mixer) mixer.update(delta);

//   // Use the orbit camera you created
//   renderer.render(scene, orbitCamera);
// }
// animate();
