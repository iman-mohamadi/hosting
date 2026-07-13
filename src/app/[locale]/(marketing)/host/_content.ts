import type { HostProductContent } from "@/components/sections/product/host-product-view"
import type { Locale } from "@/i18n/config"
import type { HostingType, LocationId } from "@/lib/catalog"

/** Route slug for each hosting type. */
export const HOST_SLUG: Record<HostingType, string> = {
  linux: "linux",
  wordpress: "wordpress",
  woocommerce: "woocommerce",
  download: "download-host",
  reseller: "reseller",
  "high-traffic": "high-traffic",
}

export const HOST_LOCATIONS: Record<HostingType, LocationId[]> = {
  linux: ["iran", "europe"],
  wordpress: ["iran", "europe"],
  woocommerce: ["iran", "europe"],
  download: ["iran", "europe"],
  reseller: ["iran"],
  "high-traffic": ["iran", "europe"],
}

export const HOST_META: Record<HostingType, { title: Record<Locale, string>; description: Record<Locale, string> }> = {
  linux: {
    title: { fa: "هاست لینوکس", en: "Linux Hosting" },
    description: {
      fa: "هاست لینوکس با کنترل‌پنل ساده، SSL رایگان و پشتیبان‌گیری روزانه در موقعیت ایران و اروپا.",
      en: "Linux hosting with a simple control panel, free SSL, and daily backups in Iran and Europe.",
    },
  },
  wordpress: {
    title: { fa: "هاست وردپرس", en: "WordPress Hosting" },
    description: {
      fa: "هاست وردپرس بهینه با LiteSpeed، نصب یک‌کلیکی و بک‌آپ خودکار برای بیشترین سرعت.",
      en: "Optimized WordPress hosting with LiteSpeed, one-click install, and automatic backups.",
    },
  },
  woocommerce: {
    title: { fa: "هاست ووکامرس", en: "WooCommerce Hosting" },
    description: {
      fa: "میزبانی ووکامرس با منابع بیشتر و کش پیشرفته برای فروشگاه‌های اینترنتی سریع و پایدار.",
      en: "WooCommerce hosting with extra resources and advanced caching for fast, stable stores.",
    },
  },
  download: {
    title: { fa: "هاست دانلود", en: "Download Hosting" },
    description: {
      fa: "هاست دانلود با فضای بالا و پهنای باند نامحدود برای ارائه فایل و رسانه پرحجم.",
      en: "Download hosting with large storage and unlimited bandwidth for heavy files and media.",
    },
  },
  reseller: {
    title: { fa: "هاست نمایندگی", en: "Reseller Hosting" },
    description: {
      fa: "هاست نمایندگی با پنل WHM، امکان ساخت اکانت نامحدود و برندسازی برای شروع کسب‌وکار میزبانی.",
      en: "Reseller hosting with WHM, unlimited account creation, and white-label branding.",
    },
  },
  "high-traffic": {
    title: { fa: "هاست پربازدید", en: "High-Traffic Hosting" },
    description: {
      fa: "هاست پربازدید با CPU و رم بالا برای سایت‌هایی که ترافیک و بار سنگین دارند.",
      en: "High-traffic hosting with high CPU and RAM for demanding, busy sites.",
    },
  },
}

const SHARED_FA = {
  primaryCta: "مشاهده پلن‌ها",
  secondaryCta: "مشاوره رایگان",
  plansEyebrow: "پلن‌ها",
  addLabel: "افزودن به سبد",
  perMonth: "/ ماه",
  recommendedLabel: "پیشنهاد ما",
  featuresEyebrow: "امکانات و مشخصات",
  faqEyebrow: "سوالات متداول",
  relatedTitle: "سرویس‌های مرتبط",
}

const SHARED_EN = {
  primaryCta: "View plans",
  secondaryCta: "Free consultation",
  plansEyebrow: "Plans",
  addLabel: "Add to cart",
  perMonth: "/ mo",
  recommendedLabel: "Recommended",
  featuresEyebrow: "Features",
  faqEyebrow: "FAQ",
  relatedTitle: "Related services",
}

export const HOST_CONTENT: Record<HostingType, Record<Locale, HostProductContent>> = {
  /* ------------------------------- Linux -------------------------------- */
  linux: {
    fa: {
      ...SHARED_FA,
      eyebrow: "هاست لینوکس",
      title: "هاست لینوکس،",
      titleAccent: "ساده و پایدار",
      subtitle:
        "میزبانی وب روی سرورهای لینوکس با کنترل‌پنل ساده، SSL رایگان و پشتیبان‌گیری روزانه. انتخابی مطمئن برای وب‌سایت‌های شخصی، شرکتی و فروشگاهی.",
      stats: [
        { value: "cPanel", label: "کنترل‌پنل ساده" },
        { value: "SSL", label: "گواهی رایگان" },
        { value: "روزانه", label: "بک‌آپ خودکار" },
        { value: "۲۴/۷", label: "پشتیبانی فارسی" },
      ],
      plansTitle: "پلن هاست لینوکس خود را انتخاب کنید",
      plansSubtitle: "موقعیت ایران یا اروپا و دوره پرداخت دلخواه را انتخاب کنید.",
      featuresTitle: "امکانات کامل میزبانی لینوکس",
      featuresSubtitle: "همه پلن‌ها با ابزارهای مدیریت سایت و بدون هزینه پنهان.",
      features: [
        { icon: "ssl", title: "SSL رایگان", body: "نصب خودکار گواهی معتبر برای همه دامنه‌ها و ساب‌دامنه‌ها." },
        { icon: "backup", title: "بک‌آپ روزانه", body: "نسخه پشتیبان خودکار با بازگردانی سریع و یک‌کلیکی." },
        { icon: "ssh", title: "دسترسی SSH", body: "اجرای دستور و مدیریت فایل از طریق ترمینال امن." },
        { icon: "dns", title: "مدیریت DNS", body: "افزودن و ویرایش رکوردها با کنترل‌پنل ساده." },
        { icon: "mail", title: "ایمیل روی دامنه", body: "ساخت صندوق‌های ایمیل اختصاصی روی دامنه شما." },
      ],
      faqTitle: "پرسش‌های پرتکرار درباره هاست لینوکس",
      faq: [
        { question: "چه کنترل‌پنلی ارائه می‌شود؟", answer: "کنترل‌پنل ساده و فارسی‌شده برای مدیریت فایل‌ها، دیتابیس، ایمیل و DNS در اختیار شماست." },
        { question: "امکان ارتقای پلن وجود دارد؟", answer: "بله، هر زمان بدون قطعی سرویس می‌توانید به پلن بالاتر ارتقا دهید." },
        { question: "انتقال سایت رایگان است؟", answer: "بله، تیم پشتیبانی سایت شما را از هر میزبان دیگری به‌صورت رایگان منتقل می‌کند." },
      ],
      related: [
        { label: "هاست وردپرس", href: "/host/wordpress" },
        { label: "هاست ابری", href: "/host/cloud-host" },
        { label: "ثبت دامنه", href: "/domain" },
        { label: "گواهی SSL", href: "/ssl" },
      ],
    },
    en: {
      ...SHARED_EN,
      eyebrow: "Linux hosting",
      title: "Linux hosting,",
      titleAccent: "simple and stable",
      subtitle:
        "Web hosting on Linux servers with a simple control panel, free SSL, and daily backups. A reliable choice for personal, business, and store sites.",
      stats: [
        { value: "cPanel", label: "Simple panel" },
        { value: "SSL", label: "Free cert" },
        { value: "Daily", label: "Auto backups" },
        { value: "24/7", label: "Support" },
      ],
      plansTitle: "Choose your Linux hosting plan",
      plansSubtitle: "Pick an Iran or Europe location and a billing period.",
      featuresTitle: "Full Linux hosting toolkit",
      featuresSubtitle: "Every plan ships with site tools and no hidden fees.",
      features: [
        { icon: "ssl", title: "Free SSL", body: "Auto-installed valid certificates for all domains and subdomains." },
        { icon: "backup", title: "Daily backups", body: "Automatic snapshots with fast one-click restore." },
        { icon: "ssh", title: "SSH access", body: "Run commands and manage files over a secure terminal." },
        { icon: "dns", title: "DNS management", body: "Add and edit records in a simple control panel." },
        { icon: "mail", title: "Email on your domain", body: "Create dedicated mailboxes on your domain." },
      ],
      faqTitle: "Common questions about Linux hosting",
      faq: [
        { question: "Which control panel do I get?", answer: "A simple panel to manage files, databases, email, and DNS." },
        { question: "Can I upgrade?", answer: "Yes — move to a higher plan any time with no downtime." },
        { question: "Is migration free?", answer: "Yes — our team migrates your site from any host for free." },
      ],
      related: [
        { label: "WordPress hosting", href: "/host/wordpress" },
        { label: "Cloud hosting", href: "/host/cloud-host" },
        { label: "Register a domain", href: "/domain" },
        { label: "SSL certificate", href: "/ssl" },
      ],
    },
  },

  /* ------------------------------ WordPress ----------------------------- */
  wordpress: {
    fa: {
      ...SHARED_FA,
      eyebrow: "هاست وردپرس",
      title: "هاست وردپرس،",
      titleAccent: "سریع و بهینه",
      subtitle:
        "میزبانی مخصوص وردپرس با وب‌سرور LiteSpeed، نصب یک‌کلیکی و کش پیشرفته. سایتتان سریع بالا می‌آید و زیر بار پایدار می‌ماند.",
      stats: [
        { value: "LiteSpeed", label: "وب‌سرور پرسرعت" },
        { value: "یک‌کلیک", label: "نصب وردپرس" },
        { value: "Staging", label: "محیط آزمایشی" },
        { value: "SSL", label: "گواهی رایگان" },
      ],
      plansTitle: "پلن هاست وردپرس خود را انتخاب کنید",
      plansSubtitle: "موقعیت ایران یا اروپا و دوره پرداخت دلخواه را انتخاب کنید.",
      featuresTitle: "بهینه‌شده برای وردپرس",
      featuresSubtitle: "هرچه برای یک سایت وردپرسی سریع و امن لازم دارید.",
      features: [
        { icon: "speed", title: "کش LiteSpeed", body: "کش سطح سرور و بهینه‌سازی تصاویر برای بارگذاری سریع." },
        { icon: "cloud", title: "نصب یک‌کلیکی", body: "راه‌اندازی وردپرس و افزونه‌های پرکاربرد تنها با یک کلیک." },
        { icon: "backup", title: "بک‌آپ خودکار", body: "نسخه پشتیبان روزانه با بازگردانی سریع." },
        { icon: "shield", title: "فایروال و ضدبدافزار", body: "محافظت از ورود و اسکن خودکار فایل‌های آلوده." },
        { icon: "ssl", title: "SSL رایگان", body: "گواهی معتبر و نصب خودکار روی همه دامنه‌ها." },
      ],
      faqTitle: "پرسش‌های پرتکرار درباره هاست وردپرس",
      faq: [
        { question: "وردپرس از قبل نصب است؟", answer: "بله، می‌توانید وردپرس را با یک کلیک نصب کنید یا سایت آماده را منتقل کنید." },
        { question: "محیط آزمایشی (Staging) دارد؟", answer: "در پلن‌های بالاتر می‌توانید نسخه آزمایشی بسازید و تغییرات را پیش از انتشار تست کنید." },
        { question: "برای فروشگاه ووکامرس مناسب است؟", answer: "برای فروشگاه، هاست ووکامرس با منابع بیشتر پیشنهاد می‌شود." },
      ],
      related: [
        { label: "هاست ووکامرس", href: "/host/woocommerce" },
        { label: "هاست لینوکس", href: "/host/linux" },
        { label: "ثبت دامنه", href: "/domain" },
        { label: "گواهی SSL", href: "/ssl" },
      ],
    },
    en: {
      ...SHARED_EN,
      eyebrow: "WordPress hosting",
      title: "WordPress hosting,",
      titleAccent: "fast and optimized",
      subtitle:
        "Hosting built for WordPress with the LiteSpeed web server, one-click install, and advanced caching. Your site loads fast and stays stable under load.",
      stats: [
        { value: "LiteSpeed", label: "Fast web server" },
        { value: "1-click", label: "WP install" },
        { value: "Staging", label: "Test environment" },
        { value: "SSL", label: "Free cert" },
      ],
      plansTitle: "Choose your WordPress hosting plan",
      plansSubtitle: "Pick an Iran or Europe location and a billing period.",
      featuresTitle: "Optimized for WordPress",
      featuresSubtitle: "Everything a fast, secure WordPress site needs.",
      features: [
        { icon: "speed", title: "LiteSpeed cache", body: "Server-level caching and image optimization for fast loads." },
        { icon: "cloud", title: "One-click install", body: "Set up WordPress and popular plugins in a click." },
        { icon: "backup", title: "Automatic backups", body: "Daily snapshots with fast restore." },
        { icon: "shield", title: "Firewall & anti-malware", body: "Login protection and automatic malware scanning." },
        { icon: "ssl", title: "Free SSL", body: "Valid certificates auto-installed on every domain." },
      ],
      faqTitle: "Common questions about WordPress hosting",
      faq: [
        { question: "Is WordPress preinstalled?", answer: "You can install WordPress in one click or migrate an existing site." },
        { question: "Is there a staging environment?", answer: "Higher plans include staging to test changes before publishing." },
        { question: "Good for a WooCommerce store?", answer: "For stores we recommend WooCommerce hosting with extra resources." },
      ],
      related: [
        { label: "WooCommerce hosting", href: "/host/woocommerce" },
        { label: "Linux hosting", href: "/host/linux" },
        { label: "Register a domain", href: "/domain" },
        { label: "SSL certificate", href: "/ssl" },
      ],
    },
  },

  /* ----------------------------- WooCommerce ---------------------------- */
  woocommerce: {
    fa: {
      ...SHARED_FA,
      eyebrow: "هاست ووکامرس",
      title: "هاست ووکامرس،",
      titleAccent: "برای فروش بیشتر",
      subtitle:
        "میزبانی مخصوص فروشگاه‌های ووکامرس با منابع بیشتر و کش پیشرفته. صفحات محصول و سبد خرید سریع بارگذاری می‌شوند و زیر بار فروش پایدار می‌مانند.",
      stats: [
        { value: "ووکامرس", label: "بهینه‌شده" },
        { value: "کش شیء", label: "Redis آماده" },
        { value: "SSL", label: "پرداخت امن" },
        { value: "۲۴/۷", label: "پشتیبانی فارسی" },
      ],
      plansTitle: "پلن هاست ووکامرس خود را انتخاب کنید",
      plansSubtitle: "موقعیت ایران یا اروپا و دوره پرداخت دلخواه را انتخاب کنید.",
      featuresTitle: "زیرساخت مناسب فروشگاه اینترنتی",
      featuresSubtitle: "سرعت، امنیت و پایداری برای تجربه خرید بهتر.",
      features: [
        { icon: "speed", title: "کش پیشرفته", body: "کش شیء و صفحه برای بارگذاری سریع محصولات و سبد خرید." },
        { icon: "cpu", title: "منابع بیشتر", body: "CPU و رم بالاتر برای مدیریت همزمان چند خریدار." },
        { icon: "ssl", title: "پرداخت امن", body: "SSL رایگان برای رمزنگاری اطلاعات پرداخت مشتریان." },
        { icon: "backup", title: "بک‌آپ خودکار", body: "پشتیبان روزانه از محصولات و سفارش‌ها." },
        { icon: "shield", title: "امنیت فروشگاه", body: "فایروال و اسکن بدافزار برای محافظت از داده مشتری." },
      ],
      faqTitle: "پرسش‌های پرتکرار درباره هاست ووکامرس",
      faq: [
        { question: "تفاوت با هاست وردپرس چیست؟", answer: "هاست ووکامرس منابع و کش بیشتری دارد تا فروشگاه زیر بار سفارش‌ها پایدار بماند." },
        { question: "درگاه پرداخت ایرانی پشتیبانی می‌شود؟", answer: "بله، افزونه‌های درگاه‌های پرداخت ایرانی روی این بستر بدون مشکل اجرا می‌شوند." },
        { question: "برای چند محصول مناسب است؟", answer: "پلن رشد و بزرگ برای فروشگاه‌های پرمحصول و پرترافیک بهینه شده‌اند." },
      ],
      related: [
        { label: "هاست وردپرس", href: "/host/wordpress" },
        { label: "هاست پربازدید", href: "/host/high-traffic" },
        { label: "گواهی SSL", href: "/ssl" },
        { label: "ثبت دامنه", href: "/domain" },
      ],
    },
    en: {
      ...SHARED_EN,
      eyebrow: "WooCommerce hosting",
      title: "WooCommerce hosting,",
      titleAccent: "built to sell more",
      subtitle:
        "Hosting made for WooCommerce stores with extra resources and advanced caching. Product and cart pages load fast and stay stable under sales load.",
      stats: [
        { value: "WooCommerce", label: "Optimized" },
        { value: "Object cache", label: "Redis-ready" },
        { value: "SSL", label: "Secure checkout" },
        { value: "24/7", label: "Support" },
      ],
      plansTitle: "Choose your WooCommerce hosting plan",
      plansSubtitle: "Pick an Iran or Europe location and a billing period.",
      featuresTitle: "The right infrastructure for online stores",
      featuresSubtitle: "Speed, security, and stability for a better shopping experience.",
      features: [
        { icon: "speed", title: "Advanced caching", body: "Object and page cache for fast product and cart loads." },
        { icon: "cpu", title: "More resources", body: "Higher CPU and RAM to handle concurrent shoppers." },
        { icon: "ssl", title: "Secure checkout", body: "Free SSL to encrypt customer payment data." },
        { icon: "backup", title: "Automatic backups", body: "Daily backups of products and orders." },
        { icon: "shield", title: "Store security", body: "Firewall and malware scanning to protect customer data." },
      ],
      faqTitle: "Common questions about WooCommerce hosting",
      faq: [
        { question: "How is it different from WordPress hosting?", answer: "It has more resources and caching so the store stays stable under order load." },
        { question: "Are payment gateways supported?", answer: "Yes — payment gateway plugins run without issues on this platform." },
        { question: "How many products can it handle?", answer: "Growth and Scale plans are tuned for large catalogs and heavy traffic." },
      ],
      related: [
        { label: "WordPress hosting", href: "/host/wordpress" },
        { label: "High-traffic hosting", href: "/host/high-traffic" },
        { label: "SSL certificate", href: "/ssl" },
        { label: "Register a domain", href: "/domain" },
      ],
    },
  },

  /* ------------------------------ Download ------------------------------ */
  download: {
    fa: {
      ...SHARED_FA,
      eyebrow: "هاست دانلود",
      title: "هاست دانلود،",
      titleAccent: "فضای بالا و پرسرعت",
      subtitle:
        "میزبانی مخصوص ارائه فایل و رسانه با فضای دیسک بالا و پهنای باند نامحدود. مناسب سایت‌های دانلود، آرشیو و اشتراک فایل.",
      stats: [
        { value: "تا ۲۵۰GB", label: "فضای دیسک" },
        { value: "نامحدود", label: "پهنای باند" },
        { value: "CDN", label: "تحویل سریع" },
        { value: "۲۴/۷", label: "پشتیبانی فارسی" },
      ],
      plansTitle: "پلن هاست دانلود خود را انتخاب کنید",
      plansSubtitle: "موقعیت ایران یا اروپا و دوره پرداخت دلخواه را انتخاب کنید.",
      featuresTitle: "ساخته‌شده برای فایل‌های سنگین",
      featuresSubtitle: "فضا و پهنای باند لازم برای دانلود پایدار.",
      features: [
        { icon: "storage", title: "فضای دیسک بالا", body: "تا ۲۵۰ گیگابایت فضای SSD برای آرشیو و رسانه." },
        { icon: "speed", title: "پهنای باند نامحدود", body: "بدون نگرانی از ترافیک، فایل‌ها را ارائه دهید." },
        { icon: "cloud", title: "سازگار با CDN", body: "توزیع فایل از نزدیک‌ترین نقطه به کاربر برای سرعت بیشتر." },
        { icon: "backup", title: "بک‌آپ منظم", body: "پشتیبان‌گیری از فایل‌ها برای جلوگیری از دست‌رفتن داده." },
        { icon: "support", title: "پشتیبانی ۲۴ ساعته", body: "تیم فنی در تمام روزهای هفته پاسخگوی شماست." },
      ],
      faqTitle: "پرسش‌های پرتکرار درباره هاست دانلود",
      faq: [
        { question: "محدودیت حجم فایل دارد؟", answer: "می‌توانید فایل‌های حجیم را آپلود و ارائه دهید؛ فضا بر اساس پلن تعیین می‌شود." },
        { question: "پهنای باند واقعاً نامحدود است؟", answer: "بله، ترافیک منصفانه و بدون سقف مشخص برای ارائه فایل در نظر گرفته شده است." },
        { question: "امکان اتصال CDN هست؟", answer: "بله، می‌توانید سرویس CDN را برای تحویل سریع‌تر فایل‌ها فعال کنید." },
      ],
      related: [
        { label: "فضای ابری", href: "/cloud-storage" },
        { label: "شبکه CDN", href: "/cdn" },
        { label: "هاست لینوکس", href: "/host/linux" },
        { label: "ثبت دامنه", href: "/domain" },
      ],
    },
    en: {
      ...SHARED_EN,
      eyebrow: "Download hosting",
      title: "Download hosting,",
      titleAccent: "big and fast",
      subtitle:
        "Hosting made for serving files and media with large disk space and unlimited bandwidth. Ideal for download sites, archives, and file sharing.",
      stats: [
        { value: "Up to 250GB", label: "Disk space" },
        { value: "Unlimited", label: "Bandwidth" },
        { value: "CDN", label: "Fast delivery" },
        { value: "24/7", label: "Support" },
      ],
      plansTitle: "Choose your download hosting plan",
      plansSubtitle: "Pick an Iran or Europe location and a billing period.",
      featuresTitle: "Built for heavy files",
      featuresSubtitle: "The space and bandwidth you need for stable downloads.",
      features: [
        { icon: "storage", title: "Large disk", body: "Up to 250 GB SSD for archives and media." },
        { icon: "speed", title: "Unlimited bandwidth", body: "Serve files without worrying about traffic." },
        { icon: "cloud", title: "CDN-ready", body: "Deliver files from the nearest edge for more speed." },
        { icon: "backup", title: "Regular backups", body: "File backups to prevent data loss." },
        { icon: "support", title: "24/7 support", body: "A technical team available every day." },
      ],
      faqTitle: "Common questions about download hosting",
      faq: [
        { question: "Is there a file-size limit?", answer: "You can upload and serve large files; space depends on your plan." },
        { question: "Is bandwidth truly unlimited?", answer: "Yes — fair-use traffic with no fixed cap for serving files." },
        { question: "Can I connect a CDN?", answer: "Yes — enable the CDN service for faster file delivery." },
      ],
      related: [
        { label: "Object storage", href: "/cloud-storage" },
        { label: "CDN", href: "/cdn" },
        { label: "Linux hosting", href: "/host/linux" },
        { label: "Register a domain", href: "/domain" },
      ],
    },
  },

  /* ------------------------------ Reseller ------------------------------ */
  reseller: {
    fa: {
      ...SHARED_FA,
      eyebrow: "هاست نمایندگی",
      title: "هاست نمایندگی،",
      titleAccent: "کسب‌وکار خودت را بساز",
      subtitle:
        "با پنل WHM اکانت‌های نامحدود بسازید، پلن‌های دلخواه تعریف کنید و با برند خودتان هاست بفروشید. زیرساخت پایدار برای شروع کسب‌وکار میزبانی.",
      stats: [
        { value: "WHM", label: "پنل مدیریت" },
        { value: "برند شما", label: "White-label" },
        { value: "تا ۱۵۰", label: "اکانت" },
        { value: "۲۴/۷", label: "پشتیبانی فارسی" },
      ],
      plansTitle: "پلن هاست نمایندگی خود را انتخاب کنید",
      plansSubtitle: "دوره پرداخت دلخواه را انتخاب کنید؛ منابع بین اکانت‌های شما تقسیم می‌شود.",
      featuresTitle: "همه‌چیز برای فروش هاست",
      featuresSubtitle: "ابزارهای لازم برای مدیریت و برندسازی سرویس‌ها.",
      features: [
        { icon: "cloud", title: "پنل WHM", body: "ساخت و مدیریت اکانت‌ها با پنل حرفه‌ای و آشنا." },
        { icon: "shield", title: "برندسازی کامل", body: "ارائه سرویس با نام و لوگوی خودتان به مشتریان." },
        { icon: "cpu", title: "منابع اختصاصی", body: "CPU و رم بالا برای تقسیم میان اکانت‌ها بدون افت کیفیت." },
        { icon: "ssl", title: "SSL رایگان", body: "گواهی رایگان برای همه اکانت‌های مشتریان شما." },
        { icon: "support", title: "پشتیبانی نمایندگان", body: "تیم فنی در کنار شما برای پاسخ‌گویی به مشتریانتان." },
      ],
      faqTitle: "پرسش‌های پرتکرار درباره هاست نمایندگی",
      faq: [
        { question: "چند اکانت می‌توانم بسازم؟", answer: "تعداد اکانت بر اساس پلن تعیین می‌شود؛ در پلن‌های بالاتر می‌توانید اکانت بیشتری بسازید." },
        { question: "می‌توانم با برند خودم بفروشم؟", answer: "بله، امکان White-label کامل فراهم است و سرویس با نام شما ارائه می‌شود." },
        { question: "منابع چطور تقسیم می‌شود؟", answer: "منابع کل پلن بین اکانت‌های شما توزیع می‌شود و می‌توانید برای هر اکانت سهمیه تعیین کنید." },
      ],
      related: [
        { label: "هاست ابری", href: "/host/cloud-host" },
        { label: "سرور مجازی", href: "/vps" },
        { label: "ثبت دامنه", href: "/domain" },
        { label: "گواهی SSL", href: "/ssl" },
      ],
    },
    en: {
      ...SHARED_EN,
      eyebrow: "Reseller hosting",
      title: "Reseller hosting,",
      titleAccent: "build your own business",
      subtitle:
        "Create unlimited accounts with WHM, define your own plans, and sell hosting under your brand. Stable infrastructure to start a hosting business.",
      stats: [
        { value: "WHM", label: "Admin panel" },
        { value: "Your brand", label: "White-label" },
        { value: "Up to 150", label: "Accounts" },
        { value: "24/7", label: "Support" },
      ],
      plansTitle: "Choose your reseller hosting plan",
      plansSubtitle: "Pick a billing period; resources are shared across your accounts.",
      featuresTitle: "Everything you need to resell hosting",
      featuresSubtitle: "The tools to manage and brand your services.",
      features: [
        { icon: "cloud", title: "WHM panel", body: "Create and manage accounts with a professional, familiar panel." },
        { icon: "shield", title: "Full white-label", body: "Offer services under your own name and logo." },
        { icon: "cpu", title: "Dedicated resources", body: "High CPU and RAM to split across accounts without quality loss." },
        { icon: "ssl", title: "Free SSL", body: "Free certificates for all of your customers' accounts." },
        { icon: "support", title: "Reseller support", body: "A technical team to back you up with your customers." },
      ],
      faqTitle: "Common questions about reseller hosting",
      faq: [
        { question: "How many accounts can I create?", answer: "Account count depends on the plan; higher plans allow more accounts." },
        { question: "Can I sell under my own brand?", answer: "Yes — full white-label is available and services carry your name." },
        { question: "How are resources split?", answer: "Total plan resources are distributed across your accounts, with per-account quotas." },
      ],
      related: [
        { label: "Cloud hosting", href: "/host/cloud-host" },
        { label: "Virtual server", href: "/vps" },
        { label: "Register a domain", href: "/domain" },
        { label: "SSL certificate", href: "/ssl" },
      ],
    },
  },

  /* ---------------------------- High-traffic ---------------------------- */
  "high-traffic": {
    fa: {
      ...SHARED_FA,
      eyebrow: "هاست پربازدید",
      title: "هاست پربازدید،",
      titleAccent: "پایدار زیر بار سنگین",
      subtitle:
        "میزبانی با CPU و رم بالا برای سایت‌هایی که ترافیک و پردازش سنگین دارند. سایت شما در پیک‌های بازدید و کمپین‌ها بدون کندی و قطعی می‌ماند.",
      stats: [
        { value: "تا ۲۴ هسته", label: "پردازنده" },
        { value: "تا ۲۴GB", label: "رم" },
        { value: "۹۹٫۹٪", label: "تضمین آپتایم" },
        { value: "۲۴/۷", label: "پشتیبانی فارسی" },
      ],
      plansTitle: "پلن هاست پربازدید خود را انتخاب کنید",
      plansSubtitle: "موقعیت ایران یا اروپا و دوره پرداخت دلخواه را انتخاب کنید.",
      featuresTitle: "ساخته‌شده برای بار سنگین",
      featuresSubtitle: "منابع فراوان و پایداری بالا برای سایت‌های پرمخاطب.",
      features: [
        { icon: "cpu", title: "منابع بالا", body: "CPU و رم فراوان برای پاسخ‌گویی همزمان به کاربران زیاد." },
        { icon: "speed", title: "کش و بهینه‌سازی", body: "کش سطح سرور برای تحمل پیک‌های ترافیکی." },
        { icon: "shield", title: "محافظت DDoS", body: "فیلترینگ حملات برای پایداری در برابر ترافیک مخرب." },
        { icon: "chart", title: "پایش منابع", body: "نمودار لحظه‌ای مصرف برای مدیریت بهتر بار." },
        { icon: "support", title: "پشتیبانی اولویت‌دار", body: "رسیدگی سریع‌تر به درخواست‌های سایت‌های پرمخاطب." },
      ],
      faqTitle: "پرسش‌های پرتکرار درباره هاست پربازدید",
      faq: [
        { question: "چه زمانی به هاست پربازدید نیاز دارم؟", answer: "اگر سایت شما ترافیک بالا دارد یا در ساعات پیک کند می‌شود، این هاست منابع لازم را فراهم می‌کند." },
        { question: "برای فروشگاه بزرگ مناسب است؟", answer: "بله، برای فروشگاه‌ها و سایت‌های محتوایی پرمخاطب بهینه شده است." },
        { question: "امکان ارتقای سریع منابع هست؟", answer: "بله، در صورت رشد ترافیک می‌توانید بدون قطعی به پلن بالاتر ارتقا دهید." },
      ],
      related: [
        { label: "هاست ووکامرس", href: "/host/woocommerce" },
        { label: "سرور مجازی", href: "/vps" },
        { label: "هاست ابری", href: "/host/cloud-host" },
        { label: "شبکه CDN", href: "/cdn" },
      ],
    },
    en: {
      ...SHARED_EN,
      eyebrow: "High-traffic hosting",
      title: "High-traffic hosting,",
      titleAccent: "stable under heavy load",
      subtitle:
        "Hosting with high CPU and RAM for sites with heavy traffic and processing. Your site stays fast and online during traffic spikes and campaigns.",
      stats: [
        { value: "Up to 24 cores", label: "CPU" },
        { value: "Up to 24GB", label: "RAM" },
        { value: "99.9%", label: "Uptime target" },
        { value: "24/7", label: "Support" },
      ],
      plansTitle: "Choose your high-traffic hosting plan",
      plansSubtitle: "Pick an Iran or Europe location and a billing period.",
      featuresTitle: "Built for heavy load",
      featuresSubtitle: "Plenty of resources and high stability for busy sites.",
      features: [
        { icon: "cpu", title: "High resources", body: "Ample CPU and RAM to serve many concurrent users." },
        { icon: "speed", title: "Cache & optimization", body: "Server-level caching to absorb traffic spikes." },
        { icon: "shield", title: "DDoS protection", body: "Attack filtering for stability against malicious traffic." },
        { icon: "chart", title: "Resource monitoring", body: "Live usage graphs to manage load better." },
        { icon: "support", title: "Priority support", body: "Faster handling of requests for busy sites." },
      ],
      faqTitle: "Common questions about high-traffic hosting",
      faq: [
        { question: "When do I need high-traffic hosting?", answer: "If your site has high traffic or slows at peak hours, this provides the resources it needs." },
        { question: "Good for a large store?", answer: "Yes — it's tuned for busy stores and content sites." },
        { question: "Can I scale fast?", answer: "Yes — upgrade to a higher plan with no downtime as traffic grows." },
      ],
      related: [
        { label: "WooCommerce hosting", href: "/host/woocommerce" },
        { label: "Virtual server", href: "/vps" },
        { label: "Cloud hosting", href: "/host/cloud-host" },
        { label: "CDN", href: "/cdn" },
      ],
    },
  },
}
