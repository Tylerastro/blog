import React from "react";

interface TagBadgeProps {
  text: string;
  color?: "default" | "primary" | "secondary" | "accent" | "warning";
}

export default function TagBadge({ text, color = "default" }: TagBadgeProps) {
  const baseClasses =
    "inline-flex select-none items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset";

  const colorClasses = {
    default: "bg-gray-50 text-gray-600 ring-gray-500/10",
    primary: "bg-primary/10 text-primary ring-primary/20",
    secondary: "bg-secondary/10 text-secondary ring-secondary/20",
    accent: "bg-accent/10 text-accent ring-accent/20",
    warning: "bg-yellow-50 text-yellow-800 ring-yellow-600/20",
  };

  return (
    <span className={`${baseClasses} ${colorClasses[color]}`}>{text}</span>
  );
}
