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
import ChatModal from "@/components/chat/chat-modal";

interface NavBarProps extends React.HTMLAttributes<HTMLElement> {
  links?: {
    href: string;
    label: string;
  }[];
}

// Blog dropdown links with descriptions
type BlogLink = {
  title: string;
  href: string;
  description: string;
};

const blogLinks: BlogLink[] = [
  {
    title: "All Posts",
    href: "/posts",
    description: "Browse all blog posts and tutorials.",
  },
  {
    title: "Tags",
    href: "/posts/tags",
    description: "Explore posts by tag.",
  },
];

// ListItem component for the Blog dropdown
const ListItem: React.FC<{
  title: string;
  href: string;
  children: React.ReactNode;
}> = ({ title, href, children }) => (
  <li className="m-0">
    <NavigationMenuLink asChild>
      <Link
        href={href}
        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-link/20 focus:bg-accent focus:text-accent-foreground text-left"
        tabIndex={0}
        aria-label={title}
      >
        <div className="text-base font-medium text-primary-foreground">
          {title}
        </div>
        <p className="line-clamp-2 text-sm text-muted-foreground">{children}</p>
      </Link>
    </NavigationMenuLink>
  </li>
);

export function NavBar({ className, links = [], ...props }: NavBarProps) {
  const defaultLinks = [
    {
      href: "/about",
      label: "About",
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
        "fixed left-1/2 top-0 w-full -translate-x-1/2 px-8 md:w-11/12 max-w-screen-xl z-50",
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
                  <span className="text-base">TL</span>
                </div>
              </Link>
            </div>

            <nav className="relative gap-4 hidden md:flex md:items-center md:space-x-8">
              {navLinks.slice(0, 1).map((link) => (
                <div key={link.href} className="text-hover-container">
                  <div className="text-hover-effect">
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-2xl transition-colors hover:text-secondary-foreground"
                    >
                      {link.label}
                    </Link>
                  </div>
                </div>
              ))}
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-2xl cursor-se-resize">
                      Blog
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {blogLinks.map((item) => (
                          <ListItem
                            key={item.title}
                            title={item.title}
                            href={item.href}
                          >
                            {item.description}
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
                <NavigationMenuIndicator />
                <NavigationMenuViewport />
              </NavigationMenu>
              {navLinks
                .slice(1)
                .map((link: { href: string; label: string }) => (
                  <div key={link.href} className="text-hover-container">
                    <div className="text-hover-effect">
                      <Link
                        key={link.href}
                        href={link.href}
                        className="text-2xl transition-colors hover:text-secondary-foreground"
                      >
                        {link.label}
                      </Link>
                    </div>
                  </div>
                ))}
            </nav>
            <ChatModal>
              <Button
                size="lg"
                className="ml-8 text-xl relative overflow-hidden group
                  backdrop-blur-md
                  hover:shadow-xl hover:shadow-black/20
                  transition-all duration-300 ease-out
                  hover:scale-105
                  before:absolute before:inset-0
                  before:translate-x-[-100%] before:transition-transform before:duration-700
                  hover:before:translate-x-[100%]
                  after:absolute after:inset-0
                  hover:after:opacity-100 after:transition-opacity after:duration-300"
              >
                <span className="relative z-10 font-medium">Let's Talk</span>
              </Button>
            </ChatModal>
          </div>
        </div>
      </div>
    </header>
  );
}
