export type Project = {
  id: string;
  title: string;
  description: string;
  category: string;
  image?: string;
  date: string;
  demoUrl?: string;
  githubUrl?: string;
  tags: string[];
};

export const projects: Project[] = [
  {
    id: "1",
    title: "E-commerce Platform",
    description:
      "A full-stack e-commerce platform built with Next.js, Tailwind CSS, and Stripe integration for payments.",
    category: "web",
    image: "",
    date: "2023-05-15",
    demoUrl: "https://example.com/demo",
    githubUrl: "https://github.com/username/ecommerce",
    tags: ["Next.js", "Tailwind CSS", "Stripe", "TypeScript"],
  },
  {
    id: "2",
    title: "Task Management App",
    description:
      "A productivity app for managing tasks and projects with real-time updates and team collaboration features.",
    category: "web",
    image: "",
    date: "2023-03-10",
    demoUrl: "https://example.com/task-app",
    githubUrl: "https://github.com/username/task-app",
    tags: ["React", "Firebase", "Material UI"],
  },
  {
    id: "3",
    title: "Weather Forecast Mobile App",
    description:
      "A cross-platform mobile app that provides accurate weather forecasts with beautiful visualizations.",
    category: "mobile",
    image: "",
    date: "2023-01-20",
    githubUrl: "https://github.com/username/weather-app",
    tags: ["React Native", "OpenWeather API", "Expo"],
  },
  {
    id: "4",
    title: "Machine Learning Image Classifier",
    description:
      "An image classification model trained on custom dataset with high accuracy for object recognition.",
    category: "ai",
    image: "",
    date: "2022-11-05",
    githubUrl: "https://github.com/username/image-classifier",
    tags: ["Python", "TensorFlow", "Computer Vision"],
  },
  {
    id: "5",
    title: "Personal Finance Dashboard",
    description:
      "A dashboard for tracking personal finances, expenses, and investments with data visualization.",
    category: "web",
    image: "",
    date: "2022-09-18",
    demoUrl: "https://example.com/finance",
    githubUrl: "https://github.com/username/finance-dashboard",
    tags: ["Vue.js", "D3.js", "Node.js"],
  },
  {
    id: "6",
    title: "Blockchain Explorer",
    description:
      "A web application for exploring blockchain transactions and smart contracts on Ethereum.",
    category: "blockchain",
    image: "",
    date: "2022-07-30",
    demoUrl: "https://example.com/blockchain",
    githubUrl: "https://github.com/username/blockchain-explorer",
    tags: ["Ethereum", "Web3.js", "React"],
  },
];
