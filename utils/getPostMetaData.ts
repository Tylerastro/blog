import fs from "fs";
import matter from "gray-matter";

export default function getPostMetadata(basePath: string) {
  const folder = basePath + "/";
  const files = fs.readdirSync(folder);
  const markdownPosts = files.filter((file) => file.endsWith(".mdx"));

  // get the file data
  const posts = markdownPosts.map((filename) => {
    const fileContents = fs.readFileSync(`${basePath}/${filename}`, "utf8");
    const matterResult = matter(fileContents);

    // Get preview content (everything before <!--more-->)
    const preview = matterResult.content.split("<!--more-->")[0].trim();

    return {
      title: matterResult.data.title,
      created_date: matterResult.data.date,
      tags: matterResult.data.tags,
      categories: matterResult.data.categories,
      slug: filename.replace(".mdx", ""),
      preview: preview,
    };
  });
  return posts;
}
