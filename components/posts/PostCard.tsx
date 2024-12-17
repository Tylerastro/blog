import { BlogPost } from "@/types/posts";
import formatDate from "@/utils/formatDate";
import TagBadge from "./TagBadge";

export default function PostCard({ post }: { post: BlogPost }) {
  const tags = Array.isArray(post.tags) ? post.tags : [];
  return (
    <div
      key={post.slug}
      className="timeline-event relative mb-8 mr-0 ml-auto w-1/2 pr-0 pl-8 group"
    >
      <div
        className={`post-${post.slug} relative rounded-lg border p-6 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-lg`}
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
        <div className="flex my-3">
          {tags.map((tag, index) => (
            <span key={index} className="ml-1">
              <TagBadge text={tag} />
            </span>
          ))}
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {formatDate(post.created_date)}
        </p>
      </div>
    </div>
  );
}
