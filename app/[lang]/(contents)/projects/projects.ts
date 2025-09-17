export type Project = {
  id: string;
  title: string;
  description: string;
  category: string;
  image?: string;
  videoUrl?: string;
  date: string;
  demoUrl?: string;
  githubUrl?: string;
  tags: string[];
  terminated?: boolean;
  post?: string;
};

export const projects: Project[] = [
  {
    id: "1",
    title: "Let's sing together",
    description:
      "A web application synchroize Youtube music with the lyrics. A good tool to learn Japanese.",
    category: "web",
    image: "/projects/images/letsSing.png",
    videoUrl: "/projects/videos/letsSing.mp4",
    date: "2024-09-30",
    demoUrl: "https://www.lets-sing-together.com/en-US",
    githubUrl: "",
    tags: ["Next.js", "Tailwind CSS", "Vercel", "TypeScript"],
    terminated: false,
    post: "",
  },
  {
    id: "2",
    title: "Folium Institute Map",
    description:
      "This map contains QS Physics/Astronomy top 100 institues (or more?), aiming for an easy way to find your dream grad school.",
    category: "web",
    image: "",
    date: "2021-06-02",
    demoUrl: "https://tylerastro.github.io/Folium_Astronomy_Institutes/",
    githubUrl:
      "https://github.com/Tylerastro/Folium_Astronomy_Institutes?tab=readme-ov-file",
    tags: ["Python", "Folium"],
    terminated: false,
    post: "",
  },
  {
    id: "3",
    title: "Target and Observation Management(TOM)",
    description:
      "This is a web application for astronomers to manage their targets and observations.",
    category: "web",
    image: "",
    videoUrl: "/projects/videos/tom-demo.mp4",
    date: "2024-03-02",
    demoUrl: "https://tom.astro.ncu.edu.tw",
    githubUrl: "",
    tags: [
      "Python",
      "Django",
      "PostgreSQL",
      "Docker",
      "Nginx",
      "Next.js",
      "TypeScript",
    ],
    terminated: false,
    post: "/posts/Django",
  },
  {
    id: "4",
    title: "Utano Track",
    description:
      "The web application scrape comment timestamps and link to the video.",
    category: "web",
    image: "/projects/images/utanotrack.png",
    videoUrl: "/projects/videos/Utanotrack.mp4",
    date: "2025-05-11",
    demoUrl: "https://utanotrack.fans",
    githubUrl: "",
    tags: ["Next.js", "TypeScript", "Selenium", "Youtube API"],
    terminated: false,
  },
];
