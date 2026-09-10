import Hero from "@/components/hero";
import DoctorSection from "@/components/doctor-section";
import ServicesSection from "@/components/services-section";
import FacialSection from "@/components/facial-section";
import PracticeSection from "@/components/practice-section";
import ContactSection from "@/components/contact-section";

export default function Home() {
  return (
    <>
      <Hero />
      <DoctorSection />
      <ServicesSection />
      <FacialSection />
      <PracticeSection />
      <ContactSection />
    </>
  );
}
