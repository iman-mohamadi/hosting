"use client"

import { useMemo, useState } from "react"

import {
  EmptyState,
  StatusBadge,
  TabBar,
} from "@/components/dashboard/dashboard-ui"
import type { Locale } from "@/i18n/config"
import { format_datetime } from "@/lib/format"
import type {
  ActivityCategory,
  ActivityEntry,
  DashboardPageCopy,
} from "@/types/dashboard"

interface ActivityLogProps {
  entries: ActivityEntry[]
  copy: DashboardPageCopy["activity"]
  locale: Locale
}

const CATEGORIES: (ActivityCategory | "all")[] = [
  "all",
  "instance",
  "network",
  "security",
  "billing",
  "support",
]

function activity_tone(category: ActivityCategory) {
  switch (category) {
    case "instance":
      return "success" as const
    case "network":
      return "info" as const
    case "security":
      return "warning" as const
    case "billing":
      return "neutral" as const
    case "support":
      return "info" as const
  }
}

export function ActivityLog({ entries, copy, locale }: ActivityLogProps) {
  const isRTL = locale === "fa"
  const [filter, set_filter] = useState<ActivityCategory | "all">("all")

  const tabs = CATEGORIES.map((category) => ({
    id: category,
    label:
      category === "all" ? copy.all : copy.category_labels[category],
  }))

  const filtered = useMemo(() => {
    if (filter === "all") return entries
    return entries.filter((entry) => entry.category === filter)
  }, [entries, filter])

  return (
    <div>
      <TabBar
        tabs={tabs}
        active={filter}
        on_change={set_filter}
        isRTL={isRTL}
      />

      {filtered.length === 0 ? (
        <EmptyState label={copy.empty} isRTL={isRTL} />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <ul>
            {filtered.map((entry) => (
              <li
                key={entry.entry_id}
                className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 px-5 py-4 last:border-0"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusBadge
                      label={copy.category_labels[entry.category]}
                      tone={activity_tone(entry.category)}
                      withDot={false}
                    />
                    <span className="font-mono text-xs text-muted-foreground">
                      {entry.action}
                    </span>
                  </div>
                  <p className="mt-2 truncate text-sm text-foreground">
                    {entry.target}
                  </p>
                </div>
                <time
                  dateTime={entry.created_at}
                  className="shrink-0 text-xs text-muted-foreground tabular-nums"
                >
                  {format_datetime(entry.created_at, locale)}
                </time>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
