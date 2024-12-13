import { BlogPost } from "@/types/posts";
import formatDate from "@/utils/formatDate";

export default function PostCard({ post }: { post: BlogPost }) {
  return (
    <div
      key={post.slug}
      className="timeline-event relative mb-8 mr-0 ml-auto w-1/2 pr-0 pl-8 group"
    >
      <div
        className={`post-${post.slug} relative rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-lg`}
      >
        <div className="absolute top-6 -left-4 h-3 w-3 rounded-full bg-primary-500" />
        <h3 className="mb-2 text-xl font-semibold">
          <a
            href={`/posts/${post.slug}`}
            className="hover:text-primary-500 transition-colors"
          >
            {post.title}
          </a>
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {formatDate(post.created_date)}
        </p>
      </div>
    </div>
  );
}
