"use client"

import Link from "next/link"

import { Accordion, AccordionItem } from "@/components/animate-ui/accordion"
import { Reveal, TextReveal } from "@/components/fx/reveal"
import type { Locale } from "@/i18n/config"
import { localizePathname } from "@/i18n/routing"
import { BRAND } from "@/lib/brand"
import { cn } from "@/lib/utils"

import { HomeSectionLabel } from "./home-section-label"

const FAQ_ITEMS = {
  en: [
    {
      id: "deploy",
      q: "How fast can I deploy?",
      a: `After payment confirmation, most instances reach Running within ${BRAND.deploy_minutes_typical} minutes. Credentials are emailed and shown in your dashboard.`,
    },
    {
      id: "scale",
      q: "Can I scale resources later?",
      a: "Yes. Resize CPU, RAM, and storage from your dashboard. Storage can only increase — downgrades are not supported.",
    },
    {
      id: "billing",
      q: "How does billing work?",
      a: "Monthly invoices in Toman via Iranian payment gateways. No hidden fees. Cancel anytime with no long-term contract.",
    },
    {
      id: "support",
      q: "What support is included?",
      a: `Persian and English support ${BRAND.support_hours_en}. First response within ${BRAND.support_response_hours} business hours on all plans.`,
    },
  ],
  fa: [
    {
      id: "deploy",
      q: "چقدر سریع می‌توانم مستقر کنم؟",
      a: `پس از تأیید پرداخت، بیشتر سرورها ظرف ${BRAND.deploy_minutes_typical.toLocaleString("fa-IR")} دقیقه به وضعیت Running می‌رسند. اطلاعات دسترسی در داشبورد و ایمیل ارسال می‌شود.`,
    },
    {
      id: "scale",
      q: "آیا بعداً می‌توانم منابع را افزایش دهم؟",
      a: "بله. CPU، RAM و ذخیره‌سازی را از داشبورد تغییر دهید. فقط افزایش storage پشتیبانی می‌شود.",
    },
    {
      id: "billing",
      q: "صورتحساب چگونه است؟",
      a: "صورتحساب ماهانه به تومان از درگاه‌های پرداخت ایرانی. بدون هزینه پنهان. هر زمان بدون قرارداد بلندمدت لغو کنید.",
    },
    {
      id: "support",
      q: "چه پشتیبانی شامل می‌شود؟",
      a: `پشتیبانی فارسی و انگلیسی، ${BRAND.support_hours_fa}. پاسخ اولیه تا ${BRAND.support_response_hours.toLocaleString("fa-IR")} ساعت کاری در همه پلن‌ها.`,
    },
  ],
}

const COPY = {
  en: {
    index: "06",
    label: "FAQ",
    title: "Questions, answered.",
    more: "View all questions",
  },
  fa: {
    index: "۰۶",
    label: "سوالات",
    title: "پاسخ سوالات شما.",
    more: "مشاهده همه سوالات",
  },
}

export function HomeFaqTeaser({ locale }: { locale: Locale }) {
  const copy = COPY[locale]
  const items = FAQ_ITEMS[locale]
  const isRTL = locale === "fa"

  return (
    <section className="border-t border-border bg-muted/30 py-28 lg:py-40">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <Reveal>
          <HomeSectionLabel index={copy.index}>{copy.label}</HomeSectionLabel>
        </Reveal>
        <h2
          className={cn(
            "mt-6 text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.02em]",
            isRTL && "font-[family-name:var(--font-vazirmatn)]",
          )}
        >
          <TextReveal text={copy.title} as="span" />
        </h2>

        <Accordion className="mt-14" defaultValue={items[0]?.id}>
          {items.map((item) => (
            <AccordionItem key={item.id} id={item.id} title={item.q}>
              {item.a}
            </AccordionItem>
          ))}
        </Accordion>

        <Reveal delay={0.15}>
          <Link
            href={localizePathname("/faq", locale)}
            className="mt-10 inline-block text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            {copy.more}
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
