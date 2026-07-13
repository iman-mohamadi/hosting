import {
  ArrowsClockwise,
  CloudArrowUp,
  Cpu,
  Gauge,
  Globe,
  HardDrives,
  Lifebuoy,
  LockKey,
  Terminal,
  Envelope,
  ChartLine,
  ShieldCheck,
} from "@phosphor-icons/react/dist/ssr"

import { Reveal } from "@/components/fx/reveal"

export type FeatureIcon =
  | "ssl"
  | "backup"
  | "ssh"
  | "dns"
  | "cpu"
  | "storage"
  | "speed"
  | "support"
  | "mail"
  | "chart"
  | "shield"
  | "cloud"

const ICONS: Record<FeatureIcon, React.ComponentType<{ weight?: "duotone"; className?: string }>> = {
  ssl: LockKey,
  backup: ArrowsClockwise,
  ssh: Terminal,
  dns: Globe,
  cpu: Cpu,
  storage: HardDrives,
  speed: Gauge,
  support: Lifebuoy,
  mail: Envelope,
  chart: ChartLine,
  shield: ShieldCheck,
  cloud: CloudArrowUp,
}

export interface FeatureItem {
  icon: FeatureIcon
  title: string
  body: string
}

export function FeatureGrid({ items }: { items: FeatureItem[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => {
        const Icon = ICONS[item.icon]
        return (
          <Reveal key={item.title} delay={(i % 3) * 0.05}>
            <div className="card-glossy h-full rounded-2xl p-6">
              <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10">
                <Icon weight="duotone" className="size-5.5 text-primary" />
              </span>
              <h3 className="mt-4 text-base font-semibold tracking-tight">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </div>
          </Reveal>
        )
      })}
    </div>
  )
}
