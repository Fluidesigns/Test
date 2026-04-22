"use client";

import { motion } from "framer-motion";
import { useId, useState } from "react";
import { cn } from "@/lib/cn";

type Option = { value: string; label: string };

export function Segmented({
  options,
  value: controlled,
  onChange,
  size = "sm",
  className,
}: {
  options: Option[];
  value?: string;
  onChange?: (v: string) => void;
  size?: "xs" | "sm";
  className?: string;
}) {
  const [internal, setInternal] = useState(options[0]?.value);
  const value = controlled ?? internal;
  const groupId = useId();

  const h = size === "xs" ? "h-7" : "h-8";
  const text = size === "xs" ? "text-[11px]" : "text-xs";

  return (
    <div
      role="tablist"
      className={cn(
        "relative inline-flex items-center p-0.5 rounded-lg bg-app-surface-2 border border-app-border",
        className,
      )}
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            role="tab"
            aria-selected={active}
            onClick={() => {
              setInternal(opt.value);
              onChange?.(opt.value);
            }}
            className={cn(
              "relative px-3 rounded-md font-medium transition-colors",
              h,
              text,
              active ? "text-app-accent-fg" : "text-app-text-muted hover:text-app-text",
            )}
          >
            {active && (
              <motion.span
                layoutId={`seg-${groupId}`}
                className="absolute inset-0 rounded-md bg-app-text shadow-sm"
                transition={{ type: "spring", stiffness: 420, damping: 36 }}
              />
            )}
            <span className="relative">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
