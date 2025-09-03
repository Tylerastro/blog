import localFont from "next/font/local";
import { Zen_Kaku_Gothic_New, Noto_Color_Emoji } from "next/font/google";

/**
 * ============================================================================
 * BLOG TYPOGRAPHY SYSTEM
 * ============================================================================
 *
 * This file defines a comprehensive typography system for the blog with:
 * - Carefully selected font pairings for readability and aesthetic appeal
 * - Optimized loading with `display: "swap"` for better performance
 * - Multilingual support (Latin, CJK, Emoji)
 * - Semantic font families with proper fallbacks
 *
 * FONT HIERARCHY & USAGE:
 *
 * 1. OUTFIT (Primary Sans-serif) - Variable font, 100-900 weight
 *    • Use for: Body text, navigation, UI elements, general content
 *    • Character: Clean, modern, highly readable
 *    • Best for: Long-form reading, interface text
 *
 * 2. AUTHOR (Display/Heading) - Variable font with italic support
 *    • Use for: Headlines, article titles, hero text, emphasis
 *    • Character: Distinctive, editorial feel, strong personality
 *    • Best for: Headlines, brand text, attention-grabbing elements
 *
 * 3. ZEN KAKU GOTHIC (CJK Support) - Japanese/Chinese optimization
 *    • Use for: Japanese text, mixed-language content
 *    • Character: Clean, well-balanced for CJK characters
 *    • Best for: Multilingual blogs, Japanese content
 *
 * 4. NOTO COLOR EMOJI (Emoji Support) - Colorful emoji rendering
 *    • Use for: Automatic emoji rendering across platforms
 *    • Character: Consistent emoji appearance
 *    • Best for: Cross-platform emoji consistency
 *
 * PERFORMANCE CONSIDERATIONS:
 * - All fonts use `display: "swap"` for optimal loading
 * - Variable fonts reduce file size compared to multiple static fonts
 * - Local fonts (Outfit, Author) should be optimally compressed
 * - Font variables are injected into document body for global access
 */

// ============================================================================
// FONT LOADING DEFINITIONS
// ============================================================================

/**
 * Google Fonts - Loaded from CDN with subset optimization
 */
export const zenKaku = Zen_Kaku_Gothic_New({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "700"],
  variable: "--font-zen-kaku",
  display: "swap",
  fallback: ["Hiragino Sans", "Yu Gothic", "sans-serif"],
});

export const notoColorEmoji = Noto_Color_Emoji({
  subsets: ["emoji"],
  weight: "400",
  variable: "--font-emoji",
  display: "swap",
  fallback: ["Apple Color Emoji", "Segoe UI Emoji"],
});

/**
 * Local Fonts - Self-hosted for better control and privacy
 * Ensure font files exist in /styles/ directory
 */
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
  fallback: ["system-ui", "-apple-system", "sans-serif"],
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
  fallback: ["Georgia", "serif"],
});

// ============================================================================
// SEMANTIC FONT FAMILIES
// ============================================================================

/**
 * Semantic font stack definitions with carefully ordered fallbacks
 * Use these in your Tailwind config and CSS for consistent typography
 *
 * PRIORITY ORDER:
 * 1. Custom fonts (our defined fonts)
 * 2. System fonts (for fallback performance)
 * 3. Generic families (final fallback)
 */
export const fontConfig = {
  /**
   * SANS - Primary text font for body content, UI elements
   * Priority: Outfit → System fonts → Generic sans-serif
   * Note: Applied as default font in layout.tsx
   *
   * Usage Examples:
   * - Inherited by default from root layout
   * - <p>Body paragraph text</p> (inherits sans font)
   * - Only specify font-sans when overriding another font class
   */
  sans: "var(--font-outfit), system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",

  /**
   * DISPLAY - Headlines and decorative text
   * Priority: Author → System serif → Generic serif
   *
   * Usage Examples:
   * - <h1 className="font-display">Article Headlines</h1>
   * - <h2 className="font-display">Section Titles</h2>
   * - <div className="font-display text-4xl">Hero Text</div>
   */
  display: "var(--font-author), Georgia, serif",

  /**
   * MONO - Code blocks and technical content
   * System monospace fonts for optimal code rendering
   *
   * Usage Examples:
   * - <code className="font-mono">inline code</code>
   * - <pre className="font-mono">code blocks</pre>
   * - <kbd className="font-mono">keyboard shortcuts</kbd>
   */
  mono: "ui-monospace, 'SF Mono', SFMono-Regular, 'Cascadia Code', 'Roboto Mono', 'Fira Code', Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",

  /**
   * EMOJI - Consistent emoji rendering across platforms
   *
   * Usage Examples:
   * - Automatic emoji rendering in text content
   * - Mixed emoji/text content
   */
  emoji:
    "var(--font-emoji), 'Apple Color Emoji', 'Segoe UI Emoji', 'Noto Color Emoji', sans-serif",

  /**
   * JAPANESE - CJK-optimized text rendering
   * Priority: Zen Kaku → System CJK fonts
   *
   * Usage Examples:
   * - <p className="font-japanese">日本語テキスト</p>
   * - <article lang="ja" className="font-japanese">Japanese articles</article>
   */
  japanese:
    "var(--font-zen-kaku), 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', 'Yu Gothic', 'Meiryo', sans-serif",
} as const;

// ============================================================================
// INTEGRATION UTILITIES
// ============================================================================

/**
 * Font CSS Variables String
 *
 * This string contains all font CSS custom properties that need to be
 * injected into the document. Add this to your document body className.
 *
 * Implementation:
 * ```tsx
 * <body className={`${fontVariables} antialiased`}>
 * ```
 *
 * This makes all font variables available globally via CSS custom properties:
 * - var(--font-outfit)
 * - var(--font-author)
 * - var(--font-zen-kaku)
 * - var(--font-emoji)
 */
export const fontVariables = [
  zenKaku.variable,
  author.variable,
  outfit.variable,
  notoColorEmoji.variable,
].join(" ");

// ============================================================================
// DEVELOPER UTILITIES
// ============================================================================

/**
 * Font Information Object
 * Useful for debugging and documentation
 */
export const fontInfo = {
  fonts: {
    outfit: {
      name: "Outfit",
      type: "local",
      usage: "Body text, UI elements",
      weights: "100-900 (variable)",
      variable: "--font-outfit",
    },
    author: {
      name: "Author",
      type: "local",
      usage: "Headlines, display text",
      weights: "100-900 (variable)",
      styles: "normal, italic",
      variable: "--font-author",
    },
    zenKaku: {
      name: "Zen Kaku Gothic New",
      type: "google",
      usage: "CJK text, multilingual support",
      weights: "400, 500, 700",
      variable: "--font-zen-kaku",
    },
    notoColorEmoji: {
      name: "Noto Color Emoji",
      type: "google",
      usage: "Emoji rendering",
      weights: "400",
      variable: "--font-emoji",
    },
  },
  families: Object.keys(fontConfig),
  totalFonts: 4,
} as const;
