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
    <main className="grid grid-cols-5 ">
      <section className="px-4 py-10 md:py-12 lg:py-16 col-span-3">
        <h1 className="mb-8 text-center text-4xl font-bold">{t("title")}</h1>
        <div className="flex flex-col gap-8 items-center justify-center">
          <Timeline posts={posts} />
        </div>
      </section>
      <section className="sticky top-32 md:block px-4 py-10 md:py-12 lg:py-16 col-span-2">
        <h1 className="mb-8 text-center text-4xl font-bold">
          {t("Categories")}
        </h1>
        <div className="flex flex-col gap-8 items-center justify-center"></div>
        <h1 className="mb-8 text-center text-4xl font-bold">{t("Tags")}</h1>
        <div></div>
      </section>
    </main>
  );
}
