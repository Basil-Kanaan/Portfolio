import React, { useRef } from 'react';
import { useFrame, extend, Canvas } from 'react-three-fiber';
import * as THREE from 'three';

extend({ THREE });

const Hexagon = ({ position }) => {
    const hexagonRef = useRef();

    useFrame(() => {
        hexagonRef.current.rotation.z += 0.002;
    });

    // Manually create a hexagon buffer geometry
    const vertices = [];
    const hexagonSize = 1;

    for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        const x = Math.cos(angle) * hexagonSize;
        const y = Math.sin(angle) * hexagonSize;
        vertices.push(new THREE.Vector3(x, y, 0));
    }

    const hexagonGeometry = new THREE.BufferGeometry().setFromPoints(vertices);

    return (
        <mesh position={position} ref={hexagonRef}>
            <bufferGeometry attach="geometry" {...hexagonGeometry} />
            <meshStandardMaterial attach="material" color="aqua" transparent opacity={0.7} />
        </mesh>
    );
};

const HexBackground = () => {
    return (
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
            <ambientLight intensity={0.5} />
            <pointLight intensity={1} position={[10, 10, 10]} />
            {Array(36)
                .fill()
                .map((_, i) => (
                    <Hexagon key={i} position={[Math.random() * 20 - 10, Math.random() * 20 - 10, Math.random() * 20 - 10]} />
                ))}
        </Canvas>
    );
};

export default HexBackground;
