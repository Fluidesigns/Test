"use client";

import { cn } from "@/lib/cn";
import type { ButtonHTMLAttributes, ReactNode } from "react";

export function IconButton({
  className,
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center justify-center h-8 w-8 rounded-lg",
        "bg-app-surface border border-app-border text-app-text-muted",
        "hover:bg-app-surface-hover hover:text-app-text transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent/40",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
