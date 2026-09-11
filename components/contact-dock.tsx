"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { Phone } from "@phosphor-icons/react";
import { contact } from "@/lib/content";

/**
 * Phone is the only booking channel the practice gave, so it stays one tap away
 * on a phone. It hides in two places:
 *
 *  - over the hero, where it would sit on the secondary call to action;
 *  - over any block marked `data-dock-hide`, which is every section that already
 *    carries the phone number. Floating on top of a real button is worse than
 *    not being there.
 */
export default function ContactDock() {
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
      href={contact.phone.href}
      aria-label={`Τηλεφωνήστε στο ${contact.phone.display}`}
      aria-hidden={!shown}
      tabIndex={shown ? 0 : -1}
      className={`fixed right-5 bottom-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-sand-400 text-ink-950 shadow-[0_10px_40px_rgba(0,0,0,0.55)] transition-all duration-300 active:scale-[0.96] lg:hidden ${
        shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <Phone size={22} weight="fill" />
    </a>
  );
}
