import { useTranslations } from "next-intl";
import { ModeToggle } from "../DarkModeToggle";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import LocaleSwitcher from "../LocaleSwitcher";
import { AnimatedButton } from "./AnimatedButton";

const pages = [
  { href: "/about", label: "About", enabled: true },
  { href: "/posts", label: "Posts", enabled: true },
  { href: "/projects", label: "Projects", enabled: true },
  { href: "/contact", label: "Contact", enabled: true },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 w-full items-center justify-between px-4 md:px-8 lg:px-[calc((100%-1024px)/2)]">
        <div className="flex flex-1 items-center justify-start">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="mr-2 lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="flex flex-col space-y-4">
                {pages.map((page) => (
                  <AnimatedButton
                    key={page.label}
                    href={page.href}
                    disabled={!page.enabled}
                  >
                    {page.label}
                  </AnimatedButton>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="hidden lg:block pr-12">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="text-xl font-bold">My Blog</span>
            </Link>
          </div>
          <nav className="hidden lg:flex items-center space-x-6 text-lg font-medium">
            {pages.map((page) => (
              <AnimatedButton
                key={page.label}
                href={page.href}
                disabled={!page.enabled}
              >
                {page.label}
              </AnimatedButton>
            ))}
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <LocaleSwitcher />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
