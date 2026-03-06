"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export type AlertVariant = "success" | "warning" | "error" | "info";

export interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
  icon?: React.ReactNode;
}

// ─── Default icons ────────────────────────────────────────────────────────────

const defaultIcons: Record<AlertVariant, React.ReactNode> = {
  success: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z" fill="currentColor" fillOpacity=".3"/>
      <path d="M11.354 5.646a.5.5 0 00-.708 0L7 9.293 5.354 7.646a.5.5 0 00-.708.708l2 2a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z" fill="currentColor"/>
    </svg>
  ),
  warning: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8.982 1.566a1.13 1.13 0 00-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5a.905.905 0 01.9 1L8.5 9.5a.5.5 0 01-1 0l-.4-3.5A.905.905 0 018 5zm.002 6a1 1 0 110 2 1 1 0 010-2z" fill="currentColor"/>
    </svg>
  ),
  error: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm7.5-3.5a.5.5 0 011 0v4a.5.5 0 01-1 0v-4zm.5 6a.75.75 0 110 1.5.75.75 0 010-1.5z" fill="currentColor"/>
    </svg>
  ),
  info: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm6.5-1.5A1.5 1.5 0 018 5a1.5 1.5 0 011.5 1.5V8a.5.5 0 001 0v-.5A2.5 2.5 0 008 5a2.5 2.5 0 00-2.5 2.5V8a.5.5 0 001 0v-.5zM8 11a1 1 0 100-2 1 1 0 000 2z" fill="currentColor"/>
    </svg>
  ),
};

// ─── Variant map ──────────────────────────────────────────────────────────────

const variantClasses: Record<AlertVariant, { wrapper: string; icon: string; title: string; body: string }> = {
  success: {
    wrapper: "bg-success-bg border-success-border",
    icon:    "text-success-default",
    title:   "text-success-dark",
    body:    "text-success-text",
  },
  warning: {
    wrapper: "bg-warning-bg border-warning-border",
    icon:    "text-warning-default",
    title:   "text-warning-dark",
    body:    "text-warning-text",
  },
  error: {
    wrapper: "bg-error-bg border-error-border",
    icon:    "text-error-default",
    title:   "text-error-dark",
    body:    "text-error-text",
  },
  info: {
    wrapper: "bg-info-bg border-info-border",
    icon:    "text-info-default",
    title:   "text-info-dark",
    body:    "text-info-text",
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

export function Alert({
  variant = "info",
  title,
  children,
  dismissible = false,
  onDismiss,
  icon,
  className,
}: AlertProps) {
  const [visible, setVisible] = useState(true);
  const styles = variantClasses[variant];

  if (!visible) return null;

  const handleDismiss = () => {
    setVisible(false);
    onDismiss?.();
  };

  return (
    <div
      role="alert"
      className={cn(
        "flex gap-3 rounded-xl border p-4",
        styles.wrapper,
        className,
      )}
    >
      {/* Icon */}
      <span className={cn("mt-0.5 shrink-0", styles.icon)}>
        {icon ?? defaultIcons[variant]}
      </span>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {title && (
          <p className={cn("text-sm font-semibold mb-0.5", styles.title)}>
            {title}
          </p>
        )}
        <div className={cn("text-sm", styles.body)}>{children}</div>
      </div>

      {/* Dismiss */}
      {dismissible && (
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss"
          className={cn(
            "shrink-0 -mt-0.5 -mr-1 p-1 rounded-lg transition-colors",
            "hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current",
            styles.body,
          )}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
          </svg>
        </button>
      )}
    </div>
  );
}
