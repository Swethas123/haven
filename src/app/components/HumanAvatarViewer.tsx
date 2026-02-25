import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

interface HumanAvatarViewerProps {
    isSpeaking: boolean;
}

// A fallback component while the model is loading
function LoadingSpinner() {
    return (
        <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="purple" wireframe />
        </mesh>
    );
}

function AvatarModel({ isSpeaking }: { isSpeaking: boolean }) {
    const meshRef = useRef<THREE.Mesh>(null!);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.01;
            meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;

            if (isSpeaking) {
                meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 15) * 0.05);
            } else {
                meshRef.current.scale.setScalar(1);
            }
        }
    });

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[0.8, 32, 32]} />
            <meshStandardMaterial color="#a855f7" roughness={0.2} metalness={0.8} />
        </mesh>
    );
}

export function HumanAvatarViewer({ isSpeaking }: HumanAvatarViewerProps) {
    return (
        <div className="w-full h-full bg-gradient-to-b from-purple-50/50 to-white/50 rounded-2xl overflow-hidden border border-purple-100 shadow-inner min-h-[400px]">
            <Canvas shadows camera={{ position: [0, 0, 3], fov: 45 }}>
                <ambientLight intensity={0.7} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} shadow-mapSize={2048} castShadow />
                <pointLight position={[-10, -10, -10]} />

                <Suspense fallback={<LoadingSpinner />}>
                    <AvatarModel isSpeaking={isSpeaking} />
                </Suspense>

                <ContactShadows opacity={0.4} blur={1} far={10} resolution={256} color="#000000" />
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    minPolarAngle={Math.PI / 2.5}
                    maxPolarAngle={Math.PI / 2}
                />
                <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
                <directionalLight position={[-5, 5, -5]} intensity={0.5} />
            </Canvas>
        </div>
    );
}
