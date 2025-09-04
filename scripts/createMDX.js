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
    
    // Skip writing file if password is present in frontmatter
    if (matterResult.data.password) {
      console.log(`Skipping ${filename} - password protected`);
      return null;
    }
    
    // Generate MDX file - keep it simple
    const mdxContent = generateMdxContent(
      matterResult.data,
      matterResult.content
    );
    const mdxFilename = filename.replace(".md", ".mdx");
    fs.writeFileSync(`./contents/${mdxFilename}`, mdxContent);
  });
  return posts;
}

function generateMdxContent(frontmatter, content) {
  content = content.replace("<!--more-->", "");
  return content; // Keep as raw markdown, let Next.js handle the processing
}

getPostsMetadata();