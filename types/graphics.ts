/**
 * 3D graphics, animations, and visual effects type definitions
 * Includes Three.js, GLSL shaders, and related visual components
 */

import type * as THREE from "three";

// Three.js and shader types
export type UniformValue = THREE.IUniform<unknown> | unknown;

export interface ExtendMaterialConfig {
  header: string;
  vertexHeader?: string;
  fragmentHeader?: string;
  material?: THREE.MeshPhysicalMaterialParameters & { fog?: boolean };
  uniforms?: Record<string, UniformValue>;
  vertex?: Record<string, string>;
  fragment?: Record<string, string>;
}

export interface ShaderWithDefines extends THREE.ShaderLibShader {
  defines?: { [key: string]: string | number | boolean };
}

// 3D Scene components
export interface Scene3DProps {
  children?: React.ReactNode;
  camera?: {
    position?: [number, number, number];
    fov?: number;
    near?: number;
    far?: number;
  };
  lights?: {
    ambient?: { color?: string; intensity?: number };
    directional?: {
      color?: string;
      intensity?: number;
      position?: [number, number, number]
    };
  };
  controls?: {
    enabled?: boolean;
    autoRotate?: boolean;
    autoRotateSpeed?: number;
  };
}

export interface BlackHoleProps {
  size?: number;
  intensity?: number;
  speed?: number;
  color?: string;
  position?: [number, number, number];
}

export interface BeamsProps {
  beamWidth?: number;
  beamHeight?: number;
  beamNumber?: number;
  lightColor?: string;
  speed?: number;
  noiseIntensity?: number;
  scale?: number;
  rotation?: number;
}

// Canvas and drawing types
export type CanvasStrokeStyle = string | CanvasGradient | CanvasPattern;

export interface GridOffset {
  x: number;
  y: number;
}

export interface SquaresProps {
  speed?: number;
  squareSize?: number;
  direction?: "diagonal" | "horizontal" | "vertical";
  borderColor?: CanvasStrokeStyle;
  hoverFillColor?: string;
}

// Animation and visual effect props
export interface VisualEffectProps {
  intensity?: number;
  speed?: number;
  color?: string;
  size?: number;
}

// WebGL/GLSL shader uniforms
export interface ShaderUniforms {
  time: { value: number };
  resolution: { value: THREE.Vector2 };
  mouse: { value: THREE.Vector2 };
  [key: string]: THREE.IUniform<any>;
}