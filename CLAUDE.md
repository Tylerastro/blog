# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start development server (includes asset processing and MDX generation)
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run linting

### Blog Management
- `npm run new "Post Title"` - Create new blog post with frontmatter template
- `npm run clean` - Remove generated content from `/contents/` and `/public/blogs/`

### Build Process (Automatic)
The `npm run dev` command runs these scripts in sequence:
1. `bash scripts/movePostAssets.sh` - Move assets from `/markdown/[Post]/` to `/public/blogs/[Post]/`
2. `node scripts/createMDX.js` - Convert `.md` files to `.mdx` in `/contents/`
3. `python scripts/convertProp.py` - Process post properties
4. `next dev` - Start Next.js development server

## Architecture

### Blog Content System
This is a Next.js blog with a custom markdown processing pipeline:

- **Source**: Blog posts written in Markdown (`.md`) in `/markdown/` directory
- **Processing**: Scripts convert `.md` → `.mdx` and move assets to public directory
- **Rendering**: Next.js renders `.mdx` files from `/contents/` using custom MDX components

### Key Directories
- `/markdown/` - Source markdown files and post assets
- `/contents/` - Generated MDX files (auto-generated, don't edit directly)
- `/public/blogs/` - Publicly accessible post assets (auto-generated)
- `/components/` - React components including UI components and post-related components
- `/app/` - Next.js App Router pages
- `/utils/` - Utility functions for post metadata parsing
- `/lib/` - Shared libraries including tags and utilities

### Content Processing Flow
1. Write markdown in `/markdown/PostTitle.md` with frontmatter
2. Place post assets in `/markdown/PostTitle/` folder
3. Run `npm run dev` which:
   - Moves assets to `/public/blogs/PostTitle/`
   - Converts `.md` to `.mdx` in `/contents/`
   - Processes frontmatter properties
4. Next.js renders MDX using custom components from `mdx-components.tsx`

### Key Components
- **MDX Components**: Custom renderers for markdown elements in `mdx-components.tsx`
- **CodeBlock**: Syntax highlighting component with rehype-starry-night
- **Post Components**: `PostCard`, `PostList`, `PostInfo`, etc. in `/components/posts/`
- **UI Components**: Radix UI-based components in `/components/ui/`

### Frontmatter Schema
Blog posts support these frontmatter fields:
- `title` (string) - Post title
- `date` (string) - Publication date (YYYY-MM-DD)
- `tags` (array) - Post tags for categorization
- `draft` (boolean) - Hide from published posts if true
- `password` (string) - Password-protected posts (skipped in processing)
- `preview` (string) - Post preview/excerpt
- `medium` (string) - Medium article link
- `audio` (string) - Audio version link

### Styling & Theming
- **Framework**: Tailwind CSS with custom theme configuration
- **Dark Mode**: Supported via `next-themes` with class-based switching
- **Fonts**: Custom font setup in `/styles/fonts.ts` (Author, Outfit)
- **Animations**: Custom keyframes and animations defined in Tailwind config

### Internationalization
- **Setup**: next-intl configured for en-US and zh-TW locales
- **Messages**: Translation files in `/messages/` directory
- **Middleware**: Custom routing logic for locale handling and image redirects

### Special Features
- **3D Graphics**: Three.js integration with GLSL shader support
- **GSAP Animations**: Animation library integration
- **Syntax Highlighting**: rehype-starry-night for code blocks
- **Math Rendering**: LaTeX math support via rehype-mathjax
- **Image Optimization**: Next.js Image component with custom MDX renderer
- **Task Lists**: GitHub-style checkbox support in markdown