import { getTagBySlug, getPostsByTag } from "@/lib/tags";
import PostList from "@/components/posts/PostList";
import Link from "next/link";
import type { BlogPost } from "@/types/posts";
import { Slash, ChevronDown } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { notoColorEmoji } from "@/styles/fonts";

interface TagSlugPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

const postsPerPage = 7;

const TagSlugPage = async (props: TagSlugPageProps) => {
  const searchParams = await props.searchParams;
  const params = await props.params;
  // Decode the slug to handle Chinese and other non-ASCII characters
  const decodedSlug = decodeURIComponent(params.slug);
  const tag = getTagBySlug(decodedSlug);
  if (!tag) {
    return (
      <>
        <h1 className="text-3xl font-bold mb-6">Tag Not Found</h1>
        <Link
          href="../"
          className="text-blue-600 underline"
          tabIndex={0}
          aria-label="Back to tag cloud"
        >
          Back to tag cloud
        </Link>
      </>
    );
  }

  const posts = getPostsByTag(tag.name).map((post) => ({
    title: post.title,
    created_date: post.date || post.created_date || "",
    tags: post.tags,
    slug: post.slug,
    preview: post.preview || post.description || "",
    description: post.description || post.preview || "",
  })) as BlogPost[];

  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const paginatedPosts = posts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
    <section className="px-4 py-10 md:py-12 lg:py-16 items-center justify-center">
      {/* Breadcrumb Navigation */}
      <div className="mb-8">
        <Breadcrumb>
          <BreadcrumbList className="list-none">
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <Slash className="w-4 h-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="/posts">Posts</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <Slash className="w-4 h-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 focus:outline-none">
                  Tags <ChevronDown className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-fit">
                  <DropdownMenuItem>
                    <Link href="/posts/tags">All Tags</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <Slash className="w-4 h-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>{tag.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <h1 className="mb-8 text-center text-4xl font-bold">
        <span className={`${notoColorEmoji.className} text-4xl`}>🏷️</span>
        &nbsp;
        <span className="">{tag.name}</span>
      </h1>
      <div className="flex flex-col gap-8 items-center justify-center">
        {paginatedPosts.length === 0 ? (
          <p className="text-lg text-gray-600 dark:text-gray-400">
            No posts found for this tag.
          </p>
        ) : (
          <PostList posts={paginatedPosts} />
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex gap-2 justify-center mt-8">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNum) => (
                <Link
                  key={pageNum}
                  href={`?page=${pageNum}`}
                  className={`px-4 py-2 border rounded-md ${
                    currentPage === pageNum
                      ? "bg-primary-foreground text-white"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                  tabIndex={0}
                  aria-label={`Go to page ${pageNum}`}
                >
                  {pageNum}
                </Link>
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default TagSlugPage;
