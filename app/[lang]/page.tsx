export default async function Home({ params }: { params: { lang: string } }) {
  // Await params to access its properties
  const { lang } = await params;

  return (
    <main>
      <section className="h-[80svh]">seciton 1</section>
      <section className="h-[80svh]">seciton 2</section>
      <section className="h-[80svh]">seciton 3</section>
    </main>
  );
}
