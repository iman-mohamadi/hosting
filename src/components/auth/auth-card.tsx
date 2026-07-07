"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react"

import { LanguageSwitcher } from "@/components/layout/language-switcher"
import { Logo } from "@/components/layout/logo"
import { WebglBackdrop } from "@/components/fx/webgl-backdrop"
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
      {/* Immersive brand panel */}
      <div className="relative isolate hidden overflow-hidden border-white/10 lg:block ltr:border-r rtl:border-l">
        <div className="absolute inset-0 z-0">
          <div aria-hidden className="absolute inset-0 bg-[#050706]" />
          <WebglBackdrop intensity={0.9} />
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_30%,transparent,#040605_88%)]"
          />
        </div>

        <div className="relative z-10 flex h-full flex-col justify-between p-12">
          <Link href={getHomePath(locale)}>
            <Logo locale={locale} />
          </Link>

          <div>
            <p
              className={cn(
                "max-w-sm text-3xl font-semibold leading-tight tracking-tight text-foreground",
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
                ? ["NVMe", "۹۹.۹۹٪ آپتایم", "۱۴ منطقه", "DDoS"]
                : ["NVMe", "99.99% uptime", "14 regions", "DDoS"]
            }
            className="text-sm text-muted-foreground"
          />
        </div>
      </div>

      {/* Form panel */}
      <div className="relative flex flex-col items-center justify-center px-6 py-16">
        <div className="absolute inset-x-0 top-0 flex items-center justify-between px-6 py-6">
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
          className={cn("w-full max-w-md", "ltr:text-left rtl:text-right")}
        >
          <div className="mb-10 space-y-3">
            <h1
              className={cn(
                "whitespace-pre-line text-4xl font-semibold tracking-tight text-foreground",
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
