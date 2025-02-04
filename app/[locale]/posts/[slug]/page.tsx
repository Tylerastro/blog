import PostInfo from "@/components/posts/PostInfo";
import { getPostMetadata } from "@/utils/getPostMetaData";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  // Decode the URL-encoded slug
  const decodedSlug = decodeURIComponent(slug);

  try {
    const { default: BlogPost } = await import(`@/contents/${decodedSlug}.mdx`);
    const matterResult = getPostMetadata(`${decodedSlug}.md`);

    return (
      <>
        <PostInfo
          date={matterResult.created_date}
          title={matterResult.title}
          tags={matterResult.tags}
          categories={matterResult.categories}
        />
        <BlogPost title={matterResult.title} />
      </>
    );
  } catch (error) {
    console.error("Error loading post:", error);
    // You might want to add proper error handling here
    return <div>Post not found</div>;
  }
}

export function generateStaticParams() {
  return [{ slug: "welcome" }, { slug: "Django" }];
}

export const dynamicParams = false;
