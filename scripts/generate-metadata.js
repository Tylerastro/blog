import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const markdownDir = path.join(process.cwd(), 'markdown');
const qaDir = path.join(process.cwd(), 'backend', 'QA');
const outputFile = path.join(qaDir, 'metadata.json');

function getMarkdownFiles(dir) {
    let files = [];
    const items = fs.readdirSync(dir);
    for (const item of items) {
        const fullPath = path.join(dir, item);
        if (fs.statSync(fullPath).isDirectory()) {
            files = [...files, ...getMarkdownFiles(fullPath)];
        } else if (path.extname(item) === '.md') {
            files.push(fullPath);
        }
    }
    return files;
}

const allFiles = getMarkdownFiles(markdownDir);

const metadata = {};

allFiles.forEach(filePath => {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContent);
    const relativePath = path.relative(process.cwd(), filePath);
    metadata[relativePath] = {
        title: data.title || 'No Title',
        tags: data.tags || [],
        date: data.date || null,
    };
});

if (!fs.existsSync(qaDir)) {
    fs.mkdirSync(qaDir, { recursive: true });
}

fs.writeFileSync(outputFile, JSON.stringify(metadata, null, 2));

console.log(`Successfully generated metadata.json at ${outputFile}`);
