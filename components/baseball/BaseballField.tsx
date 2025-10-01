"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

interface BaseballFieldProps {
  scrollProgress: number;
}

// Utility function to generate particle positions along a line
function generateLineParticles(
  start: [number, number, number],
  end: [number, number, number],
  particleCount: number
): Float32Array {
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    const t = i / (particleCount - 1);
    const x = start[0] + (end[0] - start[0]) * t;
    const y = start[1] + (end[1] - start[1]) * t;
    const z = start[2] + (end[2] - start[2]) * t;

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
  }

  return positions;
}

// Utility function to generate particle positions along a curve
function generateCurveParticles(
  points: Array<[number, number, number]>,
  particlesPerSegment: number
): Float32Array {
  const totalParticles = (points.length - 1) * particlesPerSegment + 1;
  const positions = new Float32Array(totalParticles * 3);
  let particleIndex = 0;

  for (let i = 0; i < points.length - 1; i++) {
    const start = points[i];
    const end = points[i + 1];

    for (let j = 0; j < particlesPerSegment; j++) {
      const t = j / particlesPerSegment;
      const x = start[0] + (end[0] - start[0]) * t;
      const y = start[1] + (end[1] - start[1]) * t;
      const z = start[2] + (end[2] - start[2]) * t;

      positions[particleIndex * 3] = x;
      positions[particleIndex * 3 + 1] = y;
      positions[particleIndex * 3 + 2] = z;
      particleIndex++;
    }
  }

  // Add the final point
  const lastPoint = points[points.length - 1];
  positions[particleIndex * 3] = lastPoint[0];
  positions[particleIndex * 3 + 1] = lastPoint[1];
  positions[particleIndex * 3 + 2] = lastPoint[2];

  return positions;
}

// Utility function to generate particles for diamond-shaped bases with thickness
function generateDiamondBaseParticles(
  center: [number, number, number],
  size: number = 1.5,
  thickness: number = 0.25,
  particleDensity: number = 8
): Float32Array {
  const particles: number[] = [];
  const halfSize = size / 2;

  // Helper function to check if a point is inside the diamond shape
  const isInsideDiamond = (x: number, z: number): boolean => {
    return Math.abs(x) + Math.abs(z) <= halfSize;
  };

  // Generate particles for top and bottom surfaces
  const step = size / (particleDensity - 1);
  for (let i = 0; i < particleDensity; i++) {
    for (let j = 0; j < particleDensity; j++) {
      const x = (i / (particleDensity - 1) - 0.5) * size;
      const z = (j / (particleDensity - 1) - 0.5) * size;

      if (isInsideDiamond(x, z)) {
        // Top surface
        particles.push(center[0] + x, center[1] + thickness, center[2] + z);

        // Bottom surface
        particles.push(center[0] + x, center[1], center[2] + z);
      }
    }
  }

  // Generate particles for diamond edges to create thickness
  const edgeParticles = Math.max(4, Math.floor(particleDensity / 2));

  // Generate points along the diamond perimeter
  const diamondEdges = [
    // Top edge (from left to right)
    { start: [-halfSize, 0], end: [0, -halfSize] },
    // Right edge (from top to bottom)
    { start: [0, -halfSize], end: [halfSize, 0] },
    // Bottom edge (from right to left)
    { start: [halfSize, 0], end: [0, halfSize] },
    // Left edge (from bottom to top)
    { start: [0, halfSize], end: [-halfSize, 0] },
  ];

  // Create particles along each edge
  diamondEdges.forEach((edge) => {
    for (let i = 0; i < edgeParticles; i++) {
      for (let k = 0; k < edgeParticles; k++) {
        const t = i / (edgeParticles - 1);
        const x = edge.start[0] + (edge.end[0] - edge.start[0]) * t;
        const z = edge.start[1] + (edge.end[1] - edge.start[1]) * t;
        const y = center[1] + (k / (edgeParticles - 1)) * thickness;

        particles.push(center[0] + x, y, center[2] + z);
      }
    }
  });

  return new Float32Array(particles);
}

// Optimized particle line component
function ParticleLine({
  positions,
  color,
  size = 0.15,
}: {
  positions: Float32Array;
  color: string;
  size?: number;
}) {
  const pointsRef = useRef<THREE.Points>(null);

  const { geometry, material } = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const mat = new THREE.PointsMaterial({
      color: new THREE.Color(color),
      size,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    return { geometry: geo, material: mat };
  }, [positions, color, size]);

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}

export function BaseballField({ scrollProgress }: BaseballFieldProps) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const fieldRef = useRef<THREE.Group>(null);

  // Memoized particle positions for optimal performance
  const particleData = useMemo(() => {
    // First Base Foul Line particles
    const firstBaseFoulLine = generateLineParticles(
      [0, 0, 0],
      [30, 0, -30],
      70
    );

    // Third Base Foul Line particles
    const thirdBaseFoulLine = generateLineParticles(
      [0, 0, 0],
      [-30, 0, -30],
      70
    );

    // Outfield Boundary Curve particles
    const outfieldPoints = Array.from({ length: 33 }, (_, i) => {
      const leftAngle = (5 * Math.PI) / 4; // 225°
      const rightAngle = (7 * Math.PI) / 4; // 315°
      const angle = leftAngle + (i / 32) * (rightAngle - leftAngle);
      const radius = 42.43; // Distance to endpoints: sqrt(30² + 30²)
      return [Math.cos(angle) * radius, 0, Math.sin(angle) * radius] as [
        number,
        number,
        number
      ];
    });
    const outfieldBoundary = generateCurveParticles(outfieldPoints, 3);

    // Infield Diamond particles
    const infieldPoints: Array<[number, number, number]> = [
      [0, 0, 0], // Home plate
      [9, 0, -9], // First base
      [0, 0, -18], // Second base
      [-9, 0, -9], // Third base
      [0, 0, 0], // Back to home plate
    ];
    const infieldDiamond = generateCurveParticles(infieldPoints, 8);

    // Baseball Bases particles (diamond-shaped bases with thickness)
    const firstBase = generateDiamondBaseParticles(
      [9 - 1.5 / 1.414 / 2, 0, -9 - 1.5 / 1.414 / 2],
      1.5,
      0.25,
      6
    );
    const secondBase = generateDiamondBaseParticles([0, 0, -18], 1.5, 0.25, 6);
    const thirdBase = generateDiamondBaseParticles(
      [-9 + 1.5 / 1.414 / 2, 0, -9 - 1.5 / 1.414 / 2],
      1.5,
      0.25,
      6
    );

    return {
      firstBaseFoulLine,
      thirdBaseFoulLine,
      outfieldBoundary,
      infieldDiamond,
      firstBase,
      secondBase,
      thirdBase,
    };
  }, []); // Empty dependency array since field layout doesn't change

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
        {/* First Base Foul Line Particles */}
        <ParticleLine
          positions={particleData.firstBaseFoulLine}
          color="#ff0080"
          size={0.2}
        />

        {/* Third Base Foul Line Particles */}
        <ParticleLine
          positions={particleData.thirdBaseFoulLine}
          color="#ff0080"
          size={0.2}
        />

        {/* Outfield Boundary Curve Particles */}
        <ParticleLine
          positions={particleData.outfieldBoundary}
          color="#00ffff"
          size={0.18}
        />

        {/* Infield Diamond Particles */}
        <ParticleLine
          positions={particleData.infieldDiamond}
          color="#ff00ff"
          size={0.16}
        />

        {/* Baseball Bases */}
        {/* First Base */}
        <ParticleLine
          positions={particleData.firstBase}
          color="#ffffff"
          size={0.18}
        />

        {/* Second Base */}
        <ParticleLine
          positions={particleData.secondBase}
          color="#ffffff"
          size={0.18}
        />

        {/* Third Base */}
        <ParticleLine
          positions={particleData.thirdBase}
          color="#ffffff"
          size={0.18}
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
