"use client"

import Link from "next/link"

import {
  EmptyState,
  StatusBadge,
} from "@/components/dashboard/dashboard-ui"
import type { Locale } from "@/i18n/config"
import { localizePathname } from "@/i18n/routing"
import { format_datetime, format_money } from "@/lib/format"
import { cn } from "@/lib/utils"
import type { DashboardPageCopy } from "@/types/dashboard"
import type { UserOrder } from "@/types/dashboard"

interface OrdersListProps {
  orders: UserOrder[]
  copy: DashboardPageCopy["orders"]
  locale: Locale
}

const ORDER_TONE = {
  pending: "warning",
  approved: "success",
  rejected: "danger",
} as const

export function OrdersList({ orders, copy, locale }: OrdersListProps) {
  const isRTL = locale === "fa"

  if (orders.length === 0) {
    return <EmptyState label={copy.empty} isRTL={isRTL} />
  }

  return (
    <div className="grid gap-4">
      {orders.map((order) => (
        <div
          key={order.order_id}
          className="rounded-2xl border border-border bg-card p-6"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="min-w-0">
              <p className="font-mono text-sm text-muted-foreground">
                {copy.order_id} · {order.order_id}
              </p>
              <p
                className={cn(
                  "mt-2 text-lg font-medium text-foreground",
                  isRTL && "font-[family-name:var(--font-vazirmatn)]",
                )}
              >
                {order.plan_summary}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {order.cpu_cores} vCPU · {order.ram_gb} GB RAM · {order.storage_gb}{" "}
                GB {order.storage_type.toUpperCase()}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {copy.region}: {order.region_label}
              </p>
            </div>
            <div className="flex shrink-0 flex-col items-start gap-3 md:items-end">
              <StatusBadge
                label={copy.status_labels[order.status]}
                tone={ORDER_TONE[order.status]}
              />
              <p className="font-mono text-sm text-foreground">
                {format_money(order.monthly_price, locale)} {copy.monthly}
              </p>
              <p className="font-mono text-xs text-muted-foreground">
                {format_datetime(order.created_at, locale)}
              </p>
            </div>
          </div>

          {order.status === "approved" && order.instance_id && (
            <div className="mt-4 border-t border-border pt-4">
              <p className="text-sm text-muted-foreground">{copy.provisioning_note}</p>
              <Link
                href={localizePathname(
                  `/dashboard/instances/${order.instance_id}`,
                  locale,
                )}
                className="mt-2 inline-block text-sm text-acid transition-opacity hover:opacity-80"
              >
                {copy.view_instance} →
              </Link>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
