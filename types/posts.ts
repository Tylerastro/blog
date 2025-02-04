interface BlogPost {
  title: string;
  created_date: string;
  tags: string[];
  slug: string;
  description?: string;
  preview: string;
}

export type { BlogPost };
export type PostMetadata = BlogPost;
