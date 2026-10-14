import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/content";
import { pages } from "@/lib/routes";

/** GitHub Pages has no server: written once at build time. */
export const dynamic = "force-static";

/** Both languages, each entry naming its counterpart for hreflang. */
export default function sitemap(): MetadataRoute.Sitemap {
  const abs = (path: string) => `${siteUrl}${path === "/" ? "" : path}`;
  return Object.values(pages).flatMap((page) =>
    (["el", "en"] as const).map((lang) => ({
      url: abs(page[lang]),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: page.el === "/" ? 1 : 0.8,
      alternates: { languages: { el: abs(page.el), en: abs(page.en) } },
    })),
  );
}
