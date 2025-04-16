"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import { extend } from "@react-three/fiber";

/*
    "Singularity" by @XorDev

    A whirling blackhole.
    Feel free to code golf!
    
    FabriceNeyret2: -19
    dean_the_coder: -12
    iq: -4
*/

// Define the fragment shader
const fragmentShader = `
  uniform float iTime;
  uniform vec2 iResolution;
  varying vec2 vUv;

  void mainImage(out vec4 O, vec2 F) {
    float i = 0.2;
    float a = 0.0;
    vec2 r = iResolution.xy;
    vec2 p = (F + F - r) / r.y / 0.7;
    vec2 d = vec2(-1.0, 1.0);
    vec2 b = p - i * d;
    vec2 c = p * mat2(1.0, 1.0, d.x/(0.1 + i/dot(b,b)), d.y/(0.1 + i/dot(b,b)));
    a = dot(c, c);
    vec2 v = c * mat2(cos(0.5*log(a) + iTime*i), sin(0.5*log(a) + iTime*i), 
                     -sin(0.5*log(a) + iTime*i), cos(0.5*log(a) + iTime*i))/i;
    vec2 w = vec2(0.0);
    
    for(int j = 0; j < 9; j++) {
      i = float(j) + 1.0;
      v += 0.7 * sin(v.yx*i+iTime) / i + 0.5;
      w += 1.0 + sin(v);
    }
    
    i = length(sin(v/0.3)*0.4 + c*(3.0+d));
    O = 1.0 - exp(-exp(c.x * vec4(0.6, -0.4, -1.0, 0.0))
                  / vec4(w.x, w.y, w.y, w.x)
                  / (2.0 + i*i/4.0 - i)
                  / (0.5 + 1.0 / a)
                  / (0.03 + abs(length(p)-0.7))
          );
  }

  void main() {
    vec2 fragCoord = vUv * iResolution;
    vec4 color;
    mainImage(color, fragCoord);
    gl_FragColor = color;
  }
`;

// Define the vertex shader
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

function BlackHolePlane() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

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
      <planeGeometry args={[15, 10]} />
      <shaderMaterial
        ref={materialRef}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={{
          iTime: { value: 0 },
          iResolution: { value: new THREE.Vector2(1, 1) },
        }}
      />
    </mesh>
  );
}

interface BlackHoleProps {
  className?: string;
}

export function BlackHole({ className = "" }: BlackHoleProps) {
  return (
    <Canvas className={`w-full h-full ${className}`}>
      <OrbitControls />
      <BlackHolePlane />
    </Canvas>
  );
}
