import Image from "next/image";
import Link from "next/link";

import { getContent, type Lang } from "@/lib/i18n";

export default function SiteFooter({ lang }: { lang: Lang }) {
  const { brand, contact, doctor, nav, social } = getContent(lang);
  return (
    <footer data-dock-hide className="border-t border-line bg-paper">
      <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div className="sm:max-w-[18rem]">
            <Image
              src={brand.lockup}
              alt={`${doctor.fullName}, ${doctor.specialty}`}
              width={512}
              height={512}
              sizes="260px"
              className="h-auto w-[220px] sm:w-[260px]"
            />
          </div>

          <nav className="flex flex-col gap-0.5 text-[14px]">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-2.5 text-brand-700 hover:text-brand-800"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-0.5 text-[14px] sm:items-end">
            <a href={contact.phone.href} className="py-2.5 text-brand-700 hover:text-brand-800">
              {contact.phone.display}
            </a>
            <a href={`mailto:${contact.email}`} className="py-2.5 text-brand-700 hover:text-brand-800">
              {contact.email}
            </a>
            <p className="py-2.5 text-brand-600">
              {contact.address.street}, {contact.address.city}
            </p>
            <div className="mt-2 flex gap-5">
              {social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 text-brand-700 hover:text-brand-800"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="rule-fade mt-12" />
        <div className="mt-6 flex flex-col gap-3 text-[12.5px] text-brand-600 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {doctor.fullName}
          </p>
          <a
            href="https://clinicbrain.gr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 py-2 text-brand-600 transition-colors hover:text-brand-800"
          >
            Made by <span className="tracking-[0.08em] text-brand-700">CLINICBRAIN</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
