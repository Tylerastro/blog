"use client";

import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { monokaiSublime } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface CodeBlockProps {
  code: string;
  language: string;
  showLineNumbers?: boolean;
  className?: string;
  title?: string;
}

export function CodeBlock({
  code,
  language,
  showLineNumbers = true,
  className,
  title,
}: CodeBlockProps) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        "relative rounded-lg border my-5 overflow-hidden",
        className
      )}
    >
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-800 border-b border-zinc-700">
        {/* Mac window traffic light buttons */}
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          {title && (
            <span className="ml-3 text-xs text-zinc-400 font-mono">
              {title}
            </span>
          )}
        </div>

        {/* Copy button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={copyToClipboard}
          className="h-8 w-8 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-700"
        >
          {isCopied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
          <span className="sr-only">{isCopied ? "Copied" : "Copy code"}</span>
        </Button>
      </div>
      <div className="relative bg-zinc-900">
        <pre className="overflow-x-auto p-4">
          <SyntaxHighlighter
            language={language}
            style={monokaiSublime}
            showLineNumbers={showLineNumbers}
            wrapLines={true}
            customStyle={{
              backgroundColor: "transparent",
              margin: 0,
            }}
          >
            {code}
          </SyntaxHighlighter>
        </pre>
      </div>
    </div>
  );
}
