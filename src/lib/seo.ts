import type { Metadata } from "next"

import { BRAND } from "@/lib/brand"
import { defaultLocale, type Locale } from "@/i18n/config"
import { localizePathname } from "@/i18n/routing"

type PageKey =
  | "pricing"
  | "configure"
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
        "Transparent VPS plans in Toman with NVMe storage, Iranian datacenters, and included DDoS protection.",
    },
    fa: {
      title: "پلن‌ها و قیمت‌ها",
      description:
        "پلن‌های شفاف VPS با قیمت تومانی، ذخیره‌سازی NVMe، دیتاسنتر ایران و محافظت DDoS.",
    },
  },
  configure: {
    en: {
      title: "Configure",
      description:
        "Design your VPS — CPU, RAM, NVMe storage, OS, and add-ons with live Toman pricing.",
    },
    fa: {
      title: "پیکربندی",
      description:
        "سرور خود را طراحی کنید — CPU، RAM، NVMe، سیستم‌عامل و افزودنی‌ها با قیمت زنده به تومان.",
    },
  },
  about: {
    en: {
      title: "About",
      description:
        "ParsCloud provides Iranian VPS hosting with Persian support, transparent billing, and KVM on NVMe.",
    },
    fa: {
      title: "درباره ما",
      description:
        "پارس‌کلود سرور مجازی ایرانی با پشتیبانی فارسی، صورتحساب شفاف و KVM روی NVMe ارائه می‌دهد.",
    },
  },
  contact: {
    en: {
      title: "Contact",
      description:
        "Talk to our team about infrastructure, migration, or plan selection. We reply within one business day.",
    },
    fa: {
      title: "تماس با ما",
      description:
        "برای مشاوره زیرساخت، مهاجرت یا انتخاب پلن با تیم ما در تماس باشید. معمولاً در یک روز کاری پاسخ می‌دهیم.",
    },
  },
  terms: {
    en: {
      title: "Terms of Service",
      description: `The terms that govern your use of ${BRAND.name_en} services.`,
    },
    fa: {
      title: "شرایط استفاده",
      description: `شرایطی که استفاده شما از خدمات ${BRAND.name_fa} را تنظیم می‌کند.`,
    },
  },
  privacy: {
    en: {
      title: "Privacy Policy",
      description: `How ${BRAND.name_en} collects, uses, and protects your personal data.`,
    },
    fa: {
      title: "حریم خصوصی",
      description: `${BRAND.name_fa} چگونه داده‌های شخصی شما را جمع‌آوری، استفاده و محافظت می‌کند.`,
    },
  },
  status: {
    en: {
      title: "System Status",
      description:
        "Real-time platform health, uptime history, and incident reports for ParsCloud datacenters.",
    },
    fa: {
      title: "وضعیت سرویس",
      description:
        "سلامت لحظه‌ای پلتفرم، تاریخچه آپتایم و گزارش حوادث دیتاسنترهای پارس‌کلود.",
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
        "Review your VPS configuration, choose a datacenter, and submit your order.",
    },
    fa: {
      title: "تسویه و ثبت سفارش",
      description:
        "پیکربندی VPS خود را بررسی کنید، دیتاسنتر را انتخاب کنید و سفارش را ثبت کنید.",
    },
  },
  faq: {
    en: {
      title: "FAQ",
      description:
        "Answers about VPS provisioning, resizing, backups, DNS, billing in Toman, and support hours.",
    },
    fa: {
      title: "سؤالات متداول",
      description:
        "پاسخ درباره استقرار، تغییر پلن، پشتیبان‌گیری، DNS، صورتحساب تومانی و ساعات پشتیبانی.",
    },
  },
  sla: {
    en: {
      title: "Service Level Agreement",
      description: `${BRAND.uptime_target_pct}% availability target, service credits, and exclusions for ParsCloud infrastructure.`,
    },
    fa: {
      title: "تعهد سطح سرویس",
      description: `هدف دسترس‌پذیری ${BRAND.uptime_target_pct.toLocaleString("fa-IR")}٪، اعتبار سرویس و استثناهای زیرساخت پارس‌کلود.`,
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
      title: `${meta.title} · ${locale === "fa" ? BRAND.name_fa : BRAND.name_en}`,
      description: meta.description,
      url: canonical,
    },
  }
}
