"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export type ToastVariant = "success" | "warning" | "error" | "info" | "neutral";

export interface ToastProps {
  variant?: ToastVariant;
  title: string;
  description?: string;
  duration?: number;   // ms, 0 = persist
  onClose?: () => void;
  action?: { label: string; onClick: () => void };
  className?: string;
}

const toastIcons: Record<ToastVariant, React.ReactNode> = {
  success: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeOpacity=".3" strokeWidth="1.5"/><path d="M5.5 8.5l2 2 3-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
  ),
  warning: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2.5L14 13H2L8 2.5z" stroke="currentColor" strokeOpacity=".3" strokeWidth="1.5" strokeLinejoin="round"/><path d="M8 6.5v3M8 11v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
  ),
  error: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeOpacity=".3" strokeWidth="1.5"/><path d="M6 6l4 4M10 6l-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
  ),
  info: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeOpacity=".3" strokeWidth="1.5"/><path d="M8 7v4M8 5.5V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
  ),
  neutral: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeOpacity=".3" strokeWidth="1.5"/><path d="M8 7v4M8 5.5V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
  ),
};

const variantStyles: Record<ToastVariant, { wrap: string; icon: string }> = {
  success: { wrap: "border-success-border bg-white", icon: "text-success-default" },
  warning: { wrap: "border-warning-border bg-white", icon: "text-warning-default" },
  error:   { wrap: "border-error-border   bg-white", icon: "text-error-default"   },
  info:    { wrap: "border-info-border    bg-white", icon: "text-info-default"    },
  neutral: { wrap: "border-border-default bg-white", icon: "text-neutral-500"     },
};

export function Toast({
  variant = "neutral",
  title,
  description,
  duration = 4000,
  onClose,
  action,
  className,
}: ToastProps) {
  const [visible, setVisible] = useState(true);
  const styles = variantStyles[variant];

  useEffect(() => {
    if (!duration) return;
    const t = setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, duration);
    return () => clearTimeout(t);
  }, [duration, onClose]);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "inline-flex items-start gap-3 rounded-xl border shadow-lg px-4 py-3 min-w-64 max-w-sm",
        styles.wrap,
        className,
      )}
    >
      <span className={cn("mt-0.5 shrink-0", styles.icon)}>
        {toastIcons[variant]}
      </span>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-text-primary">{title}</p>
        {description && (
          <p className="text-xs text-text-secondary mt-0.5">{description}</p>
        )}
        {action && (
          <button
            type="button"
            onClick={action.onClick}
            className="mt-1.5 text-xs font-medium text-primary-600 hover:text-primary-700 underline-offset-2 hover:underline"
          >
            {action.label}
          </button>
        )}
      </div>

      <button
        type="button"
        onClick={() => { setVisible(false); onClose?.(); }}
        aria-label="Close notification"
        className="shrink-0 -mt-0.5 -mr-1 p-1 rounded-lg text-text-tertiary hover:bg-neutral-100 transition-colors"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
        </svg>
      </button>
    </div>
  );
}
