import type { Metadata, Viewport } from "next";
import { Commissioner, EB_Garamond } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import ContactDock from "@/components/contact-dock";
import { contact, doctor, hours, siteUrl } from "@/lib/content";

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

const description =
  "Ωτορινολαρυγγολόγος και Πλαστική Χειρουργική Προσώπου στην Αθήνα, Λεωφόρος Βασιλίσσης Σοφίας 50. Διαγνωστικές εξετάσεις, παθήσεις μύτης, αυτιού και τραχήλου, παιδο-ΩΡΛ, ρινοπλαστική και βλεφαροπλαστική.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${doctor.fullName} · ${doctor.specialty} στην Αθήνα`,
    template: `%s · ${doctor.name}`,
  },
  description,
  keywords: [
    "ωτορινολαρυγγολόγος Αθήνα",
    "ΩΡΛ Βασιλίσσης Σοφίας",
    "πλαστική χειρουργική προσώπου",
    "ρινοπλαστική Αθήνα",
    "βλεφαροπλαστική",
    "ενδοσκοπική χειρουργική ρινός",
    "παιδο ΩΡΛ",
    "Ναταλία Φούρλα",
  ],
  openGraph: {
    type: "website",
    locale: "el_GR",
    siteName: doctor.fullName,
    title: `${doctor.fullName} · ${doctor.specialty}`,
    description,
    images: [{ url: "/img/hero-marble.jpg", width: 3168, height: 1344 }],
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#08090a",
  colorScheme: "dark",
};

const physicianSchema = {
  "@context": "https://schema.org",
  "@type": "Physician",
  name: doctor.fullName,
  medicalSpecialty: ["Otolaryngologic", "PlasticSurgery"],
  slogan: doctor.tagline,
  url: siteUrl,
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="el"
      className={`${garamond.variable} ${commissioner.variable} h-full antialiased`}
    >
      <body className="grain flex min-h-full flex-col bg-ink-950">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:rounded-full focus:bg-sand-400 focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-ink-950"
        >
          Μετάβαση στο περιεχόμενο
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <ContactDock />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(physicianSchema) }}
        />
      </body>
    </html>
  );
}
