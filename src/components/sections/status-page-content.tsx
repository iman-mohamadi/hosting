"use client"

import type { StatusPageContent } from "@/actions"
import { PageHeader } from "@/components/sections/page-header"
import { Reveal } from "@/components/fx/reveal"
import { StatusBadge } from "@/components/dashboard/dashboard-ui"
import type { Locale } from "@/i18n/config"
import { format_datetime } from "@/lib/format"
import { cn } from "@/lib/utils"

interface StatusPageContentProps {
  content: StatusPageContent
  locale: Locale
}

const STATUS_TONE = {
  operational: "success",
  degraded: "warning",
  outage: "danger",
} as const

export function StatusPageContent({ content, locale }: StatusPageContentProps) {
  const isRTL = locale === "fa"
  const has_degraded = content.components.some(
    (item) => item.status !== "operational",
  )

  return (
    <div className="relative">
      <PageHeader
        eyebrow={locale === "fa" ? "پلتفرم" : "Platform"}
        title={content.page_title}
        subtitle={content.page_subtitle}
        locale={locale}
      />

      <section className="border-t border-white/10 px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/[0.015] p-8 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <span className="relative flex size-3">
                  <span
                    className={cn(
                      "absolute inline-flex size-full animate-ping rounded-full opacity-60",
                      has_degraded ? "bg-amber-400/60" : "bg-acid/60",
                    )}
                  />
                  <span
                    className={cn(
                      "relative inline-flex size-3 rounded-full",
                      has_degraded ? "bg-amber-400" : "bg-acid",
                    )}
                  />
                </span>
                <p className="text-lg font-medium text-foreground">
                  {has_degraded
                    ? locale === "fa"
                      ? "برخی سرویس‌ها تحت تأثیر هستند"
                      : "Some services are affected"
                    : content.overall_status}
                </p>
              </div>
              <div className="flex flex-wrap gap-8 text-sm">
                <div>
                  <p className="text-muted-foreground">{content.uptime_label}</p>
                  <p className="mt-1 font-mono text-foreground">{content.uptime_value}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">{content.last_updated_label}</p>
                  <p className="mt-1 font-mono text-foreground">
                    {format_datetime(new Date().toISOString(), locale)}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-16 lg:grid-cols-2">
            <Reveal delay={0.05}>
              <div>
                <h2 className="font-mono text-xs tracking-[0.3em] text-acid uppercase">
                  {content.components_title}
                </h2>
                <ul className="mt-8 space-y-3">
                  {content.components.map((component) => (
                    <li
                      key={component.component_id}
                      className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.01] px-5 py-4"
                    >
                      <div>
                        <p className="font-medium text-foreground">
                          {component.component_name}
                        </p>
                        <p className="mt-1 font-mono text-xs text-muted-foreground">
                          {component.uptime_pct}% uptime
                        </p>
                      </div>
                      <StatusBadge
                        label={content.status_labels[component.status]}
                        tone={STATUS_TONE[component.status]}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div>
                <h2 className="font-mono text-xs tracking-[0.3em] text-acid uppercase">
                  {content.incidents_title}
                </h2>
                {content.incidents.length === 0 ? (
                  <p className="mt-8 text-muted-foreground">{content.no_incidents}</p>
                ) : (
                  <ul className="mt-8 space-y-4">
                    {content.incidents.map((incident) => (
                      <li
                        key={incident.incident_id}
                        className="rounded-2xl border border-white/10 bg-white/[0.01] p-6"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <p
                            className={cn(
                              "font-medium text-foreground",
                              isRTL && "font-[family-name:var(--font-vazirmatn)]",
                            )}
                          >
                            {incident.title}
                          </p>
                          <StatusBadge
                            label={incident.status}
                            tone={incident.status === "resolved" ? "success" : "warning"}
                          />
                        </div>
                        <p className="mt-2 font-mono text-xs text-muted-foreground">
                          {incident.region_label} ·{" "}
                          {format_datetime(incident.started_at, locale)}
                        </p>
                        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                          {incident.summary}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  )
}
