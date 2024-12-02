import Markdown from "markdown-to-jsx";
import getPostMetadata from "@/utils/getPostMetaData";
import formatDate from "@/utils/formatDate";
import { InlineCode } from "@/components/inlineCode";
import React from "react";
import fs from "fs";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { BadgeLink } from "@/components/BadgeLink";
import { HR } from "@/components/HR";
import { CodeBlock } from "@/components/CodeBlock";

function getPostContent(slug: string) {
  try {
    const folder = "posts/";
    const file = folder + `${slug}.md`;
    const content = fs.readFileSync(file, "utf8");
    const matterResult = matter(content);
    return matterResult;
  } catch (error) {
    return null;
  }
}

export const generateStaticParams = async () => {
  const posts = getPostMetadata("posts");
  return posts.map((post) => ({ slug: post.slug }));
};

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await props.params;
  const slug = params?.slug;
  const post = getPostContent(slug);

  if (!post) {
    return {
      title: "Post Not Found - The Bubbly Baker",
    };
  }

  return {
    title: `${post.data.title || slug} - The Bubbly Baker`,
    description: post.data.description || post.content.slice(0, 160),
  };
}

export default async function PostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await props.params).slug;
  const post = getPostContent(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <article className="prose prose-lg dark:prose-invert prose-img:rounded-xl prose-a:text-blue-600">
        <h1 className="text-4xl font-bold mb-4">{post.data.title}</h1>
        {post.data.date && (
          <time className="text-gray-500 mb-8 block">
            {formatDate(post.data.date)}
          </time>
        )}
        <Markdown
          options={{
            overrides: {
              h1: {
                props: {
                  className: "text-3xl font-bold mt-8 mb-4 article",
                },
              },
              h2: {
                props: {
                  className: "text-2xl font-bold mt-6 mb-4",
                },
              },
              hr: {
                component: HR,
              },
              p: {
                props: {
                  className: "mb-4 leading-relaxed",
                },
              },
              a: {
                component: BadgeLink,
              },
              img: {
                props: {
                  className: "rounded-lg my-8",
                },
              },
              code: {
                component: InlineCode,
              },
              pre: {
                component: CodeBlock,
              },
            },
          }}
        >
          {post.content}
        </Markdown>
      </article>
    </main>
  );
}
