"use client"

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useSpring,
} from "framer-motion"
import { useEffect, useState } from "react"
import { useShallow } from "zustand/react/shallow"

import type { SelectedOs, StorageType } from "@/actions"
import { validate_configuration } from "@/actions"
import { MagneticButton } from "@/components/fx/magnetic-button"
import { Reveal, TextReveal } from "@/components/fx/reveal"
import { Slider } from "@/components/ui/slider"
import type { Locale } from "@/i18n/config"
import { format_vps_price } from "@/lib/vps-pricing"
import { use_configurator_store } from "@/store/use_configurator_store"
import { cn } from "@/lib/utils"

/* ─── copy ─────────────────────────────────────────────────────────── */

const COPY = {
  en: {
    eyebrow: "Configure",
    title: "Design your\nmachine.",
    subtitle:
      "Dial in exactly what you need. Pricing recalculates the instant you move — no surprises at checkout.",
    cpu_label: "Compute",
    ram_label: "Memory",
    storage_label: "Storage",
    os_label: "Operating system",
    summary_title: "Your build",
    per_month: "/ month",
    deploy: "Deploy instance",
    cpu_unit: "vCPU",
    ram_unit: "GB",
    storage_options: {
      nvme: { label: "NVMe", desc: "Ultra-low latency flash" },
      ssd: { label: "SSD", desc: "Reliable standard storage" },
    },
    os_options: {
      ubuntu: { label: "Ubuntu", desc: "LTS · battle-tested" },
      windows: { label: "Windows", desc: "Server 2022" },
      arch_linux: { label: "Arch Linux", desc: "Rolling release" },
    },
  },
  fa: {
    eyebrow: "پیکربندی",
    title: "ماشین خود را\nطراحی کنید.",
    subtitle:
      "دقیقاً همان چیزی را که لازم دارید تنظیم کنید. قیمت لحظه‌ای به‌روز می‌شود — بدون غافلگیری در پرداخت.",
    cpu_label: "پردازش",
    ram_label: "حافظه",
    storage_label: "ذخیره‌سازی",
    os_label: "سیستم‌عامل",
    summary_title: "سرور شما",
    per_month: "/ ماه",
    deploy: "استقرار سرور",
    cpu_unit: "vCPU",
    ram_unit: "GB",
    storage_options: {
      nvme: { label: "NVMe", desc: "فلش با تأخیر بسیار کم" },
      ssd: { label: "SSD", desc: "ذخیره‌سازی استاندارد پایدار" },
    },
    os_options: {
      ubuntu: { label: "Ubuntu", desc: "LTS · امتحان‌پس‌داده" },
      windows: { label: "Windows", desc: "Server 2022" },
      arch_linux: { label: "Arch Linux", desc: "Rolling release" },
    },
  },
} as const

/* ─── animated metric ──────────────────────────────────────────────── */

function AnimatedMetric({
  value,
  locale,
  format = "number",
  className,
}: {
  value: number
  locale: Locale
  format?: "number" | "price"
  className?: string
}) {
  const spring = useSpring(value, { stiffness: 90, damping: 20, mass: 0.8 })
  const [display, set_display] = useState(() =>
    format === "price"
      ? format_vps_price(value, locale)
      : value.toLocaleString(locale === "fa" ? "fa-IR" : "en-US"),
  )

  useEffect(() => {
    spring.set(value)
  }, [spring, value])

  useMotionValueEvent(spring, "change", (latest) => {
    set_display(
      format === "price"
        ? format_vps_price(latest, locale)
        : Math.round(latest).toLocaleString(locale === "fa" ? "fa-IR" : "en-US"),
    )
  })

  return <span className={cn("tabular-nums", className)}>{display}</span>
}

/* ─── slide-on-change value ────────────────────────────────────────── */

function SlideValue({ value, className }: { value: string; className?: string }) {
  return (
    <span className={cn("relative inline-flex overflow-hidden leading-none", className)}>
      <span aria-hidden className="pointer-events-none opacity-0">
        {value}
      </span>
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-110%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 340, damping: 30 }}
          className="absolute inset-0 tabular-nums"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

/* ─── slider block ─────────────────────────────────────────────────── */

interface ConfiguratorSliderProps {
  index: string
  label: string
  value: number
  min: number
  max: number
  step: number
  unit?: string
  locale: Locale
  isRTL: boolean
  on_change: (value: number) => void
}

function ConfiguratorSlider({
  index,
  label,
  value,
  min,
  max,
  step,
  unit,
  locale,
  isRTL,
  on_change,
}: ConfiguratorSliderProps) {
  const progress = ((value - min) / (max - min)) * 100

  return (
    <div className="group relative">
      <div className="mb-8 flex items-end justify-between gap-8">
        <div className="space-y-3">
          <span className="font-mono text-[0.65rem] tracking-[0.3em] text-acid/70">
            {index}
          </span>
          <p
            className={cn(
              "text-xs font-medium tracking-[0.3em] text-muted-foreground uppercase",
              isRTL && "font-[family-name:var(--font-vazirmatn)]",
            )}
          >
            {label}
          </p>
        </div>

        <div className="flex items-baseline gap-3 ltr:text-right rtl:text-left">
          <AnimatedMetric
            value={value}
            locale={locale}
            className={cn(
              "text-5xl font-bold tracking-tighter text-foreground sm:text-6xl",
              isRTL && "font-[family-name:var(--font-vazirmatn)]",
            )}
          />
          {unit && (
            <span
              className={cn(
                "pb-2 font-mono text-xs tracking-wide text-muted-foreground",
                isRTL && "font-[family-name:var(--font-vazirmatn)]",
              )}
            >
              {unit}
            </span>
          )}
        </div>
      </div>

      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-1/2 h-8 -translate-y-1/2 rounded-full opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `linear-gradient(90deg, transparent ${Math.max(0, progress - 8)}%, oklch(0.9 0.22 128 / 0.35) ${progress}%, transparent ${Math.min(100, progress + 8)}%)`,
          }}
        />
        <Slider
          min={min}
          max={max}
          step={step}
          value={[value]}
          onValueChange={([next]) => on_change(next ?? min)}
          className="relative py-3"
        />
        <div className="mt-4 flex justify-between font-mono text-[0.65rem] tracking-wider text-muted-foreground/60">
          <span>{min}</span>
          <span>{max}</span>
        </div>
      </div>
    </div>
  )
}

/* ─── option card ──────────────────────────────────────────────────── */

function OptionCard({
  id,
  label,
  description,
  is_selected,
  on_select,
  isRTL,
}: {
  id: string
  label: string
  description: string
  is_selected: boolean
  on_select: () => void
  isRTL: boolean
}) {
  return (
    <motion.button
      type="button"
      id={id}
      role="radio"
      aria-checked={is_selected}
      onClick={on_select}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className={cn(
        "group relative w-full overflow-hidden rounded-2xl border p-6 text-start transition-all duration-300",
        is_selected
          ? "border-acid/50 bg-acid/[0.06] shadow-[0_0_40px_-14px_oklch(0.9_0.22_128/0.6)]"
          : "border-white/10 bg-white/[0.015] hover:border-white/20 hover:bg-white/[0.04]",
      )}
    >
      <div
        aria-hidden
        className={cn(
          "absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-acid/70 to-transparent transition-opacity",
          is_selected ? "opacity-100" : "opacity-0 group-hover:opacity-40",
        )}
      />
      <div className="flex items-center justify-between">
        <p
          className={cn(
            "text-base font-semibold text-foreground",
            isRTL && "font-[family-name:var(--font-vazirmatn)]",
          )}
        >
          {label}
        </p>
        <span
          className={cn(
            "flex size-4 items-center justify-center rounded-full border transition-colors",
            is_selected ? "border-acid bg-acid" : "border-white/20",
          )}
        >
          {is_selected && <span className="size-1.5 rounded-full bg-acid-foreground" />}
        </span>
      </div>
      <p
        className={cn(
          "mt-2 text-sm leading-relaxed text-muted-foreground",
          isRTL && "font-[family-name:var(--font-vazirmatn)]",
        )}
      >
        {description}
      </p>
    </motion.button>
  )
}

/* ─── live summary ─────────────────────────────────────────────────── */

function LiveSummary({
  locale,
  copy,
  isRTL,
  compact = false,
}: {
  locale: Locale
  copy: (typeof COPY)[Locale]
  isRTL: boolean
  compact?: boolean
}) {
  const {
    cpu_cores,
    ram_gb,
    storage_type,
    storage_size_gb,
    selected_os,
    monthly_price,
  } = use_configurator_store(
    useShallow((state) => ({
      cpu_cores: state.cpu_cores,
      ram_gb: state.ram_gb,
      storage_type: state.storage_type,
      storage_size_gb: state.storage_size_gb,
      selected_os: state.selected_os,
      monthly_price: state.monthly_price,
    })),
  )

  const storage_label = copy.storage_options[storage_type].label
  const os_label = copy.os_options[selected_os].label
  const price_display = format_vps_price(monthly_price, locale)

  if (compact) {
    return (
      <div className="min-w-0">
        <div className="flex items-end gap-2">
          <SlideValue
            value={price_display}
            className={cn(
              "text-2xl font-bold tracking-tighter text-foreground",
              isRTL && "font-[family-name:var(--font-vazirmatn)]",
            )}
          />
          <span className="pb-0.5 font-mono text-xs text-muted-foreground">
            {copy.per_month}
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 glass p-8">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-acid/60 to-transparent"
      />
      <p
        className={cn(
          "font-mono text-xs tracking-[0.3em] text-acid uppercase",
          isRTL && "font-[family-name:var(--font-vazirmatn)]",
        )}
      >
        {copy.summary_title}
      </p>

      <ul
        className={cn(
          "mt-8 space-y-4 text-sm",
          isRTL && "font-[family-name:var(--font-vazirmatn)]",
        )}
      >
        {[
          { label: copy.cpu_label, value: `${cpu_cores} ${copy.cpu_unit}` },
          { label: copy.ram_label, value: `${ram_gb} ${copy.ram_unit}` },
          { label: copy.storage_label, value: `${storage_label} · ${storage_size_gb} GB` },
          { label: copy.os_label, value: os_label },
        ].map((row) => (
          <li key={row.label} className="flex items-center justify-between gap-4 border-b border-white/5 pb-4">
            <span className="text-muted-foreground">{row.label}</span>
            <span className="font-medium text-foreground">{row.value}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex items-end justify-between gap-4">
        <SlideValue
          value={price_display}
          className={cn(
            "text-[clamp(2.5rem,5vw,3.5rem)] font-bold tracking-tighter text-foreground",
            isRTL && "font-[family-name:var(--font-vazirmatn)]",
          )}
        />
        <span className="pb-2 font-mono text-xs text-muted-foreground">
          {copy.per_month}
        </span>
      </div>

      <div className="mt-8">
        <MagneticButton size="pill" isRTL={isRTL} className="w-full justify-center">
          {copy.deploy}
        </MagneticButton>
      </div>
    </div>
  )
}

/* ─── main configurator ────────────────────────────────────────────── */

export function VpsConfigurator({ locale }: { locale: Locale }) {
  const copy = locale === "fa" ? COPY.fa : COPY.en
  const isRTL = locale === "fa"

  const cpu_cores = use_configurator_store((state) => state.cpu_cores)
  const ram_gb = use_configurator_store((state) => state.ram_gb)
  const storage_type = use_configurator_store((state) => state.storage_type)
  const selected_os = use_configurator_store((state) => state.selected_os)
  const update_cpu = use_configurator_store((state) => state.update_cpu)
  const update_ram = use_configurator_store((state) => state.update_ram)
  const update_storage = use_configurator_store((state) => state.update_storage)
  const update_os = use_configurator_store((state) => state.update_os)

  const validation_snapshot = use_configurator_store(
    useShallow((state) => ({
      cpu_cores: state.cpu_cores,
      ram_gb: state.ram_gb,
      storage_type: state.storage_type,
      storage_size_gb: state.storage_size_gb,
      selected_os: state.selected_os,
      monthly_price: state.monthly_price,
    })),
  )

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void validate_configuration(use_configurator_store.getState().get_payload())
    }, 350)
    return () => window.clearTimeout(timer)
  }, [validation_snapshot])

  return (
    <section id="configurator" className="relative px-6 py-28 lg:px-8 lg:py-40">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 rule-x" />

      <div className="mx-auto w-full max-w-7xl">
        <div className="max-w-3xl">
          <Reveal>
            <p className="mb-6 font-mono text-xs tracking-[0.3em] text-acid uppercase">
              {copy.eyebrow}
            </p>
          </Reveal>
          <h2
            className={cn(
              "text-[clamp(2.5rem,6vw,6rem)] font-semibold leading-[0.95] tracking-tight text-foreground",
              isRTL && "font-[family-name:var(--font-vazirmatn)] leading-[1.15]",
            )}
          >
            <TextReveal text={copy.title} />
          </h2>
          <Reveal delay={0.1}>
            <p
              className={cn(
                "mt-8 max-w-xl text-lg text-muted-foreground",
                isRTL && "font-[family-name:var(--font-vazirmatn)]",
              )}
            >
              {copy.subtitle}
            </p>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-16 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-16 xl:gap-24">
          <div className="space-y-16 pb-40 lg:pb-0">
            <ConfiguratorSlider
              index="01"
              label={copy.cpu_label}
              value={cpu_cores}
              min={1}
              max={32}
              step={1}
              unit={copy.cpu_unit}
              locale={locale}
              isRTL={isRTL}
              on_change={update_cpu}
            />
            <ConfiguratorSlider
              index="02"
              label={copy.ram_label}
              value={ram_gb}
              min={1}
              max={128}
              step={1}
              unit={copy.ram_unit}
              locale={locale}
              isRTL={isRTL}
              on_change={update_ram}
            />

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="font-mono text-[0.65rem] tracking-[0.3em] text-acid/70">03</span>
                <p
                  className={cn(
                    "text-xs font-medium tracking-[0.3em] text-muted-foreground uppercase",
                    isRTL && "font-[family-name:var(--font-vazirmatn)]",
                  )}
                >
                  {copy.storage_label}
                </p>
              </div>
              <div role="radiogroup" aria-label={copy.storage_label} className="grid gap-4 sm:grid-cols-2">
                {(Object.keys(copy.storage_options) as StorageType[]).map((key) => (
                  <OptionCard
                    key={key}
                    id={`storage-${key}`}
                    label={copy.storage_options[key].label}
                    description={copy.storage_options[key].desc}
                    is_selected={storage_type === key}
                    on_select={() => update_storage(key)}
                    isRTL={isRTL}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="font-mono text-[0.65rem] tracking-[0.3em] text-acid/70">04</span>
                <p
                  className={cn(
                    "text-xs font-medium tracking-[0.3em] text-muted-foreground uppercase",
                    isRTL && "font-[family-name:var(--font-vazirmatn)]",
                  )}
                >
                  {copy.os_label}
                </p>
              </div>
              <div role="radiogroup" aria-label={copy.os_label} className="grid gap-4 sm:grid-cols-3">
                {(Object.keys(copy.os_options) as SelectedOs[]).map((key) => (
                  <OptionCard
                    key={key}
                    id={`os-${key}`}
                    label={copy.os_options[key].label}
                    description={copy.os_options[key].desc}
                    is_selected={selected_os === key}
                    on_select={() => update_os(key)}
                    isRTL={isRTL}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-28">
              <LiveSummary locale={locale} copy={copy} isRTL={isRTL} />
            </div>
          </div>
        </div>
      </div>

      {/* mobile bottom bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#040605]/85 px-5 py-4 backdrop-blur-2xl lg:hidden">
        <div className="mx-auto flex max-w-lg items-center gap-4">
          <div className="min-w-0 flex-1">
            <LiveSummary locale={locale} copy={copy} isRTL={isRTL} compact />
          </div>
          <MagneticButton size="pill" isRTL={isRTL} withArrow={false} className="shrink-0">
            {copy.deploy}
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
