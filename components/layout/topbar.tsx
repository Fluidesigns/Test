"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Search, Bell, Sparkles, LayoutGrid, Rows3, Rows4 } from "lucide-react";
import { useUI, type Density } from "@/components/providers/ui-provider";
import { IconButton } from "@/components/ui/icon-button";
import { cn } from "@/lib/cn";

export function Topbar({ title }: { title: string }) {
  const { theme, toggleTheme, density, setDensity } = useUI();

  return (
    <header
      className={cn(
        "sticky top-0 z-20 h-16 flex items-center gap-3 px-5 lg:px-6",
        "bg-app-surface/80 backdrop-blur border-b border-app-border",
      )}
    >
      <motion.h1
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-[17px] font-bold font-display text-app-text tracking-tight"
      >
        {title}
      </motion.h1>

      <div className="hidden md:flex items-center ml-4 gap-2 flex-1 max-w-md">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-app-text-subtle" />
          <input
            placeholder="Search reports, requests, vendors…"
            className={cn(
              "w-full h-9 pl-9 pr-3 rounded-lg text-xs",
              "bg-app-surface-2 border border-app-border text-app-text",
              "placeholder:text-app-text-subtle",
              "focus:outline-none focus:border-app-accent focus:ring-2 focus:ring-app-accent/20",
            )}
          />
        </div>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <DensityControl density={density} onChange={setDensity} />
        <IconButton aria-label="Notifications">
          <Bell className="h-4 w-4" />
        </IconButton>
        <IconButton aria-label="AI assistant" title="AI insights">
          <Sparkles className="h-4 w-4 text-app-teal" />
        </IconButton>
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </div>
    </header>
  );
}

function DensityControl({ density, onChange }: { density: Density; onChange: (d: Density) => void }) {
  const items: Array<{ v: Density; Icon: typeof Rows3; label: string }> = [
    { v: "airy",      Icon: Rows3,    label: "Airy layout" },
    { v: "balanced",  Icon: LayoutGrid, label: "Balanced layout" },
    { v: "dense",     Icon: Rows4,    label: "Dense layout" },
  ];
  return (
    <div
      role="radiogroup"
      aria-label="Layout density"
      className="inline-flex items-center p-0.5 rounded-lg bg-app-surface-2 border border-app-border"
    >
      {items.map(({ v, Icon, label }) => {
        const active = density === v;
        return (
          <button
            key={v}
            role="radio"
            aria-checked={active}
            aria-label={label}
            title={label}
            onClick={() => onChange(v)}
            className={cn(
              "relative inline-flex items-center justify-center h-7 w-7 rounded-md transition-colors",
              active ? "text-app-accent-fg" : "text-app-text-muted hover:text-app-text",
            )}
          >
            {active && (
              <motion.span
                layoutId="density-active"
                className="absolute inset-0 rounded-md bg-app-text"
                transition={{ type: "spring", stiffness: 420, damping: 36 }}
              />
            )}
            <Icon className="relative h-3.5 w-3.5" />
          </button>
        );
      })}
    </div>
  );
}

function ThemeToggle({ theme, onToggle }: { theme: "light" | "dark"; onToggle: () => void }) {
  return (
    <button
      aria-label="Toggle theme"
      onClick={onToggle}
      className={cn(
        "relative inline-flex items-center h-8 w-[56px] rounded-full p-0.5",
        "bg-app-surface-2 border border-app-border",
        "transition-colors",
      )}
    >
      <motion.span
        animate={{ x: theme === "dark" ? 24 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
        className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-app-surface border border-app-border shadow-sm"
      >
        <AnimatePresence mode="wait" initial={false}>
          {theme === "dark" ? (
            <motion.span
              key="moon"
              initial={{ opacity: 0, rotate: -20 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 20 }}
              transition={{ duration: 0.2 }}
            >
              <Moon className="h-3.5 w-3.5 text-app-accent" />
            </motion.span>
          ) : (
            <motion.span
              key="sun"
              initial={{ opacity: 0, rotate: -20 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 20 }}
              transition={{ duration: 0.2 }}
            >
              <Sun className="h-3.5 w-3.5 text-app-warning" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.span>
    </button>
  );
}
