import type { Metadata } from "next";
import PageHeader from "@/components/page-header";
import ServicesSection from "@/components/services-section";
import CrossLink from "@/components/cross-link";
import ClosingCta from "@/components/closing-cta";
import { facialSurgery, images } from "@/lib/content";

export const metadata: Metadata = {
  title: "Υπηρεσίες ΩΡΛ",
  description:
    "Διαγνωστικές εξετάσεις, παθήσεις μύτης, αυτιού, λαιμού και τραχήλου, και παιδο-ΩΡΛ. Ακοόγραμμα, τυμπανόγραμμα, ενδοσκόπηση ρινός και λάρυγγα στο ιατρείο.",
  alternates: { canonical: "/ypiresies" },
};

export default function Page() {
  return (
    <>
      <PageHeader
        eyebrow="Υπηρεσίες"
        title="Ωτορινολαρυγγολογία, από τη διάγνωση ως τη θεραπεία"
        lead="Πέντε ομάδες παθήσεων, με τον διαγνωστικό έλεγχο να ολοκληρώνεται στο ιατρείο. Επιλέξτε μια πάθηση για να δείτε τι είναι, με τι εκδηλώνεται και πώς αντιμετωπίζεται."
      />
      <ServicesSection />
      <CrossLink
        title={facialSurgery.title}
        body={facialSurgery.lead}
        href="/prosopo"
        cta="Δείτε τις επεμβάσεις"
        image={images.profile}
        imageAlt="Μελέτη προσώπου σε πλάγιο φωτισμό, σε μαύρο φόντο"
      />
      <ClosingCta />
    </>
  );
}
