import type { Metadata } from "next";
import PageHeader from "@/components/page-header";
import PracticeSection from "@/components/practice-section";
import ClosingCta from "@/components/closing-cta";
import { alternates, getContent, type Lang } from "@/lib/i18n";

export function practiceMetadata(lang: Lang): Metadata {
  const { contact, ui } = getContent(lang);
  const { street, area } = contact.address;
  return {
    title: ui.pages.practice.title,
    description: ui.pages.practice.description(street, area, contact.appointmentMinutes),
    alternates: alternates("practice", lang),
  };
}

export default function PracticeView({ lang }: { lang: Lang }) {
  const { contact, ui } = getContent(lang);
  const { street, area } = contact.address;
  return (
    <>
      <PageHeader
        eyebrow={ui.pages.practice.eyebrow}
        title={ui.pages.practice.title}
        lead={ui.pages.practice.lead(street, area, contact.appointmentMinutes)}
      />
      <PracticeSection lang={lang} />
      <ClosingCta lang={lang} />
    </>
  );
}
