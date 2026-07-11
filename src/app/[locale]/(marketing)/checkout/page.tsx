import type { Metadata } from "next"

import { get_checkout_page_copy } from "@/actions"
import { CheckoutPageContent } from "@/components/sections/checkout-page-content"
import { defaultLocale, isValidLocale, type Locale } from "@/i18n/config"
import { build_page_metadata } from "@/lib/seo"
import { notFound } from "next/navigation"

interface CheckoutPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({
  params,
}: CheckoutPageProps): Promise<Metadata> {
  const { locale } = await params
  return build_page_metadata(
    "checkout",
    isValidLocale(locale) ? locale : defaultLocale,
    "/checkout",
  )
}

export default async function CheckoutPage({ params }: CheckoutPageProps) {
  const { locale: localeParam } = await params

  if (!isValidLocale(localeParam)) {
    notFound()
  }

  const locale: Locale = localeParam
  const copy = await get_checkout_page_copy(locale)

  return <CheckoutPageContent copy={copy} locale={locale} />
}
