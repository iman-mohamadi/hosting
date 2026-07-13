"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"
import { locales, type Locale } from "@/i18n/config"
import { localizePathname } from "@/i18n/routing"

interface LanguageSwitcherProps {
  locale: Locale
}

export function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const pathname = usePathname()

  return (
    <div
      className="relative flex items-center rounded-full border border-border bg-muted/40 p-0.5 backdrop-blur-sm"
      role="group"
      aria-label="Language switcher"
    >
      {locales.map((item) => {
        const isActive = item === locale
        return (
          <Link
            key={item}
            href={localizePathname(pathname, item)}
            className={cn(
              "relative rounded-full px-2.5 py-1 text-xs font-medium tracking-wide transition-colors",
              isActive
                ? "text-primary-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
            aria-current={isActive ? "true" : undefined}
          >
            {isActive && (
              <motion.span
                layoutId="lang-active"
                className="absolute inset-0 rounded-full bg-primary"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative z-10">{item.toUpperCase()}</span>
          </Link>
        )
      })}
    </div>
  )
}
