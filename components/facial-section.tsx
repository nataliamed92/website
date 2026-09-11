import Image from "next/image";
import Reveal from "@/components/reveal";
import { facialSurgery, images } from "@/lib/content";

/**
 * Layout family: full-bleed editorial. The profile runs the height of the
 * section and the four procedures are set against it as plain type, no cards.
 */
export default function FacialSection() {
  return (
    <section className="relative overflow-hidden bg-ink-950">
      <div className="absolute inset-0 z-0">
        <Image
          src={images.profile}
          alt="Μελέτη προσώπου σε πλάγιο φωτισμό, σε μαύρο φόντο"
          fill
          sizes="100vw"
          className="object-cover object-[30%_top] opacity-45 lg:object-[22%_center] lg:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/80 to-ink-950/70 lg:bg-gradient-to-l lg:from-ink-950 lg:via-ink-950/90 lg:to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32">
        <div className="lg:ml-auto lg:w-[58%]">
          <dl className="border-t border-ink-800/80">
            {facialSurgery.items.map((item, i) => (
              <Reveal key={item.name} delay={i * 0.08}>
                <div className="grid grid-cols-1 gap-1.5 border-b border-ink-800/80 py-6 sm:grid-cols-[minmax(0,13rem)_minmax(0,1fr)] sm:gap-8 sm:py-7">
                  <dt className="font-display text-[21px] leading-snug text-sand-300">
                    {item.name}
                  </dt>
                  <dd className="text-[15px] leading-relaxed text-bone-dim">
                    {item.note}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
