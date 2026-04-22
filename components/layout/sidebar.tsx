"use client";

import { motion } from "framer-motion";
import {
  Home,
  LayoutDashboard,
  Users,
  FileText,
  Inbox,
  Bell,
  ShoppingBag,
  RefreshCw,
  FileSignature,
  BookOpen,
  ChevronRight,
  PanelLeft,
} from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { Avatar } from "@/components/ui/avatar";

type NavItem = {
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  active?: boolean;
  badge?: number;
};

const nav: NavItem[] = [
  { label: "Home",           icon: Home },
  { label: "Dashboard",      icon: LayoutDashboard, active: true },
  { label: "Members",        icon: Users },
  { label: "Policies",       icon: FileText },
  { label: "My Requests",    icon: Inbox },
  { label: "Action Center",  icon: Bell, badge: 3 },
  { label: "Procurement",    icon: ShoppingBag },
  { label: "Renewals",       icon: RefreshCw },
  { label: "RFX",            icon: FileSignature },
  { label: "Knowledge Hub",  icon: BookOpen },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "shrink-0 sticky top-0 h-screen flex flex-col",
        "bg-app-sidebar text-white/85 border-r border-black/20",
        "transition-[width] duration-300 ease-out",
        collapsed ? "w-[72px]" : "w-[224px]",
      )}
    >
      {/* brand */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-white/5">
        <div className="flex items-center gap-2 overflow-hidden">
          <LogoMark />
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              className="leading-tight"
            >
              <div className="text-[15px] font-bold font-display text-white">Astra</div>
              <div className="text-[10px] text-white/50 uppercase tracking-widest">by valorant</div>
            </motion.div>
          )}
        </div>
        <button
          aria-label="Toggle sidebar"
          onClick={() => setCollapsed((c) => !c)}
          className="text-white/60 hover:text-white p-1.5 rounded-md hover:bg-white/5 transition-colors"
        >
          <PanelLeft className="h-4 w-4" />
        </button>
      </div>

      {/* nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {nav.map((item) => (
          <SidebarItem key={item.label} item={item} collapsed={collapsed} />
        ))}
      </nav>

      {/* user */}
      <div className="border-t border-white/5 p-3">
        <button
          className={cn(
            "w-full flex items-center gap-2 rounded-lg p-2",
            "hover:bg-white/5 transition-colors text-left",
          )}
        >
          <Avatar name="Jamie Russo" size={32} />
          {!collapsed && (
            <>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-white truncate">Jamie Russo</div>
                <div className="text-[10px] text-white/50 truncate">Procurement Admin</div>
              </div>
              <ChevronRight className="h-3.5 w-3.5 text-white/50" />
            </>
          )}
        </button>
      </div>
    </aside>
  );
}

function SidebarItem({ item, collapsed }: { item: NavItem; collapsed: boolean }) {
  const Icon = item.icon;
  return (
    <button
      className={cn(
        "relative w-full group flex items-center gap-3 h-9 px-2.5 rounded-lg text-xs font-medium",
        "transition-colors",
        item.active
          ? "bg-app-sidebar-active text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]"
          : "text-white/70 hover:text-white hover:bg-app-sidebar-hover",
      )}
    >
      {item.active && (
        <motion.span
          layoutId="sidebar-active"
          className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-r bg-app-teal"
        />
      )}
      <Icon className="h-4 w-4 shrink-0" />
      {!collapsed && <span className="flex-1 text-left truncate">{item.label}</span>}
      {!collapsed && item.badge ? (
        <span className="ml-auto inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-app-teal text-[10px] font-semibold text-[color:var(--app-sidebar)]">
          {item.badge}
        </span>
      ) : null}
    </button>
  );
}

function LogoMark() {
  return (
    <span className="relative inline-flex items-center justify-center w-8 h-8 rounded-lg shrink-0 bg-gradient-to-br from-[#2DD4BF] to-[#0EA5E9] shadow-[0_4px_14px_rgba(45,212,191,0.35)]">
      <svg viewBox="0 0 24 24" className="h-4 w-4 text-[color:var(--app-sidebar)]" fill="currentColor">
        <path d="M12 2l3.5 7.2L23 11l-5.8 5.1L19 23l-7-4-7 4 1.8-6.9L1 11l7.5-1.8L12 2z" />
      </svg>
    </span>
  );
}
