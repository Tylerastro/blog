import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import { CodeBlock } from "./components/CodeBlock";
import { MediumBlockquote } from "./components/posts/BlockQuote";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h2 className="text-4xl font-bold py-4">{children}</h2>
    ),
    h2: ({ children }) => (
      <h3 className="text-3xl font-bold py-4">{children}</h3>
    ),
    h3: ({ children }) => (
      <h4 className="text-2xl font-semibold py-4 border-b">{children}</h4>
    ),
    p: ({ children }) => <p className="py-2 my-2">{children}</p>,
    img: (props) => {
      return (
        <Image
          src={props.src}
          unoptimized
          width={1000}
          height={500}
          {...props}
        />
      );
    },
    pre: (props) => {
      return (
        <CodeBlock
          code={props.children.props.children}
          language={props.children.props.className}
        />
      );
    },
    blockquote: ({ children }) => (
      <MediumBlockquote>{children}</MediumBlockquote>
    ),
    hr: () => <hr className="my-4" />,
    ...components,
  };
}
