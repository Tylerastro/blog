import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

interface NavBarProps extends React.HTMLAttributes<HTMLElement> {
  links?: {
    href: string;
    label: string;
  }[];
}

export function NavBar({ className, links = [], ...props }: NavBarProps) {
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
      href: "/contact",
      label: "Contact",
    },
    {
      href: "/projects",
      label: "Projects",
    },
  ];

  const navLinks = links.length > 0 ? links : defaultLinks;

  return (
    <header
      className={cn(
        "fixed left-1/2 top-4 w-full -translate-x-1/2 px-8 md:w-11/12 max-w-screen-xl z-50",
        className
      )}
      {...props}
    >
      <div className="mx-auto max-w-screen-xl px-8">
        <div className="relative rounded-full backdrop-blur-md shadow-lg">
          <div className="flex items-center justify-between px-8 py-4">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                  <span className="text-xs">TL</span>
                </div>
                <span className="text-lg">Tyler</span>
              </Link>
            </div>

            <nav className="relative gap-4 hidden md:flex md:items-center md:space-x-8">
              {navLinks.map((link) => (
                <div key={link.href} className="text-hover-container">
                  <div className="text-hover-effect">
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-lg transition-colors hover:text-secondary-foreground"
                    >
                      {link.label}
                    </Link>
                  </div>
                </div>
              ))}
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-lg">
                      Blog
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="min-w-[180px]">
                      <ul className="flex flex-col gap-3 p-2">
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/posts"
                              className="block px-3 py-2 rounded focus:outline-none"
                              tabIndex={0}
                              aria-label="All Posts"
                            >
                              All Posts
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/posts/tags"
                              className="block px-3 py-2 rounded focus:outline-none"
                              tabIndex={0}
                              aria-label="Tags"
                            >
                              Tags
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/posts/categories"
                              className="block px-3 py-2 rounded focus:outline-none"
                              tabIndex={0}
                              aria-label="Categories"
                            >
                              Categories
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
                <NavigationMenuIndicator />
                <NavigationMenuViewport />
              </NavigationMenu>
            </nav>
            <Button size="sm" className="ml-8">
              Let's Talk
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
