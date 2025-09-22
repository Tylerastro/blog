import Link from "next/link";
import { AdjacentPosts } from "@/utils/getAdjacentPosts";
import formatDate from "@/utils/formatDate";

interface PostNavigationProps {
  adjacentPosts: AdjacentPosts;
  lang: string;
}

export default function PostNavigation({ adjacentPosts, lang }: PostNavigationProps) {
  const { previous, next } = adjacentPosts;

  // If no adjacent posts, don't render anything
  if (!previous && !next) {
    return null;
  }

  return (
    <nav className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800" aria-label="Post navigation">
      <div className="flex justify-between items-start gap-8">
        {/* Previous Post (Newer) */}
        <div className="flex-1">
          {previous ? (
            <Link
              href={`/${lang}/posts/${previous.slug}`}
              className="group block p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-primary hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center mb-2">
                <svg
                  className="w-4 h-4 mr-2 text-gray-400 group-hover:text-primary transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-sm text-gray-500 dark:text-gray-400">Previous</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors line-clamp-2">
                {previous.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {formatDate(previous.created_date)}
              </p>
            </Link>
          ) : (
            <div></div>
          )}
        </div>

        {/* Next Post (Older) */}
        <div className="flex-1">
          {next ? (
            <Link
              href={`/${lang}/posts/${next.slug}`}
              className="group block p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-primary hover:shadow-md transition-all duration-300 text-right"
            >
              <div className="flex items-center justify-end mb-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">Next</span>
                <svg
                  className="w-4 h-4 ml-2 text-gray-400 group-hover:text-primary transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors line-clamp-2">
                {next.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {formatDate(next.created_date)}
              </p>
            </Link>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </nav>
  );
}