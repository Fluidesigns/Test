"use client";

import { cn } from "@/lib/cn";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "ghost" | "outline" | "soft";
type Size = "sm" | "md";

export function Button({
  variant = "outline",
  size = "sm",
  className,
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  children?: ReactNode;
}) {
  const base =
    "inline-flex items-center justify-center gap-1.5 font-medium rounded-lg " +
    "transition-all duration-200 select-none outline-none " +
    "focus-visible:ring-2 focus-visible:ring-app-accent/40 " +
    "active:scale-[0.98]";

  const sizes: Record<Size, string> = {
    sm: "h-8 px-3 text-xs",
    md: "h-10 px-4 text-sm",
  };

  const variants: Record<Variant, string> = {
    primary:
      "bg-app-accent text-app-accent-fg hover:brightness-110 shadow-[0_1px_0_rgba(255,255,255,0.15)_inset]",
    ghost:
      "bg-transparent text-app-text hover:bg-app-surface-hover",
    outline:
      "bg-app-surface text-app-text border border-app-border hover:bg-app-surface-hover hover:border-app-border-strong",
    soft:
      "bg-app-accent-soft text-app-accent hover:brightness-95",
  };

  return (
    <button className={cn(base, sizes[size], variants[variant], className)} {...rest}>
      {children}
    </button>
  );
}
