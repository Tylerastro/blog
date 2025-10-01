uniform float iTime;
uniform vec2 iResolution;
uniform float colorShift;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;

  vec3 color1 = vec3(1.0, 0.2, 0.5);
  vec3 color2 = vec3(0.2, 0.8, 1.0);

  float t = uv.x + sin(uv.y * 5.0 + iTime + colorShift) * 0.1;

  vec3 color = mix(color1, color2, t);

  gl_FragColor = vec4(color, 1.0);
}