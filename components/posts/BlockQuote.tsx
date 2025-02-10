import type React from "react";

interface MediumBlockquoteProps {
  children: React.ReactNode;
}
export function MediumBlockquote({ children }: MediumBlockquoteProps) {
  return (
    <blockquote className="my-4 border-l-4 border-gray-300  p-2 italic text-gray-700 dark:border-gray-700  dark:text-gray-300">
      <div className="mb-2 text-lg">{children}</div>
    </blockquote>
  );
}
