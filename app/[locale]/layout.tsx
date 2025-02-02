import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Cabin } from "next/font/google";
import { unstable_setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { cn } from "@/lib/utils";
import { getMessages } from "next-intl/server";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/ui/header";
import { Roboto_Mono } from "next/font/google";
import Footer from "@/components/ui/footer";

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

export default async function LocaleLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;

  const { locale } = params;

  const { children } = props;

  unstable_setRequestLocale(locale);
  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={cn(
          "antialiased bg-background ",
          "font-cabin",
          roboto_mono.variable,
          local_edu_vic_wa_nt_beginner.variable,
          cabin.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <Toaster />
          <div className="animate-page-transition">{children}</div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
