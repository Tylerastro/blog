import { useTranslations } from "next-intl";
import { ModeToggle } from "../DarkModeToggle";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between p-5">
        <div className="flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="mr-2 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="flex flex-col space-y-4">
                <Link href="/">Home</Link>
                <Link href="/about">About</Link>
                <Link href="/posts">Posts</Link>
                <Link href="/projects">Projects</Link>
                <Link href="/contact">Contact</Link>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="hidden md:block">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="font-bold">My Blog</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="/about">About</Link>
            <Link href="/posts">Posts</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
        <ModeToggle />
      </div>
    </header>
  );
}
