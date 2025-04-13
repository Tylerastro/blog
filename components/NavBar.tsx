"use client";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface NavBarProps extends React.HTMLAttributes<HTMLElement> {
  links?: {
    href: string;
    label: string;
  }[];
}

export function NavBar({ className, links = [], ...props }: NavBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const defaultLinks = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/about",
      label: "About",
    },
    {
      href: "/services",
      label: "Services",
    },
    {
      href: "/contact",
      label: "Contact",
    },
  ];

  const navLinks = links.length > 0 ? links : defaultLinks;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={cn(
        "fixed left-1/2 top-4 z-50 w-full -translate-x-1/2 px-4 md:w-1/2",
        className
      )}
      {...props}
    >
      <div className="relative overflow-hidden rounded-full backdrop-blur-md bg-white/70 dark:bg-gray-900/70 shadow-lg">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-lg font-bold">Logo</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
            <Button size="sm">Login</Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="space-y-1 px-4 pb-3 pt-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2">
                <Button className="w-full" size="sm">
                  Login
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
