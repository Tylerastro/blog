import SyntaxHighlighter from "react-syntax-highlighter";

import React from "react";

export default function Code({
  className,
  ...properties
}: {
  className?: string;
  [key: string]: any;
}) {
  const match = /language-(\w+)/.exec(className || "");
  console.log(className);
  console.log(properties);
  return match ? (
    <SyntaxHighlighter language={match[1]} PreTag="div" {...properties}>
      {properties.children}
    </SyntaxHighlighter>
  ) : (
    <code className={className} {...properties} />
  );
}
