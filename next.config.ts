import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  // Enable experimental features for better error handling
  experimental: {
    // This helps with hydration issues
    optimizePackageImports: ['@heroicons/react'],
  },
  // Add proper headers for better caching and error handling
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
        ],
      },
    ];
  },
  // Handle build and runtime errors better
  onDemandEntries: {
    // Period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // Number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },
  // Enable source maps for better debugging
  productionBrowserSourceMaps: true,
};

export default nextConfig;
