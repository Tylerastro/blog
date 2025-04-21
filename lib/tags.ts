import fs from "fs";
import matter from "gray-matter";
import path from "path";

export type Post = {
  title: string;
  date: string;
  tags: string[];
  slug: string;
  [key: string]: any;
};

export type Tag = {
  name: string;
  slug: string;
  count: number;
};

const MARKDOWN_PATH = path.join(process.cwd(), "markdown");

export const getAllPosts = (): Post[] => {
  const files = fs
    .readdirSync(MARKDOWN_PATH)
    .filter((file) => file.endsWith(".md"));
  return files.map((filename) => {
    const fileContents = fs.readFileSync(
      path.join(MARKDOWN_PATH, filename),
      "utf8"
    );
    const { data } = matter(fileContents);
    return {
      title: data.title || filename.replace(/\.md$/, ""),
      date: data.date || "",
      tags: Array.isArray(data.tags) ? data.tags : data.tags ? [data.tags] : [],
      slug: filename.replace(/\.md$/, ""),
      ...data,
    };
  });
};

export const getAllTagsWithCount = (): Tag[] => {
  const posts = getAllPosts();
  const tagMap: Record<string, number> = {};
  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagMap[tag] = (tagMap[tag] || 0) + 1;
    });
  });
  return Object.entries(tagMap).map(([name, count]) => ({
    name,
    slug: slugify(name),
    count,
  }));
};

export const getPostsByTag = (tagName: string): Post[] => {
  const posts = getAllPosts();
  return posts.filter((post) => post.tags.includes(tagName));
};

export const getTagBySlug = (slug: string): Tag | null => {
  const tags = getAllTagsWithCount();
  return tags.find((tag) => tag.slug === slug) || null;
};

function slugify(str: string): string {
  return str
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-") // spaces to dash
    .replace(/[^\p{L}\p{N}-]/gu, "") // keep unicode letters/numbers/dash
    .replace(/-+/g, "-") // collapse dashes
    .replace(/^-+|-+$/g, ""); // trim dashes
}
