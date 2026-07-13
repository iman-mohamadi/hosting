import { notFound } from "next/navigation"
import {
  ChatsCircle,
  ClipboardText,
  HardDrives,
  Stack,
  TrendUp,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr"

import {
  get_admin_metrics,
  get_admin_nodes,
  get_admin_orders,
  get_admin_page_copy,
} from "@/actions"
import {
  Panel,
  StatCard,
  StatusBadge,
} from "@/components/dashboard/dashboard-ui"
import { UsageChart } from "@/components/dashboard/usage-chart"
import { isValidLocale, type Locale } from "@/i18n/config"
import { format_money, format_number } from "@/lib/format"
import { cn } from "@/lib/utils"
import type { NodeStatus, OrderStatus } from "@/types/admin"

const NODE_TONE: Record<NodeStatus, "success" | "warning" | "danger"> = {
  online: "success",
  degraded: "warning",
  offline: "danger",
}

const ORDER_TONE: Record<OrderStatus, "warning" | "success" | "danger"> = {
  pending: "warning",
  approved: "success",
  rejected: "danger",
}

interface AdminDashboardProps {
  params: Promise<{ locale: string }>
}

export default async function AdminDashboardPage({
  params,
}: AdminDashboardProps) {
  const { locale: localeParam } = await params

  if (!isValidLocale(localeParam)) {
    notFound()
  }

  const locale: Locale = localeParam
  const isRTL = locale === "fa"
  const [metrics, nodes, orders, copy] = await Promise.all([
    get_admin_metrics(),
    get_admin_nodes(),
    get_admin_orders(),
    get_admin_page_copy(locale),
  ])
  const c = copy.dashboard

  const avg_revenue =
    metrics.revenue_series.reduce((sum, v) => sum + v, 0) /
    metrics.revenue_series.length
  const recent_orders = orders.slice(0, 4)

  return (
    <div>
      <div className="mb-10">
        <h1
          className={cn(
            "text-3xl font-semibold tracking-tight text-foreground sm:text-4xl",
            isRTL && "font-[family-name:var(--font-vazirmatn)]",
          )}
        >
          {c.title}
        </h1>
        <p
          className={cn(
            "mt-3 text-sm text-muted-foreground",
            isRTL && "font-[family-name:var(--font-vazirmatn)]",
          )}
        >
          {c.subtitle}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          label={c.monthly_revenue}
          value={format_money(metrics.monthly_revenue, locale)}
          hint={`${metrics.revenue_change_pct >= 0 ? "+" : ""}${metrics.revenue_change_pct}% ${c.vs_last_month}`}
          icon={<TrendUp className="size-5" />}
          isRTL={isRTL}
        />
        <StatCard
          label={c.active_nodes}
          value={`${format_number(metrics.active_nodes, locale)} / ${format_number(metrics.total_nodes, locale)}`}
          icon={<Stack className="size-5" />}
          isRTL={isRTL}
        />
        <StatCard
          label={c.pending_orders}
          value={format_number(metrics.pending_orders, locale)}
          icon={<ClipboardText className="size-5" />}
          isRTL={isRTL}
        />
        <StatCard
          label={c.total_users}
          value={format_number(metrics.total_users, locale)}
          icon={<UsersThree className="size-5" />}
          isRTL={isRTL}
        />
        <StatCard
          label={c.active_instances}
          value={format_number(metrics.active_instances, locale)}
          icon={<HardDrives className="size-5" />}
          isRTL={isRTL}
        />
        <StatCard
          label={c.open_tickets}
          value={format_number(metrics.open_tickets, locale)}
          icon={<ChatsCircle className="size-5" />}
          isRTL={isRTL}
        />
      </div>

      <div className="mt-6">
        <UsageChart
          data={metrics.revenue_series}
          label={c.revenue_title}
          unit=""
          average={0}
          average_label={c.revenue_avg}
          average_display={format_money(Math.round(avg_revenue), locale)}
          tone="acid"
          isRTL={isRTL}
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Panel title={c.nodes_title} isRTL={isRTL}>
          <ul className="space-y-2">
            {nodes.map((node) => (
              <li
                key={node.node_id}
                className="flex items-center justify-between gap-4 rounded-xl border border-border px-4 py-3"
              >
                <div className="min-w-0">
                  <p className="truncate font-mono text-sm text-foreground">
                    {node.name}
                  </p>
                  <p
                    className={cn(
                      "truncate text-xs text-muted-foreground",
                      isRTL && "font-[family-name:var(--font-vazirmatn)]",
                    )}
                  >
                    {node.region_label} · {format_number(node.instance_count, locale)}{" "}
                    {copy.nodes.instances}
                  </p>
                </div>
                <StatusBadge
                  label={copy.nodes.status_labels[node.status]}
                  tone={NODE_TONE[node.status]}
                />
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title={c.orders_title} isRTL={isRTL}>
          <ul className="space-y-2">
            {recent_orders.map((order) => (
              <li
                key={order.order_id}
                className="flex items-center justify-between gap-4 rounded-xl border border-border px-4 py-3"
              >
                <div className="min-w-0">
                  <p
                    className={cn(
                      "truncate text-sm text-foreground",
                      isRTL && "font-[family-name:var(--font-vazirmatn)]",
                    )}
                  >
                    {order.user_name}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {order.plan_summary} · {format_money(order.monthly_price, locale)}
                  </p>
                </div>
                <StatusBadge
                  label={copy.orders.status_labels[order.status]}
                  tone={ORDER_TONE[order.status]}
                />
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  )
}
