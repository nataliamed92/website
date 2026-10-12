"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { List, X } from "@phosphor-icons/react";
import { counterpart, pages, type Lang } from "@/lib/routes";

type Labels = {
  book: string;
  menuOpen: string;
  menuClose: string;
  switchLabel: string;
  switchAria: string;
};

/**
 * The language switch sits in the bar itself at every width, not only in the
 * mobile drawer: a reader who lands on the wrong language should not have to
 * open a menu to find the way out. It leads to the SAME page in the other
 * language, via the route table, not back to the home page.
 */
function LanguageSwitch({
  pathname,
  label,
  aria,
  lang,
}: {
  pathname: string;
  label: string;
  aria: string;
  lang: Lang;
}) {
  return (
    <Link
      href={counterpart(pathname)}
      hrefLang={lang === "el" ? "en" : "el"}
      aria-label={aria}
      className="inline-flex h-11 min-w-11 items-center justify-center rounded-full border border-line-strong px-3.5 text-[12.5px] font-semibold tracking-[0.12em] text-brand-700 transition-colors hover:border-brand-500 hover:text-brand-900"
    >
      {label}
    </Link>
  );
}

export default function SiteHeader({
  lang,
  nav,
  name,
  fullName,
  mark,
  phoneHref,
  labels,
}: {
  lang: Lang;
  nav: readonly { label: string; href: string }[];
  name: string;
  fullName: string;
  mark: string;
  phoneHref: string;
  labels: Labels;
}) {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const homeHref = pages.home[lang];

  // Feedback: the bar earns a surface only once it leaves the hero.
  useMotionValueEvent(scrollY, "change", (v) => setSolid(v > 90));

  // Only the home page opens on a full-bleed hero the bar can float over.
  const overHero = pathname === homeHref && !solid;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        overHero
          ? "border-b border-transparent"
          : "border-b border-line bg-paper/85 backdrop-blur-xl"
      }`}
    >
      <div className="mx-auto flex h-[76px] max-w-[1400px] items-center justify-between gap-3 px-5 sm:px-8">
        <Link
          href={homeHref}
          aria-label={fullName}
          className="-my-2 flex min-h-11 min-w-0 items-center gap-2.5 py-2 sm:gap-3.5"
        >
          <Image
            src={mark}
            alt=""
            aria-hidden
            width={76}
            height={156}
            priority
            className="h-[44px] w-auto shrink-0 sm:h-[52px]"
          />
          <span className="truncate text-[12.5px] leading-none font-light tracking-[0.24em] text-brand-900 uppercase sm:text-[15px] sm:tracking-[0.3em]">
            {name}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              className={`text-[13.5px] whitespace-nowrap transition-colors hover:text-brand-800 ${
                pathname === item.href ? "text-brand-600" : "text-brand-700"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <div className="flex items-center gap-3">
            <LanguageSwitch
              pathname={pathname}
              label={labels.switchLabel}
              aria={labels.switchAria}
              lang={lang}
            />
            <a
              href={phoneHref}
              className="rounded-full bg-brand-600 px-5 py-2.5 text-[13.5px] font-semibold whitespace-nowrap text-white transition-transform duration-200 hover:bg-brand-700 active:scale-[0.98]"
            >
              {labels.book}
            </a>
          </div>
        </nav>

        <div className="flex shrink-0 items-center gap-1 lg:hidden">
          <LanguageSwitch
            pathname={pathname}
            label={labels.switchLabel}
            aria={labels.switchAria}
            lang={lang}
          />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? labels.menuClose : labels.menuOpen}
            className="-mr-2.5 flex h-11 w-11 items-center justify-center text-brand-900"
          >
            {open ? <X size={24} weight="light" /> : <List size={24} weight="light" />}
          </button>
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="border-t border-line bg-paper/95 px-5 pt-4 pb-7 backdrop-blur-xl lg:hidden"
        >
          <nav className="flex flex-col">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={pathname === item.href ? "page" : undefined}
                className={`border-b border-line py-4 text-[15px] ${
                  pathname === item.href ? "text-brand-600" : "text-brand-700"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={phoneHref}
              className="mt-6 rounded-full bg-brand-600 px-5 py-3.5 text-center text-[15px] font-semibold text-white"
            >
              {labels.book}
            </a>
          </nav>
        </motion.div>
      )}
    </header>
  );
}
