// app/layout.tsx
import type { Metadata } from "next";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import "./globals.css";
import { Analytics } from '@vercel/analytics/react';
export const metadata: Metadata = {
  title: "GA Demo — Next.js + Google Analytics",
  description: "Demo project showing Google Analytics 4 integration with Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* 
          GoogleAnalytics is placed here in the root layout so it loads 
          on EVERY page automatically. No need to add it per page. 
        */}
        <GoogleAnalytics />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
