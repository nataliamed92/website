"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { Phone } from "@phosphor-icons/react";

/**
 * Phone is the only booking channel the practice gave, so it stays one tap away
 * on a phone. It hides in two places:
 *
 *  - over the hero, where it would sit on the secondary call to action;
 *  - over any block marked `data-dock-hide`, which is every section that already
 *    carries the phone number. Floating on top of a real button is worse than
 *    not being there.
 */
export default function ContactDock({
  phoneHref,
  label,
}: {
  phoneHref: string;
  label: string;
}) {
  const [pastHero, setPastHero] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    setPastHero(v > window.innerHeight * 0.9);
  });

  useEffect(() => {
    const targets = Array.from(document.querySelectorAll("[data-dock-hide]"));
    if (!targets.length) return;

    const visible = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      }
      setBlocked(visible.size > 0);
    });

    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [pathname]);

  const shown = pastHero && !blocked;

  return (
    <a
      href={phoneHref}
      aria-label={label}
      aria-hidden={!shown}
      tabIndex={shown ? 0 : -1}
      className={`fixed right-5 bottom-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-brand-600 text-white shadow-[0_12px_32px_-8px_rgba(55,37,18,0.45)] transition-all duration-300 active:scale-[0.96] lg:hidden ${
        shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <Phone size={22} weight="fill" />
    </a>
  );
}
