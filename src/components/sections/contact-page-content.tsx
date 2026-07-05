"use client"

import { motion } from "framer-motion"

import type { ContactPageCopy } from "@/actions"
import { ContactForm } from "@/components/sections/contact-form"
import { cn } from "@/lib/utils"
import type { Locale } from "@/i18n/config"

interface ContactPageContentProps {
  copy: ContactPageCopy
  locale: Locale
}

export function ContactPageContent({ copy, locale }: ContactPageContentProps) {
  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(ellipse_70%_55%_at_50%_-10%,oklch(0.45_0.08_188/0.12),transparent)]"
      />

      <div className="mx-auto max-w-7xl px-6 pt-24 pb-32 lg:px-8 lg:pt-32 lg:pb-40">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 xl:gap-32">
          <motion.div
            initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className={cn("space-y-10", "ltr:text-left rtl:text-right")}
          >
            <h1
              className={cn(
                "whitespace-pre-line text-5xl font-semibold tracking-tight text-foreground",
                "sm:text-6xl md:text-7xl md:leading-[1.0]",
                locale === "fa" && "font-[family-name:var(--font-vazirmatn)]",
              )}
            >
              {copy.page_title}
            </h1>

            <p className="max-w-md text-lg leading-relaxed text-muted-foreground md:text-xl md:leading-relaxed">
              {copy.page_subtitle}
            </p>

            <dl className="space-y-6 border-t border-border/20 pt-10">
              <div className="space-y-1">
                <dt className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
                  {copy.response_time_label}
                </dt>
                <dd className="text-sm text-foreground">{copy.response_time_value}</dd>
              </div>
              <div className="space-y-1">
                <dt className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
                  {copy.support_email_label}
                </dt>
                <dd>
                  <a
                    href={`mailto:${copy.support_email_value}`}
                    className="text-sm text-foreground transition-opacity hover:opacity-70"
                    dir="ltr"
                  >
                    {copy.support_email_value}
                  </a>
                </dd>
              </div>
            </dl>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.85,
              delay: 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <ContactForm copy={copy} locale={locale} />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
