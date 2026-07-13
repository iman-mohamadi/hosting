"use client"



import { Reveal, TextReveal } from "@/components/fx/reveal"

import type { Locale } from "@/i18n/config"

import { BRAND } from "@/lib/brand"

import { cn } from "@/lib/utils"



import { HomeSectionLabel } from "./home-section-label"

import { useScrollSection } from "./use-scroll-section"



const COPY = {

  en: {

    index: "05",

    label: "Security",

    title: "Protected by default.",

    body: "Every instance ships with hardened baselines. Network-level DDoS mitigation, encrypted volumes, and firewall rules.",

    layers: [

      { title: "DDoS mitigation", detail: "Up to 10 Gbps scrubbing on public network" },

      { title: "Encrypted storage", detail: "AES-256 at rest on NVMe volumes" },

      { title: "Firewall rules", detail: "Granular ingress control per instance" },

      { title: "Security baseline", detail: "Hardened OS images and SSH key injection" },

    ],

  },

  fa: {

    index: "۰۵",

    label: "امنیت",

    title: "به‌صورت پیش‌فرض محافظت‌شده.",

    body: "هر نمونه با تنظیمات امنیتی سخت‌گیرانه تحویل می‌شود. کاهش DDoS در سطح شبکه، دیسک‌های رمزنگاری‌شده و قوانین فایروال.",

    layers: [

      { title: "کاهش DDoS", detail: "تا ۱۰ گیگابیت فیلتر روی شبکه عمومی" },

      { title: "ذخیره رمزنگاری‌شده", detail: "AES-256 روی دیسک‌های NVMe" },

      { title: "قوانین فایروال", detail: "کنترل دقیق ورودی برای هر سرور" },

      { title: "خط پایه امنیتی", detail: "ایمیج سخت‌گیرانه و تزریق کلید SSH" },

    ],

  },

}



export function HomeSecurity({ locale }: { locale: Locale }) {

  const copy = COPY[locale]

  const isRTL = locale === "fa"

  const { ref, progress } = useScrollSection({

    start: "top 70%",

    end: "bottom 30%",

    scrub: true,

  })



  return (

    <section

      ref={ref}

      className="relative mx-auto max-w-7xl px-6 py-32 lg:px-8 lg:py-48"

    >

      <div className="max-w-2xl">

        <Reveal>

          <HomeSectionLabel index={copy.index}>{copy.label}</HomeSectionLabel>

        </Reveal>

        <h2

          className={cn(

            "mt-6 text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.02] tracking-[-0.02em]",

            isRTL && "font-[family-name:var(--font-vazirmatn)]",

          )}

        >

          <TextReveal text={copy.title} as="span" />

        </h2>

        <Reveal delay={0.1}>

          <p className="mt-8 text-lg leading-relaxed text-muted-foreground">

            {copy.body}

          </p>

        </Reveal>

      </div>



      <div className="mt-20 space-y-0">

        {copy.layers.map((layer, i) => {

          const local = Math.min(1, Math.max(0, (progress - i * 0.15) / 0.3))

          return (

            <Reveal key={layer.title} delay={0.05 * i}>

              <div className="group flex items-baseline justify-between gap-8 border-b border-border py-7">

                <div>

                  <h3 className="text-lg font-medium text-foreground">

                    {layer.title}

                  </h3>

                  <p

                    className="mt-1 text-sm text-muted-foreground transition-opacity duration-500"

                    style={{ opacity: 0.3 + local * 0.7 }}

                  >

                    {layer.detail}

                  </p>

                </div>

                <span

                  className="font-mono text-xs text-primary transition-opacity duration-500"

                  style={{ opacity: local }}

                  aria-hidden

                >

                  {String(i + 1).padStart(2, "0")}

                </span>

              </div>

            </Reveal>

          )

        })}

      </div>

    </section>

  )

}

