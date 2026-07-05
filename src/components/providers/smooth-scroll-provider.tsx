"use client"

import { usePathname } from "next/navigation"
import { ReactLenis, useLenis } from "lenis/react"
import { useEffect } from "react"

import "lenis/dist/lenis.css"

interface SmoothScrollProviderProps {
  children: React.ReactNode
}

function LenisRouteSync() {
  const pathname = usePathname()
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) {
      return
    }

    lenis.scrollTo(0, { immediate: true, force: true })
  }, [pathname, lenis])

  return null
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.085,
        duration: 1.25,
        smoothWheel: true,
        anchors: {
          offset: 80,
        },
      }}
    >
      <LenisRouteSync />
      {children}
    </ReactLenis>
  )
}
