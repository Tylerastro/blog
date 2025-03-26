"use client";

import { useEffect, useState } from "react";
import { AboutMeCard } from "@/components/landingPage/AboutMeCard";
import { ContactCard } from "@/components/landingPage/ContactCard";
import { ChatCard } from "@/components/landingPage/ChatCard";
import { TechStackCard } from "@/components/landingPage/TechStackCard";
import { ExperienceCard } from "@/components/landingPage/ExperienceCard";
import { ProjectsCard } from "@/components/landingPage/ProjectsCard";
import styles from "./page.module.css";

export default function Home({ params }: { params: { lang: string } }) {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const technologies = [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Tailwind",
    "MongoDB",
  ];

  const jobs = [
    {
      role: "Senior Developer",
      company: "Tech Innovations",
      period: "2021 - Present",
      desc: "Leading full-stack development for enterprise SaaS products",
    },
    {
      role: "Full Stack Developer",
      company: "Digital Solutions",
      period: "2018 - 2021",
      desc: "Built responsive web applications and RESTful APIs",
    },
    {
      role: "Frontend Developer",
      company: "Creative Agency",
      period: "2016 - 2018",
      desc: "Developed interactive UI components and animations",
    },
  ];

  const projects = [
    {
      title: "E-Commerce Platform",
      year: "2023",
      tech: "Next.js, Stripe, PostgreSQL",
      desc: "Full-stack e-commerce solution with payment processing",
    },
    {
      title: "AI Content Generator",
      year: "2022",
      tech: "React, Node.js, OpenAI API",
      desc: "Tool for generating marketing content with AI",
    },
    {
      title: "Analytics Dashboard",
      year: "2021",
      tech: "TypeScript, D3.js, Express",
      desc: "Real-time data visualization dashboard",
    },
  ];

  return (
    <main className={styles.landingPage}>
      <div className={styles.cyberpunkCardGrid}>
        {/* Left Column: About + Contact */}
        <div className={styles.cyberpunkColumn}>
          <AboutMeCard
            name="John Doe"
            role="Full-Stack Developer"
            description="I build web applications with modern technologies. Passionate about clean code, performance optimization, and creating intuitive user experiences."
            location="San Francisco"
            status="Available"
            time={time}
          />
          <ContactCard />
        </div>

        {/* Middle Column: Photo with Chat + Tech Stack */}
        <div className={styles.cyberpunkColumn}>
          <ChatCard />
          <TechStackCard
            technologies={technologies}
            proficiencyPercentage={75}
          />
        </div>

        {/* Right Column: Experience + Projects */}
        <div className={styles.cyberpunkColumn}>
          <ExperienceCard
            jobs={jobs}
            yearsOfExperience="5+ years professional experience"
          />
          <ProjectsCard projects={projects} />
        </div>
      </div>
    </main>
  );
}
