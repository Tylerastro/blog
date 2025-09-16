/**
 * Project-related type definitions
 */

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  link: string;
}

// Technology badge information
export interface TechBadgeInfo {
  name: string;
  color?: string;
  icon?: string;
}

// Export as both named and default for backwards compatibility
export default Project;
