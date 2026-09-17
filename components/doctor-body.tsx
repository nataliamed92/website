import Image from "next/image";
import Reveal from "@/components/reveal";
import { credentials, images } from "@/lib/content";

/**
 * Layout family: sticky split. The portrait detail holds the left column while
 * the training record scrolls past it on the right.
 */
export default function DoctorBody() {
  return (
    <section className="bg-paper pb-16 sm:pb-32">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-14 px-5 sm:px-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-card">
              <Image
                src={images.coat}
                alt="Χέρια χειρουργού με λευκή ιατρική μπλούζα και χειρουργικές μεγεθυντικές λούπες σε σκούρο τραπέζι"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>

        <div>
          <Reveal>
            <h2 className="font-display text-[clamp(1.6rem,3vw,2.1rem)] leading-snug font-normal text-brand-900">
              Εκπαίδευση και εξειδικεύσεις
            </h2>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-card bg-line sm:grid-cols-2">
            {credentials.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.07}>
                <div className="h-full bg-paper-warm p-7">
                  <h3 className="font-display text-[19px] leading-snug text-brand-900">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-[13px] tracking-[0.06em] text-brand-600 uppercase">
                    {c.place}
                  </p>
                  <p className="mt-4 text-[14.5px] leading-relaxed text-brand-600">
                    {c.note}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
