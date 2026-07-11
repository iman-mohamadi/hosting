"use client"

import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"

import { update_reverse_dns } from "@/actions"
import { Panel, PanelLink } from "@/components/dashboard/dashboard-ui"
import { Button } from "@/components/ui/button"
import { FloatingInput } from "@/components/ui/floating-input"
import { useToast } from "@/components/providers/toast-provider"
import type { Locale } from "@/i18n/config"
import { localizePathname } from "@/i18n/routing"
import { cn } from "@/lib/utils"
import type {
  BlockVolume,
  DashboardPageCopy,
  FloatingIp,
  ServerInstance,
} from "@/types/dashboard"

interface NetworkTabProps {
  instance: ServerInstance
  floating_ips: FloatingIp[]
  block_volumes: BlockVolume[]
  copy: DashboardPageCopy["network"]
  locale: Locale
}

export function NetworkTab({
  instance,
  floating_ips,
  block_volumes,
  copy,
  locale,
}: NetworkTabProps) {
  const isRTL = locale === "fa"
  const router = useRouter()
  const { show_toast } = useToast()
  const [reverse_dns, set_reverse_dns] = useState(instance.reverse_dns)
  const [is_pending, start_transition] = useTransition()

  const attached_ips = floating_ips.filter(
    (item) => item.attached_hostname === instance.hostname,
  )
  const attached_volumes = block_volumes.filter(
    (item) => item.attached_hostname === instance.hostname,
  )

  function handle_save(event: React.FormEvent) {
    event.preventDefault()
    start_transition(async () => {
      const result = await update_reverse_dns(
        instance.instance_id,
        reverse_dns,
        locale,
      )

      if (result.success) {
        show_toast({ variant: "success", title: copy.saved_success })
        router.refresh()
      }
    })
  }

  return (
    <div className="space-y-6">
      <Panel title={copy.reverse_dns_title} isRTL={isRTL}>
        <p
          className={cn(
            "mb-6 max-w-2xl text-sm text-muted-foreground",
            isRTL && "font-[family-name:var(--font-vazirmatn)]",
          )}
        >
          {copy.reverse_dns_desc}
        </p>

        <form onSubmit={handle_save} className="flex flex-wrap items-end gap-4">
          <div className="min-w-[240px] flex-1">
            <FloatingInput
              id="reverse-dns"
              label={copy.ptr_placeholder}
              value={reverse_dns}
              onChange={set_reverse_dns}
              disabled={is_pending}
            />
          </div>
          <Button
            type="submit"
            variant="acid"
            size="pill"
            disabled={!reverse_dns.trim() || is_pending}
            className={cn(isRTL && "font-[family-name:var(--font-vazirmatn)]")}
          >
            {is_pending ? copy.saving : copy.save}
          </Button>
        </form>

        <p className="mt-4 font-mono text-xs text-muted-foreground">
          {instance.ip_address}
        </p>
      </Panel>

      <Panel title={copy.attached_ips} isRTL={isRTL}>
        {attached_ips.length === 0 ? (
          <p
            className={cn(
              "text-sm text-muted-foreground",
              isRTL && "font-[family-name:var(--font-vazirmatn)]",
            )}
          >
            {copy.none_attached}
          </p>
        ) : (
          <ul className="space-y-2">
            {attached_ips.map((item) => (
              <li
                key={item.floating_ip_id}
                className="flex items-center justify-between rounded-xl border border-white/10 px-4 py-3"
              >
                <span className="font-mono text-sm text-foreground">
                  {item.ip_address}
                </span>
                <span className="text-xs text-muted-foreground">
                  {item.region_label}
                </span>
              </li>
            ))}
          </ul>
        )}
      </Panel>

      <Panel title={copy.attached_volumes} isRTL={isRTL}>
        {attached_volumes.length === 0 ? (
          <p
            className={cn(
              "text-sm text-muted-foreground",
              isRTL && "font-[family-name:var(--font-vazirmatn)]",
            )}
          >
            {copy.none_attached}
          </p>
        ) : (
          <ul className="space-y-2">
            {attached_volumes.map((item) => (
              <li
                key={item.volume_id}
                className="flex items-center justify-between rounded-xl border border-white/10 px-4 py-3"
              >
                <span className="text-sm text-foreground">{item.name}</span>
                <span className="font-mono text-xs text-muted-foreground">
                  {item.size_gb} GB
                </span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4">
          <PanelLink
            href={localizePathname("/dashboard/networking", locale)}
            label={copy.manage_networking}
            locale={locale}
          />
        </div>
      </Panel>
    </div>
  )
}
