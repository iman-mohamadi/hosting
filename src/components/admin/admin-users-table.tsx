"use client"

import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"

import { update_user_status } from "@/actions"
import { StatusBadge } from "@/components/dashboard/dashboard-ui"
import { useToast } from "@/components/providers/toast-provider"
import type { Locale } from "@/i18n/config"
import { format_date, format_money, format_number } from "@/lib/format"
import { cn } from "@/lib/utils"
import type {
  AdminAccountStatus,
  AdminPageCopy,
  AdminUser,
} from "@/types/admin"

interface AdminUsersTableProps {
  users: AdminUser[]
  copy: AdminPageCopy["users"]
  locale: Locale
}

const STATUS_TONE: Record<AdminAccountStatus, "success" | "warning" | "danger"> =
  {
    active: "success",
    suspended: "warning",
    terminated: "danger",
  }

export function AdminUsersTable({ users, copy, locale }: AdminUsersTableProps) {
  const isRTL = locale === "fa"
  const router = useRouter()
  const { show_toast } = useToast()
  const [busy_id, set_busy_id] = useState<string | null>(null)
  const [, start_transition] = useTransition()

  function change_status(user: AdminUser, status: AdminAccountStatus) {
    set_busy_id(user.user_id)
    start_transition(async () => {
      const result = await update_user_status(user.user_id, status)
      if (result.success) {
        show_toast({
          variant: "success",
          title: `${copy.status_labels[status]} · ${user.full_name}`,
        })
        router.refresh()
      } else {
        show_toast({ variant: "error", title: copy.actions })
      }
      set_busy_id(null)
    })
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div
        className={cn(
          "hidden grid-cols-[1.6fr_0.7fr_0.8fr_0.6fr_0.8fr_auto] gap-4 border-b border-border px-6 py-4 text-xs tracking-wide text-muted-foreground uppercase lg:grid",
          isRTL && "font-[family-name:var(--font-vazirmatn)]",
        )}
      >
        <span>{copy.user}</span>
        <span>{copy.role}</span>
        <span>{copy.status}</span>
        <span>{copy.instances}</span>
        <span>{copy.spend}</span>
        <span className="text-end">{copy.actions}</span>
      </div>

      <ul>
        {users.map((user) => {
          const is_admin = user.role === "admin"
          const is_busy = busy_id === user.user_id
          return (
            <li
              key={user.user_id}
              className="grid grid-cols-1 gap-3 border-b border-border px-6 py-5 last:border-b-0 lg:grid-cols-[1.6fr_0.7fr_0.8fr_0.6fr_0.8fr_auto] lg:items-center lg:gap-4"
            >
              <div className="min-w-0">
                <p
                  className={cn(
                    "truncate text-sm font-medium text-foreground",
                    isRTL && "font-[family-name:var(--font-vazirmatn)]",
                  )}
                >
                  {user.full_name}
                </p>
                <p className="truncate font-mono text-xs text-muted-foreground">
                  {user.email_address}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground lg:hidden">
                  {copy.joined}: {format_date(user.created_at, locale)}
                </p>
              </div>

              <span className="text-sm text-muted-foreground">
                {copy.role_labels[user.role]}
              </span>
              <span>
                <StatusBadge
                  label={copy.status_labels[user.account_status]}
                  tone={STATUS_TONE[user.account_status]}
                />
              </span>
              <span className="text-sm text-foreground tabular-nums">
                {format_number(user.instance_count, locale)}
              </span>
              <span className="text-sm text-foreground tabular-nums">
                {format_money(user.monthly_spend, locale)}
              </span>

              <div className="flex flex-wrap items-center gap-2 lg:justify-end">
                {is_admin ? (
                  <span className="text-xs text-muted-foreground">—</span>
                ) : (
                  <>
                    {user.account_status === "active" ? (
                      <button
                        type="button"
                        onClick={() => change_status(user, "suspended")}
                        disabled={is_busy}
                        className="rounded-full border border-amber-400/30 px-3 py-1.5 text-xs font-medium text-amber-300 transition-colors hover:bg-amber-400/10 disabled:opacity-50"
                      >
                        {copy.suspend}
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => change_status(user, "active")}
                        disabled={is_busy}
                        className="rounded-full border border-acid/30 px-3 py-1.5 text-xs font-medium text-acid transition-colors hover:bg-acid/10 disabled:opacity-50"
                      >
                        {copy.activate}
                      </button>
                    )}
                    {user.account_status !== "terminated" && (
                      <TerminateButton
                        label={copy.terminate}
                        confirm_label={copy.confirm}
                        disabled={is_busy}
                        on_confirm={() => change_status(user, "terminated")}
                      />
                    )}
                  </>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function TerminateButton({
  label,
  confirm_label,
  disabled,
  on_confirm,
}: {
  label: string
  confirm_label: string
  disabled: boolean
  on_confirm: () => void
}) {
  const [confirming, set_confirming] = useState(false)

  if (confirming) {
    return (
      <span className="inline-flex items-center gap-1">
        <button
          type="button"
          onClick={() => {
            on_confirm()
            set_confirming(false)
          }}
          disabled={disabled}
          className="rounded-full border border-destructive/40 bg-destructive/10 px-3 py-1.5 text-xs font-medium text-destructive transition-colors hover:bg-destructive/20 disabled:opacity-50"
        >
          {confirm_label}
        </button>
        <button
          type="button"
          onClick={() => set_confirming(false)}
          className="rounded-full border border-border px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground"
        >
          ✕
        </button>
      </span>
    )
  }

  return (
    <button
      type="button"
      onClick={() => set_confirming(true)}
      disabled={disabled}
      className="rounded-full border border-destructive/30 px-3 py-1.5 text-xs font-medium text-destructive transition-colors hover:bg-destructive/10 disabled:opacity-50"
    >
      {label}
    </button>
  )
}
