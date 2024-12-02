"use client";

import React, { useState } from "react";
import { Highlight, themes } from "prism-react-renderer";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  children: React.ReactNode;
  language: string;
  className?: string;
}

export function CodeBlock({
  children,
  language = "tsx",
  className,
}: CodeBlockProps) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(children?.toString() || "");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className={cn("relative rounded-lg overflow-hidden", className)}>
      <button
        onClick={copyToClipboard}
        className="absolute top-2 right-2 p-2 rounded bg-gray-800 text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
        aria-label={isCopied ? "Copied!" : "Copy code to clipboard"}
      >
        {isCopied ? <Check size={16} /> : <Copy size={16} />}
      </button>
      <Highlight
        theme={themes.nightOwl}
        code={children?.toString() || ""}
        language={language}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={cn(className, "p-4 text-sm overflow-auto")}
            style={style}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                <span className="inline-block w-8 text-right mr-4 text-gray-500 select-none">
                  {i + 1}
                </span>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}
