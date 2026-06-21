import { useEffect, useRef } from 'react';

const VERTEX_SHADER = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision mediump float;
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  varying vec2 v_uv;

  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  float fbm(vec2 st) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(st * frequency);
      frequency *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }

  float grain(vec2 st, float t) {
    return random(st * t) * 0.15;
  }

  vec3 networkFluid(vec2 st, float t) {
    float slow = fbm(st * 1.5 + vec2(t * 0.05, t * 0.03));
    float medium = fbm(st * 2.5 + vec2(-t * 0.08, t * 0.06) + slow * 0.2);
    float fast = fbm(st * 4.0 + vec2(t * 0.2, -t * 0.15) + medium * 0.1);
    float fluid = smoothstep(0.4, 0.9, fast * 0.5 + medium * 0.3);
    float distortion = sin(st.y * 10.0 + t) * 0.05;
    float x = st.x + distortion;
    float n1 = fbm(vec2(x * 1.2, st.y * 1.2 - t * 0.1) + fluid);
    float n2 = fbm(vec2(x * 2.5 + 1.3, st.y * 2.5 + t * 0.08) + n1 * 0.3);
    float n3 = fbm(vec2(x * 4.0 + 2.1, st.y * 4.0 - t * 0.15) + n2 * 0.2);
    float combined = n1 * 0.5 + n2 * 0.3 + n3 * 0.2;
    float branch = smoothstep(0.55, 0.75, combined);
    float highlight = smoothstep(0.6, 0.8, n2) * fluid;
    return vec3(branch, highlight, fluid);
  }

  float vignette(vec2 st) {
    float d = length(st - vec2(0.5));
    return smoothstep(0.9, 0.3, d);
  }

  void main() {
    vec2 st = v_uv;
    float aspect = u_resolution.x / u_resolution.y;
    st.x *= aspect;
    float t = u_time;

    vec2 mouseDistortion = vec2(0.0);
    if (u_mouse.x > 0.0) {
      vec2 mUV = u_mouse / u_resolution;
      mUV.x *= aspect;
      mouseDistortion = (st - mUV) * 0.15;
    }
    st += mouseDistortion;

    vec3 fluid = networkFluid(st, t);
    float g = grain(st, t);

    vec3 voidColor = vec3(0.02, 0.02, 0.03);
    vec3 coreBlue = vec3(0.15, 0.39, 0.92);
    vec3 cyanData = vec3(0.02, 0.71, 0.83);
    vec3 hotData = vec3(0.96, 0.62, 0.04);

    vec3 color = mix(voidColor, coreBlue, fluid.x);
    color = mix(color, cyanData, fluid.y);
    color = mix(color, hotData, fluid.z * 0.3);
    color += g;

    float v = vignette(v_uv);
    color *= v;

    color = pow(color, vec3(1.0/2.2));
    gl_FragColor = vec4(color, 1.0);
  }
`;

function createShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader compile error:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl: WebGLRenderingContext, vs: WebGLShader, fs: WebGLShader): WebGLProgram | null {
  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Program link error:', gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

export default function FluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef<{ x: number; y: number }>({ x: -1, y: -1 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { alpha: false, antialias: false });
    if (!gl) return;

    const vs = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = createProgram(gl, vs, fs);
    if (!program) return;

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1, 1, -1, -1, 1,
      -1, 1, 1, -1, 1, 1,
    ]), gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    const timeLocation = gl.getUniformLocation(program, 'u_time');
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
    const mouseLocation = gl.getUniformLocation(program, 'u_mouse');

    function resize() {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      gl!.viewport(0, 0, canvas.width, canvas.height);
    }

    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      mousePos.current = {
        x: e.clientX * dpr,
        y: (window.innerHeight - e.clientY) * dpr,
      };
    };

    const handleMouseLeave = () => {
      mousePos.current = { x: -1, y: -1 };
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const startTime = performance.now();

    function render() {
      if (!gl || !canvas) return;
      const elapsed = (performance.now() - startTime) / 1000;

      gl.useProgram(program);

      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

      gl.uniform1f(timeLocation, elapsed);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform2f(mouseLocation, mousePos.current.x, mousePos.current.y);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      rafRef.current = requestAnimationFrame(render);
    }

    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(positionBuffer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
