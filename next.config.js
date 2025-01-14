/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "thetheme.io",
      },
      {
        protocol: "https",
        hostname: "thetheme.io",
      },
      {
        protocol: "https",
        hostname: "**", // Allow all HTTPS domains (optional, restrict if necessary)
      },
    ],
  },
};

module.exports = nextConfig;
