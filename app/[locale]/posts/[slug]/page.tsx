import { compileMDX } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import fs from "fs";
import matter from "gray-matter";

async function getPostContent(slug: string) {
  try {
    const folder = "markdown/";
    const file = folder + `${slug}.mdx`;
    const content = fs.readFileSync(file, "utf8");
    const matterResult = matter(content);
    return matterResult;
  } catch (error) {
    return null;
  }
}

function CustomH1({
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1 {...props} style={{ color: "blue", fontSize: "100px" }}>
      {children}
    </h1>
  );
}

const overrideComponents = {
  h1: CustomH1,
};

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const markdown = await getPostContent(params.slug);

  if (!markdown) {
    notFound();
  }

  const { content, frontmatter } = await compileMDX<{ title: string }>({
    source: markdown.content.replace("<!--more-->", ""),
    components: overrideComponents,
    options: { parseFrontmatter: true },
  });

  return <>{content}</>;
}
