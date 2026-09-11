import type { Metadata } from "next";
import Image from "next/image";
import {
  Clock,
  EnvelopeSimple,
  InstagramLogo,
  MapPin,
  Phone,
  TiktokLogo,
} from "@phosphor-icons/react/dist/ssr";
import PageHeader from "@/components/page-header";
import Reveal from "@/components/reveal";
import { contact, hours, images, social } from "@/lib/content";

export const metadata: Metadata = {
  title: "Επικοινωνία",
  description: `Ραντεβού στο ${contact.phone.display} ή στο ${contact.email}. ${contact.address.street}, ${contact.address.area}, Αθήνα.`,
  alternates: { canonical: "/epikoinonia" },
};

const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  contact.address.mapsQuery,
)}`;

const socialIcon = {
  Instagram: InstagramLogo,
  TikTok: TiktokLogo,
} as const;

export default function Page() {
  return (
    <>
      <PageHeader
        eyebrow="Επικοινωνία"
        title="Κλείστε ραντεβού"
        lead="Τα ραντεβού κλείνονται τηλεφωνικά ή με email. Θα χρειαστεί να γνωρίζουμε τον λόγο της επίσκεψης, ώστε να προγραμματιστεί ο σωστός χρόνος."
      />

      {/* Layout family: two priority actions above a quiet detail column. */}
      <section className="bg-ink-950 pb-14 sm:pb-28">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Reveal>
              <a
                href={contact.phone.href}
                className="flex h-full flex-col justify-between gap-10 rounded-card bg-sand-400 p-8 text-ink-950 transition-colors duration-200 hover:bg-sand-300 sm:p-10"
              >
                <Phone size={24} weight="light" />
                <div>
                  <p className="text-[13px] font-semibold tracking-[0.14em] uppercase opacity-70">
                    Τηλέφωνο
                  </p>
                  <p className="mt-2 font-display text-[clamp(1.8rem,4vw,2.6rem)] leading-none">
                    {contact.phone.display}
                  </p>
                </div>
              </a>
            </Reveal>

            <Reveal delay={0.08}>
              <a
                href={`mailto:${contact.email}`}
                className="flex h-full flex-col justify-between gap-10 rounded-card border border-ink-800 bg-ink-900 p-8 transition-colors duration-200 hover:border-sand-600 sm:p-10"
              >
                <EnvelopeSimple size={24} weight="light" className="text-sand-400" />
                <div>
                  <p className="text-[13px] font-semibold tracking-[0.14em] text-bone-mute uppercase">
                    Email
                  </p>
                  <p className="mt-2 font-display text-[clamp(1.3rem,2.6vw,1.9rem)] leading-tight break-all text-bone">
                    {contact.email}
                  </p>
                </div>
              </a>
            </Reveal>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
            <Reveal>
              <div className="flex h-full flex-col rounded-card bg-ink-900 p-8">
                <MapPin size={22} weight="light" className="text-sand-400" />
                <h2 className="mt-5 font-display text-[22px] text-bone">Διεύθυνση</h2>
                <p className="mt-5 text-[15.5px] leading-relaxed text-bone-dim">
                  {contact.address.street}
                  <br />
                  {contact.address.area}, {contact.address.city}
                </p>
                <a
                  href={mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto pt-8 text-[14px] font-medium text-sand-300 underline-offset-4 hover:underline"
                >
                  Άνοιγμα στους χάρτες
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="flex h-full flex-col rounded-card bg-ink-900 p-8">
                <Clock size={22} weight="light" className="text-sand-400" />
                <h2 className="mt-5 font-display text-[22px] text-bone">Ωράριο</h2>
                <ul className="mt-5 space-y-3.5">
                  {hours.map((h) => (
                    <li
                      key={h.day}
                      className="flex items-baseline justify-between gap-4 text-[15px]"
                    >
                      <span className="text-bone-dim">{h.day}</span>
                      <span className="text-bone tabular-nums">{h.slots[0]}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-auto pt-8 text-[13.5px] leading-relaxed text-bone-mute">
                  Κάθε ραντεβού κρατά {contact.appointmentMinutes} λεπτά.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="flex h-full flex-col rounded-card bg-ink-900 p-8">
                <h2 className="font-display text-[22px] text-bone">Στα social</h2>
                <ul className="mt-4 space-y-1">
                  {social.map((s) => {
                    const Icon = socialIcon[s.label as keyof typeof socialIcon];
                    return (
                      <li key={s.label}>
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex min-h-11 items-center gap-3 py-1.5 text-[15px] text-bone-dim transition-colors hover:text-sand-300"
                        >
                          <Icon size={20} weight="light" />
                          {s.handle}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative h-[38vh] min-h-[16rem] w-full overflow-hidden">
        <Image
          src={images.avenue}
          alt="Κεντρική λεωφόρος της Αθήνας το βράδυ, με φωτισμένα δέντρα και βρεγμένη άσφαλτο"
          fill
          sizes="100vw"
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-ink-950/70" />
      </section>
    </>
  );
}
