import { CalendarIcon } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  date: string;
}

const blogPosts: BlogPost[] = [
  { id: 1, title: "Getting Started with React", date: "2023-06-01" },
  { id: 2, title: "Advanced TypeScript Techniques", date: "2023-06-15" },
  { id: 3, title: "Mastering CSS Grid Layout", date: "2023-07-01" },
  { id: 4, title: "The Future of JavaScript", date: "2023-07-15" },
  { id: 5, title: "Building Accessible Web Applications", date: "2023-08-01" },
];

export default function BlogPosts() {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-foreground">My Blog Posts</h1>
      </header>
      <main>
        <div className="max-w-3xl mx-auto">
          <ul className="space-y-8">
            {blogPosts.map((post, index) => (
              <li key={post.id} className="relative pl-8">
                <div
                  className={`absolute left-0 top-0 h-full w-0.5 bg-primary ${
                    index === blogPosts.length - 1 ? "h-6" : ""
                  }`}
                  aria-hidden="true"
                ></div>
                <div className="absolute left-0 top-1 w-6 h-6 rounded-full border-4 border-background bg-primary"></div>
                <div className="bg-card rounded-lg shadow-md p-6">
                  <time className="block text-sm text-muted-foreground mb-2 items-center">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {post.date}
                  </time>
                  <h2 className="text-xl font-semibold text-foreground">
                    <a
                      href={`/blog/${post.id}`}
                      className="hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded"
                    >
                      {post.title}
                    </a>
                  </h2>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
