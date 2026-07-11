import type { AccountRole } from "@/types/auth"
import type { TicketMessage, TicketPriority, TicketStatus } from "@/types/dashboard"

export type AdminAccountStatus = "active" | "suspended" | "terminated"
export type OrderStatus = "pending" | "approved" | "rejected"
export type NodeStatus = "online" | "degraded" | "offline"

export interface AdminMetrics {
  monthly_revenue: number
  revenue_change_pct: number
  active_nodes: number
  total_nodes: number
  pending_orders: number
  total_users: number
  active_instances: number
  open_tickets: number
  revenue_series: number[]
  revenue_labels: string[]
}

export interface AdminUser {
  user_id: string
  full_name: string
  email_address: string
  role: AccountRole
  account_status: AdminAccountStatus
  instance_count: number
  monthly_spend: number
  created_at: string
}

export interface AdminOrder {
  order_id: string
  user_id?: string
  user_name: string
  user_email: string
  plan_summary: string
  cpu_cores: number
  ram_gb: number
  storage_gb: number
  storage_type?: "nvme" | "ssd"
  selected_os?: "ubuntu" | "windows" | "arch_linux"
  region_label: string
  monthly_price: number
  status: OrderStatus
  created_at: string
}

export interface AdminNode {
  node_id: string
  name: string
  region_label: string
  status: NodeStatus
  cpu_load: number
  ram_load: number
  instance_count: number
  capacity: number
  uptime_days: number
}

export interface AdminTicket {
  ticket_id: string
  subject: string
  status: TicketStatus
  priority: TicketPriority
  user_name: string
  user_email: string
  created_at: string
  updated_at: string
  messages: TicketMessage[]
}

export interface AdminPageCopy {
  portal_label: string
  sign_out: string
  nav: {
    dashboard: string
    users: string
    orders: string
    nodes: string
    tickets: string
  }
  dashboard: {
    title: string
    subtitle: string
    monthly_revenue: string
    active_nodes: string
    pending_orders: string
    total_users: string
    active_instances: string
    open_tickets: string
    revenue_title: string
    revenue_avg: string
    vs_last_month: string
    nodes_title: string
    orders_title: string
    view_all: string
  }
  users: {
    title: string
    subtitle: string
    user: string
    role: string
    status: string
    instances: string
    spend: string
    joined: string
    actions: string
    suspend: string
    activate: string
    terminate: string
    role_labels: Record<AccountRole, string>
    status_labels: Record<AdminAccountStatus, string>
    confirm: string
  }
  orders: {
    title: string
    subtitle: string
    order: string
    customer: string
    config: string
    monthly: string
    status: string
    approve: string
    reject: string
    status_labels: Record<OrderStatus, string>
    empty: string
  }
  nodes: {
    title: string
    subtitle: string
    cpu_load: string
    ram_load: string
    instances: string
    uptime: string
    days: string
    status_labels: Record<NodeStatus, string>
  }
  tickets: {
    title: string
    subtitle: string
    open_by: string
    reply_placeholder: string
    send_reply: string
    sending: string
    back: string
    reply_success: string
    status_labels: Record<TicketStatus, string>
    priority_labels: Record<TicketPriority, string>
    you_support: string
    customer: string
    empty: string
  }
}
