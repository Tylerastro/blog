import PostInfo from "@/components/posts/PostInfo";
import PostNavigation from "@/components/posts/PostNavigation";
import YouTubePlayer from "@/components/YouTubePlayer";
import { getPostMetadata } from "@/utils/getPostMetaData";
import getPostsMetadata from "@/utils/getPostMetaData";
import { getAdjacentPosts } from "@/utils/getAdjacentPosts";
import type { BlogPostPageProps } from "@/types";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const decodedSlug = decodeURIComponent(slug);

  try {
    const matterResult = getPostMetadata(`${decodedSlug}.md`);

    return {
      title: matterResult.title,
      description: `Read "${matterResult.title}" - Published on ${matterResult.created_date}`,
      openGraph: {
        title: matterResult.title,
        description: `Read "${matterResult.title}" - Published on ${matterResult.created_date}`,
        type: "article",
        publishedTime: matterResult.created_date,
        tags: matterResult.tags,
      },
      twitter: {
        card: "summary_large_image",
        title: matterResult.title,
        description: `Read "${matterResult.title}" - Published on ${matterResult.created_date}`,
      },
    };
  } catch (error) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }
}

export default async function BlogPostPage({
  params,
}: BlogPostPageProps) {
  const resolvedParams = await params;
  const { lang, slug } = resolvedParams;
  // Decode the URL-encoded slug
  const decodedSlug = decodeURIComponent(slug);

  try {
    const { default: BlogPost } = await import(`@/contents/${decodedSlug}.mdx`);
    const matterResult = getPostMetadata(`${decodedSlug}.md`);
    const adjacentPosts = getAdjacentPosts(decodedSlug);

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
          content={matterResult.content}
        />
        <BlogPost
          title={matterResult.title}
          components={{ YouTube: YouTubePlayer }}
        />
        <PostNavigation adjacentPosts={adjacentPosts} lang={lang} />
      </>
    );
  } catch (error) {
    console.error("Error loading post:", error);
    return <div>Post not found</div>;
  }
}

export function generateStaticParams() {
  const posts = getPostsMetadata();
  const languages: Array<"en" | "zh" | "jp"> = ["en", "zh", "jp"];

  const staticParams: Array<{ lang: "en" | "zh" | "jp"; slug: string }> = [];

  for (const lang of languages) {
    for (const post of posts) {
      staticParams.push({ lang: lang, slug: post.slug });
    }
  }
  return staticParams;
}

export const dynamicParams = false;
