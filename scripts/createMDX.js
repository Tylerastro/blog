import fs from "fs";
import matter from "gray-matter";

const BASEPATH = "markdown";

function getPostsMetadata() {
  const folder = BASEPATH + "/";
  const files = fs.readdirSync(folder);
  const mdPosts = files.filter((file) => file.endsWith(".md"));

  // get the file data
  const posts = mdPosts.map((filename) => {
    const fileContents = fs.readFileSync(`${BASEPATH}/${filename}`, "utf8");
    const matterResult = matter(fileContents);
    // Generate MDX file
    const mdxContent = generateMdxContent(
      matterResult.data,
      matterResult.content
    );
    const mdxFilename = filename.replace(".md", ".mdx");
    fs.writeFileSync(`./contents/${mdxFilename}`, mdxContent);
  });
  return posts;
}

function generateMdxContent(frontmatter, content)  {
  // const frontmatterStr = `---\n${Object.entries(frontmatter)
  //   .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
  //   .join("\n")}\n---\n\n`;
  content = content.replace("<!--more-->", "");
  

  return `${content}`;
}

getPostsMetadata()