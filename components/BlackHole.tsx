"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import fragmentShader from "@/components/shaders/blackhole/fragment.glsl";
import vertexShader from "@/components/shaders/blackhole/vertex.glsl";

function BlackHolePlane() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector2(5, 5) },
    }),
    []
  );

  useFrame(({ clock, size }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.iTime.value = clock.getElapsedTime();
      materialRef.current.uniforms.iResolution.value.set(
        size.width,
        size.height
      );
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[10, 10]} />
      <shaderMaterial
        ref={materialRef}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

interface BlackHoleProps {
  className?: string;
}

export default function BlackHole({ className = "" }: BlackHoleProps) {
  return (
    <Canvas
      className="w-full h-full"
      camera={{ position: [0, 0, 5], aspect: 1, near: 0.1, far: 100 }}
    >
      <BlackHolePlane />
    </Canvas>
  );
}
