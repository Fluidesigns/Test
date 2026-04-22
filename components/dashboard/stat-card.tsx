"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/cn";

export function StatCard({
  label,
  value,
  deltaPercent = 7.1,
  deltaLabel = "vs last week",
  linkLabel = "View Details",
  icon: Icon,
  accent = "var(--app-accent)",
  delay = 0,
}: {
  label: string;
  value: string;
  deltaPercent?: number;
  deltaLabel?: string;
  linkLabel?: string;
  icon?: LucideIcon;
  accent?: string;
  delay?: number;
}) {
  const positive = deltaPercent >= 0;
  return (
    <Card delay={delay} className="group">
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

      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: delay + 0.08 }}
        className="mt-2 text-[28px] leading-none font-bold font-display text-app-text tracking-tight"
      >
        {value}
      </motion.div>

      <div className="mt-2 flex items-center justify-between">
        <span
          className={cn(
            "inline-flex items-center gap-1 text-[11px] font-semibold",
            positive ? "text-app-success" : "text-app-danger",
          )}
        >
          <ArrowUpRight className={cn("h-3 w-3", !positive && "rotate-180")} />
          {positive ? "+" : ""}
          {deltaPercent.toFixed(1)}%{" "}
          <span className="text-app-text-subtle font-normal">{deltaLabel}</span>
        </span>
        <button className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-app-accent hover:brightness-110">
          {linkLabel}
          <ChevronRight className="h-3 w-3" />
        </button>
      </div>
    </Card>
  );
}
