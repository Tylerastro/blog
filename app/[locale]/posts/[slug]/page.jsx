import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
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
import { TableOfContents } from "@/components/posts/TableOfContents";

function getPostContent(slug) {
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

export async function generateMetadata(props) {
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

export default async function PostPage(props) {
  const slug = (await props.params).slug;
  const post = getPostContent(slug);
  if (!post) {
    notFound();
  }

  return (
        <main className="max-w-4xl mx-auto px-12 py-12">
          <article className="prose prose-lg dark:prose-invert prose-img:rounded-xl prose-a:text-blue-600">
            <h1 className="text-4xl font-bold mb-4">{post.data.title}</h1>
            {post.data.date && (
              <time className="text-gray-500 mb-8 block">
                {formatDate(post.data.date)}
              </time>
            )}
            <ReactMarkdown
              components={{
                h1: ({ node, ...props }) => {
                  const id = props.children?.toString().toLowerCase().replace(/\s+/g, '-') || '';
                  console.log(props)
                  return (
                    <h1 id={id+'h1'} className="text-3xl font-bold mt-8 mb-4 article" {...props} />
                  );
                },
                h2: ({ node, ...props }) => {
                  const id = props.children?.toString().toLowerCase().replace(/\s+/g, '-') || '';
                  return (
                    <h2 id={id+'h2'} className="text-2xl font-bold mt-6 mb-4" {...props} />
                  );
                },
                h3: ({ node, ...props }) => {
                  const id = props.children?.toString().toLowerCase().replace(/\s+/g, '-') || '';
                  return (
                    <h3 id={id+'h3'} className="text-xl font-bold mt-4 mb-3" {...props} />
                  );
                },
                h4: ({ node, ...props }) => {
                  const id = props.children?.toString().toLowerCase().replace(/\s+/g, '-') || '';
                  return (
                    <h4 id={id+'h4'} className="text-lg font-bold mt-3 mb-2" {...props} />
                  );
                },
                p: ({ node, ...props }) => (
                  <p className="mb-4 leading-relaxed" {...props} />
                ),
                ul: ({ node, ...props }) => (
                  <ul className="list-disc pl-6 mb-4 space-y-2" {...props} />
                ),
                li: ({ node, ...props }) => (
                  <li className="leading-relaxed" {...props} />
                ),
                hr: ({ node, ...props }) => <HR {...props} />,
                a: ({ node, ...props }) => (
                  <BadgeLink
                    href={props.href || ""}
                    {...props}
                    children={props.children}
                  />
                ),
                img: ({ node, ...props }) => (
                  <img
                    className="rounded-lg my-8"
                    {...props}
                    alt={props.alt || ""}
                  />
                ),
                code({node, inline, className, children, ...props}) {
                  const match = /language-(\w+)/.exec(className || '')
                  return !inline && match ? (
                    <CodeBlock language={match[1]} code={String(children).replace(/\n$/, '')}>

                    </CodeBlock>
                  ) : (
                    <InlineCode className={className} {...props}>
                      {children}
                    </InlineCode>
                  )
                }
              }}
            >
              {post.content}
            </ReactMarkdown>
          </article>
        </main>
      
    
  );
}
