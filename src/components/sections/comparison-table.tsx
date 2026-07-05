"use client"

import { motion } from "framer-motion"

import type { ComparisonFeature, PricingPlan } from "@/actions"
import { cn } from "@/lib/utils"

interface ComparisonTableProps {
  features: ComparisonFeature[]
  plans: PricingPlan[]
  section_title: string
  section_subtitle: string
}

export function ComparisonTable({
  features,
  plans,
  section_title,
  section_subtitle,
}: ComparisonTableProps) {
  const planColumns = [
    { id: "starter", name: plans[0]?.plan_name ?? "Starter" },
    { id: "pro", name: plans[1]?.plan_name ?? "Pro" },
    { id: "enterprise", name: plans[2]?.plan_name ?? "Enterprise" },
  ]

  function getValueForPlan(
    feature: ComparisonFeature,
    plan_id: string,
  ): string {
    switch (plan_id) {
      case "starter":
        return feature.starter_value
      case "pro":
        return feature.pro_value
      case "enterprise":
        return feature.enterprise_value
      default:
        return "—"
    }
  }

  return (
    <section className="relative py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20 space-y-4 ltr:text-left rtl:text-right"
        >
          <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            {section_title}
          </h2>
          <p className="max-w-lg text-muted-foreground">{section_subtitle}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-x-auto"
        >
          <div className="min-w-[640px]">
            <div
              className={cn(
                "grid grid-cols-4 gap-6 border-b border-border/30 pb-8",
                "text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase",
              )}
            >
              <div className="ltr:text-left rtl:text-right" />
              {planColumns.map((column) => (
                <div
                  key={column.id}
                  className={cn(
                    "text-center",
                    column.id === "pro" && "text-primary",
                  )}
                >
                  {column.name}
                </div>
              ))}
            </div>

            <div className="divide-y divide-border/20">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.feature_id}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.04 }}
                  className="grid grid-cols-4 gap-6 py-8"
                >
                  <div className="flex items-center text-sm text-foreground ltr:text-left rtl:text-right">
                    {feature.feature_label}
                  </div>

                  {planColumns.map((column) => (
                    <div
                      key={`${feature.feature_id}-${column.id}`}
                      className={cn(
                        "flex items-center justify-center text-sm",
                        column.id === "pro"
                          ? "font-medium text-foreground"
                          : "text-muted-foreground",
                      )}
                    >
                      {getValueForPlan(feature, column.id)}
                    </div>
                  ))}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
