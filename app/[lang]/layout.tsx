import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Cabin } from "next/font/google";
import { cn } from "@/lib/utils";
import localFont from "next/font/local";
import "./globals.css";
import { Roboto_Mono } from "next/font/google";
import { NavBar } from "@/components/NavBar";
import { BackToTop } from "@/components/BackToTop";

const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
});
const local_edu_vic_wa_nt_beginner = localFont({
  src: "./fonts/EduAUVICWANTDots-VariableFont_wght.ttf",
  weight: "200",
  variable: "--font-edu-vic-wa-nt-beginner",
});
const cabin = Cabin({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cabin",
  weight: "500",
});

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
          roboto_mono.variable,
          local_edu_vic_wa_nt_beginner.variable,
          cabin.variable
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
