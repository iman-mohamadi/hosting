"use client"

import { useEffect, useRef } from "react"

/**
 * A handcrafted two-part cursor: a precise dot and a lagging ring that swells
 * over interactive elements. Desktop-only (fine pointer + hover), disabled for
 * reduced motion, and driven by rAF so it never jitters against Lenis.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const dot: HTMLDivElement | null = dotRef.current
    const ringEl: HTMLDivElement | null = ringRef.current
    if (!fine || reduced || !dot || !ringEl) return
    const dotEl = dot
    const ringNode = ringEl

    document.documentElement.classList.add("has-custom-cursor")

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ring = { x: pos.x, y: pos.y }
    let hovering = false
    let down = false
    let visible = false
    let raf = 0

    function onMove(e: PointerEvent) {
      pos.x = e.clientX
      pos.y = e.clientY
      if (!visible) {
        visible = true
        dotEl.style.opacity = "1"
        ringNode.style.opacity = "1"
      }
      const el = e.target as HTMLElement | null
      hovering = !!el?.closest(
        'a, button, [role="button"], input, textarea, select, [data-cursor="hover"]',
      )
    }
    function onDown() {
      down = true
    }
    function onUp() {
      down = false
    }
    function onLeave() {
      visible = false
      dotEl.style.opacity = "0"
      ringNode.style.opacity = "0"
    }

    function tick() {
      ring.x += (pos.x - ring.x) * 0.18
      ring.y += (pos.y - ring.y) * 0.18
      dotEl.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`
      const scale = (hovering ? 1.9 : 1) * (down ? 0.8 : 1)
      ringNode.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%) scale(${scale})`
      ringNode.style.borderColor = hovering
        ? "oklch(0.9 0.22 128 / 0.9)"
        : "oklch(1 0 0 / 0.35)"
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener("pointermove", onMove, { passive: true })
    window.addEventListener("pointerdown", onDown)
    window.addEventListener("pointerup", onUp)
    document.addEventListener("pointerleave", onLeave)
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerdown", onDown)
      window.removeEventListener("pointerup", onUp)
      document.removeEventListener("pointerleave", onLeave)
      document.documentElement.classList.remove("has-custom-cursor")
    }
  }, [])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[9999]">
      <div
        ref={dotRef}
        className="fixed left-0 top-0 size-1.5 rounded-full bg-acid opacity-0 transition-opacity duration-300"
        style={{ willChange: "transform" }}
      />
      <div
        ref={ringRef}
        className="fixed left-0 top-0 size-9 rounded-full border opacity-0 transition-[opacity,border-color] duration-300"
        style={{ willChange: "transform", borderColor: "oklch(1 0 0 / 0.35)" }}
      />
    </div>
  )
}
