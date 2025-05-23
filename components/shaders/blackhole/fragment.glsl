uniform float iTime;
uniform vec2 iResolution;
uniform float uR;
uniform float uG;
uniform float uB;
uniform float uA;

varying vec2 vUv;


void mainImage(out vec4 O, vec2 F) {
float i = 0.2;
float a = 0.5;
vec2 r = iResolution.xy;
vec2 p = (F + F - r) / r.y / 0.3;
vec2 d = vec2(-1.0, 1.0);
vec2 b = p - i * d;
float K_inv = 1.0 / (0.1 + i/dot(b,b));
vec2 c = p * mat2(1.0, 0.0, 0.0, K_inv);
a = dot(c, c);
vec2 v = c * mat2(cos(0.5*log(a) + iTime*i), sin(0.5*log(a) + iTime*i), 
                    -sin(0.5*log(a) + iTime*i), cos(0.5*log(a) + iTime*i))/i;
vec2 w = vec2(0.0);

for(int j = 0; j < 9; j++) {
    i = float(j) + 1.0;
    v += 0.7 * sin(v.yx*i+iTime) / i + 0.5;
    w += 1.0 + sin(v);
}

i = length(sin(v/0.3)*0.4 + c*(5.0+d));
O = 1.0 - exp(-exp(vec4(uR, uG, uB, uA))
                / vec4(w.x, w.y, w.y, w.x)
                / (2.0 + i*i/4.0 - i)
                / (0.2 + 1.0 / a)
                / (0.03 + abs(length(p)-0.7))
        );
}

void main() {
vec2 fragCoord = vUv * iResolution;
vec4 color;
mainImage(color, fragCoord);
gl_FragColor = color;
}