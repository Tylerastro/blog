import { compileMDX } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import fs from "fs";
import matter from "gray-matter";
import Code from "@/components/posts/Code";
import Title from "@/components/posts/Title";
import CodeBlock from "@/components/CodeBlock";

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

function CustomH2({
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      id={`${children?.toString().toLowerCase().replace(/\s+/g, "-")}`}
      {...props}
      className="text-3xl font-bold mt-6 mb-4"
    >
      {children}
      <span className="block mt-2 h-1 w-full bg-gray-400"></span>
    </h2>
  );
}

function CustomCode({
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return <Code {...props}>{children}</Code>;
}

function CustomH3({
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      id={`${children?.toString().toLowerCase().replace(/\s+/g, "-")}`}
      {...props}
      className="text-2xl font-semibold mt-6 mb-4"
    >
      {children}
      <span className="block mt-2 h-1 w-12 bg-gray-400"></span>
    </h2>
  );
}

function CustomP({
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return <p className="my-4 text-lg">{children}</p>;
}

function CustomA({
  children,
  ...props
}: React.HTMLAttributes<HTMLAnchorElement>) {
  return (
    <span className="lg:text-lg text-primary relative group no-underline">
      <a
        {...props}
        id={`${children?.toString().toLowerCase().replace(/\s+/g, "-")}`}
        className="my-4 text-lg text-card-foreground"
        target="_blank"
      >
        {children}
        <span className="absolute left-1/2 bottom-0 w-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 transform -translate-x-1/2 transition-all duration-700 ease-out group-hover:w-full group-hover:opacity-100" />
        <span className="absolute right-1/2 bottom-0 w-full h-0.5 bg-gradient-to-r from-transparent via-muted to-transparent opacity-100 transform translate-x-1/2 transition-all duration-200 ease-in group-hover:w-0 group-hover:opacity-0" />
      </a>
    </span>
  );
}

function CustomLi({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) {
  return (
    <li
      className="
        relative 
        pl-5 
        before:content-[''] 
        before:absolute 
        before:left-0 
        before:top-3 
        before:w-2 
        before:h-2 
        before:bg-muted
        before:rounded-full 
        before:transform 
        before:-translate-y-1/2
        mb-2
        text-primary
      "
      {...props}
    >
      {children}
    </li>
  );
}

function CustomBlockQuote({
  children,
  ...props
}: React.HTMLAttributes<HTMLQuoteElement>) {
  return (
    <blockquote className="relative pl-8 pr-4  my-8 border-l-4 border-gray-300">
      <div className="relative z-10 text-lg text-gray-400 ">{children}</div>
    </blockquote>
  );
}

function CustomCodeBlock({
  children,
  ...props
}: React.HTMLAttributes<HTMLPreElement>) {
  console.log("CodeBlock props:", props);
  return (
    <pre {...props}>
      <CodeBlock className="relative px-3 py-1 text-sm font-semibold text-gray-400 rounded-lg bg-gray-900">
        {children}
      </CodeBlock>
    </pre>
  );
}

const overrideComponents = {
  h2: CustomH2,
  h3: CustomH3,
  a: CustomA,
  li: CustomLi,
  p: CustomP,
  // code: CustomCode,
  blockquote: CustomBlockQuote,
  // code: CustomCodeBlock,
};

export default async function PostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const markdown = await getPostContent(params.slug);

  if (!markdown) {
    notFound();
  }

  const { content, frontmatter } = await compileMDX<{ title: string }>({
    source: markdown.content.replace("<!--more-->", ""),
    components: overrideComponents,
    options: { parseFrontmatter: true },
  });

  const title = markdown.data.title;
  const date = markdown.data.date;
  const tags = markdown.data.tags;
  const readingTime = Math.ceil(markdown.content.split(/\s+/).length / 200); // Assuming 200 words per minute

  return (
    <main className="max-w-4xl mx-auto px-12 py-12  ">
      <Title title={title} date={date} tags={tags} readingTime={readingTime} />
      {content}
    </main>
  );
}
