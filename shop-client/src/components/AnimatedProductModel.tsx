import { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const AnimatedGltfModel = ({ model }) => {
    const gltfRef = useRef();

    const gltf = useLoader(GLTFLoader, model);

    if (gltf.scene) {
        gltfRef.current = gltf.scene;
    }

    useFrame((state, delta) => {
        if (gltfRef) {
            const t = state.clock.getElapsedTime();
            gltfRef.current.rotation.set(Math.cos(t / 4) / 8, Math.sin(t / 3) / 4, 0.15 + Math.sin(t / 2) / 8);
            gltfRef.current.position.y = (0.5 + Math.cos(t / 2)) / 7;
        }
    });

    return <primitive ref={gltfRef} object={gltf.scene} />;
};

export default AnimatedGltfModel;
