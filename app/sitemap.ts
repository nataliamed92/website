import type { MetadataRoute } from "next";
import { nav, siteUrl } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/", ...nav.map((n) => n.href)];
  return routes.map((route) => ({
    url: `${siteUrl}${route === "/" ? "" : route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "/" ? 1 : 0.8,
  }));
}
