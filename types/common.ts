/**
 * Common and shared type definitions used throughout the application
 * These are utility types and commonly used interfaces
 */

import type React from "react";

// Common utility types
export type StringOrNumber = string | number;
export type Optional<T> = T | undefined;
export type Nullable<T> = T | null;

// Size variants used across components
export type SizeVariant = "xs" | "sm" | "md" | "lg" | "xl";

// Color variants
export type ColorVariant =
  | "default"
  | "primary"
  | "secondary"
  | "accent"
  | "muted"
  | "destructive";

// Component variants
export type ComponentVariant =
  | "default"
  | "secondary"
  | "outline"
  | "ghost"
  | "link";

// Direction types
export type Direction = "up" | "down" | "left" | "right";
export type Position = "top" | "right" | "bottom" | "left";

// Common component props
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface BaseInteractiveProps extends BaseComponentProps {
  onClick?: () => void;
  onHover?: () => void;
  disabled?: boolean;
}

// Generic props interface
export interface GenericProps {
  [key: string]: any;
}

// Loading and error states
export interface AsyncState<T> {
  data?: T;
  loading: boolean;
  error?: string;
}

// Pagination
export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Search and filtering
export interface SearchParams {
  query?: string;
  tags?: string[];
  dateFrom?: string;
  dateTo?: string;
}

export interface SortOptions {
  field: string;
  direction: "asc" | "desc";
}

// URL and link types
export interface LinkInfo {
  href: string;
  label: string;
  external?: boolean;
  target?: "_blank" | "_self";
}

// Metadata for SEO and social
export interface PageMetadata {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article" | "blog";
}