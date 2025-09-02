import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { BackToTop } from "@/components/BackToTop";
import { fontVariables } from "@/styles/fonts";

export const metadata: Metadata = {
  title: "Blog",
  description: "",
};

export default async function LocaleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US" suppressHydrationWarning>
      <body
        className={cn(
          "antialiased bg-background",
          fontVariables,
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
