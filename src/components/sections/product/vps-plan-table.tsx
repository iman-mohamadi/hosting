"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

import { Reveal } from "@/components/fx/reveal"
import { MagneticButton } from "@/components/fx/magnetic-button"
import type { Locale } from "@/i18n/config"
import { localizePathname } from "@/i18n/routing"
import {
  format_toman,
  loc_num,
  LOCATIONS,
  pick,
  vps_location_code,
  vps_price,
  vps_traffic,
  VPS_LOCATIONS,
  VPS_OS,
  VPS_PLANS,
  type LocationId,
  type VpsOsId,
} from "@/lib/catalog"
import { use_cart_store, type CartItem } from "@/store/use_cart_store"
import { SegmentedControl } from "./plan-table"
import { cn } from "@/lib/utils"

interface VpsPlanTableProps {
  locale: Locale
  initialLocation?: LocationId
  labels: {
    perMonth: string
    order: string
    plan: string
    cpu: string
    ram: string
    disk: string
    traffic: string
    price: string
  }
}

export function VpsPlanTable({ locale, initialLocation = "iran", labels }: VpsPlanTableProps) {
  const isRTL = locale === "fa"
  const router = useRouter()
  const add_item = use_cart_store((s) => s.add_item)

  const [location, setLocation] = useState<LocationId>(initialLocation)
  const [os, setOs] = useState<VpsOsId>("linux")

  function handle_order(plan: (typeof VPS_PLANS)[number]) {
    const price = vps_price(plan, location, os)
    const code = `${vps_location_code(location)}${plan.code}-${VPS_OS[os].label.en}`
    const item: CartItem = {
      key: `vps:${plan.plan_id}:${location}:${os}`,
      kind: "vps",
      title: { fa: `سرور مجازی ${code}`, en: `${code} VPS` },
      subtitle: {
        fa: `${pick(LOCATIONS[location].label, "fa")} · ${pick(VPS_OS[os].label, "fa")}`,
        en: `${pick(LOCATIONS[location].label, "en")} · ${pick(VPS_OS[os].label, "en")}`,
      },
      meta: [
        { fa: `${plan.vcpu} هسته`, en: `${plan.vcpu} vCPU` },
        { fa: `${plan.ram_gb} گیگابایت RAM`, en: `${plan.ram_gb} GB RAM` },
        { fa: `${plan.ssd_gb} گیگابایت SSD`, en: `${plan.ssd_gb} GB SSD` },
      ],
      location,
      os,
      period: "monthly",
      monthly_price: price,
      quantity: 1,
    }
    add_item(item)
    router.push(localizePathname("/cart", locale))
  }

  return (
    <div>
      <div className="mb-8 flex flex-col items-center gap-4">
        <SegmentedControl
          options={VPS_LOCATIONS.map((id) => ({
            id,
            label: `${LOCATIONS[id].flag} ${pick(LOCATIONS[id].label, locale)}`,
          }))}
          value={location}
          onChange={(id) => setLocation(id as LocationId)}
        />
        <SegmentedControl
          options={(Object.keys(VPS_OS) as VpsOsId[]).map((id) => ({
            id,
            label: pick(VPS_OS[id].label, locale),
          }))}
          value={os}
          onChange={(id) => setOs(id as VpsOsId)}
        />
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-sm)] md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40 text-start text-xs tracking-wide text-muted-foreground uppercase">
              <Th className="text-start">{labels.plan}</Th>
              <Th>{labels.cpu}</Th>
              <Th>{labels.ram}</Th>
              <Th>{labels.disk}</Th>
              <Th>{labels.traffic}</Th>
              <Th>{labels.price}</Th>
              <Th />
            </tr>
          </thead>
          <tbody>
            {VPS_PLANS.map((plan) => {
              const price = vps_price(plan, location, os)
              const code = `${vps_location_code(location).toUpperCase()}·${plan.code}`
              return (
                <tr key={plan.plan_id} className="border-b border-border last:border-0 transition-colors hover:bg-muted/30">
                  <td className="px-5 py-4 text-start font-mono text-xs font-medium text-foreground">
                    {code}
                  </td>
                  <Td>{loc_num(plan.vcpu, locale)} {locale === "fa" ? "هسته" : "vCPU"}</Td>
                  <Td>{loc_num(plan.ram_gb, locale)} GB</Td>
                  <Td>{loc_num(plan.ssd_gb, locale)} GB</Td>
                  <Td>{pick(vps_traffic(location), locale)}</Td>
                  <td className="px-5 py-4 text-center font-semibold tabular-nums text-foreground">
                    {format_toman(price, locale)}
                    <span className="ms-1 text-[11px] font-normal text-muted-foreground">
                      {labels.perMonth}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <MagneticButton
                      onClick={() => handle_order(plan)}
                      size="sm"
                      variant="outline"
                      isRTL={isRTL}
                      withArrow={false}
                      className="h-9 rounded-full px-5"
                    >
                      {labels.order}
                    </MagneticButton>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="grid gap-4 md:hidden">
        {VPS_PLANS.map((plan, i) => {
          const price = vps_price(plan, location, os)
          const code = `${vps_location_code(location).toUpperCase()}·${plan.code}`
          return (
            <Reveal key={plan.plan_id} delay={i * 0.04}>
              <div className="card-glossy rounded-2xl p-5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-medium">{code}</span>
                  <span className="font-semibold tabular-nums">
                    {format_toman(price, locale)}
                    <span className="ms-1 text-[11px] font-normal text-muted-foreground">
                      {labels.perMonth}
                    </span>
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                  <span>{labels.cpu}: {loc_num(plan.vcpu, locale)}</span>
                  <span>{labels.ram}: {loc_num(plan.ram_gb, locale)} GB</span>
                  <span>{labels.disk}: {loc_num(plan.ssd_gb, locale)} GB</span>
                  <span>{labels.traffic}: {pick(vps_traffic(location), locale)}</span>
                </div>
                <MagneticButton
                  onClick={() => handle_order(plan)}
                  size="pill"
                  variant="outline"
                  isRTL={isRTL}
                  withArrow={false}
                  className="mt-5 w-full justify-center"
                >
                  {labels.order}
                </MagneticButton>
              </div>
            </Reveal>
          )
        })}
      </div>
    </div>
  )
}

function Th({ children, className }: { children?: React.ReactNode; className?: string }) {
  return <th className={cn("px-5 py-3 text-center font-medium", className)}>{children}</th>
}

function Td({ children }: { children: React.ReactNode }) {
  return <td className="px-5 py-4 text-center text-muted-foreground">{children}</td>
}
