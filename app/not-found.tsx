import Link from "next/link";
import { nav } from "@/lib/content";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center bg-paper pt-32 pb-24">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <p className="text-[11px] tracking-[0.2em] text-brand-600 uppercase">404</p>
        <h1 className="mt-5 max-w-[20ch] font-display text-[clamp(2.2rem,5vw,3.5rem)] leading-[1.06] font-normal text-brand-900">
          Η σελίδα δεν βρέθηκε
        </h1>
        <p className="mt-6 max-w-[46ch] text-[16px] leading-relaxed text-brand-700">
          Ο σύνδεσμος που ακολουθήσατε δεν οδηγεί κάπου. Δοκιμάστε από εδώ.
        </p>
        <nav className="mt-10 flex flex-wrap gap-2.5">
          <Link
            href="/"
            className="rounded-full bg-brand-600 px-5 py-2.5 text-[14px] font-semibold whitespace-nowrap text-white transition-colors hover:bg-brand-700"
          >
            Αρχική
          </Link>
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full border border-line-strong px-5 py-2.5 text-[14px] whitespace-nowrap text-brand-700 transition-colors hover:border-brand-500 hover:text-brand-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
