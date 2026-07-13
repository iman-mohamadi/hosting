import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { DomainSearch } from "@/components/sections/product/domain-search"
import { ProductFaq } from "@/components/sections/product/product-faq"
import { ProductHero } from "@/components/sections/product/product-hero"
import { RelatedLinks, SectionShell } from "@/components/sections/product/section-shell"
import { defaultLocale, isValidLocale, type Locale } from "@/i18n/config"
import { DOMAIN_TLDS, format_toman } from "@/lib/catalog"
import { build_page_metadata } from "@/lib/seo"
import { cn } from "@/lib/utils"
import { DOMAIN_COPY } from "./copy"

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  return build_page_metadata(
    "domain",
    isValidLocale(locale) ? locale : defaultLocale,
    "/domain",
  )
}

export default async function DomainPage({ params }: PageProps) {
  const { locale: localeParam } = await params
  if (!isValidLocale(localeParam)) notFound()
  const locale: Locale = localeParam
  const c = DOMAIN_COPY[locale]

  return (
    <div className="relative">
      <ProductHero
        locale={locale}
        eyebrow={c.eyebrow}
        title={c.title}
        titleAccent={c.titleAccent}
        subtitle={c.subtitle}
        primaryCta={{ label: c.primaryCta, href: "#search" }}
        secondaryCta={{ label: c.secondaryCta, href: "#prices" }}
      />

      <div id="search" className="scroll-mt-24 px-6 pb-4 lg:px-8">
        <DomainSearch locale={locale} labels={c.search} />
      </div>

      <div id="prices" className="scroll-mt-24">
        <SectionShell
          locale={locale}
          eyebrow={c.pricesEyebrow}
          title={c.pricesTitle}
          subtitle={c.pricesSubtitle}
          muted
        >
          <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-sm)]">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40 text-xs tracking-wide text-muted-foreground uppercase">
                  <th className="px-5 py-3 text-start font-medium">{c.tld}</th>
                  <th className="px-5 py-3 text-center font-medium">{c.register}</th>
                  <th className="px-5 py-3 text-center font-medium">{c.renew}</th>
                  <th className="px-5 py-3 text-center font-medium">{c.transfer}</th>
                </tr>
              </thead>
              <tbody>
                {DOMAIN_TLDS.map((tld) => (
                  <tr key={tld.tld} className="border-b border-border last:border-0 hover:bg-muted/30">
                    <td className="px-5 py-3.5 text-start">
                      <span className="font-mono font-medium text-foreground" dir="ltr">
                        .{tld.tld}
                      </span>
                      {tld.popular && (
                        <span className="ms-2 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] text-primary">
                          {c.popular}
                        </span>
                      )}
                      {tld.discounted && (
                        <span className="ms-2 rounded-full bg-[color-mix(in_oklch,var(--brand-pink),transparent_85%)] px-2 py-0.5 text-[10px] text-[var(--brand-pink)]">
                          {c.discounted}
                        </span>
                      )}
                    </td>
                    <td className={cn("px-5 py-3.5 text-center tabular-nums", tld.discounted && "text-primary")}>
                      {format_toman(tld.register, locale)}
                    </td>
                    <td className="px-5 py-3.5 text-center tabular-nums text-muted-foreground">
                      {format_toman(tld.renew, locale)}
                    </td>
                    <td className="px-5 py-3.5 text-center tabular-nums text-muted-foreground">
                      {tld.transfer === null ? "—" : format_toman(tld.transfer, locale)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground">{c.pricesNote}</p>
        </SectionShell>
      </div>

      <SectionShell locale={locale} eyebrow={c.faqEyebrow} title={c.faqTitle}>
        <ProductFaq items={c.faq} />
        <div className="mt-16">
          <RelatedLinks locale={locale} title={c.relatedTitle} links={c.related} />
        </div>
      </SectionShell>
    </div>
  )
}
