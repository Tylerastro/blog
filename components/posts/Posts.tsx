"use client";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { BlogPost } from "@/types/posts";

export default function RecentPosts({
  posts,
  locale,
}: {
  posts: BlogPost[];
  locale: string;
}) {
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString(locale, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      console.error("Date formatting error:", error);
      return dateString;
    }
  };

  const postsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    requestAnimationFrame(() => {
      gsap.fromTo(
        postsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }
      );
    });
  }, [posts]);

  return (
    <div className="grid gap-6 grid-cols-2 lg:grid-cols-3">
      {" "}
      {posts.map((post: BlogPost, index: number) => (
        <article
          key={post.slug}
          ref={(el: HTMLElement | null) => {
            postsRef.current[index] = el;
          }}
          className="group relative flex flex-col overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <Link
            href={`/${locale}/posts/${post.slug}`}
            className="flex-1 flex flex-col"
          >
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src="/placeholder.svg"
                alt={post.title}
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="flex-1 p-4 flex flex-col">
              <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                {post.title}
              </h3>
              {post.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  {post.description}
                </p>
              )}
              <div className="mt-auto">
                <time
                  dateTime={post.created_date}
                  className="text-sm text-gray-500 dark:text-gray-400"
                >
                  {formatDate(post.created_date)}
                </time>
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}
