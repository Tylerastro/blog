import type { Metadata } from "next";

import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { RootLayoutProps } from "@/lib/types";
import "@/app/globals.css";
import { Sidebar } from "@/components/Sidebar";
import { BackToTop } from "@/components/BackToTop";
import { fontVariables, outfit } from "@/styles/fonts";

export const metadata: Metadata = {
  title: "Blog",
  description: "",
};

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { lang } = await params;

  return (
    <html
      lang={lang}
      suppressHydrationWarning
      className={cn(fontVariables, outfit.className)}
    >
      <body
        className={cn(
          "antialiased bg-background",
          "transition-colors",
          "duration-700"
        )}
      >
        <Toaster />
        <Sidebar />
        {children}
        <BackToTop />
      </body>
    </html>
  );
}
