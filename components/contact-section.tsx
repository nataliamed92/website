import Image from "next/image";
import { EnvelopeSimple, Phone } from "@phosphor-icons/react/dist/ssr";
import Reveal from "@/components/reveal";
import { brand, contact, images } from "@/lib/content";

/**
 * Layout family: full-width media with a single overlaid panel. This is the
 * last thing on the page, so it carries one action and nothing else.
 */
export default function ContactSection() {
  return (
    <section id="epikoinonia" className="relative scroll-mt-20 overflow-hidden bg-ink-950">
      <div className="absolute inset-0 z-0">
        <Image
          src={images.avenue}
          alt="Κεντρική λεωφόρος της Αθήνας το βράδυ, με φωτισμένα δέντρα και βρεγμένη άσφαλτο"
          fill
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-ink-950/70" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-5 py-28 sm:px-8 sm:py-36">
        <Reveal className="mx-auto max-w-[42rem] text-center">
          <div>
            <Image
              src={brand.mark}
              alt=""
              aria-hidden
              width={512}
              height={300}
              sizes="150px"
              className="mx-auto mb-9 h-auto w-[118px] opacity-90 sm:w-[150px]"
            />
            <h2 className="font-display text-[clamp(2.1rem,5vw,3.5rem)] leading-[1.08] font-normal text-bone">
              Κλείστε ραντεβού
            </h2>
            <p className="mx-auto mt-6 max-w-[42ch] text-[16px] leading-relaxed text-bone-dim sm:text-[17.5px]">
              Τηλεφωνικά ή με email, για ραντεβού στο ιατρείο στη Λεωφόρο
              Βασιλίσσης Σοφίας.
            </p>

            <div className="mt-11 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
              <a
                href={contact.phone.href}
                className="inline-flex items-center justify-center gap-2.5 rounded-full bg-sand-400 px-7 py-3.5 text-[15px] font-semibold whitespace-nowrap text-ink-950 transition-all duration-200 hover:bg-sand-300 active:translate-y-[1px]"
              >
                <Phone size={18} weight="light" />
                {contact.phone.display}
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center justify-center gap-2.5 rounded-full border border-ink-700 px-7 py-3.5 text-[15px] font-medium whitespace-nowrap text-bone transition-colors duration-200 hover:border-sand-500 hover:text-sand-300"
              >
                <EnvelopeSimple size={18} weight="light" />
                Email
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
