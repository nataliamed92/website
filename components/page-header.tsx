import Reveal from "@/components/reveal";

/**
 * The opening block of every page except the home page. It carries the whole
 * title, so page bodies never repeat it in a heading of their own.
 */
export default function PageHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow?: string;
  title: string;
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
          <h1 className="max-w-[20ch] font-display text-[clamp(2.4rem,6vw,4.25rem)] leading-[1.05] font-normal text-brand-900">
            {title}
          </h1>
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
