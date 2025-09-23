"use client";

import { Canvas } from "@react-three/fiber";
import { BaseballField } from "./BaseballField";

interface BaseballCanvasProps {
  scrollProgress: number;
  className?: string;
}

export function BaseballCanvas({ scrollProgress, className = "" }: BaseballCanvasProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        shadows
        gl={{ antialias: true }}
        camera={{ position: [0, 10, 30], fov: 75 }}
      >
        <BaseballField scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}