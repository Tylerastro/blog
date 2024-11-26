"use client";

import { PostMetadata } from "@/types/posts";
import { useEffect, useRef } from "react";
import gsap from "gsap";

interface PostDrawerProps {
  post: PostMetadata | null;
  isOpen: boolean;
}

const PostDrawer = ({ post, isOpen }: PostDrawerProps) => {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!drawerRef.current) return;

    const drawer = drawerRef.current;

    if (isOpen) {
      // Show drawer
      gsap.set(drawer, { display: "block" });
      gsap.fromTo(
        drawer,
        { x: "100%" },
        {
          x: "0%",
          duration: 1.2,
          ease: "power2.out",
        }
      );
      document.body.style.overflow = "hidden";
    } else {
      // Hide drawer
      gsap.to(drawer, {
        x: "100%",
        duration: 1,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(drawer, { display: "none" });
          document.body.style.overflow = "unset";
        },
      });
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!post) return null;

  return (
    <div
      ref={drawerRef}
      className="fixed top-1/2 -translate-y-1/2 right-8 z-50 h-[80svh] w-1/2 bg-white dark:bg-gray-800 shadow-xl overflow-y-auto rounded-2xl border border-gray-200 dark:border-gray-700"
      style={{ display: "none" }}
    >
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-4">{post.title}</h2>
        <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          {new Date(post.created_date).toLocaleDateString()}
        </div>
        {post.tags && post.tags.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        {post.description && (
          <p className="text-gray-700 dark:text-gray-300">{post.description}</p>
        )}
      </div>
    </div>
  );
};

export default PostDrawer;
