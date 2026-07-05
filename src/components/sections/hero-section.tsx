"use client"

import Link from "next/link"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import type { HeroData } from "@/actions"
import { cn } from "@/lib/utils"
import type { Locale } from "@/i18n/config"

interface HeroSectionProps {
  data: HeroData
  locale: Locale
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
}

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 28,
    filter: "blur(12px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
}

export function HeroSection({ data, locale }: HeroSectionProps) {
  return (
    <section className="relative z-10 flex min-h-[calc(100svh-4rem)] items-center overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent"
      />

      <motion.div
        className={cn(
          "mx-auto w-full max-w-7xl px-6 py-24 lg:px-8 lg:py-32",
          "text-center ltr:md:text-left rtl:md:text-right",
        )}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-8 inline-flex">
          <span className="rounded-full border border-border/50 bg-muted/30 px-4 py-1.5 text-xs font-medium tracking-widest text-muted-foreground uppercase backdrop-blur-sm">
            {data.badge_text}
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className={cn(
            "whitespace-pre-line text-5xl font-semibold tracking-tight text-foreground",
            "sm:text-6xl md:text-7xl lg:text-8xl lg:leading-[0.95]",
            locale === "fa" && "font-[family-name:var(--font-vazirmatn)]",
          )}
        >
          {data.main_title}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className={cn(
            "mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground",
            "ltr:md:mx-0 ltr:md:max-w-xl rtl:md:mx-0 rtl:md:max-w-xl md:text-xl",
            locale === "fa" && "font-[family-name:var(--font-vazirmatn)]",
          )}
        >
          {data.sub_description}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-12 flex flex-col items-center gap-4 sm:flex-row ltr:md:items-start rtl:md:items-start ltr:md:justify-start rtl:md:justify-start"
        >
          <Button
            asChild
            size="lg"
            className="h-11 rounded-full px-8 text-sm font-medium tracking-wide"
          >
            <Link href={data.call_to_action_href}>{data.call_to_action}</Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}
