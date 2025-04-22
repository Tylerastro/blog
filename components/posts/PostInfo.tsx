import { Calendar, Tag, FolderOpen } from "lucide-react";
import Link from "next/link";

interface PostInfoProps {
  date: string;
  title: string;
  tags: string[];
  categories: string[];
}

export default function PostInfo({
  date,
  title,
  tags,
  categories,
}: PostInfoProps) {
  return (
    <div className="max-w-2xl mx-auto rounded-lg overflow-hidden">
      <div className="p-6 flex flex-col items-center">
        <h1
          id="post-title"
          className="text-3xl text-center font-bold text-gray-900 dark:text-white mb-4"
        >
          {title}
        </h1>
        <div className="flex items-center text-gray-600 dark:text-gray-300 mb-4">
          <Calendar className="w-5 h-5 mr-2" />
          <time dateTime={date}>
            {new Date(date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>
        <div className=" flex items-center justify-around gap-4">
          <div className="flex flex-wrap items-center">
            <Tag className="w-5 h-5 mr-2 text-blue-500" />
            {tags.map((tag, index) => (
              <Link
                key={index}
                href={`/posts/tags/${encodeURIComponent(tag.toLowerCase())}`}
                className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                tabIndex={0}
                aria-label={`View posts tagged with ${tag}`}
              >
                {tag}
              </Link>
            ))}
          </div>
          <div className="flex flex-wrap items-center">
            <FolderOpen className="w-5 h-5 mr-2 text-green-500" />
            {categories.map((category, index) => (
              <span
                key={index}
                className="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
