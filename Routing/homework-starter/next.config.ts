import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'jsonplaceholder.typicode.com',
        pathname: '/**',
      },
    ],
    // Оптимизации для CLS
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Отключаем консоль в продакшене
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Включаем сжатие
  compress: true,
  // typescript проверка ошибок
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;