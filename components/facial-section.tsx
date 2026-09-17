import Image from "next/image";
import Reveal from "@/components/reveal";
import { facialSurgery, images } from "@/lib/content";

/**
 * Layout family: contained split. On the dark theme this ran the photograph
 * full bleed with the type laid over it. On white that inverts badly, so the
 * picture is now a held image and the list keeps the page's own ground.
 */
export default function FacialSection() {
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

        <dl className="border-t border-line">
          {facialSurgery.items.map((item, i) => (
            <Reveal key={item.name} delay={i * 0.08}>
              <div className="grid grid-cols-1 gap-1.5 border-b border-line py-7 sm:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] sm:gap-8 sm:py-8">
                <dt className="font-display text-[21px] leading-snug text-brand-900">
                  {item.name}
                </dt>
                <dd className="text-[15px] leading-relaxed text-brand-700">
                  {item.note}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
