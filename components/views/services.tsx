import type { Metadata } from "next";
import PageHeader from "@/components/page-header";
import ServicesSection from "@/components/services-section";
import CrossLink from "@/components/cross-link";
import ClosingCta from "@/components/closing-cta";
import { alternates, getContent, pages, type Lang } from "@/lib/i18n";

export function servicesMetadata(lang: Lang): Metadata {
  const { ui } = getContent(lang);
  return {
    title: ui.pages.services.title,
    description: ui.pages.services.description,
    alternates: alternates("services", lang),
  };
}

export default function ServicesView({ lang }: { lang: Lang }) {
  const { facialSurgery, images, medicalNote, services, ui } = getContent(lang);
  return (
    <>
      <PageHeader
        eyebrow={ui.pages.services.eyebrow}
        title={ui.pages.services.heading}
        lead={ui.pages.services.lead}
      />
      <ServicesSection services={services} medicalNote={medicalNote} imageAlt={ui.alt.surgery}
        pediatricAlt={ui.alt.pediatric}
      />
      <CrossLink
        title={facialSurgery.title}
        body={facialSurgery.lead}
        href={pages.facial[lang]}
        cta={ui.seeProcedures}
        image={images.portrait}
        imageAlt={ui.alt.portrait}
        imagePosition="object-[center_15%]"
      />
      <ClosingCta lang={lang} />
    </>
  );
}
