import { useTranslations } from "next-intl";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { unstable_setRequestLocale } from "next-intl/server";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Intro from "./intro";

export default function Home({ params }: { params: { locale: string } }) {
  unstable_setRequestLocale(params.locale);
  const t = useTranslations("HomePage");
  return (
    <>
      <main className="flex-1">
        <Intro />
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h1>{t("title")}</h1>
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl mb-8">
              Recent Posts
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((post) => (
                <div
                  key={post}
                  className="group relative overflow-hidden rounded-lg shadow-lg"
                >
                  <Link href={`/post/${post}`}>
                    <img
                      src={`/placeholder.svg?height=300&width=400`}
                      alt="Blog post thumbnail"
                      className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                      width={400}
                      height={300}
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-2">
                        Blog Post Title {post}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        A brief description of the blog post content goes
                        here...
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6">
        <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
          <p className="text-center text-sm leading-loose text-gray-500 dark:text-gray-400 md:text-left">
            © 2023 My Personal Blog. All rights reserved.
          </p>
          <nav className="flex items-center space-x-4 text-sm font-medium">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </nav>
        </div>
      </footer>
    </>
  );
}
