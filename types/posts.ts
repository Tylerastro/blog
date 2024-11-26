interface BlogPost {
  title: string;
  created_date: string;
  tags: string[];
  slug: string;
  description?: string;
}

interface BlogPostsListProps {
  locale: string;
  page?: number;
}

export type { BlogPost, BlogPostsListProps };
export type PostMetadata = BlogPost;
