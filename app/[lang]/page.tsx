import PostTable from "@/components/landingPage/PostTable";
import BlackHole from "@/components/BlackHole";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <main className="bg-black-100 snap-mandatory snap-y h-screen overflow-y-scroll scroll-smooth">
      <section className="h-[100svh] flex flex-col snap-center relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <BlackHole />
        </div>
        <div className="h-[60%] flex items-center justify-center mt-16 relative z-10">
          <h2 className="text-xl font-medium text-white drop-shadow-lg">
            {/* Every day tips */}
          </h2>
        </div>
        <div className="h-[40%] flex items-center justify-center relative z-10">
          <h1 className="text-3xl font-bold text-white drop-shadow-lg">
            Tyler Lin
          </h1>
        </div>
      </section>
      {/* <section className="h-[100svh] bg-secondary rounded-t-3xl -mt-2 py-12 snap-center">
        <div className="mt-12">
          <PostTable />
        </div>
      </section>
      <section className="h-[100svh] snap-center">
        <h1>Section 3</h1>
      </section> */}
    </main>
  );
}
