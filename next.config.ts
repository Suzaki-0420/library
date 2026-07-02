import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [

      // 図書管理API
      {
        source: "/proxy-api/books/:path*",
        destination: "http://20.78.35.126/app2/library/api/books/:path*",
      },
      // カテゴリ管理API
      {
        source: "/proxy-api/categories/:path*",
        destination: "http://20.78.35.126/app2/library/api/categories/:path*",
      },
    ];
  },
};

export default nextConfig;