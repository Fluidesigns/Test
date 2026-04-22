"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconButton } from "@/components/ui/icon-button";
import { Button } from "@/components/ui/button";

type Row = {
  type: string;
  id: string;
  amount: string;
  due: string;
  daysToGo: string;
  priority: "High" | "Medium" | "Low";
  vendor: string;
  vendorInitial: string;
  vendorColor: string;
};

const rows: Row[] = [
  { type: "New Purchase", id: "#1212", amount: "$10,000", due: "13 Nov 2025", daysToGo: "45 days to go", priority: "High",   vendor: "Adobe",   vendorInitial: "A", vendorColor: "#EF4444" },
  { type: "New Purchase", id: "#1213", amount: "$10,000", due: "13 Nov 2025", daysToGo: "45 days to go", priority: "High",   vendor: "Adobe",   vendorInitial: "A", vendorColor: "#EF4444" },
  { type: "Renewal",      id: "#1214", amount: "$ 8,400", due: "22 Nov 2025", daysToGo: "54 days to go", priority: "Medium", vendor: "Figma",   vendorInitial: "F", vendorColor: "#8B5CF6" },
  { type: "Catalog Order",id: "#1215", amount: "$ 2,100", due: "05 Dec 2025", daysToGo: "67 days to go", priority: "Low",    vendor: "Notion",  vendorInitial: "N", vendorColor: "#0F172A" },
];

const priorityTone: Record<Row["priority"], "danger" | "warning" | "success"> = {
  High: "danger",
  Medium: "warning",
  Low: "success",
};

export function PriorityRequests({ delay = 0 }: { delay?: number }) {
  return (
    <Card delay={delay} padded={false}>
      <div className="flex items-center justify-between px-[var(--d-card-pad-x)] py-[var(--d-card-pad-y)] border-b border-app-divider">
        <h3 className="text-sm font-semibold text-app-text font-display tracking-tight">Priority Requests</h3>
        <div className="flex items-center gap-2">
          <IconButton aria-label="Previous"><ChevronLeft className="h-3.5 w-3.5" /></IconButton>
          <IconButton aria-label="Next"><ChevronRight className="h-3.5 w-3.5" /></IconButton>
          <Button variant="outline" size="sm">View All</Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="text-[10px] uppercase tracking-wider text-app-text-subtle">
              <Th>Req Type</Th>
              <Th>Req ID</Th>
              <Th>Amount</Th>
              <Th>Due Date</Th>
              <Th>Priority</Th>
              <Th>Vendor</Th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <motion.tr
                key={r.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: delay + 0.12 + i * 0.04 }}
                className="border-t border-app-divider hover:bg-app-surface-hover transition-colors"
                style={{ height: "var(--d-row-h)" }}
              >
                <Td>
                  <span className="font-medium text-app-text">{r.type}</span>
                </Td>
                <Td><span className="text-app-text-muted">{r.id}</span></Td>
                <Td>
                  <div className="leading-tight">
                    <div className="font-semibold text-app-text">{r.amount}</div>
                    <div className="text-[10px] text-app-text-subtle">USD</div>
                  </div>
                </Td>
                <Td>
                  <div className="leading-tight">
                    <div className="font-medium text-app-text">{r.due}</div>
                    <div className="text-[10px] text-app-text-subtle">{r.daysToGo}</div>
                  </div>
                </Td>
                <Td><Badge tone={priorityTone[r.priority]}>{r.priority}</Badge></Td>
                <Td>
                  <div className="inline-flex items-center gap-2">
                    <span
                      className="inline-flex items-center justify-center h-6 w-6 rounded-md text-[10px] font-bold text-white"
                      style={{ backgroundColor: r.vendorColor }}
                    >
                      {r.vendorInitial}
                    </span>
                    <span className="text-app-text">{r.vendor}</span>
                  </div>
                </Td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="text-left font-medium px-[var(--d-card-pad-x)] py-2.5">
      {children}
    </th>
  );
}
function Td({ children }: { children: React.ReactNode }) {
  return <td className="px-[var(--d-card-pad-x)] align-middle">{children}</td>;
}
