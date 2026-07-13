import type { FeatureItem } from "@/components/sections/product/feature-grid"
import type { FaqItem } from "@/components/sections/product/product-faq"
import type { ProductHeroStat } from "@/components/sections/product/product-hero"
import type { RelatedLink } from "@/components/sections/product/section-shell"
import type { Locale } from "@/i18n/config"

interface VpsCopy {
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
  tableLabels: {
    perMonth: string
    order: string
    plan: string
    cpu: string
    ram: string
    disk: string
    traffic: string
    price: string
  }
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

export const VPS_COPY: Record<Locale, VpsCopy> = {
  fa: {
    eyebrow: "سرور مجازی · VPS",
    title: "سرور مجازی با منابع",
    titleAccent: "تضمین‌شده",
    subtitle:
      "سرور مجازی لینوکس، ویندوز و میکروتیک در دیتاسنترهای ایران و اروپا. پردازنده و رم اختصاصی، دیسک NVMe و دسترسی روت کامل؛ ظرف چند دقیقه تحویل بگیرید.",
    primaryCta: "مشاهده پلن‌ها",
    secondaryCta: "پیکربندی دلخواه",
    stats: [
      { value: "۵ موقعیت", label: "ایران و خارج" },
      { value: "root", label: "دسترسی کامل" },
      { value: "KVM", label: "مجازی‌سازی واقعی" },
      { value: "< ۱۰ دقیقه", label: "تحویل سرور" },
    ],
    plansEyebrow: "پلن‌های VPS",
    plansTitle: "سرور مجازی خود را انتخاب کنید",
    plansSubtitle:
      "ابتدا موقعیت و سیستم‌عامل را انتخاب کنید؛ سپس پلن متناسب با منابع مورد نیاز خود را سفارش دهید.",
    tableLabels: {
      perMonth: "/ ماه",
      order: "سفارش",
      plan: "پلن",
      cpu: "پردازنده",
      ram: "رم",
      disk: "دیسک",
      traffic: "ترافیک",
      price: "قیمت",
    },
    featuresEyebrow: "ویژگی‌ها",
    featuresTitle: "چرا سرور مجازی پارس‌کلود؟",
    featuresSubtitle: "زیرساختی پایدار برای اجرای اپلیکیشن، سایت و سرویس‌های شما.",
    features: [
      { icon: "cpu", title: "منابع اختصاصی", body: "پردازنده و رم تضمین‌شده روی بستر KVM، بدون همسایه پر سر و صدا." },
      { icon: "storage", title: "دیسک NVMe", body: "خواندن و نوشتن فوق‌سریع برای بوت و پاسخ‌گویی کم‌تأخیر." },
      { icon: "shield", title: "محافظت DDoS", body: "فیلترینگ حملات در لبه شبکه برای پایداری همیشگی سرویس." },
      { icon: "speed", title: "ارتقای آنی منابع", body: "هر زمان به منابع بیشتر نیاز داشتید، بدون نصب مجدد ارتقا دهید." },
      { icon: "backup", title: "اسنپ‌شات و بک‌آپ", body: "تهیه نسخه لحظه‌ای از سرور و بازگردانی سریع در مواقع نیاز." },
      { icon: "support", title: "پشتیبانی ۲۴ ساعته", body: "تیم فنی فارسی‌زبان در تمام روزهای هفته کنار شماست." },
    ],
    faqEyebrow: "سوالات متداول",
    faqTitle: "پرسش‌های پرتکرار درباره VPS",
    faq: [
      { question: "می‌توانم هر زمان منابع را ارتقا دهم؟", answer: "بله، پردازنده، رم و دیسک به‌صورت آنی و بدون نصب مجدد سیستم‌عامل قابل افزایش هستند." },
      { question: "تفاوت VPS لینوکس و ویندوز چیست؟", answer: "لینوکس سبک‌تر و برای وب و اپلیکیشن مناسب است؛ ویندوز برای نرم‌افزارهای مبتنی بر ویندوز و ریموت‌دسکتاپ کاربرد دارد و شامل هزینه لایسنس می‌شود." },
      { question: "تفاوت سرور ایران و خارج در چیست؟", answer: "سرور ایران کمترین تأخیر را برای کاربران داخلی دارد؛ سرور خارج برای دسترسی بین‌المللی و ترافیک بالاتر مناسب است." },
      { question: "دسترسی روت داده می‌شود؟", answer: "بله، کنترل کامل و دسترسی روت/ادمین از لحظه تحویل در اختیار شماست." },
    ],
    relatedTitle: "سرویس‌های مرتبط",
    related: [
      { label: "سرور ابری", href: "/cloud-server" },
      { label: "سرور اختصاصی", href: "/dedicated-servers" },
      { label: "هاست ابری", href: "/host/cloud-host" },
      { label: "ثبت دامنه", href: "/domain" },
    ],
  },
  en: {
    eyebrow: "Virtual server · VPS",
    title: "Virtual servers with",
    titleAccent: "guaranteed resources",
    subtitle:
      "Linux, Windows, and MikroTik VPS in Iran and Europe. Dedicated CPU and RAM, NVMe disk, and full root access — delivered in minutes.",
    primaryCta: "View plans",
    secondaryCta: "Custom configure",
    stats: [
      { value: "5 locations", label: "Iran & abroad" },
      { value: "root", label: "Full access" },
      { value: "KVM", label: "True virtualization" },
      { value: "< 10 min", label: "Delivery" },
    ],
    plansEyebrow: "VPS plans",
    plansTitle: "Choose your virtual server",
    plansSubtitle: "Pick a location and OS first, then order the plan that matches your resources.",
    tableLabels: {
      perMonth: "/ mo",
      order: "Order",
      plan: "Plan",
      cpu: "CPU",
      ram: "RAM",
      disk: "Disk",
      traffic: "Traffic",
      price: "Price",
    },
    featuresEyebrow: "Features",
    featuresTitle: "Why ParsCloud VPS?",
    featuresSubtitle: "Stable infrastructure to run your apps, sites, and services.",
    features: [
      { icon: "cpu", title: "Dedicated resources", body: "Guaranteed CPU and RAM on KVM — no noisy neighbors." },
      { icon: "storage", title: "NVMe disk", body: "Ultra-fast reads and writes for quick boots and low latency." },
      { icon: "shield", title: "DDoS protection", body: "Edge attack filtering keeps your service always available." },
      { icon: "speed", title: "Instant scaling", body: "Add resources any time with no reinstall." },
      { icon: "backup", title: "Snapshots & backups", body: "Point-in-time snapshots with fast restore when needed." },
      { icon: "support", title: "24/7 support", body: "A technical team available every day of the week." },
    ],
    faqEyebrow: "FAQ",
    faqTitle: "Common questions about VPS",
    faq: [
      { question: "Can I upgrade resources any time?", answer: "Yes — CPU, RAM, and disk scale instantly with no OS reinstall." },
      { question: "Linux vs Windows VPS?", answer: "Linux is lighter and ideal for web and apps; Windows suits Windows software and remote desktop and includes a license fee." },
      { question: "Iran vs foreign servers?", answer: "Iran servers give the lowest latency for local users; foreign servers suit international access and higher traffic." },
      { question: "Do I get root access?", answer: "Yes — full root/admin control from the moment of delivery." },
    ],
    relatedTitle: "Related services",
    related: [
      { label: "Cloud server", href: "/cloud-server" },
      { label: "Dedicated server", href: "/dedicated-servers" },
      { label: "Cloud hosting", href: "/host/cloud-host" },
      { label: "Register a domain", href: "/domain" },
    ],
  },
}
