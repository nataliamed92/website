"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { images, services } from "@/lib/content";

/**
 * Layout family: interactive category switcher.
 *
 * Twenty six conditions across five families is far too much for a bulleted
 * list, so the reader picks a family and sees only its contents. Motion here is
 * feedback: the list confirms the switch happened.
 */
export default function ServicesSection() {
  const [active, setActive] = useState(services[0].slug);
  const reduce = useReducedMotion();
  const current = services.find((s) => s.slug === active) ?? services[0];

  return (
    <section id="ypiresies" className="scroll-mt-20 bg-ink-900 py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <h2 className="max-w-[18ch] font-display text-[clamp(2rem,4.6vw,3.25rem)] leading-[1.1] font-normal text-bone">
          Ωτορινολαρυγγολογία, από τη διάγνωση ως τη θεραπεία
        </h2>

        <div className="mt-12 flex flex-wrap gap-2.5">
          {services.map((s) => {
            const on = s.slug === active;
            return (
              <button
                key={s.slug}
                type="button"
                onClick={() => setActive(s.slug)}
                aria-pressed={on}
                className={`rounded-full border px-5 py-2.5 text-[14px] whitespace-nowrap transition-all duration-200 active:scale-[0.98] ${
                  on
                    ? "border-sand-400 bg-sand-400 font-semibold text-ink-950"
                    : "border-ink-700 text-bone-dim hover:border-sand-600 hover:text-bone"
                }`}
              >
                {s.title}
              </button>
            );
          })}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
          <div className="min-h-[22rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.slug}
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="max-w-[48ch] text-[16px] leading-relaxed text-bone-dim sm:text-[17.5px]">
                  {current.lead}
                </p>

                <ul className="mt-9 grid grid-cols-1 gap-x-10 gap-y-0 sm:grid-cols-2">
                  {current.items.map((item, i) => (
                    <motion.li
                      key={item}
                      initial={reduce ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.05 + i * 0.035,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="border-b border-ink-800 py-4 text-[15.5px] text-bone"
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-card lg:aspect-auto lg:min-h-[26rem]">
            <Image
              src={images.instruments}
              alt="Διαγνωστικά ωτορινολαρυγγολογικά εργαλεία σε σκούρα επιφάνεια"
              fill
              sizes="(max-width: 1024px) 100vw, 38vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
