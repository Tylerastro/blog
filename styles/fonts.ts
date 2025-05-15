import localFont from "next/font/local";

import { Zen_Kaku_Gothic_New, Noto_Color_Emoji } from "next/font/google";

export const zenKaku = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  weight: "400",
});

export const notoColorEmoji = Noto_Color_Emoji({
  subsets: ["emoji"],
  weight: "400",
});

export const Outfit = localFont({
  src: "./Outfit-Variable.ttf",
  weight: "400",
  style: "normal",
});

export const Author = localFont({
  src: "./Author-Variable.ttf",
  weight: "400",
  style: "normal",
});
