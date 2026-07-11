import type { SelectedOs, StorageType } from "@/actions"

export type InstanceStatus =
  | "running"
  | "stopped"
  | "rebooting"
  | "provisioning"

export type InstanceAction = "start" | "stop" | "restart" | "rebuild" | "destroy"

export type BackupFrequency = "daily" | "weekly"

export interface BackupPolicy {
  backup_id: string
  instance_id: string
  enabled: boolean
  frequency: BackupFrequency
  retention_days: number
  last_backup_at: string | null
  next_backup_at: string | null
}

export type DnsRecordType = "A" | "AAAA" | "CNAME" | "MX" | "TXT"

export interface DnsRecord {
  record_id: string
  record_type: DnsRecordType
  name: string
  value: string
  ttl: number
  priority?: number
}

export interface DnsZone {
  zone_id: string
  domain_name: string
  created_at: string
  records: DnsRecord[]
}

export interface PaymentMethod {
  method_id: string
  brand: string
  last_four: string
  exp_month: number
  exp_year: number
  is_default: boolean
}

export interface NotificationPreferences {
  billing_email: boolean
  ticket_email: boolean
  security_email: boolean
  marketing_email: boolean
  usage_alerts: boolean
}

export interface ServerInstance {
  instance_id: string
  hostname: string
  status: InstanceStatus
  ip_address: string
  reverse_dns: string
  region: string
  region_label: string
  plan_name: string
  cpu_cores: number
  ram_gb: number
  storage_gb: number
  storage_type: StorageType
  selected_os: SelectedOs
  os_label: string
  monthly_price: number
  created_at: string
}

export interface ResizeConstraints {
  cpu_min: number
  cpu_max: number
  ram_min: number
  ram_max: number
  storage_min: number
  storage_max: number
}

export type ResizeMode = "warm" | "cold"

export interface ResizeQuote {
  cpu_cores: number
  ram_gb: number
  storage_gb: number
  monthly_price: number
  price_delta: number
}

export type SnapshotStatus = "ready" | "creating"

export interface Snapshot {
  snapshot_id: string
  instance_id: string
  label: string
  size_gb: number
  status: SnapshotStatus
  created_at: string
}

export type FirewallProtocol = "tcp" | "udp" | "icmp"

export interface FirewallRule {
  rule_id: string
  instance_id: string
  label: string
  protocol: FirewallProtocol
  port_range: string
  source: string
}

export interface SshKey {
  key_id: string
  name: string
  fingerprint: string
  created_at: string
}

export interface ApiToken {
  token_id: string
  name: string
  token_preview: string
  created_at: string
  last_used_at: string | null
  secret?: string
}

export interface AccountSession {
  session_id: string
  device: string
  location: string
  ip_address: string
  last_active: string
  is_current: boolean
}

export interface AccountProfile {
  full_name: string
  email_address: string
  two_factor_enabled: boolean
  created_at: string
}

export type ActivityCategory =
  | "instance"
  | "billing"
  | "security"
  | "support"
  | "network"

export interface ActivityEntry {
  entry_id: string
  category: ActivityCategory
  action: string
  target: string
  created_at: string
}

export interface FloatingIp {
  floating_ip_id: string
  ip_address: string
  region_label: string
  attached_hostname: string | null
}

export interface BlockVolume {
  volume_id: string
  name: string
  size_gb: number
  region_label: string
  attached_hostname: string | null
  created_at: string
}

export interface UsageSeries {
  cpu_percent: number[]
  bandwidth_mbps: number[]
  memory_percent: number[]
  labels: string[]
  cpu_avg: number
  bandwidth_avg: number
  memory_avg: number
}

export type InvoiceStatus = "paid" | "pending" | "overdue"

export interface Invoice {
  invoice_id: string
  invoice_number: string
  description: string
  amount: number
  status: InvoiceStatus
  issued_at: string
  due_at: string
  paid_at?: string
}

export type TicketStatus = "open" | "pending" | "closed"
export type TicketPriority = "low" | "normal" | "high"

export interface TicketMessage {
  message_id: string
  author_role: "user" | "support"
  author_name: string
  body: string
  created_at: string
}

export interface SupportTicket {
  ticket_id: string
  subject: string
  status: TicketStatus
  priority: TicketPriority
  created_at: string
  updated_at: string
  messages: TicketMessage[]
}

export type OrderStatus = "pending" | "approved" | "rejected"

export interface UserOrder {
  order_id: string
  plan_summary: string
  cpu_cores: number
  ram_gb: number
  storage_gb: number
  storage_type: StorageType
  selected_os: SelectedOs
  region_label: string
  monthly_price: number
  status: OrderStatus
  created_at: string
  instance_id?: string
}

export interface DashboardOverview {
  full_name: string
  active_instances: number
  total_instances: number
  monthly_spend: number
  pending_invoice_total: number
  pending_invoice_count: number
  open_ticket_count: number
  recent_instances: ServerInstance[]
  pending_invoices: Invoice[]
  recent_tickets: SupportTicket[]
}

export interface DashboardPageCopy {
  nav: {
    overview: string
    instances: string
    orders: string
    networking: string
    dns: string
    billing: string
    support: string
    activity: string
    account: string
  }
  sign_out: string
  portal_label: string
  overview: {
    greeting: string
    subtitle: string
    active_instances: string
    monthly_spend: string
    pending_invoices: string
    open_tickets: string
    recent_instances: string
    pending_invoices_title: string
    recent_tickets_title: string
    view_all: string
    empty_instances: string
    empty_instances_cta: string
    empty_invoices: string
    empty_tickets: string
  }
  instances: {
    title: string
    subtitle: string
    status_labels: Record<InstanceStatus, string>
    action_labels: Record<InstanceAction, string>
    specs: string
    region: string
    ip_address: string
    monthly: string
    created: string
    manage: string
    back: string
    usage_title: string
    cpu_usage: string
    bandwidth_usage: string
    memory_usage: string
    average: string
    overview_tab: string
    danger_zone: string
    confirm_action: string
    action_running: string
    reverse_dns: string
    tabs: {
      overview: string
      resize: string
      snapshots: string
      firewall: string
      network: string
      console: string
      settings: string
      backups: string
    }
  }
  settings: {
    title: string
    subtitle: string
    hostname_label: string
    hostname_save: string
    hostname_saving: string
    hostname_success: string
    root_password_title: string
    root_password_desc: string
    root_password_reset: string
    root_password_resetting: string
    root_password_success: string
    temporary_password_label: string
    rebuild_title: string
    rebuild_desc: string
    rebuild_os_label: string
    rebuild_submit: string
    rebuild_submitting: string
    rebuild_success: string
    destroy_title: string
    destroy_desc: string
    destroy_submit: string
    destroy_submitting: string
    destroy_confirm: string
    destroy_success: string
  }
  backups: {
    title: string
    subtitle: string
    enabled_label: string
    frequency_label: string
    frequency_daily: string
    frequency_weekly: string
    retention_label: string
    last_backup: string
    next_backup: string
    never: string
    save: string
    saving: string
    success: string
  }
  dns: {
    title: string
    subtitle: string
    zones_title: string
    create_zone: string
    creating_zone: string
    domain_placeholder: string
    delete_zone: string
    records_title: string
    add_record: string
    adding_record: string
    record_type: string
    record_name: string
    record_value: string
    record_ttl: string
    record_priority: string
    empty_zones: string
    empty_records: string
    zone_created: string
    zone_deleted: string
    record_added: string
    record_updated: string
    record_deleted: string
    save_record: string
    delete_record: string
  }
  resize: {
    title: string
    subtitle: string
    cpu_label: string
    ram_label: string
    storage_label: string
    new_monthly: string
    price_delta: string
    mode_label: string
    warm_label: string
    warm_desc: string
    cold_label: string
    cold_desc: string
    apply: string
    applying: string
    no_change: string
    confirm_note: string
    success: string
  }
  snapshots: {
    title: string
    subtitle: string
    create: string
    creating: string
    label_placeholder: string
    restore: string
    restoring: string
    delete: string
    size: string
    taken: string
    status_labels: Record<SnapshotStatus, string>
    empty: string
    confirm_restore: string
    created_success: string
    restored_success: string
    deleted_success: string
  }
  firewall: {
    title: string
    subtitle: string
    add_rule: string
    adding: string
    label: string
    protocol: string
    port_range: string
    port_placeholder: string
    source: string
    source_placeholder: string
    delete: string
    empty: string
    inbound: string
    added_success: string
    deleted_success: string
  }
  network: {
    title: string
    reverse_dns_title: string
    reverse_dns_desc: string
    ptr_placeholder: string
    save: string
    saving: string
    saved_success: string
    attached_ips: string
    attached_volumes: string
    none_attached: string
    manage_networking: string
  }
  console: {
    title: string
    subtitle: string
    connect: string
    connecting: string
    connected: string
    disconnect: string
    offline_note: string
    hint: string
  }
  account: {
    title: string
    subtitle: string
    profile_title: string
    full_name: string
    email: string
    save: string
    saving: string
    profile_success: string
    password_title: string
    current_password: string
    new_password: string
    change_password: string
    changing: string
    password_success: string
    password_mismatch: string
    two_factor_title: string
    two_factor_desc: string
    two_factor_on: string
    two_factor_off: string
    ssh_title: string
    ssh_desc: string
    ssh_name: string
    ssh_name_placeholder: string
    ssh_key_placeholder: string
    ssh_add: string
    ssh_adding: string
    ssh_empty: string
    ssh_added_success: string
    ssh_deleted_success: string
    tokens_title: string
    tokens_desc: string
    token_name_placeholder: string
    token_create: string
    token_creating: string
    token_empty: string
    token_created_success: string
    token_copy_note: string
    token_last_used: string
    token_never_used: string
    revoke: string
    sessions_title: string
    sessions_desc: string
    current_session: string
    revoke_session: string
    sessions_revoked_success: string
    delete: string
    confirm: string
    notifications_title: string
    notifications_desc: string
    notify_billing: string
    notify_tickets: string
    notify_security: string
    notify_marketing: string
    notify_usage: string
    notifications_save: string
    notifications_saving: string
    notifications_success: string
  }
  activity: {
    title: string
    subtitle: string
    empty: string
    category_labels: Record<ActivityCategory, string>
    all: string
  }
  networking: {
    title: string
    subtitle: string
    floating_ips_title: string
    volumes_title: string
    create_ip: string
    creating_ip: string
    create_volume: string
    creating_volume: string
    volume_name_placeholder: string
    volume_size: string
    attach: string
    detach: string
    delete: string
    attached_to: string
    available: string
    unattached: string
    select_instance: string
    ips_empty: string
    volumes_empty: string
    ip_created_success: string
    volume_created_success: string
    attached_success: string
    detached_success: string
    deleted_success: string
  }
  billing: {
    title: string
    subtitle: string
    invoice: string
    amount: string
    status: string
    due: string
    issued: string
    pay_now: string
    paying: string
    status_labels: Record<InvoiceStatus, string>
    total_due: string
    paid_note: string
    empty: string
    payment_methods_title: string
    payment_methods_subtitle: string
    add_card: string
    adding_card: string
    set_default: string
    default_badge: string
    expires: string
    delete_method: string
    no_methods: string
    method_added: string
    method_deleted: string
    method_default_set: string
  }
  support: {
    title: string
    subtitle: string
    new_ticket: string
    subject: string
    subject_placeholder: string
    message: string
    message_placeholder: string
    priority: string
    priority_labels: Record<TicketPriority, string>
    status_labels: Record<TicketStatus, string>
    submit: string
    submitting: string
    reply: string
    reply_placeholder: string
    send_reply: string
    sending: string
    back: string
    empty: string
    created_success: string
    reply_success: string
    you: string
    support_agent: string
  }
  orders: {
    title: string
    subtitle: string
    order_id: string
    plan: string
    region: string
    monthly: string
    status: string
    created: string
    status_labels: Record<OrderStatus, string>
    empty: string
    view_instance: string
    provisioning_note: string
  }
}
