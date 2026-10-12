import { Commissioner, EB_Garamond } from "next/font/google";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import ContactDock from "@/components/contact-dock";
import { getContent, type Lang } from "@/lib/i18n";

/*
  Display: EB Garamond. Body: Commissioner. Both ship a genuine Greek subset,
  which is the constraint that decided this pairing: most modern display faces
  (Cormorant, Playfair) have no Greek at all and render the accents wrong.
*/
const garamond = EB_Garamond({
  variable: "--font-display-face",
  subsets: ["greek", "latin"],
  weight: ["400", "500"],
  display: "swap",
});

const commissioner = Commissioner({
  variable: "--font-body-face",
  subsets: ["greek", "latin"],
  display: "swap",
});

/**
 * The document around every page, in one language. Each language has its own
 * root layout (`app/(el)` and `app/(en)`), and both render this, so `<html
 * lang>` is right on every page rather than Greek everywhere.
 *
 * The header and the dock are client components and receive plain props: if
 * they read `getContent` themselves, both languages' text would ship to the
 * browser on every page.
 */
export default function SiteShell({
  lang,
  children,
}: {
  lang: Lang;
  children: React.ReactNode;
}) {
  const { brand, contact, doctor, hours, nav, siteUrl, ui } = getContent(lang);

  const physicianSchema = {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: doctor.fullName,
    medicalSpecialty: ["Otolaryngologic", "PlasticSurgery"],
    slogan: doctor.tagline,
    url: lang === "el" ? siteUrl : `${siteUrl}/en`,
    telephone: "+306970882795",
    email: contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address.street,
      addressLocality: contact.address.city,
      addressCountry: contact.address.country,
    },
    openingHoursSpecification: hours.map((h) => {
      const [opens, closes] = h.slots[0].split(" - ");
      return {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: h.schemaDay,
        opens,
        closes,
      };
    }),
  };

  return (
    <html
      lang={ui.htmlLang}
      className={`${garamond.variable} ${commissioner.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:rounded-full focus:bg-brand-600 focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
        >
          {ui.skipLink}
        </a>
        <SiteHeader
          lang={lang}
          nav={nav}
          name={doctor.name}
          fullName={doctor.fullName}
          mark={brand.markSmall}
          phoneHref={contact.phone.href}
          labels={{
            book: ui.book,
            menuOpen: ui.menuOpen,
            menuClose: ui.menuClose,
            switchLabel: ui.switchLabel,
            switchAria: ui.switchAria,
          }}
        />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter lang={lang} />
        <ContactDock
          phoneHref={contact.phone.href}
          label={`${ui.callAria} ${contact.phone.display}`}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(physicianSchema) }}
        />
      </body>
    </html>
  );
}
