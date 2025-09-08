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
- `npm run tag` - Generate tags from post metadata
- `npm run metadata` - Generate metadata from posts

### Backend Services
- Backend documentation is available in `/backend/CLAUDE.md`
- Backend server: `cd backend && uvicorn main:app --reload` (runs on http://localhost:8000)
- Backend setup requires `.env.local` with `GOOGLE_API_KEY` and/or `OPENAI_API_KEY`

### Testing
- No formal test framework is configured - this project focuses on blog content generation

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

### MD to MDX Processing Pipeline

**Step 1: Source Creation**
- Markdown files created in `/markdown/PostTitle.md` with YAML frontmatter
- Associated assets (images, videos, files) placed in `/markdown/PostTitle/` folder
- Frontmatter supports: title, date, tags, draft, password, preview, medium, audio

**Step 2: Asset Processing** (`scripts/movePostAssets.sh`)
- Scans `/markdown/` directory for post folders
- Copies all assets from `/markdown/[PostTitle]/` to `/public/blogs/[PostTitle]/`
- Makes assets publicly accessible at `/blogs/[PostTitle]/[asset]` URLs
- Preserves directory structure and file names

**Step 3: MDX Conversion** (`scripts/createMDX.js`)
- Reads all `.md` files from `/markdown/` directory
- Parses frontmatter using gray-matter
- Converts markdown content to MDX format
- Outputs processed files to `/contents/[PostTitle].mdx`
- Skips password-protected posts during processing

**Step 4: Property Processing** (`scripts/convertProp.py`)
- Processes frontmatter properties and metadata
- Generates additional post metadata for indexing
- Handles tag extraction and categorization

**Step 5: Next.js Rendering**
- Next.js App Router loads `.mdx` files from `/contents/`
- MDX components from `mdx-components.tsx` render markdown elements
- Custom components handle: code blocks (with syntax highlighting), images, links, lists
- Rehype plugins process: syntax highlighting, math rendering, code props
- Final HTML served with full styling and interactive features

**Key Files in Pipeline:**
- Source: `/markdown/PostTitle.md` + `/markdown/PostTitle/` (assets)
- Scripts: `movePostAssets.sh`, `createMDX.js`, `convertProp.py`
- Output: `/contents/PostTitle.mdx` + `/public/blogs/PostTitle/` (assets)
- Rendering: `mdx-components.tsx`, `/app/` routes, `/components/posts/`

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
- **3D Graphics**: Three.js integration with GLSL shader support (`/components/shaders/` and `BlackHole.tsx`)
- **GSAP Animations**: Animation library integration for scroll-based effects
- **Syntax Highlighting**: rehype-starry-night for code blocks in MDX
- **Math Rendering**: LaTeX math support via rehype-mathjax  
- **Image Optimization**: Next.js Image component with custom MDX renderer and middleware redirects
- **Task Lists**: GitHub-style checkbox support in markdown via custom `li` component
- **AI Chat**: Backend RAG system for blog content Q&A using LangChain

### Technical Stack
- **Frontend**: Next.js 15+ with App Router, React 19, TypeScript
- **Styling**: Tailwind CSS with custom theme, Radix UI components
- **Animation**: GSAP, Framer Motion, custom keyframes
- **3D/Graphics**: Three.js, React Three Fiber, GLSL shaders
- **Content**: MDX with custom components, gray-matter for frontmatter
- **Backend**: FastAPI (Python) with LangChain for AI features
- **Build Tools**: Next.js bundler, raw-loader for GLSL, Turbopack support
- **Package Manager**: npm (standard), backend uses `uv` for Python dependencies

### Key Architecture Patterns
- **Content Pipeline**: Markdown → MDX conversion with asset handling
- **Component Architecture**: Radix UI base with custom extensions
- **Route Middleware**: Custom image path redirects and i18n setup (currently disabled)  
- **3D Integration**: GLSL shaders loaded as raw text, Three.js canvas components
- **State Management**: React state with context for theme, no external state library

### Important Build Configuration
- **ESLint**: Ignored during builds (`eslint.ignoreDuringBuilds: true`)
- **GLSL Shaders**: Raw text loading via webpack and Turbopack configuration
- **MDX Processing**: Custom rehype plugins for code props and syntax highlighting
- **Image Handling**: Unsplash remote patterns configured for optimization
- **File Extensions**: MD, MDX, JS, JSX, TS, TSX all processed as pages