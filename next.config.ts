import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Formatos modernos para Lighthouse 90+ (assets en /public/images)
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
