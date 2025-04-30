import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Derive __dirname equivalent in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get the title from command line arguments
const title = process.argv[2];

if (!title) {
  console.error('Error: Please provide a title for the new post.');
  console.log('Usage: npm run new "Your Post Title"');
  process.exit(1); // Exit with an error code
}

// Define the base path relative to the script's location
// Assumes 'scripts' is at the root, and 'markdown' is also at the root
const basePath = path.join(__dirname, '..', 'markdown');
const folderPath = path.join(basePath, title);
const filePath = path.join(basePath, `${title}.md`);

// Create the directory
try {
  fs.mkdirSync(folderPath, { recursive: true });
  console.log(`Created directory: ${folderPath}`);
} catch (err) {
  console.error(`Error creating directory: ${err.message}`);
  process.exit(1);
}

// Create the markdown file with basic frontmatter
const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
const frontmatter = `---
title: "${title}"
date: "${currentDate}"
tags: []
draft: true
---

# ${title}

Start writing your blog post here...
`;

try {
  // Check if file already exists before writing
  if (fs.existsSync(filePath)) {
    console.warn(`Warning: File already exists at ${filePath}. Overwriting.`);
  }
  fs.writeFileSync(filePath, frontmatter, 'utf8');
  console.log(`Created markdown file: ${filePath}`);
} catch (err) {
  console.error(`Error creating file: ${err.message}`);
  process.exit(1);
}

console.log(`
Successfully created new post: "${title}"`); 