"use client"

import { useEffect, useRef } from "react"

import { cn } from "@/lib/utils"

/**
 * A dependency-free WebGL aurora field. Domain-warped fbm noise in the brand's
 * emerald→teal spectrum, drifting over an obsidian canvas and reacting to the
 * pointer. Kept cheap: single fullscreen triangle, DPR clamped, paused when
 * off-screen, and fully disabled under prefers-reduced-motion.
 */

const VERT = `#version 300 es
in vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }`

const FRAG = `#version 300 es
precision highp float;
out vec4 outColor;

uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_intensity;

// hash / value-noise / fbm
float hash(vec2 p){ p = fract(p * vec2(233.34, 851.73)); p += dot(p, p + 23.45); return fract(p.x * p.y); }
float noise(vec2 p){
  vec2 i = floor(p); vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0; float amp = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for(int i = 0; i < 5; i++){
    v += amp * noise(p);
    p = m * p;
    amp *= 0.5;
  }
  return v;
}

void main(){
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  vec2 p = (gl_FragCoord.xy - 0.5 * u_res.xy) / u_res.y;

  float t = u_time * 0.05;

  // pointer warp
  vec2 m = (u_mouse - 0.5) * vec2(u_res.x / u_res.y, 1.0);
  float md = length(p - m);
  p += (p - m) * 0.12 * exp(-md * 2.2);

  // domain warp
  vec2 q = vec2(fbm(p * 1.5 + t), fbm(p * 1.5 - t + 4.0));
  vec2 r = vec2(fbm(p * 1.5 + q * 1.8 + t * 1.3), fbm(p * 1.5 + q * 1.8 + 2.0));
  float f = fbm(p * 1.6 + r * 2.2);

  // spectral ramp (emerald -> teal -> deep cyan)
  vec3 c1 = vec3(0.42, 0.95, 0.35); // acid lime
  vec3 c2 = vec3(0.20, 0.85, 0.62); // emerald
  vec3 c3 = vec3(0.10, 0.55, 0.70); // teal
  vec3 col = mix(c3, c2, smoothstep(0.15, 0.55, f));
  col = mix(col, c1, smoothstep(0.55, 0.92, f + 0.15 * length(r)));

  // luminance shaping into ribbons
  float ribbons = smoothstep(0.28, 0.85, f) * (0.55 + 0.45 * length(r));
  col *= ribbons;

  // pointer bloom
  col += c1 * 0.10 * exp(-md * 3.0);

  // soft radial vignette + top-weighted fade (aurora lives up top, away from
  // the headline that sits lower in the frame)
  float vig = smoothstep(1.35, 0.1, length(p));
  float vFade = smoothstep(-0.1, 0.95, uv.y * 0.85 + 0.15);
  col *= vig * vFade;

  col *= u_intensity;

  // pointer bloom adds a little travelling light
  col += vec3(0.35, 0.9, 0.4) * 0.12 * exp(-md * 3.0) * vig;

  // gentle filmic tone; stays pure black where there are no ribbons so the
  // canvas can be composited with screen blending (black = no-op)
  col = col / (col + 0.55);

  outColor = vec4(col * 1.3, 1.0);
}`

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!
  gl.shaderSource(sh, src)
  gl.compileShader(sh)
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    gl.deleteShader(sh)
    return null
  }
  return sh
}

interface WebglBackdropProps {
  className?: string
  intensity?: number
}

export function WebglBackdrop({ className, intensity = 1 }: WebglBackdropProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const gl = canvas.getContext("webgl2", {
      antialias: false,
      alpha: false,
      powerPreference: "high-performance",
      depth: false,
      stencil: false,
    })

    if (!gl) {
      // Fallback: static CSS aurora handled by the parent's gradient layer.
      canvas.style.display = "none"
      return
    }

    const vs = compile(gl, gl.VERTEX_SHADER, VERT)
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG)
    if (!vs || !fs) return

    const prog = gl.createProgram()!
    gl.attachShader(prog, vs)
    gl.attachShader(prog, fs)
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    )
    const loc = gl.getAttribLocation(prog, "a_pos")
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(prog, "u_res")
    const uTime = gl.getUniformLocation(prog, "u_time")
    const uMouse = gl.getUniformLocation(prog, "u_mouse")
    const uIntensity = gl.getUniformLocation(prog, "u_intensity")

    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 }

    let width = 0
    let height = 0
    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.6)
      const w = Math.floor(canvas!.clientWidth * dpr)
      const h = Math.floor(canvas!.clientHeight * dpr)
      if (w === width && h === height) return
      width = w
      height = h
      canvas!.width = w
      canvas!.height = h
      gl!.viewport(0, 0, w, h)
    }

    function onPointer(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect()
      mouse.tx = (e.clientX - rect.left) / rect.width
      mouse.ty = 1 - (e.clientY - rect.top) / rect.height
    }
    window.addEventListener("pointermove", onPointer, { passive: true })

    let visible = true
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible && !reduced) loop()
      },
      { threshold: 0 },
    )
    io.observe(canvas)

    const start = performance.now()
    let raf = 0

    function render(now: number) {
      resize()
      mouse.x += (mouse.tx - mouse.x) * 0.06
      mouse.y += (mouse.ty - mouse.y) * 0.06
      gl!.uniform2f(uRes, width, height)
      gl!.uniform1f(uTime, (now - start) / 1000)
      gl!.uniform2f(uMouse, mouse.x, mouse.y)
      gl!.uniform1f(uIntensity, intensity)
      gl!.drawArrays(gl!.TRIANGLES, 0, 3)
    }

    function loop() {
      cancelAnimationFrame(raf)
      const tick = (now: number) => {
        if (!visible) return
        render(now)
        raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }

    if (reduced) {
      // Single static frame.
      resize()
      render(start + 1000)
    } else {
      loop()
    }

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener("pointermove", onPointer)
      gl.deleteProgram(prog)
      gl.deleteBuffer(buf)
    }
  }, [intensity])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn("h-full w-full mix-blend-screen", className)}
    />
  )
}
