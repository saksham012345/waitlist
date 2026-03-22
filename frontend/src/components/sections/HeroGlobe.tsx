'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const Globe = () => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.005;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <Sphere ref={meshRef} args={[1, 64, 64]} scale={2}>
                <MeshDistortMaterial
                    color="#D1FAE5"
                    emissive="#16A34A"
                    emissiveIntensity={0.2}
                    attach="material"
                    distort={0.3}
                    speed={2}
                    roughness={0.8}
                    metalness={0.1}
                    transparent
                    opacity={0.9}
                />
            </Sphere>
            {/* Visual representation of paths/connections */}
            <mesh rotation={[Math.PI / 4, 0, 0]}>
                <torusGeometry args={[2.5, 0.005, 16, 100]} />
                <meshBasicMaterial color="#34D399" transparent opacity={0.2} />
            </mesh>
            <mesh rotation={[-Math.PI / 3, 1, 0]}>
                <torusGeometry args={[2.8, 0.005, 16, 100]} />
                <meshBasicMaterial color="#4ADE80" transparent opacity={0.1} />
            </mesh>
        </Float>
    );
};

export default function HeroGlobe() {
    return (
        <div className="absolute inset-0 z-0 opacity-40">
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                <ambientLight intensity={1.5} />
                <hemisphereLight intensity={1} groundColor="#ffffff" />
                <pointLight position={[10, 10, 10]} intensity={2} />
                <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
                <Globe />
                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
            </Canvas>
        </div>
    );
}
