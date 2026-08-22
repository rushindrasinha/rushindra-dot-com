import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
      {
        // acceptmarkdown.com: the homepage is content-negotiated between
        // text/html and text/markdown, so caches must key on Accept.
        // Next.js overwrites a Vary set from proxy.ts on the HTML branch,
        // so it is declared here as well.
        source: "/",
        headers: [
          {
            key: "Vary",
            // Superset: Accept (markdown negotiation) + the RSC values Next.js
            // needs for correct client-router caching. Never drop the latter.
            value:
              "Accept, RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch, Accept-Encoding",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
