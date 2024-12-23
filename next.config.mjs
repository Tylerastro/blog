import createNextIntlPlugin from 'next-intl/plugin';
import rehypeMdxCodeProps from 'rehype-mdx-code-props'
import createMDX from '@next/mdx' 
import remarkMath from 'remark-math'
import rehypeStarryNight from 'rehype-starry-night'

const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
    // Configure `pageExtensions` to include markdown and MDX files
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
    // Optionally, add any other Next.js config below
  }
   
const withMDX = createMDX({
    rehypePlugins: [
      rehypeMdxCodeProps
    ],
    remarkPlugins: [
      remarkMath,
      rehypeStarryNight
    ],
  }
)

 
export default withNextIntl(withMDX(nextConfig));