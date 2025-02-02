import PostInfo from "@/components/posts/PostInfo";
import { getPostMetadata } from "@/utils/getPostMetaData";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const { default: BlogPost } = await import(`@/contents/${slug}.mdx`);
  const matterResult = getPostMetadata(`${slug}.md`);

  console.log(matterResult);
  return (
    <>
      <PostInfo
        date={matterResult.created_date}
        title={matterResult.title}
        tags={matterResult.tags}
        categories={matterResult.categories}
      />
      <BlogPost />
    </>
  );
}

export function generateStaticParams() {
  return [{ slug: "welcome" }, { slug: "Django" }];
}

export const dynamicParams = false;
