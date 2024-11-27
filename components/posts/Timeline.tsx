"use client";
import formatDate from "@/utils/formatDate";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { PostMetadata } from "@/types/posts";
import PostDrawer from "./PostDrawer";

gsap.registerPlugin(ScrollTrigger);

interface TimelineProps {
  posts: PostMetadata[];
}

interface GroupedPosts {
  [key: string]: PostMetadata[];
}

const Timeline = ({ posts }: TimelineProps) => {
  const [loadedYears, setLoadedYears] = useState<string[]>([]);
  const [groupedPosts, setGroupedPosts] = useState<GroupedPosts>({});
  const [hoveredPost, setHoveredPost] = useState<PostMetadata | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const { ref: bottomRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  // Group posts by year
  useEffect(() => {
    const grouped = posts.reduce((acc: GroupedPosts, post) => {
      const year = new Date(post.created_date).getFullYear().toString();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(post);
      return acc;
    }, {});

    setGroupedPosts(grouped);
    // Initially load the three most recent years
    const sortedYears = Object.keys(grouped).sort(
      (a, b) => parseInt(b) - parseInt(a)
    );
    setLoadedYears(sortedYears.slice(0, 3));
  }, [posts]);

  // Load more years when scrolling to bottom
  useEffect(() => {
    if (inView) {
      const allYears = Object.keys(groupedPosts).sort(
        (a, b) => parseInt(b) - parseInt(a)
      );
      const nextYear = allYears.find((year) => !loadedYears.includes(year));
      if (nextYear) {
        setLoadedYears((prev) => [...prev, nextYear]);
      }
    }
  }, [inView, groupedPosts, loadedYears]);

  // GSAP animations
  useEffect(() => {
    if (!timelineRef.current) return;

    const timeline = timelineRef.current;
    const events = timeline.querySelectorAll(".timeline-event");

    events.forEach((event) => {
      gsap.fromTo(
        event,
        {
          opacity: 0,
          x: -50,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: event,
            start: "top center+=100",
            toggleActions: "play none none",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [loadedYears]);

  return (
    <div className="relative right-1/2 w-full" ref={timelineRef}>
      <div className="absolute left-1/2 h-full w-px bg-gray-200 dark:bg-gray-700" />

      {loadedYears.map((year) => (
        <div key={year} className="mb-12">
          <h2 className="mb-8 text-center text-3xl font-bold">{year}</h2>
          {groupedPosts[year]?.map((post) => (
            <div
              key={post.slug}
              className="timeline-event relative mb-8 mr-0 ml-auto w-1/2 pr-0 pl-8 group"
              onMouseEnter={() => {
                gsap.to(`.post-${post.slug}`, {
                  scale: 1.05,
                  duration: 0.3,
                  ease: "power2.out",
                });
                setHoveredPost(post);
              }}
              onMouseLeave={() => {
                gsap.to(`.post-${post.slug}`, {
                  scale: 1,
                  duration: 0.3,
                  ease: "power2.in",
                });
                setHoveredPost(null);
              }}
            >
              <div
                className={`post-${post.slug} relative rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 transition-shadow hover:shadow-lg`}
              >
                <div className="absolute top-6 -left-4 h-3 w-3 rounded-full bg-primary-500" />
                <h3 className="mb-2 text-xl font-semibold">
                  <a
                    href={`/posts/${post.slug}`}
                    className="hover:text-primary-500 transition-colors"
                  >
                    {post.title}
                  </a>
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {formatDate(post.created_date)}
                </p>
              </div>
            </div>
          ))}
        </div>
      ))}

      <div ref={bottomRef} className="h-10" />
      <PostDrawer post={hoveredPost} isOpen={hoveredPost !== null} />
    </div>
  );
};

export default Timeline;
