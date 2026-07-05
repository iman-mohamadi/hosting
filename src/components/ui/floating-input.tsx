"use client"

import { motion } from "framer-motion"
import { useState } from "react"

import { cn } from "@/lib/utils"

interface FloatingInputProps {
  id: string
  label: string
  type?: string
  value: string
  onChange: (value: string) => void
  required?: boolean
  disabled?: boolean
  autoComplete?: string
  dir?: "ltr" | "rtl" | "auto"
}

export function FloatingInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  required,
  disabled,
  autoComplete,
  dir,
}: FloatingInputProps) {
  const [is_focused, set_is_focused] = useState(false)
  const is_floating = is_focused || value.length > 0

  return (
    <div className="relative">
      <motion.input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onFocus={() => set_is_focused(true)}
        onBlur={() => set_is_focused(false)}
        required={required}
        disabled={disabled}
        autoComplete={autoComplete}
        dir={dir}
        animate={{
          boxShadow: is_focused
            ? "0 0 0 3px oklch(0.72 0.12 188 / 0.15)"
            : "0 0 0 0px transparent",
        }}
        transition={{ duration: 0.25 }}
        className={cn(
          "peer h-14 w-full rounded-xl border bg-background/40 px-4 pt-5 pb-2 text-sm",
          "border-border/50 backdrop-blur-sm transition-colors duration-300 outline-none",
          "focus:border-primary/40 disabled:pointer-events-none disabled:opacity-50",
          dir === "ltr" && "text-left",
        )}
      />

      <label
        htmlFor={id}
        className={cn(
          "pointer-events-none absolute start-4 text-muted-foreground transition-all duration-300",
          is_floating
            ? "top-2 text-[0.65rem] tracking-widest uppercase"
            : "top-1/2 -translate-y-1/2 text-sm",
          is_focused && "text-primary/80",
        )}
      >
        {label}
      </label>
    </div>
  )
}
