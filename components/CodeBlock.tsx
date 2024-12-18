"use client";
import React, { useState } from "react";

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
  "data-copyable"?: boolean;
  [key: string]: any;
}

const CodeBlock = ({
  children,
  className,
  "data-copyable": copyable,
  ...props
}: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);
  console.log(copyable);

  const handleCopy = () => {
    if (copyable && typeof children === "string") {
      const textToCopy = children.replace(/\{copy:(true|false)\}/g, "").trim();
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative inline-block">
      <code
        {...props}
        className={`${className || ""} ${copyable ? "cursor-pointer" : ""}`}
        onClick={handleCopy}
      >
        {/* Remove the {copy:true} from display if it exists */}
        {typeof children === "string"
          ? children.replace(/\{copy:(true|false)\}/g, "").trim()
          : children}
      </code>
      {copyable && copied && (
        <span className="absolute -top-6 left-0 bg-green-500 text-white text-xs px-2 py-1 rounded">
          Copied!
        </span>
      )}
      {copyable && (
        <button
          onClick={handleCopy}
          className="absolute -top-6 right-0 bg-gray-200 text-xs px-2 py-1 rounded hover:bg-gray-300"
        >
          Copy
        </button>
      )}
    </div>
  );
};

export default CodeBlock;
