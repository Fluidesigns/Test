import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Design System",
  description: "Design tokens and style guide",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
