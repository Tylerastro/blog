import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";
import { CodeBlock } from "./components/CodeBlock";

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including inline styles,
// components from other libraries, and more.

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h2 className="text-4xl font-bold py-4">{children}</h2>
    ),
    img: (props) => (
      <Image
        sizes="100vw"
        width={1000}
        height={500}
        style={{ width: "100%", height: "auto" }}
        {...(props as ImageProps)}
      />
    ),
    pre: (props) => {
      return (
        <CodeBlock
          code={props.children}
          language={props.children.props.className}
        />
      );
    },

    ...components,
  };
}
