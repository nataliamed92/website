import Hero from "@/components/hero";
import HomeDigest from "@/components/home-digest";
import ClosingCta from "@/components/closing-cta";
import { getContent, pages, type Lang } from "@/lib/i18n";

export default function HomeView({ lang }: { lang: Lang }) {
  const { contact, doctor, ui } = getContent(lang);
  return (
    <>
      <Hero
        name={doctor.name}
        specialty={doctor.specialty}
        subSpecialty={doctor.subSpecialty}
        tagline={doctor.tagline}
        phoneHref={contact.phone.href}
        book={ui.book}
        servicesLabel={ui.servicesShort}
        servicesHref={pages.services[lang]}
      />
      <HomeDigest lang={lang} />
      <ClosingCta lang={lang} />
    </>
  );
}
