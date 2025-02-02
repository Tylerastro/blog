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
    <div className="flex flex-col items-center w-full sm:w-[90svw] md:w-[80svw] max-w-3xl mx-auto">
      {posts.map((post) => (
        <article
          key={post.title}
          className="border-b py-3 w-full border-gray-200 pb-8 last:border-b-0"
        >
          <Link href={`/posts/${post.slug}`} className="block group">
            <h2 className="text-2xl font-bold text-primary-foreground group-hover:text-blue-600 transition-colors duration-200">
              {post.title}
            </h2>
            <time
              dateTime={post.created_date}
              className="text-sm text-gray-500 mb-2 block"
            >
              {formatDate(post.created_date)}
            </time>
            <p className="text-gray-600">{post.preview}</p>
            <span className="inline-block mt-4 text-blue-600 font-medium group-hover:underline">
              Read more
            </span>
          </Link>
        </article>
      ))}
    </div>
  );
}
