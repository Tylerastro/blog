import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import "./globals.css";
import { NavBar } from "@/components/NavBar";
import { BackToTop } from "@/components/BackToTop";
import { roboto_mono, cabin } from "./fonts";

export const metadata: Metadata = {
  title: "Blog",
  description: "",
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: "en-US" | "zh-TW" };
}>) {
  const { lang } = await params;

  return (
    <html lang={lang} suppressHydrationWarning>
      <body
        className={cn(
          "antialiased bg-background ",
          "font-cabin",
          "transition-colors",
          "duration-700",
          roboto_mono.className,
          cabin.className
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Toaster />
          <NavBar />
          {children}
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
