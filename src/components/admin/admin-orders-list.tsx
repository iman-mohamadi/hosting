"use client"

import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { Check, X } from "@phosphor-icons/react"

import { update_order_status } from "@/actions"
import {
  EmptyState,
  StatusBadge,
} from "@/components/dashboard/dashboard-ui"
import { useToast } from "@/components/providers/toast-provider"
import type { Locale } from "@/i18n/config"
import { format_datetime, format_money } from "@/lib/format"
import { cn } from "@/lib/utils"
import type { AdminOrder, AdminPageCopy, OrderStatus } from "@/types/admin"

interface AdminOrdersListProps {
  orders: AdminOrder[]
  copy: AdminPageCopy["orders"]
  locale: Locale
}

const ORDER_TONE: Record<OrderStatus, "warning" | "success" | "danger"> = {
  pending: "warning",
  approved: "success",
  rejected: "danger",
}

export function AdminOrdersList({ orders, copy, locale }: AdminOrdersListProps) {
  const isRTL = locale === "fa"
  const router = useRouter()
  const { show_toast } = useToast()
  const [busy_id, set_busy_id] = useState<string | null>(null)
  const [, start_transition] = useTransition()

  function decide(order: AdminOrder, status: "approved" | "rejected") {
    set_busy_id(order.order_id)
    start_transition(async () => {
      const result = await update_order_status(order.order_id, status)
      if (result.success) {
        show_toast({
          variant: "success",
          title: `${copy.status_labels[status]} · ${order.order_id}`,
        })
        router.refresh()
      } else {
        show_toast({ variant: "error", title: copy.title })
      }
      set_busy_id(null)
    })
  }

  if (orders.length === 0) {
    return <EmptyState label={copy.empty} isRTL={isRTL} />
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {orders.map((order) => {
        const is_busy = busy_id === order.order_id
        const is_pending = order.status === "pending"
        return (
          <div
            key={order.order_id}
            className="rounded-2xl border border-border bg-card p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="font-mono text-sm text-muted-foreground">
                  {order.order_id}
                </p>
                <p
                  className={cn(
                    "mt-1 truncate text-base font-medium text-foreground",
                    isRTL && "font-[family-name:var(--font-vazirmatn)]",
                  )}
                >
                  {order.user_name}
                </p>
                <p className="truncate font-mono text-xs text-muted-foreground">
                  {order.user_email}
                </p>
              </div>
              <StatusBadge
                label={copy.status_labels[order.status]}
                tone={ORDER_TONE[order.status]}
              />
            </div>

            <div className="mt-5 rounded-xl border border-border bg-card p-4">
              <p
                className={cn(
                  "text-xs text-muted-foreground",
                  isRTL && "font-[family-name:var(--font-vazirmatn)]",
                )}
              >
                {copy.config}
              </p>
              <p className="mt-1.5 text-sm text-foreground">
                {order.cpu_cores} vCPU · {order.ram_gb}GB RAM · {order.storage_gb}
                GB · {order.region_label}
              </p>
              <p className="mt-2 text-lg font-semibold text-foreground tabular-nums">
                {format_money(order.monthly_price, locale)}
                <span className="text-xs font-normal text-muted-foreground">
                  {" "}
                  / {copy.monthly}
                </span>
              </p>
            </div>

            <div className="mt-5 flex items-center justify-between gap-3">
              <span className="text-xs text-muted-foreground">
                {format_datetime(order.created_at, locale)}
              </span>
              {is_pending && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => decide(order, "rejected")}
                    disabled={is_busy}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full border border-destructive/30 px-4 py-1.5 text-xs font-medium text-destructive transition-colors hover:bg-destructive/10 disabled:opacity-50",
                      isRTL && "font-[family-name:var(--font-vazirmatn)]",
                    )}
                  >
                    <X weight="bold" className="size-3.5" />
                    {copy.reject}
                  </button>
                  <button
                    type="button"
                    onClick={() => decide(order, "approved")}
                    disabled={is_busy}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full border border-acid/40 bg-acid/10 px-4 py-1.5 text-xs font-medium text-acid transition-colors hover:bg-acid/20 disabled:opacity-50",
                      isRTL && "font-[family-name:var(--font-vazirmatn)]",
                    )}
                  >
                    <Check weight="bold" className="size-3.5" />
                    {copy.approve}
                  </button>
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
