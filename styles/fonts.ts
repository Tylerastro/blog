import localFont from "next/font/local";
import { Zen_Kaku_Gothic_New, Noto_Color_Emoji } from "next/font/google";

// ============================================================================
// FONT DEFINITIONS
// ============================================================================

// Google Fonts
export const zenKaku = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-zen-kaku",
  display: "swap",
});

export const notoColorEmoji = Noto_Color_Emoji({
  subsets: ["emoji"],
  weight: "400",
  variable: "--font-emoji",
  display: "swap",
});

// Local Fonts
export const outfit = localFont({
  src: [
    {
      path: "./Outfit-Variable.ttf",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-outfit",
  display: "swap",
});

export const author = localFont({
  src: [
    {
      path: "./Author-Variable.ttf",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "./Author-VariableItalic.ttf",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-author",
  display: "swap",
});

// ============================================================================
// FONT FAMILIES WITH FALLBACKS
// ============================================================================

export const fontConfig = {
  // Primary text font (for body, paragraphs, general content)
  sans: "var(--font-outfit), var(--font-zen-kaku), system-ui, -apple-system, sans-serif",

  // Display/heading font (for titles, headings)
  display:
    "var(--font-author), var(--font-outfit), var(--font-zen-kaku), serif",

  // Monospace font (for code)
  mono: "ui-monospace, SFMono-Regular, 'SF Mono', Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",

  // Emoji font
  emoji:
    "var(--font-emoji), 'Apple Color Emoji', 'Segoe UI Emoji', 'Noto Color Emoji', sans-serif",

  // Japanese/CJK optimized
  japanese:
    "var(--font-zen-kaku), var(--font-outfit), 'Hiragino Sans', 'Yu Gothic', sans-serif",
};

// ============================================================================
// SEMANTIC FONT UTILITIES
// ============================================================================

export const fontVariables = [
  outfit.variable,
  author.variable,
  zenKaku.variable,
  notoColorEmoji.variable,
].join(" ");
