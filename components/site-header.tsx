"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { List, X } from "@phosphor-icons/react";
import { brand, contact, doctor, nav } from "@/lib/content";

export default function SiteHeader() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  // Feedback: the bar earns a surface only once it leaves the hero.
  useMotionValueEvent(scrollY, "change", (v) => setSolid(v > 90));

  // Only the home page opens on a full-bleed hero the bar can float over.
  const overHero = pathname === "/" && !solid;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        overHero
          ? "border-b border-transparent"
          : "border-b border-line bg-paper/85 backdrop-blur-xl"
      }`}
    >
      <div className="mx-auto flex h-[76px] max-w-[1400px] items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          aria-label={doctor.fullName}
          className="-my-2 flex min-h-11 items-center gap-2.5 py-2 sm:gap-3.5"
        >
          <Image
            src={brand.markSmall}
            alt=""
            aria-hidden
            width={76}
            height={156}
            priority
            className="h-[44px] w-auto sm:h-[52px]"
          />
          <span className="text-[12.5px] leading-none font-light tracking-[0.24em] text-brand-900 uppercase sm:text-[15px] sm:tracking-[0.3em]">
            {doctor.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              className={`text-[13.5px] transition-colors hover:text-brand-800 ${
                pathname === item.href ? "text-brand-600" : "text-brand-700"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={contact.phone.href}
            className="rounded-full bg-brand-600 px-5 py-2.5 text-[13.5px] font-semibold text-white whitespace-nowrap transition-transform duration-200 hover:bg-brand-700 active:scale-[0.98]"
          >
            Κλείστε ραντεβού
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Κλείσιμο μενού" : "Άνοιγμα μενού"}
          className="-mr-2.5 flex h-11 w-11 items-center justify-center text-brand-900 lg:hidden"
        >
          {open ? <X size={24} weight="light" /> : <List size={24} weight="light" />}
        </button>
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
              href={contact.phone.href}
              className="mt-6 rounded-full bg-brand-600 px-5 py-3.5 text-center text-[15px] font-semibold text-white"
            >
              Κλείστε ραντεβού
            </a>
          </nav>
        </motion.div>
      )}
    </header>
  );
}
