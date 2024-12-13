import createNextIntlPlugin from 'next-intl/plugin';
import createMDX from '@next/mdx' 

const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
    // Configure `pageExtensions` to include markdown and MDX files
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
    // Optionally, add any other Next.js config below
  }
   
  const withMDX = createMDX({
    // Add markdown plugins here, as desired
  })
 
export default withNextIntl(withMDX(nextConfig));