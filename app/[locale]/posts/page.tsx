import getPostsMetadata from "@/utils/getPostMetaData";
import { BlogPostsListProps } from "@/types/posts";
import PostList from "@/components/posts/PostList";

export default async function BlogPostsList({ locale }: BlogPostsListProps) {
  const posts = getPostsMetadata();

  if (!posts.length) {
    return (
      <div className="w-full py-12 text-center">
        <p className="text-lg text-gray-600 dark:text-gray-400">{"noPosts"}</p>
      </div>
    );
  }

  return (
    <main className="">
      <section className="px-4 py-10 md:py-12 lg:py-16 items-center justify-center">
        <h1 className="mb-8 text-center text-4xl font-bold">{"title"}</h1>
        <div className="flex flex-col  gap-8 items-center justify-center">
          <PostList posts={posts} />
        </div>
      </section>
    </main>
  );
}
