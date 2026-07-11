"use client"

import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"

import { update_instance_backup_policy } from "@/actions"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/providers/toast-provider"
import type { Locale } from "@/i18n/config"
import { format_date } from "@/lib/format"
import { cn } from "@/lib/utils"
import type {
  BackupFrequency,
  BackupPolicy,
  DashboardPageCopy,
} from "@/types/dashboard"

interface BackupsTabProps {
  instance_id: string
  policy: BackupPolicy | null
  copy: DashboardPageCopy["backups"]
  locale: Locale
}

export function BackupsTab({
  instance_id,
  policy,
  copy,
  locale,
}: BackupsTabProps) {
  const isRTL = locale === "fa"
  const router = useRouter()
  const { show_toast } = useToast()
  const [enabled, set_enabled] = useState(policy?.enabled ?? false)
  const [frequency, set_frequency] = useState<BackupFrequency>(
    policy?.frequency ?? "daily",
  )
  const [retention_days, set_retention_days] = useState(
    policy?.retention_days ?? 7,
  )
  const [is_pending, start_transition] = useTransition()

  function save() {
    start_transition(async () => {
      const result = await update_instance_backup_policy(instance_id, {
        enabled,
        frequency,
        retention_days,
      })
      if (result.success) {
        show_toast({ variant: "success", title: copy.success })
        router.refresh()
      }
    })
  }

  return (
    <div className="rounded-2xl border border-white/10 p-6">
      <h3
        className={cn(
          "text-sm font-medium text-foreground",
          isRTL && "font-[family-name:var(--font-vazirmatn)]",
        )}
      >
        {copy.title}
      </h3>
      <p className="mt-1 text-xs text-muted-foreground">{copy.subtitle}</p>

      <div className="mt-8 grid max-w-xl gap-6">
        <label className="flex items-center justify-between gap-4 text-sm">
          <span className={cn(isRTL && "font-[family-name:var(--font-vazirmatn)]")}>
            {copy.enabled_label}
          </span>
          <input
            type="checkbox"
            checked={enabled}
            onChange={(event) => set_enabled(event.target.checked)}
            disabled={is_pending}
            className="size-4 accent-[oklch(0.88_0.21_128)]"
          />
        </label>

        <label className="block text-sm">
          <span className="text-muted-foreground">{copy.frequency_label}</span>
          <select
            value={frequency}
            onChange={(event) =>
              set_frequency(event.target.value as BackupFrequency)
            }
            disabled={is_pending}
            className="mt-2 w-full rounded-xl border border-white/10 bg-transparent px-4 py-3 text-foreground"
          >
            <option value="daily">{copy.frequency_daily}</option>
            <option value="weekly">{copy.frequency_weekly}</option>
          </select>
        </label>

        <label className="block text-sm">
          <span className="text-muted-foreground">{copy.retention_label}</span>
          <input
            type="number"
            min={1}
            max={90}
            value={retention_days}
            onChange={(event) =>
              set_retention_days(Number(event.target.value) || 7)
            }
            disabled={is_pending}
            className="mt-2 w-full rounded-xl border border-white/10 bg-transparent px-4 py-3 text-foreground"
          />
        </label>

        <dl className="grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-xs text-muted-foreground">{copy.last_backup}</dt>
            <dd className="mt-1 font-mono text-foreground">
              {policy?.last_backup_at
                ? format_date(policy.last_backup_at, locale)
                : copy.never}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">{copy.next_backup}</dt>
            <dd className="mt-1 font-mono text-foreground">
              {policy?.next_backup_at
                ? format_date(policy.next_backup_at, locale)
                : copy.never}
            </dd>
          </div>
        </dl>

        <Button
          type="button"
          variant="acid"
          size="pill"
          disabled={is_pending}
          onClick={save}
          className="w-fit"
        >
          {is_pending ? copy.saving : copy.save}
        </Button>
      </div>
    </div>
  )
}
