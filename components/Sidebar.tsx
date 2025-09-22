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
import { useState, useCallback, memo } from "react";
import ChatModal from "@/components/chat/chat-modal";
import { User } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const navigationItems = [
  {
    href: "/",
    label: "Home",
    icon: Home,
  },
  {
    href: "/about",
    label: "About",
    icon: User,
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

// Memoized navigation item component for performance
const NavigationItem = memo(
  ({
    item,
    index,
    onClose,
  }: {
    item: (typeof navigationItems)[0];
    index: number;
    onClose: () => void;
  }) => {
    const Icon = item.icon;

    return (
      <li
        className="opacity-0 animate-sidebar-item-enter will-change-transform"
        style={{
          animationDelay: `${index * 150 + 250}ms`, // More noticeable staggered animation
          animationFillMode: "forwards",
        }}
      >
        <Link
          href={item.href}
          onClick={onClose}
          className="flex items-center space-x-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors group will-change-transform"
        >
          <Icon className="h-5 w-5 group-hover:scale-110 transition-transform duration-150 ease-out will-change-transform" />
          <span className="font-medium text-lg">{item.label}</span>
        </Link>
      </li>
    );
  }
);

NavigationItem.displayName = "NavigationItem";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState("en");

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleLanguageChange = useCallback((value: string) => {
    setLanguage(value);
  }, []);

  const SidebarContent = memo(() => (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-6">
        <Link
          href="/"
          className="flex items-center space-x-2 transition-opacity hover:opacity-80"
          onClick={handleClose}
        >
          <span className="text-xl font-bold">Tyler Lin</span>
        </Link>
        <Button variant="ghost" size="icon" onClick={handleClose}>
          <X className="h-5 w-5 transition-transform duration-200 ease-out will-change-transform hover:rotate-90" />
        </Button>
      </div>

      <nav className="flex-1 px-4">
        <ul className="space-y-2">
          {navigationItems.map((item, index) => (
            <NavigationItem
              key={item.href}
              item={item}
              index={index}
              onClose={handleClose}
            />
          ))}
        </ul>
      </nav>

      {/* <div className="space-y-3 px-4">
        <Select value={language} onValueChange={handleLanguageChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="zh-TW">繁體中文</SelectItem>
          </SelectContent>
        </Select>
      </div> */}

      <div className="p-4 space-y-4 border-t">
        <ChatModal>
          <Button className="w-full text-lg py-3">Let's Talk</Button>
        </ChatModal>
      </div>
    </div>
  ));

  return (
    <>
      {/* Sidebar Toggle Button - Fixed position */}
      <div className="fixed top-4 left-4 z-50">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="shadow-lg">
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
