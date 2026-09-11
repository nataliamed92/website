import type { Metadata } from "next";
import PageHeader from "@/components/page-header";
import FacialSection from "@/components/facial-section";
import CrossLink from "@/components/cross-link";
import ClosingCta from "@/components/closing-cta";
import { facialSurgery, images } from "@/lib/content";

export const metadata: Metadata = {
  title: facialSurgery.title,
  description:
    "Ρινοπλαστική, βλεφαροπλαστική, αφεστώτα ώτα και εκτομή βλαβών δέρματος ρινός και ώτων, από χειρουργό ΩΡΛ με εξειδίκευση στην πλαστική χειρουργική προσώπου.",
  alternates: { canonical: "/prosopo" },
};

export default function Page() {
  return (
    <>
      <PageHeader
        eyebrow="Πρόσωπο"
        title={facialSurgery.title}
        lead={facialSurgery.lead}
      />
      <FacialSection />
      <CrossLink
        title="Υπηρεσίες ΩΡΛ"
        body="Η λειτουργική πλευρά: μύτη, αυτί, λαιμός και τράχηλος, με πλήρη διαγνωστικό έλεγχο στο ιατρείο."
        href="/ypiresies"
        cta="Δείτε τις υπηρεσίες"
        image={images.instruments}
        imageAlt="Διαγνωστικά ωτορινολαρυγγολογικά εργαλεία σε σκούρα επιφάνεια"
      />
      <ClosingCta />
    </>
  );
}
