import { get_auth_page_copy } from "@/actions"
import { AuthCard } from "@/components/auth/auth-card"
import { ResetPasswordForm } from "@/components/auth/reset-password-form"
import { isValidLocale, type Locale } from "@/i18n/config"
import { notFound } from "next/navigation"

interface ResetPasswordPageProps {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ token?: string }>
}

export default async function ResetPasswordPage({
  params,
  searchParams,
}: ResetPasswordPageProps) {
  const { locale: localeParam } = await params
  const { token } = await searchParams

  if (!isValidLocale(localeParam)) {
    notFound()
  }

  const locale: Locale = localeParam
  const copy = await get_auth_page_copy(locale)

  return (
    <AuthCard
      locale={locale}
      title={copy.reset_password_title}
      subtitle={copy.reset_password_subtitle}
    >
      <ResetPasswordForm
        copy={copy}
        locale={locale}
        reset_token={token?.trim() ?? ""}
      />
    </AuthCard>
  )
}
