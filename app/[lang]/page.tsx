"use client";

import { useEffect, useState } from "react";
import {
  Code,
  Github,
  Linkedin,
  Mail,
  Send,
  User,
  Briefcase,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home({ params }: { params: { lang: string } }) {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [message, setMessage] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="bg-black text-cyan-400 font-mono h-screen p-4 md:p-6 overflow-hidden">
      <div className="cyberpunk-card-grid h-full">
        {/* Left Column: About + Contact */}
        <div className="cyberpunk-column">
          {/* About Card (3/4 of height) */}
          <Card className="cyberpunk-card flex-[3]">
            <div className="card-reflection"></div>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold text-cyan-100">
                About Me
              </CardTitle>
            </CardHeader>
            <CardContent className="cyberpunk-card-content">
              <div className="flex flex-col space-y-3 mb-4">
                <div className="flex items-center">
                  <User className="mr-3 text-cyan-300" />
                  <span className="text-xl font-bold text-white">John Doe</span>
                </div>
                <p className="text-cyan-200 text-base">Full-Stack Developer</p>
              </div>

              <div className="border border-cyan-400/50 p-3 rounded-lg mb-4 shadow-[inset_0_0_10px_rgba(0,255,255,0.1)] bg-[rgba(0,127,127,0.1)]">
                <p className="leading-relaxed text-cyan-100 text-sm">
                  I build web applications with modern technologies. Passionate
                  about clean code, performance optimization, and creating
                  intuitive user experiences.
                </p>
              </div>

              <div className="mt-auto">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-cyan-200">Location:</span>
                  <span className="text-white">San Francisco</span>
                  <span className="text-cyan-200">Status:</span>
                  <span className="flex items-center text-white">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2 pulse-animation"></span>{" "}
                    Available
                  </span>
                  <span className="text-cyan-200">Time:</span>
                  <span className="text-white">{time}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Card (1/4 of height) */}
          <Card className="cyberpunk-card flex-[1]">
            <div className="card-reflection"></div>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold text-cyan-100">
                Contact Me
              </CardTitle>
            </CardHeader>
            <CardContent className="cyberpunk-card-content">
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="flex items-center text-cyan-300 hover:text-cyan-100 transition-colors"
                >
                  <Mail className="mr-1 h-4 w-4" />
                  <span className="text-sm">Email</span>
                </a>
                <a
                  href="#"
                  className="flex items-center text-cyan-300 hover:text-cyan-100 transition-colors"
                >
                  <Github className="mr-1 h-4 w-4" />
                  <span className="text-sm">GitHub</span>
                </a>
                <a
                  href="#"
                  className="flex items-center text-cyan-300 hover:text-cyan-100 transition-colors"
                >
                  <Linkedin className="mr-1 h-4 w-4" />
                  <span className="text-sm">LinkedIn</span>
                </a>
              </div>
              <div className="mt-3 text-sm text-cyan-400/70 border-t border-cyan-500/30 pt-2">
                <p>Let's build something amazing together</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Middle Column: Photo with Chat + Tech Stack */}
        <div className="cyberpunk-column">
          {/* Photo with Chat Card (2/3 of height) */}
          <Card className="cyberpunk-card flex-[2]">
            <div className="card-reflection"></div>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold text-cyan-100">
                Ask Me Anything
              </CardTitle>
            </CardHeader>
            <CardContent className="cyberpunk-card-content">
              <div className="flex flex-col items-center justify-center flex-1">
                <div className="w-32 h-32 rounded-full border-2 border-cyan-400 overflow-hidden mb-3 shadow-[0_0_15px_rgba(0,255,255,0.5)]">
                  <div className="w-full h-full bg-gradient-to-br from-cyan-500/30 to-cyan-700/30 flex items-center justify-center">
                    <User
                      className="h-16 w-16 text-cyan-300"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>
                <div className="text-center mb-3">
                  <p className="text-cyan-100 text-sm">
                    Future AI Assistant Integration
                  </p>
                  <p className="text-xs text-cyan-300 mt-1">
                    Ask me any question about my work or experience
                  </p>
                </div>
              </div>

              <div className="flex gap-2 mt-auto">
                <Input
                  placeholder="Type your message..."
                  className="bg-[rgba(0,127,127,0.2)] border-cyan-400/50 text-white"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <Button size="icon" className="bg-cyan-600 hover:bg-cyan-500">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tech Stack Card (1/3 of height) */}
          <Card className="cyberpunk-card flex-[1]">
            <div className="card-reflection"></div>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold text-cyan-100">
                Tech Stack
              </CardTitle>
            </CardHeader>
            <CardContent className="cyberpunk-card-content">
              <div className="flex flex-wrap gap-2">
                {[
                  "React",
                  "Next.js",
                  "TypeScript",
                  "Node.js",
                  "Tailwind",
                  "MongoDB",
                ].map((tech) => (
                  <Badge
                    key={tech}
                    className="bg-[rgba(0,127,127,0.3)] border border-cyan-400/50 text-cyan-100 shadow-glow"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
              <div className="mt-3">
                <div className="w-full bg-cyan-900/30 h-3 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-cyan-500 to-cyan-300 h-full w-3/4 rounded-full shimmer"></div>
                </div>
                <p className="text-xs mt-2 text-cyan-100">
                  Full-stack proficiency
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Experience + Projects */}
        <div className="cyberpunk-column">
          {/* Experience Card (1/2 of height) */}
          <Card className="cyberpunk-card flex-[1]">
            <div className="card-reflection"></div>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold text-cyan-100">
                Experience
              </CardTitle>
            </CardHeader>
            <CardContent className="cyberpunk-card-content">
              <div className="space-y-2">
                {[
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
                ].map((job, index) => (
                  <div
                    key={index}
                    className="border-l-2 border-cyan-400/50 pl-3 relative"
                  >
                    <div className="absolute w-2.5 h-2.5 bg-cyan-400 rounded-full -left-[6px] top-1 shadow-[0_0_8px_rgba(0,255,255,0.5)]"></div>
                    <h3 className="text-white font-bold text-sm">{job.role}</h3>
                    <div className="flex justify-between text-xs">
                      <span className="text-cyan-300">{job.company}</span>
                      <span className="text-cyan-400/70">{job.period}</span>
                    </div>
                    <p className="text-xs mt-1 text-cyan-100">{job.desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-2 border-t border-cyan-500/30">
                <div className="flex items-center text-xs text-cyan-300">
                  <Briefcase className="h-3 w-3 mr-1" />
                  <span>5+ years professional experience</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Projects Card (1/2 of height) */}
          <Card className="cyberpunk-card flex-[1]">
            <div className="card-reflection"></div>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold text-cyan-100">
                Projects
              </CardTitle>
            </CardHeader>
            <CardContent className="cyberpunk-card-content">
              <div className="space-y-3">
                {[
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
                ].map((project, index) => (
                  <div
                    key={index}
                    className="border border-cyan-400/50 p-2 rounded-lg bg-[rgba(0,127,127,0.15)] shadow-[0_0_8px_rgba(0,255,255,0.2)] hover:shadow-[0_0_15px_rgba(0,255,255,0.4)] transition-all hover:scale-[1.02] relative overflow-hidden"
                  >
                    <div className="card-reflection"></div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-white text-sm">
                        {project.title}
                      </span>
                      <Badge className="bg-cyan-500/20 text-cyan-100 text-xs">
                        {project.year}
                      </Badge>
                    </div>
                    <p className="text-xs text-cyan-300">{project.tech}</p>
                    <p className="text-xs mt-1 text-cyan-100">{project.desc}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
