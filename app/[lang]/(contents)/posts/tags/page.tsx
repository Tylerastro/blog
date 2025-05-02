import { getAllTagsWithCount } from "@/lib/tags";
import Link from "next/link";

const MIN_FONT_SIZE = 1.0; // rem
const MAX_FONT_SIZE = 2.5; // rem
const MIN_OPACITY = 0.5;
const MAX_OPACITY = 1.0;
const HOVER_SCALE = 1.1; // Scale factor for hovered tag

const TagCloudPage = async () => {
  const tags = getAllTagsWithCount();
  if (!tags.length) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Tags</h1>
        <p className="text-gray-500">No tags found.</p>
      </main>
    );
  }
  const counts = tags.map((t) => t.count);
  const min = Math.min(...counts);
  const max = Math.max(...counts);
  const scale = (count: number) => {
    if (max === min) return 1;
    return (count - min) / (max - min);
  };

  console.log(tags);
  return (
    <section className="px-4 py-10 md:py-12 lg:py-16 items-center justify-center">
      <h1 className="text-3xl font-bold mb-8 text-center">Tags</h1>
      <div className="flex flex-wrap justify-center mx-10 gap-6 group">
        {tags.map((tag) => {
          const s = scale(tag.count);
          const fontSize = MIN_FONT_SIZE + (MAX_FONT_SIZE - MIN_FONT_SIZE) * s;
          return (
            <Link
              key={tag.slug}
              href={`./tags/${tag.slug}`}
              tabIndex={0}
              aria-label={`View posts tagged ${tag.name}`}
              className="transition-all duration-300 focus:outline-none rounded group-hover:opacity-50 hover:!opacity-100 hover:scale-110 hover:z-10"
              style={{ fontSize: `${fontSize}rem` }}
            >
              <span className="px-2 py-1 rounded cursor-pointer select-none">
                {tag.name}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default TagCloudPage;
