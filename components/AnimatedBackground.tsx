"use client";
import { NeatConfig, NeatGradient } from "@firecms/neat";
import { useEffect, useRef } from "react";

// Define your config
export const config: NeatConfig = {
  colors: [
    {
      color: "#FF5772",
      enabled: true,
    },
    {
      color: "#4CB4BB",
      enabled: true,
    },
    {
      color: "#FFC600",
      enabled: true,
    },
    {
      color: "#8B6AE6",
      enabled: true,
    },
    {
      color: "#2E0EC7",
      enabled: true,
    },
  ],
  speed: 4,
  horizontalPressure: 3,
  verticalPressure: 4,
  waveFrequencyX: 3,
  waveFrequencyY: 3,
  waveAmplitude: 8,
  shadows: 1,
  highlights: 5,
  colorBrightness: 1,
  colorSaturation: 7,
  wireframe: false,
  colorBlending: 8,
  backgroundColor: "#003FFF",
  backgroundAlpha: 1,
  grainScale: 3,
  grainIntensity: 0.3,
  grainSpeed: 1,
  resolution: 1,
};

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Create the gradient
    const neat = new NeatGradient({
      ref: canvasRef.current,
      ...config,
    });

    // Optional: modify after initialization
    neat.speed = 6;

    // Cleanup on component unmount
    return () => {
      neat.destroy();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="gradient"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
      }}
    />
  );
}
