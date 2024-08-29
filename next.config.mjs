/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "elated-squid-219.convex.cloud",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
