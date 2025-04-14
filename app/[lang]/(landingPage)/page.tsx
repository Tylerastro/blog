import PostTable from "@/components/landingPage/PostTable";

export default async function Home({ params }: { params: { lang: string } }) {
  const { lang } = await params;

  return (
    <main className="bg-gray-100 snap-mandatory snap-y h-screen overflow-y-scroll scroll-smooth">
      <section className="h-[100svh] flex flex-col snap-center">
        <div className="h-[60%] flex items-center justify-center mt-16">
          <h2 className="text-xl font-medium text-primary-foreground">
            Every day tips
          </h2>
        </div>
        <div className="h-[40%] flex items-center justify-center">
          <h1 className="text-3xl font-bold text-primary-foreground">
            Tyler Lin
          </h1>
        </div>
      </section>
      <section className="h-[100svh] bg-secondary rounded-t-3xl -mt-2 py-12 snap-center">
        <div className="mt-12">
          <PostTable />
        </div>
      </section>
      <section className="h-[100svh] snap-center">
        <h1>Section 3</h1>
      </section>
    </main>
  );
}
