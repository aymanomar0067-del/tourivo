/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Images are referenced from the original public CDNs via plain <img> tags,
  // so no remote image-optimization config is required. This keeps the build
  // portable and avoids Vercel image-optimization setup.
};

module.exports = nextConfig;
