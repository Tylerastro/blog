import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Content",
  description: "Blog content pages",
};

export default function ContentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 max-w-3xl mx-auto px-4 py-6 md:px-6 md:py-8 pt-24">
        {children}
      </main>
    </div>
  );
}
