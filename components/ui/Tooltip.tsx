"use client";

import React, { useState, useRef, useId } from "react";
import { cn } from "@/lib/utils";

export type TooltipPosition = "top" | "right" | "bottom" | "left";

export interface TooltipProps {
  content: React.ReactNode;
  position?: TooltipPosition;
  delay?: number;
  children: React.ReactElement;
  className?: string;
}

const positionClasses: Record<TooltipPosition, { wrapper: string; arrow: string }> = {
  top: {
    wrapper: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    arrow: "top-full left-1/2 -translate-x-1/2 border-t-neutral-800 border-x-transparent border-b-transparent border-4",
  },
  bottom: {
    wrapper: "top-full left-1/2 -translate-x-1/2 mt-2",
    arrow: "bottom-full left-1/2 -translate-x-1/2 border-b-neutral-800 border-x-transparent border-t-transparent border-4",
  },
  left: {
    wrapper: "right-full top-1/2 -translate-y-1/2 mr-2",
    arrow: "left-full top-1/2 -translate-y-1/2 border-l-neutral-800 border-y-transparent border-r-transparent border-4",
  },
  right: {
    wrapper: "left-full top-1/2 -translate-y-1/2 ml-2",
    arrow: "right-full top-1/2 -translate-y-1/2 border-r-neutral-800 border-y-transparent border-l-transparent border-4",
  },
};

export function Tooltip({
  content,
  position = "top",
  delay = 200,
  children,
  className,
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const id = useId();
  const pos = positionClasses[position];

  const show = () => {
    timerRef.current = setTimeout(() => setVisible(true), delay);
  };

  const hide = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(false);
  };

  const child = React.Children.only(children);

  return (
    <span className="relative inline-flex">
      {React.cloneElement(child, {
        "aria-describedby": id,
        onMouseEnter: (e: React.MouseEvent) => { show(); child.props.onMouseEnter?.(e); },
        onMouseLeave: (e: React.MouseEvent) => { hide(); child.props.onMouseLeave?.(e); },
        onFocus:      (e: React.FocusEvent) => { show(); child.props.onFocus?.(e); },
        onBlur:       (e: React.FocusEvent) => { hide(); child.props.onBlur?.(e); },
      } as React.HTMLAttributes<HTMLElement>)}

      {visible && (
        <span
          id={id}
          role="tooltip"
          className={cn(
            "absolute z-50 whitespace-nowrap pointer-events-none",
            "px-2.5 py-1.5 rounded-lg text-xs font-medium",
            "bg-neutral-800 text-white shadow-lg",
            pos.wrapper,
            className,
          )}
        >
          {content}
          <span className={cn("absolute border", pos.arrow)} />
        </span>
      )}
    </span>
  );
}
