import Reveal from "@/components/reveal";
import { international, publications } from "@/lib/content";

/**
 * Layout family: two stacked records, each a plain dated list.
 *
 * Added 2026-09-22 when the doctor asked for her publications and her work
 * abroad to appear. Both are bare facts from her CV and want no decoration —
 * a reader scanning for a congress or a paper is scanning, not reading, so the
 * year holds the left edge and the title carries the line.
 */
export default function AcademicRecord() {
  return (
    <>
      <section className="bg-paper-warm py-14 sm:py-28">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <Reveal>
            <h2 className="font-display text-[clamp(1.6rem,3vw,2.1rem)] leading-snug font-normal text-brand-900">
              Διεθνής δραστηριότητα
            </h2>
            <p className="mt-4 max-w-[52ch] text-[15.5px] leading-relaxed text-brand-700">
              Μετεκπαιδεύσεις, συνέδρια και συνεργασίες με κέντρα του εξωτερικού.
            </p>
          </Reveal>

          <ul className="mt-11 border-t border-line">
            {international.map((item, i) => (
              <Reveal key={`${item.year}-${item.title}`} delay={i * 0.05}>
                <li className="grid grid-cols-1 gap-2 border-b border-line py-7 sm:grid-cols-[minmax(0,10rem)_minmax(0,1fr)] sm:gap-10">
                  <p className="text-[13px] tracking-[0.1em] text-brand-600 uppercase sm:pt-1">
                    {item.year}
                  </p>
                  <div>
                    <h3 className="font-display text-[19px] leading-snug text-brand-900">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-[14.5px] leading-relaxed text-brand-700">
                      {item.place}
                    </p>
                    {item.note ? (
                      <p className="mt-3 max-w-[58ch] text-[14.5px] leading-relaxed text-brand-600">
                        {item.note}
                      </p>
                    ) : null}
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-paper py-14 sm:py-28">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <Reveal>
            <h2 className="font-display text-[clamp(1.6rem,3vw,2.1rem)] leading-snug font-normal text-brand-900">
              Δημοσιεύσεις
            </h2>
            <p className="mt-4 max-w-[52ch] text-[15.5px] leading-relaxed text-brand-700">
              Επιστημονικό έργο σε διεθνή περιοδικά με κριτές.
            </p>
          </Reveal>

          <ol className="mt-11 border-t border-line">
            {publications.map((paper, i) => (
              <Reveal key={paper.title} delay={i * 0.05}>
                <li className="grid grid-cols-1 gap-2 border-b border-line py-7 sm:grid-cols-[minmax(0,10rem)_minmax(0,1fr)] sm:gap-10">
                  <p className="text-[13px] tracking-[0.1em] text-brand-600 uppercase sm:pt-1">
                    {String(publications.length - i).padStart(2, "0")}
                  </p>
                  <div>
                    <h3 className="max-w-[62ch] font-display text-[19px] leading-snug text-brand-900">
                      {paper.title}
                    </h3>
                    <p className="mt-2 max-w-[62ch] text-[14.5px] leading-relaxed text-brand-700">
                      {paper.authors}
                    </p>
                    <p className="mt-1 text-[14.5px] leading-relaxed text-brand-600">
                      {paper.journal}
                    </p>
                    {paper.doi ? (
                      <a
                        href={`https://doi.org/${paper.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex min-h-11 items-center py-2 text-[13.5px] text-brand-600 underline decoration-line-strong underline-offset-4 transition-colors hover:text-brand-900"
                      >
                        DOI {paper.doi}
                      </a>
                    ) : null}
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
