"use client"

import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"

import { pay_invoice } from "@/actions"
import {
  StatusBadge,
  invoice_status_tone,
} from "@/components/dashboard/dashboard-ui"
import { useToast } from "@/components/providers/toast-provider"
import type { Locale } from "@/i18n/config"
import { format_date, format_money } from "@/lib/format"
import { cn } from "@/lib/utils"
import type { DashboardPageCopy, Invoice } from "@/types/dashboard"

interface BillingTableProps {
  invoices: Invoice[]
  copy: DashboardPageCopy["billing"]
  locale: Locale
}

export function BillingTable({ invoices, copy, locale }: BillingTableProps) {
  const isRTL = locale === "fa"
  const router = useRouter()
  const { show_toast } = useToast()
  const [paying_id, set_paying_id] = useState<string | null>(null)
  const [, start_transition] = useTransition()

  function pay(invoice: Invoice) {
    set_paying_id(invoice.invoice_id)
    start_transition(async () => {
      const result = await pay_invoice(invoice.invoice_id)
      if (result.success) {
        show_toast({
          variant: "success",
          title: `${copy.paid_note} · ${invoice.invoice_number}`,
        })
        router.refresh()
      } else {
        show_toast({ variant: "error", title: copy.pay_now })
      }
      set_paying_id(null)
    })
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div
        className={cn(
          "hidden grid-cols-[1.4fr_1fr_0.8fr_0.9fr_auto] gap-4 border-b border-border px-6 py-4 text-xs tracking-wide text-muted-foreground uppercase lg:grid",
          isRTL && "font-[family-name:var(--font-vazirmatn)]",
        )}
      >
        <span>{copy.invoice}</span>
        <span>{copy.issued}</span>
        <span>{copy.amount}</span>
        <span>{copy.status}</span>
        <span className="text-end">{copy.due}</span>
      </div>

      <ul>
        {invoices.map((invoice) => {
          const is_payable = invoice.status !== "paid"
          const is_paying = paying_id === invoice.invoice_id
          return (
            <li
              key={invoice.invoice_id}
              className="grid grid-cols-1 gap-3 border-b border-border px-6 py-5 last:border-b-0 lg:grid-cols-[1.4fr_1fr_0.8fr_0.9fr_auto] lg:items-center lg:gap-4"
            >
              <div className="min-w-0">
                <p className="truncate font-mono text-sm text-foreground">
                  {invoice.invoice_number}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {invoice.description}
                </p>
              </div>
              <span className="text-sm text-muted-foreground">
                {format_date(invoice.issued_at, locale)}
              </span>
              <span className="text-sm font-medium text-foreground tabular-nums">
                {format_money(invoice.amount, locale)}
              </span>
              <span>
                <StatusBadge
                  label={copy.status_labels[invoice.status]}
                  tone={invoice_status_tone(invoice.status)}
                />
              </span>
              <div className="flex items-center justify-between gap-3 lg:justify-end">
                <span className="text-xs text-muted-foreground lg:hidden">
                  {copy.due}: {format_date(invoice.due_at, locale)}
                </span>
                {is_payable ? (
                  <button
                    type="button"
                    onClick={() => pay(invoice)}
                    disabled={is_paying}
                    className={cn(
                      "shrink-0 rounded-full border border-acid/40 bg-acid/10 px-4 py-1.5 text-xs font-medium text-acid transition-colors hover:bg-acid/20 disabled:opacity-50",
                      isRTL && "font-[family-name:var(--font-vazirmatn)]",
                    )}
                  >
                    {is_paying ? copy.paying : copy.pay_now}
                  </button>
                ) : (
                  <span className="hidden text-xs text-muted-foreground lg:block">
                    {format_date(invoice.due_at, locale)}
                  </span>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
