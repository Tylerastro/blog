"use client";

import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { monokai } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface CodeBlockProps {
  code: string;
  language: string;
  showLineNumbers?: boolean;
  className?: string;
}

export function CodeBlock({
  code,
  language,
  showLineNumbers = true,
  className,
}: CodeBlockProps) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className={cn("relative rounded-lg border my-5", className)}>
      <div className="flex items-center justify-between px-4 py-2">
        <div className="text-sm font-medium text-muted-foreground">
          {language}
        </div>
        <Button variant="ghost" size="icon" onClick={copyToClipboard}>
          {isCopied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4 text-muted-foreground" />
          )}
          <span className="sr-only">{isCopied ? "Copied" : "Copy code"}</span>
        </Button>
      </div>
      <div className="relative">
        <pre className="overflow-x-auto p-4">
          <SyntaxHighlighter
            language={language}
            style={monokai}
            showLineNumbers={showLineNumbers}
            wrapLines={true}
            customStyle={{
              backgroundColor: "transparent",
            }}
          >
            {code}
          </SyntaxHighlighter>
        </pre>
      </div>
    </div>
  );
}
