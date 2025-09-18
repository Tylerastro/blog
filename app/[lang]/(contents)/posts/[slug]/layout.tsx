import type { Metadata } from "next";

import ScrollProgressBar from "@/components/ProgressBar";
import TocContainer from "@/components/posts/TocContainer";
import { PostLayoutProps } from "@/lib/types";

export const metadata: Metadata = {
  title: "Blog",
  description: "",
};

export default async function PostLayout(props: PostLayoutProps) {
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
