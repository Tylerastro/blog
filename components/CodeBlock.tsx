"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Highlight, themes } from "prism-react-renderer";
import { useToast } from "@/hooks/use-toast";

interface CodeBlockProps {
  children: string;
  className?: string;
}

export function CodeBlock({ children, className }: CodeBlockProps) {
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  // Extract the language from className (markdown-to-jsx passes it as "language-{lang}")
  const language = className?.replace(/language-/, "") || "text";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setIsCopied(true);
      toast({
        title: "Copied to clipboard",
        description: "The code has been copied to your clipboard.",
      });
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="relative group">
      <Highlight
        theme={themes.nightOwl}
        code={children.trim()}
        language={language}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className="bg-gray-100 dark:bg-gray-800 rounded p-4 my-4 overflow-x-auto"
            style={style}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <button
        onClick={copyToClipboard}
        className="absolute top-2 right-2 p-2 rounded-md bg-gray-800 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Copy code"
      >
        {isCopied ? <Check size={16} /> : <Copy size={16} />}
      </button>
    </div>
  );
}
