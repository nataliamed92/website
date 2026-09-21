"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Plus } from "@phosphor-icons/react/dist/ssr";
import Reveal from "@/components/reveal";
import { facialSurgery, images, medicalNote } from "@/lib/content";

/**
 * Layout family: contained split. On the dark theme this ran the photograph
 * full bleed with the type laid over it. On white that inverts badly, so the
 * picture is now a held image and the list keeps the page's own ground.
 *
 * Each procedure keeps its one-line note visible and opens for the detail, the
 * same contract as the conditions list on /ypiresies.
 */
export default function FacialSection() {
  const [open, setOpen] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const uid = useId();

  return (
    <section className="bg-paper py-14 sm:py-28">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <Reveal>
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-card lg:sticky lg:top-28">
            <Image
              src={images.profile}
              alt="Μελέτη προσώπου σε πλάγιο φωτισμό"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-[45%_center]"
            />
          </div>
        </Reveal>

        <div>
          <ul className="border-t border-line">
            {facialSurgery.items.map((item, i) => {
              const isOpen = open === item.name;
              const panelId = `${uid}-${i}`;
              return (
                <Reveal key={item.name} delay={i * 0.08}>
                  <li className="border-b border-line">
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : item.name)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className="grid w-full grid-cols-1 gap-1.5 py-7 text-left sm:grid-cols-[minmax(0,14rem)_minmax(0,1fr)_auto] sm:items-baseline sm:gap-8 sm:py-8"
                    >
                      <span className="font-display text-[21px] leading-snug text-brand-900">
                        {item.name}
                      </span>
                      <span className="text-[15px] leading-relaxed text-brand-700">
                        {item.note}
                      </span>
                      <Plus
                        size={18}
                        weight="light"
                        aria-hidden
                        className={`hidden shrink-0 text-brand-600 transition-transform duration-300 sm:block ${
                          isOpen ? "rotate-45" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={panelId}
                          initial={reduce ? { opacity: 1 } : { height: 0, opacity: 0 }}
                          animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                          exit={reduce ? { opacity: 1 } : { height: 0, opacity: 0 }}
                          transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="max-w-[62ch] pb-9 sm:pl-[calc(14rem+2rem)]">
                            <p className="text-[15px] leading-relaxed text-brand-700">
                              {item.what}
                            </p>

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

                            <p className="mt-6 text-[11px] tracking-[0.16em] text-brand-600 uppercase">
                              {item.close.label}
                            </p>
                            <p className="mt-3 text-[15px] leading-relaxed text-brand-700">
                              {item.close.body}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                </Reveal>
              );
            })}
          </ul>

          <p className="mt-8 max-w-[62ch] text-[13px] leading-relaxed text-brand-600">
            {medicalNote}
          </p>
        </div>
      </div>
    </section>
  );
}
