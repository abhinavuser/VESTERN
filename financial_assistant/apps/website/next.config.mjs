/** @type {import('next').NextConfig} */
const config = {
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
  poweredByHeader: false,
  reactStrictMode: true,
  transpilePackages: ["@midday/ui", "@midday/tailwind", "next-mdx-remote"],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    inlineCss: true,
  },
  images: {
    loader: "custom",
    loaderFile: "./image-loader.ts",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/en/(.*)",
        destination: "/",
        permanent: true,
      },
      {
        source: "/public-beta",
        destination: "/",
        permanent: true,
      },
      {
        source: "/pitch",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default config;