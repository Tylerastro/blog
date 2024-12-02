"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

export function InlineCode({ children }: { children: React.ReactNode }) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(children?.toString() || "");
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };
  console.log(children);

  return (
    <span className="inline-flex items-center rounded bg-muted px-2 py-1 text-sm font-mono text-muted-foreground">
      {" "}
      {children}{" "}
      <Button
        variant="ghost"
        size="icon"
        className="ml-2 h-4 w-4"
        onClick={copyToClipboard}
        aria-label="Copy code"
      >
        {isCopied ? (
          <Check className="h-3 w-3 text-green-500" />
        ) : (
          <Copy className="h-3 w-3" />
        )}
      </Button>
    </span>
  );
}
