"use client"

import { useId } from "react"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

interface UsageChartProps {
  data: number[]
  label: string
  unit: string
  average: number
  average_label: string
  average_display?: string
  tone?: "acid" | "cyan" | "violet"
  isRTL?: boolean
}

const TONES = {
  acid: "#635bff",
  cyan: "oklch(0.82 0.16 200)",
  violet: "oklch(0.72 0.16 300)",
} as const

const WIDTH = 640
const HEIGHT = 180
const PAD = 6

export function UsageChart({
  data,
  label,
  unit,
  average,
  average_label,
  average_display,
  tone = "acid",
  isRTL,
}: UsageChartProps) {
  const gradient_id = useId()
  const stroke = TONES[tone]

  const max = Math.max(1, ...data)
  const step = data.length > 1 ? (WIDTH - PAD * 2) / (data.length - 1) : 0

  const points = data.map((value, index) => {
    const x = PAD + index * step
    const y = HEIGHT - PAD - (value / max) * (HEIGHT - PAD * 2)
    return [x, y] as const
  })

  const line_path = points
    .map(([x, y], index) => `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`)
    .join(" ")

  const area_path =
    points.length > 0
      ? `${line_path} L ${points[points.length - 1][0].toFixed(2)} ${HEIGHT - PAD} L ${points[0][0].toFixed(2)} ${HEIGHT - PAD} Z`
      : ""

  const has_data = data.some((value) => value > 0)

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <p
          className={cn(
            "text-sm font-medium text-foreground",
            isRTL && "font-[family-name:var(--font-vazirmatn)]",
          )}
        >
          {label}
        </p>
        <p className="font-mono text-xs text-muted-foreground tabular-nums">
          {average_label}{" "}
          <span className="text-foreground">
            {average_display ?? `${average}${unit}`}
          </span>
        </p>
      </div>

      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        preserveAspectRatio="none"
        className="h-32 w-full"
        role="img"
        aria-label={`${label}: ${average}${unit} ${average_label}`}
      >
        <defs>
          <linearGradient id={gradient_id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={stroke} stopOpacity="0.35" />
            <stop offset="100%" stopColor={stroke} stopOpacity="0" />
          </linearGradient>
        </defs>

        {[0.25, 0.5, 0.75].map((ratio) => (
          <line
            key={ratio}
            x1={PAD}
            x2={WIDTH - PAD}
            y1={HEIGHT * ratio}
            y2={HEIGHT * ratio}
            stroke="oklch(1 0 0 / 0.05)"
            strokeWidth="1"
          />
        ))}

        {has_data && area_path && (
          <motion.path
            d={area_path}
            fill={`url(#${gradient_id})`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        )}

        {has_data && (
          <motion.path
            d={line_path}
            fill="none"
            stroke={stroke}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            vectorEffect="non-scaling-stroke"
          />
        )}
      </svg>
    </div>
  )
}
