import type { FeatureItem } from "@/components/sections/product/feature-grid"
import type { FaqItem } from "@/components/sections/product/product-faq"
import type { ProductHeroStat } from "@/components/sections/product/product-hero"
import type { RelatedLink } from "@/components/sections/product/section-shell"
import type { Locale } from "@/i18n/config"

interface ServerPageCopy {
  eyebrow: string
  title: string
  titleAccent: string
  subtitle: string
  primaryCta: string
  secondaryCta: string
  stats: ProductHeroStat[]
  plansEyebrow: string
  plansTitle: string
  plansSubtitle: string
  addLabel: string
  perMonth: string
  recommendedLabel: string
  featuresEyebrow: string
  featuresTitle: string
  featuresSubtitle: string
  features: FeatureItem[]
  faqEyebrow: string
  faqTitle: string
  faq: FaqItem[]
  relatedTitle: string
  related: RelatedLink[]
}

export const DEDICATED_COPY: Record<Locale, ServerPageCopy> = {
  fa: {
    eyebrow: "سرور اختصاصی",
    title: "سرور اختصاصی،",
    titleAccent: "قدرت کامل در اختیار شما",
    subtitle:
      "سخت‌افزار فیزیکی کاملاً اختصاصی با پردازنده‌های نسل جدید Xeon و EPYC، دیسک NVMe و پهنای باند بالا. بدون همسایه، بدون اشتراک منابع.",
    primaryCta: "مشاهده پلن‌ها",
    secondaryCta: "درخواست مشاوره",
    stats: [
      { value: "اختصاصی", label: "سخت‌افزار فیزیکی" },
      { value: "Xeon/EPYC", label: "پردازنده نسل جدید" },
      { value: "root", label: "کنترل کامل" },
      { value: "ایران/آلمان", label: "موقعیت دیتاسنتر" },
    ],
    plansEyebrow: "پلن‌های سرور اختصاصی",
    plansTitle: "سرور اختصاصی خود را انتخاب کنید",
    plansSubtitle: "موقعیت دیتاسنتر را انتخاب کنید؛ سرور به‌صورت اختصاصی به شما تحویل داده می‌شود.",
    addLabel: "افزودن به سبد",
    perMonth: "/ ماه",
    recommendedLabel: "پیشنهاد ما",
    featuresEyebrow: "ویژگی‌ها",
    featuresTitle: "چرا سرور اختصاصی پارس‌کلود؟",
    featuresSubtitle: "بالاترین کارایی و کنترل برای بارهای کاری سنگین.",
    features: [
      { icon: "cpu", title: "منابع صددرصد اختصاصی", body: "تمام هسته‌ها و حافظه فقط در اختیار شماست؛ بدون اشتراک." },
      { icon: "storage", title: "دیسک NVMe سازمانی", body: "دیسک‌های پرسرعت با امکان پیکربندی RAID." },
      { icon: "shield", title: "محافظت DDoS", body: "پاک‌سازی ترافیک مخرب پیش از رسیدن به سرور." },
      { icon: "dns", title: "آی‌پی اختصاصی", body: "بلوک آی‌پی اختصاصی و کنترل کامل شبکه." },
      { icon: "speed", title: "پورت پرسرعت", body: "اتصال شبکه پرسرعت با پهنای باند بالا." },
      { icon: "support", title: "پشتیبانی سخت‌افزاری", body: "تعویض سریع قطعات و پایش سلامت سخت‌افزار." },
    ],
    faqEyebrow: "سوالات متداول",
    faqTitle: "پرسش‌های پرتکرار درباره سرور اختصاصی",
    faq: [
      { question: "تحویل سرور اختصاصی چقدر طول می‌کشد؟", answer: "بسته به موجودی، سرورهای آماده در چند ساعت و پیکربندی‌های سفارشی طی یک تا دو روز کاری تحویل می‌شوند." },
      { question: "امکان انتخاب سیستم‌عامل و RAID هست؟", answer: "بله، هنگام سفارش می‌توانید سیستم‌عامل و آرایش دیسک (RAID) دلخواه را انتخاب کنید." },
      { question: "مدیریت سرور با کیست؟", answer: "کنترل کامل و دسترسی root با شماست؛ در صورت نیاز خدمات مدیریت‌شده نیز ارائه می‌شود." },
    ],
    relatedTitle: "سرویس‌های مرتبط",
    related: [
      { label: "سرور ابری", href: "/cloud-server" },
      { label: "سرور مجازی", href: "/vps" },
      { label: "ابر خصوصی", href: "/cloud-storage/private-cloud" },
      { label: "فضای ابری", href: "/cloud-storage" },
    ],
  },
  en: {
    eyebrow: "Dedicated server",
    title: "Dedicated servers,",
    titleAccent: "full power, all yours",
    subtitle:
      "Fully dedicated physical hardware with latest-gen Xeon and EPYC CPUs, NVMe disks, and high bandwidth. No neighbors, no shared resources.",
    primaryCta: "View plans",
    secondaryCta: "Request consultation",
    stats: [
      { value: "Dedicated", label: "Physical hardware" },
      { value: "Xeon/EPYC", label: "Latest-gen CPU" },
      { value: "root", label: "Full control" },
      { value: "Iran/Germany", label: "Datacenter" },
    ],
    plansEyebrow: "Dedicated server plans",
    plansTitle: "Choose your dedicated server",
    plansSubtitle: "Pick a datacenter location; the server is delivered exclusively to you.",
    addLabel: "Add to cart",
    perMonth: "/ mo",
    recommendedLabel: "Recommended",
    featuresEyebrow: "Features",
    featuresTitle: "Why ParsCloud dedicated servers?",
    featuresSubtitle: "Top performance and control for heavy workloads.",
    features: [
      { icon: "cpu", title: "100% dedicated resources", body: "Every core and byte of memory is yours — nothing shared." },
      { icon: "storage", title: "Enterprise NVMe", body: "Fast disks with RAID configuration options." },
      { icon: "shield", title: "DDoS protection", body: "Malicious traffic scrubbed before it reaches the server." },
      { icon: "dns", title: "Dedicated IPs", body: "A dedicated IP block and full network control." },
      { icon: "speed", title: "High-speed port", body: "Fast network uplink with high bandwidth." },
      { icon: "support", title: "Hardware support", body: "Fast part replacement and hardware health monitoring." },
    ],
    faqEyebrow: "FAQ",
    faqTitle: "Common questions about dedicated servers",
    faq: [
      { question: "How long is delivery?", answer: "Depending on stock, ready servers ship in hours and custom builds within one to two business days." },
      { question: "Can I choose OS and RAID?", answer: "Yes — pick your OS and disk (RAID) layout at order time." },
      { question: "Who manages the server?", answer: "You get full root control; managed services are available if needed." },
    ],
    relatedTitle: "Related services",
    related: [
      { label: "Cloud server", href: "/cloud-server" },
      { label: "Virtual server", href: "/vps" },
      { label: "Private cloud", href: "/cloud-storage/private-cloud" },
      { label: "Object storage", href: "/cloud-storage" },
    ],
  },
}
