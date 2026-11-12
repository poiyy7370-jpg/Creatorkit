import type { MetadataRoute } from "next";
import { tools, site } from "@/lib/tools";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/tools", ...tools.map(t => `/tools/${t.slug}`)].map(p => ({ url: site.url + p, lastModified: new Date() }));
}
