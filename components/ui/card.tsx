"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type CardProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
  className?: string;
  /** Padding follows density token by default; pass `padded={false}` for edge-to-edge. */
  padded?: boolean;
  delay?: number;
};

export function Card({ children, className, padded = true, delay = 0, ...rest }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1], delay }}
      className={cn(
        "bg-app-surface border border-app-border",
        "rounded-[var(--d-radius)]",
        "shadow-[0_1px_2px_0_rgba(15,23,42,0.04)]",
        padded && "p-[var(--d-card-pad-y)_var(--d-card-pad-x)]",
        className,
      )}
      style={padded ? { padding: "var(--d-card-pad-y) var(--d-card-pad-x)" } : undefined}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function CardHeader({
  title,
  right,
  className,
}: {
  title: ReactNode;
  right?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center justify-between gap-4 mb-3", className)}>
      <h3 className="text-sm font-semibold text-app-text font-display tracking-tight">{title}</h3>
      {right && <div className="flex items-center gap-2 shrink-0">{right}</div>}
    </div>
  );
}
