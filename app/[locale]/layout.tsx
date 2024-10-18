import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { unstable_setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { cn } from "@/lib/utils";
import { getMessages } from "next-intl/server";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/ui/header";
import { routing } from "@/i18n/routing";
import { Roboto_Mono, Edu_VIC_WA_NT_Beginner } from "next/font/google";
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
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
export const metadata: Metadata = {
  title: "Blog",
  description: "",
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Providing all messages to the client
  // side is the easiest way to get started
  unstable_setRequestLocale(locale);
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body
        className={cn(
          "antialiased",
          roboto_mono.variable,
          local_edu_vic_wa_nt_beginner.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            <div className="min-h-screen flex flex-col">
              <Header />
              {children}
            </div>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
