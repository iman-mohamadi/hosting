"use client"

import { useEffect, useRef } from "react"

import { cn } from "@/lib/utils"

type Vec3 = { x: number; y: number; z: number }

const NODE_COUNT = 190
const NEIGHBORS = 3
const ARC_COUNT = 7
const SIGNAL = [104, 226, 240] as const // cyan, matches --signal
const EMBER = [244, 186, 96] as const // warm accent nodes

/* Even point distribution on a unit sphere (Fibonacci lattice). */
function fibonacciSphere(count: number): Vec3[] {
  const points: Vec3[] = []
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2
    const radius = Math.sqrt(1 - y * y)
    const theta = golden * i
    points.push({
      x: Math.cos(theta) * radius,
      y,
      z: Math.sin(theta) * radius,
    })
  }
  return points
}

function buildEdges(nodes: Vec3[]): [number, number][] {
  const edges: [number, number][] = []
  const seen = new Set<string>()
  for (let i = 0; i < nodes.length; i++) {
    const dists: { j: number; d: number }[] = []
    for (let j = 0; j < nodes.length; j++) {
      if (i === j) continue
      const dx = nodes[i].x - nodes[j].x
      const dy = nodes[i].y - nodes[j].y
      const dz = nodes[i].z - nodes[j].z
      dists.push({ j, d: dx * dx + dy * dy + dz * dz })
    }
    dists.sort((a, b) => a.d - b.d)
    for (let k = 0; k < NEIGHBORS; k++) {
      const j = dists[k].j
      const key = i < j ? `${i}-${j}` : `${j}-${i}`
      if (seen.has(key)) continue
      seen.add(key)
      edges.push([i, j])
    }
  }
  return edges
}

interface Arc {
  a: number
  b: number
  offset: number
  speed: number
}

export function NetworkGlobe({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const nodes = fibonacciSphere(NODE_COUNT)
    const edges = buildEdges(nodes)
    const emberSet = new Set<number>()
    for (let i = 0; i < 10; i++) {
      emberSet.add(Math.floor(Math.random() * NODE_COUNT))
    }
    const arcs: Arc[] = Array.from({ length: ARC_COUNT }, () => ({
      a: Math.floor(Math.random() * NODE_COUNT),
      b: Math.floor(Math.random() * NODE_COUNT),
      offset: Math.random(),
      speed: 0.0022 + Math.random() * 0.0032,
    }))

    let width = 0
    let height = 0
    let radius = 0
    let cx = 0
    let cy = 0
    let dpr = 1

    function resize() {
      const parent = canvas.parentElement
      if (!parent) return
      const rect = parent.getBoundingClientRect()
      width = rect.width
      height = rect.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      cx = width / 2
      cy = height / 2
      radius = Math.min(width, height) * 0.42
    }
    resize()

    let spin = 0
    let rotY = 0
    let rotX = -0.32
    let yaw = 0 // pointer-driven horizontal offset
    let targetYaw = 0
    let targetRX = -0.32

    function onPointer(e: PointerEvent) {
      const rect = canvas.getBoundingClientRect()
      const nx = (e.clientX - rect.left) / rect.width - 0.5
      const ny = (e.clientY - rect.top) / rect.height - 0.5
      targetYaw = nx * 0.7
      targetRX = -0.32 + ny * 0.5
    }
    function onLeave() {
      targetYaw = 0
      targetRX = -0.32
    }

    window.addEventListener("pointermove", onPointer, { passive: true })
    window.addEventListener("pointerleave", onLeave)

    // Reusable projected buffer
    const proj = new Array(NODE_COUNT)
      .fill(0)
      .map(() => ({ x: 0, y: 0, scale: 0, vis: 0 }))

    function project(v: Vec3) {
      // rotate around Y then X
      const cosY = Math.cos(rotY)
      const sinY = Math.sin(rotY)
      const cosX = Math.cos(rotX)
      const sinX = Math.sin(rotX)
      let x = v.x * cosY - v.z * sinY
      let z = v.x * sinY + v.z * cosY
      let y = v.y * cosX - z * sinX
      z = v.y * sinX + z * cosX
      const perspective = 2.6 / (2.6 - z)
      return {
        x: cx + x * radius * perspective,
        y: cy + y * radius * perspective,
        scale: perspective,
        z,
      }
    }

    let frame = 0
    let running = true

    function render() {
      ctx.clearRect(0, 0, width, height)

      if (!reduced) spin += 0.0016
      yaw += (targetYaw - yaw) * 0.05
      rotX += (targetRX - rotX) * 0.05
      rotY = spin + yaw

      // project all nodes
      for (let i = 0; i < NODE_COUNT; i++) {
        const p = project(nodes[i])
        proj[i].x = p.x
        proj[i].y = p.y
        proj[i].scale = p.scale
        proj[i].vis = (p.z + 1) / 2 // 0 back .. 1 front
      }

      // edges
      for (let e = 0; e < edges.length; e++) {
        const [a, b] = edges[e]
        const pa = proj[a]
        const pb = proj[b]
        const vis = (pa.vis + pb.vis) / 2
        if (vis < 0.12) continue
        ctx.strokeStyle = `rgba(${SIGNAL[0]}, ${SIGNAL[1]}, ${SIGNAL[2]}, ${vis * 0.16})`
        ctx.lineWidth = 0.6
        ctx.beginPath()
        ctx.moveTo(pa.x, pa.y)
        ctx.lineTo(pb.x, pb.y)
        ctx.stroke()
      }

      // traveling signal arcs
      for (let i = 0; i < arcs.length; i++) {
        const arc = arcs[i]
        if (!reduced) arc.offset += arc.speed
        if (arc.offset > 1) {
          arc.offset = 0
          arc.a = Math.floor(Math.random() * NODE_COUNT)
          arc.b = Math.floor(Math.random() * NODE_COUNT)
        }
        const pa = proj[arc.a]
        const pb = proj[arc.b]
        if (pa.vis < 0.2 && pb.vis < 0.2) continue
        // quadratic arc lifted toward viewer via midpoint offset
        const mx = (pa.x + pb.x) / 2
        const my = (pa.y + pb.y) / 2 - Math.hypot(pb.x - pa.x, pb.y - pa.y) * 0.28
        const t = arc.offset
        const it = 1 - t
        const px = it * it * pa.x + 2 * it * t * mx + t * t * pb.x
        const py = it * it * pa.y + 2 * it * t * my + t * t * pb.y

        // faint arc path
        ctx.strokeStyle = `rgba(${SIGNAL[0]}, ${SIGNAL[1]}, ${SIGNAL[2]}, 0.1)`
        ctx.lineWidth = 0.8
        ctx.beginPath()
        ctx.moveTo(pa.x, pa.y)
        ctx.quadraticCurveTo(mx, my, pb.x, pb.y)
        ctx.stroke()

        // moving pulse
        const glow = ctx.createRadialGradient(px, py, 0, px, py, 5)
        glow.addColorStop(0, `rgba(${SIGNAL[0]}, ${SIGNAL[1]}, ${SIGNAL[2]}, 0.9)`)
        glow.addColorStop(1, `rgba(${SIGNAL[0]}, ${SIGNAL[1]}, ${SIGNAL[2]}, 0)`)
        ctx.fillStyle = glow
        ctx.beginPath()
        ctx.arc(px, py, 5, 0, Math.PI * 2)
        ctx.fill()
      }

      // nodes (front sorted last for correct overlap glow)
      const order = [...proj.keys()].sort((a, b) => proj[a].vis - proj[b].vis)
      for (const idx of order) {
        const p = proj[idx]
        const isEmber = emberSet.has(idx)
        const col = isEmber ? EMBER : SIGNAL
        const size = (isEmber ? 1.7 : 1.1) * p.scale
        const alpha = 0.25 + p.vis * 0.75
        ctx.fillStyle = `rgba(${col[0]}, ${col[1]}, ${col[2]}, ${alpha})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, Math.max(0.4, size), 0, Math.PI * 2)
        ctx.fill()
        if (isEmber && p.vis > 0.55) {
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 9)
          g.addColorStop(0, `rgba(${col[0]}, ${col[1]}, ${col[2]}, 0.35)`)
          g.addColorStop(1, `rgba(${col[0]}, ${col[1]}, ${col[2]}, 0)`)
          ctx.fillStyle = g
          ctx.beginPath()
          ctx.arc(p.x, p.y, 9, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      if (running && !reduced) {
        frame = requestAnimationFrame(render)
      }
    }

    render()

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running && !reduced) {
          running = true
          render()
        } else if (!entry.isIntersecting) {
          running = false
          cancelAnimationFrame(frame)
        }
      },
      { threshold: 0 },
    )
    io.observe(canvas)

    const ro = new ResizeObserver(() => resize())
    if (canvas.parentElement) ro.observe(canvas.parentElement)

    return () => {
      running = false
      cancelAnimationFrame(frame)
      io.disconnect()
      ro.disconnect()
      window.removeEventListener("pointermove", onPointer)
      window.removeEventListener("pointerleave", onLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn("block h-full w-full", className)}
    />
  )
}
