import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    // CSS en línea en el <head>: sin hoja que bloquee el primer pintado
    inlineCss: true,
  },
  images: {
    // Formatos modernos para Lighthouse 90+ (assets en /public/images)
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
