"use client";

import { useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { Phone } from "@phosphor-icons/react";
import { contact } from "@/lib/content";

/**
 * Phone is the only booking channel the practice gave, so it stays reachable.
 * It appears only past the hero: inside the hero it would sit on top of the
 * secondary call to action.
 */
export default function ContactDock() {
  const [shown, setShown] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    setShown(v > window.innerHeight * 0.9);
  });

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
