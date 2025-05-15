import { Roboto_Mono } from "next/font/google";
import { Cabin } from "next/font/google";
import { Noto_Emoji } from "next/font/google";

export const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
});

export const cabin = Cabin({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cabin",
  weight: "500",
});

export const noto_emoji = Noto_Emoji({
  subsets: ["emoji"],
  display: "swap",
  variable: "--font-noto-emoji",
});
