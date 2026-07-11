"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState, useTransition } from "react"

import type { CheckoutPageCopy, ConfiguratorPayload } from "@/actions"
import { submit_vps_order, validate_promo_code } from "@/actions"
import { VPS_CHECKOUT_STORAGE_KEY } from "@/components/sections/vps-configurator"
import { PageHeader } from "@/components/sections/page-header"
import { Reveal } from "@/components/fx/reveal"
import { MagneticButton } from "@/components/fx/magnetic-button"
import { useToast } from "@/components/providers/toast-provider"
import { Button } from "@/components/ui/button"
import { FloatingInput } from "@/components/ui/floating-input"
import type { Locale } from "@/i18n/config"
import { localizePathname } from "@/i18n/routing"
import { format_vps_price } from "@/lib/vps-pricing"
import { cn } from "@/lib/utils"
import { use_auth_store } from "@/stores/auth-store"

interface CheckoutPageContentProps {
  copy: CheckoutPageCopy
  locale: Locale
}

export function CheckoutPageContent({ copy, locale }: CheckoutPageContentProps) {
  const isRTL = locale === "fa"
  const router = useRouter()
  const { show_toast } = useToast()
  const user = use_auth_store((state) => state.user)
  const is_hydrated = use_auth_store((state) => state.is_hydrated)

  const [configuration, set_configuration] = useState<ConfiguratorPayload | null>(
    null,
  )
  const [region, set_region] = useState(copy.regions[0]?.region_id ?? "fra")
  const [promo_input, set_promo_input] = useState("")
  const [applied_promo, set_applied_promo] = useState<{
    promo_code: string
    discount_percent: number
  } | null>(null)
  const [submitted_order_id, set_submitted_order_id] = useState<string | null>(
    null,
  )
  const [is_pending, start_transition] = useTransition()

  useEffect(() => {
    const raw = sessionStorage.getItem(VPS_CHECKOUT_STORAGE_KEY)
    queueMicrotask(() => {
      if (!raw) {
        set_configuration(null)
        return
      }
      try {
        set_configuration(JSON.parse(raw) as ConfiguratorPayload)
      } catch {
        set_configuration(null)
      }
    })
  }, [])

  function handle_apply_promo() {
    start_transition(async () => {
      const result = await validate_promo_code(promo_input)
      if (result.success && result.promo_code) {
        set_applied_promo({
          promo_code: result.promo_code,
          discount_percent: result.discount_percent,
        })
        show_toast({ variant: "success", title: copy.promo_applied })
        return
      }
      set_applied_promo(null)
      show_toast({
        variant: "error",
        title: copy.promo_invalid,
        message: result.error_message,
      })
    })
  }

  function handle_submit() {
    if (!configuration) {
      return
    }

    start_transition(async () => {
      const result = await submit_vps_order({
        configuration,
        region,
        locale,
      })

      if (result.success && result.order_id) {
        sessionStorage.removeItem(VPS_CHECKOUT_STORAGE_KEY)
        set_submitted_order_id(result.order_id)
        show_toast({
          variant: "success",
          title: copy.success_title,
          message: copy.success_message,
        })
        return
      }

      show_toast({
        variant: "error",
        title: copy.page_title,
        message: result.error_message ?? copy.invalid_config,
      })
    })
  }

  if (!configuration) {
    return (
      <div className="relative px-6 py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-lg text-muted-foreground">{copy.invalid_config}</p>
          <MagneticButton
            href={localizePathname("/#configurator", locale)}
            isRTL={isRTL}
            className="mt-8"
          >
            {locale === "fa" ? "پیکربندی سرور" : "Configure a server"}
          </MagneticButton>
        </div>
      </div>
    )
  }

  if (submitted_order_id) {
    return (
      <div className="relative px-6 py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="font-mono text-xs tracking-[0.3em] text-acid uppercase">
              {submitted_order_id}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1
              className={cn(
                "mt-6 text-5xl font-semibold tracking-tight text-foreground",
                isRTL && "font-[family-name:var(--font-vazirmatn)]",
              )}
            >
              {copy.success_title}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg text-muted-foreground">{copy.success_message}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <MagneticButton
              href={localizePathname("/dashboard/orders", locale)}
              isRTL={isRTL}
              className="mt-10"
            >
              {copy.view_orders}
            </MagneticButton>
          </Reveal>
        </div>
      </div>
    )
  }

  const price_display = format_vps_price(configuration.monthly_price, locale)
  const discounted_price = applied_promo
    ? configuration.monthly_price *
      (1 - applied_promo.discount_percent / 100)
    : configuration.monthly_price
  const discounted_display = format_vps_price(discounted_price, locale)

  return (
    <div className="relative">
      <PageHeader
        eyebrow={locale === "fa" ? "استقرار" : "Deploy"}
        title={copy.page_title}
        subtitle={copy.page_subtitle}
        locale={locale}
      />

      <section className="border-t border-white/10 px-6 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div className="space-y-10">
            <Reveal>
              <div>
                <h2
                  className={cn(
                    "text-sm font-medium tracking-[0.2em] text-muted-foreground uppercase",
                    isRTL && "font-[family-name:var(--font-vazirmatn)]",
                  )}
                >
                  {copy.region_label}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">{copy.region_hint}</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {copy.regions.map((item) => (
                    <button
                      key={item.region_id}
                      type="button"
                      onClick={() => set_region(item.region_id)}
                      className={cn(
                        "rounded-2xl border p-5 text-start transition-colors",
                        region === item.region_id
                          ? "border-acid/50 bg-acid/5"
                          : "border-white/10 bg-white/[0.015] hover:border-white/20",
                      )}
                    >
                      <p className="font-medium text-foreground">{item.label}</p>
                      <p className="mt-1 font-mono text-xs text-muted-foreground">
                        {item.latency_hint}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>

            {is_hydrated && !user && (
              <Reveal delay={0.05}>
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                  <p className="text-sm text-muted-foreground">{copy.sign_in_prompt}</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Button asChild variant="outline" size="pill">
                      <Link href={localizePathname("/login", locale)}>
                        {copy.sign_in_link}
                      </Link>
                    </Button>
                    <Button asChild variant="ghost" size="pill">
                      <Link href={localizePathname("/register", locale)}>
                        {copy.register_link}
                      </Link>
                    </Button>
                  </div>
                </div>
              </Reveal>
            )}

            <Reveal delay={0.08}>
              <div className="rounded-2xl border border-white/10 bg-white/[0.015] p-6">
                <p className="text-sm font-medium text-foreground">{copy.promo_label}</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <div className="min-w-[200px] flex-1">
                    <FloatingInput
                      id="promo_code"
                      label={copy.promo_placeholder}
                      value={promo_input}
                      onChange={set_promo_input}
                      dir="ltr"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="pill"
                    disabled={is_pending || !promo_input.trim()}
                    onClick={handle_apply_promo}
                  >
                    {copy.promo_apply}
                  </Button>
                </div>
                {applied_promo && (
                  <p className="mt-3 font-mono text-xs text-acid">
                    {applied_promo.promo_code} · −{applied_promo.discount_percent}%
                  </p>
                )}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="sticky top-28 rounded-3xl border border-white/10 glass p-8">
              <p className="font-mono text-xs tracking-[0.3em] text-acid uppercase">
                {copy.summary_title}
              </p>
              <ul className="mt-8 space-y-4 text-sm">
                {[
                  { label: "CPU", value: `${configuration.cpu_cores} vCPU` },
                  { label: "RAM", value: `${configuration.ram_gb} GB` },
                  {
                    label: locale === "fa" ? "ذخیره‌سازی" : "Storage",
                    value: `${configuration.storage_type.toUpperCase()} · ${configuration.storage_size_gb} GB`,
                  },
                  {
                    label: locale === "fa" ? "سیستم‌عامل" : "OS",
                    value: configuration.selected_os.replace("_", " "),
                  },
                ].map((row) => (
                  <li
                    key={row.label}
                    className="flex items-center justify-between gap-4 border-b border-white/5 pb-4"
                  >
                    <span className="text-muted-foreground">{row.label}</span>
                    <span className="font-medium text-foreground">{row.value}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">{copy.monthly_label}</p>
                  {applied_promo ? (
                    <>
                      <p className="text-sm text-muted-foreground line-through">
                        {copy.original_price_label}: {price_display}
                      </p>
                      <p className="text-4xl font-bold tracking-tighter text-foreground">
                        {discounted_display}
                      </p>
                      <p className="mt-1 font-mono text-xs text-acid">
                        {copy.discount_label} −{applied_promo.discount_percent}%
                      </p>
                    </>
                  ) : (
                    <p className="text-4xl font-bold tracking-tighter text-foreground">
                      {price_display}
                    </p>
                  )}
                </div>
                <span className="pb-2 font-mono text-xs text-muted-foreground">
                  {copy.per_month}
                </span>
              </div>
              <MagneticButton
                size="pill"
                isRTL={isRTL}
                className="mt-8 w-full justify-center"
                onClick={() => {
                  if (!user) {
                    router.push(localizePathname("/login", locale))
                    return
                  }
                  handle_submit()
                }}
                disabled={is_pending}
              >
                {is_pending ? copy.submitting_label : copy.submit_label}
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
