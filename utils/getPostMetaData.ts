import fs from "fs";
import matter from "gray-matter";

const BASEPATH = "markdown";

export default function getPostsMetadata() {
  const folder = BASEPATH + "/";
  const files = fs.readdirSync(folder);
  const mdPosts = files.filter((file) => file.endsWith(".md"));

  // get the file data
  const posts = mdPosts.map((filename) => {
    const fileContents = fs.readFileSync(`${BASEPATH}/${filename}`, "utf8");
    const matterResult = matter(fileContents);

    return {
      title: matterResult.data.title,
      created_date: matterResult.data.date,
      tags: matterResult.data.tags,
      categories: matterResult.data.categories,
      slug: filename.replace(".md", ""),
      content: matterResult.content,
      preview: matterResult.data.preview,
      draft: matterResult.data.draft || false,
      password: matterResult.data.password,
      mediumLink: matterResult.data.medium,
      audioLink: matterResult.data.audio,
    };
  });

  // Filter out posts with draft = true or password protection
  const publishedPosts = posts.filter((post) => !post.draft && !post.password);

  return publishedPosts;
}

export function getPostMetadata(fileName: string) {
  const folder = BASEPATH + "/";
  const files = fs.readdirSync(folder);
  const Post = files.find((file) => file === fileName);

  const fileContents = fs.readFileSync(`${BASEPATH}/${Post}`, {
    encoding: "utf8",
  });
  const matterResult = matter(fileContents);

  return {
    title: matterResult.data.title,
    created_date: matterResult.data.date,
    tags: matterResult.data.tags,
    categories: matterResult.data.categories,
    mediumLink: matterResult.data.medium,
    audioLink: matterResult.data.audio,
    filename: fileName.replace(".md", ""),
    content: matterResult.content,
  };
}
