import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { CartPageContent } from "@/components/sections/cart-page-content"
import { defaultLocale, isValidLocale, type Locale } from "@/i18n/config"
import { build_page_metadata } from "@/lib/seo"

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  return build_page_metadata(
    "cart",
    isValidLocale(locale) ? locale : defaultLocale,
    "/cart",
  )
}

export default async function CartPage({ params }: PageProps) {
  const { locale: localeParam } = await params
  if (!isValidLocale(localeParam)) notFound()
  const locale: Locale = localeParam
  return <CartPageContent locale={locale} />
}
