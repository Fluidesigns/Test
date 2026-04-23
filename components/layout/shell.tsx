"use client";

import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";
import type { ReactNode } from "react";

export function AppShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="min-h-screen flex bg-app-bg text-app-text">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <Topbar title={title} />
        <main className="flex-1 min-w-0 p-5 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
