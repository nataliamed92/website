import type { NextConfig } from "next";

/**
 * Static export for GitHub Pages (2026-10-14): no server, so no image
 * optimiser either; the photographs are served as they are in `public/`.
 */
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
