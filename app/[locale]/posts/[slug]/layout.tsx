import ScrollProgressBar from "@/components/ProgressBar";
import type { Metadata } from "next";
import { TableOfContents } from "@/components/posts/TableOfContents";

export const metadata: Metadata = {
  title: "Blog",
  description: "",
};

export default async function LocaleLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;

  const { locale } = params;

  const { children } = props;

  return (
    <>
      <TableOfContents />
      <ScrollProgressBar />
      {children}
    </>
  );
}
