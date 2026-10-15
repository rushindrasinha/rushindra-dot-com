import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /go/<slug> are click-tracking redirects to x.ai; crawling them only inflates bot_click counts.
      disallow: "/go/",
    },
    sitemap: "https://rushindra.com/sitemap.xml",
    host: "https://rushindra.com",
  };
}
