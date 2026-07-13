"use client"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState, useTransition } from "react"

import type { CheckoutPageCopy, ConfiguratorPayload } from "@/actions"
import { submit_vps_order, validate_promo_code } from "@/actions"
import {
  clear_checkout_config,
  parse_config_from_search_params,
  read_checkout_config,
  serialize_config_to_search_params,
  write_checkout_config,
} from "@/lib/config-url"
import { PageHeader } from "@/components/sections/page-header"
import { Reveal } from "@/components/fx/reveal"
import { MagneticButton } from "@/components/fx/magnetic-button"
import { useToast } from "@/components/providers/toast-provider"
import { Button } from "@/components/ui/button"
import { FloatingInput } from "@/components/ui/floating-input"
import type { Locale } from "@/i18n/config"
import { localizePathname } from "@/i18n/routing"
import { compute_vps_price, format_vps_price } from "@/lib/vps-pricing"
import { cn } from "@/lib/utils"
import { use_auth_store } from "@/stores/auth-store"

interface CheckoutPageContentProps {
  copy: CheckoutPageCopy
  locale: Locale
}

export function CheckoutPageContent({ copy, locale }: CheckoutPageContentProps) {
  const isRTL = locale === "fa"
  const router = useRouter()
  const searchParams = useSearchParams()
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
    queueMicrotask(() => {
      const fromUrl = parse_config_from_search_params(searchParams)
      const fromStorage = read_checkout_config()

      if (fromUrl?.cpu_cores || fromUrl?.ram_gb) {
        const merged: ConfiguratorPayload = {
          cpu_cores: fromUrl.cpu_cores ?? fromStorage?.cpu_cores ?? 4,
          ram_gb: fromUrl.ram_gb ?? fromStorage?.ram_gb ?? 16,
          storage_type: fromUrl.storage_type ?? fromStorage?.storage_type ?? "nvme",
          storage_size_gb:
            fromUrl.storage_size_gb ?? fromStorage?.storage_size_gb ?? 80,
          selected_os: fromUrl.selected_os ?? fromStorage?.selected_os ?? "ubuntu",
          addons: fromUrl.addons ??
            fromStorage?.addons ?? {
              dedicated_ips: 0,
              automated_backups: false,
              ddos_protection: false,
            },
          monthly_price: 0,
        }
        merged.monthly_price = compute_vps_price(merged).monthly_price
        set_configuration(merged)
        write_checkout_config(merged)
        if (fromUrl.region) {
          const r = fromUrl.region
          if (r === "tehran" || r === "isfahan" || r === "fra") {
            set_region(r)
          }
        }
        return
      }

      if (fromStorage) {
        set_configuration(fromStorage)
        return
      }

      set_configuration(null)
    })
  }, [searchParams])

  const edit_href = useMemo(() => {
    if (!configuration) return localizePathname("/configure", locale)
    const params = serialize_config_to_search_params(configuration, region)
    return `${localizePathname("/configure", locale)}?${params.toString()}`
  }, [configuration, locale, region])

  const checkout_return = useMemo(() => {
    if (!configuration) return localizePathname("/checkout", locale)
    const params = serialize_config_to_search_params(configuration, region)
    return `${localizePathname("/checkout", locale)}?${params.toString()}`
  }, [configuration, locale, region])

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
    if (!configuration) return

    start_transition(async () => {
      const result = await submit_vps_order({
        configuration,
        region,
        locale,
        promo_code: applied_promo?.promo_code,
      })

      if (result.success && result.order_id) {
        clear_checkout_config()
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
            href={localizePathname("/configure", locale)}
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
            <p className="font-mono text-xs tracking-[0.3em] text-primary uppercase">
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
    ? Math.round(
        configuration.monthly_price *
          (1 - applied_promo.discount_percent / 100) *
          100,
      ) / 100
    : configuration.monthly_price
  const discounted_display = format_vps_price(discounted_price, locale)

  const addon_rows = [
    configuration.addons.dedicated_ips > 0 && {
      label: locale === "fa" ? "IPv4 اختصاصی" : "Dedicated IPs",
      value: String(configuration.addons.dedicated_ips),
    },
    configuration.addons.automated_backups && {
      label: locale === "fa" ? "پشتیبان‌گیری" : "Backups",
      value: locale === "fa" ? "فعال" : "On",
    },
    configuration.addons.ddos_protection && {
      label: "DDoS",
      value: locale === "fa" ? "فعال" : "On",
    },
  ].filter(Boolean) as { label: string; value: string }[]

  return (
    <div className="relative">
      <PageHeader
        eyebrow={locale === "fa" ? "استقرار" : "Deploy"}
        title={copy.page_title}
        subtitle={copy.page_subtitle}
        locale={locale}
      />

      <div className="mx-auto max-w-7xl px-6 pb-6 lg:px-8">
        <ol className="flex flex-wrap gap-4 font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
          <li>
            <Link href={edit_href} className="hover:text-foreground">
              01 {locale === "fa" ? "پیکربندی" : "Configure"}
            </Link>
          </li>
          <li className="text-primary">
            02 {locale === "fa" ? "بررسی" : "Review"}
          </li>
          <li>03 {locale === "fa" ? "تأیید" : "Confirm"}</li>
        </ol>
      </div>

      <section className="border-t border-border px-6 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div className="space-y-10">
            <Reveal>
              <div>
                <h2 className="text-sm font-medium tracking-[0.2em] text-muted-foreground uppercase">
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
                          ? "border-primary/40 bg-primary/5"
                          : "border-border bg-white hover:border-foreground/20",
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
                <div className="rounded-2xl border border-border bg-white p-6">
                  <p className="text-sm text-muted-foreground">{copy.sign_in_prompt}</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Button asChild variant="outline" size="pill">
                      <Link
                        href={`${localizePathname("/login", locale)}?next=${encodeURIComponent(checkout_return)}`}
                      >
                        {copy.sign_in_link}
                      </Link>
                    </Button>
                    <Button asChild variant="ghost" size="pill">
                      <Link
                        href={`${localizePathname("/register", locale)}?next=${encodeURIComponent(checkout_return)}`}
                      >
                        {copy.register_link}
                      </Link>
                    </Button>
                  </div>
                </div>
              </Reveal>
            )}

            <Reveal delay={0.08}>
              <div className="rounded-2xl border border-border bg-white p-6">
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
                  <p className="mt-3 font-mono text-xs text-primary">
                    {applied_promo.promo_code} · −{applied_promo.discount_percent}%
                  </p>
                )}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="sticky top-28 rounded-3xl border border-border bg-white p-8 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.15)]">
              <div className="flex items-center justify-between gap-4">
                <p className="font-mono text-xs tracking-[0.3em] text-primary uppercase">
                  {copy.summary_title}
                </p>
                <Link
                  href={edit_href}
                  className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                >
                  {locale === "fa" ? "ویرایش" : "Edit"}
                </Link>
              </div>
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
                    value: configuration.selected_os
                      .replace("_", " ")
                      .replace(/^\w/, (c) => c.toUpperCase()),
                  },
                  ...addon_rows,
                ].map((row) => (
                  <li
                    key={row.label}
                    className="flex items-center justify-between gap-4 border-b border-border pb-4"
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
                      <p className="font-mono text-4xl font-medium tracking-tighter text-foreground">
                        {discounted_display}
                      </p>
                      <p className="mt-1 font-mono text-xs text-primary">
                        {copy.discount_label} −{applied_promo.discount_percent}%
                      </p>
                    </>
                  ) : (
                    <p className="font-mono text-4xl font-medium tracking-tighter text-foreground">
                      {price_display}
                    </p>
                  )}
                </div>
                <span className="pb-2 font-mono text-xs text-muted-foreground">
                  {copy.per_month}
                </span>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                {locale === "fa"
                  ? "پس از ثبت، فاکتور در داشبورد قابل پرداخت است."
                  : "After submit, pay the invoice from your dashboard."}
              </p>
              <MagneticButton
                size="pill"
                isRTL={isRTL}
                className="mt-6 w-full justify-center"
                onClick={() => {
                  if (!user) {
                    router.push(
                      `${localizePathname("/login", locale)}?next=${encodeURIComponent(checkout_return)}`,
                    )
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
