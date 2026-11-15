import type { MetadataRoute } from "next";
import { tools, site } from "@/lib/tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "",
    "/tools",
    "/about",
    "/contact",
    "/privacy-policy",
    ...tools.map((tool) => `/tools/${tool.slug}`),
  ];

  return pages.map((page) => ({
    url: `${site.url}${page}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: page === "" ? 1 : 0.8,
  }));
}