import ScrollProgressBar from "@/components/ProgressBar";
import type { Metadata } from "next";
import { TableOfContents } from "@/components/posts/TableOfContents";
import { unstable_setRequestLocale } from "next-intl/server";

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

  unstable_setRequestLocale(locale);
  return (
    <>
      <TableOfContents />
      <ScrollProgressBar />
      {children}
    </>
  );
}
