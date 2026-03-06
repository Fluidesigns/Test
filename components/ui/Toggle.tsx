"use client";

import React, { InputHTMLAttributes, forwardRef, useId } from "react";
import { cn } from "@/lib/utils";

export type ToggleSize = "sm" | "md" | "lg";

export interface ToggleProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: string;
  description?: string;
  size?: ToggleSize;
  labelPosition?: "right" | "left";
}

const trackSize: Record<ToggleSize, string> = {
  sm: "w-7 h-4",
  md: "w-9 h-5",
  lg: "w-11 h-6",
};

const thumbSize: Record<ToggleSize, string> = {
  sm: "w-3 h-3 top-0.5 left-0.5 peer-checked:translate-x-3",
  md: "w-4 h-4 top-0.5 left-0.5 peer-checked:translate-x-4",
  lg: "w-5 h-5 top-0.5 left-0.5 peer-checked:translate-x-5",
};

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  (
    {
      label,
      description,
      size = "md",
      labelPosition = "right",
      disabled,
      id: externalId,
      className,
      ...rest
    },
    ref,
  ) => {
    const generatedId = useId();
    const id = externalId ?? generatedId;

    const trackEl = (
      <div className={cn("relative inline-flex shrink-0 cursor-pointer", disabled && "cursor-not-allowed")}>
        <input
          ref={ref}
          type="checkbox"
          role="switch"
          id={id}
          disabled={disabled}
          className={cn("sr-only peer", className)}
          {...rest}
        />
        {/* Track */}
        <span
          className={cn(
            "block rounded-full transition-colors duration-200",
            "bg-neutral-300 peer-checked:bg-primary-500",
            "peer-focus-visible:ring-2 peer-focus-visible:ring-primary-300 peer-focus-visible:ring-offset-1",
            "peer-disabled:opacity-50",
            trackSize[size],
          )}
        />
        {/* Thumb */}
        <span
          className={cn(
            "absolute bg-white rounded-full shadow-xs transition-transform duration-200",
            thumbSize[size],
          )}
        />
      </div>
    );

    if (!label && !description) return trackEl;

    return (
      <label
        htmlFor={id}
        className={cn(
          "inline-flex items-start gap-3 cursor-pointer select-none",
          disabled && "cursor-not-allowed opacity-50",
          labelPosition === "left" && "flex-row-reverse",
        )}
      >
        {trackEl}

        <div className="flex flex-col gap-0.5 pt-0.5">
          {label && (
            <span className="text-sm font-medium text-text-primary">{label}</span>
          )}
          {description && (
            <span className="text-xs text-text-secondary">{description}</span>
          )}
        </div>
      </label>
    );
  },
);

Toggle.displayName = "Toggle";
