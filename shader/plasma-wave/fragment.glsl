uniform float iTime;
uniform vec2 iResolution;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  vec2 p = (uv - 0.5) * 2.0;

  float t = iTime * 0.5;

  // Create plasma effect
  float plasma = sin(p.x * 10.0 + t) +
                 sin(p.y * 10.0 + t * 1.2) +
                 sin((p.x + p.y) * 7.0 + t * 0.8) +
                 sin(sqrt(p.x * p.x + p.y * p.y) * 12.0 + t * 1.5);

  // Normalize and create color
  plasma = plasma / 4.0;

  vec3 color = vec3(
    sin(plasma * 3.14159 + t) * 0.5 + 0.5,
    sin(plasma * 3.14159 + t + 2.0) * 0.5 + 0.5,
    sin(plasma * 3.14159 + t + 4.0) * 0.5 + 0.5
  );

  gl_FragColor = vec4(color, 1.0);
}