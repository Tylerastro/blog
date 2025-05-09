import PostInfo from "@/components/posts/PostInfo";
import YouTubePlayer from "@/components/YouTubePlayer";
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
          filename={matterResult.filename}
          date={matterResult.created_date}
          title={matterResult.title}
          tags={matterResult.tags ?? []}
          categories={matterResult.categories ?? []}
          mediumLink={matterResult.mediumLink}
          audioLink={matterResult.audioLink}
        />
        <BlogPost
          title={matterResult.title}
          components={{ YouTube: YouTubePlayer }}
        />
      </>
    );
  } catch (error) {
    console.error("Error loading post:", error);
    return <div>Post not found</div>;
  }
}

export function generateStaticParams() {
  return [{ slug: "welcome" }, { slug: "Django" }];
}

export const dynamicParams = false;
