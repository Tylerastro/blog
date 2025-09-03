"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Box, Sphere } from "@react-three/drei";
import * as THREE from "three";

// Spinning cube component
function SpinningCube({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.02;
    }
  });

  return (
    <Box ref={meshRef} position={position} args={[1, 1, 1]}>
      <meshStandardMaterial 
        color="#6366f1" 
        emissive="#1e1b4b"
        emissiveIntensity={0.2}
      />
    </Box>
  );
}

// Floating sphere component
function FloatingSphere({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.5;
      meshRef.current.rotation.z += 0.005;
    }
  });

  return (
    <Sphere ref={meshRef} position={position} args={[0.7, 32, 16]}>
      <meshStandardMaterial 
        color="#ec4899" 
        emissive="#831843"
        emissiveIntensity={0.1}
      />
    </Sphere>
  );
}

// Main 3D scene content
function Scene3DContent() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#ec4899" />
      
      {/* 3D Objects */}
      <SpinningCube position={[-2, 0, 0]} />
      <FloatingSphere position={[2, 0, 0]} />
      
      {/* Ground plane for reference */}
      <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial 
          color="#1f2937" 
          transparent 
          opacity={0.3} 
        />
      </mesh>
      
      {/* Camera controls */}
      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={3}
        maxDistance={15}
      />
    </>
  );
}

interface Scene3DProps {
  className?: string;
}

export default function Scene3D({ className = "" }: Scene3DProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ 
          position: [5, 3, 5], 
          fov: 75,
          near: 0.1, 
          far: 1000 
        }}
        className="w-full h-full"
      >
        <Scene3DContent />
      </Canvas>
    </div>
  );
}