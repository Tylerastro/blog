"use client";

import { useState } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Twitter,
  User,
  ChevronDown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function ContactDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const contactLinks = [
    {
      name: "GitHub",
      icon: <Github className="mr-2 h-4 w-4" />,
      href: "https://github.com/yourusername",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="mr-2 h-4 w-4" />,
      href: "https://linkedin.com/in/yourusername",
    },
    {
      name: "Twitter",
      icon: <Twitter className="mr-2 h-4 w-4" />,
      href: "https://twitter.com/yourusername",
    },
    {
      name: "Email",
      icon: <Mail className="mr-2 h-4 w-4" />,
      href: "mailto:your.email@example.com",
    },
    {
      name: "Portfolio",
      icon: <User className="mr-2 h-4 w-4" />,
      href: "https://yourportfolio.com",
    },
  ];

  return (
    <div className="relative">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center gap-1"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            Contact Me
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-56"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          {contactLinks.map((link) => (
            <DropdownMenuItem key={link.name} asChild>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full cursor-pointer items-center px-2 py-2 text-sm"
              >
                {link.icon}
                {link.name}
              </a>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
