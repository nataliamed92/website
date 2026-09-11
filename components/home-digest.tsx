import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, MapPin } from "@phosphor-icons/react/dist/ssr";
import Reveal from "@/components/reveal";
import {
  contact,
  doctor,
  facialSurgery,
  hours,
  images,
  services,
} from "@/lib/content";

/**
 * The home page is a digest, not a copy of the site. Each block says just
 * enough to place the practice and then hands off to the page that holds the
 * full content, so nothing is written twice.
 */
export default function HomeDigest() {
  return (
    <>
      {/* Layout family: sticky split. */}
      <section className="bg-ink-950 py-16 sm:py-32">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-14 px-5 sm:px-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-center lg:gap-20">
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

          <Reveal delay={0.08}>
            <p className="text-[11px] tracking-[0.2em] text-sand-500 uppercase">
              Η ιατρός
            </p>
            <h2 className="mt-5 font-display text-[clamp(2rem,4.6vw,3.25rem)] leading-[1.1] font-normal text-bone">
              {doctor.fullName}
            </h2>
            <p className="mt-6 max-w-[48ch] text-[15.5px] leading-relaxed text-bone-dim sm:text-[16.5px]">
              {doctor.bio}
            </p>
            <Link
              href="/iatros"
              className="group mt-7 inline-flex min-h-11 items-center gap-2.5 py-2 text-[14.5px] font-medium text-sand-300"
            >
              Εκπαίδευση και εξειδικεύσεις
              <ArrowRight
                size={17}
                weight="light"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Layout family: two-card split, the two halves of the practice. */}
      <section className="bg-ink-900 py-14 sm:py-28">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Reveal>
              <Link
                href="/ypiresies"
                className="group flex h-full flex-col overflow-hidden rounded-card bg-ink-950 transition-colors duration-300 hover:bg-ink-850"
              >
                <div className="relative h-56 w-full sm:h-72">
                  <Image
                    src={images.instruments}
                    alt="Διαγνωστικά ωτορινολαρυγγολογικά εργαλεία σε σκούρα επιφάνεια"
                    fill
                    sizes="(max-width: 768px) 100vw, 48vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-8 sm:p-10">
                  <h2 className="font-display text-[clamp(1.6rem,3vw,2.2rem)] leading-tight font-normal text-bone">
                    Υπηρεσίες ΩΡΛ
                  </h2>
                  <p className="mt-4 text-[15.5px] leading-relaxed text-bone-dim">
                    Μύτη, αυτί, λαιμός και τράχηλος, παιδο-ΩΡΛ, με τον διαγνωστικό
                    έλεγχο να ολοκληρώνεται στο ιατρείο.
                  </p>
                  <p className="mt-6 text-[13.5px] text-bone-mute">
                    {services.map((s) => s.title).join(" · ")}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-2.5 pt-8 text-[14.5px] font-medium text-sand-300">
                    Δείτε τις υπηρεσίες
                    <ArrowRight
                      size={17}
                      weight="light"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            </Reveal>

            <Reveal delay={0.08}>
              <Link
                href="/prosopo"
                className="group flex h-full flex-col overflow-hidden rounded-card bg-ink-950 transition-colors duration-300 hover:bg-ink-850"
              >
                <div className="relative h-56 w-full sm:h-72">
                  <Image
                    src={images.profile}
                    alt="Μελέτη προσώπου σε πλάγιο φωτισμό, σε μαύρο φόντο"
                    fill
                    sizes="(max-width: 768px) 100vw, 48vw"
                    className="object-cover object-[50%_25%]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-8 sm:p-10">
                  <h2 className="font-display text-[clamp(1.6rem,3vw,2.2rem)] leading-tight font-normal text-bone">
                    {facialSurgery.title}
                  </h2>
                  <p className="mt-4 text-[15.5px] leading-relaxed text-bone-dim">
                    {facialSurgery.lead}
                  </p>
                  <p className="mt-6 text-[13.5px] text-bone-mute">
                    {facialSurgery.items.map((i) => i.name).join(" · ")}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-2.5 pt-8 text-[14.5px] font-medium text-sand-300">
                    Δείτε τις επεμβάσεις
                    <ArrowRight
                      size={17}
                      weight="light"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Layout family: full-width media with an overlaid detail strip. */}
      <section className="relative overflow-hidden bg-ink-950">
        <div className="absolute inset-0 z-0">
          <Image
            src={images.room}
            alt="Ήσυχος χώρος εξέτασης με φυσικό φως, μια πολυθρόνα και ξύλινο τραπεζάκι"
            fill
            sizes="100vw"
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/75 to-ink-950/60" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-32">
          <Reveal>
            <h2 className="font-display text-[clamp(2rem,4.6vw,3.25rem)] leading-[1.1] font-normal text-bone">
              Το ιατρείο
            </h2>
            <dl className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-16">
              <div>
                <dt className="flex items-center gap-2.5 text-[13px] tracking-[0.14em] text-sand-400 uppercase">
                  <MapPin size={16} weight="light" />
                  Διεύθυνση
                </dt>
                <dd className="mt-4 text-[16px] leading-relaxed text-bone">
                  {contact.address.street}
                  <br />
                  {contact.address.area}, {contact.address.city}
                </dd>
              </div>
              <div>
                <dt className="flex items-center gap-2.5 text-[13px] tracking-[0.14em] text-sand-400 uppercase">
                  <Clock size={16} weight="light" />
                  Ωράριο
                </dt>
                <dd className="mt-4 space-y-2">
                  {hours.map((h) => (
                    <div
                      key={h.day}
                      className="flex max-w-[18rem] items-baseline justify-between gap-6 text-[15px]"
                    >
                      <span className="text-bone-dim">{h.day}</span>
                      <span className="text-bone tabular-nums">{h.slots[0]}</span>
                    </div>
                  ))}
                </dd>
              </div>
            </dl>
            <Link
              href="/iatreio"
              className="group mt-10 inline-flex min-h-11 items-center gap-2.5 py-2 text-[14.5px] font-medium text-sand-300"
            >
              Δείτε τον χώρο
              <ArrowRight
                size={17}
                weight="light"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
