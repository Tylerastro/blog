import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import "./globals.css";
import { NavBar } from "@/components/NavBar";
import { BackToTop } from "@/components/BackToTop";
import { Outfit, Author, zenKaku } from "@/styles/fonts";

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
          "antialiased bg-background ",
          zenKaku.className,
          Outfit.className,
          Author.className,
          "transition-colors",
          "duration-700"
        )}
      >
        <Toaster />
        <NavBar />
        {children}
        <BackToTop />
      </body>
    </html>
  );
}
