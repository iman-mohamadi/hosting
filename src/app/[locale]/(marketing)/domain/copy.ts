import type { FaqItem } from "@/components/sections/product/product-faq"
import type { RelatedLink } from "@/components/sections/product/section-shell"
import type { Locale } from "@/i18n/config"

interface DomainCopy {
  eyebrow: string
  title: string
  titleAccent: string
  subtitle: string
  primaryCta: string
  secondaryCta: string
  search: {
    placeholder: string
    search: string
    available: string
    taken: string
    order: string
    perYear: string
    results_for: string
    hint: string
  }
  pricesEyebrow: string
  pricesTitle: string
  pricesSubtitle: string
  pricesNote: string
  tld: string
  register: string
  renew: string
  transfer: string
  popular: string
  discounted: string
  faqEyebrow: string
  faqTitle: string
  faq: FaqItem[]
  relatedTitle: string
  related: RelatedLink[]
}

export const DOMAIN_COPY: Record<Locale, DomainCopy> = {
  fa: {
    eyebrow: "ثبت دامنه",
    title: "دامنه دلخواهت را",
    titleAccent: "همین حالا ثبت کن",
    subtitle:
      "نام دامنه را جستجو کنید و از میان پسوندهای ir.، com.، net. و ده‌ها پسوند دیگر انتخاب کنید. فعال‌سازی آنی، مدیریت رایگان DNS و انتقال ساده.",
    primaryCta: "جستجوی دامنه",
    secondaryCta: "مشاهده قیمت‌ها",
    search: {
      placeholder: "نام دامنه مورد نظر را وارد کنید",
      search: "جستجو",
      available: "قابل ثبت",
      taken: "ثبت‌شده",
      order: "سفارش",
      perYear: "/ سال",
      results_for: "نتایج برای",
      hint: "نام را بدون www و بدون پسوند وارد کنید؛ ما همه پسوندهای محبوب را بررسی می‌کنیم.",
    },
    pricesEyebrow: "قیمت انواع دامنه",
    pricesTitle: "تعرفه ثبت، تمدید و انتقال",
    pricesSubtitle: "قیمت‌ها سالانه و به تومان است. پسوندهای تخفیف‌دار با برچسب مشخص شده‌اند.",
    pricesNote: "قیمت‌ها ممکن است بر اساس نرخ ثبت‌کننده بین‌المللی به‌روزرسانی شوند.",
    tld: "پسوند",
    register: "ثبت",
    renew: "تمدید",
    transfer: "انتقال",
    popular: "محبوب",
    discounted: "تخفیف",
    faqEyebrow: "سوالات متداول",
    faqTitle: "پرسش‌های پرتکرار درباره دامنه",
    faq: [
      { question: "پس از ثبت، دامنه چقدر طول می‌کشد تا فعال شود؟", answer: "دامنه‌های بین‌المللی معمولاً بلافاصله و دامنه ir. پس از تأیید نهایی طی چند دقیقه تا چند ساعت فعال می‌شوند." },
      { question: "آیا مدیریت DNS رایگان است؟", answer: "بله، کنترل‌پنل مدیریت DNS برای همه دامنه‌ها رایگان است و می‌توانید رکوردها را آزادانه تنظیم کنید." },
      { question: "امکان انتقال دامنه از ثبت‌کننده دیگر وجود دارد؟", answer: "بله، با داشتن کد انتقال (Auth Code) می‌توانید دامنه خود را به پارس‌کلود منتقل کنید؛ معمولاً یک سال به اعتبار دامنه اضافه می‌شود." },
      { question: "دامنه به نام چه کسی ثبت می‌شود؟", answer: "دامنه کاملاً به نام شما و با اطلاعات حساب کاربری‌تان ثبت می‌شود و مالکیت آن در اختیار شماست." },
    ],
    relatedTitle: "سرویس‌های مرتبط",
    related: [
      { label: "هاست ابری", href: "/host/cloud-host" },
      { label: "سرور مجازی", href: "/vps" },
      { label: "گواهی SSL", href: "/ssl" },
      { label: "ایمیل سازمانی", href: "/host/cloud-host" },
    ],
  },
  en: {
    eyebrow: "Register a domain",
    title: "Register the domain",
    titleAccent: "you want, now",
    subtitle:
      "Search for a name and pick from .ir, .com, .net, and dozens more. Instant activation, free DNS management, and easy transfers.",
    primaryCta: "Search domains",
    secondaryCta: "See prices",
    search: {
      placeholder: "Enter the domain name you want",
      search: "Search",
      available: "Available",
      taken: "Taken",
      order: "Order",
      perYear: "/ yr",
      results_for: "Results for",
      hint: "Enter the name without www or an extension — we check every popular TLD.",
    },
    pricesEyebrow: "Domain pricing",
    pricesTitle: "Registration, renewal & transfer rates",
    pricesSubtitle: "Prices are annual, in Toman. Discounted extensions are flagged.",
    pricesNote: "Prices may update based on the international registrar rate.",
    tld: "TLD",
    register: "Register",
    renew: "Renew",
    transfer: "Transfer",
    popular: "Popular",
    discounted: "Deal",
    faqEyebrow: "FAQ",
    faqTitle: "Common questions about domains",
    faq: [
      { question: "How long until a domain is active?", answer: "International domains are usually instant; .ir activates within minutes to a few hours after final approval." },
      { question: "Is DNS management free?", answer: "Yes — the DNS control panel is free for all domains and you can set records freely." },
      { question: "Can I transfer a domain in?", answer: "Yes — with an Auth Code you can transfer your domain to ParsCloud; a year is typically added to its validity." },
      { question: "Whose name is the domain under?", answer: "The domain is registered fully under your name and account — you own it." },
    ],
    relatedTitle: "Related services",
    related: [
      { label: "Cloud hosting", href: "/host/cloud-host" },
      { label: "Virtual server", href: "/vps" },
      { label: "SSL certificate", href: "/ssl" },
      { label: "Business email", href: "/host/cloud-host" },
    ],
  },
}
