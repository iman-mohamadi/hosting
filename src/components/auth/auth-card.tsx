"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react"

import { LanguageSwitcher } from "@/components/layout/language-switcher"
import { Logo } from "@/components/layout/logo"
import { Aurora } from "@/components/fx/aurora"
import { Marquee } from "@/components/fx/marquee"
import { cn } from "@/lib/utils"
import type { Locale } from "@/i18n/config"
import { getHomePath } from "@/i18n/routing"
import { EASE_OUT_EXPO } from "@/lib/motion"

interface AuthCardProps {
  locale: Locale
  title: string
  subtitle: string
  children: React.ReactNode
}

export function AuthCard({ locale, title, subtitle, children }: AuthCardProps) {
  const isRTL = isRtl(locale)
  const Back = isRTL ? ArrowRight : ArrowLeft

  return (
    <div className="relative grid min-h-svh lg:grid-cols-2">
      {/* Immersive brand panel — vivid glossy gradient */}
      <div className="relative isolate hidden overflow-hidden lg:block">
        <div aria-hidden className="bg-brand absolute inset-0 z-0" />
        <Aurora intensity="vivid" className="z-0 mix-blend-soft-light" />
        <div
          aria-hidden
          className="absolute inset-0 z-0 opacity-30 [mask-image:radial-gradient(70%_60%_at_50%_40%,black,transparent)]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.14) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />

        <div className="relative z-10 flex h-full flex-col justify-between p-12">
          <Link href={getHomePath(locale)} className="w-fit brightness-0 invert">
            <Logo locale={locale} />
          </Link>

          <div>
            <p
              className={cn(
                "max-w-sm text-3xl leading-tight font-semibold tracking-tight text-white",
                isRTL && "font-[family-name:var(--font-vazirmatn)]",
              )}
            >
              {isRTL
                ? "زیرساختی که ناپدید می‌شود، تا محصولت دیده شود."
                : "Infrastructure that disappears, so your product is seen."}
            </p>
          </div>

          <Marquee
            items={
              isRTL
                ? ["NVMe", "۹۹.۹٪ هدف آپتایم", "۳ دیتاسنتر", "پرداخت تومانی"]
                : ["NVMe", "99.9% uptime target", "3 datacenters", "Toman billing"]
            }
            className="text-sm text-white/70"
          />
        </div>
      </div>

      {/* Form panel */}
      <div className="relative flex flex-col items-center justify-center overflow-hidden px-6 py-16">
        <div
          aria-hidden
          className="mesh pointer-events-none absolute inset-0 opacity-30 lg:hidden"
        />
        <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-6 py-6">
          <Link
            href={getHomePath(locale)}
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Back
              weight="bold"
              className="size-4 transition-transform group-hover:-translate-x-0.5"
            />
            {locale === "fa" ? "بازگشت" : "Back"}
          </Link>
          <LanguageSwitcher locale={locale} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.85, ease: EASE_OUT_EXPO }}
          className={cn(
            "relative z-10 w-full max-w-md",
            "ltr:text-left rtl:text-right",
          )}
        >
          <div className="mb-10 space-y-3">
            <h1
              className={cn(
                "text-4xl font-semibold tracking-tight whitespace-pre-line text-foreground",
                isRTL && "font-[family-name:var(--font-vazirmatn)]",
              )}
            >
              {title}
            </h1>
            <p
              className={cn(
                "text-sm leading-relaxed text-muted-foreground",
                isRTL && "font-[family-name:var(--font-vazirmatn)]",
              )}
            >
              {subtitle}
            </p>
          </div>

          {children}
        </motion.div>
      </div>
    </div>
  )
}

function isRtl(locale: Locale) {
  return locale === "fa"
}
