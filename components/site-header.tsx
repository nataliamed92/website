"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { List, X } from "@phosphor-icons/react";
import { brand, contact, doctor } from "@/lib/content";

const nav = [
  { label: "Η ιατρός", href: "#iatros" },
  { label: "Υπηρεσίες", href: "#ypiresies" },
  { label: "Πρόσωπο", href: "#prosopo" },
  { label: "Ιατρείο", href: "#iatreio" },
];

export default function SiteHeader() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  // Feedback: the bar earns a surface only once it leaves the hero.
  useMotionValueEvent(scrollY, "change", (v) => setSolid(v > 80));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid
          ? "border-b border-ink-800 bg-ink-950/85 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-[68px] max-w-[1400px] items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          aria-label={doctor.fullName}
          className="flex items-center gap-2.5 sm:gap-3.5"
        >
          <Image
            src={brand.markSmall}
            alt=""
            aria-hidden
            width={234}
            height={320}
            priority
            className="h-[34px] w-auto sm:h-[40px]"
          />
          <span className="text-[12.5px] leading-none font-light tracking-[0.24em] text-bone uppercase sm:text-[15px] sm:tracking-[0.3em]">
            {doctor.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[13.5px] text-bone-dim transition-colors hover:text-sand-300"
            >
              {item.label}
            </a>
          ))}
          <a
            href={contact.phone.href}
            className="rounded-full bg-sand-400 px-5 py-2.5 text-[13.5px] font-semibold text-ink-950 whitespace-nowrap transition-transform duration-200 hover:bg-sand-300 active:scale-[0.98]"
          >
            Κλείστε ραντεβού
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Κλείσιμο μενού" : "Άνοιγμα μενού"}
          className="text-bone lg:hidden"
        >
          {open ? <X size={24} weight="light" /> : <List size={24} weight="light" />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="border-t border-ink-800 bg-ink-950/95 px-5 pt-4 pb-7 backdrop-blur-xl lg:hidden"
        >
          <nav className="flex flex-col">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-ink-850 py-4 text-[15px] text-bone-dim"
              >
                {item.label}
              </a>
            ))}
            <a
              href={contact.phone.href}
              className="mt-6 rounded-full bg-sand-400 px-5 py-3.5 text-center text-[15px] font-semibold text-ink-950"
            >
              Κλείστε ραντεβού
            </a>
          </nav>
        </motion.div>
      )}
    </header>
  );
}
