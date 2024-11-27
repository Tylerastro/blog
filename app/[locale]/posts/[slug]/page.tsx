import Markdown from "markdown-to-jsx";
import getPostMetadata from "@/utils/getPostMetaData";
import React from "react";
import fs from "fs";
import matter from "gray-matter";

function getPostContent(slug: string) {
  const folder = "posts/";
  const file = folder + `${slug}.md`;
  const content = fs.readFileSync(file, "utf8");

  const matterResult = matter(content);
  return matterResult;
}

export const generateStaticParams = async () => {
  const posts = getPostMetadata("posts");
  return posts.map((post) => ({ slug: post.slug }));
};

export async function generateMetadata(
  props: {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  }
) {
  const params = await props.params;
  const id = params?.slug ? " ⋅ " + params?.slug : "";
  return {
    title: `The Bubbly Baker ${id.replaceAll("_", " ")}`,
  };
}

export default async function RecipePage(props: { params: Promise<{ slug: string }> }) {
  const slug = (await props.params).slug;
  const post = getPostContent(slug);
  return (
    <main>
      <article>
        <Markdown>{post.content}</Markdown>
      </article>
    </main>
  );
}
