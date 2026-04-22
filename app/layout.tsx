import type { Metadata } from "next";
import "./globals.css";
import { UIProvider } from "@/components/providers/ui-provider";
import { ThemeScript } from "@/components/providers/theme-script";

export const metadata: Metadata = {
  title: "Astra — Analytics Dashboard",
  description: "Enterprise procurement analytics dashboard.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="bg-app-bg text-app-text">
        <UIProvider>{children}</UIProvider>
      </body>
    </html>
  );
}
