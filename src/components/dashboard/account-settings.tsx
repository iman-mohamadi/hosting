"use client"

import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { Copy, Trash } from "@phosphor-icons/react"

import {
  add_ssh_key,
  change_account_password,
  create_api_token,
  delete_ssh_key,
  revoke_api_token,
  revoke_session,
  toggle_two_factor,
  update_account_profile,
  update_notification_preferences,
} from "@/actions"
import { Panel } from "@/components/dashboard/dashboard-ui"
import { Button } from "@/components/ui/button"
import { FloatingInput } from "@/components/ui/floating-input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/providers/toast-provider"
import type { Locale } from "@/i18n/config"
import { format_datetime } from "@/lib/format"
import { cn } from "@/lib/utils"
import type {
  AccountProfile,
  AccountSession,
  ApiToken,
  DashboardPageCopy,
  NotificationPreferences,
  SshKey,
} from "@/types/dashboard"

interface AccountSettingsProps {
  profile: AccountProfile
  ssh_keys: SshKey[]
  api_tokens: ApiToken[]
  sessions: AccountSession[]
  notification_preferences: NotificationPreferences
  copy: DashboardPageCopy["account"]
  locale: Locale
}

export function AccountSettings({
  profile,
  ssh_keys,
  api_tokens,
  sessions,
  notification_preferences,
  copy,
  locale,
}: AccountSettingsProps) {
  const isRTL = locale === "fa"
  const router = useRouter()
  const { show_toast } = useToast()
  const [full_name, set_full_name] = useState(profile.full_name)
  const [two_factor_enabled, set_two_factor_enabled] = useState(
    profile.two_factor_enabled,
  )
  const [current_password, set_current_password] = useState("")
  const [new_password, set_new_password] = useState("")
  const [ssh_name, set_ssh_name] = useState("")
  const [ssh_key, set_ssh_key] = useState("")
  const [token_name, set_token_name] = useState("")
  const [revealed_secret, set_revealed_secret] = useState<string | null>(null)
  const [prefs, set_prefs] = useState(notification_preferences)
  const [is_pending, start_transition] = useTransition()

  function handle_profile(event: React.FormEvent) {
    event.preventDefault()
    start_transition(async () => {
      const result = await update_account_profile(full_name)
      if (result.success) {
        show_toast({ variant: "success", title: copy.profile_success })
        router.refresh()
      }
    })
  }

  function handle_password(event: React.FormEvent) {
    event.preventDefault()
    start_transition(async () => {
      const result = await change_account_password({
        current_password,
        new_password,
      })

      if (result.success) {
        show_toast({ variant: "success", title: copy.password_success })
        set_current_password("")
        set_new_password("")
      } else {
        show_toast({ variant: "error", title: copy.password_mismatch })
      }
    })
  }

  function handle_two_factor(enabled: boolean) {
    start_transition(async () => {
      const result = await toggle_two_factor(enabled)
      if (result.success) {
        set_two_factor_enabled(result.two_factor_enabled)
      }
    })
  }

  function handle_add_ssh(event: React.FormEvent) {
    event.preventDefault()
    start_transition(async () => {
      const result = await add_ssh_key({ name: ssh_name, public_key: ssh_key })
      if (result.success) {
        show_toast({ variant: "success", title: copy.ssh_added_success })
        set_ssh_name("")
        set_ssh_key("")
        router.refresh()
      }
    })
  }

  function handle_delete_ssh(key_id: string) {
    start_transition(async () => {
      const result = await delete_ssh_key(key_id)
      if (result.success) {
        show_toast({ variant: "success", title: copy.ssh_deleted_success })
        router.refresh()
      }
    })
  }

  function handle_create_token(event: React.FormEvent) {
    event.preventDefault()
    start_transition(async () => {
      const result = await create_api_token(token_name)
      if (result.success && result.token?.secret) {
        set_revealed_secret(result.token.secret)
        show_toast({ variant: "success", title: copy.token_created_success })
        set_token_name("")
        router.refresh()
      }
    })
  }

  function handle_revoke_token(token_id: string) {
    start_transition(async () => {
      const result = await revoke_api_token(token_id)
      if (result.success) {
        router.refresh()
      }
    })
  }

  function handle_revoke_session(session_id: string) {
    start_transition(async () => {
      const result = await revoke_session(session_id)
      if (result.success) {
        show_toast({ variant: "success", title: copy.sessions_revoked_success })
        router.refresh()
      }
    })
  }

  return (
    <div className="space-y-8">
      <Panel title={copy.profile_title} isRTL={isRTL}>
        <form onSubmit={handle_profile} className="grid gap-4 sm:max-w-lg">
          <FloatingInput
            id="full-name"
            label={copy.full_name}
            value={full_name}
            onChange={set_full_name}
            disabled={is_pending}
          />
          <FloatingInput
            id="email"
            label={copy.email}
            value={profile.email_address}
            onChange={() => {}}
            disabled
          />
          <Button
            type="submit"
            variant="acid"
            size="pill"
            disabled={is_pending || !full_name.trim()}
            className={cn("w-fit", isRTL && "font-[family-name:var(--font-vazirmatn)]")}
          >
            {is_pending ? copy.saving : copy.save}
          </Button>
        </form>
      </Panel>

      <Panel title={copy.password_title} isRTL={isRTL}>
        <form onSubmit={handle_password} className="grid gap-4 sm:max-w-lg">
          <FloatingInput
            id="current-password"
            label={copy.current_password}
            type="password"
            value={current_password}
            onChange={set_current_password}
            disabled={is_pending}
          />
          <FloatingInput
            id="new-password"
            label={copy.new_password}
            type="password"
            value={new_password}
            onChange={set_new_password}
            disabled={is_pending}
          />
          <Button
            type="submit"
            variant="glass"
            size="pill"
            disabled={is_pending || !current_password || !new_password}
            className={cn("w-fit", isRTL && "font-[family-name:var(--font-vazirmatn)]")}
          >
            {is_pending ? copy.changing : copy.change_password}
          </Button>
        </form>
      </Panel>

      <Panel title={copy.two_factor_title} isRTL={isRTL}>
        <p
          className={cn(
            "mb-4 max-w-xl text-sm text-muted-foreground",
            isRTL && "font-[family-name:var(--font-vazirmatn)]",
          )}
        >
          {copy.two_factor_desc}
        </p>
        <div className="flex items-center gap-4">
          <span className="text-sm text-foreground">
            {two_factor_enabled ? copy.two_factor_on : copy.two_factor_off}
          </span>
          <Button
            type="button"
            variant={two_factor_enabled ? "glass" : "acid"}
            size="pill"
            disabled={is_pending}
            onClick={() => handle_two_factor(!two_factor_enabled)}
            className={cn(isRTL && "font-[family-name:var(--font-vazirmatn)]")}
          >
            {two_factor_enabled ? copy.two_factor_off : copy.two_factor_on}
          </Button>
        </div>
      </Panel>

      <Panel title={copy.ssh_title} isRTL={isRTL}>
        <p
          className={cn(
            "mb-4 max-w-xl text-sm text-muted-foreground",
            isRTL && "font-[family-name:var(--font-vazirmatn)]",
          )}
        >
          {copy.ssh_desc}
        </p>

        <form onSubmit={handle_add_ssh} className="mb-6 grid gap-4">
          <FloatingInput
            id="ssh-name"
            label={copy.ssh_name_placeholder}
            value={ssh_name}
            onChange={set_ssh_name}
            disabled={is_pending}
          />
          <Textarea
            value={ssh_key}
            onChange={(event) => set_ssh_key(event.target.value)}
            placeholder={copy.ssh_key_placeholder}
            disabled={is_pending}
            className="min-h-[100px] font-mono text-xs"
          />
          <Button
            type="submit"
            variant="acid"
            size="pill"
            disabled={is_pending || !ssh_name.trim() || !ssh_key.trim()}
            className={cn("w-fit", isRTL && "font-[family-name:var(--font-vazirmatn)]")}
          >
            {is_pending ? copy.ssh_adding : copy.ssh_add}
          </Button>
        </form>

        {ssh_keys.length === 0 ? (
          <p
            className={cn(
              "text-sm text-muted-foreground",
              isRTL && "font-[family-name:var(--font-vazirmatn)]",
            )}
          >
            {copy.ssh_empty}
          </p>
        ) : (
          <ul className="space-y-2">
            {ssh_keys.map((key) => (
              <li
                key={key.key_id}
                className="flex items-center justify-between gap-4 rounded-xl border border-white/10 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{key.name}</p>
                  <p className="mt-1 font-mono text-xs text-muted-foreground">
                    {key.fingerprint}
                  </p>
                </div>
                <button
                  type="button"
                  disabled={is_pending}
                  onClick={() => handle_delete_ssh(key.key_id)}
                  aria-label={copy.delete}
                  className="flex size-9 items-center justify-center rounded-full border border-white/10 text-muted-foreground hover:text-destructive disabled:opacity-50"
                >
                  <Trash className="size-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </Panel>

      <Panel title={copy.tokens_title} isRTL={isRTL}>
        <p
          className={cn(
            "mb-4 max-w-xl text-sm text-muted-foreground",
            isRTL && "font-[family-name:var(--font-vazirmatn)]",
          )}
        >
          {copy.tokens_desc}
        </p>

        {revealed_secret && (
          <div className="mb-6 rounded-xl border border-acid/30 bg-acid/10 p-4">
            <p
              className={cn(
                "mb-2 text-xs text-acid",
                isRTL && "font-[family-name:var(--font-vazirmatn)]",
              )}
            >
              {copy.token_copy_note}
            </p>
            <div className="flex items-center gap-2">
              <code className="flex-1 overflow-x-auto font-mono text-xs text-foreground">
                {revealed_secret}
              </code>
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText(revealed_secret)}
                className="flex size-9 items-center justify-center rounded-full border border-white/10 text-muted-foreground hover:text-foreground"
                aria-label="Copy"
              >
                <Copy className="size-4" />
              </button>
            </div>
          </div>
        )}

        <form
          onSubmit={handle_create_token}
          className="mb-6 flex flex-wrap items-end gap-4"
        >
          <div className="min-w-[200px] flex-1">
            <FloatingInput
              id="token-name"
              label={copy.token_name_placeholder}
              value={token_name}
              onChange={set_token_name}
              disabled={is_pending}
            />
          </div>
          <Button
            type="submit"
            variant="acid"
            size="pill"
            disabled={is_pending || !token_name.trim()}
            className={cn(isRTL && "font-[family-name:var(--font-vazirmatn)]")}
          >
            {is_pending ? copy.token_creating : copy.token_create}
          </Button>
        </form>

        {api_tokens.length === 0 ? (
          <p
            className={cn(
              "text-sm text-muted-foreground",
              isRTL && "font-[family-name:var(--font-vazirmatn)]",
            )}
          >
            {copy.token_empty}
          </p>
        ) : (
          <ul className="space-y-2">
            {api_tokens.map((token) => (
              <li
                key={token.token_id}
                className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-white/10 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {token.name}
                  </p>
                  <p className="mt-1 font-mono text-xs text-muted-foreground">
                    {token.token_preview}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {copy.token_last_used}:{" "}
                    {token.last_used_at
                      ? format_datetime(token.last_used_at, locale)
                      : copy.token_never_used}
                  </p>
                </div>
                <Button
                  type="button"
                  variant="glass"
                  size="sm"
                  disabled={is_pending}
                  onClick={() => handle_revoke_token(token.token_id)}
                  className={cn(isRTL && "font-[family-name:var(--font-vazirmatn)]")}
                >
                  {copy.revoke}
                </Button>
              </li>
            ))}
          </ul>
        )}
      </Panel>

      <Panel title={copy.sessions_title} isRTL={isRTL}>
        <p
          className={cn(
            "mb-4 max-w-xl text-sm text-muted-foreground",
            isRTL && "font-[family-name:var(--font-vazirmatn)]",
          )}
        >
          {copy.sessions_desc}
        </p>

        <ul className="space-y-2">
          {sessions.map((session) => (
            <li
              key={session.session_id}
              className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-white/10 px-4 py-3"
            >
              <div>
                <p className="text-sm font-medium text-foreground">
                  {session.device}
                  {session.is_current && (
                    <span className="ms-2 text-xs text-acid">
                      ({copy.current_session})
                    </span>
                  )}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {session.location} · {session.ip_address}
                </p>
              </div>
              {!session.is_current && (
                <Button
                  type="button"
                  variant="glass"
                  size="sm"
                  disabled={is_pending}
                  onClick={() => handle_revoke_session(session.session_id)}
                  className={cn(isRTL && "font-[family-name:var(--font-vazirmatn)]")}
                >
                  {copy.revoke_session}
                </Button>
              )}
            </li>
          ))}
        </ul>
      </Panel>

      <Panel title={copy.notifications_title} isRTL={isRTL}>
        <p
          className={cn(
            "mb-4 max-w-xl text-sm text-muted-foreground",
            isRTL && "font-[family-name:var(--font-vazirmatn)]",
          )}
        >
          {copy.notifications_desc}
        </p>
        <ul className="space-y-3">
          {(
            [
              ["billing_email", copy.notify_billing],
              ["ticket_email", copy.notify_tickets],
              ["security_email", copy.notify_security],
              ["marketing_email", copy.notify_marketing],
              ["usage_alerts", copy.notify_usage],
            ] as const
          ).map(([key, label]) => (
            <li
              key={key}
              className="flex items-center justify-between gap-4 rounded-xl border border-white/10 px-4 py-3"
            >
              <span
                className={cn(
                  "text-sm text-foreground",
                  isRTL && "font-[family-name:var(--font-vazirmatn)]",
                )}
              >
                {label}
              </span>
              <input
                type="checkbox"
                checked={prefs[key]}
                disabled={is_pending}
                onChange={(event) =>
                  set_prefs((current) => ({
                    ...current,
                    [key]: event.target.checked,
                  }))
                }
                className="size-4 accent-[oklch(0.88_0.21_128)]"
              />
            </li>
          ))}
        </ul>
        <Button
          type="button"
          variant="acid"
          size="pill"
          className="mt-4"
          disabled={is_pending}
          onClick={() => {
            start_transition(async () => {
              const result = await update_notification_preferences(prefs)
              if (result.success) {
                show_toast({
                  variant: "success",
                  title: copy.notifications_success,
                })
                router.refresh()
              }
            })
          }}
        >
          {is_pending ? copy.notifications_saving : copy.notifications_save}
        </Button>
      </Panel>
    </div>
  )
}
