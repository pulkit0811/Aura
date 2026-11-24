import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "AURA",
  description: "Personal AI research and execution workspace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

