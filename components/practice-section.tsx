import Image from "next/image";
import { Clock, MapPin } from "@phosphor-icons/react/dist/ssr";
import Reveal from "@/components/reveal";
import { contact, hours, images } from "@/lib/content";

/**
 * Layout family: bento. Three cells for three facts, and the cell sizes follow
 * how much each one has to say.
 */
export default function PracticeSection() {
  return (
    <section className="bg-paper-warm py-14 sm:py-28">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:grid-rows-2">
          <Reveal className="lg:col-span-2 lg:row-span-2">
            <div className="relative h-64 w-full overflow-hidden rounded-card sm:h-96 lg:h-full lg:min-h-[30rem]">
              <Image
                src={images.room}
                alt="Ήσυχος χώρος εξέτασης με φυσικό φως, μια πολυθρόνα και ξύλινο τραπεζάκι"
                fill
                sizes="(max-width: 1024px) 100vw, 62vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="flex h-full flex-col rounded-card bg-paper-card p-8">
              <Clock size={22} weight="light" className="text-brand-600" />
              <h3 className="mt-5 font-display text-[22px] text-brand-900">Ωράριο</h3>
              <ul className="mt-6 space-y-3.5">
                {hours.map((h) => (
                  <li
                    key={h.day}
                    className="flex items-baseline justify-between gap-4 text-[15px]"
                  >
                    <span className="text-brand-700">{h.day}</span>
                    <span className="text-brand-900 tabular-nums">{h.slots[0]}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-auto pt-8 text-[13.5px] leading-relaxed text-brand-600">
                Κάθε ραντεβού κρατά {contact.appointmentMinutes} λεπτά.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="flex h-full flex-col rounded-card bg-paper-card p-8">
              <MapPin size={22} weight="light" className="text-brand-600" />
              <h3 className="mt-5 font-display text-[22px] text-brand-900">Διεύθυνση</h3>
              <p className="mt-6 text-[15.5px] leading-relaxed text-brand-700">
                {contact.address.street}
                <br />
                {contact.address.area}, {contact.address.city}
              </p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  contact.address.mapsQuery,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto pt-8 text-[14px] font-medium text-brand-600 underline-offset-4 hover:underline"
              >
                Άνοιγμα στους χάρτες
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
