import type { Locale } from "@/i18n/config"

interface CartCopy {
  eyebrow: string
  title: string
  loading: string
  emptyTitle: string
  emptyBody: string
  browseHosting: string
  browseVps: string
  stepCart: string
  stepPay: string
  stepDone: string
  remove: string
  period: string
  oneYear: string
  months: string
  decrease: string
  increase: string
  summary: string
  subtotal: string
  tax: string
  total: string
  checkout: string
  securePayment: string
  signInPrompt: string
  signIn: string
  register: string
  // Gateway
  gatewayTitle: string
  gatewayName: string
  gatewaySecure: string
  gatewayAmount: string
  gatewayRedirectNote: string
  gatewayPay: string
  gatewayProcessing: string
  back: string
  // Success
  successTitle: string
  successBody: string
  viewOrders: string
  keepShopping: string
}

export const CART_COPY: Record<Locale, CartCopy> = {
  fa: {
    eyebrow: "سبد خرید",
    title: "سبد خرید شما",
    loading: "در حال بارگذاری…",
    emptyTitle: "سبد خرید خالی است",
    emptyBody: "هنوز سرویسی انتخاب نکرده‌اید. از میان هاست، سرور و دامنه انتخاب کنید.",
    browseHosting: "مشاهده هاست‌ها",
    browseVps: "سرور مجازی",
    stepCart: "سبد",
    stepPay: "پرداخت",
    stepDone: "تکمیل",
    remove: "حذف",
    period: "دوره",
    oneYear: "ثبت یک‌ساله",
    months: "ماه",
    decrease: "کاهش",
    increase: "افزایش",
    summary: "خلاصه سفارش",
    subtotal: "جمع کل",
    tax: "مالیات بر ارزش افزوده (۱۰٪)",
    total: "مبلغ قابل پرداخت",
    checkout: "ادامه و پرداخت",
    securePayment: "پرداخت امن از طریق درگاه بانکی",
    signInPrompt: "برای ثبت سفارش وارد حساب کاربری خود شوید یا حساب جدید بسازید.",
    signIn: "ورود",
    register: "ثبت‌نام",
    gatewayTitle: "پرداخت سفارش",
    gatewayName: "درگاه پرداخت امن",
    gatewaySecure: "اتصال شما رمزنگاری‌شده و امن است",
    gatewayAmount: "مبلغ قابل پرداخت",
    gatewayRedirectNote: "با تأیید، به درگاه بانکی منتقل می‌شوید و پس از پرداخت، سرویس به‌صورت خودکار فعال می‌شود.",
    gatewayPay: "پرداخت",
    gatewayProcessing: "در حال انتقال به درگاه…",
    back: "بازگشت",
    successTitle: "پرداخت با موفقیت انجام شد",
    successBody: "سفارش شما ثبت شد و سرویس در حال آماده‌سازی است. جزئیات را در داشبورد ببینید.",
    viewOrders: "مشاهده سفارش‌ها",
    keepShopping: "ادامه خرید",
  },
  en: {
    eyebrow: "Cart",
    title: "Your cart",
    loading: "Loading…",
    emptyTitle: "Your cart is empty",
    emptyBody: "You haven't picked a service yet. Choose from hosting, servers, and domains.",
    browseHosting: "Browse hosting",
    browseVps: "Virtual servers",
    stepCart: "Cart",
    stepPay: "Payment",
    stepDone: "Done",
    remove: "Remove",
    period: "Period",
    oneYear: "1-year registration",
    months: "mo",
    decrease: "Decrease",
    increase: "Increase",
    summary: "Order summary",
    subtotal: "Subtotal",
    tax: "VAT (10%)",
    total: "Total due",
    checkout: "Continue to payment",
    securePayment: "Secure payment via bank gateway",
    signInPrompt: "Sign in or create an account to place your order.",
    signIn: "Sign in",
    register: "Register",
    gatewayTitle: "Pay for your order",
    gatewayName: "Secure payment gateway",
    gatewaySecure: "Your connection is encrypted and secure",
    gatewayAmount: "Amount due",
    gatewayRedirectNote: "On confirm you'll be taken to the bank gateway; your service activates automatically after payment.",
    gatewayPay: "Pay",
    gatewayProcessing: "Redirecting to gateway…",
    back: "Back",
    successTitle: "Payment successful",
    successBody: "Your order is placed and the service is being prepared. See details in your dashboard.",
    viewOrders: "View orders",
    keepShopping: "Keep shopping",
  },
}
