import getPostsMetadata from "./getPostMetaData";

export interface AdjacentPost {
  title: string;
  slug: string;
  created_date: string;
}

export interface AdjacentPosts {
  previous: AdjacentPost | null;
  next: AdjacentPost | null;
}

export function getAdjacentPosts(currentSlug: string): AdjacentPosts {
  const posts = getPostsMetadata();

  // Sort posts by date (newest first)
  const sortedPosts = posts.sort((a, b) => {
    const dateA = new Date(a.created_date);
    const dateB = new Date(b.created_date);
    return dateB.getTime() - dateA.getTime();
  });

  // Find current post index
  const currentIndex = sortedPosts.findIndex(post => post.slug === currentSlug);

  if (currentIndex === -1) {
    return { previous: null, next: null };
  }

  // Get adjacent posts (previous = newer, next = older)
  const previousPost = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < sortedPosts.length - 1 ? sortedPosts[currentIndex + 1] : null;

  return {
    previous: previousPost ? {
      title: previousPost.title,
      slug: previousPost.slug,
      created_date: previousPost.created_date
    } : null,
    next: nextPost ? {
      title: nextPost.title,
      slug: nextPost.slug,
      created_date: nextPost.created_date
    } : null
  };
}