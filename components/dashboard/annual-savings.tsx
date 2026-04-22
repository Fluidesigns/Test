"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Segmented } from "@/components/ui/segmented";

type Row = { category: string; avoidance: number; reduction: number };

const DATA: Record<string, Row[]> = {
  TCV: [
    { category: "Technology",      avoidance: 78500, reduction: 42300 },
    { category: "Marketing",       avoidance: 64200, reduction: 38900 },
    { category: "Facilities",      avoidance: 41300, reduction: 22500 },
    { category: "Professional Svc",avoidance: 32100, reduction: 17400 },
  ],
  "In-Year": [
    { category: "Technology",      avoidance: 52300, reduction: 28800 },
    { category: "Marketing",       avoidance: 40900, reduction: 24600 },
    { category: "Facilities",      avoidance: 28700, reduction: 14100 },
    { category: "Professional Svc",avoidance: 19800, reduction: 11200 },
  ],
};

const fmt = new Intl.NumberFormat("en-US");

export function AnnualSavings({ delay = 0 }: { delay?: number }) {
  const [mode, setMode] = useState("TCV");
  const rows = useMemo(() => DATA[mode], [mode]);

  return (
    <Card delay={delay} padded={false}>
      <div className="flex items-center justify-between px-[var(--d-card-pad-x)] py-[var(--d-card-pad-y)] border-b border-app-divider">
        <h3 className="text-sm font-semibold text-app-text font-display tracking-tight">Annual Saving Split</h3>
        <Segmented
          options={[
            { value: "TCV",     label: "TCV" },
            { value: "In-Year", label: "In-Year" },
          ]}
          value={mode}
          onChange={setMode}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="text-[10px] uppercase tracking-wider text-app-text-subtle">
              <Th>Category</Th>
              <Th>Cost Avoidance</Th>
              <Th>Cost Reduction</Th>
              <Th>Total Savings</Th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => {
              const total = r.avoidance + r.reduction;
              return (
                <motion.tr
                  key={r.category}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: delay + 0.12 + i * 0.04 }}
                  className="border-t border-app-divider hover:bg-app-surface-hover transition-colors"
                  style={{ height: "var(--d-row-h)" }}
                >
                  <Td className="font-medium text-app-text">{r.category}</Td>
                  <Td>
                    <Money n={r.avoidance} />
                  </Td>
                  <Td>
                    <Money n={r.reduction} />
                  </Td>
                  <Td>
                    <Money n={total} strong />
                  </Td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function Money({ n, strong }: { n: number; strong?: boolean }) {
  return (
    <div className="leading-tight">
      <div className={strong ? "font-bold text-app-text" : "font-semibold text-app-text"}>
        ${fmt.format(n)}
      </div>
      <div className="text-[10px] text-app-text-subtle">USD</div>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="text-left font-medium px-[var(--d-card-pad-x)] py-2.5">{children}</th>
  );
}
function Td({ children, className }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-[var(--d-card-pad-x)] align-middle ${className ?? ""}`}>{children}</td>;
}
