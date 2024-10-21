import Markdown from "markdown-to-jsx";
import getPostMetadata from "@/utils/getPostMetaData";
import React from "react";
import fs from "fs";
import matter from "gray-matter";

function getPostContent(slug: string) {
  const folder = "recipes/";
  const file = folder + `${slug}.md`;
  const content = fs.readFileSync(file, "utf8");

  const matterResult = matter(content);
  return matterResult;
}

export const generateStaticParams = async () => {
  const posts = getPostMetadata("recipes");
  return posts.map((post) => ({ slug: post.slug }));
};

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const id = params?.slug ? " ⋅ " + params?.slug : "";
  return {
    title: `The Bubbly Baker ${id.replaceAll("_", " ")}`,
  };
}

export default function RecipePage(props: { params: { slug: string } }) {
  const slug = props.params.slug;
  const post = getPostContent(slug);
  return (
    <main>
      <article>
        <Markdown>{post.content}</Markdown>
      </article>
    </main>
  );
}
