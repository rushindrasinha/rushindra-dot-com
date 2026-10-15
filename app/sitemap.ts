import { MetadataRoute } from "next";
import { BOTS } from "./lib/bots";

const BASE = "https://rushindra.com";
const lastModified = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/about`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/contact`, lastModified, changeFrequency: "yearly", priority: 0.7 },
    { url: `${BASE}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/bots`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    ...BOTS.map((b) => ({
      url: `${BASE}/bots/${b.slug}`,
      lastModified: new Date(b.addedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
