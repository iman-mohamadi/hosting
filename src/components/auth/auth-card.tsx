"use client"

import Link from "next/link"
import { motion } from "framer-motion"

import { LanguageSwitcher } from "@/components/layout/language-switcher"
import { cn } from "@/lib/utils"
import type { Locale } from "@/i18n/config"
import { getHomePath } from "@/i18n/routing"

interface AuthCardProps {
  locale: Locale
  title: string
  subtitle: string
  children: React.ReactNode
}

export function AuthCard({
  locale,
  title,
  subtitle,
  children,
}: AuthCardProps) {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center px-6 py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,oklch(0.45_0.08_188/0.12),transparent)]"
      />

      <div className="absolute top-6 flex w-full max-w-md items-center justify-between ltr:left-1/2 ltr:-translate-x-1/2 rtl:right-1/2 rtl:translate-x-1/2">
        <Link
          href={getHomePath(locale)}
          className="text-xs font-medium tracking-widest text-muted-foreground uppercase transition-opacity hover:text-foreground"
        >
          {locale === "fa" ? "← بازگشت" : "← Back"}
        </Link>
        <LanguageSwitcher locale={locale} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 32, filter: "blur(12px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "w-full max-w-md rounded-2xl border border-border/40 bg-card/20 p-8 backdrop-blur-md md:p-10",
          "ltr:text-left rtl:text-right",
        )}
      >
        <div className="mb-10 space-y-3">
          <h1
            className={cn(
              "text-3xl font-semibold tracking-tight text-foreground",
              locale === "fa" && "font-[family-name:var(--font-vazirmatn)]",
            )}
          >
            {title}
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {subtitle}
          </p>
        </div>

        {children}
      </motion.div>
    </div>
  )
}
