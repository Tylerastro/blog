import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const markdownDir = path.join(process.cwd(), 'markdown');
const qaDir = path.join(process.cwd(), 'backend', 'QA');
const outputFile = path.join(qaDir, 'tags.json');

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

const tagsData = allFiles.map(filePath => {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContent);
    return {
        title: data.title || 'No Title',
        tags: data.tags || [],
    };
});

if (!fs.existsSync(qaDir)) {
    fs.mkdirSync(qaDir, { recursive: true });
}

fs.writeFileSync(outputFile, JSON.stringify(tagsData, null, 2));

console.log(`Successfully generated tags.json at ${outputFile}`);
