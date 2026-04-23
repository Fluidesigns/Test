"use client";

import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Sparkline } from "@/components/charts/sparkline";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

export function MetricCard({
  label,
  value,
  valueSuffix,
  deltaPercent,
  deltaLabel = "vs last week",
  icon: Icon,
  spark,
  accent = "var(--app-accent)",
  delay = 0,
}: {
  label: string;
  value: string;
  valueSuffix?: string;
  deltaPercent?: number;
  deltaLabel?: string;
  icon?: LucideIcon;
  spark?: number[];
  accent?: string;
  delay?: number;
}) {
  const positive = (deltaPercent ?? 0) >= 0;
  return (
    <Card delay={delay} className="relative overflow-hidden">
      <div className="flex items-start justify-between gap-3">
        <span className="text-[11px] font-medium text-app-text-muted uppercase tracking-wide">
          {label}
        </span>
        {Icon && (
          <span
            className="inline-flex items-center justify-center h-8 w-8 rounded-lg"
            style={{ backgroundColor: `${accent}14`, color: accent }}
          >
            <Icon className="h-4 w-4" />
          </span>
        )}
      </div>

      <div className="mt-2 flex items-end gap-2">
        <motion.span
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: delay + 0.08 }}
          className="text-[28px] leading-none font-bold font-display text-app-text tracking-tight"
        >
          {value}
        </motion.span>
        {valueSuffix && (
          <span className="text-[13px] font-semibold text-app-text-muted mb-0.5">
            {valueSuffix}
          </span>
        )}
      </div>

      <div className="mt-2 flex items-center justify-between">
        {typeof deltaPercent === "number" && (
          <span
            className={cn(
              "inline-flex items-center gap-1 text-[11px] font-semibold",
              positive ? "text-app-success" : "text-app-danger",
            )}
          >
            {positive ? (
              <ArrowUpRight className="h-3 w-3" />
            ) : (
              <ArrowDownRight className="h-3 w-3" />
            )}
            {positive ? "+" : ""}
            {deltaPercent.toFixed(1)}%{" "}
            <span className="text-app-text-subtle font-normal">{deltaLabel}</span>
          </span>
        )}
        {spark && <Sparkline data={spark} color={accent} />}
      </div>
    </Card>
  );
}
