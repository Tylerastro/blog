import { PostMetadata } from "@/types/posts";
import Link from "next/link";
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

interface PostListProps {
  posts: PostMetadata[];
}

export default function PostList({ posts }: PostListProps) {
  return (
    <div className="flex flex-col items-center w-full sm:w-[90svw] md:w-[80svw] max-w-3xl mx-auto group">
      {posts.map((post) => (
        <article
          key={post.title}
          className="border-b py-3 w-full border-gray-200 pb-8 last:border-b-0 transition-all duration-500 \
          group-hover:opacity-50 group-hover:scale-95 hover:!opacity-100 hover:!scale-105 overflow-x-hidden"
        >
          <Link href={`/posts/${post.slug}`} className="block">
            <h2 className="text-2xl font-bold text-primary-foreground transition-colors duration-200 break-words">
              {post.title}
            </h2>
            <time
              dateTime={post.created_date}
              className="text-sm text-muted-foreground mb-2 block"
            >
              {formatDate(post.created_date)}
            </time>
            <p
              className="text-secondary-foreground/80 break-words line-clamp-2"
              title={post.preview}
            >
              {post.preview}
            </p>
            <span className="inline-block mt-4 text-link font-medium">
              Read more
            </span>
          </Link>
        </article>
      ))}
    </div>
  );
}
