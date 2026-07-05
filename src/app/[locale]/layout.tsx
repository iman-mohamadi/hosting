import { notFound } from "next/navigation"

import { LocaleAttributes } from "@/components/locale-attributes"
import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider"
import {
  getDirection,
  isValidLocale,
  locales,
  type Locale,
} from "@/i18n/config"
import { cn } from "@/lib/utils"

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale: localeParam } = await params

  if (!isValidLocale(localeParam)) {
    notFound()
  }

  const locale: Locale = localeParam
  const direction = getDirection(locale)

  return (
    <>
      <LocaleAttributes locale={locale} />
      <SmoothScrollProvider>
        <div
          dir={direction}
          className={cn(
            "flex min-h-svh flex-col",
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
    </>
  )
}
