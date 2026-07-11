import Link from "next/link"

import { MagneticButton } from "@/components/fx/magnetic-button"

export default function NotFound() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-xs tracking-[0.3em] text-acid uppercase">404</p>
      <h1 className="mt-6 text-5xl font-semibold tracking-tight text-foreground md:text-7xl">
        صفحه یافت نشد
      </h1>
      <p className="mt-2 text-lg text-muted-foreground">Page not found</p>
      <p className="mt-4 max-w-md text-sm text-muted-foreground">
        صفحه‌ای که درخواست کردید وجود ندارد یا منتقل شده است.
        <br />
        The page you requested does not exist or may have moved.
      </p>
      <MagneticButton href="/" className="mt-10">
        بازگشت به خانه · Back home
      </MagneticButton>
      <Link
        href="/status"
        className="mt-4 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        وضعیت سرویس · System status
      </Link>
    </div>
  )
}
