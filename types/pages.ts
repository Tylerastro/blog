/**
 * Page component prop interfaces for Next.js routes
 * These interfaces define the expected props for page components in the app router
 */

// Common language parameter type used across internationalized routes
export type Language = "en" | "zh" | "jp";

// Base interface for pages with language routing
export interface BasePageProps {
  params: Promise<{ lang: Language }>;
}

// Home page props
export interface HomeProps extends BasePageProps {}

// About page props
export interface AboutMeProps extends BasePageProps {}

// Blog posts listing page props
export interface BlogPostsListProps extends BasePageProps {
  searchParams: Promise<{ page: string }>;
}

// Individual blog post page props
export interface BlogPostPageProps {
  params: Promise<{
    lang: Language;
    slug: string;
  }>;
}

// Projects page props
export interface ProjectsPageProps extends BasePageProps {}

// Tag cloud/listing page props
export interface TagCloudPageProps extends BasePageProps {}

// Individual tag page props
export interface TagSlugPageProps {
  params: Promise<{
    lang: Language;
    slug: string;
  }>;
  searchParams: Promise<{ page?: string }>;
}