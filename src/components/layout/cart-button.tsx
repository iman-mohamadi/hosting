"use client"

import Link from "next/link"
import { ShoppingCartSimple } from "@phosphor-icons/react"

import type { Locale } from "@/i18n/config"
import { localizePathname } from "@/i18n/routing"
import { use_cart_store } from "@/store/use_cart_store"

export function CartButton({ locale }: { locale: Locale }) {
  const hydrated = use_cart_store((s) => s.is_hydrated)
  const count = use_cart_store((s) =>
    s.items.reduce((sum, i) => sum + i.quantity, 0),
  )

  return (
    <Link
      href={localizePathname("/cart", locale)}
      aria-label={locale === "fa" ? "سبد خرید" : "Cart"}
      className="relative flex size-10 items-center justify-center rounded-full border border-border bg-white/70 text-foreground backdrop-blur transition-colors hover:border-primary/30"
    >
      <ShoppingCartSimple weight="duotone" className="size-5" />
      {hydrated && count > 0 && (
        <span className="bg-brand absolute -end-1 -top-1 flex min-w-[18px] items-center justify-center rounded-full px-1 text-[10px] font-semibold text-white shadow-[var(--shadow-glow)]">
          {count.toLocaleString(locale === "fa" ? "fa-IR" : "en-US")}
        </span>
      )}
    </Link>
  )
}
