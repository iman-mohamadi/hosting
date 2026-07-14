"use client"

import { Cloud, Database, HardDrives } from "@phosphor-icons/react"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

interface CloudFlowProps {
  className?: string
  centerText?: string
  nodeLabels?: {
    topLeft: string
    topRight: string
    bottomLeft: string
    bottomRight: string
  }
  badges?: {
    left: string
    right: string
  }
  title?: string
  accentColor?: string
}

/**
 * Distributed-cloud architecture visualization: animated SVG flow paths
 * from peripheral nodes into a central hub. Adapted from Gamma UI to the
 * project's stack (framer-motion + phosphor).
 */
export default function CloudFlow({
  className,
  centerText,
  nodeLabels,
  badges,
  title,
  accentColor = "#635bff",
}: CloudFlowProps) {
  return (
    <div
      className={cn(
        "relative flex h-[350px] w-full max-w-[500px] flex-col items-center",
        className,
      )}
    >
      <svg
        className="h-full w-full text-muted-foreground/30"
        width="100%"
        height="100%"
        viewBox="0 0 200 100"
      >
        <g
          stroke="currentColor"
          fill="none"
          strokeWidth="0.3"
          strokeDasharray="100 100"
          pathLength="100"
        >
          <path d="M 25 15 L 25 35 Q 25 40 30 40 L 90 40 Q 95 40 95 45 L 95 48" />
          <path d="M 175 15 L 175 35 Q 175 40 170 40 L 110 40 Q 105 40 105 45 L 105 48" />
          <path d="M 95 62 L 95 65 Q 95 70 90 70 L 30 70 Q 25 70 25 75 L 25 85" />
          <path d="M 105 62 L 105 65 Q 105 70 110 70 L 170 70 Q 175 70 175 75 L 175 85" />
          <animate
            attributeName="stroke-dashoffset"
            from="100"
            to="0"
            dur="1.2s"
            fill="freeze"
            calcMode="spline"
            keySplines="0.4,0,0.2,1"
            keyTimes="0; 1"
          />
        </g>

        {[
          "M 25 15 L 25 35 Q 25 40 30 40 L 90 40 Q 95 40 95 45 L 95 48",
          "M 175 15 L 175 35 Q 175 40 170 40 L 110 40 Q 105 40 105 45 L 105 48",
          "M 95 62 L 95 65 Q 95 70 90 70 L 30 70 Q 25 70 25 75 L 25 85",
          "M 105 62 L 105 65 Q 105 70 110 70 L 170 70 Q 175 70 175 75 L 175 85",
        ].map((d, i) => (
          <motion.path
            key={i}
            d={d}
            fill="none"
            stroke={accentColor}
            strokeWidth="0.5"
            strokeDasharray="6 94"
            strokeDashoffset="100"
            initial={{ opacity: 0 }}
            animate={{ strokeDashoffset: [100, 0], opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
              times: [0, 0.1, 0.9, 1],
              delay: i * 0.2,
            }}
          />
        ))}

        <g stroke="currentColor" fill="none" strokeWidth="0.3">
          <g>
            <rect fill="#0F172A" x="8" y="10" width="34" height="10" rx="5" />
            <HardDrives x="12" y="12.5" size={6} color={accentColor} weight="bold" />
            <text x="21" y="17" fill="white" stroke="none" fontSize="4.5" fontWeight="500">
              {nodeLabels?.topLeft || "API"}
            </text>
          </g>
          <g>
            <rect fill="#0F172A" x="158" y="10" width="34" height="10" rx="5" />
            <Cloud x="162" y="12.5" size={6} color={accentColor} weight="bold" />
            <text x="171" y="17" fill="white" stroke="none" fontSize="4.5" fontWeight="500">
              {nodeLabels?.topRight || "CDN"}
            </text>
          </g>
          <g>
            <rect fill="#0F172A" x="8" y="85" width="34" height="10" rx="5" />
            <Database x="12" y="87.5" size={6} color={accentColor} weight="bold" />
            <text x="21" y="92" fill="white" stroke="none" fontSize="4.5" fontWeight="500">
              {nodeLabels?.bottomLeft || "DB"}
            </text>
          </g>
          <g>
            <rect fill="#0F172A" x="158" y="85" width="34" height="10" rx="5" />
            <HardDrives x="162" y="87.5" size={6} color={accentColor} weight="bold" />
            <text x="171" y="92" fill="white" stroke="none" fontSize="4.5" fontWeight="500">
              {nodeLabels?.bottomRight || "APP"}
            </text>
          </g>
        </g>
      </svg>

      <div className="absolute bottom-10 flex w-full flex-col items-center">
        <div className="absolute -bottom-4 h-[100px] w-[62%] rounded-xl bg-primary/20 blur-xl" />

        <div className="absolute -top-3 z-20 flex items-center justify-center rounded-lg border bg-gradient-to-r from-slate-900 to-slate-800 px-3 py-1.5 shadow-lg sm:-top-4">
          <Cloud className="size-3.5" color={accentColor} weight="fill" />
          <span className="ms-2 text-[11px] font-medium text-white">
            {title || "Distributed Cloud Architecture"}
          </span>
        </div>

        <div
          className="absolute -bottom-8 z-30 grid h-[60px] w-[60px] place-items-center rounded-full bg-slate-900 text-xs font-bold shadow-xl"
          style={{ color: accentColor, border: `1px solid ${accentColor}` }}
        >
          {centerText || "HUB"}
        </div>

        <div className="relative z-10 flex h-[150px] w-full items-center justify-center overflow-hidden rounded-xl border bg-card shadow-2xl">
          <div className="absolute bottom-8 left-12 z-10 flex h-8 items-center gap-2 rounded-full border border-slate-700 bg-slate-900/90 px-3 text-xs font-medium text-white shadow-lg backdrop-blur-sm">
            <HardDrives className="size-4" color={accentColor} weight="fill" />
            <span>{badges?.left || "Live Traffic"}</span>
          </div>
          <div className="absolute top-8 right-16 z-10 hidden h-8 items-center gap-2 rounded-full border border-slate-700 bg-slate-900/90 px-3 text-xs font-medium text-white shadow-lg backdrop-blur-sm sm:flex">
            <Database className="size-4" color={accentColor} weight="fill" />
            <span>{badges?.right || "Sync Active"}</span>
          </div>

          {[
            { size: 100, bottom: -14, delay: 0, opacity: [0.5, 0.8, 0.5] as number[], scale: [1, 1.05, 1] as number[] },
            { size: 145, bottom: -20, delay: 0.3, opacity: [0.4, 0.7, 0.4] as number[], scale: [1, 1.03, 1] as number[] },
            { size: 190, bottom: -25, delay: 0.6, opacity: [0.3, 0.6, 0.3] as number[], scale: [1, 1.02, 1] as number[] },
            { size: 235, bottom: -30, delay: 0.9, opacity: [0.2, 0.5, 0.2] as number[], scale: [1, 1.01, 1] as number[] },
          ].map((ring, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-primary/15 bg-primary/5"
              style={{
                width: ring.size,
                height: ring.size,
                bottom: ring.bottom * 4,
              }}
              animate={{ scale: ring.scale, opacity: ring.opacity }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: ring.delay }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
