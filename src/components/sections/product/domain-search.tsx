"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { CheckCircle, MagnifyingGlass, XCircle } from "@phosphor-icons/react"

import { MagneticButton } from "@/components/fx/magnetic-button"
import type { Locale } from "@/i18n/config"
import { localizePathname } from "@/i18n/routing"
import {
  DOMAIN_TLDS,
  domain_is_available,
  format_toman,
  type DomainTld,
} from "@/lib/catalog"
import { use_cart_store, type CartItem } from "@/store/use_cart_store"
import { cn } from "@/lib/utils"

interface DomainSearchLabels {
  placeholder: string
  search: string
  available: string
  taken: string
  order: string
  perYear: string
  results_for: string
  hint: string
}

const SUGGEST_TLDS = ["ir", "com", "net", "org", "shop", "io"]

export function DomainSearch({
  locale,
  labels,
}: {
  locale: Locale
  labels: DomainSearchLabels
}) {
  const isRTL = locale === "fa"
  const router = useRouter()
  const add_item = use_cart_store((s) => s.add_item)

  const [query, setQuery] = useState("")
  const [submitted, setSubmitted] = useState<string | null>(null)

  function clean(input: string): { sld: string; typedTld: string | null } {
    const trimmed = input.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/\/.*$/, "")
    const dot = trimmed.indexOf(".")
    if (dot === -1) return { sld: trimmed.replace(/[^a-z0-9-]/g, ""), typedTld: null }
    return {
      sld: trimmed.slice(0, dot).replace(/[^a-z0-9-]/g, ""),
      typedTld: trimmed.slice(dot + 1).replace(/[^a-z]/g, ""),
    }
  }

  function handle_search(e: React.FormEvent) {
    e.preventDefault()
    const { sld } = clean(query)
    if (sld.length < 2) return
    setSubmitted(sld)
  }

  function handle_add(tld: DomainTld, sld: string) {
    const item: CartItem = {
      key: `domain:${sld}.${tld.tld}`,
      kind: "domain",
      title: { fa: `دامنه ${sld}.${tld.tld}`, en: `${sld}.${tld.tld} domain` },
      subtitle: { fa: "ثبت یک‌ساله", en: "1-year registration" },
      period: "annual",
      // Domains are billed yearly; store as a per-month slice with no extra discount.
      monthly_price: Math.round(tld.register / 12),
      quantity: 1,
    }
    add_item(item)
    router.push(localizePathname("/cart", locale))
  }

  const searchTlds = submitted
    ? DOMAIN_TLDS.filter((t) => SUGGEST_TLDS.includes(t.tld))
    : []

  return (
    <div className="mx-auto max-w-3xl">
      <form onSubmit={handle_search} className="glass flex items-center gap-2 rounded-full p-2">
        <span className="ps-4 text-muted-foreground">
          <MagnifyingGlass weight="bold" className="size-5" />
        </span>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={labels.placeholder}
          dir="ltr"
          className={cn(
            "min-w-0 flex-1 bg-transparent py-2 text-base outline-none placeholder:text-muted-foreground",
            isRTL ? "text-right" : "text-left",
          )}
          aria-label={labels.search}
        />
        <MagneticButton
          type="submit"
          size="pill"
          variant="brand"
          isRTL={isRTL}
          withArrow={false}
          className="shrink-0"
        >
          {labels.search}
        </MagneticButton>
      </form>
      <p className="mt-3 text-center text-xs text-muted-foreground">{labels.hint}</p>

      {submitted && (
        <div className="mt-8 space-y-3">
          <p className="text-sm text-muted-foreground">
            {labels.results_for}{" "}
            <span className="font-mono font-medium text-foreground" dir="ltr">
              {submitted}
            </span>
          </p>
          {searchTlds.map((tld) => {
            const available = domain_is_available(submitted, tld.tld)
            return (
              <div
                key={tld.tld}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card px-5 py-4 shadow-[var(--shadow-sm)]"
              >
                <div className="flex items-center gap-3">
                  {available ? (
                    <CheckCircle weight="fill" className="size-5 text-primary" />
                  ) : (
                    <XCircle weight="fill" className="size-5 text-muted-foreground/60" />
                  )}
                  <span className="font-mono text-sm" dir="ltr">
                    {submitted}.{tld.tld}
                  </span>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[11px]",
                      available ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground",
                    )}
                  >
                    {available ? labels.available : labels.taken}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold tabular-nums text-foreground">
                    {format_toman(tld.register, locale)}
                    <span className="ms-1 text-[11px] font-normal text-muted-foreground">
                      {labels.perYear}
                    </span>
                  </span>
                  {available && (
                    <MagneticButton
                      onClick={() => handle_add(tld, submitted)}
                      size="sm"
                      variant="outline"
                      isRTL={isRTL}
                      withArrow={false}
                      className="h-9 rounded-full px-5"
                    >
                      {labels.order}
                    </MagneticButton>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
