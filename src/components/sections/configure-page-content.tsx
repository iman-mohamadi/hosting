"use client"

import { useEffect, useState, useTransition } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useShallow } from "zustand/react/shallow"
import { Minus, Plus } from "@phosphor-icons/react"

import { validate_configuration } from "@/actions"
import { MagneticButton } from "@/components/fx/magnetic-button"
import { Reveal, TextReveal } from "@/components/fx/reveal"
import { Slider } from "@/components/ui/slider"
import type { Locale } from "@/i18n/config"
import { localizePathname } from "@/i18n/routing"
import { DEPLOY_REGIONS } from "@/lib/brand"
import {
  parse_config_from_search_params,
  serialize_config_to_search_params,
  write_checkout_config,
} from "@/lib/config-url"
import {
  ADDON_RATES,
  format_vps_price,
  MAX_DEDICATED_IPS,
  PLAN_PRESETS,
  type PlanPresetId,
} from "@/lib/vps-pricing"
import { use_configurator_store } from "@/store/use_configurator_store"
import { cn } from "@/lib/utils"

const REGIONS = {
  en: DEPLOY_REGIONS.map((region) => ({
    region_id: region.region_id,
    label: region.label_en,
  })),
  fa: DEPLOY_REGIONS.map((region) => ({
    region_id: region.region_id,
    label: region.label_fa,
  })),
} as const

const PRESET_LABELS: Record<PlanPresetId, { en: string; fa: string }> = {
  starter: { en: "Start", fa: "شروع" },
  growth: { en: "Growth", fa: "رشد" },
  scale: { en: "Scale", fa: "سازمانی" },
}

const COPY = {
  en: {
    title: "Design your machine.",
    subtitle: "Presets to start. Fine-tune everything. Price updates live.",
    presets: "Presets",
    cpu: "Compute",
    ram: "Memory",
    storage: "Storage size",
    storage_type: "Storage type",
    os: "Operating system",
    addons: "Add-ons",
    region: "Region",
    summary: "Your build",
    per_month: "/ month",
    deploy: "Continue to checkout",
    validation_error: "Configuration issue",
  },
  fa: {
    title: "ماشین خود را طراحی کنید.",
    subtitle: "با پلن شروع کنید. همه‌چیز را تنظیم کنید. قیمت زنده به‌روز می‌شود.",
    presets: "پلن‌ها",
    cpu: "پردازش",
    ram: "حافظه",
    storage: "حجم ذخیره‌سازی",
    storage_type: "نوع ذخیره‌سازی",
    os: "سیستم‌عامل",
    addons: "افزودنی‌ها",
    region: "منطقه",
    summary: "سرور شما",
    per_month: "/ ماه",
    deploy: "ادامه به پرداخت",
    validation_error: "مشکل پیکربندی",
  },
} as const

export function ConfigurePageContent({ locale }: { locale: Locale }) {
  const copy = COPY[locale]
  const isRTL = locale === "fa"
  const router = useRouter()
  const searchParams = useSearchParams()
  const [validation_error, set_validation_error] = useState<string | null>(null)
  const [is_pending, start_transition] = useTransition()

  const {
    cpu_cores,
    ram_gb,
    storage_type,
    storage_size_gb,
    selected_os,
    addons,
    region,
    monthly_price,
    active_preset,
    update_cpu,
    update_ram,
    update_storage,
    update_storage_size,
    update_os,
    update_region,
    set_dedicated_ips,
    toggle_backups,
    toggle_ddos,
    hydrate_from_plan,
    hydrate_from_payload,
    get_payload,
  } = use_configurator_store(
    useShallow((s) => ({
      cpu_cores: s.cpu_cores,
      ram_gb: s.ram_gb,
      storage_type: s.storage_type,
      storage_size_gb: s.storage_size_gb,
      selected_os: s.selected_os,
      addons: s.addons,
      region: s.region,
      monthly_price: s.monthly_price,
      active_preset: s.active_preset,
      update_cpu: s.update_cpu,
      update_ram: s.update_ram,
      update_storage: s.update_storage,
      update_storage_size: s.update_storage_size,
      update_os: s.update_os,
      update_region: s.update_region,
      set_dedicated_ips: s.set_dedicated_ips,
      toggle_backups: s.toggle_backups,
      toggle_ddos: s.toggle_ddos,
      hydrate_from_plan: s.hydrate_from_plan,
      hydrate_from_payload: s.hydrate_from_payload,
      get_payload: s.get_payload,
    })),
  )

  useEffect(() => {
    const plan = searchParams.get("plan")
    if (plan) {
      hydrate_from_plan(plan)
      return
    }
    const parsed = parse_config_from_search_params(searchParams)
    if (parsed) {
      hydrate_from_payload(parsed)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- hydrate once from URL
  }, [])

  useEffect(() => {
    const handle = window.setTimeout(() => {
      start_transition(async () => {
        const result = await validate_configuration(get_payload(), locale)
        set_validation_error(
          result.valid ? null : (result.error_message ?? copy.validation_error),
        )
      })
    }, 350)
    return () => window.clearTimeout(handle)
  }, [
    cpu_cores,
    ram_gb,
    storage_type,
    storage_size_gb,
    selected_os,
    addons,
    locale,
    get_payload,
    copy.validation_error,
  ])

  function handle_deploy() {
    const payload = get_payload()
    if (validation_error) return
    write_checkout_config(payload)
    const params = serialize_config_to_search_params(payload, region)
    router.push(
      `${localizePathname("/checkout", locale)}?${params.toString()}`,
    )
  }

  return (
    <div className="relative px-6 pb-32 pt-28 lg:px-8 lg:pt-36">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <Reveal>
            <p className="mb-4 font-mono text-[11px] tracking-[0.3em] text-primary uppercase">
              {locale === "fa" ? "پیکربندی" : "Configure"}
            </p>
          </Reveal>
          <h1
            className={cn(
              "text-[clamp(2.25rem,5vw,3.75rem)] font-semibold tracking-tight",
              isRTL && "font-[family-name:var(--font-vazirmatn)]",
            )}
          >
            <TextReveal text={copy.title} as="span" />
          </h1>
          <Reveal delay={0.08}>
            <p className="mt-5 text-lg text-muted-foreground">{copy.subtitle}</p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_340px] lg:gap-16">
          <div className="space-y-14">
            <section>
              <h2 className="mb-4 font-mono text-[11px] tracking-[0.25em] text-muted-foreground uppercase">
                {copy.presets}
              </h2>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(PLAN_PRESETS) as PlanPresetId[]).map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => hydrate_from_plan(id)}
                    className={cn(
                      "rounded-full border px-4 py-2 text-sm transition-colors",
                      active_preset === id
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border hover:border-foreground/30",
                    )}
                  >
                    {PRESET_LABELS[id][locale]}
                  </button>
                ))}
              </div>
            </section>

            <Field label={copy.cpu} value={`${cpu_cores} vCPU`}>
              <Slider
                min={1}
                max={32}
                step={1}
                value={[cpu_cores]}
                onValueChange={([v]) => update_cpu(v ?? 1)}
              />
            </Field>

            <Field label={copy.ram} value={`${ram_gb} GB`}>
              <Slider
                min={1}
                max={128}
                step={1}
                value={[ram_gb]}
                onValueChange={([v]) => update_ram(v ?? 1)}
              />
            </Field>

            <Field label={copy.storage} value={`${storage_size_gb} GB`}>
              <Slider
                min={20}
                max={2048}
                step={10}
                value={[storage_size_gb]}
                onValueChange={([v]) => update_storage_size(v ?? 20)}
              />
            </Field>

            <section>
              <h2 className="mb-4 font-mono text-[11px] tracking-[0.25em] text-muted-foreground uppercase">
                {copy.storage_type}
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {(["nvme", "ssd"] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => update_storage(type, storage_size_gb)}
                    className={cn(
                      "rounded-xl border px-5 py-4 text-start transition-colors",
                      storage_type === type
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-foreground/20",
                    )}
                  >
                    <p className="font-medium uppercase">{type}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {type === "nvme"
                        ? locale === "fa"
                          ? "فلش فوق‌سریع"
                          : "Ultra-fast flash"
                        : locale === "fa"
                          ? "استاندارد پایدار"
                          : "Reliable standard"}
                    </p>
                  </button>
                ))}
              </div>
            </section>

            <section>
              <h2 className="mb-4 font-mono text-[11px] tracking-[0.25em] text-muted-foreground uppercase">
                {copy.os}
              </h2>
              <div className="grid gap-3 sm:grid-cols-3">
                {(
                  [
                    ["ubuntu", "Ubuntu"],
                    ["windows", "Windows"],
                    ["arch_linux", "Arch"],
                  ] as const
                ).map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => update_os(id)}
                    className={cn(
                      "rounded-xl border px-4 py-4 text-sm font-medium transition-colors",
                      selected_os === id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-foreground/20",
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </section>

            <section>
              <h2 className="mb-4 font-mono text-[11px] tracking-[0.25em] text-muted-foreground uppercase">
                {copy.addons}
              </h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-xl border border-border px-5 py-4">
                  <div>
                    <p className="text-sm font-medium">
                      {locale === "fa" ? "IPv4 اختصاصی" : "Dedicated IPv4"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      +${ADDON_RATES.dedicated_ip}
                      {locale === "fa" ? " / ماه" : " / mo each"}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      aria-label="Decrease"
                      onClick={() => set_dedicated_ips(addons.dedicated_ips - 1)}
                      className="flex size-8 items-center justify-center rounded-full border border-border"
                    >
                      <Minus className="size-3.5" />
                    </button>
                    <span className="w-6 text-center font-mono text-sm">
                      {addons.dedicated_ips}
                    </span>
                    <button
                      type="button"
                      aria-label="Increase"
                      disabled={addons.dedicated_ips >= MAX_DEDICATED_IPS}
                      onClick={() => set_dedicated_ips(addons.dedicated_ips + 1)}
                      className="flex size-8 items-center justify-center rounded-full border border-border disabled:opacity-40"
                    >
                      <Plus className="size-3.5" />
                    </button>
                  </div>
                </div>

                <ToggleRow
                  label={locale === "fa" ? "پشتیبان‌گیری خودکار" : "Automated backups"}
                  hint={`+$${ADDON_RATES.automated_backups}`}
                  active={addons.automated_backups}
                  onToggle={toggle_backups}
                />
                <ToggleRow
                  label={locale === "fa" ? "DDoS پیشرفته" : "Advanced DDoS"}
                  hint={`+$${ADDON_RATES.ddos_protection}`}
                  active={addons.ddos_protection}
                  onToggle={toggle_ddos}
                />
              </div>
            </section>

            <section>
              <h2 className="mb-4 font-mono text-[11px] tracking-[0.25em] text-muted-foreground uppercase">
                {copy.region}
              </h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {REGIONS[locale].map((r) => (
                  <button
                    key={r.region_id}
                    type="button"
                    onClick={() => update_region(r.region_id)}
                    className={cn(
                      "rounded-xl border px-3 py-3 text-sm transition-colors",
                      region === r.region_id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-foreground/20",
                    )}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </section>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-border bg-white p-6 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.2)]">
              <p className="font-mono text-[11px] tracking-[0.25em] text-muted-foreground uppercase">
                {copy.summary}
              </p>
              <p className="mt-4 font-mono text-4xl font-medium tracking-tight tabular-nums">
                {format_vps_price(monthly_price, locale)}
                <span className="ms-1 text-sm text-muted-foreground">
                  {copy.per_month}
                </span>
              </p>

              <ul className="mt-6 space-y-2 border-t border-border pt-6 text-sm text-muted-foreground">
                <li>
                  {cpu_cores} vCPU · {ram_gb} GB RAM
                </li>
                <li>
                  {storage_size_gb} GB {storage_type.toUpperCase()}
                </li>
                <li className="uppercase">{selected_os.replace("_", " ")}</li>
                {(addons.dedicated_ips > 0 ||
                  addons.automated_backups ||
                  addons.ddos_protection) && (
                  <li>
                    {[
                      addons.dedicated_ips > 0 &&
                        `${addons.dedicated_ips} IP`,
                      addons.automated_backups && "Backups",
                      addons.ddos_protection && "DDoS",
                    ]
                      .filter(Boolean)
                      .join(" · ")}
                  </li>
                )}
              </ul>

              {validation_error && (
                <p className="mt-4 text-sm text-destructive" role="alert">
                  {validation_error}
                </p>
              )}

              <div className="mt-6">
                <MagneticButton
                  onClick={handle_deploy}
                  disabled={Boolean(validation_error) || is_pending}
                  size="pill"
                  isRTL={isRTL}
                  className="w-full justify-center"
                >
                  {copy.deploy}
                </MagneticButton>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/90 p-4 backdrop-blur-lg lg:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <p className="font-mono text-lg font-medium">
            {format_vps_price(monthly_price, locale)}
          </p>
          <MagneticButton
            onClick={handle_deploy}
            disabled={Boolean(validation_error) || is_pending}
            size="pill"
            isRTL={isRTL}
            withArrow={false}
          >
            {copy.deploy}
          </MagneticButton>
        </div>
      </div>
    </div>
  )
}

function Field({
  label,
  value,
  children,
}: {
  label: string
  value: string
  children: React.ReactNode
}) {
  return (
    <section>
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <h2 className="font-mono text-[11px] tracking-[0.25em] text-muted-foreground uppercase">
          {label}
        </h2>
        <p className="font-mono text-2xl font-medium tracking-tight">{value}</p>
      </div>
      {children}
    </section>
  )
}

function ToggleRow({
  label,
  hint,
  active,
  onToggle,
}: {
  label: string
  hint: string
  active: boolean
  onToggle: () => void
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={active}
      onClick={onToggle}
      className={cn(
        "flex w-full items-center justify-between rounded-xl border px-5 py-4 text-start transition-colors",
        active ? "border-primary bg-primary/5" : "border-border",
      )}
    >
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground">{hint}</p>
      </div>
      <span
        className={cn(
          "relative h-6 w-11 rounded-full transition-colors",
          active ? "bg-primary" : "bg-muted",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 size-5 rounded-full bg-white shadow transition-transform",
            active ? "translate-x-5 rtl:-translate-x-5" : "translate-x-0.5 rtl:-translate-x-0.5",
          )}
        />
      </span>
    </button>
  )
}
