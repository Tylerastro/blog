/**
 * Blog post and content-related type definitions
 * Includes posts, projects, publications, and related metadata
 */

// Core blog post interface
export interface BlogPost {
  title: string;
  created_date: string;
  tags: string[];
  slug: string;
  description?: string;
  preview: string;
}

// Alias for backwards compatibility
export type PostMetadata = BlogPost;

// Table of Contents item structure
export interface TOCItem {
  id: string;
  text: string;
  level: number;
  key: string;
}

// Timeline grouped posts structure
export interface GroupedPosts {
  [year: string]: BlogPost[];
}

// Publication type for academic/research content
export interface Publication {
  title: string;
  authors: string[];
  journal: string;
  year: number;
  volume?: string;
  link: string;
}

// Tag badge props
export interface TagInfo {
  name: string;
  count?: number;
  slug?: string;
}
