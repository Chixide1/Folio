import {NextConfig} from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['next-mdx-remote'],
}

// Merge MDX config with Next.js config
export default nextConfig