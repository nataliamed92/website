"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { contact, doctor, images } from "@/lib/content";

/**
 * Asymmetric hero. The marble profile occupies the right of the frame and the
 * copy sits in the empty black of the left, so no scrim is needed over type.
 *
 * Motion: the stone drifts a little slower than the page on scroll. It gives
 * the opening depth and marks the hero as a layer the reader is leaving.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0.25]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100dvh] items-end overflow-hidden bg-ink-950 pb-16 sm:pb-20 lg:items-center lg:pb-0"
    >
      <motion.div
        style={reduce ? undefined : { y, opacity: fade }}
        className="absolute inset-0 z-0"
      >
        <Image
          src={images.hero}
          alt="Λεπτομέρεια αρχαίου ελληνικού μαρμάρινου προσώπου σε πλάγια όψη, φωτισμένη σε σκοτεινό φόντο"
          fill
          priority
          sizes="100vw"
          className="scale-105 object-cover object-[60%_72%] lg:object-[70%_center]"
        />
        {/* Two scrims: one horizontal for the copy, one at the foot for the
            handoff into the next section. */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/70 to-transparent lg:via-ink-950/60" />
        <div className="absolute inset-x-0 bottom-0 h-[68%] bg-gradient-to-t from-ink-950 via-ink-950/85 to-transparent lg:h-56 lg:via-transparent" />
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 pt-24 sm:px-8">
        <div className="max-w-[46rem]">
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(2.9rem,8.2vw,6rem)] leading-[1.02] font-normal tracking-[-0.015em] text-bone"
          >
            {doctor.name}
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-[34rem] text-[15.5px] leading-relaxed text-bone-dim sm:text-[17px]"
          >
            <span className="text-bone">
              {doctor.specialty}, {doctor.subSpecialty}.
            </span>{" "}
            {doctor.tagline}.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
          >
            <a
              href={contact.phone.href}
              className="rounded-full bg-sand-400 px-7 py-3.5 text-center text-[15px] font-semibold whitespace-nowrap text-ink-950 transition-all duration-200 hover:bg-sand-300 active:translate-y-[1px]"
            >
              Κλείστε ραντεβού
            </a>
            <a
              href="#ypiresies"
              className="rounded-full border border-ink-700 px-7 py-3.5 text-center text-[15px] font-medium whitespace-nowrap text-bone transition-colors duration-200 hover:border-sand-500 hover:text-sand-300"
            >
              Οι υπηρεσίες
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
