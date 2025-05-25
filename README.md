# Blog Project README

This is a [Next.js](https://nextjs.org) blog project. This document outlines the project structure, development workflows, and how blog posts are managed.

## Project Structure

-   `/markdown`: Source directory for all blog posts written in Markdown (`.md`).
    -   `/markdown/[Post Title]/`: Each post can have a corresponding folder here to store its assets (images, etc.).
-   `/contents`: Output directory where processed `.md` files are converted to `.mdx` files by scripts. These `.mdx` files are then used by Next.js to render blog posts.
-   `/public/blogs/[Post Title]/`: Publicly accessible directory where post assets are moved during the development/build process.
-   `/scripts`: Contains helper scripts for various tasks like creating new posts, processing markdown, and managing assets.


## Blog Workflow

### 1. Creating a New Blog Post

To create a new blog post, run the following command in your terminal:

```bash
npm run new "Your Awesome Post Title"
```

(Replace `"Your Awesome Post Title"` with the actual title of your post. Use quotes if the title has spaces.)

This command will:

1.  Create a new Markdown file: `markdown/Your Awesome Post Title.md`
2.  Pre-fill it with the following frontmatter:
    ```yaml
    ---
    title: "Your Awesome Post Title"
    date: "YYYY-MM-DD" # Current date
    tags: []
    draft: true
    ---

    # Your Awesome Post Title

    Start writing your blog post here...
    ```
3.  Create an asset directory for your post: `markdown/Your Awesome Post Title/`. You should place any images or other assets for this post into this directory.

### 2. Writing Content

Edit the generated `.md` file in the `/markdown` directory.

-   **Frontmatter**: This is the YAML block at the top of the Markdown file. It's used to store metadata about your post. Key fields include:
    -   `title` (string): The title of your post.
    -   `date` (string): The publication date (format: YYYY-MM-DD).
    -   `tags` (array of strings): Relevant tags for categorization (e.g., `["Tech", "NextJS"]`).
    -   `draft` (boolean): Set to `true` if the post is a draft and not ready for publishing, `false` otherwise.
    -   You can add other custom fields as needed (e.g., `author`, `coverImage`, `excerpt`). These will be parsed by `gray-matter`.
-   **Markdown Content**: Write your blog post content using standard Markdown syntax.
-   **Excerpt Separator**: If you use `<!--more-->` in your Markdown, it will be removed during processing. This is often used by themes to delineate an excerpt from the full content.

### 3. Processing (MD to MDX)

When you run `npm run dev` (or `yarn dev`, etc.) or build the project (`npm run build`):

1.  **Asset Handling**: The `scripts/movePostAssets.sh` script copies assets from `/markdown/[Post Title]/` to `/public/blogs/[Post Title]/`, making them publicly accessible.
2.  **MDX Creation**:
    -   The `scripts/createMDX.js` script reads each `.md` file from the `/markdown` directory.
    -   It uses `gray-matter` to parse the frontmatter and the Markdown content.
    -   The Markdown content (with `<!--more-->` removed) is then saved as an `.mdx` file in the `/contents` directory (e.g., `markdown/My Post.md` becomes `contents/My Post.mdx`).
    -   The frontmatter itself is not explicitly written into the `.mdx` file by this script; it's expected to be handled by the Next.js MDX processing pipeline (e.g., `@next/mdx`, `next-mdx-remote`).
3.  **Property Conversion**: The `scripts/convertProp.py` script is executed, which performs some conversion or processing on the post properties (frontmatter).

The Next.js application then uses the `.mdx` files from the `/contents` directory to render your blog posts.

## Available Scripts

-   `npm run dev`: Starts the development server. Includes steps to move assets, create MDX files, and convert properties before starting Next.js.
-   `npm run build`: Builds the application for production.
-   `npm run start`: Starts a production server (after building).
-   `npm run lint`: Lints the codebase.
-   `npm run new "Post Title"`: Creates a new blog post draft with the given title.
-   `npm run clean`: Removes generated content from `/contents/*` and `/public/blogs/*`. Use with caution.
