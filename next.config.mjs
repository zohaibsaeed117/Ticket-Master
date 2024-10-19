/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com", "assets.aceternity.com"], // Add unsplash domain here
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
