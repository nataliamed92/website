import Image from "next/image";
import { EnvelopeSimple, Phone } from "@phosphor-icons/react/dist/ssr";
import Reveal from "@/components/reveal";
import { brand, contact } from "@/lib/content";

/**
 * Layout family: centred close. On a white page the mark carries this on its
 * own; the night photograph that used to sit behind it belonged to the dark
 * theme and only muddied the type here.
 *
 * `data-dock-hide` keeps the floating phone button off this block: the number
 * is already a button here.
 */
export default function ClosingCta() {
  return (
    <section data-dock-hide className="border-t border-line bg-paper-warm">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-36">
        <Reveal className="mx-auto max-w-[42rem] text-center">
          <div>
            <Image
              src={brand.mark}
              alt=""
              aria-hidden
              width={556}
              height={594}
              sizes="110px"
              className="mx-auto mb-9 h-auto w-[92px] sm:w-[110px]"
            />
            <h2 className="font-display text-[clamp(2.1rem,5vw,3.5rem)] leading-[1.08] font-normal text-brand-900">
              Κλείστε ραντεβού
            </h2>
            <p className="mx-auto mt-6 max-w-[42ch] text-[16px] leading-relaxed text-brand-700 sm:text-[17.5px]">
              Τηλεφωνικά ή με email, για ραντεβού στο ιατρείο στη Λεωφόρο
              Βασιλίσσης Σοφίας.
            </p>

            <div className="mt-11 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
              <a
                href={contact.phone.href}
                className="inline-flex items-center justify-center gap-2.5 rounded-full bg-brand-600 px-7 py-3.5 text-[15px] font-semibold whitespace-nowrap text-white transition-all duration-200 hover:bg-brand-700 active:translate-y-[1px]"
              >
                <Phone size={18} weight="light" />
                {contact.phone.display}
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center justify-center gap-2.5 rounded-full border border-line-strong px-7 py-3.5 text-[15px] font-medium whitespace-nowrap text-brand-800 transition-colors duration-200 hover:border-brand-500 hover:text-brand-900"
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
