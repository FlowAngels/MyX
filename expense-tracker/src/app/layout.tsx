import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import BottomNav from "@/components/ui/bottom-nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MyX - Find your X-factor in financial management",
  description: "The expense tracker for the non-accountant who gets things done: in work, play, life.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased pb-16`}
      >
        <BootSplash minMs={2000}>
          {children}
          <BottomNav />
          <Toaster />
          {/* SSR-stable portal target for splash overlay */}
          <div id="bootsplash-root" />
        </BootSplash>
      </body>
    </html>
  );
}
