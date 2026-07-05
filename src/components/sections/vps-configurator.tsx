"use client"

import { motion, useMotionValueEvent, useSpring } from "framer-motion"
import { useEffect, useState } from "react"
import { useShallow } from "zustand/react/shallow"

import type { SelectedOs, StorageType } from "@/actions"
import { validate_configuration } from "@/actions"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import type { Locale } from "@/i18n/config"
import { format_vps_price } from "@/lib/vps-pricing"
import { use_configurator_store } from "@/store/use_configurator_store"
import { cn } from "@/lib/utils"

/* ─── copy ─────────────────────────────────────────────────────────── */

const COPY = {
  en: {
    eyebrow: "Configure",
    title: "Design your\nserver.",
    subtitle:
      "Dial in exactly what you need. Pricing updates instantly — no surprises at checkout.",
    cpu_label: "CPU",
    ram_label: "Memory",
    storage_label: "Storage",
    os_label: "OS",
    summary_title: "Live summary",
    per_month: "/ mo",
    deploy: "Deploy instance",
    cpu_unit: "cores",
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
    title: "سرور خود را\nطراحی کنید.",
    subtitle:
      "دقیقاً همان چیزی را که لازم دارید تنظیم کنید. قیمت‌گذاری فوری — بدون غافلگیری در پرداخت.",
    cpu_label: "CPU",
    ram_label: "حافظه",
    storage_label: "ذخیره‌سازی",
    os_label: "سیستم‌عامل",
    summary_title: "خلاصه زنده",
    per_month: "/ ماه",
    deploy: "استقرار سرور",
    cpu_unit: "هسته",
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

/* ─── custom slider block ──────────────────────────────────────────── */

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
    <div className="group relative space-y-10 border-b border-border/20 pb-16 last:border-b-0 last:pb-0">
      <div className="flex items-start justify-between gap-8">
        <div className="space-y-3">
          <span className="font-mono text-[0.65rem] tracking-[0.3em] text-muted-foreground/60">
            {index}
          </span>
          <p
            className={cn(
              "text-xs font-semibold tracking-[0.25em] text-muted-foreground uppercase",
              isRTL && "font-[family-name:var(--font-vazirmatn)]",
            )}
          >
            {label}
          </p>
        </div>

        <div className="flex items-baseline gap-2 ltr:text-right rtl:text-left">
          <AnimatedMetric
            value={value}
            locale={locale}
            className={cn(
              "text-[clamp(3rem,8vw,5.5rem)] font-semibold leading-none tracking-tighter text-foreground",
              isRTL && "font-[family-name:var(--font-vazirmatn)]",
            )}
          />
          {unit && (
            <span
              className={cn(
                "pb-2 text-sm font-medium tracking-wide text-muted-foreground",
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
            background: `linear-gradient(90deg, transparent ${Math.max(0, progress - 8)}%, oklch(0.72 0.12 188 / 0.35) ${progress}%, transparent ${Math.min(100, progress + 8)}%)`,
          }}
        />
        <Slider
          min={min}
          max={max}
          step={step}
          value={[value]}
          onValueChange={([next]) => on_change(next ?? min)}
          className={cn(
            "relative py-3",
            "[&_[data-slot=slider-track]]:h-1.5 [&_[data-slot=slider-track]]:bg-white/[0.06]",
            "[&_[data-slot=slider-range]]:bg-gradient-to-r [&_[data-slot=slider-range]]:from-cyan-400/80 [&_[data-slot=slider-range]]:to-cyan-300",
            "[&_[data-slot=slider-thumb]]:size-4 [&_[data-slot=slider-thumb]]:border-cyan-400/50",
            "[&_[data-slot=slider-thumb]]:bg-background [&_[data-slot=slider-thumb]]:shadow-[0_0_20px_oklch(0.72_0.12_188/0.45)]",
          )}
        />
        <div className="mt-3 flex justify-between font-mono text-[0.65rem] tracking-wider text-muted-foreground/50">
          <span>{min}</span>
          <span>{max}</span>
        </div>
      </div>
    </div>
  )
}

/* ─── option card ──────────────────────────────────────────────────── */

interface OptionCardProps {
  id: string
  label: string
  description: string
  is_selected: boolean
  on_select: () => void
  isRTL: boolean
}

function OptionCard({
  id,
  label,
  description,
  is_selected,
  on_select,
  isRTL,
}: OptionCardProps) {
  return (
    <motion.button
      type="button"
      id={id}
      role="radio"
      aria-checked={is_selected}
      onClick={on_select}
      animate={{
        scale: is_selected ? 1.02 : 1,
        borderColor: is_selected
          ? "oklch(0.72 0.12 188 / 0.45)"
          : "oklch(0.5 0 0 / 0.12)",
      }}
      whileHover={{ scale: is_selected ? 1.02 : 1.01 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className={cn(
        "group relative w-full overflow-hidden rounded-2xl border p-6 text-start",
        "bg-white/[0.02] backdrop-blur-md",
        is_selected
          ? "bg-cyan-400/[0.04] shadow-[0_0_40px_-12px_oklch(0.72_0.12_188/0.5)]"
          : "hover:bg-white/[0.04]",
      )}
    >
      <motion.div
        aria-hidden
        animate={{ opacity: is_selected ? 1 : 0 }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,oklch(0.72_0.12_188/0.12),transparent_70%)]"
      />
      <div
        aria-hidden
        className={cn(
          "absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent transition-opacity",
          is_selected ? "opacity-100" : "opacity-0 group-hover:opacity-50",
        )}
      />
      <p
        className={cn(
          "relative text-base font-semibold text-foreground",
          isRTL && "font-[family-name:var(--font-vazirmatn)]",
        )}
      >
        {label}
      </p>
      <p
        className={cn(
          "relative mt-2 text-sm leading-relaxed text-muted-foreground",
          isRTL && "font-[family-name:var(--font-vazirmatn)]",
        )}
      >
        {description}
      </p>
    </motion.button>
  )
}

/* ─── live summary ─────────────────────────────────────────────────── */

interface LiveSummaryProps {
  locale: Locale
  copy: (typeof COPY)[Locale]
  isRTL: boolean
  compact?: boolean
  className?: string
}

function LiveSummary({
  locale,
  copy,
  isRTL,
  compact = false,
  className,
}: LiveSummaryProps) {
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

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-border/40",
        "bg-white/[0.03] p-6 backdrop-blur-2xl sm:p-8",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-b from-cyan-400/20 via-transparent to-transparent opacity-60"
      />

      <div className="relative">
        <p
          className={cn(
            "text-xs font-semibold tracking-[0.25em] text-muted-foreground uppercase",
            isRTL && "font-[family-name:var(--font-vazirmatn)]",
          )}
        >
          {copy.summary_title}
        </p>

        {!compact && (
          <ul
            className={cn(
              "mt-8 space-y-4 text-sm",
              isRTL && "font-[family-name:var(--font-vazirmatn)]",
            )}
          >
            {[
              { label: copy.cpu_label, value: `${cpu_cores} ${copy.cpu_unit}` },
              { label: copy.ram_label, value: `${ram_gb} ${copy.ram_unit}` },
              {
                label: copy.storage_label,
                value: `${storage_label} · ${storage_size_gb} GB`,
              },
              { label: copy.os_label, value: os_label },
            ].map((row) => (
              <li
                key={row.label}
                className="flex items-center justify-between gap-4 border-b border-border/15 pb-4 last:border-b-0 last:pb-0"
              >
                <span className="text-muted-foreground">{row.label}</span>
                <span className="font-medium text-foreground">{row.value}</span>
              </li>
            ))}
          </ul>
        )}

        <div className={cn(compact ? "mt-0" : "mt-10 border-t border-border/25 pt-8")}>
          <div className="flex items-end justify-between gap-4">
            <AnimatedMetric
              value={monthly_price}
              locale={locale}
              format="price"
              className={cn(
                compact
                  ? "text-3xl font-semibold tracking-tight text-foreground"
                  : "text-[clamp(2.5rem,5vw,3.75rem)] font-semibold leading-none tracking-tighter text-foreground",
                isRTL && "font-[family-name:var(--font-vazirmatn)]",
              )}
            />
            <span className="pb-1 text-sm text-muted-foreground">{copy.per_month}</span>
          </div>
        </div>

        {!compact && (
          <Button
            size="lg"
            className="mt-8 h-12 w-full rounded-full text-sm font-medium tracking-wide shadow-[0_0_32px_-8px_oklch(0.72_0.12_188/0.55)]"
          >
            {copy.deploy}
          </Button>
        )}
      </div>
    </div>
  )
}

/* ─── main configurator ────────────────────────────────────────────── */

interface VpsConfiguratorProps {
  locale: Locale
}

export function VpsConfigurator({ locale }: VpsConfiguratorProps) {
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
    <section id="configurator" className="relative min-h-screen px-6 py-32 lg:px-8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 start-1/2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-border/20 to-transparent lg:block"
      />

      <div className="mx-auto w-full max-w-7xl">
        <div className="max-w-3xl">
          <p className="mb-4 text-xs font-semibold tracking-[0.25em] text-muted-foreground uppercase">
            {copy.eyebrow}
          </p>
          <h2
            className={cn(
              "whitespace-pre-line text-5xl font-semibold tracking-tight text-foreground",
              "sm:text-6xl md:text-7xl lg:text-8xl lg:leading-[0.93]",
              isRTL && "font-[family-name:var(--font-vazirmatn)]",
            )}
          >
            {copy.title}
          </h2>
          <p
            className={cn(
              "mt-8 max-w-xl text-lg text-muted-foreground md:text-xl",
              isRTL && "font-[family-name:var(--font-vazirmatn)]",
            )}
          >
            {copy.subtitle}
          </p>
        </div>

        <div className="mt-24 grid gap-20 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-16 xl:gap-24">
          {/* controls */}
          <div className="space-y-20 pb-32 lg:pb-0">
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

            <div className="space-y-8 border-b border-border/20 pb-16">
              <div className="space-y-3">
                <span className="font-mono text-[0.65rem] tracking-[0.3em] text-muted-foreground/60">
                  03
                </span>
                <p
                  className={cn(
                    "text-xs font-semibold tracking-[0.25em] text-muted-foreground uppercase",
                    isRTL && "font-[family-name:var(--font-vazirmatn)]",
                  )}
                >
                  {copy.storage_label}
                </p>
              </div>
              <div
                role="radiogroup"
                aria-label={copy.storage_label}
                className="grid gap-4 sm:grid-cols-2"
              >
                {(Object.keys(copy.storage_options) as StorageType[]).map(
                  (key) => (
                    <OptionCard
                      key={key}
                      id={`storage-${key}`}
                      label={copy.storage_options[key].label}
                      description={copy.storage_options[key].desc}
                      is_selected={storage_type === key}
                      on_select={() => update_storage(key)}
                      isRTL={isRTL}
                    />
                  ),
                )}
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-3">
                <span className="font-mono text-[0.65rem] tracking-[0.3em] text-muted-foreground/60">
                  04
                </span>
                <p
                  className={cn(
                    "text-xs font-semibold tracking-[0.25em] text-muted-foreground uppercase",
                    isRTL && "font-[family-name:var(--font-vazirmatn)]",
                  )}
                >
                  {copy.os_label}
                </p>
              </div>
              <div
                role="radiogroup"
                aria-label={copy.os_label}
                className="grid gap-4 sm:grid-cols-3"
              >
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

          {/* desktop summary */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <LiveSummary locale={locale} copy={copy} isRTL={isRTL} />
            </div>
          </div>
        </div>
      </div>

      {/* mobile bottom bar */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border/40 bg-background/75 p-4 backdrop-blur-2xl lg:hidden">
        <div className="mx-auto flex max-w-lg items-center gap-4">
          <div className="min-w-0 flex-1">
            <LiveSummary locale={locale} copy={copy} isRTL={isRTL} compact />
          </div>
          <Button
            size="lg"
            className="h-11 shrink-0 rounded-full px-6 text-sm font-medium"
          >
            {copy.deploy}
          </Button>
        </div>
      </div>
    </section>
  )
}
