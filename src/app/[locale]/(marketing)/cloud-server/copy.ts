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

export const CLOUD_SERVER_COPY: Record<Locale, ServerPageCopy> = {
  fa: {
    eyebrow: "سرور ابری",
    title: "سرور ابری،",
    titleAccent: "مقیاس‌پذیر و آنی",
    subtitle:
      "سرور ابری با منابع تضمین‌شده روی NVMe که در چند دقیقه تحویل می‌گیرید و هر لحظه می‌توانید ارتقا دهید. اسنپ‌شات، آی‌پی اختصاصی و API برای خودکارسازی.",
    primaryCta: "مشاهده پلن‌ها",
    secondaryCta: "پیکربندی دلخواه",
    stats: [
      { value: "< ۵ دقیقه", label: "تحویل سرور" },
      { value: "NVMe", label: "دیسک پرسرعت" },
      { value: "اسنپ‌شات", label: "نسخه لحظه‌ای" },
      { value: "API", label: "خودکارسازی" },
    ],
    plansEyebrow: "پلن‌های سرور ابری",
    plansTitle: "سرور ابری خود را انتخاب کنید",
    plansSubtitle: "موقعیت و دوره پرداخت را انتخاب کنید؛ منابع هر زمان قابل ارتقا هستند.",
    addLabel: "افزودن به سبد",
    perMonth: "/ ماه",
    recommendedLabel: "پیشنهاد ما",
    featuresEyebrow: "ویژگی‌ها",
    featuresTitle: "چرا سرور ابری پارس‌کلود؟",
    featuresSubtitle: "زیرساخت منعطف برای رشد بدون محدودیت.",
    features: [
      { icon: "speed", title: "ارتقای آنی", body: "افزایش CPU، رم و دیسک بدون نصب مجدد و بدون قطعی." },
      { icon: "backup", title: "اسنپ‌شات و بک‌آپ", body: "تهیه نسخه لحظه‌ای از سرور و بازگردانی سریع." },
      { icon: "shield", title: "محافظت DDoS", body: "فیلترینگ حملات در لبه شبکه برای پایداری همیشگی." },
      { icon: "cloud", title: "API و خودکارسازی", body: "مدیریت و ساخت سرور از طریق API و ابزارهای زیرساخت‌به‌کد." },
      { icon: "cpu", title: "منابع اختصاصی", body: "هسته و حافظه تضمین‌شده روی بستر KVM." },
      { icon: "support", title: "پشتیبانی ۲۴ ساعته", body: "تیم فنی فارسی‌زبان در تمام روزهای هفته." },
    ],
    faqEyebrow: "سوالات متداول",
    faqTitle: "پرسش‌های پرتکرار درباره سرور ابری",
    faq: [
      { question: "تفاوت سرور ابری با سرور مجازی چیست؟", answer: "سرور ابری روی زیرساخت ابری با قابلیت ارتقای آنی و اسنپ‌شات اجرا می‌شود و برای بارهای کاری متغیر مناسب‌تر است." },
      { question: "می‌توانم منابع را کم و زیاد کنم؟", answer: "بله، در هر زمان می‌توانید منابع را ارتقا دهید؛ تغییرات بدون نصب مجدد اعمال می‌شود." },
      { question: "سیستم‌عامل قابل انتخاب است؟", answer: "بله، می‌توانید توزیع‌های لینوکس یا ویندوز را هنگام تحویل انتخاب کنید." },
    ],
    relatedTitle: "سرویس‌های مرتبط",
    related: [
      { label: "سرور مجازی", href: "/vps" },
      { label: "سرور اختصاصی", href: "/dedicated-servers" },
      { label: "هاست ابری", href: "/host/cloud-host" },
      { label: "فضای ابری", href: "/cloud-storage" },
    ],
  },
  en: {
    eyebrow: "Cloud server",
    title: "Cloud servers,",
    titleAccent: "scalable and instant",
    subtitle:
      "Cloud servers with guaranteed NVMe resources, delivered in minutes and scalable any time. Snapshots, dedicated IPs, and an API for automation.",
    primaryCta: "View plans",
    secondaryCta: "Custom configure",
    stats: [
      { value: "< 5 min", label: "Delivery" },
      { value: "NVMe", label: "Fast disk" },
      { value: "Snapshots", label: "Point-in-time" },
      { value: "API", label: "Automation" },
    ],
    plansEyebrow: "Cloud server plans",
    plansTitle: "Choose your cloud server",
    plansSubtitle: "Pick a location and billing period; resources scale any time.",
    addLabel: "Add to cart",
    perMonth: "/ mo",
    recommendedLabel: "Recommended",
    featuresEyebrow: "Features",
    featuresTitle: "Why ParsCloud cloud servers?",
    featuresSubtitle: "Flexible infrastructure to grow without limits.",
    features: [
      { icon: "speed", title: "Instant scaling", body: "Increase CPU, RAM, and disk with no reinstall or downtime." },
      { icon: "backup", title: "Snapshots & backups", body: "Point-in-time server snapshots with fast restore." },
      { icon: "shield", title: "DDoS protection", body: "Edge attack filtering for constant availability." },
      { icon: "cloud", title: "API & automation", body: "Build and manage servers via API and infra-as-code tools." },
      { icon: "cpu", title: "Dedicated resources", body: "Guaranteed cores and memory on KVM." },
      { icon: "support", title: "24/7 support", body: "A technical team available every day." },
    ],
    faqEyebrow: "FAQ",
    faqTitle: "Common questions about cloud servers",
    faq: [
      { question: "Cloud server vs VPS?", answer: "Cloud servers run on cloud infrastructure with instant scaling and snapshots, better for variable workloads." },
      { question: "Can I scale up and down?", answer: "Yes — upgrade resources any time; changes apply without a reinstall." },
      { question: "Can I choose the OS?", answer: "Yes — pick a Linux distro or Windows at delivery." },
    ],
    relatedTitle: "Related services",
    related: [
      { label: "Virtual server", href: "/vps" },
      { label: "Dedicated server", href: "/dedicated-servers" },
      { label: "Cloud hosting", href: "/host/cloud-host" },
      { label: "Object storage", href: "/cloud-storage" },
    ],
  },
}
