"use client";

import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export function FilterChip({
  label,
  onClick,
  className,
}: {
  label: ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 h-8 px-3 rounded-lg",
        "bg-app-surface border border-app-border text-app-text-muted text-xs font-medium",
        "hover:bg-app-surface-hover hover:text-app-text transition-colors",
        className,
      )}
    >
      <span>{label}</span>
      <ChevronDown className="h-3.5 w-3.5 opacity-70" />
    </button>
  );
}
