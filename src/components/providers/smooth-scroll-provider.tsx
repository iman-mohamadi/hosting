"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"

interface SmoothScrollProviderProps {
  children: React.ReactNode
}

/**
 * Native scrolling — no JS scroll hijacking. Apple-style pages scroll natively;
 * it's crisper, avoids momentum/anchor bugs, and keeps the main thread free.
 * We only (a) reset to the top on route change and (b) keep GSAP ScrollTrigger
 * in sync after navigation, loaded lazily so it never blocks first paint.
 */
export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const pathname = usePathname()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" })

    let cancelled = false
    void import("gsap/ScrollTrigger")
      .then(({ ScrollTrigger }) => {
        if (!cancelled) ScrollTrigger.refresh()
      })
      .catch(() => {
        /* gsap optional */
      })

    return () => {
      cancelled = true
    }
  }, [pathname])

  return <>{children}</>
}
