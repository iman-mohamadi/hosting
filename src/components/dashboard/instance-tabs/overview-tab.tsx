"use client"

import { UsageChart } from "@/components/dashboard/usage-chart"
import type { Locale } from "@/i18n/config"
import { format_date, format_money } from "@/lib/format"
import { cn } from "@/lib/utils"
import type {
  DashboardPageCopy,
  ServerInstance,
  UsageSeries,
} from "@/types/dashboard"

interface OverviewTabProps {
  instance: ServerInstance
  usage: UsageSeries
  copy: DashboardPageCopy["instances"]
  settings_label: string
  locale: Locale
  on_open_settings: () => void
}

export function OverviewTab({
  instance,
  usage,
  copy,
  settings_label,
  locale,
  on_open_settings,
}: OverviewTabProps) {
  const isRTL = locale === "fa"

  const specs = [
    {
      label: copy.specs,
      value: `${instance.cpu_cores} vCPU · ${instance.ram_gb}GB RAM`,
    },
    {
      label: copy.ip_address,
      value: instance.ip_address,
      mono: true,
    },
    {
      label: copy.reverse_dns,
      value: instance.reverse_dns || "—",
      mono: true,
    },
    { label: copy.region, value: instance.region_label },
    {
      label: instance.os_label,
      value: `${instance.storage_gb}GB ${instance.storage_type.toUpperCase()}`,
    },
    {
      label: copy.monthly,
      value: format_money(instance.monthly_price, locale),
    },
    { label: copy.created, value: format_date(instance.created_at, locale) },
  ]

  return (
    <div>
      <dl className="mb-10 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:grid-cols-2 lg:grid-cols-3">
        {specs.map((spec) => (
          <div key={spec.label} className="bg-[#050706] p-5">
            <dt
              className={cn(
                "text-xs text-muted-foreground",
                isRTL && "font-[family-name:var(--font-vazirmatn)]",
              )}
            >
              {spec.label}
            </dt>
            <dd
              className={cn(
                "mt-1.5 text-sm font-medium text-foreground",
                spec.mono && "font-mono",
              )}
            >
              {spec.value}
            </dd>
          </div>
        ))}
      </dl>

      <h2
        className={cn(
          "mb-5 text-sm font-medium tracking-wide text-foreground",
          isRTL && "font-[family-name:var(--font-vazirmatn)]",
        )}
      >
        {copy.usage_title}
      </h2>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="lg:col-span-2">
          <UsageChart
            data={usage.cpu_percent}
            label={copy.cpu_usage}
            unit="%"
            average={usage.cpu_avg}
            average_label={copy.average}
            tone="acid"
            isRTL={isRTL}
          />
        </div>
        <UsageChart
          data={usage.bandwidth_mbps}
          label={copy.bandwidth_usage}
          unit=" Mbps"
          average={usage.bandwidth_avg}
          average_label={copy.average}
          tone="cyan"
          isRTL={isRTL}
        />
        <UsageChart
          data={usage.memory_percent}
          label={copy.memory_usage}
          unit="%"
          average={usage.memory_avg}
          average_label={copy.average}
          tone="violet"
          isRTL={isRTL}
        />
      </div>

      <div className="mt-10 rounded-2xl border border-destructive/20 bg-destructive/[0.03] p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3
              className={cn(
                "text-sm font-medium text-destructive",
                isRTL && "font-[family-name:var(--font-vazirmatn)]",
              )}
            >
              {copy.danger_zone}
            </h3>
            <p
              className={cn(
                "mt-1 text-xs text-muted-foreground",
                isRTL && "font-[family-name:var(--font-vazirmatn)]",
              )}
            >
              {copy.action_labels.rebuild} · {copy.action_labels.destroy}
            </p>
          </div>
          <button
            type="button"
            onClick={on_open_settings}
            className={cn(
              "rounded-full border border-destructive/30 px-4 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10",
              isRTL && "font-[family-name:var(--font-vazirmatn)]",
            )}
          >
            {settings_label}
          </button>
        </div>
      </div>
    </div>
  )
}
