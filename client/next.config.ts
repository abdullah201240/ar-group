import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,

  images: {
    domains: process.env.NEXT_PUBLIC_IMAGE_DOMAINS?.split(",") || [],
    
  },

  webpack(config, { isServer }) {
    if (!isServer) {
      config.module.rules.push({
        test: /\.(png|webp|jpg|jpg)$/,
        type: "asset/resource",
        generator: {
          filename: "static/media/[name].[hash][ext]",
        },
      });
    }

    return config;
  },

  async headers() {
    return [
      {
        source: "/:path*.jpg", // Match .mp4 files
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*.webp", // Match .webm files
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*.png", // Match .ogg files
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*.jpeg", // Match .mov files
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
