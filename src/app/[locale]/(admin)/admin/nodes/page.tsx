import { notFound } from "next/navigation"
import { Pulse } from "@phosphor-icons/react/dist/ssr"

import { get_admin_nodes, get_admin_page_copy } from "@/actions"
import {
  PortalPageHeader,
  StatusBadge,
} from "@/components/dashboard/dashboard-ui"
import { isValidLocale, type Locale } from "@/i18n/config"
import { format_number } from "@/lib/format"
import { cn } from "@/lib/utils"
import type { NodeStatus } from "@/types/admin"

const NODE_TONE: Record<NodeStatus, "success" | "warning" | "danger"> = {
  online: "success",
  degraded: "warning",
  offline: "danger",
}

function LoadBar({
  label,
  value,
  isRTL,
}: {
  label: string
  value: number
  isRTL: boolean
}) {
  const tone =
    value >= 85 ? "bg-destructive" : value >= 70 ? "bg-amber-400" : "bg-acid"

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-xs">
        <span
          className={cn(
            "text-muted-foreground",
            isRTL && "font-[family-name:var(--font-vazirmatn)]",
          )}
        >
          {label}
        </span>
        <span className="font-mono text-foreground tabular-nums">{value}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/8">
        <div
          className={cn("h-full rounded-full transition-all", tone)}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}

interface AdminNodesPageProps {
  params: Promise<{ locale: string }>
}

export default async function AdminNodesPage({ params }: AdminNodesPageProps) {
  const { locale: localeParam } = await params

  if (!isValidLocale(localeParam)) {
    notFound()
  }

  const locale: Locale = localeParam
  const isRTL = locale === "fa"
  const [nodes, copy] = await Promise.all([
    get_admin_nodes(),
    get_admin_page_copy(locale),
  ])
  const c = copy.nodes

  return (
    <div>
      <PortalPageHeader title={c.title} subtitle={c.subtitle} isRTL={isRTL} />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {nodes.map((node) => {
          const is_offline = node.status === "offline"
          return (
            <div
              key={node.node_id}
              className={cn(
                "rounded-2xl border border-border bg-card p-6",
                is_offline && "opacity-70",
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="truncate font-mono text-sm text-foreground">
                    {node.name}
                  </p>
                  <p
                    className={cn(
                      "mt-1 text-xs text-muted-foreground",
                      isRTL && "font-[family-name:var(--font-vazirmatn)]",
                    )}
                  >
                    {node.region_label}
                  </p>
                </div>
                <StatusBadge
                  label={c.status_labels[node.status]}
                  tone={NODE_TONE[node.status]}
                />
              </div>

              <div className="mt-6 space-y-4">
                <LoadBar label={c.cpu_load} value={node.cpu_load} isRTL={isRTL} />
                <LoadBar label={c.ram_load} value={node.ram_load} isRTL={isRTL} />
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-xs">
                <span
                  className={cn(
                    "text-muted-foreground",
                    isRTL && "font-[family-name:var(--font-vazirmatn)]",
                  )}
                >
                  {format_number(node.instance_count, locale)} /{" "}
                  {format_number(node.capacity, locale)} {c.instances}
                </span>
                <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                  <Pulse
                    className={cn(
                      "size-3.5",
                      is_offline ? "text-destructive" : "text-acid",
                    )}
                  />
                  {format_number(node.uptime_days, locale)} {c.days}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
