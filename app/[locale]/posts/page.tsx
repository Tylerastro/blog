import { useTranslations } from "next-intl";
import getPostMetadata from "@/utils/getPostMetaData";
import { BlogPostsListProps } from "@/types/posts";
import Timeline from "@/components/posts/Timeline";

export default function BlogPostsList({ locale }: BlogPostsListProps) {
  const t = useTranslations("Blog");
  const posts = getPostMetadata("posts");

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
    <section className="container mx-auto px-4 py-10 md:py-12 lg:py-16">
      <h1 className="mb-8 text-center text-4xl font-bold">{t("title")}</h1>
      <div className="max-w-5xl mx-auto">
        <Timeline posts={posts} />
      </div>
    </section>
  );
}
