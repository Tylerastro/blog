import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import { CodeBlock } from "./components/CodeBlock";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h2 className="text-4xl font-bold py-4">{children}</h2>
    ),
    img: (props) => {
      console.log(props);
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

    ...components,
  };
}
