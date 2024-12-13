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
      className="inline-flex my-2 mx-2 items-center px-2 py-2 text-base font-medium text-secondary-foreground  transition-all hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-left after:scale-x-100 after:bg-current after:transition-transform hover:after:scale-x-0"
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      {children}
      {external && <ExternalLink className="ml-2 h-4 w-4" />}
    </Link>
  );
}
