"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { contact, doctor, video } from "@/lib/content";

/**
 * Asymmetric hero. The backdrop is the logo drawing itself on a black frame,
 * held right of centre so the headline keeps the left. Nothing else is in the
 * shot: the mark is the whole image.
 *
 * Motion: the frame drifts a little slower than the page on scroll, which marks
 * the hero as a layer the reader is leaving. The film itself loops on black.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [portrait, setPortrait] = useState<boolean | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0.25]);

  // Two cuts of the same film. Only the one that fits the viewport is mounted,
  // so a phone never downloads the landscape master.
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const apply = () => setPortrait(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const src = portrait ? video.heroPortrait : video.heroLandscape;

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100dvh] items-end overflow-hidden bg-paper pb-16 sm:pb-20 lg:items-center lg:pb-0"
    >
      <motion.div
        style={reduce ? undefined : { y, opacity: fade }}
        className="absolute inset-0 z-0"
      >
        {reduce || portrait === null ? (
          <Image
            src={video.poster}
            alt=""
            aria-hidden
            fill
            priority
            sizes="100vw"
            className="object-cover object-[62%_center]"
          />
        ) : (
          <video
            key={src}
            src={src}
            poster={video.poster}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden
            className="h-full w-full object-cover object-[62%_center]"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-paper via-paper/55 to-transparent lg:via-paper/25" />
        <div className="absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-paper via-paper/75 to-transparent lg:h-52 lg:via-transparent" />
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 pt-24 sm:px-8">
        <div className="max-w-[46rem]">
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(2.9rem,8.2vw,6rem)] leading-[1.02] font-normal tracking-[-0.015em] text-brand-900"
          >
            {doctor.name}
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-[34rem] text-[15.5px] leading-relaxed text-brand-700 sm:text-[17px]"
          >
            <span className="text-brand-900">
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
              className="rounded-full bg-brand-600 px-7 py-3.5 text-center text-[15px] font-semibold whitespace-nowrap text-white transition-all duration-200 hover:bg-brand-700 active:translate-y-[1px]"
            >
              Κλείστε ραντεβού
            </a>
            <a
              href="#ypiresies"
              className="rounded-full border border-line-strong px-7 py-3.5 text-center text-[15px] font-medium whitespace-nowrap text-brand-900 transition-colors duration-200 hover:border-brand-500 hover:text-brand-800"
            >
              Οι υπηρεσίες
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
