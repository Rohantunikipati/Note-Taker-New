/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.googleusercontent.com", // Allow images from this domain
      },
      {
        protocol: "https",
        hostname: "*.google.com", // Allow images from this domain
      },
    ],
  },
};

export default nextConfig;
