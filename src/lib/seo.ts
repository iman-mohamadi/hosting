import type { Metadata } from "next"

import { defaultLocale, type Locale } from "@/i18n/config"
import { localizePathname } from "@/i18n/routing"

type PageKey =
  | "pricing"
  | "about"
  | "contact"
  | "terms"
  | "privacy"
  | "status"
  | "docs"
  | "checkout"
  | "faq"
  | "sla"

interface PageMeta {
  title: string
  description: string
}

const PAGE_META: Record<PageKey, Record<Locale, PageMeta>> = {
  pricing: {
    en: {
      title: "Pricing",
      description:
        "Transparent VPS plans with NVMe storage, low-latency routing, and DDoS protection. Compare tiers and pick the right fit.",
    },
    fa: {
      title: "پلن‌ها و قیمت‌ها",
      description:
        "پلن‌های شفاف VPS با NVMe Storage، Low Latency Routing و DDoS Protection. مقایسه کنید و بهترین را انتخاب کنید.",
    },
  },
  about: {
    en: {
      title: "About",
      description:
        "Hosting is built for teams that care about speed, clarity, and real control over their infrastructure.",
    },
    fa: {
      title: "درباره ما",
      description:
        "هاستینگ برای تیم‌هایی ساخته شده که به سرعت، شفافیت و کنترل واقعی زیرساخت اهمیت می‌دهند.",
    },
  },
  contact: {
    en: {
      title: "Contact",
      description:
        "Talk to us about infrastructure, migration, or plan selection. We usually reply within 24 hours.",
    },
    fa: {
      title: "تماس با ما",
      description:
        "برای مشاوره زیرساخت، مهاجرت یا انتخاب پلن با ما در تماس باشید. معمولاً در کمتر از ۲۴ ساعت پاسخ می‌دهیم.",
    },
  },
  terms: {
    en: {
      title: "Terms of Service",
      description: "The terms that govern your use of Hosting services.",
    },
    fa: {
      title: "شرایط استفاده",
      description: "شرایطی که استفاده شما از خدمات هاستینگ را تنظیم می‌کند.",
    },
  },
  privacy: {
    en: {
      title: "Privacy Policy",
      description:
        "How Hosting collects, uses, and protects your personal data.",
    },
    fa: {
      title: "حریم خصوصی",
      description:
        "هاستینگ چگونه داده‌های شخصی شما را جمع‌آوری، استفاده و محافظت می‌کند.",
    },
  },
  status: {
    en: {
      title: "System Status",
      description:
        "Real-time platform health, uptime history, and incident reports for all Hosting regions.",
    },
    fa: {
      title: "وضعیت سرویس",
      description:
        "سلامت لحظه‌ای پلتفرم، تاریخچه آپتایم و گزارش حوادث برای تمام مناطق هاستینگ.",
    },
  },
  docs: {
    en: {
      title: "Documentation",
      description:
        "Guides for deploying VPS instances, networking, backups, API access, and migrations.",
    },
    fa: {
      title: "مستندات",
      description:
        "راهنمای استقرار VPS، شبکه، پشتیبان‌گیری، API و مهاجرت.",
    },
  },
  checkout: {
    en: {
      title: "Checkout",
      description:
        "Review your VPS configuration, choose a region, and submit your deployment order.",
    },
    fa: {
      title: "تسویه و ثبت سفارش",
      description:
        "پیکربندی VPS خود را بررسی کنید، منطقه را انتخاب کنید و سفارش استقرار را ثبت کنید.",
    },
  },
  faq: {
    en: {
      title: "FAQ",
      description:
        "Answers about VPS deploy times, resizing, backups, DNS, billing, and support.",
    },
    fa: {
      title: "سؤالات متداول",
      description:
        "پاسخ درباره زمان استقرار، تغییر پلن، پشتیبان‌گیری، DNS، صورتحساب و پشتیبانی.",
    },
  },
  sla: {
    en: {
      title: "Service Level Agreement",
      description:
        "99.99% availability targets, service credits, and exclusions for Hosting infrastructure.",
    },
    fa: {
      title: "تعهد سطح سرویس",
      description:
        "اهداف دسترس‌پذیری ۹۹.۹۹٪، اعتبار سرویس و استثناهای زیرساخت هاستینگ.",
    },
  },
}

export function build_page_metadata(
  key: PageKey,
  locale: Locale,
  path: string,
): Metadata {
  const meta = PAGE_META[key][locale]
  const canonical = localizePathname(path, locale)

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical,
      languages: {
        fa: localizePathname(path, defaultLocale),
        en: localizePathname(path, "en"),
      },
    },
    openGraph: {
      title: `${meta.title} · Hosting`,
      description: meta.description,
      url: canonical,
    },
  }
}
