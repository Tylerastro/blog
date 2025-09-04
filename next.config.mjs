import createMDX from '@next/mdx'
import rehypeMdxCodeProps from 'rehype-mdx-code-props'
import remarkMath from 'remark-math'
import rehypePrettyCode from 'rehype-pretty-code'
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  // Optionally, add any other Next.js config below
  
  turbopack: {
      resolveExtensions: [
        ".md",
        ".mdx",
        ".tsx",
        ".ts",
        ".jsx",
        ".js",
        ".mjs",
        ".json",
      ],
      rules: {
        "*.glsl": {
          loaders: ["raw-loader"],
          as: "*.js",
        },
      },
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: "raw-loader",
      exclude: /node_modules/,
    });
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
};

const withMDX = createMDX({
  options: {
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: 'github-light',
          keepBackground: false,
          grid: true,
        }
      ],
      rehypeMdxCodeProps
    ],
    remarkPlugins: [
      // remarkMath,
    ],
  }  
})
 
// Merge MDX config with Next.js config
export default withMDX(nextConfig)


