"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardHeader } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { IconButton } from "@/components/ui/icon-button";

type Person = { name: string; role: string; requests: number };

const people: Person[] = [
  { name: "Ricardo Obrien",  role: "Procurement Admin", requests: 12 },
  { name: "Naomi Williams",  role: "Procurement Admin", requests: 9 },
  { name: "Elijah Booker",   role: "Procurement Admin", requests: 12 },
  { name: "Priya Natarajan", role: "Procurement Admin", requests: 7 },
];

export function WorkloadList({ delay = 0 }: { delay?: number }) {
  return (
    <Card delay={delay}>
      <CardHeader
        title="Highest Workload"
        right={
          <div className="flex items-center gap-1">
            <IconButton aria-label="Previous"><ChevronLeft className="h-3.5 w-3.5" /></IconButton>
            <IconButton aria-label="Next"><ChevronRight className="h-3.5 w-3.5" /></IconButton>
          </div>
        }
      />
      <ul className="space-y-2">
        {people.map((p, i) => (
          <motion.li
            key={p.name}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: delay + 0.1 + i * 0.05 }}
            className="flex items-center gap-3 py-1.5"
          >
            <Avatar name={p.name} size={32} />
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-app-text truncate">{p.name}</div>
              <div className="text-[10px] text-app-text-subtle truncate">{p.role}</div>
            </div>
            <span className="inline-flex items-center h-5 px-2 rounded-full bg-app-surface-2 border border-app-border text-[10px] font-semibold text-app-text-muted">
              {p.requests} Req.
            </span>
          </motion.li>
        ))}
      </ul>
    </Card>
  );
}
