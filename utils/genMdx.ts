import fs from "fs";

export const generateMdx = (
  frontmatter: any,
  content: string,
  outputPath: string
) => {
  const mdxContent = `---\n${Object.entries(frontmatter)
    .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
    .join("\n")}\n---\n\n${content}`;

  // Create contents directory if it doesn't exist
  if (!fs.existsSync("./contents")) {
    fs.mkdirSync("./contents", { recursive: true });
  }

  fs.writeFileSync(outputPath, mdxContent);
};
