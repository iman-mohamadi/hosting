"use client"

import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"

import {
  destroy_instance,
  rebuild_instance,
  reset_instance_root_password,
  update_instance_hostname,
  type SelectedOs,
} from "@/actions"
import { FloatingInput } from "@/components/ui/floating-input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/providers/toast-provider"
import type { Locale } from "@/i18n/config"
import { localizePathname } from "@/i18n/routing"
import { cn } from "@/lib/utils"
import type { DashboardPageCopy, ServerInstance } from "@/types/dashboard"

const OS_OPTIONS: { value: SelectedOs; label_en: string; label_fa: string }[] = [
  { value: "ubuntu", label_en: "Ubuntu 22.04 LTS", label_fa: "اوبونتو ۲۲.۰۴ LTS" },
  { value: "arch_linux", label_en: "Arch Linux", label_fa: "آرچ لینوکس" },
  { value: "windows", label_en: "Windows Server 2022", label_fa: "ویندوز سرور ۲۰۲۲" },
]

interface SettingsTabProps {
  instance: ServerInstance
  copy: DashboardPageCopy["settings"]
  locale: Locale
}

export function SettingsTab({ instance, copy, locale }: SettingsTabProps) {
  const isRTL = locale === "fa"
  const router = useRouter()
  const { show_toast } = useToast()
  const [hostname, set_hostname] = useState(instance.hostname)
  const [selected_os, set_selected_os] = useState<SelectedOs>(instance.selected_os)
  const [temp_password, set_temp_password] = useState<string | null>(null)
  const [destroy_confirm, set_destroy_confirm] = useState("")
  const [is_pending, start_transition] = useTransition()

  function save_hostname() {
    start_transition(async () => {
      const result = await update_instance_hostname(
        instance.instance_id,
        hostname,
        locale,
      )
      if (result.success) {
        show_toast({ variant: "success", title: copy.hostname_success })
        router.refresh()
      }
    })
  }

  function reset_password() {
    start_transition(async () => {
      const result = await reset_instance_root_password(instance.instance_id)
      if (result.success && result.temporary_password) {
        set_temp_password(result.temporary_password)
        show_toast({ variant: "success", title: copy.root_password_success })
      }
    })
  }

  function rebuild() {
    start_transition(async () => {
      const result = await rebuild_instance(
        instance.instance_id,
        selected_os,
        locale,
      )
      if (result.success) {
        show_toast({ variant: "success", title: copy.rebuild_success })
        router.refresh()
      }
    })
  }

  function destroy() {
    if (destroy_confirm !== instance.hostname) {
      return
    }
    start_transition(async () => {
      const result = await destroy_instance(instance.instance_id)
      if (result.success) {
        show_toast({ variant: "success", title: copy.destroy_success })
        router.push(localizePathname("/dashboard/instances", locale))
        router.refresh()
      }
    })
  }

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-border p-6">
        <h3
          className={cn(
            "text-sm font-medium text-foreground",
            isRTL && "font-[family-name:var(--font-vazirmatn)]",
          )}
        >
          {copy.title}
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">{copy.subtitle}</p>
        <div className="mt-6 max-w-md space-y-4">
          <FloatingInput
            id="hostname"
            label={copy.hostname_label}
            value={hostname}
            onChange={set_hostname}
            disabled={is_pending}
            dir="ltr"
          />
          <Button
            type="button"
            variant="outline"
            size="pill"
            disabled={is_pending || hostname.trim() === instance.hostname}
            onClick={save_hostname}
          >
            {is_pending ? copy.hostname_saving : copy.hostname_save}
          </Button>
        </div>
      </section>

      <section className="rounded-2xl border border-border p-6">
        <h3
          className={cn(
            "text-sm font-medium text-foreground",
            isRTL && "font-[family-name:var(--font-vazirmatn)]",
          )}
        >
          {copy.root_password_title}
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">{copy.root_password_desc}</p>
        <Button
          type="button"
          variant="outline"
          size="pill"
          className="mt-4"
          disabled={is_pending}
          onClick={reset_password}
        >
          {is_pending ? copy.root_password_resetting : copy.root_password_reset}
        </Button>
        {temp_password && (
          <p className="mt-4 font-mono text-sm text-acid">
            {copy.temporary_password_label}: {temp_password}
          </p>
        )}
      </section>

      <section className="rounded-2xl border border-border p-6">
        <h3
          className={cn(
            "text-sm font-medium text-foreground",
            isRTL && "font-[family-name:var(--font-vazirmatn)]",
          )}
        >
          {copy.rebuild_title}
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">{copy.rebuild_desc}</p>
        <label className="mt-4 block text-xs text-muted-foreground">
          {copy.rebuild_os_label}
          <select
            value={selected_os}
            onChange={(event) =>
              set_selected_os(event.target.value as SelectedOs)
            }
            disabled={is_pending}
            className="mt-2 w-full max-w-md rounded-xl border border-border bg-transparent px-4 py-3 text-sm text-foreground"
          >
            {OS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {isRTL ? option.label_fa : option.label_en}
              </option>
            ))}
          </select>
        </label>
        <Button
          type="button"
          variant="outline"
          size="pill"
          className="mt-4"
          disabled={is_pending}
          onClick={rebuild}
        >
          {is_pending ? copy.rebuild_submitting : copy.rebuild_submit}
        </Button>
      </section>

      <section className="rounded-2xl border border-destructive/20 bg-destructive/[0.03] p-6">
        <h3
          className={cn(
            "text-sm font-medium text-destructive",
            isRTL && "font-[family-name:var(--font-vazirmatn)]",
          )}
        >
          {copy.destroy_title}
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">{copy.destroy_desc}</p>
        <p className="mt-3 text-xs text-muted-foreground">{copy.destroy_confirm}</p>
        <div className="mt-4 max-w-md space-y-3">
          <FloatingInput
            id="destroy_confirm"
            label={instance.hostname}
            value={destroy_confirm}
            onChange={set_destroy_confirm}
            disabled={is_pending}
            dir="ltr"
          />
          <Button
            type="button"
            variant="outline"
            size="pill"
            disabled={is_pending || destroy_confirm !== instance.hostname}
            onClick={destroy}
            className="border-destructive/40 text-destructive hover:bg-destructive/10"
          >
            {is_pending ? copy.destroy_submitting : copy.destroy_submit}
          </Button>
        </div>
      </section>
    </div>
  )
}
