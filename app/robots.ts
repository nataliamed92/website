import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/content";

/** GitHub Pages has no server: written once at build time. */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
