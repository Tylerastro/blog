"use client";

import Link from "next/link";
import { Home, FolderOpen, BookOpen, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { useState } from "react";
import { ModeToggle } from "./DarkModeToggle";
import ChatModal from "@/components/chat/chat-modal";

const navigationItems = [
  {
    href: "/",
    label: "Home",
    icon: Home,
  },
  {
    href: "/projects",
    label: "Portfolio",
    icon: FolderOpen,
  },
  {
    href: "/posts",
    label: "Blog",
    icon: BookOpen,
  },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-6">
        <Link
          href="/"
          className="flex items-center space-x-2"
          onClick={() => setIsOpen(false)}
        >
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
            <span className="text-base font-bold">TL</span>
          </div>
          <span className="text-xl font-bold">Taylor Lin</span>
        </Link>
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
          <X className={`h-5 w-5 ${isOpen ? 'roll-in-animation' : ''}`} />
        </Button>
      </div>

      <nav className="flex-1 px-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors group"
                >
                  <Icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  <span className="font-medium text-lg">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 space-y-4 border-t">
        <ChatModal>
          <Button className="w-full text-lg py-3">Let's Talk</Button>
        </ChatModal>
        <div className="flex justify-center">
          <ModeToggle />
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Sidebar Toggle Button - Fixed position */}
      <div className="fixed top-4 left-4 z-50">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shadow-lg">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full sm:w-80 p-0 border-0">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
