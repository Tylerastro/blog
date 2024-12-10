import React from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export function BadgeLink(props: {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  const { href, external = true, children } = props;
  return (
    <Link
      href={href}
      className="inline-flex my-2 mx-2 items-center rounded-full bg-primary px-2 py-2 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      {children}
      {external && <ExternalLink className="ml-2 h-4 w-4" />}
    </Link>
  );
}
