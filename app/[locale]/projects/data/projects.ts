import type Project from "@/types/projects";

export const projects: Project[] = [
  {
    id: "1",
    title: "Interactive Animation",
    description: "A fun interactive animation using React Spring",
    imageUrl: "/placeholder.svg?height=200&width=300",
    tags: ["React", "Animation"],
    link: "/projects/interactive-animation",
  },
  {
    id: "2",
    title: "Data Visualization",
    description: "Beautiful charts and graphs with D3.js",
    imageUrl: "/placeholder.svg?height=200&width=300",
    tags: ["D3", "Data Viz"],
    link: "/projects/data-visualization",
  },
  {
    id: "3",
    title: "CSS Art",
    description: "Creative artwork made purely with CSS",
    imageUrl: "/placeholder.svg?height=200&width=300",
    tags: ["CSS", "Art"],
    link: "/projects/css-art",
  },
];
