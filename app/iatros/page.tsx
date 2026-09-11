import type { Metadata } from "next";
import PageHeader from "@/components/page-header";
import DoctorBody from "@/components/doctor-body";
import ClosingCta from "@/components/closing-cta";
import { doctor } from "@/lib/content";

export const metadata: Metadata = {
  title: "Η ιατρός",
  description: doctor.bio,
  alternates: { canonical: "/iatros" },
};

export default function Page() {
  return (
    <>
      <PageHeader eyebrow="Η ιατρός" title={doctor.fullName} lead={doctor.bio} />
      <DoctorBody />
      <ClosingCta />
    </>
  );
}
