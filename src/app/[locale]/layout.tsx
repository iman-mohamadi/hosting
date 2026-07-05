import { notFound } from "next/navigation"

import { LocaleAttributes } from "@/components/locale-attributes"
import { AuthProvider } from "@/components/providers/auth-provider"
import { ToastProvider } from "@/components/providers/toast-provider"
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
      <AuthProvider>
        <ToastProvider>
          <div
            dir={direction}
            className={cn(
              "min-h-svh bg-background text-foreground",
              locale === "fa"
                ? "font-[family-name:var(--font-vazirmatn)]"
                : "font-[family-name:var(--font-inter)]",
            )}
          >
            {children}
          </div>
        </ToastProvider>
      </AuthProvider>
    </>
  )
}
