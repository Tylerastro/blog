"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import PostCard from "./PostCard";
import { PostMetadata } from "@/types/posts";

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
    // Load initial years (at least 4 or all if less)
    const sortedYears = Object.keys(grouped).sort(
      (a, b) => parseInt(b) - parseInt(a)
    );
    const initialYearsCount = Math.min(4, sortedYears.length);
    setLoadedYears(sortedYears.slice(0, initialYearsCount));
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
          opacity: 0.2,
          x: -40,
          y: -25,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.85,
          scrollTrigger: {
            trigger: event,
            start: "top bottom-=100",
            end: "top center",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [loadedYears]);

  return (
    <div className="relative right-[15%] w-full" ref={timelineRef}>
      <div className="absolute left-1/2 h-full w-px bg-gray-200 dark:bg-gray-700" />

      {loadedYears.map((year) => (
        <div key={year} className="mb-12">
          <div className="flex justify-center">
            <h2 className="px-4 mb-8 text-center text-3xl font-bold bg-secondary text-secondary-foreground rounded-lg z-50">
              {year}
            </h2>
          </div>
          {groupedPosts[year]?.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Timeline;
