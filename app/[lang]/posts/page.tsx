import getPostsMetadata from "@/utils/getPostMetaData";
import PostList from "@/components/posts/PostList";
import { redirect } from "next/navigation";
import { getDictionary } from "@/utils/getDictionary";

export default async function BlogPostsList({
  params,
  searchParams,
}: {
  params: Promise<{ lang: "en-US" | "zh-TW" }>;
  searchParams: Promise<{ page: string }>;
}) {
  const lang = (await params).lang;
  const dict = await getDictionary(lang);

  const posts = getPostsMetadata();
  posts.sort((a, b) => {
    const dateA = new Date(a.created_date);
    const dateB = new Date(b.created_date);
    return dateB.getTime() - dateA.getTime();
  });

  const postsPerPage = 7; // Adjust this number as needed
  const currentPage = Number((await searchParams).page) || 1;
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const paginatedPosts = posts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  if (currentPage > totalPages) {
    return redirect("/posts");
  }

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
        <h1 className="mb-8 text-center text-4xl font-bold">
          {dict.Blog.title}
        </h1>
        <div className="flex flex-col gap-8 items-center justify-center">
          <PostList posts={paginatedPosts} />

          {/* Pagination Controls */}
          <div className="flex gap-2 justify-center mt-8">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNum) => (
                <a
                  key={pageNum}
                  href={`/posts?page=${pageNum}`}
                  className={`px-4 py-2 border rounded-md ${
                    currentPage === pageNum
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {pageNum}
                </a>
              )
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
