"use client";

import { Check, Clipboard } from "lucide-react";
import React, { useEffect, useState } from "react";

interface CodeBlockProps {
  children: React.ReactNode;
  language: string;
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

export function CodeBlock({ children, language }: CodeBlockProps) {
  const [isCopied, setIsCopied] = useState(false);

  // Extract language from className
  const lang = language.replace("language-", "");

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
    <div className="relative my-4 rounded-xl border border-white/10">
      <div className="absolute top-0 right-0 flex items-center">
        {/* <span className="text-xs text-gray-400 select-none">{lang}</span> */}
        <button
          onClick={copyToClipboard}
          className="p-1.5 rounded-md bg-gray-700/50 hover:bg-gray-600/50 text-gray-400 transition-colors transform -translate-y-1/4 translate-x-1/4"
          aria-label="Copy code"
        >
          {isCopied ? (
            <Check size={16} className="text-green-500" />
          ) : (
            <Clipboard size={16} />
          )}
        </button>
      </div>
      <pre className="p-4 rounded-xl bg-gray-900 text-white overflow-x-auto">
        {children}
      </pre>
    </div>
  );
}
