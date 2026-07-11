"use client"

import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"

import { MagneticButton } from "@/components/fx/magnetic-button"
import { isValidLocale, type Locale } from "@/i18n/config"
import { localizePathname } from "@/i18n/routing"
import { cn } from "@/lib/utils"

interface LocaleErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function LocaleError({ error, reset }: LocaleErrorProps) {
  const params = useParams()
  const router = useRouter()
  const localeParam = typeof params?.locale === "string" ? params.locale : "fa"
  const locale: Locale = isValidLocale(localeParam) ? localeParam : "fa"
  const isRTL = locale === "fa"

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className={cn(
        "flex min-h-[70vh] flex-col items-center justify-center px-6 text-center",
        isRTL
          ? "font-[family-name:var(--font-vazirmatn)]"
          : "font-[family-name:var(--font-inter)]",
      )}
    >
      <p className="font-mono text-xs tracking-[0.3em] text-acid uppercase">
        Error
      </p>
      <h1 className="mt-6 text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
        {isRTL ? "مشکلی پیش آمد" : "Something went wrong"}
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        {isRTL
          ? "صفحه بارگذاری نشد. دوباره تلاش کنید یا به خانه برگردید."
          : "This page failed to load. Try again or return home."}
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <MagneticButton onClick={reset} isRTL={isRTL}>
          {isRTL ? "تلاش مجدد" : "Try again"}
        </MagneticButton>
        <button
          type="button"
          onClick={() => router.push(localizePathname("/", locale))}
          className="rounded-full border border-white/10 px-5 py-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          {isRTL ? "بازگشت به خانه" : "Back home"}
        </button>
      </div>
    </div>
  )
}
