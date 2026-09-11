import type { Metadata } from "next";
import PageHeader from "@/components/page-header";
import PracticeSection from "@/components/practice-section";
import ClosingCta from "@/components/closing-cta";
import { contact } from "@/lib/content";

export const metadata: Metadata = {
  title: "Το ιατρείο",
  description: `Το ιατρείο βρίσκεται στη ${contact.address.street}, ${contact.address.area}. Ραντεβού ${contact.appointmentMinutes} λεπτών, Δευτέρα, Τρίτη και Παρασκευή.`,
  alternates: { canonical: "/iatreio" },
};

export default function Page() {
  return (
    <>
      <PageHeader
        eyebrow="Ιατρείο"
        title="Το ιατρείο"
        lead={`${contact.address.street}, ${contact.address.area}. Κάθε ραντεβού κρατά ${contact.appointmentMinutes} λεπτά, ώστε η εξέταση να μη βιάζεται.`}
      />
      <PracticeSection />
      <ClosingCta />
    </>
  );
}
