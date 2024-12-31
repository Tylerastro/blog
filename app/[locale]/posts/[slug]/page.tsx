export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const { default: Post } = await import(`@/markdown/${slug}.mdx`);

  return <Post />;
}

export function generateStaticParams() {
  return [{ slug: "welcome" }, { slug: "Django" }];
}

export const dynamicParams = false;
