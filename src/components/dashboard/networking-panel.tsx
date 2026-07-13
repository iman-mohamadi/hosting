"use client"

import { useRouter } from "next/navigation"
import { useMemo, useState, useTransition } from "react"
import { Trash } from "@phosphor-icons/react"

import {
  create_floating_ip,
  create_block_volume,
  delete_block_volume,
  delete_floating_ip,
  set_floating_ip_attachment,
  set_volume_attachment,
} from "@/actions"
import {
  EmptyState,
  Panel,
  StatusBadge,
} from "@/components/dashboard/dashboard-ui"
import { Button } from "@/components/ui/button"
import { FloatingInput } from "@/components/ui/floating-input"
import { useToast } from "@/components/providers/toast-provider"
import type { Locale } from "@/i18n/config"
import { cn } from "@/lib/utils"
import type {
  BlockVolume,
  DashboardPageCopy,
  FloatingIp,
  ServerInstance,
} from "@/types/dashboard"

interface NetworkingPanelProps {
  floating_ips: FloatingIp[]
  block_volumes: BlockVolume[]
  instances: ServerInstance[]
  copy: DashboardPageCopy["networking"]
  locale: Locale
}

export function NetworkingPanel({
  floating_ips,
  block_volumes,
  instances,
  copy,
  locale,
}: NetworkingPanelProps) {
  const isRTL = locale === "fa"
  const router = useRouter()
  const { show_toast } = useToast()
  const [volume_name, set_volume_name] = useState("")
  const [volume_size, set_volume_size] = useState("100")
  const [is_pending, start_transition] = useTransition()

  const default_region = instances[0]?.region_label ?? "Frankfurt"

  const instance_options = useMemo(
    () =>
      instances.map((instance) => ({
        id: instance.instance_id,
        label: instance.hostname,
      })),
    [instances],
  )

  function handle_create_ip() {
    start_transition(async () => {
      const result = await create_floating_ip(default_region)
      if (result.success) {
        show_toast({ variant: "success", title: copy.ip_created_success })
        router.refresh()
      }
    })
  }

  function handle_create_volume(event: React.FormEvent) {
    event.preventDefault()
    start_transition(async () => {
      const result = await create_block_volume({
        name: volume_name,
        size_gb: Number(volume_size),
        region_label: default_region,
      })

      if (result.success) {
        show_toast({ variant: "success", title: copy.volume_created_success })
        set_volume_name("")
        router.refresh()
      }
    })
  }

  function handle_attach_ip(floating_ip_id: string, instance_id: string) {
    start_transition(async () => {
      const result = await set_floating_ip_attachment(
        floating_ip_id,
        instance_id || null,
      )
      if (result.success) {
        show_toast({
          variant: "success",
          title: instance_id ? copy.attached_success : copy.detached_success,
        })
        router.refresh()
      }
    })
  }

  function handle_attach_volume(volume_id: string, instance_id: string) {
    start_transition(async () => {
      const result = await set_volume_attachment(
        volume_id,
        instance_id || null,
      )
      if (result.success) {
        show_toast({
          variant: "success",
          title: instance_id ? copy.attached_success : copy.detached_success,
        })
        router.refresh()
      }
    })
  }

  function handle_delete_ip(floating_ip_id: string) {
    start_transition(async () => {
      const result = await delete_floating_ip(floating_ip_id)
      if (result.success) {
        show_toast({ variant: "success", title: copy.deleted_success })
        router.refresh()
      }
    })
  }

  function handle_delete_volume(volume_id: string) {
    start_transition(async () => {
      const result = await delete_block_volume(volume_id)
      if (result.success) {
        show_toast({ variant: "success", title: copy.deleted_success })
        router.refresh()
      }
    })
  }

  return (
    <div className="space-y-8">
      <Panel
        title={copy.floating_ips_title}
        isRTL={isRTL}
        action={
          <Button
            type="button"
            variant="acid"
            size="pill"
            disabled={is_pending}
            onClick={handle_create_ip}
            className={cn(isRTL && "font-[family-name:var(--font-vazirmatn)]")}
          >
            {is_pending ? copy.creating_ip : copy.create_ip}
          </Button>
        }
      >
        {floating_ips.length === 0 ? (
          <EmptyState label={copy.ips_empty} isRTL={isRTL} />
        ) : (
          <div className="space-y-3">
            {floating_ips.map((item) => {
              const attached = instances.find(
                (instance) => instance.hostname === item.attached_hostname,
              )
              return (
                <div
                  key={item.floating_ip_id}
                  className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border px-4 py-4"
                >
                  <div>
                    <p className="font-mono text-sm text-foreground">
                      {item.ip_address}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {item.region_label}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <StatusBadge
                      label={
                        item.attached_hostname
                          ? `${copy.attached_to} ${item.attached_hostname}`
                          : copy.available
                      }
                      tone={item.attached_hostname ? "success" : "neutral"}
                      withDot={false}
                    />
                    <select
                      value={attached?.instance_id ?? ""}
                      onChange={(event) =>
                        handle_attach_ip(item.floating_ip_id, event.target.value)
                      }
                      disabled={is_pending}
                      className="h-10 rounded-xl border border-border bg-muted px-3 text-sm text-foreground outline-none"
                    >
                      <option value="">{copy.unattached}</option>
                      {instance_options.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      disabled={is_pending}
                      onClick={() => handle_delete_ip(item.floating_ip_id)}
                      aria-label={copy.delete}
                      className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-destructive/30 hover:text-destructive disabled:opacity-50"
                    >
                      <Trash className="size-4" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </Panel>

      <Panel title={copy.volumes_title} isRTL={isRTL}>
        <form
          onSubmit={handle_create_volume}
          className="mb-6 flex flex-wrap items-end gap-4"
        >
          <div className="min-w-[180px] flex-1">
            <FloatingInput
              id="volume-name"
              label={copy.volume_name_placeholder}
              value={volume_name}
              onChange={set_volume_name}
              disabled={is_pending}
            />
          </div>
          <div className="w-36">
            <FloatingInput
              id="volume-size"
              label={copy.volume_size}
              value={volume_size}
              onChange={set_volume_size}
              disabled={is_pending}
            />
          </div>
          <Button
            type="submit"
            variant="acid"
            size="pill"
            disabled={!volume_name.trim() || is_pending}
            className={cn(isRTL && "font-[family-name:var(--font-vazirmatn)]")}
          >
            {is_pending ? copy.creating_volume : copy.create_volume}
          </Button>
        </form>

        {block_volumes.length === 0 ? (
          <EmptyState label={copy.volumes_empty} isRTL={isRTL} />
        ) : (
          <div className="space-y-3">
            {block_volumes.map((item) => {
              const attached = instances.find(
                (instance) => instance.hostname === item.attached_hostname,
              )
              return (
                <div
                  key={item.volume_id}
                  className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border px-4 py-4"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {item.name}
                    </p>
                    <p className="mt-1 font-mono text-xs text-muted-foreground">
                      {item.size_gb} GB · {item.region_label}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <select
                      value={attached?.instance_id ?? ""}
                      onChange={(event) =>
                        handle_attach_volume(item.volume_id, event.target.value)
                      }
                      disabled={is_pending}
                      className="h-10 rounded-xl border border-border bg-muted px-3 text-sm text-foreground outline-none"
                    >
                      <option value="">{copy.select_instance}</option>
                      {instance_options.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      disabled={is_pending}
                      onClick={() => handle_delete_volume(item.volume_id)}
                      aria-label={copy.delete}
                      className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-destructive/30 hover:text-destructive disabled:opacity-50"
                    >
                      <Trash className="size-4" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </Panel>
    </div>
  )
}
