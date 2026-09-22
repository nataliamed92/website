import type { Metadata } from "next";
import PageHeader from "@/components/page-header";
import DoctorBody from "@/components/doctor-body";
import AcademicRecord from "@/components/academic-record";
import CrossLink from "@/components/cross-link";
import ClosingCta from "@/components/closing-cta";
import { doctor, images } from "@/lib/content";

export const metadata: Metadata = {
  title: "Η ιατρός",
  description: doctor.bio,
  alternates: { canonical: "/iatros" },
};

export default function Page() {
  return (
    <>
      <PageHeader
        eyebrow="Η ιατρός"
        title={doctor.name}
        titleNote={`${doctor.credentials} · ${doctor.specialty}, ${doctor.subSpecialty}`}
        lead={doctor.bio}
      />
      <DoctorBody />
      <AcademicRecord />
      <CrossLink
        title="Υπηρεσίες ΩΡΛ"
        body="Μύτη, αυτί, φάρυγγας, λάρυγγας και τράχηλος, παιδο-ΩΡΛ. Κάθε πάθηση με το τι είναι, τα συμπτώματά της και τον τρόπο αντιμετώπισης."
        href="/ypiresies"
        cta="Δείτε τις υπηρεσίες"
        image={images.candid}
        imageAlt="Η Ναταλία Φούρλα με ιατρική μπλούζα"
        imagePosition="object-[30%_top]"
      />
      <ClosingCta />
    </>
  );
}
