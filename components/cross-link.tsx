import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Reveal from "@/components/reveal";

/**
 * The bridge between the two halves of the practice. Splitting the site into
 * pages means a reader landing on one of them needs a way across.
 */
export default function CrossLink({
  title,
  body,
  href,
  cta,
  image,
  imageAlt,
  /**
   * Where `object-cover` should anchor. The card is a wide letterbox, so a
   * portrait dropped in centred loses the top of the head; pass the focal
   * point when the subject is not in the middle of the frame.
   */
  imagePosition = "object-center",
}: {
  title: string;
  body: string;
  href: string;
  cta: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
}) {
  return (
    <section className="bg-paper py-14 sm:py-28">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <Reveal>
          <Link
            href={href}
            className="group grid grid-cols-1 items-center gap-8 overflow-hidden rounded-card bg-paper-warm transition-colors duration-300 hover:bg-paper-card md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-0"
          >
            <div className="order-2 p-8 sm:p-12 md:order-1">
              <h2 className="font-display text-[clamp(1.6rem,3.2vw,2.4rem)] leading-tight font-normal text-brand-900">
                {title}
              </h2>
              <p className="mt-5 max-w-[46ch] text-[15.5px] leading-relaxed text-brand-700">
                {body}
              </p>
              <span className="mt-8 inline-flex items-center gap-2.5 text-[14.5px] font-medium text-brand-600">
                {cta}
                <ArrowRight
                  size={17}
                  weight="light"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </span>
            </div>
            <div className="relative order-1 h-56 w-full sm:h-72 md:order-2 md:h-full md:min-h-[22rem]">
              <Image
                src={image}
                alt={imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 48vw"
                className={`object-cover ${imagePosition}`}
              />
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
