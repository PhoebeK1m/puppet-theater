// src/components/vrma.js

import * as THREE from 'three';
import { VRMAnimationLoaderPlugin, createVRMAnimationClip } from '@pixiv/three-vrm-animation';

export function loadVRMA(gltfLoader, vrm, animUrl, callback) {
    gltfLoader.load(
        animUrl,
        (gltf) => {
        const vrmAnim = gltf.userData?.vrmAnimations?.[0];
        if (vrmAnim) {
            const vrmaClip = createVRMAnimationClip(vrmAnim, vrm);
            callback(vrmaClip);
        } else {
            console.error('No VRMAnimation found in the loaded VRMA');
        }
        },
        undefined,
        (err) => console.error('VRMA load error:', err)
    );
}

export function playVRMAAnimation(mixer, vrmaClip, vrm) {
    if (!mixer) mixer = new THREE.AnimationMixer(vrm.scene);
    const action = mixer.clipAction(vrmaClip);
    action.reset().play();
    return action;
}

export function stopVRMAAnimation(action) {
    if (action) {
        action.fadeOut(0.25);
        setTimeout(() => action.stop(), 300);
    }
}
