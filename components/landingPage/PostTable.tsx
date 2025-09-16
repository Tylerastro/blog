"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ListItem, TabContentProps } from "@/types";
import "./module.css";

const projects = [
  {
    id: 1,
    name: "E-Commerce Platform",
    status: "Completed",
    date: "Jan 15, 2023",
  },
  {
    id: 2,
    name: "Inventory Management",
    status: "In Progress",
    date: "Mar 22, 2023",
  },
  {
    id: 3,
    name: "Mobile Application",
    status: "Planning",
    date: "Apr 10, 2023",
  },
  {
    id: 4,
    name: "Dashboard Redesign",
    status: "Completed",
    date: "Jul 05, 2023",
  },
  {
    id: 5,
    name: "API Integration",
    status: "In Progress",
    date: "Oct 18, 2023",
  },
];

const blogs = [
  { id: 1, title: "Getting Started with React", date: "May 12, 2023" },
  { id: 2, title: "Mastering TypeScript", date: "Jun 24, 2023" },
  { id: 3, title: "CSS Grid Explained", date: "Jul 15, 2023" },
  { id: 4, title: "Next.js App Router Guide", date: "Aug 30, 2023" },
  { id: 5, title: "Web Performance Tips", date: "Sep 18, 2023" },
];

// Types now defined in central types

const TabContent = ({
  items,
  tabValue,
  className = "",
  labelField = "name",
  badgeText,
  hasDarkBackground = false,
}: TabContentProps) => {
  const backgroundClass = hasDarkBackground ? "bg-slate-500 text-white" : "";

  return (
    <TabsContent value={tabValue} className="mt-0">
      <ul className={`space-y-2 border rounded-lg p-4 shadow-sm ${className}`}>
        {items.map((item, index) => (
          <li
            key={item.id}
            className={`flex justify-between items-center border-b pb-2 last:border-0 origin-top p-3 rounded-md post-table-item ${backgroundClass}`}
            style={{
              animationDelay: `${index * 300}ms`,
            }}
          >
            <div>
              <span className="font-medium">{item[labelField]}</span>
              {item.date && (
                <span className={`ml-2 text-sm text-gray-300/45`}>
                  ({item.date})
                </span>
              )}
            </div>
            {item.status && (
              <span className={`text-sm text-gray-300/45`}>{item.status}</span>
            )}
          </li>
        ))}
      </ul>
    </TabsContent>
  );
};

export default function PostTable() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <Tabs defaultValue="projects" className="w-full">
        <div className="flex justify-center mb-6">
          <TabsList className="grid w-[400px] grid-cols-2 bg-transparent">
            <TabsTrigger
              value="projects"
              className="text-lg data-[state=active]:bg-transparent data-[state=active]:text-primary  transition-all hover:scale-105 hover:shadow-md"
            >
              Projects
            </TabsTrigger>
            <TabsTrigger
              value="blogs"
              className="text-lg data-[state=active]:bg-transparent data-[state=active]:text-primary  transition-all hover:scale-105 hover:shadow-md"
            >
              Blogs
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="rounded-md p-4">
          <TabContent
            items={projects}
            tabValue="projects"
            hasDarkBackground={true}
          />

          <TabContent
            items={blogs}
            tabValue="blogs"
            labelField="title"
            badgeText="Blog"
          />
        </div>
      </Tabs>
    </div>
  );
}
