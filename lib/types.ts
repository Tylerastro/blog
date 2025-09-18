import type { ReactNode } from "react";

/**
 * Props for the root layout component
 */
export interface RootLayoutProps {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}

/**
 * Props for the post layout component
 */
export interface PostLayoutProps {
  children: ReactNode;
  params: Promise<{ lang: string; slug: string }>;
}