import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MindARThree } from 'mindar-image-three';

document.addEventListener("DOMContentLoaded", () => {
    const start = async () => {
        const mindarThree = new MindARThree({
            container: document.body,
            imageTargetSrc: './assets/uscience.mind',
        });
        const {renderer, scene, camera} = mindarThree;

        const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
        scene.add(light);

        const sehAnchor = mindarThree.addAnchor(0);

        const loader = new GLTFLoader();
        loader.load('./assets/SEH.glb', (seh) => {
            sehAnchor.group.add(seh.scene);
        })

        await mindarThree.start();
        renderer.setAnimationLoop(() => {
            renderer.render(scene, camera);
        })
    };
    start();
});