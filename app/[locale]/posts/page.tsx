import Link from "next/link";
import { useTranslations } from "next-intl";
import getPostMetadata from "@/utils/getPostMetaData";
import Image from "next/image";

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

const POSTS_PER_PAGE = 3;

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

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString(locale, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      console.error("Date formatting error:", error);
      return dateString;
    }
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl mb-8">
          {t("recentPosts")}
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {currentPosts.map((post: BlogPost) => (
            <article
              key={post.slug}
              className="group relative flex flex-col overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <Link
                href={`/${locale}/posts/${post.slug}`}
                className="flex-1 flex flex-col"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src="/placeholder.svg"
                    alt={post.title}
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={startIndex === 0}
                  />
                </div>
                <div className="flex-1 p-4 flex flex-col">
                  <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  {post.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                      {post.description}
                    </p>
                  )}
                  <div className="mt-auto">
                    <time
                      dateTime={post.created_date}
                      className="text-sm text-gray-500 dark:text-gray-400"
                    >
                      {formatDate(post.created_date)}
                    </time>
                    {post.tags && post.tags.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

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
