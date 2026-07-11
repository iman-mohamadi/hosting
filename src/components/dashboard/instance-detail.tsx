"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import {
  ArrowLeft,
  ArrowRight,
  ArrowsClockwise,
  Play,
  Stop,
} from "@phosphor-icons/react"

import { perform_instance_action } from "@/actions"
import {
  StatusBadge,
  TabBar,
  instance_status_tone,
} from "@/components/dashboard/dashboard-ui"
import { BackupsTab } from "@/components/dashboard/instance-tabs/backups-tab"
import { ConsoleTab } from "@/components/dashboard/instance-tabs/console-tab"
import { FirewallTab } from "@/components/dashboard/instance-tabs/firewall-tab"
import { NetworkTab } from "@/components/dashboard/instance-tabs/network-tab"
import { OverviewTab } from "@/components/dashboard/instance-tabs/overview-tab"
import { ResizeTab } from "@/components/dashboard/instance-tabs/resize-tab"
import { SettingsTab } from "@/components/dashboard/instance-tabs/settings-tab"
import { SnapshotsTab } from "@/components/dashboard/instance-tabs/snapshots-tab"
import { useToast } from "@/components/providers/toast-provider"
import type { Locale } from "@/i18n/config"
import { localizePathname } from "@/i18n/routing"
import { cn } from "@/lib/utils"
import type {
  BackupPolicy,
  BlockVolume,
  DashboardPageCopy,
  FirewallRule,
  FloatingIp,
  InstanceAction,
  InstanceStatus,
  ResizeConstraints,
  ServerInstance,
  Snapshot,
  UsageSeries,
} from "@/types/dashboard"

type InstanceTabId =
  | "overview"
  | "resize"
  | "snapshots"
  | "firewall"
  | "network"
  | "console"
  | "settings"
  | "backups"

interface InstanceDetailProps {
  instance: ServerInstance
  usage: UsageSeries
  snapshots: Snapshot[]
  firewall_rules: FirewallRule[]
  constraints: ResizeConstraints
  floating_ips: FloatingIp[]
  block_volumes: BlockVolume[]
  backup_policy: BackupPolicy | null
  copy: DashboardPageCopy
  locale: Locale
}

const ACTION_ICONS = {
  start: Play,
  stop: Stop,
  restart: ArrowsClockwise,
} as const

export function InstanceDetail({
  instance,
  usage,
  snapshots,
  firewall_rules,
  constraints,
  floating_ips,
  block_volumes,
  backup_policy,
  copy,
  locale,
}: InstanceDetailProps) {
  const isRTL = locale === "fa"
  const router = useRouter()
  const { show_toast } = useToast()
  const [active_tab, set_active_tab] = useState<InstanceTabId>("overview")
  const [status, set_status] = useState<InstanceStatus>(instance.status)
  const [pending_action, set_pending_action] = useState<InstanceAction | null>(
    null,
  )
  const [, start_transition] = useTransition()

  const Back = isRTL ? ArrowRight : ArrowLeft
  const instance_copy = copy.instances

  const tabs: { id: InstanceTabId; label: string }[] = [
    { id: "overview", label: instance_copy.tabs.overview },
    { id: "resize", label: instance_copy.tabs.resize },
    { id: "snapshots", label: instance_copy.tabs.snapshots },
    { id: "firewall", label: instance_copy.tabs.firewall },
    { id: "network", label: instance_copy.tabs.network },
    { id: "console", label: instance_copy.tabs.console },
    { id: "settings", label: instance_copy.tabs.settings },
    { id: "backups", label: instance_copy.tabs.backups },
  ]

  function run_action(
    action: Exclude<InstanceAction, "rebuild" | "destroy">,
    transient: InstanceStatus,
  ) {
    set_pending_action(action)
    set_status(transient)

    start_transition(async () => {
      const result = await perform_instance_action(
        instance.instance_id,
        action,
        locale,
      )

      if (result.success && result.instance) {
        set_status(result.instance.status)
        show_toast({
          variant: "success",
          title: `${instance_copy.action_labels[action]} · ${instance.hostname}`,
        })
        router.refresh()
      } else {
        set_status(instance.status)
        show_toast({
          variant: "error",
          title: instance_copy.action_labels[action],
        })
      }

      set_pending_action(null)
    })
  }

  const is_busy = pending_action !== null
  const is_running = status === "running"

  const controls: {
    action: Exclude<InstanceAction, "rebuild" | "destroy">
    transient: InstanceStatus
    enabled: boolean
    tone: "acid" | "muted"
  }[] = [
    {
      action: "start",
      transient: "provisioning",
      enabled: !is_running,
      tone: "acid",
    },
    {
      action: "stop",
      transient: "stopped",
      enabled: is_running,
      tone: "muted",
    },
    {
      action: "restart",
      transient: "rebooting",
      enabled: is_running,
      tone: "muted",
    },
  ]

  return (
    <div>
      <Link
        href={localizePathname("/dashboard/instances", locale)}
        className={cn(
          "group mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground",
          isRTL && "font-[family-name:var(--font-vazirmatn)]",
        )}
      >
        <Back className="size-4 transition-transform group-hover:-translate-x-0.5" />
        {instance_copy.back}
      </Link>

      <div className="mb-8 flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <h1 className="font-mono text-2xl font-semibold text-foreground sm:text-3xl">
            {instance.hostname}
          </h1>
          <StatusBadge
            label={instance_copy.status_labels[status]}
            tone={instance_status_tone(status)}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {controls.map((control) => {
            const Icon = ACTION_ICONS[control.action]
            const active = pending_action === control.action
            return (
              <button
                key={control.action}
                type="button"
                onClick={() => run_action(control.action, control.transient)}
                disabled={!control.enabled || is_busy}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors disabled:opacity-40",
                  control.tone === "acid"
                    ? "border-acid/40 bg-acid/10 text-acid hover:bg-acid/20"
                    : "border-white/10 text-foreground hover:border-white/25 hover:bg-white/[0.04]",
                  isRTL && "font-[family-name:var(--font-vazirmatn)]",
                )}
              >
                <Icon
                  weight="bold"
                  className={cn("size-4", active && "animate-spin")}
                />
                {instance_copy.action_labels[control.action]}
              </button>
            )
          })}
        </div>
      </div>

      <TabBar
        tabs={tabs}
        active={active_tab}
        on_change={set_active_tab}
        isRTL={isRTL}
      />

      {active_tab === "overview" && (
        <OverviewTab
          instance={instance}
          usage={usage}
          copy={instance_copy}
          settings_label={instance_copy.tabs.settings}
          locale={locale}
          on_open_settings={() => set_active_tab("settings")}
        />
      )}

      {active_tab === "resize" && (
        <ResizeTab
          instance={instance}
          constraints={constraints}
          copy={copy.resize}
          locale={locale}
        />
      )}

      {active_tab === "snapshots" && (
        <SnapshotsTab
          instance_id={instance.instance_id}
          snapshots={snapshots}
          copy={copy.snapshots}
          locale={locale}
        />
      )}

      {active_tab === "firewall" && (
        <FirewallTab
          instance_id={instance.instance_id}
          rules={firewall_rules}
          copy={copy.firewall}
          locale={locale}
        />
      )}

      {active_tab === "network" && (
        <NetworkTab
          instance={instance}
          floating_ips={floating_ips}
          block_volumes={block_volumes}
          copy={copy.network}
          locale={locale}
        />
      )}

      {active_tab === "console" && (
        <ConsoleTab
          hostname={instance.hostname}
          status={status}
          copy={copy.console}
          locale={locale}
        />
      )}

      {active_tab === "settings" && (
        <SettingsTab
          instance={instance}
          copy={copy.settings}
          locale={locale}
        />
      )}

      {active_tab === "backups" && (
        <BackupsTab
          instance_id={instance.instance_id}
          policy={backup_policy}
          copy={copy.backups}
          locale={locale}
        />
      )}
    </div>
  )
}
