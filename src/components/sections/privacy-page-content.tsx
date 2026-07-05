"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

import type { PrivacyContent } from "@/actions"
import { cn } from "@/lib/utils"
import type { Locale } from "@/i18n/config"

interface PrivacyPageContentProps {
  content: PrivacyContent
  locale: Locale
}

export function PrivacyPageContent({
  content,
  locale,
}: PrivacyPageContentProps) {
  const [active_section, set_active_section] = useState(
    content.policy_sections[0]?.section_id ?? "",
  )

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    content.policy_sections.forEach((section) => {
      const element = document.getElementById(section.section_id)
      if (!element) {
        return
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            set_active_section(section.section_id)
          }
        },
        { rootMargin: "-20% 0px -60% 0px", threshold: 0 },
      )

      observer.observe(element)
      observers.push(observer)
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [content.policy_sections])

  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[400px] bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,oklch(0.45_0.08_188/0.08),transparent)]"
      />

      <div className="mx-auto max-w-7xl px-6 pt-24 pb-32 lg:px-8 lg:pt-32 lg:pb-40">
        <motion.header
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className={cn("mb-20 max-w-2xl space-y-4", "ltr:text-left rtl:text-right")}
        >
          <h1
            className={cn(
              "whitespace-pre-line text-4xl font-semibold tracking-tight text-foreground md:text-5xl",
              locale === "fa" && "font-[family-name:var(--font-vazirmatn)]",
            )}
          >
            {content.page_title}
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            {content.page_subtitle}
          </p>
          <p className="text-xs tracking-wide text-muted-foreground/70 uppercase">
            {content.last_updated_date}
          </p>
        </motion.header>

        <div className="grid gap-16 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-24 xl:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <nav
              aria-label={content.toc_label}
              className={cn(
                "rounded-2xl border border-border/30 bg-card/10 p-4 backdrop-blur-sm lg:border-0 lg:bg-transparent lg:p-0",
                "ltr:text-left rtl:text-right",
              )}
            >
              <p className="mb-6 text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
                {content.toc_label}
              </p>

              <ul className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0">
                {content.policy_sections.map((section) => {
                  const is_active = active_section === section.section_id

                  return (
                    <li key={section.section_id} className="shrink-0 lg:shrink">
                      <a
                        href={`#${section.section_id}`}
                        className={cn(
                          "block rounded-lg px-3 py-2 text-sm transition-colors duration-300",
                          "whitespace-nowrap lg:whitespace-normal",
                          is_active
                            ? "bg-muted/40 text-foreground"
                            : "text-muted-foreground hover:text-foreground",
                        )}
                      >
                        {section.section_heading}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </aside>

          <div className="min-w-0 space-y-20 ltr:text-left rtl:text-right">
            {content.policy_sections.map((section, index) => (
              <motion.section
                key={section.section_id}
                id={section.section_id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="scroll-mt-28"
              >
                <h2
                  className={cn(
                    "mb-6 text-xl font-semibold tracking-tight text-foreground md:text-2xl",
                    locale === "fa" && "font-[family-name:var(--font-vazirmatn)]",
                  )}
                >
                  {section.section_heading}
                </h2>
                <p className="max-w-prose text-base leading-[1.9] text-muted-foreground md:text-[1.05rem] md:leading-[1.9]">
                  {section.section_content}
                </p>
              </motion.section>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
