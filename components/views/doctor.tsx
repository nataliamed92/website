import type { Metadata } from "next";
import PageHeader from "@/components/page-header";
import DoctorBody from "@/components/doctor-body";
import AcademicRecord from "@/components/academic-record";
import CrossLink from "@/components/cross-link";
import ClosingCta from "@/components/closing-cta";
import { alternates, getContent, pages, type Lang } from "@/lib/i18n";

export function doctorMetadata(lang: Lang): Metadata {
  const { doctor, ui } = getContent(lang);
  return {
    title: ui.pages.doctor.title,
    description: doctor.bio,
    alternates: alternates("doctor", lang),
  };
}

export default function DoctorView({ lang }: { lang: Lang }) {
  const { doctor, images, ui } = getContent(lang);
  return (
    <>
      <PageHeader
        eyebrow={ui.pages.doctor.eyebrow}
        title={doctor.name}
        titleNote={`${doctor.credentials} · ${doctor.specialty}, ${doctor.subSpecialty}`}
      />
      <DoctorBody lang={lang} />
      <AcademicRecord lang={lang} />
      <CrossLink
        title={ui.pages.doctor.crossTitle}
        body={ui.pages.doctor.crossBody}
        href={pages.services[lang]}
        cta={ui.seeServices}
        image={images.operating}
        imageAlt={ui.alt.operating}
        imagePosition="object-[37%_26%]"
      />
      <ClosingCta lang={lang} />
    </>
  );
}
