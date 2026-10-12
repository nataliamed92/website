import type { Metadata } from "next";
import * as el from "./content";
import * as en from "./content.en";
import { pages, type Lang, type PageKey } from "./routes";

export { pages, counterpart, type Lang, type PageKey } from "./routes";

/**
 * The site in two languages: one content module per language, same shape.
 * Server-only in practice — a client component that imported this would ship
 * both languages' text to the browser; client components take props instead.
 */

/** Literal types widened, so the English module can satisfy the Greek shape. */
type Widen<T> = T extends string
  ? string
  : T extends (...args: infer A) => infer R
    ? (...args: A) => R
    : T extends readonly (infer U)[]
      ? readonly Widen<U>[]
      : T extends object
        ? { readonly [K in keyof T]: Widen<T[K]> }
        : T;

export type Content = Widen<typeof el>;

const editions: Record<Lang, Content> = { el, en };

export const getContent = (lang: Lang): Content => editions[lang];

/** Canonical plus hreflang for one page, in the given language. */
export function alternates(page: PageKey, lang: Lang): Metadata["alternates"] {
  return {
    canonical: pages[page][lang],
    languages: {
      el: pages[page].el,
      en: pages[page].en,
      "x-default": pages[page].el,
    },
  };
}
