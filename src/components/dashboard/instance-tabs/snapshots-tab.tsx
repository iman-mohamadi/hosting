"use client"

import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { Trash } from "@phosphor-icons/react"

import {
  create_snapshot,
  delete_snapshot,
  restore_snapshot,
} from "@/actions"
import {
  EmptyState,
  Panel,
  StatusBadge,
} from "@/components/dashboard/dashboard-ui"
import { Button } from "@/components/ui/button"
import { FloatingInput } from "@/components/ui/floating-input"
import { useToast } from "@/components/providers/toast-provider"
import type { Locale } from "@/i18n/config"
import { format_date } from "@/lib/format"
import { cn } from "@/lib/utils"
import type { DashboardPageCopy, Snapshot } from "@/types/dashboard"

interface SnapshotsTabProps {
  instance_id: string
  snapshots: Snapshot[]
  copy: DashboardPageCopy["snapshots"]
  locale: Locale
}

export function SnapshotsTab({
  instance_id,
  snapshots,
  copy,
  locale,
}: SnapshotsTabProps) {
  const isRTL = locale === "fa"
  const router = useRouter()
  const { show_toast } = useToast()
  const [label, set_label] = useState("")
  const [pending_id, set_pending_id] = useState<string | null>(null)
  const [is_creating, start_create] = useTransition()
  const [is_restoring, start_restore] = useTransition()
  const [is_deleting, start_delete] = useTransition()

  function handle_create(event: React.FormEvent) {
    event.preventDefault()
    start_create(async () => {
      const result = await create_snapshot(instance_id, label)
      if (result.success) {
        show_toast({ variant: "success", title: copy.created_success })
        set_label("")
        router.refresh()
      }
    })
  }

  function handle_restore(snapshot_id: string) {
    if (!window.confirm(copy.confirm_restore)) return

    set_pending_id(snapshot_id)
    start_restore(async () => {
      const result = await restore_snapshot(snapshot_id)
      if (result.success) {
        show_toast({ variant: "success", title: copy.restored_success })
        router.refresh()
      }
      set_pending_id(null)
    })
  }

  function handle_delete(snapshot_id: string) {
    set_pending_id(snapshot_id)
    start_delete(async () => {
      const result = await delete_snapshot(snapshot_id)
      if (result.success) {
        show_toast({ variant: "success", title: copy.deleted_success })
        router.refresh()
      }
      set_pending_id(null)
    })
  }

  const busy = is_creating || is_restoring || is_deleting

  return (
    <div className="space-y-6">
      <Panel title={copy.title} isRTL={isRTL}>
        <p
          className={cn(
            "mb-6 max-w-2xl text-sm text-muted-foreground",
            isRTL && "font-[family-name:var(--font-vazirmatn)]",
          )}
        >
          {copy.subtitle}
        </p>

        <form onSubmit={handle_create} className="flex flex-wrap items-end gap-4">
          <div className="min-w-[220px] flex-1">
            <FloatingInput
              id="snapshot-label"
              label={copy.label_placeholder}
              value={label}
              onChange={set_label}
              disabled={busy}
            />
          </div>
          <Button
            type="submit"
            variant="acid"
            size="pill"
            disabled={!label.trim() || busy}
            className={cn(isRTL && "font-[family-name:var(--font-vazirmatn)]")}
          >
            {is_creating ? copy.creating : copy.create}
          </Button>
        </form>
      </Panel>

      {snapshots.length === 0 ? (
        <EmptyState label={copy.empty} isRTL={isRTL} />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted text-start text-xs text-muted-foreground">
                <th className="px-5 py-3 font-medium">{copy.label_placeholder}</th>
                <th className="px-5 py-3 font-medium">{copy.size}</th>
                <th className="px-5 py-3 font-medium">{copy.taken}</th>
                <th className="px-5 py-3 font-medium" />
              </tr>
            </thead>
            <tbody>
              {snapshots.map((snapshot) => {
                const row_busy = pending_id === snapshot.snapshot_id && busy
                return (
                  <tr
                    key={snapshot.snapshot_id}
                    className="border-b border-border last:border-0"
                  >
                    <td className="px-5 py-4 font-mono text-foreground">
                      {snapshot.label}
                    </td>
                    <td className="px-5 py-4 tabular-nums text-muted-foreground">
                      {snapshot.size_gb} GB
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">
                      <div className="flex flex-wrap items-center gap-2">
                        <StatusBadge
                          label={copy.status_labels[snapshot.status]}
                          tone={snapshot.status === "ready" ? "success" : "info"}
                          withDot={false}
                        />
                        {format_date(snapshot.created_at, locale)}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <Button
                          type="button"
                          variant="glass"
                          size="sm"
                          disabled={busy}
                          onClick={() => handle_restore(snapshot.snapshot_id)}
                          className={cn(
                            isRTL && "font-[family-name:var(--font-vazirmatn)]",
                          )}
                        >
                          {row_busy ? copy.restoring : copy.restore}
                        </Button>
                        <button
                          type="button"
                          disabled={busy}
                          onClick={() => handle_delete(snapshot.snapshot_id)}
                          aria-label={copy.delete}
                          className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-destructive/30 hover:text-destructive disabled:opacity-50"
                        >
                          <Trash className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
