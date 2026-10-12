/**
 * The route table, with no content imported, so client components can use it
 * without pulling both languages' text into the browser bundle.
 *
 * Greek keeps the URLs it has always had; English lives under `/en` with
 * English slugs. `pages` pairs every route with its counterpart, and it is the
 * one table that the language switch, the hreflang tags and the sitemap all
 * read.
 */
export type Lang = "el" | "en";

export const pages = {
  home: { el: "/", en: "/en" },
  doctor: { el: "/iatros", en: "/en/doctor" },
  services: { el: "/ypiresies", en: "/en/services" },
  facial: { el: "/prosopo", en: "/en/facial-surgery" },
  practice: { el: "/iatreio", en: "/en/practice" },
  contact: { el: "/epikoinonia", en: "/en/contact" },
} as const;

export type PageKey = keyof typeof pages;

/** The same page in the other language. Unknown paths fall back to its home. */
export function counterpart(pathname: string): string {
  const from: Lang = pathname === "/en" || pathname.startsWith("/en/") ? "en" : "el";
  const to: Lang = from === "el" ? "en" : "el";
  const clean = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
  const hit = Object.values(pages).find((p) => p[from] === clean);
  return hit ? hit[to] : pages.home[to];
}
