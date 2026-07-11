import { notFound } from "next/navigation"

import {
  get_account_profile,
  get_account_sessions,
  get_api_tokens,
  get_dashboard_page_copy,
  get_notification_preferences,
  get_ssh_keys,
} from "@/actions"
import { AccountSettings } from "@/components/dashboard/account-settings"
import { PortalPageHeader } from "@/components/dashboard/dashboard-ui"
import { isValidLocale, type Locale } from "@/i18n/config"

interface AccountPageProps {
  params: Promise<{ locale: string }>
}

export default async function AccountPage({ params }: AccountPageProps) {
  const { locale: localeParam } = await params

  if (!isValidLocale(localeParam)) {
    notFound()
  }

  const locale: Locale = localeParam
  const isRTL = locale === "fa"
  const [profile, ssh_keys, api_tokens, sessions, notification_preferences, copy] =
    await Promise.all([
      get_account_profile(),
      get_ssh_keys(),
      get_api_tokens(),
      get_account_sessions(),
      get_notification_preferences(),
      get_dashboard_page_copy(locale),
    ])

  return (
    <div>
      <PortalPageHeader
        title={copy.account.title}
        subtitle={copy.account.subtitle}
        isRTL={isRTL}
      />
      <AccountSettings
        profile={profile}
        ssh_keys={ssh_keys}
        api_tokens={api_tokens}
        sessions={sessions}
        notification_preferences={notification_preferences}
        copy={copy.account}
        locale={locale}
      />
    </div>
  )
}
