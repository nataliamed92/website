import type { Metadata } from "next";
import PageHeader from "@/components/page-header";
import FacialSection from "@/components/facial-section";
import CrossLink from "@/components/cross-link";
import ClosingCta from "@/components/closing-cta";
import { alternates, getContent, pages, type Lang } from "@/lib/i18n";

export function facialMetadata(lang: Lang): Metadata {
  const { facialSurgery, ui } = getContent(lang);
  return {
    title: facialSurgery.title,
    description: ui.pages.facial.description,
    alternates: alternates("facial", lang),
  };
}

export default function FacialView({ lang }: { lang: Lang }) {
  const { facialSurgery, images, medicalNote, ui } = getContent(lang);
  return (
    <>
      <PageHeader
        eyebrow={ui.pages.facial.eyebrow}
        title={facialSurgery.title}
        lead={facialSurgery.lead}
      />
      <FacialSection
        procedures={facialSurgery.items}
        medicalNote={medicalNote}
        imageAlt={ui.alt.portrait}
      />
      <CrossLink
        title={ui.servicesTitle}
        body={ui.pages.facial.crossBody}
        href={pages.services[lang]}
        cta={ui.seeServices}
        image={images.surgery}
        imageAlt={ui.alt.surgery}
      />
      <ClosingCta lang={lang} />
    </>
  );
}
