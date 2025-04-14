import PostTable from "@/components/landingPage/PostTable";
export default async function Home({ params }: { params: { lang: string } }) {
  // Await params to access its properties
  const { lang } = await params;

  return (
    <main className="bg-gray-100">
      <section className="h-[90svh] flex flex-col">
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
      <section className="h-[90svh] bg-secondary rounded-t-3xl -mt-12 py-12">
        <PostTable />
      </section>
      <section className="h-[80svh]">
        <h1>Seciton3</h1>
      </section>
    </main>
  );
}
