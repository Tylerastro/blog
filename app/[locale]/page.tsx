import { useTranslations } from "next-intl";

import Link from "next/link";
import { unstable_setRequestLocale } from "next-intl/server";
import Intro from "./intro";
import DropMeMessage from "@/components/ui/DropMeMessage";

export default function Home({ params }: { params: { locale: string } }) {
  unstable_setRequestLocale(params.locale);
  return (
    <>
      <main className="flex-1">
        <Intro />
        {/* <section className="w-full py-12 md:py-24 lg:py-32">
          <div className=" px-4 md:px-6">
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
        </section> */}
        <DropMeMessage />
      </main>
    </>
  );
}
