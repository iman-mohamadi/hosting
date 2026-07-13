import type { FeatureItem } from "@/components/sections/product/feature-grid"
import type { FaqItem } from "@/components/sections/product/product-faq"
import type { ProductHeroStat } from "@/components/sections/product/product-hero"
import type { RelatedLink } from "@/components/sections/product/section-shell"
import type { Locale } from "@/i18n/config"

interface CloudHostCopy {
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

export const CLOUD_HOST_COPY: Record<Locale, CloudHostCopy> = {
  fa: {
    eyebrow: "هاست ابری",
    title: "هاست ابری، میزبانی وب",
    titleAccent: "بدون دردسر",
    subtitle:
      "سایت خود را روی زیرساخت ابری پارس‌کلود بالا بیاورید؛ منابع تضمین‌شده، پایداری بالا و امکان ارتقای آنی هر زمان که رشد کردید. مناسب از یک وبلاگ شخصی تا فروشگاه پرمخاطب.",
    primaryCta: "مشاهده پلن‌ها",
    secondaryCta: "مشاوره رایگان",
    stats: [
      { value: "۹۹٫۹٪", label: "تضمین آپتایم" },
      { value: "< ۵ دقیقه", label: "تحویل سرویس" },
      { value: "NVMe", label: "ذخیره‌سازی پرسرعت" },
      { value: "۲۴/۷", label: "پشتیبانی فارسی" },
    ],
    plansEyebrow: "پلن‌ها",
    plansTitle: "پلن هاست ابری خود را انتخاب کنید",
    plansSubtitle:
      "موقعیت ایران یا اروپا و دوره پرداخت دلخواه را انتخاب کنید؛ قیمت‌ها لحظه‌ای به‌روز می‌شود.",
    addLabel: "افزودن به سبد",
    perMonth: "/ ماه",
    recommendedLabel: "پیشنهاد ما",
    featuresEyebrow: "امکانات و مشخصات",
    featuresTitle: "هرچه برای یک میزبانی حرفه‌ای لازم دارید",
    featuresSubtitle:
      "تمام پلن‌ها با امکانات کامل مدیریت سایت و بدون هزینه پنهان ارائه می‌شوند.",
    features: [
      { icon: "ssl", title: "گواهی SSL رایگان", body: "نصب خودکار گواهی معتبر برای همه دامنه‌ها و ساب‌دامنه‌ها." },
      { icon: "backup", title: "پشتیبان‌گیری روزانه", body: "نسخه پشتیبان خودکار روزانه با امکان بازگردانی با یک کلیک." },
      { icon: "ssh", title: "دسترسی SSH و SFTP", body: "کنترل کامل روی فایل‌ها و اجرای دستور از طریق ترمینال امن." },
      { icon: "dns", title: "مدیریت پیشرفته DNS", body: "افزودن و ویرایش رکوردها با کنترل‌پنل ساده و سریع." },
      { icon: "mail", title: "ایمیل سازمانی", body: "ساخت صندوق‌های ایمیل روی دامنه شما با فضای اختصاصی." },
      { icon: "chart", title: "نمودار مصرف منابع", body: "پایش لحظه‌ای CPU، رم و ترافیک برای تصمیم‌گیری بهتر." },
    ],
    faqEyebrow: "سوالات متداول",
    faqTitle: "پرسش‌های پرتکرار درباره هاست ابری",
    faq: [
      {
        question: "امنیت داده‌ها روی هاست ابری چطور تأمین می‌شود؟",
        answer:
          "هر سرویس روی زیرساخت ایزوله اجرا می‌شود، فایروال و اسکن بدافزار به‌صورت پیش‌فرض فعال است و از داده‌ها به‌شکل روزانه نسخه پشتیبان تهیه می‌شود.",
      },
      {
        question: "آیا می‌توانم بعداً پلن را ارتقا دهم؟",
        answer:
          "بله. منابع منعطف هستند و می‌توانید هر زمان بدون قطعی سرویس، پلن را به سطح بالاتر تغییر دهید؛ تنها تفاوت هزینه محاسبه می‌شود.",
      },
      {
        question: "امکان انتقال سایت از سرویس فعلی وجود دارد؟",
        answer:
          "تیم پشتیبانی مهاجرت رایگان سایت شما از هر میزبان دیگری را انجام می‌دهد؛ کافی است پس از خرید درخواست دهید.",
      },
      {
        question: "کدام پلن برای سایت من مناسب‌تر است؟",
        answer:
          "برای سایت‌های شخصی و شرکتی سبک پلن استارتر کافی است؛ کسب‌وکارهای در حال رشد پلن استارتاپ و فروشگاه‌ها پلن فروشگاهی را انتخاب کنند.",
      },
    ],
    relatedTitle: "سرویس‌های مرتبط",
    related: [
      { label: "هاست وردپرس", href: "/host/wordpress" },
      { label: "سرور مجازی", href: "/vps" },
      { label: "ثبت دامنه", href: "/domain" },
      { label: "گواهی SSL", href: "/ssl" },
    ],
  },
  en: {
    eyebrow: "Cloud hosting",
    title: "Cloud web hosting,",
    titleAccent: "made simple",
    subtitle:
      "Launch your site on ParsCloud's cloud platform — guaranteed resources, high stability, and instant scaling whenever you grow. From a personal blog to a busy store.",
    primaryCta: "View plans",
    secondaryCta: "Free consultation",
    stats: [
      { value: "99.9%", label: "Uptime target" },
      { value: "< 5 min", label: "Provisioning" },
      { value: "NVMe", label: "Fast storage" },
      { value: "24/7", label: "Support" },
    ],
    plansEyebrow: "Plans",
    plansTitle: "Choose your cloud hosting plan",
    plansSubtitle: "Pick an Iran or Europe location and a billing period — prices update live.",
    addLabel: "Add to cart",
    perMonth: "/ mo",
    recommendedLabel: "Recommended",
    featuresEyebrow: "Features",
    featuresTitle: "Everything a professional site needs",
    featuresSubtitle: "Every plan ships fully featured, with no hidden fees.",
    features: [
      { icon: "ssl", title: "Free SSL certificate", body: "Auto-installed valid certificates for all domains and subdomains." },
      { icon: "backup", title: "Daily backups", body: "Automatic daily snapshots with one-click restore." },
      { icon: "ssh", title: "SSH & SFTP access", body: "Full file control and shell commands over a secure terminal." },
      { icon: "dns", title: "Advanced DNS", body: "Add and edit records in a fast, simple control panel." },
      { icon: "mail", title: "Business email", body: "Create mailboxes on your domain with dedicated space." },
      { icon: "chart", title: "Resource graphs", body: "Live CPU, RAM, and traffic monitoring for better decisions." },
    ],
    faqEyebrow: "FAQ",
    faqTitle: "Common questions about cloud hosting",
    faq: [
      { question: "How is data security handled?", answer: "Every service runs on isolated infrastructure with a firewall and malware scanning enabled by default, plus daily backups." },
      { question: "Can I upgrade the plan later?", answer: "Yes. Resources are flexible — move to a higher plan any time with no downtime; you only pay the difference." },
      { question: "Can I migrate my existing site?", answer: "Our support team migrates your site from any other host for free — just request it after purchase." },
      { question: "Which plan fits my site?", answer: "Starter suits personal and light business sites; Startup fits growing businesses; Store is tuned for online shops." },
    ],
    relatedTitle: "Related services",
    related: [
      { label: "WordPress hosting", href: "/host/wordpress" },
      { label: "Virtual server", href: "/vps" },
      { label: "Register a domain", href: "/domain" },
      { label: "SSL certificate", href: "/ssl" },
    ],
  },
}
