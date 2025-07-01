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

export const Skills = () => {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Skills</h2>
      <div className="space-y-4">
        {skills.map(({ category, skills }) => (
          <div key={category}>
            <h3
              className="text-lg font-medium text-muted-foreground mb-2"
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
                  className="text-sm"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};