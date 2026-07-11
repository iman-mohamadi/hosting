"use client"

import { useRouter } from "next/navigation"
import { useTransition } from "react"

import {
  add_payment_method,
  delete_payment_method,
  set_default_payment_method,
} from "@/actions"
import { EmptyState, Panel } from "@/components/dashboard/dashboard-ui"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/providers/toast-provider"
import type { Locale } from "@/i18n/config"
import { cn } from "@/lib/utils"
import type { DashboardPageCopy, PaymentMethod } from "@/types/dashboard"

interface PaymentMethodsPanelProps {
  methods: PaymentMethod[]
  copy: DashboardPageCopy["billing"]
  locale: Locale
}

export function PaymentMethodsPanel({
  methods,
  copy,
  locale,
}: PaymentMethodsPanelProps) {
  const isRTL = locale === "fa"
  const router = useRouter()
  const { show_toast } = useToast()
  const [is_pending, start_transition] = useTransition()

  function add_card() {
    start_transition(async () => {
      const result = await add_payment_method()
      if (result.success) {
        show_toast({ variant: "success", title: copy.method_added })
        router.refresh()
      }
    })
  }

  function set_default(method_id: string) {
    start_transition(async () => {
      const result = await set_default_payment_method(method_id)
      if (result.success) {
        show_toast({ variant: "success", title: copy.method_default_set })
        router.refresh()
      }
    })
  }

  function remove(method_id: string) {
    start_transition(async () => {
      const result = await delete_payment_method(method_id)
      if (result.success) {
        show_toast({ variant: "success", title: copy.method_deleted })
        router.refresh()
      }
    })
  }

  return (
    <Panel
      title={copy.payment_methods_title}
      action={
        <Button
          type="button"
          variant="outline"
          size="pill"
          disabled={is_pending}
          onClick={add_card}
        >
          {is_pending ? copy.adding_card : copy.add_card}
        </Button>
      }
    >
      <p className="mb-4 text-xs text-muted-foreground">
        {copy.payment_methods_subtitle}
      </p>
      {methods.length === 0 ? (
        <EmptyState label={copy.no_methods} isRTL={isRTL} />
      ) : (
        <ul className="space-y-3">
          {methods.map((method) => (
            <li
              key={method.method_id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 px-4 py-4"
            >
              <div>
                <p className="font-mono text-sm text-foreground">
                  {method.brand} ···· {method.last_four}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {copy.expires} {String(method.exp_month).padStart(2, "0")}/
                  {method.exp_year}
                  {method.is_default && (
                    <span className="ms-2 text-acid">{copy.default_badge}</span>
                  )}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {!method.is_default && (
                  <button
                    type="button"
                    disabled={is_pending}
                    onClick={() => set_default(method.method_id)}
                    className={cn(
                      "rounded-full border border-white/10 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground",
                      isRTL && "font-[family-name:var(--font-vazirmatn)]",
                    )}
                  >
                    {copy.set_default}
                  </button>
                )}
                <button
                  type="button"
                  disabled={is_pending}
                  onClick={() => remove(method.method_id)}
                  className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-destructive hover:bg-destructive/10"
                >
                  {copy.delete_method}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Panel>
  )
}
