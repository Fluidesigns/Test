"use client";

import React, { InputHTMLAttributes, forwardRef, useId } from "react";
import { cn } from "@/lib/utils";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: string;
  description?: string;
  indeterminate?: boolean;
  size?: "sm" | "md" | "lg";
  error?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      description,
      indeterminate = false,
      size = "md",
      error = false,
      disabled,
      id: externalId,
      className,
      ...rest
    },
    ref,
  ) => {
    const generatedId = useId();
    const id = externalId ?? generatedId;

    // Handle indeterminate imperatively
    const innerRef = React.useCallback(
      (el: HTMLInputElement | null) => {
        if (el) el.indeterminate = indeterminate;
        if (typeof ref === "function") ref(el);
        else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = el;
      },
      [indeterminate, ref],
    );

    const boxSize: Record<"sm" | "md" | "lg", string> = {
      sm: "w-3.5 h-3.5 rounded",
      md: "w-4 h-4 rounded-md",
      lg: "w-5 h-5 rounded-md",
    };

    const labelSize: Record<"sm" | "md" | "lg", string> = {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    };

    return (
      <div className={cn("flex items-start gap-2.5", disabled && "opacity-50")}>
        <div className="flex items-center pt-0.5">
          <input
            ref={innerRef}
            type="checkbox"
            id={id}
            disabled={disabled}
            aria-invalid={error}
            className={cn(
              "appearance-none shrink-0 border-2 transition-all duration-150 cursor-pointer",
              "checked:bg-primary-500 checked:border-primary-500",
              "indeterminate:bg-primary-500 indeterminate:border-primary-500",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-200 focus-visible:ring-offset-1",
              "disabled:cursor-not-allowed",
              error
                ? "border-error-default"
                : "border-border-strong hover:border-primary-400",
              boxSize[size],
              // custom checkmark via bg-image
              "checked:[background-image:url('data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22white%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M12.207%204.793a1%201%200%20010%201.414l-5%205a1%201%200%2001-1.414%200l-2-2a1%201%200%20011.414-1.414L6.5%209.086l4.293-4.293a1%201%200%20011.414%200z%22%2F%3E%3C%2Fsvg%3E')]",
              "indeterminate:[background-image:url('data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22white%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20x%3D%223%22%20y%3D%227%22%20width%3D%2210%22%20height%3D%222%22%20rx%3D%221%22%2F%3E%3C%2Fsvg%3E')]",
              className,
            )}
            {...rest}
          />
        </div>

        {(label || description) && (
          <div className="flex flex-col gap-0.5">
            {label && (
              <label
                htmlFor={id}
                className={cn(
                  "font-medium text-text-primary cursor-pointer select-none",
                  labelSize[size],
                  disabled && "cursor-not-allowed",
                )}
              >
                {label}
              </label>
            )}
            {description && (
              <p className={cn("text-text-secondary", size === "lg" ? "text-sm" : "text-xs")}>
                {description}
              </p>
            )}
          </div>
        )}
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";
