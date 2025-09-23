"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera, Line } from "@react-three/drei";
import * as THREE from "three";

interface BaseballFieldProps {
  scrollProgress: number;
}

export function BaseballField({ scrollProgress }: BaseballFieldProps) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const fieldRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (cameraRef.current) {
      // Smooth camera movement based on scroll
      const targetY = 10 + scrollProgress * 20;
      const targetZ = 30 - scrollProgress * 15;
      const targetX = scrollProgress * 5;

      cameraRef.current.position.x = THREE.MathUtils.lerp(
        cameraRef.current.position.x,
        targetX,
        0.05
      );
      cameraRef.current.position.y = THREE.MathUtils.lerp(
        cameraRef.current.position.y,
        targetY,
        0.05
      );
      cameraRef.current.position.z = THREE.MathUtils.lerp(
        cameraRef.current.position.z,
        targetZ,
        0.05
      );

      // Look at center of field
      cameraRef.current.lookAt(0, 0, 0);
    }

    if (fieldRef.current) {
      // Subtle field rotation
      fieldRef.current.rotation.y = scrollProgress * 0.2;
    }
  });

  return (
    <>
      {/* Camera with initial position */}
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[0, 10, 30]}
        fov={75}
        near={0.1}
        far={1000}
      />

      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[10, 20, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />

      {/* Baseball Field Group - Home plate centered at origin */}
      <group ref={fieldRef}>
        {/* First Base Foul Line */}
        <Line
          points={[
            [0, 0, 0], // Home plate (now at origin)
            [30, 0, -30], // Right outfield
          ]}
          color="#ff0080"
          lineWidth={2}
        />

        {/* Third Base Foul Line */}
        <Line
          points={[
            [0, 0, 0], // Home plate (now at origin)
            [-30, 0, -30], // Left outfield
          ]}
          color="#ff0080"
          lineWidth={2}
        />

        {/* Outfield Boundary Curve */}
        <Line
          points={Array.from({ length: 33 }, (_, i) => {
            // With home plate at origin, foul lines end at [±30, 0, -30]
            // Left endpoint angle: atan2(-30, -30) = -3π/4 = 225°
            // Right endpoint angle: atan2(-30, 30) = -π/4 = 315°
            const leftAngle = (5 * Math.PI) / 4; // 225°
            const rightAngle = (7 * Math.PI) / 4; // 315°
            const angle = leftAngle + (i / 32) * (rightAngle - leftAngle);
            const radius = 42.43; // Distance to endpoints: sqrt(30² + 30²)
            return [Math.cos(angle) * radius, 0, Math.sin(angle) * radius];
          })}
          color="#00ffff"
          lineWidth={2}
        />

        {/* Infield Diamond */}
        <Line
          points={[
            [0, 0, 0], // Home plate (now at origin)
            [9, 0, -9], // First base
            [0, 0, -18], // Second base
            [-9, 0, -9], // Third base
            [0, 0, 0], // Back to home plate
          ]}
          color="#ff00ff"
          lineWidth={2}
        />

        {/* Pitcher's Mound Circle */}
        <mesh position={[0, 0, -12.7]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.2, 1.5, 0, Math.PI * 2, 16]} />
          <meshBasicMaterial color="#ffff00" wireframe />
        </mesh>
      </group>
    </>
  );
}
