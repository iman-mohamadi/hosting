import { notFound } from "next/navigation"

import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"
import { CookieConsent } from "@/components/layout/cookie-consent"
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider"
import { ScrollProgress } from "@/components/fx/scroll-progress"
import {
  getDirection,
  isValidLocale,
  type Locale,
} from "@/i18n/config"
import { cn } from "@/lib/utils"

interface MarketingLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function MarketingLayout({
  children,
  params,
}: MarketingLayoutProps) {
  const { locale: localeParam } = await params

  if (!isValidLocale(localeParam)) {
    notFound()
  }

  const locale: Locale = localeParam
  const direction = getDirection(locale)

  return (
    <SmoothScrollProvider>
      <ScrollProgress />
      <div
        id="top"
        dir={direction}
        className={cn(
          "relative flex min-h-svh flex-col bg-background text-foreground",
          locale === "fa"
            ? "font-[family-name:var(--font-vazirmatn)]"
            : "font-[family-name:var(--font-geist)]",
        )}
      >
        <Header locale={locale} />
        <main className="flex-1">{children}</main>
        <Footer locale={locale} />
        <CookieConsent locale={locale} />
      </div>
    </SmoothScrollProvider>
  )
}
