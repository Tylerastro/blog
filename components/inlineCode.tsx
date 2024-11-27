"use client";

import React from "react";
import { Highlight, themes } from "prism-react-renderer";

interface InlineCodeProps {
  children: string;
  className?: string;
}

export function InlineCode({ children, className }: InlineCodeProps) {
  // Extract the language from className (markdown-to-jsx passes it as "language-{lang}")
  const language = className?.replace(/language-/, "") || "text";
  
  return (
    <Highlight theme={themes.nightOwl} code={children} language={language}>
      {({ tokens, getTokenProps }) => (
        <code className="rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
          {tokens[0].map((token, i) => {
            const tokenProps = getTokenProps({ token, key: i });
            return (
              <span
                key={i}
                className={tokenProps.className}
                style={tokenProps.style}
              >
                {tokenProps.children}
              </span>
            );
          })}
        </code>
      )}
    </Highlight>
  );
}
