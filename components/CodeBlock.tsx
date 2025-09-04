"use client";

import { Check, Clipboard } from "lucide-react";
import React, { useEffect, useState } from "react";

interface CodeBlockProps {
  children: React.ReactNode;
  [key: string]: any;
}

const extractTextFromNode = (node: React.ReactNode): string => {
  if (typeof node === "string") {
    return node;
  }
  if (
    React.isValidElement<{ children?: React.ReactNode }>(node) &&
    node.props.children
  ) {
    return React.Children.toArray(node.props.children)
      .map((child) => extractTextFromNode(child))
      .join("");
  }
  return "";
};

export function CodeBlock({ children, ...props }: CodeBlockProps) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    if (typeof window === "undefined" || !children) return;
    const codeString = extractTextFromNode(children);
    navigator.clipboard.writeText(codeString);
    setIsCopied(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [isCopied]);

  return (
    <div className="relative group">
      <button
        onClick={copyToClipboard}
        className="absolute top-2 right-2 p-2 rounded-md bg-muted/80 hover:bg-muted text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity z-10"
        aria-label="Copy code"
      >
        {isCopied ? (
          <Check size={14} className="text-green-500" />
        ) : (
          <Clipboard size={14} />
        )}
      </button>
      <pre {...props}>
        {children}
      </pre>
    </div>
  );
}
