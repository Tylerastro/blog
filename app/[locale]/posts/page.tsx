import Link from "next/link";
import { useTranslations } from "next-intl";
import getPostMetadata from "@/utils/getPostMetaData";
import { BlogPostsListProps } from "@/types/posts";
import RecentPosts from "@/components/posts/Posts";

const POSTS_PER_PAGE = 6;

export default function BlogPostsList({
  locale,
  page = 1,
}: BlogPostsListProps) {
  const t = useTranslations("Blog");
  const posts = getPostMetadata("posts");
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const startIndex = (page - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = posts.slice(startIndex, endIndex);

  if (!posts.length) {
    return (
      <div className="w-full py-12 text-center">
        <p className="text-lg text-gray-600 dark:text-gray-400">
          {t("noPosts")}
        </p>
      </div>
    );
  }

  return (
    <section className="w-full py-10 md:py-12 lg:py-16">
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-center text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl mb-8">
          Posts
        </h2>

        <RecentPosts posts={currentPosts} locale={locale} />

        {totalPages > 1 && (
          <nav
            className="mt-8 flex justify-between items-center"
            aria-label="Pagination"
          >
            <div className="flex-1 flex justify-between sm:justify-end gap-4">
              {page > 1 && (
                <Link
                  href={`/${locale}/posts/page/${page - 1}`}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
                >
                  {t("previousPage")}
                </Link>
              )}
              {page < totalPages && (
                <Link
                  href={`/${locale}/posts/page/${page + 1}`}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
                >
                  {t("nextPage")}
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </section>
  );
}
