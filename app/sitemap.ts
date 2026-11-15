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

  const baseUrl = site.url.replace(/\/+$/, "");

  return pages.map((page) => ({
    url: `${baseUrl}${page ? `/${page.replace(/^\/+/, "")}` : ""}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: page === "" ? 1 : 0.8,
  }));
}
