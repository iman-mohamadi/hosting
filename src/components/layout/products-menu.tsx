"use client"

import Link from "next/link"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { CaretDown, HardDrives, Globe, Cloud, ShieldCheck } from "@phosphor-icons/react"

import type { Locale } from "@/i18n/config"
import { localizePathname } from "@/i18n/routing"
import { PRODUCT_FAMILIES, pick, type ProductFamily } from "@/lib/catalog"
import { cn } from "@/lib/utils"

const FAMILY_ICONS = {
  server: HardDrives,
  host: Cloud,
  domain: Globe,
  shield: ShieldCheck,
} as const

export function ProductsMenu({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false)
  const label = locale === "fa" ? "محصولات" : "Products"

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="group flex items-center gap-1 rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        aria-expanded={open}
      >
        {label}
        <CaretDown
          weight="bold"
          className={cn("size-3 transition-transform", open && "rotate-180")}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute start-1/2 top-full z-50 mt-2 w-[min(90vw,720px)] -translate-x-1/2 rtl:translate-x-1/2"
          >
            <div className="glass grid grid-cols-2 gap-2 rounded-3xl p-3 shadow-[var(--shadow-lg)] md:grid-cols-4">
              {PRODUCT_FAMILIES.map((family) => (
                <FamilyColumn key={family.family_id} family={family} locale={locale} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function FamilyColumn({ family, locale }: { family: ProductFamily; locale: Locale }) {
  const Icon = FAMILY_ICONS[family.icon]
  return (
    <div className="rounded-2xl p-3">
      <div className="mb-3 flex items-center gap-2 px-1">
        <span className="flex size-7 items-center justify-center rounded-lg bg-primary/10">
          <Icon weight="duotone" className="size-4 text-primary" />
        </span>
        <span className="text-xs font-semibold tracking-wide text-foreground/70 uppercase">
          {pick(family.label, locale)}
        </span>
      </div>
      <ul className="space-y-0.5">
        {family.items.map((item) => (
          <li key={item.href + pick(item.label, locale)}>
            <Link
              href={localizePathname(item.href, locale)}
              className="block rounded-xl px-2.5 py-2 text-sm text-foreground/80 transition-colors hover:bg-primary/5 hover:text-foreground"
            >
              {pick(item.label, locale)}
              {item.desc && (
                <span className="mt-0.5 block text-[11px] leading-snug text-muted-foreground">
                  {pick(item.desc, locale)}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
