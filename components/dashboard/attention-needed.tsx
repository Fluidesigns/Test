"use client";

import { ChevronRight, FileWarning, ShieldAlert, ClipboardX } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardHeader } from "@/components/ui/card";

const items = [
  { label: "Overdue Request",  count: "06", icon: FileWarning,  color: "var(--app-danger)"  },
  { label: "Overdue Actions",  count: "08", icon: ShieldAlert,  color: "var(--app-warning)" },
  { label: "Overdue Approvals",count: "10", icon: ClipboardX,   color: "var(--app-danger)"  },
];

export function AttentionNeeded({ delay = 0 }: { delay?: number }) {
  return (
    <Card delay={delay}>
      <CardHeader title="Attention Needed" />
      <ul className="space-y-1.5">
        {items.map((it, i) => {
          const Icon = it.icon;
          return (
            <motion.li
              key={it.label}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: delay + 0.1 + i * 0.05 }}
            >
              <button className="w-full flex items-center gap-3 py-1.5 px-1 rounded-lg hover:bg-app-surface-hover transition-colors group">
                <span
                  className="inline-flex items-center justify-center h-8 w-8 rounded-lg shrink-0"
                  style={{ backgroundColor: `${it.color}15`, color: it.color }}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <span className="text-xs font-semibold text-app-text">{it.count}</span>
                <span className="text-xs text-app-text-muted flex-1 text-left">{it.label}</span>
                <ChevronRight className="h-3.5 w-3.5 text-app-text-subtle group-hover:text-app-text transition-colors" />
              </button>
            </motion.li>
          );
        })}
      </ul>
    </Card>
  );
}
