"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  GlobeHemisphereWest,
  Lightning,
  ShieldCheck,
} from "@phosphor-icons/react"

import { EvervaultCard } from "@/components/animate-ui/evervault-card"
import { Reveal, TextReveal } from "@/components/fx/reveal"
import type { Locale } from "@/i18n/config"
import { EASE_OUT_EXPO } from "@/lib/motion"
import { cn } from "@/lib/utils"

import { HomeSectionLabel } from "./home-section-label"

const COPY = {
  en: {
    index: "03",
    label: "Core Pillars",
    title: "Three truths. Zero noise.",
    pillars: [
      {
        id: "infra",
        title: "Infrastructure",
        blurb: "Tehran, Isfahan, and EU backup. One dashboard.",
        detail:
          "Deploy close to Iranian users with local routing. Status and incidents are published openly on our status page.",
        Icon: GlobeHemisphereWest,
      },
      {
        id: "perf",
        title: "Performance",
        blurb: "KVM on NVMe. Dedicated vCPU. No overselling.",
        detail:
          "Instances provision on Ryzen and Intel hosts with local NVMe. Resources are guaranteed — not shared lottery cores.",
        Icon: Lightning,
      },
      {
        id: "sec",
        title: "Security",
        blurb: "DDoS filtering, encrypted volumes, firewall rules.",
        detail:
          "Network-level mitigation, AES-256 volumes at rest, and per-instance firewall rules included on every plan.",
        Icon: ShieldCheck,
      },
    ],
  },
  fa: {
    index: "۰۳",
    label: "ارکان اصلی",
    title: "سه حقیقت. بدون شلوغی.",
    pillars: [
      {
        id: "infra",
        title: "زیرساخت",
        blurb: "تهران، اصفهان و پشتیبان اروپا. یک داشبورد.",
        detail:
          "نزدیک کاربران ایرانی مستقر شوید. وضعیت و حوادث به‌صورت عمومی در صفحه وضعیت سرویس منتشر می‌شود.",
        Icon: GlobeHemisphereWest,
      },
      {
        id: "perf",
        title: "عملکرد",
        blurb: "KVM روی NVMe. vCPU اختصاصی. بدون overselling.",
        detail:
          "سرورها روی میزبان‌های Ryzen و Intel با NVMe محلی provision می‌شوند. منابع تضمین‌شده‌اند — نه هسته اشتراکی.",
        Icon: Lightning,
      },
      {
        id: "sec",
        title: "امنیت",
        blurb: "فیلتر DDoS، دیسک رمزنگاری‌شده، قوانین فایروال.",
        detail:
          "کاهش حمله در سطح شبکه، AES-256 برای دیسک در حالت سکون و فایروال هر نمونه در همه پلن‌ها.",
        Icon: ShieldCheck,
      },
    ],
  },
}

export function HomeCorePillars({ locale }: { locale: Locale }) {
  const copy = COPY[locale]
  const isRTL = locale === "fa"
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <section className="mx-auto max-w-7xl px-6 py-28 lg:px-8 lg:py-40">
      <Reveal>
        <HomeSectionLabel index={copy.index}>{copy.label}</HomeSectionLabel>
      </Reveal>
      <h2
        className={cn(
          "mt-6 max-w-2xl text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.02] tracking-[-0.02em]",
          isRTL && "font-[family-name:var(--font-vazirmatn)]",
        )}
      >
        <TextReveal text={copy.title} as="span" />
      </h2>

      <div className="mt-16 grid gap-4 md:grid-cols-3">
        {copy.pillars.map((pillar, i) => {
          const open = expanded === pillar.id
          return (
            <Reveal key={pillar.id} delay={0.06 * i}>
              <EvervaultCard
                expanded={open}
                onToggle={() => setExpanded(open ? null : pillar.id)}
                className="min-h-[280px]"
              >
                <div className="flex h-full flex-col">
                  <pillar.Icon
                    weight="duotone"
                    className="size-10 text-primary"
                  />
                  <h3 className="mt-8 text-xl font-semibold tracking-tight">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {pillar.blurb}
                  </p>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.p
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
                        className="mt-4 overflow-hidden border-t border-border pt-4 text-sm leading-relaxed text-foreground/80"
                      >
                        {pillar.detail}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </EvervaultCard>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
