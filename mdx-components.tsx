import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import { CodeBlock } from "./components/CodeBlock";
import { MediumBlockquote } from "./components/posts/BlockQuote";
import InlineCode from "./components/InlineCode";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h2 className="text-4xl font-bold py-4" id={children}>
        {children}
      </h2>
    ),
    h2: ({ children }) => (
      <h3 className="text-3xl font-bold py-4" id={children}>
        {children}
      </h3>
    ),
    h3: ({ children }) => (
      <h4 className="text-2xl font-semibold py-4 border-b" id={children}>
        {children}
      </h4>
    ),
    h4: ({ children }) => (
      <h5 className="text-xl font-semibold py-4 border-b" id={children}>
        {children}
      </h5>
    ),
    h5: ({ children }) => (
      <h6 className="text-lg font-semibold py-4 border-b" id={children}>
        {children}
      </h6>
    ),
    p: ({ children }) => {
      return <p className="py-2 my-2">{children}</p>;
    },
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
    code: (props) => {
      return <InlineCode code={props.children as string} />;
    },
    a: (props) => {
      return (
        <a
          href={props.href}
          className="text-accent hover:text-primary hover:underline underline-offset-2 transition-colors duration-200"
          target={props.href?.startsWith("http") ? "_blank" : undefined}
          rel={
            props.href?.startsWith("http") ? "noopener noreferrer" : undefined
          }
        >
          {props.children}
        </a>
      );
    },
    ul: ({ children }) => <ul className="github-task-list my-2">{children}</ul>,
    li: ({ children }) => {
      // Handle [x] and [ ] for checkboxes
      let isCheckbox = false;
      let checked = false;
      let label = children;

      // If children is a string or array with string first
      if (typeof children === "string") {
        const match = children.match(/^\[( |x|X)\] ?(.*)$/);
        if (match) {
          isCheckbox = true;
          checked = match[1].toLowerCase() === "x";
          label = match[2];
        }
      } else if (Array.isArray(children) && typeof children[0] === "string") {
        const match = children[0].match(/^\[( |x|X)\] ?(.*)$/);
        if (match) {
          isCheckbox = true;
          checked = match[1].toLowerCase() === "x";
          // Remove the marker from the first child, keep the rest
          label = [match[2], ...children.slice(1)];
        }
      }

      if (isCheckbox) {
        return (
          <li>
            <input
              type="checkbox"
              checked={checked}
              disabled
              tabIndex={-1}
              aria-checked={checked}
              className=""
            />
            <label className="select-none">{label}</label>
          </li>
        );
      }

      return <li>{children}</li>;
    },
    ...components,
  };
}
