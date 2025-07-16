"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useControls } from "leva";
import fragmentShader from "@/components/shaders/blackhole/fragment.glsl";
import vertexShader from "@/components/shaders/blackhole/vertex.glsl";

function BlackHolePlane({ scrollProgress = 0 }: { scrollProgress?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Add Leva controls for color and alpha values
  const { uR, uG, uB, uA } = useControls("Black Hole", {
    uR: { value: 1.47, min: -5, max: 5, step: 0.01 },
    uG: { value: 2.13, min: -5, max: 5, step: 0.01 },
    uB: { value: 2.7, min: -5, max: 5, step: 0.01 },
    uA: { value: 2.73, min: -5, max: 5, step: 0.01 },
  });

  // Create uniforms only once, no dependencies on control values
  const uniforms = useMemo(
    () => ({
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector2(5, 5) },
      uR: { value: 1.0 },
      uG: { value: 1.0 },
      uB: { value: 1.0 },
      uA: { value: 1.0 },
    }),
    []
  );

  useFrame(({ clock, size, camera }) => {
    if (materialRef.current) {
      // Update animation-related values
      materialRef.current.uniforms.iTime.value = clock.getElapsedTime();
      materialRef.current.uniforms.iResolution.value.set(
        size.width,
        size.height
      );

      // Update color values from Leva controls
      materialRef.current.uniforms.uR.value = uR;
      materialRef.current.uniforms.uG.value = uG;
      materialRef.current.uniforms.uB.value = uB;
      materialRef.current.uniforms.uA.value = uA;
    }

    // Animate camera zoom based on scroll progress
    const targetZ = 5 - scrollProgress * 4.5; // Zoom from 5 to 0.5
    camera.position.z = targetZ;
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
  scrollProgress?: number;
  opacity?: number;
}

export default function BlackHole({
  className = "",
  scrollProgress = 0,
  opacity = 1,
}: BlackHoleProps) {
  return (
    <div className="fixed inset-0 w-full h-full" style={{ opacity }}>
      <Canvas
        className="w-full h-full"
        camera={{ position: [0, 0, 5], aspect: 1, near: 0.1, far: 100 }}
      >
        <BlackHolePlane scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
