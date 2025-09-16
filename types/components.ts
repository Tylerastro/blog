/**
 * Component prop interfaces for UI and functional components
 * These define the expected props for reusable React components
 */

import type React from "react";
import type { BlogPost, TOCItem, GroupedPosts, TagInfo } from "./posts";
import type { Project } from "./projects";

// Navigation components
export interface NavBarProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  links?: {
    href: string;
    label: string;
  }[];
}

export interface BlogLink {
  title: string;
  href: string;
  description: string;
}

// Post-related components
export interface PostListProps {
  posts: BlogPost[];
}

export interface PostDrawerProps {
  post: BlogPost;
  isOpen: boolean;
  onClose: () => void;
}

export interface PostInfoProps {
  filename: string;
  date: string;
  title: string;
  tags: string[];
  categories: string[];
  mediumLink: string;
  audioLink: string;
}

export interface TimelineProps {
  posts: BlogPost[];
}

export interface TableOfContentsProps {
  items: TOCItem[];
}

export interface TagBadgeProps {
  tag: TagInfo;
  variant?: "default" | "secondary" | "outline";
}

export interface TechBadgeProps {
  name: string;
  icon?: string;
  className?: string;
}

// Content components
export interface CodeBlockProps {
  children: React.ReactNode;
  [key: string]: any;
}

export interface MediumBlockquoteProps {
  children: React.ReactNode;
  author?: string;
  source?: string;
}

// Media components
export interface AudioPlayerProps {
  src: string;
  title?: string;
  artist?: string;
}

// Animation and interaction components
export interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  direction?: "up" | "down" | "left" | "right";
}

export interface TextRotationProps {
  texts: string[];
  interval?: number;
  className?: string;
}

export interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export interface BackToTopProps {
  threshold?: number;
  smooth?: boolean;
}

// Layout and structural components
export interface ListItem {
  id: number;
  name?: string;
  title?: string;
  status?: string;
  date?: string;
  [key: string]: any;
}

export interface TabContentProps {
  items: ListItem[];
  tabValue: string;
  className?: string;
  labelField?: string;
  badgeText?: string;
  hasDarkBackground?: boolean;
}