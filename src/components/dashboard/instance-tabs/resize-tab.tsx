"use client"

import { useRouter } from "next/navigation"
import { useMemo, useState, useTransition } from "react"

import { resize_instance } from "@/actions"
import { Panel } from "@/components/dashboard/dashboard-ui"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/components/providers/toast-provider"
import type { Locale } from "@/i18n/config"
import { format_money } from "@/lib/format"
import { cn } from "@/lib/utils"
import { compute_vps_price } from "@/lib/vps-pricing"
import type {
  DashboardPageCopy,
  ResizeConstraints,
  ResizeMode,
  ServerInstance,
} from "@/types/dashboard"

interface ResizeTabProps {
  instance: ServerInstance
  constraints: ResizeConstraints
  copy: DashboardPageCopy["resize"]
  locale: Locale
}

export function ResizeTab({
  instance,
  constraints,
  copy,
  locale,
}: ResizeTabProps) {
  const isRTL = locale === "fa"
  const router = useRouter()
  const { show_toast } = useToast()
  const [cpu_cores, set_cpu_cores] = useState(instance.cpu_cores)
  const [ram_gb, set_ram_gb] = useState(instance.ram_gb)
  const [storage_gb, set_storage_gb] = useState(instance.storage_gb)
  const [mode, set_mode] = useState<ResizeMode>("warm")
  const [is_pending, start_transition] = useTransition()

  const storage_min = Math.max(constraints.storage_min, instance.storage_gb)

  const quote = useMemo(() => {
    const base_old = compute_vps_price({
      cpu_cores: instance.cpu_cores,
      ram_gb: instance.ram_gb,
      storage_type: instance.storage_type,
      storage_size_gb: instance.storage_gb,
      selected_os: instance.selected_os,
    }).monthly_price
    const base_new = compute_vps_price({
      cpu_cores,
      ram_gb,
      storage_type: instance.storage_type,
      storage_size_gb: storage_gb,
      selected_os: instance.selected_os,
    }).monthly_price
    const price_delta = Math.round((base_new - base_old) * 100) / 100
    const monthly_price =
      Math.round((instance.monthly_price + price_delta) * 100) / 100

    return { monthly_price, price_delta }
  }, [cpu_cores, ram_gb, storage_gb, instance])

  const unchanged =
    cpu_cores === instance.cpu_cores &&
    ram_gb === instance.ram_gb &&
    storage_gb === instance.storage_gb

  function handle_apply() {
    if (unchanged) return

    start_transition(async () => {
      const result = await resize_instance(
        instance.instance_id,
        { cpu_cores, ram_gb, storage_gb },
        mode,
        locale,
      )

      if (result.success) {
        show_toast({ variant: "success", title: copy.success })
        router.refresh()
      } else {
        show_toast({ variant: "error", title: copy.apply })
      }
    })
  }

  return (
    <Panel title={copy.title} isRTL={isRTL}>
      <p
        className={cn(
          "mb-8 max-w-2xl text-sm text-muted-foreground",
          isRTL && "font-[family-name:var(--font-vazirmatn)]",
        )}
      >
        {copy.subtitle}
      </p>

      <div className="space-y-10">
        <ResizeSlider
          label={copy.cpu_label}
          value={cpu_cores}
          min={constraints.cpu_min}
          max={constraints.cpu_max}
          step={1}
          on_change={set_cpu_cores}
          isRTL={isRTL}
        />
        <ResizeSlider
          label={copy.ram_label}
          value={ram_gb}
          min={constraints.ram_min}
          max={constraints.ram_max}
          step={1}
          on_change={set_ram_gb}
          isRTL={isRTL}
        />
        <ResizeSlider
          label={copy.storage_label}
          value={storage_gb}
          min={storage_min}
          max={constraints.storage_max}
          step={10}
          on_change={set_storage_gb}
          isRTL={isRTL}
        />
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-muted p-5">
          <p
            className={cn(
              "text-xs text-muted-foreground",
              isRTL && "font-[family-name:var(--font-vazirmatn)]",
            )}
          >
            {copy.new_monthly}
          </p>
          <p className="mt-2 text-2xl font-semibold tabular-nums text-foreground">
            {format_money(quote.monthly_price, locale)}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-muted p-5">
          <p
            className={cn(
              "text-xs text-muted-foreground",
              isRTL && "font-[family-name:var(--font-vazirmatn)]",
            )}
          >
            {copy.price_delta}
          </p>
          <p
            className={cn(
              "mt-2 text-2xl font-semibold tabular-nums",
              quote.price_delta >= 0 ? "text-acid" : "text-sky-300",
            )}
          >
            {quote.price_delta >= 0 ? "+" : ""}
            {format_money(quote.price_delta, locale)}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <p
          className={cn(
            "mb-3 text-xs font-medium tracking-wide text-muted-foreground",
            isRTL && "font-[family-name:var(--font-vazirmatn)]",
          )}
        >
          {copy.mode_label}
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {(
            [
              { id: "warm" as const, label: copy.warm_label, desc: copy.warm_desc },
              { id: "cold" as const, label: copy.cold_label, desc: copy.cold_desc },
            ] as const
          ).map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => set_mode(option.id)}
              className={cn(
                "rounded-xl border p-4 text-start transition-colors",
                mode === option.id
                  ? "border-acid/40 bg-acid/10"
                  : "border-border hover:border-primary/20",
                isRTL && "font-[family-name:var(--font-vazirmatn)]",
              )}
            >
              <span className="text-sm font-medium text-foreground">
                {option.label}
              </span>
              <p className="mt-1 text-xs text-muted-foreground">{option.desc}</p>
            </button>
          ))}
        </div>
      </div>

      <p
        className={cn(
          "mt-6 text-xs text-muted-foreground",
          isRTL && "font-[family-name:var(--font-vazirmatn)]",
        )}
      >
        {copy.confirm_note}
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <Button
          type="button"
          variant="acid"
          size="pill"
          disabled={unchanged || is_pending}
          onClick={handle_apply}
          className={cn(isRTL && "font-[family-name:var(--font-vazirmatn)]")}
        >
          {is_pending ? copy.applying : copy.apply}
        </Button>
        {unchanged && (
          <span
            className={cn(
              "text-sm text-muted-foreground",
              isRTL && "font-[family-name:var(--font-vazirmatn)]",
            )}
          >
            {copy.no_change}
          </span>
        )}
      </div>
    </Panel>
  )
}

function ResizeSlider({
  label,
  value,
  min,
  max,
  step,
  on_change,
  isRTL,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  on_change: (value: number) => void
  isRTL: boolean
}) {
  return (
    <div>
      <div className="mb-4 flex items-end justify-between gap-4">
        <p
          className={cn(
            "text-sm font-medium text-foreground",
            isRTL && "font-[family-name:var(--font-vazirmatn)]",
          )}
        >
          {label}
        </p>
        <span className="font-mono text-2xl font-semibold tabular-nums text-foreground">
          {value}
        </span>
      </div>
      <Slider
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={([next]) => on_change(next)}
      />
    </div>
  )
}
