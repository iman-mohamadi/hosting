import { notFound } from "next/navigation"

import {
  getDirection,
  isValidLocale,
  type Locale,
} from "@/i18n/config"
import { cn } from "@/lib/utils"

interface AuthLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function AuthLayout({
  children,
  params,
}: AuthLayoutProps) {
  const { locale: localeParam } = await params

  if (!isValidLocale(localeParam)) {
    notFound()
  }

  const locale: Locale = localeParam
  const direction = getDirection(locale)

  return (
    <div
      dir={direction}
      className={cn(
        "min-h-svh bg-background",
        locale === "fa"
          ? "font-[family-name:var(--font-vazirmatn)]"
          : "font-[family-name:var(--font-geist)]",
      )}
    >
      {children}
    </div>
  )
}
