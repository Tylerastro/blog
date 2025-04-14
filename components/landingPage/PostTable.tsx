"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample data - replace with your actual data
const projects = [
  { id: 1, name: "E-Commerce Platform", status: "Completed" },
  { id: 2, name: "Inventory Management", status: "In Progress" },
  { id: 3, name: "Mobile Application", status: "Planning" },
  { id: 4, name: "Dashboard Redesign", status: "Completed" },
  { id: 5, name: "API Integration", status: "In Progress" },
];

const blogs = [
  { id: 1, title: "Getting Started with React", date: "May 12, 2023" },
  { id: 2, title: "Mastering TypeScript", date: "Jun 24, 2023" },
  { id: 3, title: "CSS Grid Explained", date: "Jul 15, 2023" },
  { id: 4, title: "Next.js App Router Guide", date: "Aug 30, 2023" },
  { id: 5, title: "Web Performance Tips", date: "Sep 18, 2023" },
];

export default function PostTable() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <Tabs defaultValue="projects" className="w-full">
        <div className="flex justify-center mb-6">
          <TabsList className="grid w-[300px] grid-cols-2">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="blogs">Blogs</TabsTrigger>
          </TabsList>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-md shadow p-4">
          <TabsContent value="projects" className="mt-0">
            <ul className="space-y-2">
              {projects.map((project) => (
                <li
                  key={project.id}
                  className="flex justify-between items-center border-b pb-2 last:border-0"
                >
                  <span className="font-medium">{project.name}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {project.status}
                  </span>
                </li>
              ))}
            </ul>
          </TabsContent>

          <TabsContent value="blogs" className="mt-0">
            <ul className="space-y-2">
              {blogs.map((blog) => (
                <li
                  key={blog.id}
                  className="flex justify-between items-center border-b pb-2 last:border-0"
                >
                  <span className="font-medium">{blog.title}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {blog.date}
                  </span>
                </li>
              ))}
            </ul>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
