import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Cpu,
  Database,
  Cloud,
  Globe,
  Code2,
  Server,
  Container,
  DatabaseIcon,
} from "lucide-react";
import Image from "next/image";
import TechBadge from "@/components/TechBadge";

const skills = [
  {
    category: "Backend",
    skills: [
      { name: "Python", icon: "/icons/Python.svg" },
      { name: "Django", icon: "/icons/Django.svg" },
      { name: "RESTful APIs", icon: "" },
    ],
  },
  {
    category: "Database",
    skills: [
      { name: "MySQL", icon: "/icons/MySQL.svg" },
      { name: "PostgreSQL", icon: "/icons/PostgresSQL.svg" },
      { name: "MongoDB", icon: "/icons/MongoDB.svg" },
    ],
  },
  {
    category: "DevOps",
    skills: [
      { name: "AWS", icon: "/icons/AWS.svg" },
      { name: "Vercel", icon: "/icons/Vercel.svg" },
      { name: "Docker", icon: "/icons/Docker.svg" },
      { name: "Jenkins", icon: "/icons/Jenkins.svg" },
      { name: "GitHub Actions", icon: "" },
      { name: "Git", icon: "/icons/Git.svg" },
    ],
  },
  {
    category: "Programming Languages",
    skills: [
      { name: "Python", icon: "/icons/Python.svg" },
      { name: "TypeScript", icon: "/icons/TypeScript.svg" },
      { name: "LaTeX", icon: "/icons/LaTeX.svg" },
    ],
  },
  {
    category: "Web Technologies",
    skills: [
      { name: "React", icon: "/icons/React.svg" },
      { name: "Next.js", icon: "/icons/Nextjs.svg" },
      { name: "Three.js", icon: "/icons/Threejs.svg" },
    ],
  },
  {
    category: "Other",
    skills: [
      { name: "OpenCV", icon: "/icons/OpenCV.svg" },
      { name: "Folium", icon: "" },
    ],
  },
];

type PublicationType = {
  title: string;
  authors: string[];
  journal: string;
  year: number;
  volume?: string;
};

const publications: PublicationType[] = [
  {
    title:
      "A closer look at the host-galaxy environment of high-velocity Type Ia supernovae",
    authors: ["Lin, Han-Tang", "Pan, Yen-Chen", "Abdurro'uf"],
    journal: "Volume 531, Issue 1, pp.1988-1997",
    year: 2024,
  },
  {
    title:
      "Simultaneous Detection of Optical Flares of the Magnetically Active M-dwarf Wolf359",
    authors: [
      "Han-Tang Lin",
      "Chen, Wen-Ping",
      "Jinzhong Liu",
      "Xuan Zhang",
      "Yu Zhang",
      "Andrew Wang",
      "Shiang-Yu Wang",
      "Matthew J. Lehner",
      "C. Y. Wen",
      "J. K. Guo",
      "Y. H. Chang",
      "M. H. Chang",
      "Tsai, Anli",
      "Chia-Lung Lin",
      "C. Y. Hsu",
      "Ip, Wing",
    ],
    journal: "Volume 163, Number 4 (2022/03)",
    year: 2022,
  },
];

const Publication = ({
  title,
  authors,
  journal,
  year,
  volume,
}: PublicationType) => (
  <li
    tabIndex={0}
    aria-label={`Publication: ${title} by ${authors.join(", ")}`}
    className="leading-relaxed"
  >
    <span className="font-medium">{authors.join(", ")}</span>
    <span> ({year}). </span>
    <span className="italic">"{title}." </span>
    <span>{journal}</span>
    {volume && <span>, {volume}</span>}
  </li>
);

export const AboutAccordion = () => {
  return (
    <Accordion type="single" collapsible className="w-full space-y-4">
      <AccordionItem value="skills">
        <AccordionTrigger className="text-xl">Skills</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            {skills.map(({ category, skills }) => (
              <div key={category}>
                <h3
                  className="text-xs font-medium text-muted-foreground mb-1"
                  tabIndex={0}
                  aria-label={category}
                >
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map(({ name, icon }) => (
                    <TechBadge
                      key={name}
                      name={name}
                      icon={icon}
                      className="text-xs"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="projects">
        <AccordionTrigger className="text-xl">Publications</AccordionTrigger>
        <AccordionContent>
          <ul className="list-disc pl-5 space-y-2">
            {publications.map((pub) => (
              <Publication key={pub.title} {...pub} />
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="education">
        <AccordionTrigger className="text-xl">Education</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            <div>
              <strong className="text-lg">
                Master of Science in Astronomy
              </strong>
              <p className="text-muted-foreground">
                National Central University, 2019-2021
              </p>
            </div>
            <div>
              <strong className="text-lg">
                Bachelor of Science in Physics
              </strong>
              <p className="text-muted-foreground">
                National Sun Yat-sen University, 2015-2019
              </p>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
