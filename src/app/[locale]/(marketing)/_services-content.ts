import type { ServiceProductContent } from "@/components/sections/product/service-product-view"
import type { Locale } from "@/i18n/config"
import type { ServiceType } from "@/lib/catalog"

export const SERVICE_META: Record<ServiceType, { title: Record<Locale, string>; description: Record<Locale, string> }> = {
  ssl: {
    title: { fa: "گواهی SSL", en: "SSL Certificate" },
    description: {
      fa: "خرید گواهی SSL از نوع DV، وایلدکارت، OV و EV با صدور سریع و رمزنگاری ۲۵۶ بیتی.",
      en: "Buy DV, Wildcard, OV, and EV SSL certificates with fast issuance and 256-bit encryption.",
    },
  },
  cdn: {
    title: { fa: "شبکه توزیع محتوا (CDN)", en: "CDN" },
    description: {
      fa: "شتاب‌دهی و محافظت سایت با شبکه توزیع محتوا؛ کش لبه، فشرده‌سازی و محافظت DDoS.",
      en: "Accelerate and protect your site with a CDN — edge cache, compression, and DDoS protection.",
    },
  },
  storage: {
    title: { fa: "فضای ابری", en: "Object Storage" },
    description: {
      fa: "ذخیره‌سازی شیء سازگار با S3 برای بک‌آپ، فایل و رسانه با دسترسی امن.",
      en: "S3-compatible object storage for backups, files, and media with secure access.",
    },
  },
  "private-cloud": {
    title: { fa: "ابر خصوصی", en: "Private Cloud" },
    description: {
      fa: "استخر منابع اختصاصی و ایزوله برای اجرای چند ماشین مجازی با کنترل کامل.",
      en: "A dedicated, isolated resource pool to run multiple VMs with full control.",
    },
  },
  paas: {
    title: { fa: "پلتفرم به‌عنوان سرویس (PaaS)", en: "PaaS" },
    description: {
      fa: "اجرای اپلیکیشن بدون مدیریت سرور؛ استقرار از Git، دیتابیس مدیریت‌شده و مقیاس خودکار.",
      en: "Run apps without managing servers — Git deploys, managed databases, and auto-scaling.",
    },
  },
}

const FA = {
  primaryCta: "مشاهده پلن‌ها",
  plansEyebrow: "پلن‌ها",
  addLabel: "افزودن به سبد",
  recommendedLabel: "پیشنهاد ما",
  featuresEyebrow: "ویژگی‌ها",
  faqEyebrow: "سوالات متداول",
  relatedTitle: "سرویس‌های مرتبط",
}
const EN = {
  primaryCta: "View plans",
  plansEyebrow: "Plans",
  addLabel: "Add to cart",
  recommendedLabel: "Recommended",
  featuresEyebrow: "Features",
  faqEyebrow: "FAQ",
  relatedTitle: "Related services",
}

export const SERVICE_CONTENT: Record<ServiceType, Record<Locale, ServiceProductContent>> = {
  /* --------------------------------- SSL -------------------------------- */
  ssl: {
    fa: {
      ...FA,
      eyebrow: "گواهی SSL",
      title: "گواهی SSL،",
      titleAccent: "اعتماد و امنیت",
      subtitle:
        "با نصب گواهی SSL، ارتباط کاربران با سایت شما رمزنگاری می‌شود و نماد قفل سبز در مرورگر نمایش داده می‌شود. از سایت شخصی تا درگاه بانکی.",
      secondaryCta: "راهنمای انتخاب",
      secondaryHref: "/docs",
      stats: [
        { value: "۲۵۶ بیت", label: "رمزنگاری" },
        { value: "چند دقیقه", label: "زمان صدور" },
        { value: "🔒", label: "قفل سبز مرورگر" },
        { value: "۲۴/۷", label: "پشتیبانی فارسی" },
      ],
      titlePrefix: { fa: "گواهی", en: "" },
      plansTitle: "گواهی SSL خود را انتخاب کنید",
      plansSubtitle: "بسته به نیاز، از گواهی دامنه تا سازمانی و توسعه‌یافته انتخاب کنید.",
      featuresTitle: "چرا گواهی SSL لازم است؟",
      featuresSubtitle: "امنیت، اعتماد کاربر و بهبود رتبه در موتورهای جستجو.",
      features: [
        { icon: "ssl", title: "رمزنگاری ارتباط", body: "اطلاعات کاربران بین مرورگر و سرور رمزنگاری و از شنود محافظت می‌شود." },
        { icon: "shield", title: "افزایش اعتماد", body: "نماد قفل و گواهی معتبر، اعتماد بازدیدکننده را بالا می‌برد." },
        { icon: "chart", title: "بهبود سئو", body: "موتورهای جستجو به سایت‌های امن (HTTPS) امتیاز بیشتری می‌دهند." },
        { icon: "speed", title: "صدور سریع", body: "گواهی دامنه در چند دقیقه صادر و قابل نصب است." },
        { icon: "support", title: "پشتیبانی نصب", body: "تیم ما در نصب و فعال‌سازی گواهی کنار شماست." },
      ],
      faqTitle: "پرسش‌های پرتکرار درباره SSL",
      faq: [
        { question: "کدام نوع گواهی مناسب من است؟", answer: "برای اکثر سایت‌ها گواهی DV کافی است؛ فروشگاه‌ها و سازمان‌ها بهتر است از OV یا EV استفاده کنند و برای چند ساب‌دامنه، وایلدکارت مناسب است." },
        { question: "نصب گواهی چقدر طول می‌کشد؟", answer: "پس از صدور، نصب روی هاست یا سرور شما تنها چند دقیقه زمان می‌برد و در صورت نیاز تیم پشتیبانی انجام می‌دهد." },
        { question: "گواهی برای چند دامنه است؟", answer: "گواهی استاندارد برای یک دامنه است؛ برای پوشش همه ساب‌دامنه‌ها از وایلدکارت استفاده کنید." },
      ],
      related: [
        { label: "ثبت دامنه", href: "/domain" },
        { label: "هاست ابری", href: "/host/cloud-host" },
        { label: "شبکه CDN", href: "/cdn" },
        { label: "هاست ووکامرس", href: "/host/woocommerce" },
      ],
    },
    en: {
      ...EN,
      eyebrow: "SSL certificate",
      title: "SSL certificates,",
      titleAccent: "trust and security",
      subtitle:
        "Installing SSL encrypts the connection between users and your site and shows the green padlock in the browser. From a personal site to a bank gateway.",
      secondaryCta: "Selection guide",
      secondaryHref: "/docs",
      stats: [
        { value: "256-bit", label: "Encryption" },
        { value: "Minutes", label: "Issuance" },
        { value: "🔒", label: "Browser padlock" },
        { value: "24/7", label: "Support" },
      ],
      titlePrefix: { fa: "گواهی", en: "" },
      plansTitle: "Choose your SSL certificate",
      plansSubtitle: "From domain to organization and extended validation, pick what you need.",
      featuresTitle: "Why you need SSL",
      featuresSubtitle: "Security, user trust, and better search ranking.",
      features: [
        { icon: "ssl", title: "Encrypted connection", body: "User data between browser and server is encrypted and protected from eavesdropping." },
        { icon: "shield", title: "More trust", body: "A padlock and valid certificate raise visitor confidence." },
        { icon: "chart", title: "Better SEO", body: "Search engines favor secure (HTTPS) sites." },
        { icon: "speed", title: "Fast issuance", body: "Domain certificates are issued and installable within minutes." },
        { icon: "support", title: "Install support", body: "Our team helps you install and activate the certificate." },
      ],
      faqTitle: "Common questions about SSL",
      faq: [
        { question: "Which type do I need?", answer: "DV suits most sites; stores and organizations should use OV or EV, and Wildcard covers many subdomains." },
        { question: "How long to install?", answer: "After issuance, installation on your host or server takes minutes; support can do it if needed." },
        { question: "How many domains?", answer: "A standard certificate covers one domain; use Wildcard for all subdomains." },
      ],
      related: [
        { label: "Register a domain", href: "/domain" },
        { label: "Cloud hosting", href: "/host/cloud-host" },
        { label: "CDN", href: "/cdn" },
        { label: "WooCommerce hosting", href: "/host/woocommerce" },
      ],
    },
  },

  /* --------------------------------- CDN -------------------------------- */
  cdn: {
    fa: {
      ...FA,
      eyebrow: "شبکه توزیع محتوا",
      title: "CDN،",
      titleAccent: "سریع‌تر و امن‌تر",
      subtitle:
        "محتوای سایت شما از نزدیک‌ترین نقطه به کاربر تحویل داده می‌شود؛ نتیجه، بارگذاری سریع‌تر، مصرف کمتر سرور و محافظت در برابر حملات.",
      secondaryCta: "مشاوره رایگان",
      secondaryHref: "/contact",
      stats: [
        { value: "لبه شبکه", label: "تحویل نزدیک کاربر" },
        { value: "کش", label: "بار کمتر سرور" },
        { value: "DDoS", label: "محافظت لایه ۷" },
        { value: "SSL", label: "گواهی رایگان" },
      ],
      titlePrefix: { fa: "CDN", en: "CDN" },
      plansTitle: "پلن CDN خود را انتخاب کنید",
      plansSubtitle: "بر اساس ترافیک ماهانه سایت خود پلن مناسب را انتخاب کنید.",
      featuresTitle: "چرا از CDN استفاده کنیم؟",
      featuresSubtitle: "سرعت، پایداری و امنیت بیشتر برای بازدیدکنندگان شما.",
      features: [
        { icon: "speed", title: "بارگذاری سریع‌تر", body: "کش محتوا در لبه شبکه، زمان بارگذاری صفحات را کاهش می‌دهد." },
        { icon: "shield", title: "محافظت DDoS", body: "فیلترینگ حملات پیش از رسیدن به سرور اصلی." },
        { icon: "cloud", title: "کاهش بار سرور", body: "بخش زیادی از درخواست‌ها از کش پاسخ داده می‌شود." },
        { icon: "chart", title: "بهینه‌سازی تصاویر", body: "فشرده‌سازی و تحویل بهینه تصاویر برای سرعت بیشتر." },
        { icon: "ssl", title: "SSL رایگان", body: "ارتباط رمزنگاری‌شده روی همه نقاط شبکه." },
      ],
      faqTitle: "پرسش‌های پرتکرار درباره CDN",
      faq: [
        { question: "آیا CDN برای سایت من مفید است؟", answer: "اگر بازدیدکنندگان از مناطق مختلف دارید یا سایت شما تصویر و رسانه زیاد دارد، CDN سرعت و پایداری را به‌طور محسوس بهبود می‌دهد." },
        { question: "راه‌اندازی CDN سخت است؟", answer: "خیر، تنها با تغییر رکورد DNS دامنه، ترافیک از شبکه CDN عبور می‌کند." },
        { question: "با هر هاستی کار می‌کند؟", answer: "بله، CDN مستقل از میزبان شماست و روی هر هاست یا سروری قابل استفاده است." },
      ],
      related: [
        { label: "هاست پربازدید", href: "/host/high-traffic" },
        { label: "گواهی SSL", href: "/ssl" },
        { label: "فضای ابری", href: "/cloud-storage" },
        { label: "هاست دانلود", href: "/host/download-host" },
      ],
    },
    en: {
      ...EN,
      eyebrow: "Content delivery network",
      title: "CDN,",
      titleAccent: "faster and safer",
      subtitle:
        "Your content is delivered from the nearest edge to each user — resulting in faster loads, lower server usage, and protection against attacks.",
      secondaryCta: "Free consultation",
      secondaryHref: "/contact",
      stats: [
        { value: "Edge", label: "Near-user delivery" },
        { value: "Cache", label: "Less server load" },
        { value: "DDoS", label: "Layer-7 protection" },
        { value: "SSL", label: "Free cert" },
      ],
      titlePrefix: { fa: "CDN", en: "CDN" },
      plansTitle: "Choose your CDN plan",
      plansSubtitle: "Pick a plan based on your site's monthly traffic.",
      featuresTitle: "Why use a CDN?",
      featuresSubtitle: "More speed, stability, and security for your visitors.",
      features: [
        { icon: "speed", title: "Faster loads", body: "Edge caching cuts page load times." },
        { icon: "shield", title: "DDoS protection", body: "Attacks are filtered before reaching your origin." },
        { icon: "cloud", title: "Less server load", body: "Most requests are served from cache." },
        { icon: "chart", title: "Image optimization", body: "Compressed, optimized image delivery for more speed." },
        { icon: "ssl", title: "Free SSL", body: "Encrypted connections across every edge." },
      ],
      faqTitle: "Common questions about CDN",
      faq: [
        { question: "Is a CDN useful for my site?", answer: "If you have visitors from many regions or lots of media, a CDN noticeably improves speed and stability." },
        { question: "Is setup hard?", answer: "No — just change your domain's DNS record and traffic flows through the CDN." },
        { question: "Does it work with any host?", answer: "Yes — the CDN is host-independent and works with any host or server." },
      ],
      related: [
        { label: "High-traffic hosting", href: "/host/high-traffic" },
        { label: "SSL certificate", href: "/ssl" },
        { label: "Object storage", href: "/cloud-storage" },
        { label: "Download hosting", href: "/host/download-host" },
      ],
    },
  },

  /* ------------------------------- Storage ------------------------------ */
  storage: {
    fa: {
      ...FA,
      eyebrow: "فضای ابری",
      title: "فضای ابری،",
      titleAccent: "ذخیره‌سازی بی‌دغدغه",
      subtitle:
        "ذخیره‌سازی شیء سازگار با S3 برای بک‌آپ، فایل‌های پروژه و رسانه. با دسترسی امن، لینک اشتراک و پرداخت بر اساس مصرف.",
      secondaryCta: "مستندات API",
      secondaryHref: "/docs",
      stats: [
        { value: "S3", label: "سازگار با API" },
        { value: "امن", label: "دسترسی کنترل‌شده" },
        { value: "نسخه‌بندی", label: "حفظ تاریخچه" },
        { value: "CDN", label: "قابل اتصال" },
      ],
      titlePrefix: { fa: "فضای ابری", en: "Object Storage" },
      plansTitle: "پلن فضای ابری خود را انتخاب کنید",
      plansSubtitle: "بر اساس حجم مورد نیاز، ظرفیت مناسب را انتخاب کنید.",
      featuresTitle: "ذخیره‌سازی برای هر کاربردی",
      featuresSubtitle: "از بک‌آپ سرور تا میزبانی فایل و رسانه.",
      features: [
        { icon: "storage", title: "سازگار با S3", body: "با همه ابزارها و کتابخانه‌های S3 بدون تغییر کد کار می‌کند." },
        { icon: "shield", title: "دسترسی امن", body: "کلید دسترسی و کنترل مجوز برای هر باکت." },
        { icon: "backup", title: "مناسب بک‌آپ", body: "مقصدی پایدار برای نسخه‌های پشتیبان سرور و سایت." },
        { icon: "cloud", title: "لینک اشتراک", body: "به‌اشتراک‌گذاری فایل با لینک عمومی یا خصوصی." },
        { icon: "speed", title: "قابل اتصال به CDN", body: "تحویل سریع فایل‌ها از نزدیک‌ترین نقطه به کاربر." },
      ],
      faqTitle: "پرسش‌های پرتکرار درباره فضای ابری",
      faq: [
        { question: "با چه ابزارهایی کار می‌کند؟", answer: "با هر کلاینت یا کتابخانه سازگار با S3 مانند rclone، AWS CLI و SDKها بدون مشکل کار می‌کند." },
        { question: "برای بک‌آپ مناسب است؟", answer: "بله، مقصد ایده‌آلی برای نسخه‌های پشتیبان خودکار سرور و سایت است." },
        { question: "پرداخت چطور است؟", answer: "بر اساس ظرفیت پلن انتخابی به‌صورت ماهانه محاسبه می‌شود." },
      ],
      related: [
        { label: "ابر خصوصی", href: "/cloud-storage/private-cloud" },
        { label: "هاست دانلود", href: "/host/download-host" },
        { label: "شبکه CDN", href: "/cdn" },
        { label: "سرور ابری", href: "/cloud-server" },
      ],
    },
    en: {
      ...EN,
      eyebrow: "Object storage",
      title: "Object storage,",
      titleAccent: "worry-free",
      subtitle:
        "S3-compatible object storage for backups, project files, and media — with secure access, share links, and pay-as-you-go.",
      secondaryCta: "API docs",
      secondaryHref: "/docs",
      stats: [
        { value: "S3", label: "Compatible API" },
        { value: "Secure", label: "Controlled access" },
        { value: "Versioning", label: "Keep history" },
        { value: "CDN", label: "Connectable" },
      ],
      titlePrefix: { fa: "فضای ابری", en: "Object Storage" },
      plansTitle: "Choose your storage plan",
      plansSubtitle: "Pick the capacity you need.",
      featuresTitle: "Storage for any use",
      featuresSubtitle: "From server backups to file and media hosting.",
      features: [
        { icon: "storage", title: "S3-compatible", body: "Works with all S3 tools and libraries without code changes." },
        { icon: "shield", title: "Secure access", body: "Access keys and permission control per bucket." },
        { icon: "backup", title: "Great for backups", body: "A stable destination for server and site backups." },
        { icon: "cloud", title: "Share links", body: "Share files via public or private links." },
        { icon: "speed", title: "CDN-connectable", body: "Fast file delivery from the nearest edge." },
      ],
      faqTitle: "Common questions about object storage",
      faq: [
        { question: "What tools work with it?", answer: "Any S3-compatible client or library — rclone, AWS CLI, and SDKs — works out of the box." },
        { question: "Good for backups?", answer: "Yes — an ideal destination for automatic server and site backups." },
        { question: "How is billing?", answer: "Billed monthly based on your chosen capacity plan." },
      ],
      related: [
        { label: "Private cloud", href: "/cloud-storage/private-cloud" },
        { label: "Download hosting", href: "/host/download-host" },
        { label: "CDN", href: "/cdn" },
        { label: "Cloud server", href: "/cloud-server" },
      ],
    },
  },

  /* ----------------------------- Private cloud -------------------------- */
  "private-cloud": {
    fa: {
      ...FA,
      eyebrow: "ابر خصوصی",
      title: "ابر خصوصی،",
      titleAccent: "زیرساخت اختصاصی شما",
      subtitle:
        "استخری از منابع کاملاً ایزوله و اختصاصی که روی آن هر تعداد ماشین مجازی می‌سازید و مدیریت می‌کنید. کنترل کامل، امنیت بالا و کارایی پایدار.",
      secondaryCta: "درخواست مشاوره",
      secondaryHref: "/contact",
      stats: [
        { value: "ایزوله", label: "منابع اختصاصی" },
        { value: "چند VM", label: "روی یک استخر" },
        { value: "شبکه خصوصی", label: "ارتباط امن" },
        { value: "SLA", label: "تعهد سطح سرویس" },
      ],
      titlePrefix: { fa: "ابر خصوصی", en: "Private Cloud" },
      plansTitle: "پلن ابر خصوصی خود را انتخاب کنید",
      plansSubtitle: "منابع استخر بین ماشین‌های مجازی شما تقسیم می‌شود؛ هر زمان قابل ارتقا.",
      featuresTitle: "چرا ابر خصوصی؟",
      featuresSubtitle: "کنترل، امنیت و پایداری در مقیاس سازمانی.",
      features: [
        { icon: "cpu", title: "منابع ایزوله", body: "پردازنده و حافظه اختصاصی بدون اشتراک با دیگران." },
        { icon: "cloud", title: "چند ماشین مجازی", body: "ساخت و مدیریت VMهای متعدد روی یک استخر منابع." },
        { icon: "shield", title: "شبکه خصوصی و فایروال", body: "ارتباط امن میان ماشین‌ها و کنترل کامل ترافیک." },
        { icon: "chart", title: "پایش و مدیریت", body: "پنل مدیریت منابع و پایش لحظه‌ای مصرف." },
        { icon: "support", title: "پشتیبانی ویژه", body: "کارشناس اختصاصی و تعهد سطح سرویس." },
      ],
      faqTitle: "پرسش‌های پرتکرار درباره ابر خصوصی",
      faq: [
        { question: "تفاوت با سرور اختصاصی چیست؟", answer: "در ابر خصوصی، منابع اختصاصی به‌صورت استخر در اختیار شماست و می‌توانید چند ماشین مجازی با منابع دلخواه بسازید و ارتقا دهید." },
        { question: "می‌توانم منابع را افزایش دهم؟", answer: "بله، ظرفیت استخر هر زمان قابل ارتقا است و بین ماشین‌های شما توزیع می‌شود." },
        { question: "امنیت چگونه تأمین می‌شود؟", answer: "منابع کاملاً ایزوله، شبکه خصوصی و فایروال اختصاصی امنیت را تضمین می‌کنند." },
      ],
      related: [
        { label: "سرور اختصاصی", href: "/dedicated-servers" },
        { label: "سرور ابری", href: "/cloud-server" },
        { label: "فضای ابری", href: "/cloud-storage" },
        { label: "PaaS", href: "/paas" },
      ],
    },
    en: {
      ...EN,
      eyebrow: "Private cloud",
      title: "Private cloud,",
      titleAccent: "your dedicated infrastructure",
      subtitle:
        "A fully isolated, dedicated pool of resources on which you create and manage any number of VMs. Full control, high security, and stable performance.",
      secondaryCta: "Request consultation",
      secondaryHref: "/contact",
      stats: [
        { value: "Isolated", label: "Dedicated resources" },
        { value: "Many VMs", label: "One pool" },
        { value: "Private net", label: "Secure links" },
        { value: "SLA", label: "Service commitment" },
      ],
      titlePrefix: { fa: "ابر خصوصی", en: "Private Cloud" },
      plansTitle: "Choose your private cloud plan",
      plansSubtitle: "Pool resources are split across your VMs; scale any time.",
      featuresTitle: "Why private cloud?",
      featuresSubtitle: "Control, security, and stability at organization scale.",
      features: [
        { icon: "cpu", title: "Isolated resources", body: "Dedicated CPU and memory with no sharing." },
        { icon: "cloud", title: "Multiple VMs", body: "Create and manage many VMs on one resource pool." },
        { icon: "shield", title: "Private network & firewall", body: "Secure links between machines and full traffic control." },
        { icon: "chart", title: "Monitoring & management", body: "A resource panel with live usage monitoring." },
        { icon: "support", title: "Premium support", body: "A dedicated specialist and an SLA." },
      ],
      faqTitle: "Common questions about private cloud",
      faq: [
        { question: "How is it different from a dedicated server?", answer: "Private cloud gives you dedicated resources as a pool, so you can build and scale multiple VMs with custom resources." },
        { question: "Can I add resources?", answer: "Yes — pool capacity scales any time and is distributed across your VMs." },
        { question: "How is security handled?", answer: "Fully isolated resources, a private network, and a dedicated firewall ensure security." },
      ],
      related: [
        { label: "Dedicated server", href: "/dedicated-servers" },
        { label: "Cloud server", href: "/cloud-server" },
        { label: "Object storage", href: "/cloud-storage" },
        { label: "PaaS", href: "/paas" },
      ],
    },
  },

  /* --------------------------------- PaaS ------------------------------- */
  paas: {
    fa: {
      ...FA,
      eyebrow: "پلتفرم به‌عنوان سرویس",
      title: "PaaS،",
      titleAccent: "فقط کد را منتشر کن",
      subtitle:
        "اپلیکیشن خود را بدون درگیری با مدیریت سرور اجرا کنید. استقرار از Git، دیتابیس مدیریت‌شده، SSL خودکار و مقیاس‌پذیری بدون دردسر.",
      secondaryCta: "مستندات",
      secondaryHref: "/docs",
      stats: [
        { value: "Git", label: "استقرار خودکار" },
        { value: "دیتابیس", label: "مدیریت‌شده" },
        { value: "Auto-scale", label: "مقیاس خودکار" },
        { value: "SSL", label: "دامنه خودکار" },
      ],
      titlePrefix: { fa: "PaaS", en: "PaaS" },
      plansTitle: "پلن PaaS خود را انتخاب کنید",
      plansSubtitle: "بر اساس تعداد اپلیکیشن و منابع مورد نیاز انتخاب کنید.",
      featuresTitle: "تمرکز روی کد، نه سرور",
      featuresSubtitle: "زیرساخت را ما مدیریت می‌کنیم تا شما فقط توسعه دهید.",
      features: [
        { icon: "cloud", title: "استقرار از Git", body: "با هر push، نسخه جدید اپلیکیشن به‌صورت خودکار منتشر می‌شود." },
        { icon: "storage", title: "دیتابیس مدیریت‌شده", body: "دیتابیس آماده با بک‌آپ و به‌روزرسانی خودکار." },
        { icon: "speed", title: "مقیاس‌پذیری خودکار", body: "منابع اپلیکیشن با ترافیک کم و زیاد می‌شود." },
        { icon: "ssl", title: "SSL و دامنه خودکار", body: "گواهی و دامنه بدون تنظیم دستی فعال می‌شود." },
        { icon: "chart", title: "لاگ و پایش", body: "مشاهده لاگ‌ها و وضعیت اپلیکیشن در لحظه." },
      ],
      faqTitle: "پرسش‌های پرتکرار درباره PaaS",
      faq: [
        { question: "چه زبان‌ها و فریم‌ورک‌هایی پشتیبانی می‌شوند؟", answer: "زبان‌ها و فریم‌ورک‌های رایج مانند Node.js، PHP، Python و Docker پشتیبانی می‌شوند." },
        { question: "نیازی به مدیریت سرور دارم؟", answer: "خیر، زیرساخت، به‌روزرسانی و امنیت را ما مدیریت می‌کنیم و شما فقط کد را منتشر می‌کنید." },
        { question: "مقیاس‌پذیری چطور کار می‌کند؟", answer: "با افزایش ترافیک، منابع اپلیکیشن به‌صورت خودکار افزایش و در زمان کم‌باری کاهش می‌یابد." },
      ],
      related: [
        { label: "سرور ابری", href: "/cloud-server" },
        { label: "ابر خصوصی", href: "/cloud-storage/private-cloud" },
        { label: "فضای ابری", href: "/cloud-storage" },
        { label: "هاست ابری", href: "/host/cloud-host" },
      ],
    },
    en: {
      ...EN,
      eyebrow: "Platform as a service",
      title: "PaaS,",
      titleAccent: "just ship your code",
      subtitle:
        "Run your app without dealing with server management. Git deploys, managed databases, automatic SSL, and hassle-free scaling.",
      secondaryCta: "Docs",
      secondaryHref: "/docs",
      stats: [
        { value: "Git", label: "Auto deploy" },
        { value: "Database", label: "Managed" },
        { value: "Auto-scale", label: "Scaling" },
        { value: "SSL", label: "Auto domain" },
      ],
      titlePrefix: { fa: "PaaS", en: "PaaS" },
      plansTitle: "Choose your PaaS plan",
      plansSubtitle: "Pick by number of apps and resources you need.",
      featuresTitle: "Focus on code, not servers",
      featuresSubtitle: "We manage the infrastructure so you just build.",
      features: [
        { icon: "cloud", title: "Deploy from Git", body: "Every push automatically ships a new version of your app." },
        { icon: "storage", title: "Managed databases", body: "Ready databases with automatic backups and updates." },
        { icon: "speed", title: "Auto-scaling", body: "App resources scale up and down with traffic." },
        { icon: "ssl", title: "Automatic SSL & domain", body: "Certificates and domains activate with no manual setup." },
        { icon: "chart", title: "Logs & monitoring", body: "See logs and app status in real time." },
      ],
      faqTitle: "Common questions about PaaS",
      faq: [
        { question: "Which languages and frameworks are supported?", answer: "Common languages and frameworks like Node.js, PHP, Python, and Docker are supported." },
        { question: "Do I need to manage servers?", answer: "No — we handle infrastructure, updates, and security; you just ship code." },
        { question: "How does scaling work?", answer: "Resources increase automatically as traffic rises and decrease when idle." },
      ],
      related: [
        { label: "Cloud server", href: "/cloud-server" },
        { label: "Private cloud", href: "/cloud-storage/private-cloud" },
        { label: "Object storage", href: "/cloud-storage" },
        { label: "Cloud hosting", href: "/host/cloud-host" },
      ],
    },
  },
}
