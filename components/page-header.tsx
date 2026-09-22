import Reveal from "@/components/reveal";

/**
 * The opening block of every page except the home page. It carries the whole
 * title, so page bodies never repeat it in a heading of their own.
 */
export default function PageHeader({
  eyebrow,
  title,
  titleNote,
  lead,
}: {
  eyebrow?: string;
  title: string;
  /** Set below the title, in its own case. Degrees must not be uppercased. */
  titleNote?: string;
  lead?: string;
}) {
  return (
    <section className="bg-paper pt-32 pb-10 sm:pt-44 sm:pb-20">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <Reveal>
          {eyebrow ? (
            <p className="mb-5 text-[11px] tracking-[0.2em] text-brand-600 uppercase">
              {eyebrow}
            </p>
          ) : null}
          {/* Deliberately NOT `font-display`: the client asked the page title
              to read as the logo does, which is the body face in caps with
              wide tracking. Caps run much wider than lowercase, so the size
              steps down AND the tracking nearly closes on a phone: a single
              long Greek word («ΩΤΟΡΙΝΟΛΑΡΥΓΓΟΛΟΓΙΑ») otherwise runs past the
              right edge, and it is clipped rather than scrolled, so no
              overflow check catches it. `break-words` is the last resort. */}
          <h1 className="max-w-[24ch] text-[clamp(1.5rem,4.4vw,3rem)] leading-[1.3] font-light tracking-[0.04em] break-words hyphens-auto text-brand-900 uppercase sm:leading-[1.25] sm:tracking-[0.13em]">
            {title}
          </h1>
          {titleNote ? (
            <p className="mt-4 text-[15px] tracking-[0.02em] text-brand-600">
              {titleNote}
            </p>
          ) : null}
          {lead ? (
            <p className="mt-7 max-w-[52ch] text-[16px] leading-relaxed text-brand-700 sm:text-[18px]">
              {lead}
            </p>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}
