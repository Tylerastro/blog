"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useControls } from "leva";
import { StatsGl } from "@react-three/drei";

interface ShaderMetadata {
  title: string;
  description: string;
  showControls?: boolean;
  showPerformance?: boolean;
  uniforms?: Record<
    string,
    {
      default: number;
      min?: number;
      max?: number;
      step?: number;
    }
  >;
}

interface ShaderPlaneProps {
  vertexShader: string;
  fragmentShader: string;
  metadata?: ShaderMetadata;
}

function ShaderPlane({
  vertexShader,
  fragmentShader,
  metadata,
}: ShaderPlaneProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Create Leva controls configuration
  const controlsConfig = useMemo(() => {
    if (!metadata?.showControls || !metadata?.uniforms) {
      return {};
    }

    return Object.entries(metadata.uniforms).reduce((acc, [key, config]) => {
      acc[key] = {
        value: config.default,
        min: config.min ?? -10,
        max: config.max ?? 10,
        step: config.step ?? 0.01,
      };
      return acc;
    }, {} as Record<string, { value: number; min: number; max: number; step: number }>);
  }, [metadata]);

  // Always call useControls, but with empty config when not needed
  const controls = useControls(metadata?.title || "Shader", controlsConfig);

  // Create base uniforms
  const uniforms = useMemo(() => {
    const baseUniforms: Record<string, { value: number | THREE.Vector2 }> = {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector2(1920, 1080) },
    };

    // Add custom uniforms from metadata
    if (metadata?.uniforms) {
      Object.entries(metadata.uniforms).forEach(([key, config]) => {
        baseUniforms[key] = { value: config.default };
      });
    }

    return baseUniforms;
  }, [metadata]);

  useFrame(({ clock, size }) => {
    if (materialRef.current) {
      // Update time
      materialRef.current.uniforms.iTime.value = clock.getElapsedTime();

      // Update resolution
      materialRef.current.uniforms.iResolution.value.set(
        size.width,
        size.height
      );

      // Update custom uniforms from controls
      if (metadata?.showControls && metadata?.uniforms) {
        Object.keys(metadata.uniforms).forEach((key) => {
          if (controls[key] !== undefined) {
            materialRef.current!.uniforms[key].value = controls[key];
          }
        });
      }
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

interface ShaderViewerProps {
  vertexShader: string;
  fragmentShader: string;
  metadata?: ShaderMetadata;
  className?: string;
}

export default function ShaderViewer({
  vertexShader,
  fragmentShader,
  metadata,
  className = "",
}: ShaderViewerProps) {
  return (
    <div className={`fixed inset-0 w-full h-full ${className}`}>
      <Canvas
        className="w-full h-full"
        camera={{ position: [0, 0, 5], fov: 45, near: 0.1, far: 100 }}
        gl={{ antialias: true }}
      >
        <ShaderPlane
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          metadata={metadata}
        />
        {metadata?.showPerformance && <StatsGl />}
      </Canvas>

      {metadata?.title && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white z-10 text-center">
          <h1 className="text-2xl font-bold">{metadata.title}</h1>
          {metadata.description && (
            <p className="text-gray-300 mt-1">{metadata.description}</p>
          )}
        </div>
      )}
    </div>
  );
}
