import { notFound } from "next/navigation"

import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider"
import { CustomCursor } from "@/components/fx/custom-cursor"
import { Grain } from "@/components/fx/grain"
import { Preloader } from "@/components/fx/preloader"
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
      <Preloader label={locale === "fa" ? "هاستینگ" : "Hosting"} isRTL={locale === "fa"} />
      <Grain />
      <CustomCursor />
      <ScrollProgress />
      <div
        id="top"
        dir={direction}
        className={cn(
          "relative flex min-h-svh flex-col",
          locale === "fa"
            ? "font-[family-name:var(--font-vazirmatn)]"
            : "font-[family-name:var(--font-inter)]",
        )}
      >
        <Header locale={locale} />
        <main className="flex-1">{children}</main>
        <Footer locale={locale} />
      </div>
    </SmoothScrollProvider>
  )
}
