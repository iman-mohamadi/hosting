"use client"

import { motion } from "framer-motion"

import type { AboutContent } from "@/actions"
import { cn } from "@/lib/utils"
import type { Locale } from "@/i18n/config"

interface AboutPageContentProps {
  content: AboutContent
  locale: Locale
}

const fadeUpVariants = {
  hidden: { opacity: 0, y: 32, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export function AboutPageContent({ content, locale }: AboutPageContentProps) {
  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px] bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,oklch(0.45_0.08_188/0.1),transparent)]"
      />

      <section className="mx-auto max-w-7xl px-6 pt-28 pb-32 lg:px-8 lg:pt-40 lg:pb-48">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
          className={cn("max-w-4xl space-y-10", "ltr:text-left rtl:text-right")}
        >
          <p className="text-xs font-medium tracking-[0.25em] text-muted-foreground uppercase">
            {content.intro_label}
          </p>

          <h1
            className={cn(
              "whitespace-pre-line text-5xl font-semibold tracking-tight text-foreground",
              "sm:text-6xl md:text-7xl lg:text-8xl lg:leading-[0.95]",
              locale === "fa" && "font-[family-name:var(--font-vazirmatn)]",
            )}
          >
            {content.page_title}
          </h1>

          <p
            className={cn(
              "max-w-3xl text-2xl leading-snug font-medium tracking-tight text-foreground/90 md:text-3xl md:leading-snug",
              locale === "fa" && "font-[family-name:var(--font-vazirmatn)]",
            )}
          >
            {content.mission_statement}
          </p>

          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl md:leading-relaxed">
            {content.mission_subtitle}
          </p>
        </motion.div>
      </section>

      <section className="border-t border-border/20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {content.pillars.map((pillar, index) => (
            <motion.article
              key={pillar.pillar_id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: fadeUpVariants.hidden,
                visible: {
                  ...fadeUpVariants.visible,
                  transition: {
                    ...fadeUpVariants.visible.transition,
                    delay: index * 0.08,
                  },
                },
              }}
              className={cn(
                "grid gap-8 border-b border-border/20 py-24 md:grid-cols-12 md:gap-16 md:py-32 lg:py-40",
                "ltr:text-left rtl:text-right",
              )}
            >
              <div className="md:col-span-4">
                <span className="font-mono text-xs tracking-widest text-muted-foreground/60">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-4 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                  {pillar.pillar_title}
                </h2>
              </div>

              <p className="max-w-prose text-base leading-[1.85] text-muted-foreground md:col-span-8 md:text-lg md:leading-[1.85]">
                {pillar.pillar_body}
              </p>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  )
}
