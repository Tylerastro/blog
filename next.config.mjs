import createMDX from '@next/mdx'
import rehypeMdxCodeProps from 'rehype-mdx-code-props'
import remarkMath from 'remark-math'
import rehypeStarryNight from 'rehype-starry-night'
 
/** @type {import('next').NextConfig} */
const nextConfig = {

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
};

const withMDX = createMDX({
  options: {
     rehypePlugins: [
      rehypeMdxCodeProps
    ],
    remarkPlugins: [
remarkMath,
rehypeStarryNight
    ],
  }  
})
 
// Merge MDX config with Next.js config
export default withMDX(nextConfig)


