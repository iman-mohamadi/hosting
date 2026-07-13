"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useState, useTransition } from "react"
import { ShieldCheck, Trash, Minus, Plus, Lock, CreditCard, CheckCircle } from "@phosphor-icons/react"

import { Reveal } from "@/components/fx/reveal"
import { MagneticButton } from "@/components/fx/magnetic-button"
import { Button } from "@/components/ui/button"
import { Eyebrow } from "@/components/ui/eyebrow"
import type { Locale } from "@/i18n/config"
import { localizePathname } from "@/i18n/routing"
import {
  BILLING_PERIODS,
  format_toman,
  get_billing_period,
  pick,
  type BillingPeriodId,
} from "@/lib/catalog"
import { cart_item_total, use_cart_store } from "@/store/use_cart_store"
import { use_auth_store } from "@/stores/auth-store"
import { cn } from "@/lib/utils"
import { CART_COPY } from "@/app/[locale]/(marketing)/cart/copy"

type Step = "cart" | "gateway" | "done"

export function CartPageContent({ locale }: { locale: Locale }) {
  const isRTL = locale === "fa"
  const router = useRouter()
  const c = CART_COPY[locale]

  const items = use_cart_store((s) => s.items)
  const is_cart_hydrated = use_cart_store((s) => s.is_hydrated)
  const remove_item = use_cart_store((s) => s.remove_item)
  const set_quantity = use_cart_store((s) => s.set_quantity)
  const set_period = use_cart_store((s) => s.set_period)
  const clear = use_cart_store((s) => s.clear)

  const user = use_auth_store((s) => s.user)
  const is_auth_hydrated = use_auth_store((s) => s.is_hydrated)

  const [step, setStep] = useState<Step>("cart")
  const [order_id, setOrderId] = useState<string | null>(null)
  const [is_paying, start_pay] = useTransition()

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + cart_item_total(i), 0),
    [items],
  )
  const tax = Math.round(subtotal * 0.1)
  const total = subtotal + tax

  const return_url = localizePathname("/cart", locale)

  // If cart empties while on a later step, fall back to the cart view.
  useEffect(() => {
    if (items.length === 0 && step !== "done") setStep("cart")
  }, [items.length, step])

  function handle_pay() {
    start_pay(() => {
      // Simulated payment gateway round-trip.
      window.setTimeout(() => {
        const id = `ORD-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
        setOrderId(id)
        clear()
        setStep("done")
      }, 1400)
    })
  }

  if (!is_cart_hydrated) {
    return (
      <div className="px-6 py-40 text-center text-muted-foreground lg:px-8">{c.loading}</div>
    )
  }

  /* ----------------------------- Success view ---------------------------- */
  if (step === "done" && order_id) {
    return (
      <div className="relative px-6 py-32 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <Reveal>
            <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle weight="fill" className="size-9 text-primary" />
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1
              className={cn(
                "mt-8 text-4xl font-semibold tracking-tight",
                isRTL && "font-[family-name:var(--font-vazirmatn)]",
              )}
            >
              {c.successTitle}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-lg text-muted-foreground">{c.successBody}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 font-mono text-sm tracking-[0.2em] text-primary">{order_id}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <MagneticButton
                href={localizePathname("/dashboard/orders", locale)}
                variant="brand"
                size="pill"
                isRTL={isRTL}
              >
                {c.viewOrders}
              </MagneticButton>
              <Button asChild variant="outline" size="pill">
                <Link href={localizePathname("/host/cloud-host", locale)}>{c.keepShopping}</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    )
  }

  /* ------------------------------ Empty cart ----------------------------- */
  if (items.length === 0) {
    return (
      <div className="relative px-6 py-32 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <Eyebrow>{c.eyebrow}</Eyebrow>
          <h1
            className={cn(
              "mt-6 text-4xl font-semibold tracking-tight",
              isRTL && "font-[family-name:var(--font-vazirmatn)]",
            )}
          >
            {c.emptyTitle}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">{c.emptyBody}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <MagneticButton href={localizePathname("/host/cloud-host", locale)} variant="brand" size="pill" isRTL={isRTL}>
              {c.browseHosting}
            </MagneticButton>
            <Button asChild variant="outline" size="pill">
              <Link href={localizePathname("/vps", locale)}>{c.browseVps}</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const steps = [
    { id: "cart", label: c.stepCart },
    { id: "gateway", label: c.stepPay },
    { id: "done", label: c.stepDone },
  ]
  const activeStepIndex = step === "cart" ? 0 : step === "gateway" ? 1 : 2

  return (
    <div className="relative px-6 pt-28 pb-24 lg:px-8 lg:pt-32">
      <div className="mx-auto max-w-6xl">
        <Eyebrow>{c.eyebrow}</Eyebrow>
        <h1
          className={cn(
            "mt-5 text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight",
            isRTL && "font-[family-name:var(--font-vazirmatn)]",
          )}
        >
          {step === "gateway" ? c.gatewayTitle : c.title}
        </h1>

        <ol className="mt-6 flex flex-wrap gap-4 font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
          {steps.map((s, i) => (
            <li key={s.id} className={cn(i === activeStepIndex && "text-primary")}>
              {`0${i + 1}`} {s.label}
            </li>
          ))}
        </ol>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
          {/* Left column */}
          <div className="space-y-4">
            {step === "cart" &&
              items.map((item, idx) => {
                const period = get_billing_period(item.period)
                return (
                  <Reveal key={item.key} delay={idx * 0.04}>
                    <div className="card-glossy rounded-2xl p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-semibold text-foreground">{pick(item.title, locale)}</p>
                          {item.subtitle && (
                            <p className="mt-0.5 text-sm text-muted-foreground">
                              {pick(item.subtitle, locale)}
                            </p>
                          )}
                          {item.meta && (
                            <div className="mt-2 flex flex-wrap gap-1.5">
                              {item.meta.map((m, mi) => (
                                <span
                                  key={mi}
                                  className="rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground"
                                >
                                  {pick(m, locale)}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => remove_item(item.key)}
                          className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-destructive/40 hover:text-destructive"
                          aria-label={c.remove}
                        >
                          <Trash className="size-4" />
                        </button>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-4">
                        {/* Period selector (hosting/vps only) */}
                        {item.kind !== "domain" ? (
                          <select
                            value={item.period}
                            onChange={(e) => set_period(item.key, e.target.value as BillingPeriodId)}
                            className="rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-primary/40"
                            aria-label={c.period}
                          >
                            {BILLING_PERIODS.map((p) => (
                              <option key={p.period_id} value={p.period_id}>
                                {pick(p.label, locale)}
                                {p.discount_pct > 0 ? ` (−${p.discount_pct}%)` : ""}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <span className="text-sm text-muted-foreground">{c.oneYear}</span>
                        )}

                        <div className="flex items-center gap-4">
                          {/* Quantity */}
                          <div className="flex items-center gap-2">
                            <QtyBtn onClick={() => set_quantity(item.key, item.quantity - 1)} aria={c.decrease}>
                              <Minus className="size-3.5" />
                            </QtyBtn>
                            <span className="w-6 text-center font-mono text-sm">{item.quantity}</span>
                            <QtyBtn onClick={() => set_quantity(item.key, item.quantity + 1)} aria={c.increase}>
                              <Plus className="size-3.5" />
                            </QtyBtn>
                          </div>
                          <span className="font-semibold tabular-nums text-foreground">
                            {format_toman(cart_item_total(item), locale)}
                          </span>
                        </div>
                      </div>
                      {item.kind !== "domain" && (
                        <p className="mt-2 text-xs text-muted-foreground">
                          {format_toman(item.monthly_price, locale)} × {period.months}{" "}
                          {c.months}
                        </p>
                      )}
                    </div>
                  </Reveal>
                )
              })}

            {step === "gateway" && (
              <Reveal>
                <div className="card-glossy rounded-2xl p-7">
                  <div className="flex items-center gap-3">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10">
                      <Lock weight="duotone" className="size-5.5 text-primary" />
                    </span>
                    <div>
                      <p className="font-semibold text-foreground">{c.gatewayName}</p>
                      <p className="text-sm text-muted-foreground">{c.gatewaySecure}</p>
                    </div>
                  </div>

                  <div className="mt-6 rounded-xl border border-border bg-muted/40 p-5">
                    <p className="text-sm text-muted-foreground">{c.gatewayAmount}</p>
                    <p className="mt-1 text-3xl font-semibold tracking-tight tabular-nums">
                      {format_toman(total, locale)}
                    </p>
                    <p className="mt-3 text-xs text-muted-foreground">{c.gatewayRedirectNote}</p>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <MagneticButton
                      onClick={handle_pay}
                      variant="brand"
                      size="pill"
                      isRTL={isRTL}
                      withArrow={false}
                      disabled={is_paying}
                      className="flex-1 justify-center"
                    >
                      {is_paying ? (
                        c.gatewayProcessing
                      ) : (
                        <span className="inline-flex items-center gap-2">
                          <CreditCard className="size-4" /> {c.gatewayPay}
                        </span>
                      )}
                    </MagneticButton>
                    <Button
                      variant="ghost"
                      size="pill"
                      onClick={() => setStep("cart")}
                      disabled={is_paying}
                    >
                      {c.back}
                    </Button>
                  </div>
                </div>
              </Reveal>
            )}

            {/* Auth prompt */}
            {step === "cart" && is_auth_hydrated && !user && (
              <Reveal delay={0.1}>
                <div className="rounded-2xl border border-border bg-card p-5">
                  <p className="text-sm text-muted-foreground">{c.signInPrompt}</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Button asChild variant="outline" size="pill">
                      <Link href={`${localizePathname("/login", locale)}?next=${encodeURIComponent(return_url)}`}>
                        {c.signIn}
                      </Link>
                    </Button>
                    <Button asChild variant="ghost" size="pill">
                      <Link href={`${localizePathname("/register", locale)}?next=${encodeURIComponent(return_url)}`}>
                        {c.register}
                      </Link>
                    </Button>
                  </div>
                </div>
              </Reveal>
            )}
          </div>

          {/* Summary */}
          <Reveal delay={0.08}>
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="card-glossy rounded-3xl p-6">
                <p className="font-mono text-[11px] tracking-[0.25em] text-muted-foreground uppercase">
                  {c.summary}
                </p>
                <dl className="mt-6 space-y-3 text-sm">
                  <Row label={c.subtotal} value={format_toman(subtotal, locale)} />
                  <Row label={c.tax} value={format_toman(tax, locale)} />
                </dl>
                <div className="mt-5 flex items-end justify-between border-t border-border pt-5">
                  <span className="text-sm text-muted-foreground">{c.total}</span>
                  <span className="text-2xl font-semibold tracking-tight tabular-nums">
                    {format_toman(total, locale)}
                  </span>
                </div>

                {step === "cart" && (
                  <MagneticButton
                    onClick={() => {
                      if (!user) {
                        router.push(
                          `${localizePathname("/login", locale)}?next=${encodeURIComponent(return_url)}`,
                        )
                        return
                      }
                      setStep("gateway")
                    }}
                    variant="brand"
                    size="pill"
                    isRTL={isRTL}
                    className="mt-6 w-full justify-center"
                  >
                    {c.checkout}
                  </MagneticButton>
                )}

                <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                  <ShieldCheck weight="fill" className="size-4 text-primary" />
                  {c.securePayment}
                </p>
              </div>
            </aside>
          </Reveal>
        </div>
      </div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium tabular-nums text-foreground">{value}</dd>
    </div>
  )
}

function QtyBtn({
  onClick,
  aria,
  children,
}: {
  onClick: () => void
  aria: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={aria}
      className="flex size-8 items-center justify-center rounded-full border border-border transition-colors hover:border-primary/40"
    >
      {children}
    </button>
  )
}
