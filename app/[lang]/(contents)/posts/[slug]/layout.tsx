import ScrollProgressBar from "@/components/ProgressBar";
import type { Metadata } from "next";
import TocContainer from "@/components/posts/TocContainer";

export const metadata: Metadata = {
  title: "Blog",
  description: "",
};

export default async function PostLayout(props: {
  children: React.ReactNode;
  params: Promise<{ lang: "en" | "zh" | "jp"; slug: string }>;
}) {
  const params = await props.params;

  const { lang, slug } = params;

  const { children } = props;

  return (
    <>
      <TocContainer />
      <ScrollProgressBar />
      <main className="flex-1 mx-auto w-[90svw] sm:w-[50svw] my-20">
        {children}
      </main>
    </>
  );
}
