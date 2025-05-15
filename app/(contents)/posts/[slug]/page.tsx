import PostInfo from "@/components/posts/PostInfo";
import YouTubePlayer from "@/components/YouTubePlayer";
import { getPostMetadata } from "@/utils/getPostMetaData";
import getPostsMetadata from "@/utils/getPostMetaData";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
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
  const posts = getPostsMetadata();
  const languages: Array<"en-US" | "zh-TW"> = ["en-US", "zh-TW"];

  const staticParams: Array<{ lang: "en-US" | "zh-TW"; slug: string }> = [];

  for (const lang of languages) {
    for (const post of posts) {
      staticParams.push({ lang: lang, slug: post.slug });
    }
  }
  return staticParams;
}

export const dynamicParams = false;
