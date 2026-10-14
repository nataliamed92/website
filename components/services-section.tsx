"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Plus } from "@phosphor-icons/react/dist/ssr";
import { images } from "@/lib/assets";
import type { Service } from "@/lib/content";

/**
 * Layout family: category switcher over an accordion.
 *
 * Twenty six conditions across five families is far too much for a bulleted
 * list, so the reader picks a family and sees only its contents, and each
 * condition opens for its description rather than showing it inline.
 *
 * Everything is nonetheless rendered into the document and merely hidden.
 * The obvious build — mounting only the active family, only the open panel —
 * leaves twenty five of the twenty six descriptions out of the HTML entirely,
 * so a crawler never sees them. Since these texts exist largely to be found,
 * that is the whole point lost. Hence: `hidden` on the inactive families,
 * an animated height on a panel that never unmounts.
 */
export default function ServicesSection({
  services,
  medicalNote,
  imageAlt,
  pediatricAlt,
}: {
  services: readonly Service[];
  medicalNote: string;
  imageAlt: string;
  pediatricAlt: string;
}) {
  const [active, setActive] = useState<string>(services[0].slug);
  const [open, setOpen] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const uid = useId();

  // Παιδο-ΩΡΛ gets its own photograph; every other family keeps the surgery one.
  const pediatric = active === "paido-orl";

  function switchFamily(slug: string) {
    setActive(slug);
    setOpen(null);
  }

  return (
    <section className="bg-paper-warm py-14 sm:py-28">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="flex flex-wrap gap-2.5">
          {services.map((s) => {
            const on = s.slug === active;
            return (
              <button
                key={s.slug}
                type="button"
                onClick={() => switchFamily(s.slug)}
                aria-pressed={on}
                className={`rounded-full border px-5 py-2.5 text-[14px] whitespace-nowrap transition-all duration-200 active:scale-[0.98] ${
                  on
                    ? "border-brand-600 bg-brand-600 font-semibold text-white"
                    : "border-line-strong text-brand-700 hover:border-brand-500 hover:text-brand-900"
                }`}
              >
                {s.title}
              </button>
            );
          })}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
          <div>
            {services.map((family) => {
              const showing = family.slug === active;
              return (
                <motion.div
                  key={family.slug}
                  hidden={!showing}
                  initial={false}
                  animate={
                    showing ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }
                  }
                  transition={
                    reduce
                      ? { duration: 0 }
                      : { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
                  }
                >
                  <p className="max-w-[48ch] text-[16px] leading-relaxed text-brand-700 sm:text-[17.5px]">
                    {family.lead}
                  </p>

                  <ul className="mt-9 border-t border-line">
                    {family.items.map((item, i) => {
                      const key = `${family.slug}/${item.name}`;
                      const isOpen = open === key;
                      const panelId = `${uid}-${family.slug}-${i}`;
                      return (
                        <li key={item.name} className="border-b border-line">
                          <button
                            type="button"
                            onClick={() => setOpen(isOpen ? null : key)}
                            aria-expanded={isOpen}
                            aria-controls={panelId}
                            className="flex w-full items-center justify-between gap-6 py-4 text-left text-[15.5px] text-brand-900 transition-colors duration-200 hover:text-brand-600"
                          >
                            <span>{item.name}</span>
                            <Plus
                              size={17}
                              weight="light"
                              aria-hidden
                              className={`shrink-0 text-brand-600 transition-transform duration-300 ${
                                isOpen ? "rotate-45" : ""
                              }`}
                            />
                          </button>

                          <motion.div
                            id={panelId}
                            initial={false}
                            animate={{
                              height: isOpen ? "auto" : 0,
                              opacity: isOpen ? 1 : 0,
                            }}
                            transition={
                              reduce
                                ? { duration: 0 }
                                : { duration: 0.34, ease: [0.16, 1, 0.3, 1] }
                            }
                            className="overflow-hidden"
                          >
                            <div className="max-w-[62ch] pt-1 pb-8">
                              <p className="text-[15px] leading-relaxed text-brand-700">
                                {item.what}
                              </p>

                              {item.list && (
                                <>
                                  <p className="mt-6 text-[11px] tracking-[0.16em] text-brand-600 uppercase">
                                    {item.list.label}
                                  </p>
                                  <ul className="mt-3 space-y-2">
                                    {item.list.items.map((line) => (
                                      <li
                                        key={line}
                                        className="flex gap-3 text-[14.5px] leading-relaxed text-brand-800"
                                      >
                                        <span
                                          aria-hidden
                                          className="mt-[0.62em] h-[3px] w-[3px] shrink-0 rounded-full bg-brand-600"
                                        />
                                        {line}
                                      </li>
                                    ))}
                                  </ul>
                                </>
                              )}

                              <p className="mt-6 text-[11px] tracking-[0.16em] text-brand-600 uppercase">
                                {item.close.label}
                              </p>
                              <p className="mt-3 text-[15px] leading-relaxed text-brand-700">
                                {item.close.body}
                              </p>
                            </div>
                          </motion.div>
                        </li>
                      );
                    })}
                  </ul>
                </motion.div>
              );
            })}

            <p className="mt-8 max-w-[62ch] text-[13px] leading-relaxed text-brand-600">
              {medicalNote}
            </p>
          </div>

          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-card lg:sticky lg:top-28 lg:aspect-[4/5] lg:self-start">
            <Image
              key={pediatric ? "pediatric" : "surgery"}
              src={pediatric ? images.pediatric : images.surgery}
              alt={pediatric ? pediatricAlt : imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 38vw"
              className={`object-cover ${pediatric ? "object-[center_30%]" : ""}`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
