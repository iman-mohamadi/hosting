"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

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
      className="flex items-center rounded-full border border-border/50 bg-background/40 p-0.5 backdrop-blur-sm"
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
              "relative rounded-full px-3 py-1 text-xs font-medium tracking-wide transition-colors",
              isActive
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground",
            )}
            aria-current={isActive ? "true" : undefined}
          >
            {item.toUpperCase()}
          </Link>
        )
      })}
    </div>
  )
}
