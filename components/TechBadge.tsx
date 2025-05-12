"use client";
import { Code2, Icon, type LucideIcon } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface TechBadgeProps {
  name: string;
  icon?: string;
  className?: string;
}

export default function TechBadge({ name, icon, className }: TechBadgeProps) {
  return (
    <button
      type="button"
      tabIndex={0}
      aria-label={name}
      className={cn(
        "uiverse-badge-btn relative rounded-lg flex items-center bg-primary-foreground/65 justify-center outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black",
        className
      )}
    >
      <span />
      <p className="flex items-center justify-center w-full h-full relative z-10 text-primary/90">
        {icon ? (
          <Image
            src={icon}
            alt={name}
            width={24}
            height={24}
            className="mr-1"
          />
        ) : (
          <Code2 size={16} className="mr-1" />
        )}
        {name}
      </p>
    </button>
  );
}
