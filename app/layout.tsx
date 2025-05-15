import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import "./globals.css";
import { NavBar } from "@/components/NavBar";
import { BackToTop } from "@/components/BackToTop";
import { Outfit, Author } from "@/styles/fonts";

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
          Author.className,
          Outfit.className,
          "transition-colors",
          "duration-700"
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Toaster />
          <NavBar />
          {children}
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
